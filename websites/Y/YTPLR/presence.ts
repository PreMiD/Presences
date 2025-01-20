const presence = new Presence({
		clientId: "1284161421957136486",
	}),
	strings = presence.getStrings({
		play: "general.watchingVid",
		pause: "general.paused",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let videoTitle: string,
	videoCurrentTime: number,
	videoDuration: number,
	videoPaused: boolean,
	videoPlaylistTotal: number,
	videoPlaylistID: string,
	videoPlaylistTitle: string;

interface DataInterface {
	title: string;
	currentTime: number;
	duration: number;
	paused: boolean;
}

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/Y/YTPLR/assets/logo.png",
}

presence.on("iFrameData", (data: DataInterface) => {
	videoTitle = data.title;
	videoCurrentTime = data.currentTime;
	videoDuration = data.duration;
	videoPaused = data.paused;
	videoPlaylistTotal = parseInt(document.querySelector("#all").textContent);
	videoPlaylistID = document.querySelector<HTMLInputElement>("#pid").value;
	videoPlaylistTitle = document.querySelector("#title").textContent;
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
		},
		[startTimestamp, endTimestamp] = presence.getTimestamps(
			Math.floor(videoCurrentTime),
			Math.floor(videoDuration)
		),
		showButtons = await presence.getSetting<boolean>("buttons");

	if (videoTitle) {
		presenceData.type = ActivityType.Watching;
		presenceData.details = `Shuffling ${videoPlaylistTotal} Videos`;
		presenceData.state = videoTitle;
		presenceData.smallImageKey = videoPaused ? Assets.Pause : Assets.Play;
		presenceData.smallImageText = videoPaused
			? (await strings).pause
			: (await strings).play;

		if (!videoPaused) {
			presenceData.startTimestamp = startTimestamp;
			presenceData.endTimestamp = endTimestamp;
		} else {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		if (videoPlaylistID && showButtons) {
			presenceData.buttons = [
				{
					label: `Shuffle ${videoPlaylistTitle}`,
					url: `https://youtube-playlist-randomizer.bitbucket.io/?pid=${videoPlaylistID}&autostart`,
				},
			];
		} else delete presenceData.buttons;
	} else presenceData.startTimestamp = browsingTimestamp;

	presenceData.state = `"${presenceData.state}"`;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
