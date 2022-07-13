const presence = new Presence({
		clientId: "828549761376059441",
	}),
	{ href } = window.location,
	getAction = (): string => {
		if (href.includes("movielist")) return "movielist";
		else if (href.includes("sportlist")) return "sportlist";
		else if (href.includes("tvlist")) return "tvlist";
		else if (href.includes("Tczo")) return "tvshow";
		else if (href.includes("Mczo")) return "movie";
		else if (href.includes("Sczo")) return "sport";
		else if (href.includes("faq")) return "faq";
		else if (href.includes("Eczo")) return "tv";
		else return "home";
	},
	getText = (text: string): string => {
		return document.querySelector(text).textContent.trim();
	},
	getStatus = (): string => {
		const element = document.querySelector("#t3").textContent.trim();
		if (element === "") return "Loading";
		else return element;
	},
	constructAction: Record<string, string> = {
		movielist: "Searching for a movie",
		sportlist: "Keeping up with sports",
		tvlist: "Looking for a TV show",
		tvshow: "Perusing through some episodes",
		movie: "Watching a movie",
		sport: "Enjoying some sports",
		home: "Checking out the home page",
		faq: "Reading the FAQ",
		tv: "Relaxing to some TV",
	};
let pauseFlag = true,
	watchStamp = 0;

presence.on("UpdateData", async () => {
	let presenceData: PresenceData = {
		largeImageKey: "icon",
		details: constructAction[getAction()],
	};
	// If the user is watching something, get the title and set duration.
	if (["movie", "tv", "sport"].includes(getAction())) {
		// If paused, reset update remaining.
		if (getStatus() === "Pause") pauseFlag = false;

		if (pauseFlag) {
			[, watchStamp] = presence.getTimestampsfromMedia(
				document.querySelector("video")
			);
			if (!isNaN(watchStamp)) pauseFlag = true;
			presenceData = {
				state: `${getStatus()} | ${getText("[class~=player-title-bar]")}`,
				endTimestamp: watchStamp,
				smallImageKey: "play",
				...presenceData,
			};
		} else {
			presenceData = {
				state: `${getStatus()} | ${getText("[class~=player-title-bar]")}`,
				smallImageKey: "pause",
				...presenceData,
			};
		}
		pauseFlag = true;
	} else {
		// If the user is not watching something, return how long they have been browsing.
		presenceData = {
			startTimestamp: Math.floor(Date.now() / 1000),
			...presenceData,
		};
	}

	presence.setActivity(presenceData);
});
