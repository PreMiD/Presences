const presence = new Presence({
		clientId: "1230509717055602849",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/N/NIKKE.GG/assets/logo.png",
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
		presenceData.state = search.split("&")[0].split("=")[1].replace(/\+/g, " ");
		presenceData.details = "Searching for";
		presenceData.smallImageKey = Assets.Search;
	} else if (pathname.startsWith("/characters")) {
		if (pathname === "/characters/") {
			presenceData.details = "Viewing Characters List";
			presenceData.smallImageKey = Assets.Viewing;
		} else {
			presenceData.largeImageKey = getImageCharacter(thumbnail);
			presenceData.state = `${title.split("|")[0]}`;
			presenceData.details = "Viewing Character";
			presenceData.buttons = [{ label: "View Character", url: href }];
		}
	} else if (pathname.startsWith("/monsters")) {
		if (pathname === "/monsters/") {
			presenceData.details = "Viewing Rapture List";
			presenceData.smallImageKey = Assets.Viewing;
		} else {
			presenceData.largeImageKey = `${getImageMonster(
				document
					.querySelectorAll<HTMLMetaElement>('meta[property="og:image"]')[1]
					.getAttribute("content")
					.replace(".png.png", ".png")
			)}`;
			presenceData.state = document
				.querySelector("article")
				?.querySelector("h1")?.textContent;
			presenceData.details = "Viewing Rapture";
			presenceData.buttons = [{ label: "View Rapture", url: href }];
		}
	} else if (pathname.startsWith("/tier-list")) {
		presenceData.largeImageKey = thumbnail || Assets.Logo;
		presenceData.state = `${title.split("|")[0]}`;
		presenceData.details = "Viewing Tier List";
		presenceData.buttons = [{ label: "View Tier List", url: href }];
	} else if (pathname.startsWith("/") && pathname.length > 1) {
		presenceData.largeImageKey = thumbnail || Assets.Logo;
		presenceData.state = `${title.split("|")[0]}`;
		presenceData.details = "Viewing Guide";
		presenceData.buttons = [{ label: "View Guide", url: href }];
	}
	if (!presenceData.smallImageKey) {
		presenceData.smallImageKey = Assets.Reading;
		presenceData.smallImageText = "Reading";
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
