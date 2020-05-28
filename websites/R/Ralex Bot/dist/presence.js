const presence = new Presence({
    clientId: "715289275977039987"
});
const browsingStamp = Math.floor(Date.now() / 1000);
console.log();
presence.on("UpdateData", async () => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQTtBQUVmLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsV0FBVztLQUMzQixDQUFDO0lBQ0YsSUFBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxlQUFlLEVBQUU7UUFDaEQsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFDNUMsSUFBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUU7WUFDcEMsWUFBWSxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQztTQUNqRDthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQzNELFlBQVksQ0FBQyxPQUFPLEdBQUcsb0JBQW9CLENBQUM7U0FDN0M7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN4RCxZQUFZLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDO1NBQzFDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxVQUFVLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksV0FBVyxFQUFFO1lBQ2hHLFlBQVksQ0FBQyxPQUFP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