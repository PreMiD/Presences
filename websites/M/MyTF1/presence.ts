const presence = new Presence({
	clientId: "1043951049800695808",
}),
strings = presence.getStrings({
	viewHome: "general.viewHome",
	viewPage: "general.viewPage",
	viewProfile: "general.viewProfile",
	watchingVid: "general.watchingVid",
	browse: "general.browsing",
	live: "general.live"
}),
browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	
	const presenceData: PresenceData = {
		largeImageKey: "mytf1",
		startTimestamp: browsingTimestamp,
	},
	path = window.location.pathname,
	time = await presence.getSetting<boolean>("time");

	if (!time) {
		delete presenceData.startTimestamp;
	}

	const browse = (await strings).browse,
	viewHome = (await strings).viewHome,
	viewProfile = (await strings).viewProfile,
	watchingVid = (await strings).watchingVid,
	live = (await strings).live; 

	if (path == "/") {
		presenceData.details = viewHome;
		presenceData.state = browse;
		delete presenceData.smallImageKey;
		delete presenceData.smallImageText;
		presenceData.largeImageKey = "mytf1";
		presenceData.buttons = [{ label: "Voir la page", url: window.location.href }];
		
	} else if (path.startsWith("/tf1/direct")) {
		presenceData.details = document.querySelector(".VideoSummary_programName_xXfYS").textContent;
		presenceData.state = document.querySelector(".VideoSummary_title_o8ZzQ").textContent;
		presenceData.smallImageKey = "live";
		presenceData.smallImageText = live;
		if(document.querySelectorAll('.LiveShowCardsSlider_list__card_uOvlu')[0].querySelector('picture').querySelector('img').src) {
			presenceData.largeImageKey = document.querySelectorAll('.LiveShowCardsSlider_list__card_uOvlu')[0].querySelector('picture').querySelector('img').src;
		} else {
			presenceData.largeImageKey = "tf1";
		}
		presenceData.buttons = [{ label: "View Page", url: window.location.href }];
		
	} else if (path.startsWith("/tfx/direct")) {
		presenceData.details = document.querySelector(".VideoSummary_programName_xXfYS").textContent;
		presenceData.state = document.querySelector(".VideoSummary_title_o8ZzQ").textContent;
		presenceData.smallImageKey = "live";
		presenceData.smallImageText = live;
		if(document.querySelectorAll('.LiveShowCardsSlider_list__card_uOvlu')[2].querySelector('picture').querySelector('img').src) {
			presenceData.largeImageKey = document.querySelectorAll('.LiveShowCardsSlider_list__card_uOvlu')[2].querySelector('picture').querySelector('img').src;
		} else {
			presenceData.largeImageKey = "tfx";
		}
		presenceData.buttons = [{ label: "View Page", url: window.location.href }];
		
	} else if (path.startsWith("/tmc/direct")) {
		presenceData.details = document.querySelector(".VideoSummary_programName_xXfYS").textContent;
		presenceData.state = document.querySelector(".VideoSummary_title_o8ZzQ").textContent;
		presenceData.smallImageKey = "live";
		presenceData.smallImageText = live;
		if(document.querySelectorAll('.LiveShowCardsSlider_list__card_uOvlu')[1].querySelector('picture').querySelector('img').src) {
			presenceData.largeImageKey = document.querySelectorAll('.LiveShowCardsSlider_list__card_uOvlu')[1].querySelector('picture').querySelector('img').src;
		} else {
			presenceData.largeImageKey = "tmc";
		}
		presenceData.buttons = [{ label: "View Page", url: window.location.href }];
		
	} else if (path.startsWith("/tf1-series-films/direct")) {
		presenceData.details = document.querySelector(".VideoSummary_programName_xXfYS").textContent;
		presenceData.state = document.querySelector(".VideoSummary_title_o8ZzQ").textContent;
		presenceData.smallImageKey = "live";
		presenceData.smallImageText = live;
		if(document.querySelectorAll('.LiveShowCardsSlider_list__card_uOvlu')[3].querySelector('picture').querySelector('img').src) {
			presenceData.largeImageKey = document.querySelectorAll('.LiveShowCardsSlider_list__card_uOvlu')[3].querySelector('picture').querySelector('img').src;
		} else {
			presenceData.largeImageKey = "tf1_series_films";
		}
		presenceData.buttons = [{ label: "View Page", url: window.location.href }];

	} else if (path.startsWith("/lci/direct")) {
		presenceData.details = "La Chaîne Info";
		presenceData.state = document.querySelector(".VideoSummary_title_o8ZzQ").textContent;
		presenceData.smallImageKey = "live";
		presenceData.smallImageText = live;
		presenceData.largeImageKey = "lci";
		presenceData.buttons = [{ label: "View Page", url: window.location.href }];
		
	} else if (path.startsWith("/stream")) {
		presenceData.details = "Stream : " + document.querySelector(".VideoSummary_programName_xXfYS").textContent;
		presenceData.state = document.querySelector(".VideoSummary_title_o8ZzQ").textContent;
		presenceData.smallImageKey = "live";
		presenceData.smallImageText = live;
		presenceData.largeImageKey = "mytf1";
		presenceData.buttons = [{ label: "View Page", url: window.location.href }];

	} else if (path.includes("/programmes-tv")) {
		presenceData.details = "Programmes TV";
		presenceData.state = browse + " Liste des programmes";
		delete presenceData.smallImageKey;
		delete presenceData.smallImageText;
		if (path.split("/")[1] == "programmes-tv") {
			presenceData.largeImageKey = "mytf1";
		} else {
			presenceData.largeImageKey = path.split("/")[1];
		}
		presenceData.buttons = [{ label: "View Page", url: window.location.href }];
		
	} else if (path.startsWith("/mon-compte")) {
		presenceData.details = viewProfile;
		presenceData.state = browse;
		delete presenceData.smallImageKey;
		delete presenceData.smallImageText;
		presenceData.largeImageKey = "mytf1";
		delete presenceData.buttons;
		 
	} else if (path.split("/")[3].includes("videos") && path.split("/")[4].includes("-")) {
		presenceData.details = document.querySelector(".VideoSummary_programName_xXfYS").textContent;
		presenceData.state = document.querySelector(".VideoSummary_title_o8ZzQ").textContent;
		presenceData.smallImageKey = "replay";
		presenceData.smallImageText = watchingVid;
		presenceData.largeImageKey = path.split("/")[1];
		presenceData.buttons = [{ label: "View Page", url: window.location.href }];
	} else if (path.split("/")[2].includes("-")) {
		presenceData.details = document.querySelector(".Tabs_tabs__list_FwTdR").querySelector("h1").textContent;
		presenceData.state = browse + " Liste des replays";
		delete presenceData.smallImageKey;
		delete presenceData.smallImageText;
		presenceData.buttons = [{ label: "Voir les replays", url: window.location.href }];
		if(presenceData.details == "Coupe du Monde de la FIFA 2022") {
			presenceData.largeImageKey = "fifa";
		} else {
			presenceData.largeImageKey = path.split("/")[1];
		}
		
	} else if (path.split("/")[3].includes("videos")) {
		presenceData.details = document.querySelector(".ProgramPageVideo_paddingMenu_cEuG_").querySelector("h1").textContent;
		presenceData.state = browse + " Liste des vidéos";
		delete presenceData.smallImageKey;
		delete presenceData.smallImageText;
		presenceData.buttons = [{ label: "View Page", url: window.location.href }];
		if(presenceData.details == "Coupe du Monde de la FIFA 2022") {
			presenceData.largeImageKey = "fifa";
		} else {
			presenceData.largeImageKey = path.split("/")[1];
		}
		
	} else {	
		presenceData.details = browse;
		delete presenceData.state;
		delete presenceData.smallImageKey;
		delete presenceData.smallImageText;
		presenceData.largeImageKey = "mytf1";
		presenceData.buttons = [{ label: "View Page", url: window.location.href }];
	}

	

	presence.setActivity(presenceData);
});
