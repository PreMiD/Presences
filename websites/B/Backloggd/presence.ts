const presence = new Presence({
		clientId: "1003092862285651968",
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
			startTimestamp: browsingTimestamp,
			largeImageKey: "https://i.imgur.com/SUZJZEX.png",
		},
		{ pathname } = document.location;
	if (pathname === "/") presenceData.details = "Viewing the home page";
	else if (pathname.startsWith("/games/")) {
		if (pathname.includes("/lib/"))
			presenceData.details = "Viewing popular games";
		else {
			presenceData.details = `Viewing ${document
				.querySelector("#game-profile h1")
				.textContent.trim()}`;
			presenceData.state = `Made by ${document
				.querySelectorAll("#game-profile #game-body .sub-title a")[1]
				.textContent.trim()}`;
			presenceData.largeImageKey = `${
				document.querySelector<HTMLImageElement>(
					".game-cover .overflow-wrapper >img"
				).src
			}`;
		}
	} else if (pathname.includes("/search/")) {
		presenceData.smallImageKey = "https://i.imgur.com/UC6s55L.png";
		presenceData.details = "Searching";
		presenceData.state = `${document
			.querySelector("#search-title h1")
			.textContent.trim()}`;
	} else if (pathname.includes("/settings/"))
		presenceData.details = "Editing their profile/account settings";
	else if (pathname.includes("/changelog/"))
		presenceData.details = "Viewing the Changelog";
	else if (pathname.includes("/contact/"))
		presenceData.details = "Viewing the contact form";
	else if (pathname.includes("/roadmap/"))
		presenceData.details = "Viewing the Backloggd Roadmap";
	else if (pathname.includes("/backers/"))
		presenceData.details = "Viewing the Supporters Page";
	else if (pathname.startsWith("/about/")) {
		if (pathname.endsWith("privacy/"))
			presenceData.details = "Viewing the Privacy Policy";
		else if (pathname.endsWith("terms-of-service/"))
			presenceData.details = "Viewing the Terms of Service";
		else presenceData.details = "Viewing the About Page";
	} else if (pathname.startsWith("/users/")) {
		if (pathname.endsWith("sign_in")) presenceData.details = "Signing In";
		else if (pathname.endsWith("sign_up")) presenceData.details = "Signing Up";
		else presenceData.details = "Viewing an unsupported page";
	} else if (pathname.startsWith("/u/")) {
		presenceData.details = `Viewing ${document
			.querySelector("#profile-header h3")
			.textContent.trim()}'s Profile`;
		presenceData.largeImageKey = `${
			document.querySelector<HTMLImageElement>("#profile-header img").src
		}`;
	} else presenceData.details = "Viewing an unsupported page";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
