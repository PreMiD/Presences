import { Resolver } from "../util";

function isActive(): boolean {
	return document.location.pathname.includes("/shorts/");
}

function getTitle(): string {
	return document
		.querySelector('[class="ytp-title-link yt-uix-sessionlink"]')
		?.textContent.trim();
}

function getShortsElement(): HTMLElement {
	return (
		document
			.querySelector("video")
			?.closest("ytd-reel-video-renderer")
			?.querySelector(
				"yt-formatted-string#text.style-scope.ytd-channel-name"
			) ??
		document
			.querySelectorAll("video")[1]
			?.closest("ytd-reel-video-renderer")
			?.querySelector("yt-formatted-string#text.style-scope.ytd-channel-name")
	);
}

function getUploader(): string {
	const closest = getShortsElement();
	return `${closest
		?.querySelector("a")
		?.getAttribute("href")
		?.replace("/", "")
		?.replace("@", "")} (${closest?.textContent})`;
}

function getChannelURL(): string {
	return `https://${document.location.hostname}/${
		getShortsElement()?.textContent
	}`;
}

const resolver: Resolver = {
	isActive,
	getTitle,
	getUploader,
	getChannelURL,
};

export default resolver;
