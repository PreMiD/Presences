const presence = new Presence({
	clientId: "715116675346989096",
});

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/J/Joox/assets/0.png",
}

presence.on("UpdateData", async () => {
	const player = Array.from(document.querySelectorAll("i")).find(x =>
			["playerIcon playerIcon--play", "playerIcon playerIcon--pause"].includes(
				x.className
			)
		),
		cover = await presence.getSetting<boolean>("cover");

	if (player) {
		const paused = player.className.includes("pause") === false,
			currentSong = Array.from(document.querySelectorAll("div")).find(
				x =>
					x.children.length === 2 &&
					x.children[0].tagName === "B" &&
					x.children[1].tagName === "SPAN"
			),
			title = currentSong.children[0].textContent,
			author = currentSong.children[1].textContent,
			timestamps = presence.getTimestamps(
				presence.timestampFromFormat(
					document.querySelector("#currentTime").textContent
				),
				presence.timestampFromFormat(
					document.querySelector("#currentTime").nextSibling.textContent
				)
			),
			presenceData: PresenceData = {
				details: title,
				state: author,
				largeImageKey: cover
					? document.querySelector<HTMLImageElement>(`img[alt="${title}"]`).src
					: Assets.Logo,
				smallImageKey: paused ? Assets.Pause : Assets.Play,
				smallImageText: paused ? "Paused" : "Playing",
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
