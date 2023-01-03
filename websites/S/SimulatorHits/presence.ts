const presence = new Presence({
	clientId: "701623299460825108",
});

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
				presenceData.smallImageKey = "reading";

				break;
			}
			case "/news": {
				presenceData.details = "Reading News";
				presenceData.smallImageKey = "reading";

				break;
			}
			case "/about/meet-the-team": {
				presenceData.details = "Viewing Staff Team";
				presenceData.smallImageKey = "reading";

				break;
			}
			case "/request": {
				presenceData.details = "Making a Request";
				presenceData.smallImageKey = "writing";

				break;
			}
			case "/streamers": {
				presenceData.details = "Viewing Streamers";
				presenceData.smallImageKey = "reading";

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
