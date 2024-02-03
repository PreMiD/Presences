export function defaultTo<T>(
	value: T | null | undefined,
	defaultValue: T,
	options: {
		allowEmptyString?: boolean;
		allowZero?: boolean;
	} = {}
): T {
	const { allowEmptyString = false, allowZero = false } = options;
	if (typeof value === "string" && !allowEmptyString && value === "") return defaultValue;
	if (typeof value === "number" && !allowZero && value === 0) return defaultValue;
	return value ?? defaultValue;
}
