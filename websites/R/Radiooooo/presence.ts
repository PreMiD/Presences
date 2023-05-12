const presence = new Presence({
		clientId: "812656134120931330",
	}),
	getStrings = async () =>
		presence.getStrings(
			{
				play: "general.playing",
				pause: "general.paused",
			},
			await presence.getSetting<string>("lang").catch(() => "en")
		),
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

let oldLang: string = null,
	strings: Awaited<ReturnType<typeof getStrings>>;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/EktlHNP.png",
			details: "Idling",
			startTimestamp: browsingTimestamp,
		},
		audio = document.querySelector("audio");

	if (audio) {
		const { paused } = audio,
			title = document.querySelector("div.info > div.title").textContent,
			artist = document.querySelector(
				"div.field.artist > span:nth-child(2)"
			).textContent,
			place = document.querySelector("div.head > div.place").textContent,
			year = document.querySelector("div.head > div.year").textContent,
			[songDetails, songState, newLang] = await Promise.all([
				presence.getSetting<string>("song1"),
				presence.getSetting<string>("song2"),
				presence.getSetting<string>("lang").catch(() => "en"),
			]);

		if (oldLang !== newLang || !strings) {
			oldLang = newLang;
			strings = await getStrings();
		}

		presenceData.smallImageKey = paused ? "pause" : "play";
		presenceData.smallImageText = paused ? strings.pause : strings.play;

		presenceData.details = songDetails
			.replace("%title%", title)
			.replace("%artist%", artist)
			.replace("%place%", place)
			.replace("%year%", year);
		presenceData.state = songState
			.replace("%title%", title)
			.replace("%artist%", artist)
			.replace("%place%", place)
			.replace("%year%", year);

		[presenceData.startTimestamp, presenceData.endTimestamp] =
			presence.getTimestampsfromMedia(audio);

		if (paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}
	}

	presence.setActivity(presenceData);
});
