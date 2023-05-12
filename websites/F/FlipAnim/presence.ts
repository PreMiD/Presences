const presence = new Presence({
		clientId: "642119548803219466",
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
		largeImageKey: "https://i.imgur.com/BXd1SBE.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.hostname === "flipanim.com") {
		if (document.location.pathname === "/") {
			presenceData.details = "Viewing home page";
			presenceData.smallImageKey = Assets.Writing;
		} else if (document.location.pathname.includes("/anim")) {
			presenceData.details = "Viewing anim:";
			presenceData.state = `${
				document.querySelector("#mainDivActive > div:nth-child(6) > div")
					.textContent
			} by: ${
				document.querySelector(
					"#mainDivActive > div:nth-child(10) > div:nth-child(2) > div.anim_author > a:nth-child(1)"
				).textContent
			}`;
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/profile")) {
			presenceData.details = "Viewing profile of:";
			presenceData.state = document.querySelector(
				"#mainDivActive > div:nth-child(4) > div.profileAvatar > div.text_normal"
			).textContent;
			presenceData.smallImageKey = Assets.Reading;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
