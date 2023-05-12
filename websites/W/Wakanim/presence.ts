const presence = new Presence({
		clientId: "662841394171346955",
	}),
	strings = presence.getStrings({
		browsing: "general.browsing",
		paused: "general.paused",
		playing: "general.playing",
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

function capitalize(str: string): string {
	const text = str.toLowerCase().split(" ");
	for (let i = 0; i < text.length; i++)
		text[i] = text[i].charAt(0).toUpperCase() + text[i].substr(1);

	return text.join(" ");
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = { largeImageKey: "wakanim" },
		video = document.querySelector<HTMLVideoElement>("video"),
		title = document.querySelector<HTMLSpanElement>(".episode_title"),
		subtitle = document.querySelector<HTMLSpanElement>(".episode_subtitle");

	if (
		document.location.pathname.includes("/v2/catalogue/episode/") &&
		video &&
		title
	) {
		presenceData.details = title.textContent;

		if (await presence.getSetting("thumbnail")) {
			presenceData.largeImageKey =
				document.querySelector<HTMLMetaElement>(
					".episode > .container > [itemprop=thumbnailUrl]"
				).content ?? "wakanim";
		}

		if (subtitle && subtitle.textContent)
			presenceData.state = capitalize(subtitle.textContent);

		if (video.paused) {
			presenceData.smallImageKey = Assets.Pause;
			presenceData.smallImageText = (await strings).paused;
		} else {
			presenceData.startTimestamp = Math.floor(Date.now() / 1000);
			presenceData.endTimestamp = Math.floor(
				presenceData.startTimestamp + (video.duration - video.currentTime)
			);
			presenceData.smallImageKey = Assets.Play;
			presenceData.smallImageText = (await strings).playing;
		}
	} else {
		presenceData.details = (await strings).browsing;
		presenceData.startTimestamp = browsingTimestamp;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
