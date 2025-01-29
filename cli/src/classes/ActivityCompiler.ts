import { Buffer } from 'node:buffer'
import { existsSync } from 'node:fs'
import { cp, readFile, rm } from 'node:fs/promises'
import { basename, dirname, resolve } from 'node:path'
import chalk from 'chalk'
import { watch } from 'chokidar'
import { build } from 'esbuild'
import { globby } from 'globby'
import ky from 'ky'
import ora from 'ora'
import { compare, inc } from 'semver'
import sharp from 'sharp'
import { getLine } from '../util/getJsonPosition.js'
import { error, exit, prefix } from '../util/log.js'
import { sanitazeFolderName } from '../util/sanitazeFolderName.js'
import { addSarifLog, SarifRuleId } from '../util/sarif.js'
import { DependenciesManager } from './DependenciesManager.js'
import { TypescriptCompiler } from './TypescriptCompiler.js'
import { WebSocketServer } from './WebSocketServer.js'

export interface ActivityMetadata {
  service: string
  apiVersion: number
  version: string
  logo: string
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

  async compile({ kill, validate, preCheck = true }: { kill: boolean, validate: boolean, preCheck?: boolean }): Promise<boolean> {
    if (preCheck) {
      await this.dependencies.installDependencies()
      const success = await this.ts.typecheck(kill)
      if (!success) {
        return false
      }
    }

    if (validate) {
      const success = await this.validate({ kill })
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

  async watch({ validate }: { validate: boolean }) {
    await this.dependencies.installDependencies()

    this.ws = new WebSocketServer(this.cwd)

    watch(this.cwd, {
      depth: 0,
      ignoreInitial: true,
      ignored: ['**/dist/**'],
      persistent: true,
    }).on('all', async (event, path) => {
      if (['add', 'unlink'].includes(event) && basename(path) === 'iframe.ts') {
        return this.ts.restart(this.compileAndSend.bind(this, { validate }))
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

        await this.ts.restart(this.compileAndSend.bind(this, { validate }))
      }
    })

    this.ts.watch(this.compileAndSend.bind(this, { validate }))
  }

  private async compileAndSend({ validate }: { validate: boolean }) {
    await this.compile({ validate, preCheck: false, kill: false })
    await this.ws?.send()
  }

  private async validate({ kill }: { kill: boolean }): Promise<boolean> {
    const metadata: ActivityMetadata = JSON.parse(await readFile(resolve(this.cwd, 'metadata.json'), 'utf-8'))
    const libraryVersion: ActivityMetadata | null = await fetch(`https://api.premid.app/v6/activities${this.versionized ? `/v${metadata.apiVersion}` : ''}/${encodeURIComponent(metadata.service)}/metadata.json`).then(res => res.json()).catch(() => null)

    let serviceFolder: string
    if (this.versionized) {
      serviceFolder = basename(dirname(this.cwd))
    }
    else {
      serviceFolder = basename(this.cwd)
    }

    let valid = true

    if (serviceFolder !== sanitazeFolderName(metadata.service)) {
      const message = `Expected service folder to be ${sanitazeFolderName(metadata.service)}, but got ${serviceFolder}`
      if (kill) {
        exit(message)
      }

      error(message)
      addSarifLog({
        path: resolve(this.cwd, 'metadata.json'),
        message,
        ruleId: SarifRuleId.serviceFolderCheck,
        position: {
          line: await getLine(resolve(this.cwd, 'metadata.json'), 'service'),
          column: 0,
        },
      })
      valid = false
    }

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

    if (libraryVersion && compare(metadata.version, libraryVersion.version) === -1) {
      const expectedVersions = [
        inc(libraryVersion.version, 'patch'),
        inc(libraryVersion.version, 'minor'),
        inc(libraryVersion.version, 'major'),
      ]
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

    const imageCache = new Map<string, { width: number | null, height: number | null }>()

    //* Helper function to validate image dimensions
    const validateImage = async (url: string, filePath: string, line: number, column: number) => {
      let dimensions = imageCache.get(url)

      if (!dimensions) {
        try {
          const response = await ky.get(url).arrayBuffer()
          const metadata = await sharp(Buffer.from(response)).metadata()
          dimensions = { width: metadata.width ?? null, height: metadata.height ?? null }
          imageCache.set(url, dimensions)
        }
        catch (err: unknown) {
          const message = `Failed to validate image URL (${url}): ${err instanceof Error ? err.message : String(err)}`
          if (kill) {
            exit(message)
          }

          error(message)
          addSarifLog({
            path: filePath,
            message,
            ruleId: SarifRuleId.imageCheck,
            position: {
              line,
              column,
            },
          })
          return false
        }
      }

      if (dimensions.width !== 512 || dimensions.height !== 512) {
        const message = `Image URL dimensions must be exactly 512x512 pixels, got ${dimensions.width}x${dimensions.height} for URL: ${url}`
        if (kill) {
          exit(message)
        }

        error(message)
        addSarifLog({
          path: filePath,
          message,
          ruleId: SarifRuleId.imageCheck,
          position: {
            line,
            column,
          },
        })
        return false
      }

      return true
    }

    //* Check logo URL
    const logoLine = await getLine(resolve(this.cwd, 'metadata.json'), 'logo')
    if (!(await validateImage(metadata.logo, resolve(this.cwd, 'metadata.json'), logoLine, 0))) {
      valid = false
    }

    //* Check image URLs in TypeScript files
    const tsFiles = await globby('**/*.ts', { cwd: this.cwd, absolute: true })

    for (const file of tsFiles) {
      const content = await readFile(file, 'utf-8')
      const imageUrlRegex = /(?<=["'`])(https?:\/\/.*?\.(?:png|jpg|jpeg|gif|webp)(?:\?[^'"`]+)?)(?=["'`])/g
      const matches = content.matchAll(imageUrlRegex)

      for (const match of matches) {
        //* If the url contains a template literal, skip it
        if (match[1].includes(`\${`))
          continue

        //* Regex to check if the url contains + " or + ' or + `
        if (/(?<=\+ )["'`].*?["'`]/.test(match[1]))
          continue

        const url = match[1]
        const line = content.substring(0, match.index).split('\n').length
        const column = match.index - content.lastIndexOf('\n', match.index) - 1

        if (!(await validateImage(url, file, line, column))) {
          valid = false
        }
      }
    }

    return valid
  }
}
