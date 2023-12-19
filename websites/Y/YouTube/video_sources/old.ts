import { Resolver } from "../util";

function isActive(): boolean {
	return (
		!!document.querySelector(".watch-title") &&
		document.location.pathname.includes("/watch")
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
};

export default resolver;
