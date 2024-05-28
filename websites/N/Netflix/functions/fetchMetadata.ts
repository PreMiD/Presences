import pLimit from "p-limit";
import { Root } from "../types";
import { buildIdentifier } from "./getBuildIdentifier";

const limit = pLimit(1);

export let metadata: {
	url: string;
	data?: Root;
} | null = null;

export async function fetchMetadata(id: string) {
	await limit(async () => {
		if (metadata?.url === document.location.href) return;

		metadata = { url: document.location.href };
		metadata.data = await (
			await fetch(
				`https://www.netflix.com/nq/website/memberapi/${buildIdentifier}/metadata?movieid=${id}`
			)
		).json();
		console.log(await metadata.data);
	});
}

export async function clearMetadata() {
	metadata = null;
}
