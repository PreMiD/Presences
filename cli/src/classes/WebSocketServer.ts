import type { RawData } from 'ws'
import { existsSync } from 'node:fs'
import { readdir, readFile } from 'node:fs/promises'
import { extname, resolve } from 'node:path'
import chalk from 'chalk'
import ora from 'ora'
import WebSocket, { WebSocketServer as WSServer } from 'ws'
import { info, prefix } from '../util/log.js'

export class WebSocketServer {
  private server: WSServer

  constructor(public readonly cwd: string) {
    this.server = new WSServer({ port: 3021 })

    this.server.on('connection', (socket) => {
      info('Connected to the extension!')
      if (this.resendOnConnect) {
        this.send()
      }

      socket.on('close', () => {
        info('Disconnected from the extension!')
      })
    })
  }

  private resendOnConnect = false
  async send() {
    this.resendOnConnect = true
    if (this.server.clients.size === 0 || [...this.server.clients.values()].every(client => client.readyState !== WebSocket.OPEN)) {
      return
    }

    const distPath = resolve(this.cwd, 'dist')
    if (!existsSync(distPath))
      return

    const files = await readdir(distPath)

    const spinner = ora(
      prefix + chalk.yellow(' Sending activity to the extension...'),
    ).start()

    let expectedCount = 0
    let receivedCount = 0
    for (const client of this.server.clients) {
      if (client.readyState !== WebSocket.OPEN)
        continue

      expectedCount++

      function onMessage(message: RawData) {
        if (message.toString() === 'received') {
          receivedCount++
          client.off('message', onMessage)
        }
      }

      client.on('message', onMessage)

      client.send(JSON.stringify({
        type: 'localPresence',
        files: await Promise.all(files
          .filter(file => ['.json', '.js'].includes(extname(file)))
          .map(async (file) => {
            if (extname(file) === '.json') {
              return {
                file,
                contents: JSON.parse(await readFile(resolve(distPath, file), 'utf-8') || '{}'),
              }
            }
            else {
              return {
                file,
                contents: await readFile(resolve(distPath, file), 'utf-8'),
              }
            }
          })),
      }))
    }

    // eslint-disable-next-line no-unmodified-loop-condition
    while (receivedCount !== expectedCount) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    spinner.succeed(prefix + chalk.greenBright(' Activity sent to the extension!'))
  }
}
