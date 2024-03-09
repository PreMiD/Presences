const presence = new Presence({
		clientId: "1214974615202299994",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://i.imgur.com/RMrW6j3.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
	};
	presenceData.startTimestamp = browsingTimestamp;
	switch (document.location.pathname) {
		case "/": {
			presenceData.details = "Ana sayfa görüntüleniyor";

			break;
		}
		case "/calendar/": {
			presenceData.details = "Takvim sayfası görüntüleniyor";

			break;
		}
		case "/anime-arsivi/": {
			presenceData.details = "Anime arşivi görüntüleniyor";

			break;
		}
		case "/dizi-arsivi/": {
			presenceData.details = "Dizi arşivi görüntüleniyor";

			break;
		}
		case "/episodes/": {
			presenceData.details = "Bölümler inceleniyor";

			break;
		}
		case "/contact-us/": {
			presenceData.details = "İletişim bilgileri inceleniyor 💀";

			break;
		}
		default:
			if (document.location.href.startsWith("https://diziwatch.net/dizi/")) {
				presenceData.details = `${
					document.querySelector("#content div.incontentx div.title h1")
						.textContent
				} inceleniyor`;
			} else {
				presenceData.startTimestamp = null;
				const video = document.querySelector("video"),
					animeImg = document
						.querySelector("#player .jw-preview")
						.getAttribute("style")
						.split('"')[1],
					playStatus = document
						.querySelector(".jw-icon.jw-icon-display.jw-button-color.jw-reset")
						.getAttribute("aria-label"),
					duration = new Date(video.duration * 1000)
						.toISOString()
						.substr(14, 5),
					currentTime = new Date(video.currentTime * 1000)
						.toISOString()
						.substr(14, 5);

				presenceData.details = document.querySelector(
					"#player .jw-title-primary"
				).textContent;

				if (playStatus === "Oynat")
					presenceData.state = `Duraklatıldı, ${currentTime} / ${duration}`;

				if (playStatus === "Duraklat")
					presenceData.state = `İzleniyor, ${currentTime} / ${duration}`;

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
