const presence = new Presence({
	clientId: "1075115687888044072",
});

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/NPVqgsx.png",
	};
	const { pathname } = document.location;
	if (pathname.toLowerCase() === "/") {
		presenceData.details = "Bir sayfa görüntülüyor:";
		presenceData.state = "Anasayfa";
	} else if (pathname.toLowerCase() === "/team") {
		presenceData.details = "Bir sayfa görüntülüyor:";
		presenceData.state = "Ekibimiz";
	} else if (pathname.toLowerCase() === "/servers") {
		presenceData.details = "Bir sayfa görüntülüyor:";
		presenceData.state = "Sunucu Sıralaması";
	} else if (pathname.toLowerCase() === "/profile-options") {
		presenceData.details = "Bir sayfa görüntülüyor:";
		presenceData.state = "Profil Ayarları";
	} else if (pathname.toLowerCase() === "/terms-of-service") {
		presenceData.details = "Bir sayfa görüntülüyor:";
		presenceData.state = "Kullanım Şartları";
	} else if (pathname.toLowerCase() === "/privacy-policy") {
		presenceData.details = "Bir sayfa görüntülüyor:";
		presenceData.state = "Gizlilik Politikası";
	} else if (pathname.toLowerCase() === "/profile-settings") {
		presenceData.details = "Bir ayar görüntülüyor:";
		presenceData.state = "Bağlantılar";
	} else if (document.location.pathname.toLowerCase() === "/help") {
		presenceData.details = "Bir sayfa görüntülüyor:";
		presenceData.state = "Yardım Sayfası";
	} else if (document.location.pathname.toLowerCase().includes("/profile")) {
		presenceData.details = "Bir kullanıcı profili görüntülüyor:";
		presenceData.state = `${
			document.querySelector(
				"body > div.main-wrapper > div.main-content > div > div > div > div.col-lg-12 > div > div.card-body.d-block.pt-4.text-center.position-relative > h4"
			).textContent
		}`;
	} else if (
		document.location.pathname.toLowerCase().includes("/server-details")
	) {
		presenceData.details = "Bir sunucu görüntülüyor:";
		presenceData.state = `${
			document.querySelector(
				"body > div.main-wrapper > div.main-content > div > div > div > div.col-lg-12 > div > div.card-body.p-0.position-relative > h4"
			).textContent
		}`;
	}

	presence.setActivity(presenceData);
});
