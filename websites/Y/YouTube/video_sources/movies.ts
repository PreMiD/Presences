import { Resolver } from "../util";

function isActive(): boolean {
	return true;
}

function getTitle() {
	return document
		.querySelector(".title.style-scope.ytd-video-primary-info-renderer")
		?.textContent.trim();
}

function getUploader() {
	return (
		document
			.querySelector(".style-scope.ytd-channel-name > a")
			?.textContent.trim() ||
		document
			.querySelector(".style-scope.ytd-channel-name > a")
			?.textContent.trim() ||
		document.querySelector("div.ytp-title-text > a")?.textContent
	);
}

const resolver: Resolver = {
	isActive,
	getTitle,
	getUploader,
};

export default resolver;
