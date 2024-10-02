const presence = new Presence({
		clientId: "1214974615202299994",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/D/diziwatch/assets/logo.png",
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
			if (document.location.pathname.startsWith("/dizi/")) {
				presenceData.details = `${
					document.querySelector("#content > div.incontentx > div.title > h1")
						.textContent
				} inceleniyor`;
			} else {
				presenceData.startTimestamp = null;
				const animeImg = document
						.querySelector("#player .jw-preview")
						.getAttribute("style")
						.split('"')[1],
					playStatus = document
						.querySelector(".jw-icon.jw-icon-display.jw-button-color.jw-reset")
						.getAttribute("aria-label");

				presenceData.details = document.querySelector(
					"#player .jw-title-primary"
				).textContent;
				presenceData.state = `${
					document.querySelector("#player .jw-icon.jw-text-elapsed").textContent
				} / ${
					document.querySelector("#player .jw-icon.jw-text-duration")
						.textContent
				}`;
				if (playStatus === "Oynat") {
					presenceData.smallImageKey = Assets.Play;
					presenceData.smallImageText = "Duraklatıldı";
				}

				if (playStatus === "Duraklat") {
					presenceData.smallImageKey = Assets.Pause;
					presenceData.smallImageText = "Oynatılıyor";
				}

				presenceData.largeImageKey = animeImg;
				presenceData.largeImageText = document.querySelector(
					"#benzerli > div > span"
				).textContent;
			}
	}

	presence.setActivity(presenceData);
});
