const presence = new Presence({
		clientId: "808777200119316521",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		live: "general.live",
	});

function checkLength(string: string): string {
	if (string.length > 128) return `${string.substring(0, 125)}...`;
	else return string;
}

let elapsed = Math.floor(Date.now() / 1000),
	title,
	author,
	song,
	subtitle;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/I/iHeartRadio/assets/logo.png",
	};
	if (document.querySelector('[data-test="player-container"]')) {
		const playerText = document.querySelector('[data-test="player-text"]');
		if (
			!document.querySelector('[data-test="controls-container"]').children[1]
		) {
			if (
				document.querySelector(
					'[data-test="controls-container"] [data-test-state="PLAYING"]'
				)
			) {
				if (document.querySelector('[data-test="player-artwork-image"]')) {
					let srcImage = document
						.querySelector('[data-test="player-artwork-image"]')
						?.querySelector("div")
						?.querySelector('img[alt="Player Artwork Image"]')
						?.getAttribute("src");

					if (srcImage && srcImage.includes("ops=fit(150%2C150)")) {
						srcImage = srcImage.replace(
							"ops=fit(150%2C150)",
							"ops=fit(512%2C512)"
						);
					}

					presenceData.largeImageKey = srcImage.includes("ops=fit")
						? srcImage
						: "https://cdn.rcd.gg/PreMiD/websites/I/iHeartRadio/assets/logo.png";
				}

				title = playerText.children[0].textContent;
				song = playerText.children[1].textContent;
				author = playerText.children[2]?.textContent;
				subtitle = `${song}${author ? ` - ${author}` : ""}`;

				title = checkLength(title);
				presenceData.details = title;
				subtitle = checkLength(subtitle);
				presenceData.state = subtitle;

				if (document.location.href.includes("live")) {
					const stationData = (presenceData.buttons = [
						{
							label: "View Station",
							url: document.location.href
						}
					]);

					if (playerText.querySelectorAll("p").length > 1) {
						const data = playerText.querySelectorAll("p"),
							links: string[] = [];

						if (data.length > 1) {
							for (const para of data) {
								const a = para.querySelector("a");
								if (a) links.push(a?.href);
							}
						}

						if (links.length > 0 && links[1].includes("songs")) {
							stationData.push({
								label: "View Song",
								url: links[1]
							});
						}
					}
				}

				presenceData.smallImageKey = Assets.Live;
				presenceData.smallImageText = (await strings).live;
				if (!elapsed) elapsed = Math.floor(Date.now() / 1000);

				presenceData.startTimestamp = elapsed;
				await presence.setActivity(presenceData);
			} else {
				elapsed = null;
				presence.clearActivity();
			}
		} else {
			const [, timestamp] = document.querySelector(
				'[data-test="controls-container"]'
			).children;

			if (document.querySelector('[data-test="player-artwork-image"]')) {
				let srcImage = document
					.querySelector('[data-test="player-artwork-image"]')
					?.querySelector("div")
					?.querySelector('img[alt="Player Artwork Image"]')
					?.getAttribute("src");

				if (srcImage && srcImage.includes("ops=fit(150%2C150)")) {
					srcImage = srcImage.replace(
						"ops=fit(150%2C150)",
						"ops=fit(512%2C512)"
					);
				}

				presenceData.largeImageKey = srcImage.includes("ops=fit")
					? srcImage
					: "https://cdn.rcd.gg/PreMiD/websites/I/iHeartRadio/assets/logo.png";
			}

			if (playerText.querySelectorAll("p").length > 1) {
				const data = playerText.querySelectorAll("p"),
					links: string[] = [];

				if (data.length > 1) {
					const twoPara = Array.from(data).slice(-2);

					for (const para of twoPara) {
						const a = para.querySelector("a");
						if (a) links.push(a?.href);
					}
				}

				if (links.length > 0) {
					const btns = (presenceData.buttons = [
						{
							label: "View Song",
							url: links[0]
						},
						{
							label: "View Artist",
							url: links[1]
						}
					]);

					if (document.location.href.includes("podcast")) {
						btns[0].label = "View Podcast";
					}
				}
			}

			title = playerText.children[0].textContent;
			song = playerText.children[1].textContent;
			author = playerText.children[2]?.textContent;
			subtitle = `${song}${author ? ` - ${author}` : ""}`;

			const paused = !!document.querySelector('[data-test="play-icon"]'),
				currentTime = [
					presence.timestampFromFormat(timestamp.children[0].textContent),
					presence.timestampFromFormat(timestamp.children[2].textContent),
				],
				timestamps = presence.getTimestamps(currentTime[0], currentTime[1]);

			title = checkLength(title);
			presenceData.details = title;
			subtitle = checkLength(subtitle);
			presenceData.state = subtitle;
			presenceData.smallImageKey = paused ? Assets.Pause : Assets.Play;
			presenceData.smallImageText = paused
				? (await strings).pause
				: (await strings).play;
			[presenceData.startTimestamp, presenceData.endTimestamp] = [
				timestamps[0],
				timestamps[1],
			];

			if (paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}

			await presence.setActivity(presenceData);
		}
	} else if (!document.querySelector('[data-test="player-container"]')) {
		presenceData.details = "Browsing iHeartRadio...";
		await presence.setActivity(presenceData);
	}
});
