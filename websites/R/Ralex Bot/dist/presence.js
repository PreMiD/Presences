const presence = new Presence({
    clientId: "715289275977039987"
});
const browsingStamp = Math.floor(Date.now() / 1000);
console.log();
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "ralexlogo"
    };
    if (document.location.hostname == "bot.ralex.xyz") {
        presenceData.startTimestamp = browsingStamp;
        if (document.location.pathname == "/") {
            presenceData.details = "Ana sayfayı inceliyor.";
        }
        else if (document.location.pathname.includes("/komutlar")) {
            presenceData.details = "Komutlara bakıyor.";
        }
        else if (document.location.pathname.includes("/panel")) {
            presenceData.details = "Panele bakıyor.";
        }
        else if (document.location.pathname == "/yonetim" || document.location.pathname == "/yonetim/") {
            presenceData.details = "Sunucularını inceliyor.";
        }
        else if (document.location.pathname.includes("/yonetim/") && document.location.pathname.includes("ozel-komutlar")) {
            presenceData.details = "Bir sunucusunu yönetiyor.";
            presenceData.state = "Özel komut ayarlarını düzenliyor";
        }
        else if (document.location.pathname.includes("/yonetim/") && document.location.pathname.includes("twitch")) {
            presenceData.details = "Bir sunucusunu yönetiyor.";
            presenceData.state = "Twitch ayarlarını düzenliyor.";
        }
        else if (document.location.pathname.includes("/yonetim/") && document.location.pathname.includes("youtube")) {
            presenceData.details = "Bir sunucusunu yönetiyor.";
            presenceData.state = "Youtube ayarlarını düzenliyor.";
        }
        else if (document.location.pathname.includes("/yonetim/") && document.location.pathname.includes("hosgeldin-gorusuruz")) {
            presenceData.details = "Bir sunucusunu yönetiyor.";
            presenceData.state = "Giriş çıkış ayarlarını düzenliyor.";
        }
        else if (document.location.pathname.includes("/yonetim/") && document.location.pathname.includes("genel")) {
            presenceData.details = "Bir sunucusunu yönetiyor.";
            presenceData.state = "Genel ayarlarını düzenliyor.";
        }
        else if (document.location.pathname.includes("/yonetim/") && document.location.pathname.includes("filtreler")) {
            presenceData.details = "Bir sunucusunu yönetiyor.";
            presenceData.state = "Filtre ayarlarını düzenliyor.";
        }
        else if (document.location.pathname.includes("/yonetim/") && document.location.pathname.includes("yanitlayicilar")) {
            presenceData.details = "Bir sunucusunu yönetiyor.";
            presenceData.state = "Yanıtlayıcı ayarlarını düzenliyor.";
        }
        else if (document.location.pathname.includes("/yonetim/") && document.location.pathname.includes("engelle")) {
            presenceData.details = "Bir sunucusunu yönetiyor.";
            presenceData.state = "Komut ayarlarını düzenliyor";
        }
        else if (document.location.pathname.includes("/yonetim/") && document.location.pathname.includes("basvuru")) {
            presenceData.details = "Bir sunucusunu yönetiyor.";
            presenceData.state = "Başvuru komutunu düzenliyor.";
        }
        else if (document.location.pathname.includes("/yonetim/") && document.location.pathname.includes("logging")) {
            presenceData.details = "Bir sunucusunu yönetiyor.";
            presenceData.state = "Log ayarlarını düzenliyor.";
        }
        else if (document.location.pathname.includes("/yonetim/") && document.location.pathname != "/yonetim" && document.location.pathname != "/yonetim/" && !["ozel-komutlar", "twitch", "youtube", "hosgeldin-gorusuruz", "genel", "filtreler", "yanitlayicilar", "engelle", "basvuru", "logging"].includes(document.location.pathname)) {
            presenceData.details = "Bir sunucusunun ayarlarına bakıyor";
        }
        else if (document.location.pathname.includes("/404")) {
            presenceData.details = "Bilinmeyen bir yerde geziniyor";
        }
        else {
            presenceData.details = "Gezdiğin sayfayı";
            presenceData.state = "Ralex evreninde bulamadım ツ";
        }
    }
    ;
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
    ;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQTtBQUVmLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLFdBQVc7S0FDM0IsQ0FBQztJQUNGLElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksZUFBZSxFQUFFO1FBQ2hELFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBQzVDLElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO1lBQ3BDLFlBQVksQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUM7U0FDakQ7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUMzRCxZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDO1NBQzdDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDeEQsWUFBWSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztTQUMxQzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksVUFBVSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLFdBQVcsRUFBRTtZQUNoRyxZQUFZLENBQUMsT0FBTyxHQUFH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