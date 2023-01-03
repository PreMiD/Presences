const presence = new Presence({
	clientId: "778362242710110208",
});

presence.on("UpdateData", async () => {
	const path: string = document.location.pathname,
		ayrac: string[] = path.split("/"),
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/CBsEtCf.png",
		};
	// Hizmetlerimiz
	if (path.startsWith("/Hizmetlerimiz")) {
		presenceData.details = "Ürün ve Hizmetler:";
		switch (ayrac[2]) {
			case "SuratGlobal": {
				presenceData.state = "Sürat Global";
				presenceData.startTimestamp = Date.now();

				break;
			}
			case "SuratGonderAl": {
				presenceData.state = "Sürat Gönder-Al";
				presenceData.startTimestamp = Date.now();

				break;
			}
			case "SuratTahsilatli": {
				presenceData.state = "Sürat Tahsilatlı";
				presenceData.startTimestamp = Date.now();

				break;
			}
			case "SuratKrediliKargo": {
				presenceData.state = "Sürat Kredili Kargo";
				presenceData.startTimestamp = Date.now();

				break;
			}
			case "SuratBilgilendirme": {
				presenceData.state = "Sürat Bilgilendirme";
				presenceData.startTimestamp = Date.now();

				break;
			}
			case "SuratAmbalaj": {
				presenceData.state = "Sürat Ambalaj";
				presenceData.startTimestamp = Date.now();

				break;
			}
			// No default
		}
		// Bilgi Hizmetleri
	} else if (path.startsWith("/BilgiHizmetleri")) {
		presenceData.details = "Bilgi Hizmetleri:";
		switch (ayrac[2]) {
			case "EFaturaSorgulama": {
				presenceData.state = "E-Fatura Sorgulama";
				presenceData.startTimestamp = Date.now();

				break;
			}
			case "BilgiGuvenligi": {
				presenceData.state = "Bilgi Güvenliği";
				presenceData.startTimestamp = Date.now();

				break;
			}
			case "BilgiToplumuHizmetleri": {
				presenceData.state = "Fiyatlandirma";
				presenceData.startTimestamp = Date.now();

				break;
			}
			// No default
		}
		// Kampanyalar
	} else if (path.startsWith("/Kampanyalar")) {
		presenceData.details = "Kampanyalar";
		presenceData.startTimestamp = Date.now();
	} else if (path.startsWith("/BizeUlasin")) {
		presenceData.details = "Bize Ulaşın:";
		presenceData.state = ayrac[2];
		presenceData.startTimestamp = Date.now();
	} else if (path.startsWith("/Basvurular")) {
		presenceData.details = "Başvuru yapıyor:";
		presenceData.state = ayrac[2];
		presenceData.startTimestamp = Date.now();
	} else if (path.startsWith("/BasinKiti")) {
		presenceData.details = "Basın Kiti";
		presenceData.startTimestamp = Date.now();
	} else if (path.startsWith("/Haberler")) {
		presenceData.details = "Haber";
		presenceData.startTimestamp = Date.now();
	} else if (path.startsWith("/Hakkimizda")) {
		presenceData.details = "Hakkımızda";
		presenceData.startTimestamp = Date.now();
	} else if (path.startsWith("/Felsefemiz")) {
		presenceData.details = "Misyonumuz & Vizyonumuz ";
		presenceData.startTimestamp = Date.now();
	} else if (path.startsWith("/InsanKaynaklariPolitikamiz")) {
		presenceData.details = "İnsan Kaynakları Politikamız";
		presenceData.startTimestamp = Date.now();
	} else if (path.startsWith("/SosyalSorumlulukCalismalarimiz")) {
		presenceData.details = "Sosyal Sorumluluk Çalışmalarımız";
		presenceData.startTimestamp = Date.now();
	} else if (path === "/") {
		presenceData.details = "Ana Sayfa";
		presenceData.startTimestamp = Date.now();
	}
	presence.setActivity(presenceData);
});
