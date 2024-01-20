import { Resolver } from "../util";
import { getChannelURL } from "./default";

function isActive(): boolean {
	return !!getTitle() && !!getUploader();
}

function getTitle(): string {
	return (
		document
			.querySelector(".title.style-scope.ytd-video-primary-info-renderer")
			?.textContent.trim() ||
		document.querySelector("div.ytp-title-text > a")?.textContent.trim()
	);
}

function getUploader(): string {
	return document
		.querySelector(".style-scope.ytd-channel-name > a")
		?.textContent.trim();
}

const resolver: Resolver = {
	isActive,
	getTitle,
	getUploader,
	getChannelURL,
};

export default resolver;
