const presence = new Presence({
	clientId: "630441527826579467",
});

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/Kk099mM.png",
	};

	// My special Format
	// Detail: The action (viewing/generating/listening/etc).
	// State: tells you what they are doing with the action (viewing blah/generating blah/listening blah/etc)

	if (document.location.pathname.startsWith("/hex")) {
		presenceData.details = `Viewing ${
			document.querySelector("#uscBootStrapHeader_lblTitle > strong")
				.textContent
		}`;
		presenceData.state = `${
			document
				.querySelector("#uscBootStrapHeader_lblTitle > small")
				.textContent.split("#")[0]
		}`;
	}

	// Wheel. Since its on main page the main page is also considered wheel.
	if (
		document.location.href.endsWith("/#wheel") ||
		document.location.pathname === "/"
	) {
		presenceData.details = "Viewing on wheel";
		presenceData.state = `${
			(document.querySelector("#cntMain_txtColor") as HTMLInputElement).value
		}`;
	}

	// Sub pages
	if (document.location.pathname.startsWith("/html-color-names")) {
		presenceData.details = "Viewing the list of";
		presenceData.state = "html color names.";
	}
	if (document.location.pathname.startsWith("/color-names-rgb-values")) {
		presenceData.details = "Viewing the list of";
		presenceData.state = "RGB color names.";
	}
	if (document.location.pathname.startsWith("/web-safe-colors")) {
		presenceData.details = "Viewing the list of";
		presenceData.state = "web save colors.";
	}
	if (document.location.pathname.startsWith("/random-colors")) {
		presenceData.details = "Viewing a list of";
		presenceData.state = "random colors.";
	}
	if (document.location.pathname.startsWith("/color-gradient")) {
		presenceData.details = "Generating a";
		presenceData.state = "color gradient.";
	}
	if (document.location.pathname.startsWith("/contacts")) {
		presenceData.details = "Viewing the";
		presenceData.state = "contacts page.";
	}

	presence.setActivity(presenceData);
});
