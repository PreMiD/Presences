import { Assets } from "../presence";
import { getWorkspaceName } from "../lib/workspace";

function getEndpoint() {
	const input = document.querySelector("input#url") as HTMLInputElement;

	if (!input) return null;

	const url = new URL(input.value);

	return `${url.hostname}${url.pathname}`;
}

export function GraphQL() {
	const endpoint = getEndpoint();

	if (!endpoint) return null;

	return {
		smallImageKey: Assets.GraphQL,
		smallImageText: "GraphQL",
		details: getWorkspaceName(),
		state: `🧑‍💻 | ${endpoint}`,
	};
}
