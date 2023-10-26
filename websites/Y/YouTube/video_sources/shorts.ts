import { Resolver } from "../util";

function isActive(): boolean {
	return !!document.location.pathname.includes("/shorts/");
}

function getTitle(): string {
	return document
		.querySelector('[class="ytp-title-link yt-uix-sessionlink"]')
		?.textContent.trim();
}

function getUploader() {
	return cached?.uploader;
}

function delay(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

let cached: { id: string; uploader: string; channelURL: string };
export async function cacheShortData(hostname: string, shortsPath: string) {
	if (!cached?.id || cached.id !== shortsPath) {
		await delay(300);
		const closest =
			document
				.querySelector("video")
				?.closest("ytd-reel-video-renderer")
				?.querySelector(
					"yt-formatted-string#text.style-scope.ytd-channel-name"
				) ??
			document
				.querySelectorAll("video")[1]
				?.closest("ytd-reel-video-renderer")
				?.querySelector(
					"yt-formatted-string#text.style-scope.ytd-channel-name"
				);
		cached = {
			id: shortsPath,
			uploader: `${closest
				.querySelector("a")
				?.getAttribute("href")
				?.replace("/", "")
				?.replace("@", "")} (${closest?.textContent})`,
			channelURL: `https://${hostname}/${closest?.textContent}`,
		};
		return cached;
	} else return cached;
}
export function getCache() {
  return cached;
}

const resolver: Resolver = {
	isActive,
	getTitle,
	getUploader,
};

export default resolver;
