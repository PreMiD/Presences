export const presence = new Presence({
	clientId: "1222797423953575977",
});

export let browsingTimestamp = Math.floor(Date.now() / 1000);

export const slideshow = presence.createSlideshow();

export const SLIDESHOW_TIMEOUT = 5000;

let currentSlideshowKey: string;
export function registerSlideshowKey(key: string) {
	if (currentSlideshowKey !== key) {
		currentSlideshowKey = key;
		slideshow.deleteAllSlides();
	}
}

export function getWindString(windIndex: number): string {
	switch (windIndex) {
		case 0:
			return "East";
		case 1:
			return "South";
		case 2:
			return "West";
		case 3:
			return "North";
	}
}

export function getPositionString(position: number): string {
	switch (position) {
		case 1:
			return "st";
		case 2:
			return "nd";
		case 3:
			return "rd";
		default:
			return "th";
	}
}

type ObjectIndex = string | number | symbol;

export function assignRecursive(
	target: Record<ObjectIndex, unknown>,
	src: Record<ObjectIndex, unknown>
) {
	for (const key in src) {
		if (typeof src[key] === "object") {
			if (!target[key]) {
				target[key] = {};
			}
			assignRecursive(
				target[key] as Record<ObjectIndex, unknown>,
				src[key] as Record<ObjectIndex, unknown>
			);
		} else {
			target[key] = src[key];
		}
	}
}
