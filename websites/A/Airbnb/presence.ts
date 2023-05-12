const presence = new Presence({
		clientId: "993151156652093480",
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
			largeImageKey: "https://i.imgur.com/Bffbxtu.png",
			startTimestamp: browsingTimestamp,
		},
		privacy = await presence.getSetting("privacy"),
		{ pathname, href } = document.location;

	if (pathname.includes("/rooms")) {
		if (privacy) presenceData.details = "Viewing a room";
		else {
			presenceData.details = "Viewing a room";
			presenceData.state = document.querySelector(
				"#site-content > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div > div > div > div > section > div._b8stb0 > span > h1"
			).textContent;
			presenceData.buttons = [{ label: "View Room", url: href }];
		}
	} else if (pathname.includes("/book")) {
		if (privacy) presenceData.details = "Booking a room";
		else {
			presenceData.details = `Booking ${
				document.querySelector("#LISTING_CARD-title").textContent
			}`;
			presenceData.state = `From ${
				document.querySelector(
					'[data-plugin-in-point-id="DATE_PICKER"] > div > div > div._b7b6bk > div._1qyi2pa > div._jbk4n3'
				).textContent
			} for ${
				document.querySelector(
					'[data-plugin-in-point-id="GUEST_PICKER"] > div > div > div._b7b6bk > div._1qyi2pa > div._jbk4n3'
				).textContent
			}`;
			presenceData.buttons = [{ label: "View Booking Details", url: href }];
		}
	} else if (pathname.includes("/inbox"))
		presenceData.details = "Viewing Messages";
	else if (pathname.includes("notifications"))
		presenceData.details = "Viewing Notifications";
	else if (pathname.includes("wishlists"))
		presenceData.details = "Viewing wishlists";
	else if (pathname.includes("split-stays"))
		presenceData.details = "Viewing a split stay";
	else if (pathname.includes("/account"))
		presenceData.details = "Viewing account details";
	else presenceData.details = "Browsing";

	presence.setActivity(presenceData);
});
