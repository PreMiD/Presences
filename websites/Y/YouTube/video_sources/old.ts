import { Resolver } from "../util";
import { getVideoID } from "./default";

function isActive(): boolean {
	return (
		!!document.querySelector(".watch-title") &&
		document.location.pathname.includes("/watch") &&
		!!getTitle() &&
		!!getUploader() &&
		!!getVideoID() &&
		!!getChannelURL()
	);
}

function getChannelURL(): string {
	return document.querySelector<HTMLLinkElement>(
		"#top-row ytd-video-owner-renderer > a"
	)?.href;
}

function getTitle(): string {
	return document.querySelector(".watch-title")?.textContent.trim();
}

function getUploader(): string {
	return document.querySelector("#owner-name a")?.textContent.trim();
}

const resolver: Resolver = {
	isActive,
	getTitle,
	getUploader,
	getChannelURL,
	getVideoID,
};

export default resolver;
