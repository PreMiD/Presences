const presence = new Presence({
		clientId: "991933219719086080",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "logo",
	};

	if (document.location.pathname.includes("/account")) {
		presenceData.details = "Viewing account";
		delete presenceData.state;
		presenceData.startTimestamp = browsingTimestamp;
	} else if (document.location.pathname.includes("/wl")) {
		presenceData.details = "Viewing wishlist";
		delete presenceData.state;
		presenceData.startTimestamp = browsingTimestamp;
	} else if (document.location.pathname.includes("/library")) {
		presenceData.details = "Viewing library";
		delete presenceData.state;
		presenceData.startTimestamp = browsingTimestamp;
	} else if (document.location.pathname.includes("/pd")) {
		const title = document.querySelector(
				"h1.bc-heading.bc-color-base.bc-pub-break-word.bc-text-bold"
			).textContent,
			cover = document
				.querySelector("img.bc-pub-block.bc-image-inset-border.js-only-element")
				.getAttribute("src");
		presenceData.details = `Viewing ${title} by ${
			document.querySelector(
				"li.bc-list-item.authorLabel > a.bc-link.bc-color-link"
			).textContent
		}`;
		delete presenceData.state;
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.largeImageKey = cover;
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
			presenceData.smallImageKey = "pause";
		else presenceData.smallImageKey = "play";
	} else {
		presenceData.details = "Browsing";
		delete presenceData.state;
		presenceData.startTimestamp = browsingTimestamp;
	}
	presence.setActivity(presenceData);
});
