const presence = new Presence({
		clientId: "819942708604174376",
	}),
	startTime = Math.floor(Date.now() / 1000);

let SouthParkData: Data;

presence.on("UpdateData", async () => {
	const video = document.querySelector("video"),
		path = document.location.pathname,
		showButtons = await presence.getSetting<boolean>("buttons");

	SouthParkData ??= await presence.getPageletiable<Data>("__DATA__");

	let presenceData: PresenceData = {
		largeImageKey: "https://cdn.rcd.gg/PreMiD/websites/S/South%20Park/assets/logo.jpg",
		details: "Browsing...",
		smallImageKey: "reading",
		startTimestamp: startTime,
	};

	if (path.includes("/episodes/") || path.includes("/episodios/")) {
		const [season, episode] = SouthParkData.children[0].props.title.text
				.split(" - ")[1]
				.match(/([1-9]?[0-9]?[0-9])/g),
			[title, , EpTitle] =
				SouthParkData.children[0].props.title.text.split(" - ");

		if (video) {
			presenceData.details = title;
			presenceData.state = `S${season}:E${episode} ${EpTitle}`;

			presenceData.smallImageKey =
				video.paused || isNaN(video.duration) ? Assets.Pause : Assets.Play;
			presenceData.smallImageText =
				video.paused || isNaN(video.duration) ? "Paused" : "Playing";

			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(
					presence.timestampFromFormat(
						document.querySelector("div.edge-gui-current-time")?.textContent
					),
					presence.timestampFromFormat(
						document.querySelector("div.edge-gui-duration")?.textContent
					)
				);

			presenceData.buttons = [
				{
					label: "Watch Episode",
					url: `${
						path.includes("/episodios/")
							? "https://www.southpark.lat/episodios"
							: "https://www.southparkstudios.com/episodes"
					}/${document.location.pathname.split("/")[2]}`,
				},
			];

			if (video.paused || isNaN(video.duration)) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		} else {
			presenceData.details = "Viewing Episode:";
			presenceData.state = `S${season}:E${episode} ${EpTitle}`;
		}
	} else if (path.includes("/seasons/")) {
		presenceData.details = "Viewing Episodes of:";
		presenceData.state = `Season ${document.URL.match(
			/(season-[1-9]?[0-9])/
		)[0].replace("season-", "")}`;
	} else if (path.includes("/collections/")) {
		const [title] = SouthParkData.children[0].props.title.text.split(" - "),
			[season, episode] = document
				.querySelector("div > div.sub-header > span")
				.textContent.match(/([1-9]?[0-9]?[0-9])/g);

		if (video) {
			presenceData.details = title;
			presenceData.state = `S${season}:E${episode}} ${
				document.querySelector("div.header > span").textContent
			}`;

			presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
			presenceData.smallImageText = video.paused ? "Paused" : "Playing";

			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestampsfromMedia(video);

			presenceData.buttons = [
				{
					label: "Watch Episode",
					url: `https://www.southparkstudios.com/collections/${
						document.location.pathname.split("/")[2]
					}`,
				},
			];

			if (video.paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		} else {
			presenceData.details = "Viewing Collection:";
			presenceData.state = title;
		}
	}

	const pages: {
		[key: string]: PresenceData;
	} = {
		"/create-account/step-1": {
			details: "Creating an account",
			state: "Step 1 of 2",
			smallImageKey: "writing",
		},
		"/create-account/step-2": {
			details: "Creating an account",
			state: "Step 2 of 2",
			smallImageKey: "writing",
		},
		"/settings": {
			details: "Viewing their:",
			state: "Account details",
		},
		"/email-verification": {
			details: "Viewing page:",
			state: "Email verification",
		},
		"/news": {
			details: "Viewing page:",
			state: "The news page",
		},
		"/news/": {
			details: "Reading article:",
			state: document.querySelector("h1")?.textContent,
			buttons: [
				{
					label: "Read article",
					url: `https://www.southparkstudios.com/news/${
						document.location.pathname.split("/")[2]
					}`,
				},
			],
		},
		"/avatar": {
			details: "Viewing page:",
			state: "Avatar creator",
		},
		"/forum/v": {
			details: "Reading forum:",
			state: document.querySelector("h2")?.textContent,
		},
		"/wiki": {
			details: "Viewing page:",
			state: "Wiki",
		},
	};

	for (const [key, value] of Object.entries(pages))
		if (path.match(key)) presenceData = { ...presenceData, ...value };

	if (!showButtons) delete presenceData.buttons;

	presence.setActivity(presenceData);
});

interface Data {
	children: {
		type: string;
		props: {
			title: {
				text: string;
			};
		};
	}[];
}
