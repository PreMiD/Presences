import { existsSync } from 'node:fs'
import { cp, readFile, rm } from 'node:fs/promises'
import { basename, resolve } from 'node:path'
import chalk from 'chalk'
import { watch } from 'chokidar'
import { build } from 'esbuild'
import ora from 'ora'
import { compare, inc } from 'semver'
import { getLine } from '../util/getJsonPosition.js'
import { error, exit, prefix } from '../util/log.js'
import { addSarifLog, SarifRuleId } from '../util/sarif.js'
import { DependenciesManager } from './DependenciesManager.js'
import { TypescriptCompiler } from './TypescriptCompiler.js'
import { WebSocketServer } from './WebSocketServer.js'

export interface ActivityMetadata {
  service: string
  apiVersion: number
  version: string
  iframe?: boolean
  iFrameRegExp?: string
  description: Record<string, string>
}

export class ActivityCompiler {
  dependencies: DependenciesManager
  ts: TypescriptCompiler
  ws: WebSocketServer | undefined

  constructor(
    public readonly cwd: string,
    public readonly activity: ActivityMetadata,
    public readonly versionized: boolean,
  ) {
    this.dependencies = new DependenciesManager(cwd, activity)
    this.ts = new TypescriptCompiler(cwd, activity)
  }

  async compile({ kill, checkMetadata, preCheck = true }: { kill: boolean, checkMetadata: boolean, preCheck?: boolean }): Promise<boolean> {
    if (preCheck) {
      await this.dependencies.installDependencies()
      const success = await this.ts.typecheck(kill)
      if (!success) {
        return false
      }
    }

    if (checkMetadata) {
      const success = await this.checkMetadata({ kill })
      if (!success) {
        return false
      }
    }

    const spinner = ora(prefix + chalk.greenBright(` Compiling ${this.activity.service}...`))
    spinner.start()

    const hasIframe = existsSync(resolve(this.cwd, 'iframe.ts'))
    const hasI18nFile = existsSync(resolve(this.cwd, `${this.activity.service}.json`))

    if (existsSync(resolve(this.cwd, 'dist'))) {
      await rm(resolve(this.cwd, 'dist'), { recursive: true })
    }

    await build({
      entryPoints: [
        resolve(this.cwd, 'presence.ts'),
        ...(hasIframe ? [resolve(this.cwd, 'iframe.ts')] : []),
      ],
      outdir: resolve(this.cwd, 'dist'),
      bundle: true,
      minify: true,
      sourcemap: 'inline',
      tsconfig: resolve(this.cwd, 'tsconfig.json'),
    })

    await cp(resolve(this.cwd, 'metadata.json'), resolve(this.cwd, 'dist', 'metadata.json'))
    if (hasI18nFile) {
      await cp(resolve(this.cwd, `${this.activity.service}.json`), resolve(this.cwd, 'dist', `${this.activity.service}.json`))
    }

    spinner.succeed(prefix + chalk.greenBright(` Compiled ${this.activity.service}!`))
    return true
  }

  async watch({ checkMetadata }: { checkMetadata: boolean }) {
    await this.dependencies.installDependencies()

    this.ws = new WebSocketServer(this.cwd)

    watch(this.cwd, {
      depth: 0,
      ignoreInitial: true,
      ignored: ['**/dist/**'],
      persistent: true,
    }).on('all', async (event, path) => {
      if (['add', 'unlink'].includes(event) && basename(path) === 'iframe.ts') {
        return this.ts.restart(this.compileAndSend.bind(this, { checkMetadata }))
      }

      if (basename(path) === 'package.json') {
        if (
          ['add', 'change'].includes(event)
          && !(await this.dependencies.isValidPackageJson())
        ) {
          return error('Invalid package.json!')
        }

        await this.ts.stop()
        if (event === 'change') {
          await this.dependencies.installDependencies()
        }
        else if (event === 'unlink') {
          if (existsSync(resolve(this.cwd, 'node_modules'))) {
            await rm(resolve(this.cwd, 'node_modules'), { recursive: true })
          }
          if (existsSync(resolve(this.cwd, 'package-lock.json'))) {
            await rm(resolve(this.cwd, 'package-lock.json'))
          }
        }

        await this.ts.restart(this.compileAndSend.bind(this, { checkMetadata }))
      }
    })

    this.ts.watch(this.compileAndSend.bind(this, { checkMetadata }))
  }

