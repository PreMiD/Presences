import 'source-map-support/register';

import axios from 'axios';
import { green, yellow, red, blue } from 'chalk';
import * as fs from 'fs';
import { validate } from 'jsonschema';

const latestMetadataSchema = 'https://schemas.premid.app/metadata/1.1';

const stats = {
    validated: 0,
    validatedWithWarnings: 0,
    failedToValidate: 0
};

const validated = (service: string): void => { console.log(green(`✔ ${service}`)); stats.validated++ };
const validatedWithWarnings = (service: string, warning: string): void => { console.log(yellow(`✔ ${service} (${warning})`)); stats.validatedWithWarnings++ };
const failedToValidate = (service: string, errors: string[]): void => { console.log(red(`✘ ${service}\n${errors.map(e => `  -> ${e}`).join('\n')}`)); stats.failedToValidate++ };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const loadMetadata = (path: string): any => JSON.parse(fs.readFileSync(path, 'utf-8'));

// parse file changes from git
const changedFiles = fs.readFileSync('./file_changes.txt', 'utf-8').trim().split('\n');

const metaFiles = changedFiles.filter((f: string) => f.endsWith('metadata.json'));

(async (): Promise<void> => {
    console.log(blue('Getting latest schema...'));

    const schema = (await axios.get(latestMetadataSchema)).data;

    console.log(blue('Beginning validation of ' + metaFiles.length + ' presences...'));

    for (const metaFile of metaFiles) {
        const meta = loadMetadata(metaFile);
        const service = meta.service;
        const result = validate(meta, schema);

        if (result.valid) {
            if (meta.schema && meta.schema !== latestMetadataSchema) {
                validatedWithWarnings(service, 'Using out of date schema');
            } else {
                validated(service);
            }
        } else {
            const errors: string[] = [];
            for (const error of result.errors)
                errors.push(`${error.message} @ ${error.property}`);

            failedToValidate(service, errors);
        }
    }

    console.log();
    console.log(blue('Statistics:'));
    console.log(green(`${stats.validated} fully validated\n`) + yellow(`${stats.validatedWithWarnings} validated, but with warnings\n`) + red(`${stats.failedToValidate} failed to validate`));
    console.log();

    if (stats.failedToValidate > 0) {
        console.log(red('One or more services failed to validate.'));
        process.exit(-1);
    }

    if (stats.validatedWithWarnings > 0) {
        console.log(yellow('One or more services validated, but with warnings.'));
    }
})();
