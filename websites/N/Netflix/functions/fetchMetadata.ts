import pLimit from "p-limit";
import { Root } from "../types";

const limit = pLimit(1);

export let metadata: {
	url: string;
	data?: Root;
} | null = null;

export async function fetchMetadata(id: string): Promise<void> {
	await limit(async () => {
		if (metadata?.url === document.location.href) return;

		metadata = { url: document.location.href };
		metadata.data = await (
			await fetch(
				`https://www.netflix.com/nq/website/memberapi/release/metadata?movieid=${id}`
			)
		).json();
	});
}

export function clearMetadata(): void {
	metadata = null;
}
