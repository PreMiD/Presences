import "source-map-support/register.js";

import actions from "@actions/core";
import { existsSync, readFileSync } from "fs";
import { readFile, stat } from "fs/promises";
import got from "got";
import jsonAst, { ObjectNode } from "json-to-ast";
import { validate } from "jsonschema";
import { resolve } from "path";
import { compare } from "semver";

import PresenceCompiler from "../classes/PresenceCompiler.js";
import getDiff from "../util/getDiff.js";
import getLatestSchema from "../util/getLatestSchema.js";

const schema = await getLatestSchema(),
	changedPresences = getDiff(),
	storePresences = await getStorePresences(changedPresences),
	validLangs = storePresences.data.langFiles.map(l => l.lang),
	compiler = new PresenceCompiler(),
	errors: {
		presence: string;
		message: string | Error;
		properties?: actions.AnnotationProperties | undefined;
	}[] = [];

for (const presence of changedPresences) {
	const presencePath = compiler.getPresenceFolder(presence);

	//#region Metadata Check
	if (!(await stat(resolve(presencePath, "metadata.json"))).isFile()) {
		errors.push({
			presence,
			message: "Presence is missing metadata.json!",
			properties: {
				file: resolve(presencePath, "metadata.json"),
			},
		});
		continue;
	}

	let metadata: any | null;

	try {
		metadata = JSON.parse(
			await readFile(resolve(presencePath, "metadata.json"), "utf8")
		);

		metadata;
	} catch {
		errors.push({
			presence,
			message: "Presence metadata.json is not a valid JSON file!",
			properties: {
				file: resolve(presencePath, "metadata.json"),
			},
		});
		continue;
	}
	//#endregion

	const storePresence = storePresences.data.presences.find(
		p => p.metadata.service === metadata.service
	);

	//#region Schema Check
	const result = validate(metadata, schema.schema);

	if (result.errors.length) {
		for (const error of result.errors) {
			errors.push({
				presence,
				message: error.message,
				properties: {
					file: resolve(presencePath, "metadata.json"),
					startLine: getLine(error.argument),
				},
			});
		}

		continue;
	}
	//#endregion

	//#region Schema version Check
	if (metadata.$schema !== schema.url) {
		errors.push({
			presence,
			message: `Schema version is not up to date! (Expected ${schema.url}, got ${metadata.$schema})`,
			properties: {
				file: resolve(presencePath, "metadata.json"),
				startLine: getLine("$schema"),
			},
		});

		continue;
	}
	//#endregion

	//#region Version bump Check
	if (storePresence) {
		if (compare(metadata.version, storePresence.metadata.version) <= 0)
			errors.push({
				presence,
				message: "Version has not been bumped!",
				properties: {
					file: resolve(presencePath, "metadata.json"),
					startLine: getLine("version"),
				},
			});
	} else if (metadata.version !== "1.0.0")
		errors.push({
			presence,
			message: "Initial version must be 1.0.0!",
			properties: {
				file: resolve(presencePath, "metadata.json"),
				startLine: getLine("version"),
			},
		});

	//#endregion

	//#region Presence iFrame Check
	const iframePath = resolve(presencePath, "iframe.ts");

	if (!existsSync(iframePath) && metadata.iframe)
		errors.push({
			presence,
			message: "Presence is missing iframe.ts!",
			properties: {
				file: iframePath,
			},
		});

	if (!metadata.iframe && existsSync(iframePath))
		errors.push({
			presence,
			message: "Presence has iframe.ts but metadata.iframe is set to false!",
			properties: {
				file: iframePath,
			},
		});

	//#endregion

	//#region Presence language Check
	Object.keys(metadata.description).forEach(lang => {
		const index = validLangs.findIndex((l: string) => l === lang);

		if (!~index)
			errors.push({
				presence,
				message: `Language ${lang} is not supported!`,
				properties: {
					file: resolve(presencePath, "metadata.json"),
					startLine: getLine("description", lang),
				},
			});
	});
	//#endregion

	function getLine(line: string, value?: string | number) {
		const AST = jsonAst(
			readFileSync(resolve(presencePath, "metadata.json"), "utf-8"),
			{
				loc: true,
				source: resolve(presencePath, "metadata.json"),
			}
		) as ObjectNode;

		if (value) {
			const node = AST.children.find(c => c.key.value === line)?.value;

			switch (node?.type) {
				case "Literal":
					return node.loc?.start.line;
				case "Object":
					return node.children?.find(c => c.key.value === value)?.loc?.start
						.line;
				case "Array": {
					if (typeof value === "number")
						return node?.children[value]?.loc?.start.line;
					else {
						return node.children.find(c => {
							switch (c.type) {
								case "Literal":
									return c.value === value;
								case "Object":
									return c.children.find(c => c.key.value === value);
							}
						})?.loc?.start.line;
					}
				}
			}
		} else
			return (
				AST.children.find(c => c.key.value === line)?.loc?.start?.line ?? 0
			);
	}
}

if (errors.length) {
	for (const error of errors) actions.error(error.message, error.properties);
	actions.setFailed("Some Presences failed to validate.");
} else actions.info("All Presences validated successfully!");

async function getStorePresences(presences: string[]) {
	try {
		return JSON.parse(
			(
				await got("https://api.premid.app/v3", {
					method: "post",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						query: `
					query getData($service: StringOrStringArray!) {
						presences(service: $service) {
							metadata {
								service
								version
							}
						}
						langFiles(project: "presence") {
							lang
						}
					}
				`,
						variables: {
							service: presences,
						},
					}),
				})
			).body
		) as {
			data: {
				presences: [
					{
						metadata: {
							service: string;
							version: string;
						};
					}
				];
				langFiles: [
					{
						lang: string;
					}
				];
			};
		};
	} catch {
		actions.setFailed("Could not fetch store data!");
		process.exit();
	}
}
