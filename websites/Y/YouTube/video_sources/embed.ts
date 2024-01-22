import { Resolver } from "../util";
import { getChannelURL } from "./default";

function isActive(): boolean {
	return document.location.pathname.includes("/embed");
}

function getTitle(): string {
	return document
		.querySelector('[class="reel-video-in-sequence style-scope ytd-shorts"]')
		?.querySelector(
			'[class="title style-scope ytd-reel-player-header-renderer"]'
		)
		?.textContent.trim();
}

function getUploader(): string {
	return document
		.querySelector("div.ytp-title-expanded-heading > h2 > a")
		?.textContent.trim();
}

const resolver: Resolver = {
	isActive,
	getTitle,
	getUploader,
	getChannelURL,
};

export default resolver;
