const presence = new Presence({
		clientId: "991933219719086080",
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
		largeImageKey: "https://i.imgur.com/TTg4B0Q.png",
		startTimestamp: browsingTimestamp,
	};
	if (document.location.pathname.includes("/account"))
		presenceData.details = "Viewing account";
	else if (document.location.pathname.includes("/wl"))
		presenceData.details = "Viewing wishlist";
	else if (document.location.pathname.includes("/library"))
		presenceData.details = "Viewing library";
	else if (document.location.pathname.includes("plus"))
		presenceData.details = "Viewing plus catalog";
	else if (document.location.pathname.includes("gift"))
		presenceData.details = "Viewing gift center";
	else if (document.location.pathname.includes("/pd")) {
		presenceData.details = `Viewing ${
			document.querySelector(
				"h1.bc-heading.bc-color-base.bc-pub-break-word.bc-text-bold"
			).textContent
		} by ${
			document.querySelector(
				"li.bc-list-item.authorLabel > a.bc-link.bc-color-link"
			).textContent
		}`;
		presenceData.largeImageKey = document
			.querySelector("img.bc-pub-block.bc-image-inset-border.js-only-element")
			.getAttribute("src");
	} else if (document.location.pathname.includes("/webplayer")) {
		presenceData.details = `Listening to ${document
			.querySelector("input[name=title]")
			.getAttribute("value")}`;
		presenceData.state = document.querySelector(
			"span.bc-text.timeLeft"
		).textContent;
		presenceData.largeImageKey = document
			.querySelector("img[id=adbl-cloudBook]")
			.getAttribute("src");
		if (
			document
				.querySelector("img[title='Play/Pause']")
				.className.includes("bc-hidden")
		)
			presenceData.smallImageKey = Assets.Pause;
		else presenceData.smallImageKey = Assets.Play;
	} else {
		presenceData.details = "Browsing";
		delete presenceData.state;
	}
	presence.setActivity(presenceData);
});
