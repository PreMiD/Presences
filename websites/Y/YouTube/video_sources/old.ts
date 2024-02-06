import { Resolver } from "../util";
import { getChannelURL, getVideoID } from "./default";

function isActive(): boolean {
	return (
		!!document.querySelector(".watch-title") &&
		document.location.pathname.includes("/watch") &&
		!!getTitle() &&
		!!getUploader()
	);
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
