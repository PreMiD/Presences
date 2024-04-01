import { specialPageHandler } from "./pages/special";
import { staticPages } from "./pages/static";

const presence = new Presence({
		clientId: "1221269583567261786",
	}),
	slideshow = presence.createSlideshow(),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let oldPage: string;

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/J/Japanese%20Mahjong%20Wiki/assets/logo.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
			name: "Japanese Mahjong Wiki",
		},
		{ pathname } = document.location;

	if (oldPage !== pathname) {
		oldPage = pathname;
		slideshow.deleteAllSlides();
	}

	let isStatic = false,
		usesSlideshows = false;
	for (const [path, data] of Object.entries(staticPages)) {
		if (path === pathname) {
			isStatic = true;
			Object.assign(presenceData, data);
			break;
		}
	}

	if (!isStatic)
		usesSlideshows = await specialPageHandler(presenceData, slideshow);

	if (usesSlideshows) presence.setActivity(slideshow);
	else if (presenceData.details) presence.setActivity(presenceData);
});
