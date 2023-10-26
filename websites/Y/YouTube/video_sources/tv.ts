import { Resolver, truncateAfter } from "../util";

function isActive(): boolean {
	return !!document.querySelector(".player-video-title");
}

function getTitle() {
	return document.querySelector(".player-video-title")?.textContent.trim();
}

const YOUTUBE_TV_SEPERATOR = "•";
function getUploader() {
	let title = document
		.querySelector(".player-video-details")
		?.textContent.trim();
	if (title) {
		title = truncateAfter(title, YOUTUBE_TV_SEPERATOR);
	}
	return title;
}

const resolver: Resolver = {
	isActive,
	getTitle,
	getUploader,
};

export default resolver;
