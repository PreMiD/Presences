const presence = new Presence({
		clientId: "945295281728159744",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/NQ9JwPd.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, hostname } = document.location,
		[image, buttons] = await Promise.all([
			presence.getSetting<boolean>("image"),
			presence.getSetting<boolean>("buttons"),
		]),
		pageIcon = document.querySelector<HTMLLinkElement>("link[rel~='icon']"),
		shortTitle = document.title.split(/-(.+)/)[1];

	if (hostname === "neocities.org") {
		if (pathname === "/") presenceData.details = "Home page";
		else if (pathname === "/browse") {
			presenceData.details = "Browsing sites";
			presenceData.smallImageKey = Assets.Search;
		} else if (pathname.startsWith("/site/")) {
			presenceData.details = "Viewing a site:";
			presenceData.state =
				document.querySelector<HTMLSpanElement>("h2 > span").textContent;
			presenceData.smallImageKey = Assets.Reading;
			presenceData.buttons = [{ label: "View site", url: document.URL }];
		} else if (pathname === "/activity") {
			presenceData.details = "Viewing Recent Activities";
			presenceData.smallImageKey = Assets.Reading;
		} else if (pathname.startsWith("/tutorial")) {
			presenceData.smallImageKey = Assets.Reading;
			if (pathname === "/tutorials" || pathname === "/tutorial")
				presenceData.details = "Looking through tutorials";
			else {
				presenceData.details = "In a course:";
				presenceData.state = shortTitle;
			}
		} else if (pathname === "/dashboard")
			presenceData.details = "Viewing their site";
		else if (pathname.includes("/text_editor")) {
			presenceData.details = "In the Text Editor";
			presenceData.state = shortTitle;
			presenceData.smallImageKey = Assets.Writing;
		}
	} else if (hostname === "blog.neocities.org") {
		presenceData.details = "Reading blogs";
		presenceData.smallImageKey = Assets.Reading;
		if (pathname.startsWith("/blog")) {
			presenceData.details = "Reading a blog:";
			presenceData.state = document.title;
			presenceData.buttons = [{ label: "Read blog", url: document.URL }];
		}
	} else {
		presenceData.details = document.title;
		presenceData.state = `by ${hostname.split(".")[0]}`;
		if (image && pageIcon) presenceData.largeImageKey = pageIcon.href;
		presenceData.buttons = [
			{ label: "View Page", url: document.location.origin },
		];
	}
	if (!buttons) delete presenceData.buttons;
	presence.setActivity(presenceData);
});
