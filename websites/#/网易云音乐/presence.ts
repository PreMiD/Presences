const presence = new Presence({ clientId: "1035124482735607838" }),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		listen: "general.buttonListenAlong",
	});

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/%23/%E7%BD%91%E6%98%93%E4%BA%91%E9%9F%B3%E4%B9%90/assets/logo.png",
}

let title: string,
	author: string,
	songPath: string,
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
		songPath = document
			.querySelector("#g_player > div.play > div.j-flag.words > a")
			.getAttribute("href");
		author = document.querySelector(
			"#g_player > div.play > div.j-flag.words > span > span"
		).textContent;
		audioTime = presence.timestampFromFormat(
			document.querySelector("#g_player > div.play > div.m-pbar > span > em")
				.textContent
		) as unknown as number;
		audioDuration = presence.timestampFromFormat(
			audioTimeLeft.replace(/(.*)(?=\/)/, "").replace("/ ", "")
		) as unknown as number;

		const [startTimestamp, endTimestamp] = presence.getTimestamps(
				audioTime,
				audioDuration
			),
			presenceData: PresenceData = {
				details: title,
				state: author,
				largeImageKey: Assets.Logo,
				smallImageKey: paused ? Assets.Pause : Assets.Play,
				smallImageText: paused ? (await strings).pause : (await strings).play,
				startTimestamp,
				endTimestamp,
				buttons: [
					{
						label: (await strings).listen,
						url: `https://music.163.com/#${songPath}`,
					},
				],
			};

		if (paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		if (title && author) presence.setActivity(presenceData, !paused);
	} else presence.clearActivity();
});
