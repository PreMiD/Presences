const presence = new Presence({
		clientId: "1214974615202299994",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://i.imgur.com/45R11f9.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		startTimestamp: browsingTimestamp,
	};
	switch (document.URL) {
		case "https://diziwatch.net/": {
			presenceData.details = "Ana sayfa görüntüleniyor";

			break;
		}
		case "https://diziwatch.net/calendar/": {
			presenceData.details = "Takvim sayfası görüntüleniyor";

			break;
		}
		case "https://diziwatch.net/anime-arsivi/": {
			presenceData.details = "Anime arşivi görüntüleniyor";

			break;
		}
		default:
			if (document.URL.startsWith("https://diziwatch.net/dizi/")) {
				presenceData.details = `${
					document.querySelector("#content > div.incontentx > div.title > h1")
						.textContent
				} inceleniyor`;
				presenceData.startTimestamp = browsingTimestamp;
			} else {
				const video = document.querySelector('video'),
					videoTitle = document.querySelector(
						"#player > div.jw-wrapper.jw-reset > div.jw-title.jw-reset-text > div.jw-title-primary.jw-reset-text"
					).textContent,
					animeImg = document
						.querySelector(
							"#player > div.jw-wrapper.jw-reset > div.jw-preview.jw-reset"
						)
						.getAttribute("style")
						.split('"')[1],
					playStatus = document
						.querySelector(
							"#player > div.jw-wrapper.jw-reset > div.jw-controls.jw-reset > div.jw-display.jw-reset > div > div > div.jw-display-icon-container.jw-display-icon-display.jw-reset > div"
						)
						.getAttribute("aria-label");

				presenceData.details = videoTitle;

				if (playStatus) [, presenceData.endTimestamp] = presence.getTimestampsfromMedia(video)
				presenceData.smallImageKey = playStatus ? Assets.Paused : Assets.Play
				

				presenceData.largeImageKey = animeImg;
				presenceData.largeImageText = document.querySelector(
					"#benzerli > div > span"
				).textContent;

				presenceData.smallImageKey = Assets.Logo;
				presenceData.smallImageText = "Diziwatch";
			}
	}

	presence.setActivity(presenceData);
});
