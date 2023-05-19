const presence = new Presence({
	clientId: "1075115687888044072",
});

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/NPVqgsx.png",
		},
		{ pathname } = document.location,
		pathnameLowerCase = pathname.toLowerCase();
	switch (pathnameLowerCase) {
	case "/": {
		presenceData.details = "Bir sayfa görüntülüyor:";
		presenceData.state = "Anasayfa";
	
	break;
	}
	case "/team": {
		presenceData.details = "Bir sayfa görüntülüyor:";
		presenceData.state = "Ekibimiz";
	
	break;
	}
	case "/servers": {
		presenceData.details = "Bir sayfa görüntülüyor:";
		presenceData.state = "Sunucu Sıralaması";
	
	break;
	}
	case "/profile-options": {
		presenceData.details = "Bir sayfa görüntülüyor:";
		presenceData.state = "Profil Ayarları";
	
	break;
	}
	case "/terms-of-service": {
		presenceData.details = "Bir sayfa görüntülüyor:";
		presenceData.state = "Kullanım Şartları";
	
	break;
	}
	case "/privacy-policy": {
		presenceData.details = "Bir sayfa görüntülüyor:";
		presenceData.state = "Gizlilik Politikası";
	
	break;
	}
	case "/profile-settings": {
		presenceData.details = "Bir ayar görüntülüyor:";
		presenceData.state = "Bağlantılar";
	
	break;
	}
	case "/help": {
		presenceData.details = "Bir sayfa görüntülüyor:";
		presenceData.state = "Yardım Sayfası";
	
	break;
	}
	default: if (pathnameLowerCase.includes("/profile")) {
		presenceData.details = "Bir kullanıcı profili görüntülüyor:";
		presenceData.state = `${
			document.querySelector(
				"body > div.main-wrapper > div.main-content > div > div > div > div.col-lg-12 > div > div.card-body.d-block.pt-4.text-center.position-relative > h4"
			).textContent
		}`;
	} else if (pathnameLowerCase.includes("/server-details")) {
		presenceData.details = "Bir sunucu görüntülüyor:";
		presenceData.state = `${
			document.querySelector(
				"body > div.main-wrapper > div.main-content > div > div > div > div.col-lg-12 > div > div.card-body.p-0.position-relative > h4"
			).textContent
		}`;
	}
	}

	presence.setActivity(presenceData);
});
