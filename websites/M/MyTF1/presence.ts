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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/k8jIoSZ.png",
			startTimestamp: browsingTimestamp,
		},
		path = document.location.pathname,
		time = await presence.getSetting<boolean>("time");

	if (!time) delete presenceData.startTimestamp;

	const { browse, live } = await strings;

	if (path === "/") {
		presenceData.details = (await strings).viewHome;
		presenceData.state = browse;
		delete presenceData.smallImageKey;
		delete presenceData.smallImageText;
		presenceData.largeImageKey = "https://i.imgur.com/k8jIoSZ.png";
	} else if (path.startsWith("/tf1/direct")) {
		presenceData.details = document.querySelector(
			".VideoSummary_programName_xXfYS"
		).textContent;
		presenceData.state = document.querySelector(
			".VideoSummary_title_o8ZzQ"
		).textContent;
		presenceData.smallImageKey = "https://i.imgur.com/xuvR04J.png";
		presenceData.smallImageText = live;
		if (
			document.querySelector<HTMLImageElement>(
				"[class*=LiveShowCardsSlider_list__card_uOvlu] picture img"
			).src
		)
			presenceData.largeImageKey = document
				.querySelectorAll(".LiveShowCardsSlider_list__card_uOvlu")[0]
				.querySelector("picture")
				.querySelector("img").src;
		else presenceData.largeImageKey = "https://i.imgur.com/kSpxrRD.png";
	} else if (path.startsWith("/tfx/direct")) {
		presenceData.details = document.querySelector(
			".VideoSummary_programName_xXfYS"
		).textContent;
		presenceData.state = document.querySelector(
			".VideoSummary_title_o8ZzQ"
		).textContent;
		presenceData.smallImageKey = "https://i.imgur.com/xuvR04J.png";
		presenceData.smallImageText = live;
		if (
			document.querySelector<HTMLImageElement>(
				"[class*=LiveShowCardsSlider_list__card_uOvlu] picture img"
			).src
		)
			presenceData.largeImageKey = document
				.querySelectorAll(".LiveShowCardsSlider_list__card_uOvlu")[2]
				.querySelector("picture")
				.querySelector("img").src;
		else presenceData.largeImageKey = "https://i.imgur.com/T7CEbod.png";
	} else if (path.startsWith("/tmc/direct")) {
		presenceData.details = document.querySelector(
			".VideoSummary_programName_xXfYS"
		).textContent;
		presenceData.state = document.querySelector(
			".VideoSummary_title_o8ZzQ"
		).textContent;
		presenceData.smallImageKey = "https://i.imgur.com/xuvR04J.png";
		presenceData.smallImageText = live;
		if (
			document.querySelector<HTMLImageElement>(
				"[class*=LiveShowCardsSlider_list__card_uOvlu] picture img"
			).src
		)
			presenceData.largeImageKey = document
				.querySelectorAll(".LiveShowCardsSlider_list__card_uOvlu")[1]
				.querySelector("picture")
				.querySelector("img").src;
		else presenceData.largeImageKey = "https://i.imgur.com/0ywqrX9.png";
	} else if (path.startsWith("/tf1-series-films/direct")) {
		presenceData.details = document.querySelector(
			".VideoSummary_programName_xXfYS"
		).textContent;
		presenceData.state = document.querySelector(
			".VideoSummary_title_o8ZzQ"
		).textContent;
		presenceData.smallImageKey = "https://i.imgur.com/xuvR04J.png";
		presenceData.smallImageText = live;
		if (
			document.querySelector<HTMLImageElement>(
				"[class*=LiveShowCardsSlider_list__card_uOvlu] picture img"
			).src
		)
			presenceData.largeImageKey = document
				.querySelectorAll(".LiveShowCardsSlider_list__card_uOvlu")[3]
				.querySelector("picture")
				.querySelector("img").src;
		else presenceData.largeImageKey = "https://i.imgur.com/Ocu2g76.png";
	} else if (path.startsWith("/lci/direct")) {
		presenceData.details = "La Chaîne Info";
		presenceData.state = document.querySelector(
			".VideoSummary_title_o8ZzQ"
		).textContent;
		presenceData.smallImageKey = "https://i.imgur.com/xuvR04J.png";
		presenceData.smallImageText = live;
		presenceData.largeImageKey = "https://i.imgur.com/zUhVSNY.png";
	} else if (path.startsWith("/stream")) {
		presenceData.details = `Stream : ${
			document.querySelector(".VideoSummary_programName_xXfYS").textContent
		}`;
		presenceData.state = document.querySelector(
			".VideoSummary_title_o8ZzQ"
		).textContent;
		presenceData.smallImageKey = "https://i.imgur.com/xuvR04J.png";
		presenceData.smallImageText = live;
		presenceData.largeImageKey = "https://i.imgur.com/k8jIoSZ.png";
	} else if (path.includes("/programmes-tv")) {
		presenceData.details = "Programmes TV";
		presenceData.state = `${browse} Liste des programmes`;
		delete presenceData.smallImageKey;
		delete presenceData.smallImageText;
		if (path.split("/")[1] === "programmes-tv")
			presenceData.largeImageKey = "https://i.imgur.com/k8jIoSZ.png";
		else presenceData.largeImageKey = path.split("/")[1];
	} else if (path.startsWith("/mon-compte")) {
		presenceData.details = (await strings).viewProfile;
		presenceData.state = browse;
		presenceData.largeImageKey = "https://i.imgur.com/k8jIoSZ.png";
	} else if (
		path.split("/")[3].includes("videos") &&
		path.split("/")[4].includes("-")
	) {
		presenceData.details = document.querySelector(
			".VideoSummary_programName_xXfYS"
		).textContent;
		presenceData.state = document.querySelector(
			".VideoSummary_title_o8ZzQ"
		).textContent;
		presenceData.smallImageKey = "https://i.imgur.com/OZDAx9n.png";
		presenceData.smallImageText = (await strings).watchingVid;
		presenceData.largeImageKey = path.split("/")[1];
	} else if (path.split("/")[2].includes("-")) {
		presenceData.details = document
			.querySelector(".Tabs_tabs__list_FwTdR")
			.querySelector("h1").textContent;
		presenceData.state = `${browse} Liste des replays`;
		presenceData.largeImageKey = "https://i.imgur.com/k8jIoSZ.png";
	} else if (path.split("/")[3].includes("videos")) {
		presenceData.details = document
			.querySelector(".ProgramPageVideo_paddingMenu_cEuG_")
			.querySelector("h1").textContent;
		presenceData.state = `${browse} Liste des vidéos`;
		presenceData.largeImageKey = "https://i.imgur.com/k8jIoSZ.png";
	} else {
		presenceData.details = browse;
		presenceData.largeImageKey = "https://i.imgur.com/k8jIoSZ.png";
	}

	presence.setActivity(presenceData);
});
