const presence = new Presence({
	//The client ID of the Application created at https://discordapp.com/developers/applications
	clientId: "1001288215388495953",
});

/**
 * @param title
 * @return {string} Clean title
 */
function cleanTitle(title: string): string {
	if (!title) return "";

	const words = title.replaceAll("_", " ").split(" ");
	for (let i = 0; i < words.length; i++)
		words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);

	return words.join(" ");
}

/**
 * @returns {string} The title of the movie
 */
function getMovieTitle(): string {
	return document.querySelector("head > title").innerHTML.split(" | ")[0];
}

/**
 * @returns {string} The title of the show
 */
function getShowTitle(): string {
	return document.querySelector("head > title").innerHTML.split(" | ")[0];
}

interface IShowDetails {
	name: string;
	title: string;
	number: string;
}

function splitEpisodeDetails(episodeDetails: string): IShowDetails {
	if (!episodeDetails) return { name: "", title: "", number: "" };

	const match = /(S([0-9]+):E([0-9]+))/g.exec(episodeDetails);

	return {
		name: episodeDetails.split(match[0])[1].trim(),
		title: episodeDetails.split(match[0])[0].trim(),
		number: match[0].trim(),
	};
}

/**
 * @returns {boolean} If the video is playing or not
 */
function isPlaying(): boolean {
	return document.querySelector(".jw-icon-playback").ariaLabel !== "Play";
}
/**
 * @returns [number,number] The current time and the duration of the video
 */
function getTimeStamps(): [number, number] {
	return presence.getTimestamps(
		presence.timestampFromFormat(
			document.querySelector(".jw-text-elapsed").innerHTML
		),
		presence.timestampFromFormat(
			document.querySelector(".jw-text-duration").innerHTML
		)
	);
}

/**
 * @returns {[string, string, string]} first state, second state, and third state
 */
function getState(): [string, string, string] {
	const contentType = document
			.querySelector("head > meta[property='og:type']")
			.getAttribute("content")
			.split(":"),
		state = contentType[0],
		content = contentType[1];

	switch (state) {
		case "section":
			switch (content) {
				case "movies":
					return ["Browsing", "Movies", ""];
				case "tv_shows":
					return ["Browsing", "Shows", ""];
				default:
					return ["Browsing", cleanTitle(content), ""];
			}
		case "movies":
			return ["Looking", cleanTitle(content), ""];
		case "tv_shows":
			return ["Looking", cleanTitle(content), ""];
		default:
			if (state.split(".")[0] === "video") {
				switch (state.split(".")[1]) {
					case "movie":
						return ["Watching", getMovieTitle(), "movie"];
					case "episode":
						return ["Watching", getShowTitle(), "episode"];
					default:
						return ["Watching", cleanTitle(content), ""];
				}
			} else if (state === "website") return ["Browsing", "Website", ""];
			else {
				presence.error(`Unknown state: ${state}`);
				return ["Error", "Unknown State", ""];
			}
	}
}

// Presence

presence.on("UpdateData", async () => {
	const isVideo = getState()[0] === "Watching";

	let stateString, detailsString;

	if (getState()[2] === "episode") {
		const episodeDetails = splitEpisodeDetails(
			document.querySelector(".jw-title-primary")?.innerHTML || ""
		);
		// if the video is an episode
		stateString = `${episodeDetails.number} - ${episodeDetails.name}`;
		detailsString = getShowTitle();
	} else if (getState()[2] === "movie") {
		// if the video is a movie
		stateString = `${getMovieTitle()}`;
		detailsString = getState()[0];
	} else {
		stateString = getState()[1];
		detailsString = getState()[0];
	}

	const presenceData: PresenceData = {
		largeImageKey: "crave_logo",
		smallImageKey: isVideo ? (isPlaying() ? "play" : "pause") : "Browsing",
		smallImageText: isVideo ? (isPlaying() ? "Playing" : "Paused") : "Browsing",
		details: detailsString,
		state: stateString,
		startTimestamp: isVideo ? (isPlaying() ? getTimeStamps()[0] : 0) : null,
		endTimestamp: isVideo ? (isPlaying() ? getTimeStamps()[1] : 0) : null,
		buttons: isVideo
			? [
					{
						label: "Watch",
						url: document.URL,
					},
			  ]
			: null,
	};

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
