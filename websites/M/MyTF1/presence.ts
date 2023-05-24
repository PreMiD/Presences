const presence = new Presence({
		clientId: "1043951049800695808",
	}),
	strings = presence.getStrings({
		viewHome: "general.viewHome",
		viewPage: "general.viewPage",
		viewProfile: "general.viewProfile",
		watchingVid: "general.watchingVid",
		browse: "general.browsing",
		live: "general.live",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	myTf1 = "https://i.imgur.com/k8jIoSZ.png",
	tf1 = "https://i.imgur.com/pFgnoUS.png",
	tfx = "https://i.imgur.com/u5dTkHx.png",
	tmc = "https://i.imgur.com/62uYw2r.png",
	lci = "https://i.imgur.com/qrRgNgk.png",
	tf1Series = "https://i.imgur.com/WOmFIm3.png",
	live = "https://i.imgur.com/xuvR04J.png",
	replay = "https://i.imgur.com/OZDAx9n.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.myTf1,
			startTimestamp: browsingTimestamp,
		},
		path = document.location.pathname,
		time = await presence.getSetting<boolean>("time");

	if (!time) delete presenceData.startTimestamp;

	const { browse, live } = await strings;

	if (path === "/") {
		presenceData.details = (await strings).viewHome;
		presenceData.state = browse;
	} else if (path.startsWith("/tf1/direct")) {
		presenceData.details = document.querySelector(
			"[class*=VideoSummary_programName_xXfYS]"
		).textContent;
		presenceData.state = document.querySelector(
			"[class*=VideoSummary_title_o8ZzQ]"
		).textContent;
		presenceData.smallImageKey = Assets.live;
		presenceData.smallImageText = live;
		if (
			document.querySelector<HTMLImageElement>(
				"[class*=VideoSummary_programLink_xY8sS] picture img"
			).src
		) {
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
				"[class*=VideoSummary_programLink_xY8sS] picture img"
			).src;
		} else presenceData.largeImageKey = Assets.tf1;
	} else if (path.startsWith("/tfx/direct")) {
		presenceData.details = document.querySelector(
			"[class*=VideoSummary_programName]"
		).textContent;
		presenceData.state = document.querySelector(
			"[class*=VideoSummary_title_o8ZzQ]"
		).textContent;
		presenceData.smallImageKey = Assets.live;
		presenceData.smallImageText = live;
		if (
			document.querySelector<HTMLImageElement>(
				"[class*=VideoSummary_programLink_xY8sS] picture img"
			).src
		) {
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
				"[class*=VideoSummary_programLink_xY8sS] picture img"
			).src;
		} else presenceData.largeImageKey = Assets.tfx;
	} else if (path.startsWith("/tmc/direct")) {
		presenceData.details = document.querySelector(
			"[class*=VideoSummary_programName]"
		).textContent;
		presenceData.state = document.querySelector(
			"[class*=VideoSummary_title_o8ZzQ]"
		).textContent;
		presenceData.smallImageKey = Assets.live;
		presenceData.smallImageText = live;
		if (
			document.querySelector<HTMLImageElement>(
				"[class*=VideoSummary_programLink_xY8sS] picture img"
			).src
		) {
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
				"[class*=VideoSummary_programLink_xY8sS] picture img"
			).src;
		} else presenceData.largeImageKey = Assets.tmc;
	} else if (path.startsWith("/tf1-series-films/direct")) {
		presenceData.details = document.querySelector(
			"[class*=VideoSummary_programName]"
		).textContent;
		presenceData.state = document.querySelector(
			"[class*=VideoSummary_title_o8ZzQ]"
		).textContent;
		presenceData.smallImageKey = Assets.live;
		presenceData.smallImageText = live;
		if (
			document.querySelector<HTMLImageElement>(
				"[class*=VideoSummary_programLink_xY8sS] picture img"
			).src
		) {
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
				"[class*=VideoSummary_programLink_xY8sS] picture img"
			).src;
		} else presenceData.largeImageKey = Assets.tf1Series;
	} else if (path.startsWith("/lci/direct")) {
		presenceData.details = "La Chaîne Info";
		presenceData.state = document.querySelector(
			"[class*=VideoSummary_title_o8ZzQ]"
		).textContent;
		presenceData.smallImageKey = Assets.live;
		presenceData.smallImageText = live;
		presenceData.largeImageKey = Assets.lci;
	} else if (path.startsWith("/stream")) {
		presenceData.details = `Stream : ${
			document.querySelector("[class*=VideoSummary_programName_xXfYS]")
				.textContent
		}`;
		presenceData.state = document.querySelector(
			"[class*=VideoSummary_title_o8ZzQ]"
		).textContent;
		presenceData.smallImageKey = Assets.live;
		presenceData.smallImageText = live;
	} else if (path.includes("/programmes-tv")) {
		presenceData.details = "Programmes TV";
		presenceData.state = `${browse} Liste des programmes`;
		if (path.split("/")[1] === "programmes-tv")
			presenceData.largeImageKey = Assets.myTf1;
		else presenceData.largeImageKey = path.split("/")[1];
	} else if (path.startsWith("/mon-compte")) {
		presenceData.details = (await strings).viewProfile;
		presenceData.state = browse;
	} else if (
		path.split("/")[3].includes("videos") &&
		path.split("/")[4].includes("-")
	) {
		presenceData.details = document.querySelector(
			"[class*=VideoSummary_programName_xXfYS]"
		).textContent;
		presenceData.state = document.querySelector(
			"[class*=VideoSummary_title_o8ZzQ]"
		).textContent;
		presenceData.smallImageKey = Assets.replay;
		presenceData.smallImageText = (await strings).watchingVid;
		presenceData.largeImageKey = path.split("/")[1];
	} else if (path.split("/")[2].includes("-")) {
		presenceData.details = document
			.querySelector("[class*=Tabs_tabs__list_FwTdR]")
			.querySelector("h1").textContent;
		presenceData.state = `${browse} Liste des replays`;
	} else if (path.split("/")[3].includes("videos")) {
		presenceData.details = document
			.querySelector("[class*=ProgramPageVideo_paddingMenu_cEuG_]")
			.querySelector("h1").textContent;
		presenceData.state = `${browse} Liste des vidéos`;
	} else presenceData.details = browse;

	presence.setActivity(presenceData);
});
