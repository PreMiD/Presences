const presence = new Presence({
	clientId: "1232447632765485126",
});

const enum Assets {
	Logo = "https://ongaku.zvbt.space/favicon.png",
}

presence.on("UpdateData", async () => {
	const song: string = document.title.split(" | ")[0],
		artist = song.split(" - ")[0],
		songname = song.split(" - ").pop(),
		presenceDataKpop: PresenceData = {
			largeImageKey: Assets.Logo,
			details: "Listening to",
			state: `${artist} - ${songname}`,
			buttons: [
				{
					label: "Listen Along",
					url: "https://ongaku.zvbt.space",
				},
			],
		},
		presenceDataJpop: PresenceData = {
			largeImageKey: Assets.Logo,
			details: "Listening to",
			state: `${artist} - ${songname}`,
			buttons: [
				{
					label: "Listen Along",
					url: "https://ongaku.zvbt.space/jpop",
				},
			],
		},
		presenceDataSong: PresenceData = {
			largeImageKey: Assets.Logo,
			details: "Browsing the songs lists",
			buttons: [
				{
					label: "View the page",
					url: "https://ongaku.zvbt.space/song",
				},
			],
		},
		presenceDataAbout: PresenceData = {
			largeImageKey: Assets.Logo,
			details: "Reading the about page",
			buttons: [
				{
					label: "View the page",
					url: "https://ongaku.zvbt.space/about",
				},
			],
		};

	if (document.location.pathname.match("/jpop"))
		presence.setActivity(presenceDataJpop);

	if (document.location.pathname.match("/song"))
		presence.setActivity(presenceDataSong);

	if (document.location.pathname.match("/about"))
		presence.setActivity(presenceDataAbout);

	if (document.location.pathname === "/")
		presence.setActivity(presenceDataKpop);
});
