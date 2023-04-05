const presence = new Presence({ clientId: "821776987570962532" }),
	timestamp = Math.floor(Date.now() / 1000),
	newStats = async () =>
		(data = await (
			await window.fetch("https://cast.bladefm.com.au/api/nowplaying/1")
		).json());

let data: {
	listeners: {
		unique: number;
	};
	nowPlaying: {
		song: {
			artist: string;
			text: string;
			title: string;
		};
	};
	live: {
		isLive: boolean;
		streamerName: string;
	};
};

setInterval(newStats, 10000);
newStats();

presence.on("UpdateData", async () => {
	const settings = {
			details: (await presence.getSetting<string>("details"))
				.replace("%listeners%", `${data.listeners?.unique ?? "Listeners"}`)
				.replace("%artist%", data.nowPlaying?.song.artist || "Artist")
				.replace("%songText%", data.nowPlaying.song.text || "Song")
				.replace("%title%", data.nowPlaying?.song.title || "Title"),
			state: (await presence.getSetting<string>("state"))
				.replace("%listeners%", `${data.listeners?.unique ?? "Listeners"}`)
				.replace("%artist%", data.nowPlaying?.song.artist || "Artist")
				.replace("%songText%", data.nowPlaying.song.text || "Song")
				.replace("%title%", data.nowPlaying?.song.title || "Title"),
			timestamp: await presence.getSetting<boolean>("timestamp"),
		},
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/Sjj3gx6.png",
			details: settings.details,
			state: settings.state,
			smallImageText: `${
				data.live.isLive ? data.live.streamerName : "AutoDJ"
			} is live!`,
			buttons: [
				{
					label: "Tune in",
					url: "https://cast.bladefm.com.au/radio/8000/radio.mp3",
				},
			],
		};

	if (settings.timestamp) presenceData.startTimestamp = timestamp;
	if (data.live.isLive && data.live.streamerName !== "Admin")
		presenceData.smallImageKey = "live";
	else delete presenceData.smallImageText;

	presence.setActivity(presenceData);
});
