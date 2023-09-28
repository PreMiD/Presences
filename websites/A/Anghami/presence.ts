const presence = new Presence({
		clientId: "721740741570986016",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		browsing: "general.browsing",
	});

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/A/Anghami/assets/logo.png",
}

function getTime(list: string[]): number {
	let ret = 0;
	for (let index = list.length - 1; index >= 0; index--)
		ret += parseInt(list[index]) * 60 ** index;

	return ret;
}

function getTimestamps(audioTime: string, audioDuration: string): number[] {
	return [
		Math.floor(Date.now() / 1000),
		Math.floor(Date.now() / 1000) -
			getTime(audioTime.split(":").reverse()) +
			getTime(audioDuration.split(":").reverse()),
	];
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
		},
		playback = !!document.querySelector("anghami-player");

	if (playback) {
		const selectors: NodeListOf<Node> =
				document.querySelectorAll(".duration-text"),
			playing: boolean =
				document.querySelector("anghami-player anghami-icon.icon.pause") !==
				null;
		let selector: Node = document.querySelector(
			"anghami-player .action-title .trim"
		);
		presenceData.details = (selector && selector.textContent) || null;
		selector = document.querySelector("anghami-player .action-artist .trim");
		presenceData.state = (selector && selector.textContent) || null;

		presenceData.smallImageKey = playing ? Assets.Play : Assets.Pause;
		presenceData.smallImageText = playing
			? (await strings).play
			: (await strings).pause;
		[presenceData.startTimestamp, presenceData.endTimestamp] = getTimestamps(
			(selectors[0] && selectors[0].textContent.trim()) || "0:0",
			(selectors[1] && selectors[1].textContent.trim()) || "0:0"
		);

		if (!playing) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		presence.setActivity(presenceData, playback);
	} else {
		presenceData.details = (await strings).browsing;
		presenceData.smallImageKey = Assets.Search;
		presenceData.smallImageText = (await strings).browsing;
		presence.setActivity(presenceData);
	}
});
