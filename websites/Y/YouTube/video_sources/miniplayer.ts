import { Resolver } from "../util";

function isActive(): boolean {
	return !!getTitle() && !!getUploader() && !!getVideoID() && !!getChannelURL();
}

function getTitle(): string {
	return document.querySelector(".ytd-miniplayer .title")?.textContent.trim();
}

function getUploader(): string {
	return document.querySelector("#owner-name")?.textContent.trim();
}

function getVideoID(): string {
	const link =
		document.querySelector<HTMLAnchorElement>("#video-title-link").href;
	if (!link) return null;

	return new URL(link).searchParams.get("v");
}

function getChannelURL(): string {
	return document.querySelector<HTMLAnchorElement>(
		"#ytd-player .ytp-ce-channel-title.ytp-ce-link"
	)?.href;
}

const resolver: Resolver = {
	isActive,
	getTitle,
	getUploader,
	getChannelURL,
	getVideoID,
};

export default resolver;
