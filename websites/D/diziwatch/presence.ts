const presence = new Presence({
		clientId: "1214974615202299994",
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://i.imgur.com/45R11f9.png",
}

presence.on("UpdateData", async () => {


	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
	};
	console.log(document.URL);
	if (document.URL === "https://diziwatch.net/") {

    	presenceData.details = "Ana sayfa görüntüleniyor";
		presenceData.startTimestamp = browsingTimestamp;
	}

	else if (document.URL === "https://diziwatch.net/calendar/") {
    	presenceData.details = "Takvim sayfası görüntüleniyor";
		presenceData.startTimestamp = browsingTimestamp;
	}

	else if (document.URL === "https://diziwatch.net/anime-arsivi/") {
    	presenceData.details = "Anime arşivi görüntüleniyor";
		presenceData.startTimestamp = browsingTimestamp;
	}

	else if (document.URL.startsWith("https://diziwatch.net/dizi/")) {
    	presenceData.details = document.querySelector("#content > div.incontentx > div.title > h1").textContent + " inceleniyor";
		presenceData.startTimestamp = browsingTimestamp;
	}

	else {



		const currentTime = document.querySelector("#player > div.jw-wrapper.jw-reset > div.jw-controls.jw-reset > div.jw-controlbar.jw-reset > div.jw-reset.jw-button-container > div.jw-icon.jw-icon-inline.jw-text.jw-reset.jw-text-elapsed").textContent;
  		const duration = document.querySelector("#player > div.jw-wrapper.jw-reset > div.jw-controls.jw-reset > div.jw-controlbar.jw-reset > div.jw-reset.jw-button-container > div.jw-icon.jw-icon-inline.jw-text.jw-reset.jw-text-duration").textContent;
		const videoTitle = document.querySelector("#player > div.jw-wrapper.jw-reset > div.jw-title.jw-reset-text > div.jw-title-primary.jw-reset-text").textContent;
		const animeName = document.querySelector("#benzerli > div > span").textContent;
		const animeImg = document.querySelector("#player > div.jw-wrapper.jw-reset > div.jw-preview.jw-reset").getAttribute("style").split('"')[1];

		const playStatus = document.querySelector("#player > div.jw-wrapper.jw-reset > div.jw-controls.jw-reset > div.jw-display.jw-reset > div > div > div.jw-display-icon-container.jw-display-icon-display.jw-reset > div").getAttribute("aria-label");




		presenceData.details = videoTitle;

		if (playStatus === "Oynat") {
    	presenceData.state = "Duraklatıldı, "+currentTime+" / "+duration;
		}
		if (playStatus === "Duraklat") {
    	presenceData.state = "İzleniyor, "+currentTime+" / "+duration;
		}


		presenceData.largeImageKey = animeImg;
		presenceData.largeImageText = animeName;


		presenceData.smallImageKey = Assets.Logo;
		presenceData.smallImageText = "Diziwatch";
	}




	presence.setActivity(presenceData);
});
