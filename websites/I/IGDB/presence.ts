const presence = new Presence({
		clientId: "924944781703020554",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/I/IGDB/assets/logo.png",
}

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		path = document.location.pathname;
	if (path === "/discover") presenceData.details = "Discovering games";
	else if (path.startsWith("/games")) {
		if (path.includes("coming_soon"))
			presenceData.details = "Viewing future games";
		else if (path.includes("recently_released"))
			presenceData.details = "Viewing recently released games";
		else if (path.includes("new")) presenceData.details = "Adding a new game";
		else {
			delete presenceData.largeImageKey;
			presenceData.details = `Viewing: ${document.title}`;
			presenceData.state = document.querySelector<HTMLHeadingElement>(
				"#content-page > div.loaded > div > div.gamepage-header-info > div.gamepage-summary > div.gamepage-title-container > div > a > h3"
			).textContent;
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
				"#content-page > div.loaded > div > div.gamepage-header-info > div.gamepage-cover > img"
			).src;
			presenceData.smallImageKey = Assets.Logo;
			presenceData.smallImageText = "IGDB";
		}
	} else if (path.startsWith("/genres")) {
		if (path === "/genres") presenceData.details = "Browsing all genres";
		else {
			presenceData.details = "Browsing a genre";
			presenceData.state = document.title.slice(0, -5);
		}
	} else if (path.startsWith("/platforms")) {
		if (path === "/platforms") presenceData.details = "Browsing all platforms";
		else {
			delete presenceData.largeImageKey;
			presenceData.details = "Viewing a platform";
			presenceData.state = document.title;
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
				"#content-page > div > div > div.row > div.col-sm-4 > img"
			).src;
			presenceData.smallImageKey = Assets.Logo;
			presenceData.smallImageText = "IGDB";
		}
	} else if (path.startsWith("/top-100")) {
		presenceData.details = "Viewing Top 100";
		presenceData.state = document.title;
	} else if (path.startsWith("/reviews"))
		presenceData.details = "Finding game reviews";
	else if (path.startsWith("/themes")) {
		if (path === "/themes") presenceData.details = "Browsing all themes";
		else {
			presenceData.details = "Browsing a theme";
			presenceData.state = document.title.slice(0, -5);
		}
	} else if (path.startsWith("/collections")) {
		if (path === "/collections")
			presenceData.details = "Browsing all collections";
		else {
			presenceData.details = "Browsing a collection";
			presenceData.state = document.title;
		}
	} else if (path.startsWith("/player_perspectives")) {
		if (path === "/player_perspectives")
			presenceData.details = "Browsing all player perspectives";
		else {
			presenceData.details = "Browsing a player perspective's games";
			presenceData.state = document.title.slice(0, -5);
		}
	} else if (path.startsWith("/franchises")) {
		if (path === "/franchises")
			presenceData.details = "Browsing all franchises";
		else {
			presenceData.details = "Browsing a franchise";
			presenceData.state = document.title;
		}
	} else if (path.startsWith("/categories")) {
		if (path === "/categories")
			presenceData.details = "Browsing all categories";
		else {
			presenceData.details = "Browsing a category";
			presenceData.state = document.title.slice(0, -5);
		}
	} else if (path.startsWith("/companies")) {
		if (path === "/companies") presenceData.details = "Browsing all companies";
		else {
			delete presenceData.largeImageKey;
			presenceData.details = "Viewing a company";
			presenceData.state = document.title;
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
				"#content-page > div > div > div:nth-child(3) > div.row.mar-md-bottom > div.col-sm-4 > img"
			).src;
			presenceData.smallImageKey = Assets.Logo;
			presenceData.smallImageText = "IGDB";
		}
	}
	presence.setActivity(presenceData);
});
