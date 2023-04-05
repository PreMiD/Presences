const presence = new Presence({ clientId: "817772461109018664" }),
	timestamp = Math.floor(Date.now() / 1000),
	newStats = async () =>
		(data = await (
			await window.fetch("https://radio.itsbeats.net/stats")
		).json());

let data: {
	listeners: {
		total: string;
	};
	nowPlaying: {
		song: {
			artist: string;
			title: string;
		};
	};
	live: {
		isLive: boolean;
		streamerName: string;
	};
};
/* eslint-enable camelcase */

setInterval(newStats, 10000);
newStats();

presence.on("UpdateData", async () => {
	const settings = {
			details: (await presence.getSetting<string>("details")).replace(
				"%listeners%",
				data.listeners.total
			),
			state: (await presence.getSetting<string>("state"))
				.replace("%artist%", data.nowPlaying.song.artist || "Artist")
				.replace(
					"%songText%",
					`${data.nowPlaying.song.artist} - ${data.nowPlaying.song.title}`
				)
				.replace("%title%", data.nowPlaying.song.title || "Title"),
			timestamp: await presence.getSetting<boolean>("timestamp"),
		},
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/36Ln5RE.png",
			details: settings.details,
			state: settings.state,
			smallImageText: `${
				data.live.isLive ? data.live.streamerName : "AutoDJ"
			} is live!`,
		};

	if (settings.timestamp) presenceData.startTimestamp = timestamp;
	if (data.live.isLive) presenceData.smallImageKey = "live";
	else delete presenceData.smallImageText;

	presence.setActivity(presenceData);
});
