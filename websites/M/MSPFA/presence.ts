const presence = new Presence({
		clientId: "717795432251654200",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	// This is better than having a lot of (almost) empty switch cases
	// Assigning details to type any made ESLint scream, and setting it to type string made the compiler scream
	details: { [k: string]: string } = {
		"/stories/": "Searching for an adventure",
		// This is just error handling because /random/ redirects you
		"/random/": "Finding a random adventure",
		"/stats/": "Looking at site stats",
		"/my/": "Looking at their profile",
		"/user/": "Looking at a profile",
		"/my/profile/": "Editing their profile",
		"/my/settings/": "Editing their profile",
		"/my/stories/": "Editing an adventure",
		"/my/stories/info/": "Editing an adventure",
		"/my/stories/pages/": "Editing an adventure",
		"/favs/": "Browsing favorite adventures",
		"/my/messages/": "Reading private messages",
		"/achivements/": "Looking at someone's achievements",
		"/donate/": "Considering donating",
		"/privacy/": "Reading the privacy policy",
		"/terms/": "Reading the ToS",
		"/log/": "Reading an adventure log",
		"/search/": "Searching an adventure",
	};

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/GWzbcj0.png",
		startTimestamp: browsingTimestamp,
	};
	switch (document.location.pathname) {
		case "/stories/":
			presenceData.smallImageKey = Assets.Search;
			break;
		case "/user/":
			presenceData.state = `User: ${
				document.querySelector("h2#username").textContent
			}`;
			break;
		case "/my/profile/":
			presenceData.smallImageKey = Assets.Writing;
			break;
		case "/my/settings/":
			presenceData.smallImageKey = Assets.Writing;
			break;
		case "/my/stories/":
			presenceData.smallImageKey = Assets.Writing;
			break;
		case "/my/stories/info/":
			presenceData.smallImageKey = Assets.Writing;
			break;
		case "/my/stories/pages/":
			presenceData.smallImageKey = Assets.Writing;
			presenceData.state =
				document.querySelector("a#storyname.major").textContent;
			break;
		case "/achievements/":
			presenceData.state = `User: ${
				document.querySelector("a#username").textContent
			}`;
			break;
		case "/log/":
			presenceData.state =
				document.querySelector("a#storyname.major").textContent;
			break;
		case "/search/":
			presenceData.state =
				document.querySelector("a#storyname.major").textContent;
			break;
		default:
			break;
	}

	if (document.location.pathname === "/" && document.location.search === "")
		presenceData.details = "Viewing home page";
	else if (
		document.location.pathname === "/" &&
		document.location.search !== ""
	) {
		presenceData.details = "Reading an adventure";
		presenceData.state = document.querySelector("title").textContent;
		presenceData.smallImageKey = Assets.Reading;
		let { search } = document.location;
		search = new URLSearchParams(search).get("p");
		presenceData.smallImageText = `On page ${search}`;
	}

	if (document.location.pathname in details)
		presenceData.details = details[document.location.pathname];

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
