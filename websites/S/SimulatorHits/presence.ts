const presence = new Presence({
	clientId: "701623299460825108",
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

let title = "Loading SimulatorHits",
	artist = "",
	presenter = "AutoDJ";

function getSongData(): void {
	fetch("https://api.simulatorhits.dev/now-playing?override").then(response => {
		if (response.status === 200) {
			response.json().then(data => {
				({ title, artist } = data.song);
				presenter = data.presenter.username;
			});
		}
	});
}

setInterval(getSongData, 10000);
getSongData();

const currentTime = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/txJayic.jpg",
		smallImageText: `Current Presenter: ${presenter}`,
		smallImageKey: "play",
		startTimestamp: currentTime,
	};

	if (document.location.hostname === "simulatorhits.com") {
		switch (document.location.pathname) {
			case "/schedule": {
				presenceData.details = "Viewing Schedule";
				presenceData.smallImageKey = Assets.Reading;

				break;
			}
			case "/news": {
				presenceData.details = "Reading News";
				presenceData.smallImageKey = Assets.Reading;

				break;
			}
			case "/about/meet-the-team": {
				presenceData.details = "Viewing Staff Team";
				presenceData.smallImageKey = Assets.Reading;

				break;
			}
			case "/request": {
				presenceData.details = "Making a Request";
				presenceData.smallImageKey = Assets.Writing;

				break;
			}
			case "/streamers": {
				presenceData.details = "Viewing Streamers";
				presenceData.smallImageKey = Assets.Reading;

				break;
			}
			default: {
				presenceData.details = title;
				presenceData.state = artist;
			}
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
