import { Resolver } from "../util";

function isActive(): boolean {
	return !!getTitle();
}

function getTitle() {
	if (document.location.pathname.includes("/watch")) {
		return document
			.querySelector("h1 yt-formatted-string.ytd-video-primary-info-renderer")
			?.textContent.trim();
	} else {
		return document.querySelector(".ytd-miniplayer .title")?.textContent.trim();
	}
}

function getUploader() {
	return (
		document
			.querySelector("ytd-video-owner-renderer .ytd-channel-name a")
			.textContent.trim() ||
		document.querySelector("yt-formatted-string#owner-name")?.textContent.trim()
	);
}

const resolver: Resolver = {
	isActive,
	getTitle,
	getUploader,
};

export default resolver;
