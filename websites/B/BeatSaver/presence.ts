const presence = new Presence({
		clientId: "837997079208525835",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let preview = {
	name: "",
	subName: "",
	currentTime: "",
	difficulty: "",
	customDifficulty: "",
	playing: false,
	duration: "",
	gameMode: "",
};

presence.on(
	"iFrameData",
	(data: {
		name: string;
		subName: string;
		currentTime: string;
		difficulty: string;
		customDifficulty: string;
		gameMode: string;
		playing: boolean;
		duration: string;
	}) => {
		preview = data;
	}
);

presence.on("UpdateData", async () => {
	const [time, buttons, cover] = await Promise.all([
			presence.getSetting<boolean>("time"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("cover"),
		]),
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/1dBCcdI.png",
			startTimestamp: browsingTimestamp,
		};

	if (
		document.querySelector("iframe") &&
		document.querySelector<HTMLIFrameElement>("iframe").src !== "about:blank" &&
		preview.name
	) {
		presenceData.details = `${preview.name} ${preview.subName}`;
		presenceData.state =
			preview.difficulty === preview.customDifficulty
				? `${preview.gameMode} ${preview.difficulty}`
				: `${preview.customDifficulty}`;
		if (preview.playing) {
			presenceData.smallImageKey = Assets.Play;
			if (preview.duration) {
				const timestamps = presence.getTimestamps(
					presence.timestampFromFormat(preview.currentTime),
					presence.timestampFromFormat(preview.duration)
				);
				presenceData.endTimestamp = timestamps[1];
			}
			presenceData.smallImageText = "Playing";
		} else {
			presenceData.smallImageKey = Assets.Pause;
			presenceData.smallImageText = "Paused";
		}
		if (document.location.href.includes("/maps/")) {
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
				"[alt='Cover Image']"
			).src;
			presenceData.buttons = [
				{
					label: "View Page",
					url: document.location.href,
				},
				{
					label: "View Uploader's Profile",
					url: `https://beatsaver.com${document
						.querySelector(".list-group-item.d-flex.justify-content-between")
						.getAttribute("href")}`,
				},
			];
		} else {
			presenceData.largeImageKey = (
				document.querySelector(
					`[href='/maps/${
						document
							.querySelector<HTMLIFrameElement>("iframe")
							.src.split("=")[1]
					}']`
				).parentElement.parentElement.firstChild.firstChild as HTMLImageElement
			).src;
			presenceData.buttons = [
				{
					label: "View Page",
					url: `https://beatsaver.com${document
						.querySelector(
							`[href='/maps/${
								document
									.querySelector<HTMLIFrameElement>("iframe")
									.src.split("=")[1]
							}']`
						)
						.getAttribute("href")}`,
				},
				{
					label: "View Uploader's Profile",
					url: `https://beatsaver.com${document
						.querySelector(
							`[href='/maps/${
								document
									.querySelector<HTMLIFrameElement>("iframe")
									.src.split("=")[1]
							}']`
						)
						.parentElement.children[1].firstElementChild.getAttribute("href")}`,
				},
			];
		}
	} else if (document.location.href.includes("/?q=")) {
		presenceData.details = "Searching Beatmaps";
		presenceData.state = (
			document.querySelector("input.form-control") as HTMLInputElement
		).value;
	} else if (document.location.pathname.includes("/maps/")) {
		if (document.querySelector("a[class~='active']")) {
			presenceData.smallImageKey = `${(
				document
					.querySelector("a[class~='active']")
					.childNodes.item(0) as HTMLImageElement
			).alt.toLowerCase()}${document
				.querySelector("a[class~='active']")
				.childNodes.item(1)
				.textContent.replace("+", "_")
				.toLowerCase()}`;
			presenceData.smallImageText = `${
				(
					document
						.querySelector("a[class~='active']")
						.childNodes.item(0) as HTMLImageElement
				).alt
			} ${
				document.querySelector("a[class~='active']").childNodes.item(1)
					.textContent
			}`;
			if (cover) {
				presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
					"[alt='Cover Image']"
				).src;
			}

			if (
				document.querySelector(
					".list-group-item.d-flex.justify-content-between:nth-child(2) > span"
				) &&
				document.querySelector(
					".list-group-item.d-flex.justify-content-between:nth-child(2) > span"
				).textContent === "Bot"
			) {
				presenceData.smallImageKey = "showauto";
				presenceData.smallImageText = "Made by a bot";
			}

			presenceData.details = document.querySelectorAll(
				".card-header.d-flex"
			)[0].childNodes[0].textContent;
			if (presenceData.details === "") presenceData.details = "<NO NAME>";

			presenceData.state = `Uploaded by ${
				document
					.querySelectorAll(".list-group-item.d-flex.justify-content-between")
					.item(0)
					.children.item(0).textContent
			}`;
			presenceData.buttons = [
				{
					label: "View Page",
					url: document.location.href,
				},
				{
					label: "View Uploader's Profile",
					url: `https://beatsaver.com${document
						.querySelectorAll(".list-group-item.d-flex.justify-content-between")
						.item(0)
						.getAttribute("href")}`,
				},
			];
		}
	} else if (document.location.pathname.includes("/profile")) {
		presenceData.details = "Viewing Profile";
		presenceData.state = document.querySelector("h4").textContent;
		presenceData.buttons = [
			{
				label: "View Profile",
				url: document.location.href,
			},
		];
	} else if (document.location.pathname.includes("/playlists/")) {
		presenceData.details = "Viewing Playlist";
		presenceData.state = document.querySelector(".ms-4")?.textContent;
		presenceData.buttons = [
			{
				label: "View Playlist",
				url: document.location.href,
			},
		];
		if (cover) {
			presenceData.largeImageKey =
				document.querySelector<HTMLImageElement>("img[alt='Cover']")?.src;
		}
	} else if (document.location.pathname === "/") {
		presenceData.details = "Browsing Beatmaps";
		if (
			document.querySelector(".filter-dropdown > span") &&
			document.querySelector(".filter-dropdown > span").textContent !==
				"Filters"
		) {
			presenceData.state = `Filters: ${
				document.querySelector(".filter-dropdown > span").textContent
			}`;
		}
	}

	switch (document.location.pathname) {
		case "/mappers":
			presenceData.details = "Browsing Mappers";
			break;
		case "/alerts":
			presenceData.details = "Viewing Alerts";
			break;
		case "/policy/dmca":
			presenceData.details = "Viewing DMCA Policy";
			break;
		case "/upload":
			presenceData.details = "Uploading...";
			break;
	}

	if (!time) delete presenceData.startTimestamp;

	if (!buttons && presenceData.buttons) delete presenceData.buttons;

	presence.setActivity(presenceData);
});
