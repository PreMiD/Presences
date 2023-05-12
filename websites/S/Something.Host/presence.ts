const presence = new Presence({
	clientId: "783325015860838452",
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
		largeImageKey: "https://i.imgur.com/il2R4FQ.png",
	};

	// Support - support.something.host
	if (window.location.hostname === "support.something.host") {
		presenceData.details = "Helpdesk";

		if (window.location.pathname.includes("/article")) {
			presenceData.state = `Article: ${
				document.querySelector("html > body > nav > div > div >div > div > h1")
					.textContent
			}`;
		} else if (window.location.pathname.includes("/category")) {
			presenceData.state = `Category: ${
				document.querySelector(
					"body > nav > div > div > div > div > span.csh-navigation-title-list-subject > span.csh-category-badge.csh-font-sans-semibold"
				).textContent
			}`;
		} else presenceData.state = "Browsing";
	}

	// Landing Site - something.host
	if (window.location.hostname === "something.host") {
		presenceData.details = "Landing Site";

		if (
			document.querySelector("head > title").textContent ===
			"Home || SomethingHost"
		)
			presenceData.state = "Home";
		else {
			presenceData.state = document
				.querySelector("head > title")
				.textContent.replace("SomethingHost", "")
				.replace("|", "");
		}
	}

	// CDN - content.something.host
	if (window.location.hostname === "content.something.host")
		presenceData.details = "Content";

	// Files - files.something.host
	if (window.location.hostname === "files.something.host")
		presenceData.details = "File Manager";

	// Control Panel - cp.something.host
	if (window.location.hostname === "cp.something.host") {
		presenceData.details = "Control Panel";

		if (window.location.pathname.startsWith("/profile"))
			presenceData.state = "Profile";
		else {
			presenceData.state = document
				.querySelector("head > title")
				.textContent.replace("SomethingCP - ", "");
		}
	}
	presence.setActivity(presenceData);
});
