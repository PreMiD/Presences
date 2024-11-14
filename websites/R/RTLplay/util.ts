export function exist(selector: string) {
	return document.querySelector(selector) !== null;
}

export const stringsMap = {
	play: "general.playing",
	pause: "general.paused",
	search: "general.search",
	searchSomething: "general.searchSomething",
	browsing: "general.browsing",
	viewing: "general.viewing",
	viewPage: "general.viewPage",
	viewAPage: "general.viewAPage",
	viewHome: "general.viewHome",
	viewAccount: "general.viewAccount",
	viewChannel: "general.viewChannel",
	viewCategory: "general.viewCategory",
	viewList: "netflix.viewList",
	buttonViewPage: "general.buttonViewPage",
	watching: "general.watching",
	watchingAd: "youtube.ad",
	watchingLive: "general.watchingLive",
	watchingShow: "general.watchingShow",
	watchingMovie: "general.watchingMovie",
	listeningMusic: "general.listeningMusic",
	buttonWatchStream: "general.buttonWatchStream",
	buttonWatchVideo: "general.buttonWatchVideo",
	buttonWatchEpisode: "general.buttonViewEpisode",
	buttonWatchMovie: "general.buttonWatchMovie",
	buttonListenAlong: "general.buttonListenAlong",
	live: "general.live",
	season: "general.season",
	episode: "general.episode",
	// Custom strings
	deferred: "general.deferred",
	movie: "general.movie",
	tvshow: "general.tvshow",
	privacy: "general.privacy",
};

export function getAdditionnalStrings(lang: string, strings: typeof stringsMap) {
	switch (lang) {
		case "fr-FR": {
			strings.deferred = "En Différé";
			strings.movie = "Film";
			strings.tvshow = "Série";
			strings.privacy = "Lecture privée";

			// Improved translation in the context of this website
			strings.watchingShow = "Regarde une émission ou une série";
			break;
		}
		case "nl-NL": {
			strings.deferred = "Uitgestelde";
			strings.movie = "Film";
			strings.tvshow = "Série";
			strings.privacy = "";
			break;
		}
		case "de-DE": {
			strings.deferred = "Zeitversetzt";
			strings.movie = "Film";
			strings.tvshow = "Fernsehserie";
			strings.privacy = "";
			break;
		}
		default: {
			strings.deferred = "Deferred";
			strings.movie = "Movie";
			strings.tvshow = "TV Serie";
			strings.privacy = "Private mode";
		}
	}
	return strings;
}

// Mainly used to truncate largeImageKeyText because the limit is 128 characters
export function limitText(input: string) {
    const maxLength = 128,
    ellipsis = " ...";

    // If input is within limit, return it as is
    if (input.length <= maxLength) return input;

    // Truncate to 125 characters (leaving room for ellipsis)
    let truncated = input.slice(0, maxLength - ellipsis.length);

    // If the truncated text ends mid-word, remove the partial word
    if (truncated.lastIndexOf(" ") !== -1) 
        truncated = truncated.slice(0, truncated.lastIndexOf(" "));
    
    return truncated + ellipsis;
}

export const enum LargeAssets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/R/RTLplay/assets/logo.png",
	Animated = "https://cdn.rcd.gg/PreMiD/websites/R/RTLplay/assets/0.gif",
	Deferred = "https://cdn.rcd.gg/PreMiD/websites/R/RTLplay/assets/1.gif",
	LiveAnimated = "https://cdn.rcd.gg/PreMiD/websites/R/RTLplay/assets/2.gif",
	Listening = "https://cdn.rcd.gg/PreMiD/websites/R/RTLplay/assets/3.png",
	Binoculars = "https://imgur.com/aF3TWVK.png",
	Privacy = "https://imgur.com/nokHvhE.png",
	AdEn = "https://cdn.rcd.gg/PreMiD/websites/R/RTLplay/assets/4.png",
	AdFr = "https://cdn.rcd.gg/PreMiD/websites/R/RTLplay/assets/5.png",
	RTLPlay = "https://cdn.rcd.gg/PreMiD/websites/R/RTLplay/assets/6.png",
	RTLTVi = "https://cdn.rcd.gg/PreMiD/websites/R/RTLplay/assets/7.png",
	RTLClub = "https://cdn.rcd.gg/PreMiD/websites/R/RTLplay/assets/8.png",
	RTLPlug = "https://cdn.rcd.gg/PreMiD/websites/R/RTLplay/assets/9.png",
	BelRTL = "https://cdn.rcd.gg/PreMiD/websites/R/RTLplay/assets/10.png",
	Contact = "https://cdn.rcd.gg/PreMiD/websites/R/RTLplay/assets/11.png",
}

