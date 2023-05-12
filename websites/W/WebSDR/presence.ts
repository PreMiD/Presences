const presence = new Presence({
		clientId: "715344422039977994",
	}),
	strings = {
		listen: "Listening",
		mute: "Muted",
		record: "Recording",
		view: "Viewing",
		read: "Reading",
	},
	browsingTimestamp = Math.floor(Date.now() / 1000),
	modes = ["CW", "LSB", "USB", "AM", "FM", "AMsync"];

let frequency: string,
	mode = 2,
	intHandle: number;

function updateMode(): void {
	let i = 0;
	for (const node of Array.from(
		document.querySelector("div.ctl > form > div.buttonrow").children
	)) {
		if ((node as HTMLElement).style.background !== "") {
			mode = i;
			continue;
		}
		i++;
	}
	return;
}

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
		largeImageKey: "https://i.imgur.com/duTGqD6.png",
		//smallImageKey: "key",
		smallImageText: "University of Twente SDR",
		startTimestamp: browsingTimestamp,
	};

	switch (document.location.pathname) {
		case "/": {
			if (!intHandle) intHandle = setInterval(updateMode, 1000);

			frequency = (
				document.querySelector(
					"div.ctl > form > span > input"
				) as HTMLInputElement
			).value;

			presenceData.details = `${frequency} ${modes[mode]}`;

			if (document.querySelector("#recbutton").textContent === "stop")
				presenceData.state = strings.record;
			else if (
				(document.querySelector("#mutecheckbox") as HTMLInputElement)
					.checked === true
			)
				presenceData.state = strings.mute;
			else presenceData.state = strings.listen;

			break;
		}
		case "/wspr/": {
			presenceData.details = "WSPR Map";
			presenceData.state = strings.view;

			break;
		}
		case "/chirps/": {
			presenceData.details = "Chirp Signals";
			presenceData.state = strings.view;

			break;
		}
		case "/chirps/article/": {
			presenceData.details = "Chirp Signal Article";
			presenceData.state = strings.read;

			break;
		}
		case "/fullday/": {
			presenceData.details = "Full Day Waterfall";
			presenceData.state = strings.view;

			break;
		}
		case "/oldnews.html": {
			presenceData.details = "Old News";
			presenceData.state = strings.read;

			break;
		}
		case "/qrt.html": {
			presenceData.details = "History";
			presenceData.state = strings.read;

			break;
		}
		// No default
	}

	if (!presenceData.details) presence.setActivity();
	else presence.setActivity(presenceData);
});
