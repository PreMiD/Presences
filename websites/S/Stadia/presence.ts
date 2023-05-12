const presence = new Presence({
		clientId: "895742751944089600",
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
let gameName: HTMLElement,
	storeName: HTMLElement,
	gamePrice: HTMLElement,
	userName: HTMLElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/beLx5ko.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.pathname.includes("home")) {
		presenceData.details = "Viewing Stadia Home";
		userName = document.querySelector("span.VY8blf.fSorq");
		presenceData.smallImageText = userName.textContent;
	} else if (document.location.pathname.includes("/player")) {
		gameName = document.querySelector("div.HDKZKb.LiQ6Hb");
		presenceData.details = gameName.textContent;
	} else if (document.location.pathname.includes("/store/details")) {
		storeName = document.querySelector("div.UG7HXc");
		gamePrice = document.querySelector("span.rdAlw");
		presenceData.details = `Viewing ${storeName.textContent}`;
		presenceData.state = `${gamePrice.textContent} on the Stadia Store`;
	} else if (document.location.pathname.includes("/store"))
		presenceData.details = "Viewing Stadia Store";
	else if (document.location.pathname.includes("/pro"))
		presenceData.details = "Viewing Stadia Pro";
	else presenceData.details = "Can't read page";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
