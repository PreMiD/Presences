const presence = new Presence({
		clientId: "790721299126943744",
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
		largeImageKey: "https://i.imgur.com/yKFc2V1.png",
	};

	if (document.querySelector<HTMLElement>(".fa-pause")) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = `Listening to ${
			document.querySelector<HTMLElement>("#songName").textContent
		} by ${document.querySelector<HTMLElement>("#songArtist").textContent}`;
		presenceData.state = `Presented by ${
			document.querySelector<HTMLElement>("#dj_name").textContent
		}`;
		presence.setActivity(presenceData);
	} else {
		switch (document.location.pathname) {
			case "/": {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "Viewing";
				presenceData.state = "Recently Played";
				presenceData.smallImageKey = Assets.Reading;
				presence.setActivity(presenceData);

				break;
			}
			case "/request": {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "Typing";
				presenceData.state = "A Request";
				presenceData.smallImageKey = Assets.Reading;
				presence.setActivity(presenceData);

				break;
			}
			case "/timetable": {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "Viewing";
				presenceData.state = "Timetable";
				presenceData.smallImageKey = Assets.Reading;
				presence.setActivity(presenceData);

				break;
			}
			case "/team": {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "Viewing";
				presenceData.state = "Team Page";
				presenceData.smallImageKey = Assets.Reading;
				presence.setActivity(presenceData);

				break;
			}
			case "/apply": {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "Viewing";
				presenceData.state = "Apply to become a presenter";
				presenceData.smallImageKey = Assets.Reading;
				presence.setActivity(presenceData);

				break;
			}
			case "/contact-us": {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "Viewing";
				presenceData.state = "Contact Page";
				presenceData.smallImageKey = Assets.Reading;
				presence.setActivity(presenceData);

				break;
			}
			// No default
		}
	}
});
