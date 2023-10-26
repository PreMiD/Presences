export function truncateAfter(str: string, pattern: string): string {
	return str.slice(0, str.indexOf(pattern));
}

export interface Resolver {
  isActive(): boolean;
  getTitle(): string;
  getUploader(): string;
}