  private async compileAndSend({ checkMetadata }: { checkMetadata: boolean }) {
    await this.compile({ checkMetadata, preCheck: false, kill: false })
    await this.ws?.send()
  }

  private async checkMetadata({ kill }: { kill: boolean }): Promise<boolean> {
    const metadata: ActivityMetadata = JSON.parse(await readFile(resolve(this.cwd, 'metadata.json'), 'utf-8'))
    const libraryVersion: ActivityMetadata | null = await fetch(`https://api.premid.app/v6/activities${this.versionized ? `/v${metadata.apiVersion}` : ''}/${encodeURIComponent(metadata.service)}/metadata.json`).then(res => res.json()).catch(() => null)

    let valid = true
    if (!libraryVersion) {
      if (metadata.version === '1.0.0') {
        return true
      }
      else {
        const message = `Expected initial version of activity ${metadata.service} to be 1.0.0`
        if (kill) {
          exit(message)
        }

        error(message)
        addSarifLog({
          path: resolve(this.cwd, 'metadata.json'),
          message,
          ruleId: SarifRuleId.bumpCheck,
          position: {
            line: await getLine(resolve(this.cwd, 'metadata.json'), 'version'),
            column: 0,
          },
        })
        valid = false
      }
    }

    if (libraryVersion && compare(metadata.version, libraryVersion.version) <= 0) {
      const expectedVersions = [inc(metadata.version, 'patch'), inc(metadata.version, 'minor'), inc(metadata.version, 'major')]
      const message = `Expected version of activity ${metadata.service} to be bumped to one of the following: ${expectedVersions.join(', ')}`
      if (kill) {
        exit(message)
      }

      error(message)
      addSarifLog({
        path: resolve(this.cwd, 'metadata.json'),
        message,
        ruleId: SarifRuleId.bumpCheck,
        position: {
          line: await getLine(resolve(this.cwd, 'metadata.json'), 'version'),
          column: 0,
        },
      })
      valid = false
    }

    if (metadata.iframe && !existsSync(resolve(this.cwd, 'iframe.ts'))) {
      const message = `Expected iframe.ts to exist for activity ${metadata.service}, as metadata.iframe is true`
      if (kill) {
        exit(message)
      }

      error(message)
      addSarifLog({
        path: resolve(this.cwd, 'metadata.json'),
        message,
        ruleId: SarifRuleId.iframeCheck,
        position: {
          line: await getLine(resolve(this.cwd, 'metadata.json'), 'iframe'),
          column: 0,
        },
      })
      valid = false
    }

    if (!metadata.iframe && existsSync(resolve(this.cwd, 'iframe.ts'))) {
      const message = `Expected iframe.ts to not exist for activity ${metadata.service}, as metadata.iframe is false`
      if (kill) {
        exit(message)
      }

      error(message)
      addSarifLog({
        path: resolve(this.cwd, 'metadata.json'),
        message,
        ruleId: SarifRuleId.iframeCheck,
        position: {
          line: await getLine(resolve(this.cwd, 'metadata.json'), 'iframe'),
          column: 0,
        },
      })
      valid = false
    }

    if (metadata.iFrameRegExp === '.*') {
      const message = `iFrameRegExp is not allowed to be .*, as it is a wildcard`
      if (kill) {
        exit(message)
      }

      error(message)
      addSarifLog({
        path: resolve(this.cwd, 'metadata.json'),
        message,
        ruleId: SarifRuleId.iframeRegexpCheck,
        position: {
          line: await getLine(resolve(this.cwd, 'metadata.json'), 'iFrameRegExp'),
          column: 0,
        },
      })
      valid = false
    }

    const allowedLanguages = await fetch('https://api.premid.app/v6/locales').then(res => res.json()).catch(() => [])
    for (const language of Object.keys(metadata.description)) {
      if (!allowedLanguages.includes(language)) {
        const message = `Language ${language} is not a valid language`
        if (kill) {
          exit(message)
        }

        error(message)
        addSarifLog({
          path: resolve(this.cwd, 'metadata.json'),
          message,
          ruleId: SarifRuleId.languageCheck,
          position: {
            line: await getLine(resolve(this.cwd, 'metadata.json'), 'description', language),
            column: 0,
          },
        })
        valid = false
      }
    }

    return valid
  }
}
