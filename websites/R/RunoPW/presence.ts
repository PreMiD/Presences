const presence = new Presence({
		clientId: "702935358395908168",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/0ZL1dXI.png",
		startTimestamp: browsingTimestamp,
	};
	if (document.location.hostname === "runo.pw") {
		if (document.location.pathname.startsWith("/index")) {
			presenceData.details = "Şuanda İndex Sayfasında,";
			presenceData.state = "Hesabına Giriş Yapıyor...";
		} else if (document.location.pathname.startsWith("/me")) {
			presenceData.details = "Şuanda Kendi Sayfasında,";
			presenceData.state = "Hotele Giriş Yapmaya Hazırlanıyor...";
		} else if (document.location.pathname.startsWith("/client")) {
			presenceData.details = "Hotele Giriş Yaptı,";
			presenceData.state = "Şuanda Oyunda...";
		} else if (document.location.pathname.startsWith("/register")) {
			presenceData.details = "Şuanda Kayıt Sayfasında,";
			presenceData.state = "Hotele Kayıt Oluyor...";
		} else if (document.location.pathname.startsWith("/forgot")) {
			presenceData.details = "Şuanda Şifremi Unuttum Sayfasında";
			presenceData.state = "Galiba Şifresini Unutmuş...";
		} else if (document.location.pathname.startsWith("/settings/1")) {
			presenceData.details = "Şuanda Genel Ayarlar Sayfasında,";
			presenceData.state = "Genel Ayarları Değiştiriyor";
		} else if (document.location.pathname.startsWith("/settings")) {
			presenceData.details = "Şuanda Genel Ayarlar Sayfasında,";
			presenceData.state = "Genel Ayarları Değiştiriyor...";
		} else if (document.location.pathname.startsWith("/settings/2")) {
			presenceData.details = "Şuanda E-Posta Değiştirme Sayfasında,";
			presenceData.state = "E-Postasını Değiştiriyor...";
		} else if (document.location.pathname.startsWith("/settings/3")) {
			presenceData.details = "Şuanda Şifre Değiştirme Sayfasında,";
			presenceData.state = "Şifresini Değiştiriyor...";
		} else if (document.location.pathname.startsWith("/community")) {
			presenceData.details = "Şuanda Topluluk Sayfasında,";
			presenceData.state = "Birşeylere Göz Atıyor...";
		} else if (document.location.pathname.startsWith("/staffs")) {
			presenceData.details = "Şuanda Personeller Sayfasında,";
			presenceData.state = "Personellere Bakıyor...";
		} else if (document.location.pathname.includes("/article/")) {
			presenceData.details = document.title;
			presenceData.state = "Adlı Habere Bakıyor...";
		} else if (document.location.pathname.includes("/home/")) {
			presenceData.details = `Şuanda ${
				document.location.pathname.split("/")[2]
			} Adlı`;
			presenceData.state = "Kişinin Profiline Bakıyor...";
		} else if (document.location.pathname.startsWith("/xler")) {
			presenceData.details = "Şuanda BüyükElçiler Sayfasında,";
			presenceData.state = "BüyükElçilere Bakıyor...";
		} else if (document.location.pathname.startsWith("/TopUsers")) {
			presenceData.details = "Şuanda Liderler Sayfasında,";
			presenceData.state = "Liderlere Bakıyor...";
		} else if (document.location.pathname.startsWith("/youtuber")) {
			presenceData.details = "Şuanda YouTuberler Sayfasında,";
			presenceData.state = "YouTuberlara Bakıyor...";
		} else if (document.location.pathname.startsWith("/fansite")) {
			presenceData.details = "Şuanda Fansite Sayfasında,";
			presenceData.state = "Fansitelere Bakıyor...";
		} else if (document.location.pathname.startsWith("/shop")) {
			presenceData.details = "Şuanda Market Sayfasında,";
			presenceData.state = "Rozetlere Bakıyor...";
		} else if (document.location.pathname.startsWith("/vip")) {
			presenceData.details = "Şuanda Vip Sayfasında,";
			presenceData.state = "Viplere Bakıyor...";
		} else if (document.location.pathname.startsWith("/credits")) {
			presenceData.details = "Şuanda Kredi Sayfasında,";
			presenceData.state = "Kredi Hakkında Bilgiye Bakıyor...";
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
