#! /usr/bin/env node

import { readFile } from 'node:fs/promises'
import { cac } from 'cac'
import { newActivity } from './commands/new.js'
import { exit } from './util/log.js'
import { buildActivity } from './commands/build.js'

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
  .action((service) => buildActivity(service, true))

cli
  .command('build [activity]', 'Build an activity')
  .action((service) => buildActivity(service))

cli.help()
cli.version(cliPackageJson.version)

cli.parse()
