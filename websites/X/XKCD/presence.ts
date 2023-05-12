const presence = new Presence({
		clientId: "754549450772316160",
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

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/4FWzJpV.png",
		startTimestamp: browsingTimestamp,
	};

	if (
		!document.body.textContent.includes("404 Not Found\nnginx") &&
		!isNaN(Number(location.pathname.replace(/\//g, "")))
	) {
		const comicNumber = document
			.querySelector('[property="og:url"]')
			.getAttribute("content")
			.split("xkcd.com/")[1]
			.split("/")[0];
		let text = document.querySelector("#comic > img").getAttribute("title");
		if (text.length > 127) text = `${text.substring(0, 124)}...`;

		presenceData.smallImageText = text;
		presenceData.details = `Reading #${comicNumber}`;
		presenceData.smallImageKey = "help";
		presenceData.buttons = [
			{
				url: `https://xkcd.com/${comicNumber}`,
				label: "View Comic",
			},
		];
		presenceData.state = document.querySelector("#ctitle").textContent;
	} else presenceData.details = "Browsing XKCD";

	presence.setActivity(presenceData);
});
