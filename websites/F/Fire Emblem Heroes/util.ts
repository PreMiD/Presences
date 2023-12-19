export const presence = new Presence({
	clientId: "1133602327476047873",
});
export const slideshow = presence.createSlideshow();

export const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/F/Fire%20Emblem%20Heroes/assets/logo.png",
}

export function truncateText(text: string): string {
	if (text.length > 127) return `${text.slice(0, 124)}...`;
	return text;
}

function loadImage(image: HTMLImageElement, url: string): Promise<void> {
	return new Promise(resolve => {
		image.addEventListener("load", () => resolve());
		image.src = url;
	});
}

function getCanvasBlob(): Promise<Blob> {
	return new Promise((resolve, reject) => {
		canvas.toBlob(blob => {
			if (!blob) reject();
			resolve(blob);
		}, "image/png");
	});
}

const canvas = document.createElement("canvas"),
	ctx = canvas.getContext("2d");

canvas.height = 512;
canvas.width = 512;

const squareImageCache: Record<string, string> = {};
let isUploading = false;

export async function squareImage(url: string): Promise<string> {
	if (squareImageCache[url]) return squareImageCache[url];
	if (isUploading) return Assets.Logo;
	isUploading = true;
	const image = document.createElement("img");
	image.crossOrigin = "anonymous";
	await loadImage(image, url);
	const canvasWidth = canvas.width,
		canvasHeight = canvas.height,
		imageWidth = image.naturalWidth,
		imageHeight = image.naturalHeight,
		scale = Math.min(canvasWidth / imageWidth, canvasHeight / imageHeight),
		scaledWidth = imageWidth * scale,
		scaledHeight = imageHeight * scale;

	ctx.clearRect(0, 0, 512, 512);
	ctx.drawImage(
		image,
		(canvasWidth - scaledWidth) / 2,
		(canvasHeight - scaledHeight) / 2,
		scaledWidth,
		scaledHeight
	);

	const file = await getCanvasBlob(),
		formData = new FormData();
	formData.append("file", file, "file");

	const resultURL = await fetch("https://pd.premid.app/create/image", {
		method: "POST",
		body: formData,
	}).then(r => r.text());
	isUploading = false;
	squareImageCache[url] = resultURL;
	return resultURL;
}

let section = "",
	intersectionObserversActivated = false;
const observer = new IntersectionObserver(
	entries => {
		let visibleSection = section;
		for (const entry of entries) {
			const { id } = entry.target,
				ratio = entry.intersectionRatio;
			if (ratio > 0.05) {
				visibleSection = id;
				break;
			}
			if (visibleSection === id && ratio < 0.05) visibleSection = "";
		}
		if (visibleSection !== section) section = visibleSection;
	},
	{
		threshold: [0.0, 0.05],
	}
);

/**
 * Observers are used to show what the user is currently viewing on the website.
 * This can be used for pages when individual posts/items are displayed on one page without changing the URL.
 */
export function activateIntersectionObservers(pathList: string[]): void {
	if (intersectionObserversActivated) return;
	switch (pathList[0] ?? "") {
		case "": {
			observer.observe(document.querySelector("#cont2"));
			observer.observe(document.querySelector("#cont4"));
			break;
		}
		case "topics": {
			const articles = [...document.querySelectorAll(".article")];
			for (const article of articles) observer.observe(article);
			break;
		}
	}
	intersectionObserversActivated = true;
}

export function areObserversActivated(): boolean {
	return intersectionObserversActivated;
}

export function resetObservers(): void {
	intersectionObserversActivated = false;
	section = "";
	observer.disconnect();
}

export function getSection(): string {
	return section;
}
