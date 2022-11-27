const presence = new Presence({
	clientId: "1046315725960265839",
}),
pages: {
	[name: string]: string;
} = {
	"/": "Home",
	"/tournament": "Tournaments",
	"/simul": "Simultaneous exhibitions",
	"/training/coordinate": "Coordinate training",
	"/study": "Study",
	"/variant": "Rules & Variants",
	"/tv": "Lidraughts TV",
	"/games": "Current Games",
	"/streamer": "Streamers",
	"/broadcast": "Broadcasts",
	"/player": "Players",
	"/team/all": "Teams",
	"/forum": "Forums",
	"/faq": "FAQ",
	"/analysis": "Analysis Board",
	"/editor": "Board Editor",
	"/paste": "Import Game",
	"/games/search": "Advanced Search",
};

presence.on("UpdateData", async () => {
const page = document.location.pathname,
	game = document
		.querySelector<HTMLElement>(
			"#main-wrap > main > aside > div > section > div.game__meta__infos > div > div > div"
		)
		?.textContent.trim(),
	status = document
		.querySelector<HTMLElement>(
			"#main-wrap > main > aside > div > section.status"
		)
		?.textContent.trim(),
	presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/FgV8Qhq.png",
		startTimestamp: Math.floor(Date.now() / 1000),
	};

if ((page && pages[page]) || (page && pages[page.slice(0, -1)])) {
	presenceData.details = "Viewing a page:";
	presenceData.state = pages[page] || pages[page.slice(0, -1)];
} else if (page.includes("/tournament/")) {
	presenceData.details = "Viewing tournament:";
	presenceData.state = `${document.querySelector("#main-wrap > main > div.tour__main > div > div.big_top > div.tour__main__header > h1").textContent}`;
} else if (page.includes("/simul/")) {
	presenceData.details = "Viewing simultaneous exhibition:";
	presenceData.state = `${document.title.replace(" • lidraughts.org", "")}`;
} else if (page.includes("/variant/")) {
	presenceData.details = "Viewing variant:";
	presenceData.state = `${document.querySelector("#main-wrap > main > aside > a.text.active").textContent}`;		
} else if (page.includes("/training/")) {
	presenceData.details = "Viewing a page:";
	presenceData.state = "Training";
} else if (page.includes("/@/")) {
	presenceData.details = "Searching for:";
	presenceData.state = document.title.replace(" • lidraughts.org", "");
} else if (status && game) {
	presenceData.details = game;
	presenceData.state = status;
} else if (!status && game) {
	presenceData.details = "Playing a game:";
	presenceData.state = game;
}

if (presenceData.details && presenceData.state)
	presence.setActivity(presenceData);
});
