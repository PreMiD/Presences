const presence = new Presence({
	clientId: "1075115687888044072",
});

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/NPVqgsx.png",
	};

	const { pathname } = document.location;
	if (pathnameLowercase  === "/") {
		presenceData.details = "Bir sayfa görüntülüyor:";
		presenceData.state = "Anasayfa";
	} else if (pathname.toLowerCase() === "/team") {
		presenceData.details = "Bir sayfa görüntülüyor:";
		presenceData.state = "Ekibimiz";
	} else if (pathnameLowerCase === "/servers") {
		presenceData.details = "Bir sayfa görüntülüyor:";
		presenceData.state = "Sunucu Sıralaması";
	} else if (pathnameLowerCase === "/profile-options") {
		presenceData.details = "Bir sayfa görüntülüyor:";
		presenceData.state = "Profil Ayarları";
	} else if (pathnameLowerCase === "/terms-of-service") {
		presenceData.details = "Bir sayfa görüntülüyor:";
		presenceData.state = "Kullanım Şartları";
	} else if (pathnameLowerCase === "/privacy-policy") {
		presenceData.details = "Bir sayfa görüntülüyor:";
		presenceData.state = "Gizlilik Politikası";
	} else if (pathnameLowerCase === "/profile-settings") {
		presenceData.details = "Bir ayar görüntülüyor:";
		presenceData.state = "Bağlantılar";
	} else if (pathnameLowerCase === "/help") {
		presenceData.details = "Bir sayfa görüntülüyor:"; 
		presenceData.state = "Yardım Sayfası";
	} else if (pathnameLowerCase.includes("/profile")) {
		presenceData.details = "Bir kullanıcı profili görüntülüyor:";
		presenceData.state = `${
			document.querySelector(
				"body > div.main-wrapper > div.main-content > div > div > div > div.col-lg-12 > div > div.card-body.d-block.pt-4.text-center.position-relative > h4"
			).textContent
		}`;
	} else if (
		pathnameLowerCase.includes("/server-details")
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
