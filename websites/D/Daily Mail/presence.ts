import { findPage } from "./findPage";
import { handleNewsPage } from "./newsPage";

const presence = new Presence({
		clientId: "1224125578504966165",
	}),
	sTs = Math.floor(Date.now() / 1000);

export const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/D/Daily%20Mail/assets/logo.png",
	ExclIco = "https://cdn.rcd.gg/PreMiD/websites/D/Daily%20Mail/assets/0.png",
	PlayIco = "https://cdn.rcd.gg/PreMiD/resources/play.png",
	PauseIco = "https://cdn.rcd.gg/PreMiD/resources/pause.png",
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
			startTimestamp: sTs,
		};

	if (!(await presence.getSetting("showtimestamp")))
		delete presenceData.startTimestamp;

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
			handleNewsPage(
				presenceData,
				await presence.getSetting("usearticlethumbnail")
			);
			break;

		default:
			if (document.location.pathname.split("/")[3]?.startsWith("article-")) {
				handleNewsPage(
					presenceData,
					await presence.getSetting("usearticlethumbnail")
				);
			} else findPage(document.location.pathname.substring(1), presenceData);
			break;
	}

	presence.setActivity(presenceData);
});
