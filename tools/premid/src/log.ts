export type ConsoleLogType = "log" | "info" | "warn" | "error";
export interface ConsoleLog<T = unknown> {
	id: string;
	timestamp: number;
	type: ConsoleLogType;
	content: T;
}
