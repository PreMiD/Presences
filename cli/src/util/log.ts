import process from 'node:process'
import chalk from 'chalk'

export const prefix = chalk.bold.hex('#7289DA')('pmd')

export function exit(message?: string): never {
  console.error(chalk.red('✖ ') + prefix, chalk.red(message))
  process.exit(1)
}

export function success(message: string): never {
  console.log(chalk.greenBright('✔ ') + prefix, chalk.greenBright(message))
  process.exit(0)
}

export function error(message: string) {
  console.error(chalk.red('✖ ') + prefix, chalk.red(message))
}

export function info(message: string) {
  console.log(chalk.cyan('❯ ') + prefix, chalk.white(message))
}
