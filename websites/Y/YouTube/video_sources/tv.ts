import { Resolver, truncateAfter } from "../util";
import { getChannelURL } from "./default";

function isActive(): boolean {
	return !!document.querySelector(".player-video-title");
}

function getTitle(): string {
	return document.querySelector(".player-video-title")?.textContent.trim();
}

function getUploader(): string {
	let title = document
		.querySelector(".player-video-details")
		?.textContent.trim();
	if (title) title = truncateAfter(title, "•");
	return title;
}

const resolver: Resolver = {
	isActive,
	getTitle,
	getUploader,
	getChannelURL,
};

export default resolver;
