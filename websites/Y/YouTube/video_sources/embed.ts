import { Resolver } from "../util";

function isActive() {
	return document.location.pathname.includes("/embed");
}

function getTitle() {
	return document
		.querySelector('[class="reel-video-in-sequence style-scope ytd-shorts"]')
		?.querySelector(
			'[class="title style-scope ytd-reel-player-header-renderer"]'
		)
		?.textContent.trim();
}

function getUploader() {
	return document
		.querySelector("div.ytp-title-expanded-heading > h2 > a")
		?.textContent.trim();
}

const resolver: Resolver = {
	isActive,
	getTitle,
	getUploader,
};

export default resolver;
