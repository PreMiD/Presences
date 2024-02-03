import type { ChangeLogChangeText, SemanticVersion, Snowflake } from "@presences/types";

export function defineChangeLogs(logs: [ChangeLog, ...ChangeLog[]]): [ChangeLog, ...ChangeLog[]] {
	return logs;
}

export interface ChangeLog {
	/**
	 * The version of this change log.
	 */
	version: SemanticVersion;
	/**
	 * The changes made in this version.
	 *
	 * Please use the following format: `<type>: <description>`. (e.g. `fix: Fixed ... bug`, `feat: Added ...`)
	 *
	 * Also specify per change who made the change. (e.g. `['fix: Fixed ... bug', '123456789012345678', '123456789012345678']`)
	 */
	changes: [[ChangeLogChangeText, Snowflake, ...Snowflake[]], ...[ChangeLogChangeText, Snowflake, ...Snowflake[]][]];
	/**
	 * The timestamp of when this version was released.
	 *
	 * This will be automatically filled in when the Pull Request is merged.
	 */
	timestamp?: number;
}
