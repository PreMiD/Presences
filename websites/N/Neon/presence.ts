const presence = new Presence({
		clientId: "837985880408457217",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

function findElement(tagName: string, className: string): Element {
	return Array.from(document.querySelectorAll(tagName)).find(x =>
		x.className.includes(className)
	);
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/VdcSlNL.png",
			details: "Browsing...",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, search } = document.location;

	if (pathname.includes("/series/")) {
		presenceData.details = "Viewing series:";
		presenceData.state = document.querySelector(
			'[data-lbx-e2e="show-title"]'
		)?.textContent;

		presenceData.buttons = [
			{
				label: "View Series",
				url: document.URL,
			},
		];
	} else if (pathname.includes("/movie/")) {
		presenceData.details = "Viewing movie:";
		presenceData.state = document.querySelector(
			'[data-lbx-e2e="movie-title"]'
		)?.textContent;
		presenceData.buttons = [
			{
				label: "View Movie",
				url: document.URL,
			},
		];
	} else if (pathname.includes("/trailer/")) {
		const video = document.querySelector("video");

		presenceData.details = findElement("span", "Tr-title")?.textContent;
		presenceData.state = "Trailer";

		presenceData.smallImageKey = video.paused ? "pause" : "play";
		presenceData.smallImageText = video.paused ? "Paused" : "Playing";

		[, presenceData.endTimestamp] = presence.getTimestampsfromMedia(video);

		presenceData.buttons = [
			{
				label: "Watch Trailer",
				url: document.URL,
			},
		];

		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}
	} else if (pathname.includes("/my-list"))
		presenceData.details = "Viewing their list";
	else if (pathname.includes("/my-account"))
		presenceData.details = "Viewing their account";
	else if (pathname.includes("/watch/")) {
		const video = document.querySelector("video"),
			isSeries = !!findElement("span", "Mr-text");

		presenceData.details = findElement("span", "Tr-title")?.textContent;

		presenceData.smallImageKey = video.paused ? "pause" : "play";
		presenceData.smallImageText = video.paused ? "Paused" : "Playing";

		[, presenceData.endTimestamp] = presence.getTimestampsfromMedia(video);

		if (isSeries) {
			presenceData.state = `${findElement(
				"span",
				"Mr-text"
			)?.textContent.replace(".", ":")} ${findElement("h3", "so-name")
				?.textContent.trim()
				.replace(/([0-9]+)[.]/, "")}`;
		} else presenceData.state = "Movie";

		presenceData.buttons = [
			{
				label: isSeries ? "Watch Episode" : "Watch Movie",
				url: document.URL,
			},
		];

		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}
	} else if (search.startsWith("?")) {
		presenceData.details = "Searching for:";
		presenceData.state = new URLSearchParams(search).get("search");
	}

	if (!(await presence.getSetting<boolean>("buttons")) && presenceData.buttons)
		delete presenceData.buttons;
	if (!(await presence.getSetting<boolean>("timestamp"))) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}

	presence.setActivity(presenceData);
});
