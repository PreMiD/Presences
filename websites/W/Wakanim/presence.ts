const presence = new Presence({
		clientId: "662841394171346955",
	}),
	strings = presence.getStrings({
		browsing: "general.browsing",
		paused: "general.paused",
		playing: "general.playing",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

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
			presenceData.smallImageKey = "paused";
			presenceData.smallImageText = (await strings).paused;
		} else {
			presenceData.startTimestamp = Math.floor(Date.now() / 1000);
			presenceData.endTimestamp = Math.floor(
				presenceData.startTimestamp + (video.duration - video.currentTime)
			);
			presenceData.smallImageKey = "playing";
			presenceData.smallImageText = (await strings).playing;
		}
	} else {
		presenceData.details = (await strings).browsing;
		presenceData.startTimestamp = browsingTimestamp;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
