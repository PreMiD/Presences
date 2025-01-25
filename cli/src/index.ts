#! /usr/bin/env node

import { readFile } from 'node:fs/promises'
import { cac } from 'cac'
import { build } from './commands/build.js'
import { newActivity } from './commands/new.js'
import { exit } from './util/log.js'

const cli = cac('pmd')
const localPackageJson = JSON.parse(await readFile('./package.json', 'utf-8').catch(() => {
  exit('This CLI is only available in the activities repository')
}))

if (localPackageJson.name !== 'activities') {
  exit('This CLI is only available in the activities repository')
}

const cliPackageJson = JSON.parse(await readFile('./cli/package.json', 'utf-8').catch(() => {
  exit('This CLI is only available in the activities repository')
}))

cli
  .command('new [activity]', 'Create a new activity')
  .action(newActivity)

cli
  .command('dev [activity]', 'Run an activity in dev mode')
  .action(service => build(service, { watch: true }))

cli
  .command('build [activity]', 'Build an activity')
  .option('--all', 'Build all activities')
  .option('--watch', 'Watch for changes and rebuild (Same as `dev`)')
  .option('--changed', 'Build only changed activities')
  .option('--no-kill', 'Do not kill the process on error (Only works with --all or --changed)')
  .action((service, options) => build(service, options))

cli.help()
cli.version(cliPackageJson.version)

cli.parse()
