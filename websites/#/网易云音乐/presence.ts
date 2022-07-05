const presence = new Presence({ clientId: "714636053235105832" }),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
	});

let title: string,
	author: string,
	audioTime: number,
	audioDuration: number,
	audioTimeLeft: string,
	playerButton: HTMLButtonElement;

presence.on("UpdateData", async () => {
	if (document.querySelector("#g_player")) {
		playerButton = document.querySelector(
			"#g_player > div.btns > a.ply.j-flag"
		);
		const paused = playerButton.classList.contains("pas") === false;
		audioTimeLeft = document.querySelector(
			"#g_player > div.play > div.m-pbar > span"
		).textContent;
		title = document.querySelector(
			"#g_player > div.play > div.j-flag.words > a"
		).textContent;
		author = document.querySelector(
			"#g_player > div.play > div.j-flag.words > span > span"
		).textContent;
		audioTime = document.querySelector(
			"#g_player > div.play > div.m-pbar > span > em"
		).textContent as unknown as number;
		audioDuration = audioTimeLeft
			.replace(/(.*)(?=\/)/, "")
			.replace("/ ", "") as unknown as number;

		const timestamps = presence.getTimestamps(audioTime, audioDuration),
			presenceData: PresenceData = {
				details: title,
				state: author,
				largeImageKey: "logo",
				smallImageKey: paused ? "pause" : "play",
				smallImageText: paused ? (await strings).pause : (await strings).play,
				startTimestamp: timestamps[0],
				endTimestamp: timestamps[1],
			};

		if (paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		if (title && author) presence.setActivity(presenceData, !paused);
	} else presence.clearActivity();
});
