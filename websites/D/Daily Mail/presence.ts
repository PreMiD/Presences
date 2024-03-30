import { findPage } from "./findPage";
import { handleNewsPage } from "./newsPage";

const presence = new Presence({
	clientId: "1217153856665026580",
});

export const enum Assets {
	Logo = "https://i.imgur.com/glm7on6.png",
	ExclIco = "https://i.imgur.com/FitEOZS.png",
	PlayIco = "https://i.imgur.com/rmA1FMA.jpeg",
	PauseIco = "https://i.imgur.com/DFFBv1a.png",
}

const enum Pages {
	homepage = "home",
	news = "news",
	wellness = "wellness-us", // apparently there's....no uk page?
}

// possible expansion for other countries, leave as helper function
const catToCountry = (cat: string): string[] => {
	if (cat.startsWith("us")) return [cat.replace("us", ""), "Daily Mail (US)"];
	else if (cat.startsWith("au"))
		return [cat.replace("au", ""), "Daily Mail (US)"];
	return [cat.replace("us", ""), "Daily Mail"];
};

presence.on("UpdateData", async () => {
	if (!document.location.toString()) return;

	// all urls are formatted "category/pagename"
	const [catNoCountry, titleWithCountry] = catToCountry(
			document.location.pathname.split("/")[1]
		),
		presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			name: titleWithCountry,
			type: ActivityType.Playing,
		};

	presenceData.startTimestamp = Math.floor(Date.now() / 1000);

	switch (catNoCountry) {
		case Pages.homepage:
			{
				const subcat = document
					.querySelector("[data-mol-fe-latest-headlines--active]")
					?.querySelector("a")
					?.textContent?.toLowerCase();

				if (subcat && ["all", "news", "home"].includes(subcat))
					presenceData.details = `Browsing the latest ${subcat} news`;
				else presenceData.details = "Browsing the latest news";
			}
			break;

		case Pages.news:
			handleNewsPage(presenceData);
			break;

		default:
			findPage(document.location.pathname.substring(1), presenceData);
			break;
	}

	presence.setActivity(presenceData);
});
