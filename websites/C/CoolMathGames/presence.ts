const presence = new Presence({
	clientId: "630561466872889344",
});

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

enum PageType {
	Game = 0,
	Category = 1,
}

const capitalize = (text: string[]): string => {
		return text
			.map(str => {
				return str.charAt(0).toUpperCase() + str.slice(1);
			})
			.join(" ");
	},
	parse = (path: string): string[] => {
		path = path.replace("/", "");
		const split: string[] = path.split("-");

		return [split[0], capitalize(split.slice(1))];
	};

let elapsed: number, oldUrl: string;

presence.on("UpdateData", async () => {
	if (window.location.href !== oldUrl) {
		oldUrl = window.location.href;
		elapsed = Math.floor(Date.now() / 1000);
	}

	let details, state;

	const path = window.location.pathname;

	if (path === "/") details = "Browsing...";
	else if (path.match("/user") || path.match("/signup")) {
		if (path.match("signup")) details = "Signing up...";
		else details = "Logging in...";
	} else if (path.match("/terms-use")) details = "Viewing Terms of Use";
	else if (path.match("/trivia")) {
		details = "Viewing Trivia";

		const title = document.querySelector("#start-the-quiz-title");
		if (title) state = title.textContent;
	} else {
		const breadcrumb = document.querySelector(
				".pane-content > .breadcrumb > ol"
			),
			breadcrumbLast = document.querySelector(
				".pane-content > .breadcrumb > ol > li:last-child > span"
			),
			difficulty = document.querySelector("a.active");
		if (breadcrumb && breadcrumbLast && difficulty) {
			details = "Viewing Jigsaw Puzzle";
			state = `${breadcrumbLast.textContent} (${difficulty.textContent})`;
		} else if (breadcrumb && breadcrumbLast) {
			details = "Viewing Jigsaw Puzzles";
			state = breadcrumbLast.textContent;
		} else if (document.querySelector(".playlists-queue-wrapper")) {
			details = "Viewing Category";
			state = "Jigsaw Puzzles";
		} else {
			const [parsedInt, parsedName] = parse(path);
			switch (parseInt(parsedInt)) {
				case PageType.Category:
					details = "Viewing Category";
					break;

				case PageType.Game:
					details = "Viewing Game";
					break;

				default:
					break;
			}
			state = parsedName;
		}
	}

	presence.setActivity({
		details,
		state,
		largeImageKey: "https://i.imgur.com/gg4LsW0.png",
		startTimestamp: elapsed,
	});
});
