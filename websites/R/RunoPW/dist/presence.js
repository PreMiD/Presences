const presence = new Presence({
    clientId: "702935358395908168"
});
const browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "runo3",
        startTimestamp: browsingStamp
    };
    if (document.location.hostname == "runo.pw") {
        if (document.location.pathname.startsWith("/index")) {
            presenceData.details = "Şuanda İndex Sayfasında,";
            presenceData.state = "Hesabına Giriş Yapıyor...";
        }
        else if (document.location.pathname.startsWith("/me")) {
            presenceData.details = "Şuanda Kendi Sayfasında,";
            presenceData.state = "Hotele Giriş Yapmaya Hazırlanıyor...";
        }
        else if (document.location.pathname.startsWith("/client")) {
            presenceData.details = "Hotele Giriş Yaptı,";
            presenceData.state = "Şuanda Oyunda...";
        }
        else if (document.location.pathname.startsWith("/register")) {
            presenceData.details = "Şuanda Kayıt Sayfasında,";
            presenceData.state = "Hotele Kayıt Oluyor...";
        }
        else if (document.location.pathname.startsWith("/forgot")) {
            presenceData.details = "Şuanda Şifremi Unuttum Sayfasında";
            presenceData.state = "Galiba Şifresini Unutmuş...";
        }
        else if (document.location.pathname.startsWith("/settings/1")) {
            presenceData.details = "Şuanda Genel Ayarlar Sayfasında,";
            presenceData.state = "Genel Ayarları Değiştiriyor";
        }
        else if (document.location.pathname.startsWith("/settings")) {
            presenceData.details = "Şuanda Genel Ayarlar Sayfasında,";
            presenceData.state = "Genel Ayarları Değiştiriyor...";
        }
        else if (document.location.pathname.startsWith("/settings/2")) {
            presenceData.details = "Şuanda E-Posta Değiştirme Sayfasında,";
            presenceData.state = "E-Postasını Değiştiriyor...";
        }
        else if (document.location.pathname.startsWith("/settings/3")) {
            presenceData.details = "Şuanda Şifre Değiştirme Sayfasında,";
            presenceData.state = "Şifresini Değiştiriyor...";
        }
        else if (document.location.pathname.startsWith("/community")) {
            presenceData.details = "Şuanda Topluluk Sayfasında,";
            presenceData.state = "Birşeylere Göz Atıyor...";
        }
        else if (document.location.pathname.startsWith("/staffs")) {
            presenceData.details = "Şuanda Personeller Sayfasında,";
            presenceData.state = "Personellere Bakıyor...";
        }
        else if (document.location.pathname.includes("/article/")) {
            presenceData.details = document.title;
            presenceData.state = "Adlı Habere Bakıyor...";
        }
        else if (document.location.pathname.includes("/home/")) {
            presenceData.details =
                "Şuanda " + document.location.pathname.split("/")[2] + " Adlı";
            presenceData.state = "Kişinin Profiline Bakıyor...";
        }
        else if (document.location.pathname.startsWith("/xler")) {
            presenceData.details = "Şuanda BüyükElçiler Sayfasında,";
            presenceData.state = "BüyükElçilere Bakıyor...";
        }
        else if (document.location.pathname.startsWith("/TopUsers")) {
            presenceData.details = "Şuanda Liderler Sayfasında,";
            presenceData.state = "Liderlere Bakıyor...";
        }
        else if (document.location.pathname.startsWith("/youtuber")) {
            presenceData.details = "Şuanda YouTuberler Sayfasında,";
            presenceData.state = "YouTuberlara Bakıyor...";
        }
        else if (document.location.pathname.startsWith("/fansite")) {
            presenceData.details = "Şuanda Fansite Sayfasında,";
            presenceData.state = "Fansitelere Bakıyor...";
        }
        else if (document.location.pathname.startsWith("/shop")) {
            presenceData.details = "Şuanda Market Sayfasında,";
            presenceData.state = "Rozetlere Bakıyor...";
        }
        else if (document.location.pathname.startsWith("/vip")) {
            presenceData.details = "Şuanda Vip Sayfasında,";
            presenceData.state = "Viplere Bakıyor...";
        }
        else if (document.location.pathname.startsWith("/credits")) {
            presenceData.details = "Şuanda Kredi Sayfasında,";
            presenceData.state = "Kredi Hakkında Bilgiye Bakıyor...";
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRXBELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLE9BQU87UUFDdEIsY0FBYyxFQUFFLGFBQWE7S0FDOUIsQ0FBQztJQUNGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksU0FBUyxFQUFFO1FBQzNDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ25ELFlBQVksQ0FBQyxPQUFPLEdBQUcsMEJBQTBCLENBQUM7WUFDbEQsWUFBWSxDQUFDLEtBQUssR0FBRywyQkFBMkIsQ0FBQztTQUNsRDthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3ZELFlBQVksQ0FBQyxPQUFPLEdBQUcsMEJBQTBCLENBQUM7WUFDbEQsWUFBWSxDQUFDLEtBQUssR0FBRyxzQ0FBc0MsQ0FBQztTQUM3RDthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQzNELFlBQVksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUM7WUFDN0MsWUFBWSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQztTQUN6QzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxR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