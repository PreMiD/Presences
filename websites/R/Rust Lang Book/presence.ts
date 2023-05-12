const presence = new Presence({
	clientId: "1033608073106968576",
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
	const path = window.location.pathname
			.replace("/book/", "")
			.replace(".html", ""),
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/kTnc40Q.png", // rust logo 512x512
			smallImageKey: "https://i.imgur.com/B7Rip9I.png", // ferris 512x512
			buttons: [
				{
					label: "Read Book",
					url: window.location.href,
				},
			],
		};

	if (path === "" || path === "title-page")
		presenceData.details = "Viewing the book homepage";
	else if (path === "foreword") presenceData.details = "Reading the foreword";
	else if (path.startsWith("ch")) {
		presenceData.details = `Reading chapter ${
			path.replace("ch", "").split("-")[0]
		}`;
		if (path.split("-")[1] === "00")
			presenceData.state = document.querySelectorAll("h1")[1].textContent;
		else presenceData.state = document.querySelector("h2").textContent;
	} else if (path.startsWith("appendix")) {
		presenceData.details = `Reading appendix ${
			path.replace("appendix", "").split("-")[0]
		}`;
		if (path.split("-")[1] === "00")
			presenceData.state = document.querySelectorAll("h1")[1].textContent;
		else presenceData.state = document.querySelector("h2").textContent;
	}

	presence.setActivity(presenceData);
});
