import { Resolver, truncateAfter } from "../util";
import { getChannelURL, getVideoID } from "./default";

function isActive(): boolean {
	return (
		!!document.querySelector(".player-video-title") &&
		!!getTitle() &&
		!!getUploader() &&
		!!getVideoID() &&
		!!getChannelURL()
	);
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
	getVideoID,
};

export default resolver;
