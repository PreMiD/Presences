const presence = new Presence({
	clientId: "685491676155871281",
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

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/PWiUxFD.png",
		},
		Path = document.location.pathname;
	presenceData.startTimestamp = Math.floor(Date.now() / 1000);
	if (Path === "/") {
		presenceData.details = "Viewing the home-page :";
		presenceData.state = `${
			document.querySelector(
				"#content > div.horizontal-section.horizontal-section--grey.horizontal-section--thin.horizontal-section--statistics > div > p:nth-child(1)"
			).textContent
		}`;
	} else if (Path.startsWith("/help")) {
		presenceData.details = "Viewing the help-page :";
		presenceData.state = `${
			document.querySelector("#content > div:nth-child(1) > div").children
				.length
		} total topics`;
	} else if (Path.startsWith("/account/login"))
		presenceData.details = "Logging into their account ";
	else if (Path.startsWith("/account/register"))
		presenceData.details = "Registering a new account ";
	else if (Path.startsWith("/search")) {
		presenceData.details = `Searching for ${
			(document.querySelector("#search") as HTMLInputElement).value
		} :`;
		presenceData.state = `${
			document.querySelector(
				"#content > div > div > div.left-layout__main > form > div.split-layout.split-layout--table.split-layout--wrap-on-tablet > div:nth-child(1) > p > strong"
			).textContent
		} total results`;
	} else if (Path.startsWith("/project")) {
		presenceData.details = "Viewing a package :";
		presenceData.state = `${
			document.querySelector(
				"#content > div.banner > div > div.package-header__left > h1"
			).textContent
		} BY ${
			document.querySelector(
				"#content > div:nth-child(3) > div > div > div.vertical-tabs__tabs > div:nth-child(5) > span > a > span.sidebar-section__user-gravatar-text"
			).textContent
		}`;
	} else if (Path.startsWith("/security"))
		presenceData.details = "Reporting a security flaw ";
	else if (Path.startsWith("/policy/terms-of-use/"))
		presenceData.details = "Viewing the terms of use ";
	else presenceData.details = "Browsing the site ";

	presence.setActivity(presenceData);
});
