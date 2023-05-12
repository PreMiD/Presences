const presence = new Presence({
		clientId: "894342965772820490",
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
		largeImageKey: "https://i.imgur.com/NAG50Oi.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.pathname === "/") presenceData.details = "In home page";
	else if (document.location.pathname.includes("/shows/latest-updates"))
		presenceData.details = "Viewing lastest updates";
	else if (document.location.pathname.includes("/shows/")) {
		presenceData.details = "Viewing filler list:";
		presenceData.state = document
			.querySelector(".Right > h1")
			.textContent.replace("Filler List", " ")
			.trim();
	} else if (document.location.pathname.includes("/shows"))
		presenceData.details = "Browsing the list of shows";
	else if (document.location.pathname.includes("/search/node/")) {
		const search = document.location.pathname.split("/");
		presenceData.details = "Searching the filler list";
		presenceData.state = search[search.length - 1].replaceAll("%20", " ");
	} else if (document.location.pathname.includes("/user/password"))
		presenceData.details = "Requesting a new password";
	else if (document.location.pathname.includes("/user/register"))
		presenceData.details = "Creating a account";
	else if (document.location.pathname.includes("/user/login"))
		presenceData.details = "Logging in";
	else if (document.location.pathname.includes("/users/")) {
		presenceData.details = "Viewing user";
		presenceData.state = (
			document.querySelector(".content > h1") as HTMLHeadingElement
		).textContent;
		presenceData.buttons = [
			{
				label: "View User",
				url: `${document.URL}`,
			},
		];
	} else if (document.location.pathname.includes("/contact"))
		presenceData.details = "Contacting with the page...";
	else if (document.location.pathname.includes("/changelog"))
		presenceData.details = "Reading the changelog";
	else if (document.location.pathname.includes("/privacy-policy"))
		presenceData.details = "Reading the privacy policy";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
