import { createRequire } from "node:module";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import actions from "@actions/core";
import got from "got";
import jsonAst, {
	ObjectNode,
	ArrayNode,
	LiteralNode,
	PropertyNode,
} from "json-to-ast";
import { validate } from "jsonschema";
import { compare } from "semver";

import PresenceCompiler from "../classes/PresenceCompiler.js";
import { getDiff, getLatestSchema } from "../util.js";
import chalk from "chalk";

interface SchemaMetadata extends Metadata {
	$schema: string;
}

type ValueNode = ObjectNode | ArrayNode | LiteralNode | PropertyNode;

const require = createRequire(import.meta.url),
	schema = await getLatestSchema(),
	changedPresences = getDiff(),
	validLangs = await getValidLanguages(),
	compiler = new PresenceCompiler(),
	errors: {
		presence: string;
		message: string | Error;
		properties?: actions.AnnotationProperties | undefined;
	}[] = [],
	warnings: {
		presence: string;
		message: string | Error;
		properties?: actions.AnnotationProperties | undefined;
	}[] = [];

for (const presence of changedPresences) {
	const presencePath = compiler.getPresenceFolder(presence);

	//#region Metadata Check
	if (!existsSync(resolve(presencePath, "metadata.json"))) {
		errors.push({
			presence,
			message: `Presence (${presence}) is missing metadata.json`,
			properties: {
				file: resolve(presencePath, "metadata.json"),
			},
		});
		continue;
	}

	let metadata: SchemaMetadata;

	try {
		metadata = require(resolve(presencePath, "metadata.json"));
	} catch {
		errors.push({
			presence,
			message: `Presence (${presence}) metadata.json is not a valid JSON file`,
			properties: {
				file: resolve(presencePath, "metadata.json"),
			},
		});
		continue;
	}
	//#endregion

	const storePresence = (
		await getStorePresence(metadata.service)
	).data.presences.find(p => p.metadata.service === metadata.service);

	//#region Schema Check
	const result = validate(metadata, schema.schema);

	if (result.errors.length) {
		for (const error of result.errors) {
			errors.push({
				presence,
				message: error.message,
				properties: {
					file: resolve(presencePath, "metadata.json"),
					startLine: getLine(...error.path),
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
			message: `Schema version is not up to date (Presence: ${presence}) - expected: ${schema.url}, got: ${metadata.$schema}`,
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
		if (compare(metadata.version, storePresence.metadata.version) <= 0) {
			errors.push({
				presence,
				message: `Version has not been bumped (Presence: ${presence})`,
				properties: {
					file: resolve(presencePath, "metadata.json"),
					startLine: getLine("version"),
				},
			});
		}
	} else if (metadata.version !== "1.0.0") {
		errors.push({
			presence,
			message: `Initial version must be 1.0.0 (Presence: ${presence})`,
			properties: {
				file: resolve(presencePath, "metadata.json"),
				startLine: getLine("version"),
			},
		});
	}

	//#endregion

	//#region Presence iFrame Check
	const iframePath = resolve(presencePath, "iframe.ts");

	if (!existsSync(iframePath) && metadata.iframe) {
		errors.push({
			presence,
			message: `Presence (${presence}) is missing iframe.ts`,
			properties: {
				file: iframePath,
			},
		});
	}

	if (!metadata.iframe && existsSync(iframePath)) {
		errors.push({
			presence,
			message: `Presence (${presence}) has iframe.ts but metadata.iframe is set to false`,
			properties: {
				file: iframePath,
			},
		});
	}

	if (metadata.iFrameRegExp === ".*") {
		warnings.push({
			presence,
			message: `Presence (${presence}) has metadata.iFrameRegExp set to '.*', please change this if possible`,
			properties: {
				file: resolve(presencePath, "metadata.json"),
				startLine: getLine("iFrameRegExp"),
			},
		});
	}

	if (metadata.iFrameRegExp && !metadata.iframe) {
		errors.push({
			presence,
			message: `Presence (${presence}) has metadata.iFrameRegExp set but metadata.iframe is set to false`,
			properties: {
				file: resolve(presencePath, "metadata.json"),
				startLine: getLine("iFrameRegExp"),
			},
		});
	}

	if (!metadata.iFrameRegExp && metadata.iframe) {
		warnings.push({
			presence,
			message: `Presence (${presence}) has metadata.iframe set to true but metadata.iFrameRegExp is not set, you may want to set it`,
			properties: {
				file: resolve(presencePath, "metadata.json"),
				startLine: getLine("iFrameRegExp"),
			},
		});
	}
	//#endregion

	//#region Presence language Check
	Object.keys(metadata.description).forEach(lang => {
		const index = validLangs.findIndex((l: string) => l === lang);

		if (!~index) {
			errors.push({
				presence,
				message: `Language ${lang} is not supported`,
				properties: {
					file: resolve(presencePath, "metadata.json"),
					startLine: getLine("description", lang),
				},
			});
		}
	});
	//#endregion

	function getLine(...path: (string | number)[]): number | undefined {
		const AST = jsonAst(
			readFileSync(resolve(presencePath, "metadata.json"), "utf-8"),
			{
				source: resolve(presencePath, "metadata.json"),
			}
		) as ObjectNode;

		let currentNode: ValueNode | undefined = AST.children.find(
				x => x.key.value === path[0]
			),
			isRoot = true;

		for (const value of path) {
			if (isRoot) {
				isRoot = false;
				continue;
			}

			if (!currentNode) return 0;
			else currentNode = findNodeLine(currentNode, value) as PropertyNode;
		}

		return currentNode?.loc?.start.line;
	}

	function findNodeLine(
		node: ValueNode,
		value: string | number
	): ValueNode | undefined {
		switch (node.type) {
			case "Property":
				return findNodeLine(node.value, value);
			case "Array":
				if (Number.isInteger(value)) return node.children[value as number];
				else return node.children.find(x => findNodeLine(x, value));
			case "Object":
				return node.children.find(x => x.key.value === value);
			case "Literal":
				return node;
		}
	}

	actions.info(chalk.green(`${metadata.service} validated successfully`));
}

if (warnings.length)
	for (const warning of warnings)
		actions.warning(warning.message, warning.properties);
if (errors.length) {
	for (const error of errors) actions.error(error.message, error.properties);
	actions.setFailed("Some Presences failed to validate.");
} else actions.info("All Presences validated successfully");

async function getValidLanguages() {
	return (
		await got<{
			data: {
				langFiles: [
					{
						lang: string;
					}
				];
			};
		}>("https://api.premid.app/v3", {
			method: "post",
			responseType: "json",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: `
					query {
						langFiles(project: "presence") {
							lang
						}
					}
				`,
			}),
		})
	).body.data.langFiles.map(l => l.lang);
}

async function getStorePresence(presences: string) {
	try {
		return (
			await got<{
				data: {
					presences: [
						{
							metadata: {
								service: string;
								version: string;
							};
						}
					];
				};
			}>("https://api.premid.app/v3", {
				method: "post",
				responseType: "json",
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
					}
				`,
					variables: {
						service: presences,
					},
				}),
			})
		).body;
	} catch {
		actions.setFailed("Could not fetch store data");
		process.exit();
	}
}
