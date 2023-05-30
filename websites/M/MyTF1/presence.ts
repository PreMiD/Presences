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

enum Assets {
	MyTF1 = "https://i.imgur.com/k8jIoSZ.png",
	TF1 = "https://i.imgur.com/pFgnoUS.png",
	TFX = "https://i.imgur.com/u5dTkHx.png",
	TMC = "https://i.imgur.com/62uYw2r.png",
	LCI = "https://i.imgur.com/qrRgNgk.png",
	TF1Series = "https://i.imgur.com/WOmFIm3.png",
	Live = "https://i.imgur.com/xuvR04J.png",
	Repeat = "https://i.imgur.com/OZDAx9n.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.MyTF1,
			startTimestamp: browsingTimestamp,
		},
		path = document.location.pathname,
		time = await presence.getSetting<boolean>("time");

	if (!time) delete presenceData.startTimestamp;

	const { browse, live, viewHome, viewProfile, watchingVid } = await strings;

	if (path.includes("tf1")) presenceData.largeImageKey = Assets.TF1;
	else if (path.includes("tmc")) presenceData.largeImageKey = Assets.TMC;
	else if (path.includes("tfx")) presenceData.largeImageKey = Assets.TFX;
	else if (path.includes("lci")) presenceData.largeImageKey = Assets.LCI;
	else if (path.includes("tf1-series-films"))
		presenceData.largeImageKey = Assets.TF1Series;

	if (path === "/") {
		presenceData.details = viewHome;
		presenceData.state = browse;
	} else if (path.startsWith("/tf1/direct")) {
		presenceData.details = document.querySelector(
			"[class*=VideoSummary_programName]"
		).textContent;
		presenceData.state = document.querySelector(
			"[class*=VideoSummary_title]"
		).textContent;
		presenceData.smallImageKey = Assets.Live;
		presenceData.smallImageText = live;
		if (
			document.querySelector<HTMLImageElement>(
				"[class*=VideoSummary_programLink] picture img"
			).src
		) {
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
				"[class*=VideoSummary_programLink] picture img"
			).src;
		}
	} else if (path.startsWith("/tfx/direct")) {
		presenceData.details = document.querySelector(
			"[class*=VideoSummary_programName]"
		).textContent;
		presenceData.state = document.querySelector(
			"[class*=VideoSummary_title]"
		).textContent;
		presenceData.smallImageKey = Assets.Live;
		presenceData.smallImageText = live;
		if (
			document.querySelector<HTMLImageElement>(
				"[class*=VideoSummary_programLink] picture img"
			).src
		) {
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
				"[class*=VideoSummary_programLink] picture img"
			).src;
		}
	} else if (path.startsWith("/tmc/direct")) {
		presenceData.details = document.querySelector(
			"[class*=VideoSummary_programName]"
		).textContent;
		presenceData.state = document.querySelector(
			"[class*=VideoSummary_title]"
		).textContent;
		presenceData.smallImageKey = Assets.Live;
		presenceData.smallImageText = live;
		if (
			document.querySelector<HTMLImageElement>(
				"[class*=VideoSummary_programLink] picture img"
			).src
		) {
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
				"[class*=VideoSummary_programLink] picture img"
			).src;
		}
	} else if (path.startsWith("/tf1-series-films/direct")) {
		presenceData.details = document.querySelector(
			"[class*=VideoSummary_programName]"
		).textContent;
		presenceData.state = document.querySelector(
			"[class*=VideoSummary_title]"
		).textContent;
		presenceData.smallImageKey = Assets.Live;
		presenceData.smallImageText = live;
		if (
			document.querySelector<HTMLImageElement>(
				"[class*=VideoSummary_programLink] picture img"
			).src
		) {
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
				"[class*=VideoSummary_programLink] picture img"
			).src;
		}
	} else if (path.startsWith("/lci/direct")) {
		presenceData.details = "La Chaîne Info";
		presenceData.state = document.querySelector(
			"[class*=VideoSummary_title]"
		).textContent;
		presenceData.smallImageKey = Assets.Live;
		presenceData.smallImageText = live;
	} else if (path.startsWith("/stream")) {
		presenceData.details = `Stream : ${
			document.querySelector("[class*=VideoSummary_programName]").textContent
		}`;
		presenceData.state = document.querySelector(
			"[class*=VideoSummary_title]"
		).textContent;
		presenceData.smallImageKey = Assets.Live;
		presenceData.smallImageText = live;
	} else if (path.includes("/programmes-tv")) {
		presenceData.details = "Programmes TV";
		presenceData.state = `${browse} Liste des programmes`;
		if (path.split("/")[1] === "programmes-tv")
			presenceData.largeImageKey = Assets.MyTF1;
	} else if (path.startsWith("/mon-compte")) {
		presenceData.details = viewProfile;
		presenceData.state = browse;
	} else if (
		path.split("/")[3].includes("videos") &&
		path.split("/")[4].includes("-")
	) {
		presenceData.details = document.querySelector(
			"[class*=VideoSummary_programName]"
		).textContent;
		presenceData.state = document.querySelector(
			"[class*=VideoSummary_title]"
		).textContent;
		presenceData.smallImageKey = Assets.Repeat;
		presenceData.smallImageText = watchingVid;
	} else if (path.split("/")[2].includes("-")) {
		presenceData.details = document.querySelector(
			"[class*=Tabs_tabs__list] h1"
		).textContent;
		presenceData.state = `${browse} Liste des replays`;
	} else if (path.split("/")[3].includes("videos")) {
		presenceData.details = document.querySelector(
			"[class*=ProgramPageVideo_paddingMenu] h1"
		).textContent;
		presenceData.state = `${browse} Liste des vidéos`;
	} else presenceData.details = browse;

	presence.setActivity(presenceData);
});
