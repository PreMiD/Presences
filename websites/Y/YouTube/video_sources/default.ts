import { Resolver } from "../util";

function isActive(): boolean {
	return !!getTitle() && !!getUploader() && !!getVideoID() && !!getChannelURL();
}

function getTitle(): string {
	return getBaseSection()
		?.querySelector("h1 yt-formatted-string.ytd-video-primary-info-renderer")
		?.textContent.trim();
}

function getUploader(): string {
	return getBaseSection()
		?.querySelector("ytd-video-owner-renderer .ytd-channel-name a")
		?.textContent.trim();
}

export function getVideoID(): string {
	return (
		getBaseSection()
			?.querySelector("#page-manager > [video-id]")
			?.getAttribute("video-id") ??
		new URLSearchParams(document.location.search).get("v")
	);
}

export function getChannelURL(): string {
	return getBaseSection()?.querySelector<HTMLAnchorElement>(
		"#upload-info #channel-name a"
	)?.href;
}

function getBaseSection(): HTMLElement | null {
	return document.querySelector(".ytd-page-manager:not([hidden])");
}

const resolver: Resolver = {
	isActive,
	getTitle,
	getUploader,
	getChannelURL,
	getVideoID,
};

export default resolver;
