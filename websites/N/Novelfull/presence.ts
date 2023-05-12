const presence = new Presence({
		clientId: "914175371744800779",
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
			largeImageKey: "https://i.imgur.com/4UOKOMH.jpg",
			startTimestamp: browsingTimestamp,
		},
		{ hostname, pathname, href } = window.location,
		[covers, buttons] = await Promise.all([
			presence.getSetting<boolean>("covers"),
			presence.getSetting<boolean>("buttons"),
		]),
		search = document.querySelector<HTMLInputElement>("#search-input");
	if (search.value) {
		presenceData.details = "Searching for";
		presenceData.state = search.value;
	} else if (pathname === "/") presenceData.details = "Viewing the homepage";
	else if (pathname.includes("genre")) {
		presenceData.details = "Viewing Novels with Genre";
		presenceData.state = pathname.replace("/genre/", "");
		presenceData.buttons = [{ label: "Browse Genre", url: href }];
	} else if (pathname.includes("chapter")) {
		const split = document
			.querySelector<HTMLMetaElement>('[name="title"]')
			.content.split("-");
		presenceData.details = split[0];
		presenceData.state = split[1].replace("online free", "");
		presenceData.buttons = [
			{ label: "Read Chapter", url: href },
			{
				label: "View Novel",
				url: `http://${hostname}${document
					.querySelector('[class="truyen-title"]')
					.getAttribute("href")}`,
			},
		];
	} else if (pathname.includes("-novel")) {
		presenceData.details = `Viewing all ${
			document.querySelector('[class="active"]').textContent
		}s`;
	} else if (document.querySelector('[class="book"]')) {
		if (covers) {
			presenceData.largeImageKey = `http://${hostname}${document
				.querySelector('[class="book"]')
				?.firstElementChild?.getAttribute("src")}`;
		}
		presenceData.details = `Viewing ${
			document.querySelector('[class="title"]').textContent
		}`;
		presenceData.buttons = [{ label: "View Novel", url: href }];
		presenceData.smallImageKey = Assets.Reading;
	}
	if (!buttons) delete presenceData.buttons;
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
