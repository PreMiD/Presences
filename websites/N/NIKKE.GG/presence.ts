const presence = new Presence({
		clientId: "1230509717055602849",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://i.imgur.com/nA6br84.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		getImageCharacter = (url: string) =>
			`${"https://static.dotgg.gg/nikke/characters/"}si_c${
				url.match(/c(\d+)_\d+/)[1]
			}_${url.match(/c\d+_(\d+)/)[1]}_s.webp`,
		getImageMonster = (url: string) =>
			`https://static.dotgg.gg/nikke/monsters/si_${url
				.substring(url.lastIndexOf("/") + 1, url.lastIndexOf("."))
				.replace("full_", "")}.webp`,
		{ href, pathname, search } = document.location,
		thumbnail = document
			.querySelector<HTMLMetaElement>('meta[property="og:image"]')
			?.getAttribute("content"),
		title = document
			.querySelector<HTMLMetaElement>('meta[property="og:title"]')
			?.getAttribute("content");

	if (search.startsWith("?s")) {
		presenceData.largeImageKey = Assets.Logo;
		presenceData.state = search.split("&")[0].split("=")[1].replace(/\+/g, " ");
		presenceData.details = "Searching for";
		presenceData.smallImageKey = Assets.Search;
	} else if (pathname.startsWith("/characters")) {
		if (pathname === "/characters/") {
			presenceData.largeImageKey = Assets.Logo;
			presenceData.details = "Viewing Characters List";
			presenceData.smallImageKey = Assets.Viewing;
		} else {
			presenceData.largeImageKey = getImageCharacter(thumbnail);
			presenceData.state = `${title.split("|")[0]}`;
			presenceData.details = "Viewing Character";
			presenceData.smallImageKey = Assets.Reading;
			presenceData.smallImageText = "Reading";
			presenceData.buttons = [{ label: "View Character", url: href }];
		}
	} else if (pathname.startsWith("/monsters")) {
		if (pathname === "/monsters/") {
			presenceData.largeImageKey = Assets.Logo;
			presenceData.details = "Viewing Rapture List";
			presenceData.smallImageKey = Assets.Viewing;
		} else {
			presenceData.largeImageKey = `${getImageMonster(
				document
					.querySelectorAll<HTMLMetaElement>('meta[property="og:image"]')[1]
					.getAttribute("content")
					.replace(".png.png", ".png")
			)}`;
			presenceData.state = `${
				document
					.querySelectorAll<HTMLMetaElement>('meta[property="og:title"]')[1]
					.getAttribute("content")
					.split("|")[0]
			}`;
			presenceData.details = "Viewing Rapture";
			presenceData.smallImageKey = Assets.Reading;
			presenceData.smallImageText = "Reading";
			presenceData.buttons = [{ label: "View Rapture", url: href }];
		}
	} else if (pathname.startsWith("/tier-list")) {
		presenceData.largeImageKey = thumbnail || Assets.Logo;
		presenceData.state = `${title.split("|")[0]}`;
		presenceData.details = "Viewing Tier List";
		presenceData.smallImageKey = Assets.Reading;
		presenceData.smallImageText = "Reading";
		presenceData.buttons = [{ label: "View Tierlist", url: href }];
	} else if (pathname.startsWith("/")) {
		presenceData.largeImageKey = thumbnail || Assets.Logo;
		presenceData.state = `${title.split("|")[0]}`;
		presenceData.details = "Viewing Guide";
		presenceData.smallImageKey = Assets.Reading;
		presenceData.smallImageText = "Reading";
		presenceData.buttons = [{ label: "View Guide", url: href }];
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
