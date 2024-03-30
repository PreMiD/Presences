import { findPage } from "./findPage";
import { handleNewsPage } from "./newsPage";

const presence = new Presence({
	clientId: "1217153856665026580",
});

export const enum Assets {
	Logo = "https://i.imgur.com/glm7on6.png",
	exclIco = "https://www.pngmart.com/files/15/Red-Exclamation-Mark-PNG-Transparent-Image-279x279.png",
	play = "https://static.vecteezy.com/system/resources/previews/000/426/027/original/play-icon-vector-illustration.jpg",
	pause = "https://icons.iconarchive.com/icons/graphicloads/100-flat/256/pause-icon.png",
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
