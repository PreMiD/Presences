const presence = new Presence({
		clientId: "806926545771167774",
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
		largeImageKey: "https://i.imgur.com/bk2PPfW.png",
		startTimestamp: browsingTimestamp,
	};
	if (window.location.hostname === "botsfordiscord.com") {
		presenceData.details = "Viewing page:";
		if (
			document
				.querySelector("head > title")
				.textContent.split("|")[0]
				.trim()
				.startsWith("Error")
		) {
			presenceData.state = `${document
				.querySelector("#errortitle")
				.textContent.trim()} (${document
				.querySelector("#errorsubtitle")
				.textContent.trim()})`;
		} else if (window.location.pathname.toLowerCase() === "/")
			presenceData.state = "Homepage";
		else if (window.location.pathname.toLowerCase() === "/bots")
			presenceData.state = "Discord bots";
		else if (window.location.pathname.toLowerCase() === "/bot/add")
			presenceData.state = "Add a new bot";
		else if (window.location.pathname.toLowerCase() === "/verification")
			presenceData.state = "Verification program";
		else if (window.location.pathname.startsWith("/house"))
			presenceData.state = "House program";
		else if (
			window.location.pathname.toLowerCase() === "/me" ||
			window.location.pathname.startsWith("/user/")
		) {
			presenceData.details = "Viewing a profile:";
			presenceData.state = document
				.querySelectorAll("div.container #highlight")[1]
				.textContent.trim();
		} else if (window.location.pathname.toLowerCase() === "/me/favorites") {
			presenceData.state = `${document
				.querySelectorAll("div.navbar-item a")[8]
				.textContent.split("#")[0]
				.trim()} favorite bots`;
		} else if (window.location.pathname.toLowerCase() === "/me/history")
			presenceData.state = "Voting history";
		else if (window.location.pathname.startsWith("/privacy"))
			presenceData.state = "Privacy policy";
		else if (window.location.pathname.toLowerCase() === "/license")
			presenceData.state = "Website license";
		else if (window.location.pathname.toLowerCase() === "/tos")
			presenceData.state = "Terms of Service (ToS)";
		else if (window.location.pathname.toLowerCase() === "/partners")
			presenceData.state = "Partners";
		else if (window.location.pathname.toLowerCase() === "/contributors")
			presenceData.state = "Contributors";
		else if (window.location.pathname.startsWith("/tag/")) {
			presenceData.details = "Viewing bots with tag:";
			presenceData.state = document
				.querySelector("div.container h1")
				.textContent.split("</i>")[1]
				.trim();
		} else if (window.location.pathname.toLowerCase() === "/login")
			presenceData.state = "Login";
		else if (window.location.pathname.startsWith("/bot/")) {
			presenceData.details = "Viewing a bot:";
			presenceData.state = document
				.querySelectorAll("div.container #highlight")[0]
				.textContent.split("<a")[0]
				.trim();
		} else if (window.location.pathname.startsWith("/bots/search/")) {
			presenceData.state =
				`Search results (${window.location.pathname
					.split("/search/")[1]
					.trim()}` + ")";
		}
	} else if (
		window.location.hostname === "docs.botsfordiscord.com" &&
		window.location.pathname.startsWith("/")
	) {
		presenceData.details = "API Docs | Viewing page:";
		presenceData.state = document.querySelector("h1 span").textContent.trim();
	}
	if (!presenceData.state) presence.setActivity();
	else presence.setActivity(presenceData);
});
