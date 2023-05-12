const presence = new Presence({
	clientId: "699318388270301284",
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

let title: HTMLVideoElement;
const browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/kfj4PUe.png",
			startTimestamp: browsingTimestamp,
		},
		path = document.location.pathname;

	if (path === "/") {
		presenceData.state = "Home";
		presenceData.details = "Browsing Thread";
		presenceData.smallImageKey = "curious";
	} else if (path.includes("/t/")) {
		title = document.querySelector("#Main > div.box > div.header > h1");
		presenceData.state = title.textContent.trim();
		presenceData.smallImageKey = "famous";

		if (
			document
				.querySelector("#reply-box")
				.classList.contains("reply-box-sticky")
		)
			presenceData.details = "Replying post";
		else presenceData.details = "Reading post";
	} else if (path.includes("/member/")) {
		title = document.querySelector("#Main > div.box h1");
		presenceData.state = title.textContent.trim();
		presenceData.details = "Viewing Profile";
		presenceData.smallImageKey = "happy";
	} else if (path.includes("/go/")) {
		title = document.querySelector("head > title");
		presenceData.state = title.textContent
			.replace("V2EX", "")
			.replace("›", "")
			.trim();
		presenceData.details = "Browsing node";
		presenceData.smallImageKey = "tongue";
	} else if (path === "/new") {
		presenceData.state = "Compose";
		presenceData.details = "New post";
		presenceData.smallImageKey = "famous_2";
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
