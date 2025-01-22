import { Resolver } from "../util";

function isActive(): boolean {
	return !!getTitle() && !!getUploader() && !!getVideoID() && !!getChannelURL();
}

function getTitle(): string {
	return getBaseSection()
		?.querySelector("h2[class*=video-information-title]")
		?.textContent.trim();
}

function getUploader(): string {
	return getBaseSection()
		?.querySelector("[class*=owner-channel-name]")
		?.textContent.trim();
}

// todo: update

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
	return document.body;
}

const resolver: Resolver = {
	isActive,
	getTitle,
	getUploader,
	getChannelURL,
	getVideoID,
};

export default resolver;
