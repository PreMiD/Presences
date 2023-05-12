const presence = new Presence({
		clientId: "973027832307535952",
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
			largeImageKey: "https://i.imgur.com/WkUe5aL.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname } = window.location;
	switch (true) {
		case pathname === "/": {
			presenceData.details = "Browsing the main page";
			break;
		}
		case pathname.includes("/album/"): {
			presenceData.details = "Viewing an album";
			presenceData.state = document.querySelector("h1.text-center").textContent;
			presenceData.buttons = [
				{
					label: "View Album",
					url: location.href,
				},
			];
			break;
		}
		case pathname.includes("/artist/"): {
			presenceData.details = "Viewing an artist";
			presenceData.state = document.querySelector("h1.text-center").textContent;
			presenceData.buttons = [
				{
					label: "View Artist",
					url: location.href,
				},
			];
			break;
		}
		case pathname.includes("/track/"): {
			presenceData.details = "Viewing stats for a track";
			presenceData.state = document.querySelector("h1.text-center").textContent;
			presenceData.buttons = [
				{
					label: "View Track",
					url: location.href,
				},
			];
			break;
		}
		case pathname.includes("/beta"): {
			presenceData.details = "Viewing information about the beta";
			presenceData.buttons = [
				{
					label: "View Page",
					url: location.href,
				},
			];
			break;
		}
		case pathname.includes("/privacy"): {
			presenceData.details = "Reading the Privacy Policy";
			presenceData.buttons = [
				{
					label: "View Page",
					url: location.href,
				},
			];
			break;
		}
		case pathname.includes("/terms"): {
			presenceData.details = "Reading the Terms & Conditions";
			presenceData.buttons = [
				{
					label: "View Page",
					url: location.href,
				},
			];
			break;
		}
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
