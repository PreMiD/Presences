const presence = new Presence({
		clientId: "575756169986048004",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	});

let songName: HTMLElement,
	songArtist: HTMLElement,
	songNameS: string,
	songArtistS: string,
	thumbnail: HTMLImageElement;

presence.on("UpdateData", async () => {
	if (document.querySelectorAll(".MuiPaper-elevation")[0] && document.querySelectorAll(".MuiPaper-elevation")[0].childNodes[1]) 
		thumbnail = document.querySelectorAll(".MuiPaper-elevation")[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0] as HTMLImageElement;
	
	const presenceData: PresenceData = {
		largeImageKey:
			thumbnail ?? "logo",
	};

	songName = document.querySelector(
		"header.MuiAppBar-root > div.music-dataview-container > span.App-Player-Song-Title-Text"
	);
	if (!songName) {
		(songNameS = document.querySelector("#marquee1").textContent),
			(songNameS = songNameS.replace("<span>", "")),
			(songNameS = songNameS.replace("</span>", ""));
		if (songNameS === "") songNameS = "None";
	} else if (songName) songNameS = songName.textContent;

	songArtist = document.querySelector(
		"header.MuiAppBar-root > div.music-dataview-container > span.App-Player-Song-Artist-Text"
	);
	if (!songArtist) {
		(songArtistS = document.querySelector("#marquee2").textContent),
			(songArtistS = songArtistS.replaceAll("&amp;", "&")),
			(songArtistS = songArtistS.replace('<span class="artist">', "")),
			(songArtistS = songArtistS.replace("</span>", ""));
		if (songNameS === "") songArtistS = "None";
	} else if (songArtist) {
		(songArtistS = songArtist.textContent),
			(songArtistS = songArtistS.replace("&amp;", "&"));
	}

	if ((songNameS === "None" && songArtistS === "None") || songArtistS === "") {
		presenceData.smallImageKey = Assets.Pause;
		presenceData.smallImageText = "PauseChamp";

		presenceData.details = (await strings).pause;
	} else {
		presenceData.smallImageKey = Assets.Play;
		presenceData.smallImageText = "Playing...";

		presenceData.details = songNameS;
		presenceData.state = songArtistS;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
