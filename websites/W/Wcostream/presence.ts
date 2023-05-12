const presence = new Presence({
		clientId: "936985014560755753",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let video = {
	timeLeft: "",
	paused: true,
};

presence.on("iFrameData", (data: { timeLeft: string; paused: boolean }) => {
	video = data;
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/mVWgkzs.png",
			details: "Browsing...",
			startTimestamp: browsingTimestamp,
		},
		{ pathname } = document.location,
		[timestamps, cover, buttons] = await Promise.all([
			presence.getSetting<boolean>("timestamps"),
			presence.getSetting<boolean>("cover"),
			presence.getSetting<boolean>("buttons"),
		]);
	if (video.timeLeft !== "") {
		presenceData.details = "Watching:";
		presenceData.state = document.querySelector<HTMLSpanElement>(
			"#content div.iltext > strong > span"
		).textContent;
		if (
			document.querySelector<HTMLAnchorElement>(
				"#star-watch-on > div.wcobtn > a"
			)
		) {
			// This is where they store their thumbnails/posters
			presenceData.largeImageKey = `https://cdn.animationexplore.com/catimg/${
				document
					.querySelector<HTMLAnchorElement>("#star-watch-on > div.wcobtn > a")
					.href.split("/", 5)[4]
			}.jpg`;
		}
		delete presenceData.startTimestamp;
		const timeLeft = presence.timestampFromFormat(video.timeLeft);
		// This is necessary to only use endTimestamp when video has finished loading
		if (Date.now() / 1000 >= Date.now() / 1000 + timeLeft) video.paused = true;

		if (!video.paused) presenceData.endTimestamp = Date.now() / 1000 + timeLeft;

		presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
		presenceData.smallImageText = video.paused ? "Paused" : "Playing";
		presenceData.buttons = [{ label: "Watch Episode", url: document.URL }];
	} else if (pathname === "/") presenceData.details = "Home page";
	else if (pathname.startsWith("/search")) {
		presenceData.details = "Searching...";
		presenceData.smallImageKey = Assets.Search;
	} else if (pathname.startsWith("/anime")) {
		presenceData.details = "Viewing a Series:";
		presenceData.state = document.querySelector<HTMLHeadingElement>(
			"tbody > tr > td > h2"
		).textContent;
		presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
			"#cat-img-desc > div:nth-child(1) > img"
		).src;
		presenceData.smallImageKey = Assets.Reading;
		presenceData.buttons = [{ label: "View Series", url: document.URL }];
	} else if (
		document.querySelector<HTMLAnchorElement>(
			"table > tbody > tr > td > h2 > a"
		)
	) {
		presenceData.details = "Browsing a Category:";
		presenceData.state = document.querySelector<HTMLAnchorElement>(
			"table > tbody > tr > td > h2 > a"
		).textContent;
		presenceData.smallImageKey = Assets.Search;
		presenceData.smallImageText = "Searching";
	}
	if (!cover) presenceData.largeImageKey = "https://i.imgur.com/SDiZrOe.png";
	if (!buttons) delete presenceData.buttons;
	if (!timestamps) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}
	presence.setActivity(presenceData);
});