export function getChannel(channel: string) {
	switch (true) {
		case channel.includes("tvi"): {
			return {
				channel: "RTL TVi",
				type: ActivityType.Watching,
				logo: LargeAssets.RTLTVi,
			};
		}
		case channel.includes("club"): {
			return {
				channel: "RTL club",
				type: ActivityType.Watching,
				logo: LargeAssets.RTLClub,
			};
		}
		case channel.includes("plug"): {
			return {
				channel: "RTL plug",
				type: ActivityType.Watching,
				logo: LargeAssets.RTLPlug,
			};
		}
		case channel.includes("bel"): {
			return {
				channel: "Bel RTL",
				type: ActivityType.Listening,
				logo: LargeAssets.BelRTL,
			};
		}
		case channel.includes("contact"): {
			return {
				channel: "Radio Contact",
				type: ActivityType.Listening,
				logo: LargeAssets.Contact,
			};
		}
		default: {
			return {
				channel,
				type: ActivityType.Watching,
				logo: LargeAssets.RTLPlay,
			};
		}
	}
}

// Adapted veryCrunchy's function from YouTube Presence https://github.com/PreMiD/Presences/pull/8000
export async function getThumbnail(src: string): Promise<string> {
	return new Promise(resolve => {
		const img = new Image(),
			wh = 320,
			borderThickness = 15, // Thickness of the gradient border
			cropLeftRightPercentage = 0.14, // Percentage to crop from left and right for landscape mode (e.g., 0.1 for 10%)
			cropTopBottomPercentage = 0.025; // Percentage to crop from top and bottom for portrait mode (e.g., 0.1 for 10%)
		img.crossOrigin = "anonymous";
		img.src = src;

		img.onload = function () {
			let croppedWidth,
				croppedHeight,
				cropX = 0,
				cropY = 0;

			if (img.width > img.height) {
				// Landscape mode: crop left and right
				const cropLeftRight = img.width * cropLeftRightPercentage;
				croppedWidth = img.width - 2 * cropLeftRight;
				croppedHeight = img.height;
				cropX = cropLeftRight;
			} else {
				// Portrait mode: crop top and bottom
				const cropTopBottom = img.height * cropTopBottomPercentage;
				croppedWidth = img.width;
				croppedHeight = img.height - 2 * cropTopBottom;
				cropY = cropTopBottom;
			}

			const isLandscape = croppedWidth >= croppedHeight;
			let newWidth, newHeight, offsetX, offsetY;

			if (isLandscape) {
				newWidth = wh;
				newHeight = (wh / croppedWidth) * croppedHeight;
				offsetX = 0;
				offsetY = (wh - newHeight) / 2;
			} else {
				newHeight = wh;
				newWidth = (wh / croppedHeight) * croppedWidth;
				offsetX = (wh - newWidth) / 2;
				offsetY = 0;
			}

			const tempCanvas = document.createElement("canvas");
			tempCanvas.width = wh;
			tempCanvas.height = wh;
			const ctx = tempCanvas.getContext("2d");

			// Fill the canvas with the background color
			ctx.fillStyle = "#172e4e";
			ctx.fillRect(0, 0, wh, wh);

			// Create the gradient
			const gradient = ctx.createLinearGradient(0, 0, wh, 0);
			gradient.addColorStop(0, "rgba(245,3,26,1)");
			gradient.addColorStop(0.5, "rgba(63,187,244,1)");
			gradient.addColorStop(1, "rgba(164,215,12,1)");

			// Draw the gradient borders
			if (isLandscape) {
				// Top border
				ctx.fillStyle = gradient;
				ctx.fillRect(0, offsetY - borderThickness, wh, borderThickness);

				// Bottom border
				ctx.fillStyle = gradient;
				ctx.fillRect(0, offsetY + newHeight, wh, borderThickness);
			} else {
				// Create a vertical gradient for portrait mode
				const verticalGradient = ctx.createLinearGradient(0, 0, 0, wh);
				verticalGradient.addColorStop(0, "rgba(245,3,26,1)");
				verticalGradient.addColorStop(0.5, "rgba(63,187,244,1)");
				verticalGradient.addColorStop(1, "rgba(164,215,12,1)");

				// Left border
				ctx.fillStyle = verticalGradient;
				ctx.fillRect(offsetX - borderThickness, 0, borderThickness, wh);

				// Right border
				ctx.fillStyle = verticalGradient;
				ctx.fillRect(offsetX + newWidth, 0, borderThickness, wh);
			}

			// Draw the cropped image
			ctx.drawImage(
				img,
				cropX,
				cropY,
				croppedWidth,
				croppedHeight,
				offsetX,
				offsetY,
				newWidth,
				newHeight
			);

			resolve(tempCanvas.toDataURL("image/png"));
		};

		img.onerror = function () {
			resolve(src);
		};
	});
}