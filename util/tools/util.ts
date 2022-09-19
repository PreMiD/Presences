import { exec, type ExecOptions } from "node:child_process";
import { promisify } from "node:util";
import { readFileSync, writeFileSync } from "node:fs";

const execute = promisify(exec);
/**
 * Executes a shell command and returns it as a Promise.
 * @param {string[]} cmd The command to execute
 * @return {Promise<string>}
 */
export async function execShellCommand(
	cmd: string,
	options?: ExecOptions
): Promise<string> {
	const response = await execute(cmd, { ...options });
	if (response.stderr) throw response.stderr;
	return response.stdout;
}

export function createAnnotation(params: CreateAnnotationParams): string {
	const input = [];

	for (const [key, value] of Object.entries(params)) {
		if (["type", "message"].includes(key)) continue;
		else input.push(`${key}=${value}`);
	}

	return `::${params.type} ${input.join(",")}::${params.message}`;
}

function validateArg(arg: string): ValidEventName {
	if (!arg) return;
	if (!["push", "pull_request", "uncommitted"].includes(arg))
		throw new Error(`SV was not called with a valid event name: ${arg}`);
	return arg as ValidEventName;
}

/**
 * Gets an array of all the changed folders using the git diff
 * @returns {Promise<string[]>} Array of unique paths to the changed folders
 */
export async function getChangedFolders() {
	const commands: Record<ValidEventName, string> = {
			push: "HEAD HEAD^",
			pull_request: `HEAD origin/${process.argv[3] ?? "main"}`,
			uncommitted: "HEAD --",
		},
		eventName = validateArg(process.argv[2]) ?? "pull_request",
		changedPresenceFolders = (
			await execShellCommand(
				`git --no-pager diff --name-only ${commands[eventName]}`
			)
		)
			.split("\n")
			.filter(
				file =>
					file.includes("presence.ts") ||
					file.includes("iframe.ts") ||
					file.includes("metadata.json")
			);

	if (changedPresenceFolders.length === 0) return [];

	for (const [i, dir] of changedPresenceFolders.entries()) {
		// Normalize the path and seperate it on OS specific seperator
		const normalizedPath = dir.split("/");

		// Pop off the presence/iframe.ts/metadata.json
		normalizedPath.at(-1) === "metadata.json"
			? normalizedPath.splice(normalizedPath.length - 1, 1)
			: normalizedPath.pop();

		changedPresenceFolders[i] = normalizedPath.join("/");
	}
	return [...new Set(changedPresenceFolders)];
}

export const readFile = (path: string): string =>
		readFileSync(path, { encoding: "utf8" }),
	/**
	 * Helper function to read a JSON file into memory
	 * @param jsonPath Path to the JSON file
	 */
	readJson = <T>(jsonPath: string): T => JSON.parse(readFile(jsonPath)),
	/**
	 * Helper function to write a JSON file to disk
	 * @param data The data to write to the JSON file
	 * @param jsonPath The path to write the JSON file to
	 */
	writeJson = <T>(data: T, jsonPath: string): void =>
		writeFileSync(jsonPath, JSON.stringify(data, null, "\t"), {
			encoding: "utf8",
		});

export function isValidJSON(text: string): boolean {
	try {
		JSON.parse(text);
		return true;
	} catch {
		return false;
	}
}

export type ValidEventName = "push" | "pull_request" | "uncommitted";

export interface Metadata {
	$schema: `https://schemas.premid.app/metadata/${number}.${number}`;
	author: Contributor;
	contributors?: Contributor[];
	service: string;
	altnames?: string[];
	description: { [lang: string]: string };
	url: `${string}.${string}` | `${string}.${string}`[];
	regExp?: string;
	version: `${number}.${number}.${number}`;
	logo: `https://i.imgur.com/${string}.${ImageTypes}`;
	thumbnail: `https://i.imgur.com/${string}.${ImageTypes}`;
	color: `#${string}`;
	tags: string | string[];
	category: string;
	iframe?: boolean;
	iFrameRegExp?: string;
	readLogs?: boolean;
	settings?:
		| Setting
		| MultiLanguageSetting
		| StringSetting
		| ValueSetting
		| ValuesSetting;
}

interface Contributor {
	name: string;
	id: `${bigint}`;
}

type ImageTypes = "png" | "jpeg" | "jpg" | "gif";

interface BaseSetting {
	id: string;
}

interface MultiLanguageSetting extends BaseSetting {
	multiLanguage: true | string | string[];
}

interface Setting extends BaseSetting {
	title: string;
	icon: string;
	if?: {
		[key: string]: Value;
	};
}

interface StringSetting extends Setting {
	value: string;
	placeholder: string;
}

interface ValueSetting extends Setting {
	value: boolean;
}

interface ValuesSetting extends Setting {
	value: number;
	values: Value[];
}

type Value = string | number | boolean;

interface CreateAnnotationParams {
	type: "warning" | "error" | "notice";
	title?: string;
	file: string;
	line?: string | number;
	endLine?: string | number;
	col?: string | number;
	endColumn?: string | number;
	message: string;
}
