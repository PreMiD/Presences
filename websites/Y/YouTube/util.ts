let cachedTime = 0;
export function adjustTimeError(time: number, acceptableError: number): number {
	if (Math.abs(time - cachedTime) > acceptableError) cachedTime = time;
	return cachedTime;
}

export function truncateAfter(str: string, pattern: string): string {
	return str.slice(0, str.indexOf(pattern));
}

export interface Resolver {
	isActive(): boolean;
	getTitle(): string;
	getUploader(): string;
}
