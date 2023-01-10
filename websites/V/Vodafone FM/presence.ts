const presence = new Presence({
		clientId: "1061398473368412210",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		listeningMusic: "general.listeningMusic",
	});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/6IUf3O6.png",
		details: (await strings).listeningMusic,
	};

	if (document.querySelector("#play").classList.contains("hidden")) {
		presenceData.smallImageKey = "https://i.imgur.com/xiZprpt.png";
		presenceData.smallImageText = (await strings).play;
	} else {
		presenceData.smallImageKey = "https://i.imgur.com/w1jwJTh.png";
		presenceData.smallImageText = (await strings).pause;
	}

	const artist = document.querySelector("#artist_name")?.textContent,
		song = document.querySelector("#song_name")?.textContent;
	if (artist && song) presenceData.state = `${artist} - ${song}`;

	const cover = document.querySelector<HTMLImageElement>("#cover");
	if (cover && !cover.src.includes("/images/nocover.png"))
		presenceData.largeImageKey = cover.src;


	presence.setActivity(presenceData);
});
