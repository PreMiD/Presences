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

export const MESSAGES = {
  ciOnly: 'This command can only be run in a CI environment',
  noPullRequest: 'This command can only be run in a pull request',
  noToken: 'GITHUB_TOKEN environment variable is required',
  noCdnToken: 'CDN_TOKEN environment variable is required',
  noMongoUrl: 'MONGO_URL environment variable is required',
  noHeadRef: 'HEAD_REF environment variable is required',
  noMongoConnection: 'Failed to connect to MongoDB',
  noActivities: 'No activities changed',
  waitingForApprovals: 'Waiting for 2 approvals...',
  checkingAndUpdatingAssets: 'Checking and updating assets...',
  someInvalidAssets: 'Some invalid assets were found, check the logs for more details',
  assetsUpdated: 'Assets have been updated successfully',
  error: 'An error occurred',
  wrongRepository: 'This command can only be run in PreMiD/Presences repository',
  assetsUpdatedCount: (count: number, committing = false) => count === 0 ? 'No assets updated' : `${count} assets updated successfully${committing ? ' and pushed to GitHub' : ''}`,
}
