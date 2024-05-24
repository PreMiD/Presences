export function getRealtimeEndpoint() {
	const input = document.querySelector("input[type=url]") as HTMLInputElement;

	if (!input) return null;

	const url = new URL(input.value);

	return `${url.hostname}${url.pathname}`;
}
