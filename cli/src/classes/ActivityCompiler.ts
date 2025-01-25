import { existsSync } from 'node:fs'
import { cp, rm } from 'node:fs/promises'
import { basename, resolve } from 'node:path'
import chalk from 'chalk'
import { watch } from 'chokidar'
import { build } from 'esbuild'
import ora from 'ora'
import { error, prefix } from '../util/log.js'
import { DependenciesManager } from './DependenciesManager.js'
import { TypescriptCompiler } from './TypescriptCompiler.js'
import { WebSocketServer } from './WebSocketServer.js'

export interface ActivityMetadata {
  service: string
  apiVersion: number
}

export class ActivityCompiler {
  dependencies: DependenciesManager
  ts: TypescriptCompiler
  ws: WebSocketServer | undefined

  constructor(
    public readonly cwd: string,
    public readonly activity: ActivityMetadata,
  ) {
    this.dependencies = new DependenciesManager(cwd, activity)
    this.ts = new TypescriptCompiler(cwd, activity)
  }

  async compile(
    precheck = true,
    killOnError = true,
  ) {
    if (precheck) {
      await this.dependencies.installDependencies()
      const success = await this.ts.typecheck(killOnError)
      if (!success) {
        return
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
  }

  async watch() {
    await this.dependencies.installDependencies()

    this.ws = new WebSocketServer(this.cwd)

    watch(this.cwd, {
      depth: 0,
      ignoreInitial: true,
      ignored: ['**/dist/**'],
      persistent: true,
    }).on('all', async (event, path) => {
      if (['add', 'unlink'].includes(event) && basename(path) === 'iframe.ts') {
        return this.ts.restart(this.compileAndSend.bind(this))
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

        await this.ts.restart(this.compileAndSend.bind(this))
      }
    })

    this.ts.watch(this.compileAndSend.bind(this))
  }

  private async compileAndSend() {
    await this.compile(false)
    await this.ws?.send()
  }
}
