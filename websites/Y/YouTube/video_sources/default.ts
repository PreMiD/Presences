import { Resolver } from "../util";

function isActive(): boolean {
	return !!getTitle() && !!getUploader();
}

function getTitle(): string {
	if (document.location.pathname.includes("/watch")) {
		return document
			.querySelector("h1 yt-formatted-string.ytd-video-primary-info-renderer")
			?.textContent.trim();
	} else
		return document.querySelector(".ytd-miniplayer .title")?.textContent.trim();
}

function getUploader(): string {
	return (
		document
			.querySelector("ytd-video-owner-renderer .ytd-channel-name a")
			?.textContent.trim() ||
		document.querySelector("yt-formatted-string#owner-name")?.textContent.trim()
	);
}

export function getChannelURL(): string {
	return document.querySelector<HTMLLinkElement>(
		"#top-row ytd-video-owner-renderer > a"
	)?.href;
}

const resolver: Resolver = {
	isActive,
	getTitle,
	getUploader,
	getChannelURL,
};

export default resolver;
