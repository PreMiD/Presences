import type { Presence, PresenceConfig } from "../index.js";
import type { ConsoleLog, ConsoleLogType } from "../log.js";

export function defineLogs<Config extends PresenceConfig = PresenceConfig>(presence: Presence<Config>) {
	const logs: ConsoleLog[] = [];

	//* Listen for logs
	presence.on("consoleLog", log => {
		logs.push(log);
		//* Remove old logs
		if (logs.length > 100) logs.shift();
	});

	/**
	 * Get the last 100 logs (or less if there are less than 100 logs, or less if the logs don't match the options)
	 *
	 * (Note: The logs are not saved between page loads, and are only available while the user is on the page)
	 *
	 * Logs from our own log, error, warn, and info functions are automatically filtered out
	 *
	 * @param options The options to use when getting the logs
	 */
	function useLogs<Log = unknown>(options: {
		/**
		 * A regular expression to match the log content
		 *
		 * If the log content is a string, it will be tested against the regular expression
		 * If the log content is not a string, the log will be ignored
		 */
		match?: RegExp;
		/**
		 * The types of logs to return
		 * @default ["log"]
		 */
		types?: [ConsoleLogType, ...ConsoleLogType[]];
		/**
		 * Whether to return only the log content
		 *
		 * If `true`, the function will return an array of the log content
		 * If `false`, the function will return an array of the log objects (an object with the properties `id`, `timestamp`, `type`, and `content`)
		 * @default true
		 */
		contentOnly?: true;
	}): Log[];
	/**
	 * Get the last 100 logs (or less if there are less than 100 logs, or less if the logs don't match the options)
	 *
	 * (Note: The logs are not saved between page loads, and are only available while the user is on the page)
	 *
	 * Logs from our own log, error, warn, and info functions are automatically filtered out
	 *
	 * @param options The options to use when getting the logs
	 */
	function useLogs<Log = unknown>(options: {
		/**
		 * A regular expression to match the log content
		 *
		 * If the log content is a string, it will be tested against the regular expression
		 * If the log content is not a string, the log will be ignored
		 */
		match?: RegExp;
		/**
		 * The types of logs to return
		 * @default ["log"]
		 */
		types?: [ConsoleLogType, ...ConsoleLogType[]];
		/**
		 * Whether to return only the log content
		 *
		 * If `true`, the function will return an array of the log content
		 * If `false`, the function will return an array of the log objects (an object with the properties `id`, `timestamp`, `type`, and `content`)
		 * @default true
		 */
		contentOnly: false;
	}): ConsoleLog<Log>[];
	/**
	 * Get the last 100 logs (or less if there are less than 100 logs, or less if the logs don't match the options)
	 *
	 * (Note: The logs are not saved between page loads, and are only available while the user is on the page)
	 *
	 * Logs from our own log, error, warn, and info functions are automatically filtered out
	 *
	 * @param options The options to use when getting the logs
	 */
	function useLogs<Log = unknown>(
		options: {
			/**
			 * A regular expression to match the log content
			 *
			 * If the log content is a string, it will be tested against the regular expression
			 * If the log content is not a string, the log will be ignored
			 */
			match?: RegExp;
			/**
			 * The types of logs to return
			 * @default ["log"]
			 */
			types?: [ConsoleLogType, ...ConsoleLogType[]];
			/**
			 * Whether to return only the log content
			 *
			 * If `true`, the function will return an array of the log content
			 * If `false`, the function will return an array of the log objects (an object with the properties `id`, `timestamp`, `type`, and `content`)
			 * @default true
			 */
			contentOnly?: boolean;
		} = {}
	): Log[] | ConsoleLog<Log>[] {
		const { match, types = ["log"], contentOnly = true } = options,
			logsToReturn = logs.filter(log => {
				if (!types.includes(log.type)) return false;
				if (match) {
					if (typeof log.content === "string") return match.test(log.content);
					return false; //TODO maybe stringifying the content and then testing it?
				}
				return true;
			});

		if (contentOnly) return logsToReturn.map(log => log.content as Log);
		return logsToReturn as ConsoleLog<Log>[];
	}

	return useLogs;
}
