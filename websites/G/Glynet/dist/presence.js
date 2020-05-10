const presence = new Presence({
    clientId: "655480486046466098"
});
presence.on("UpdateData", () => {
    const page = document.location.pathname;
    const browsingStamp = Math.floor(Date.now() / 1000);
    if (page.startsWith("/home")) {
        presence.setActivity({
            largeImageKey: "gly-logo",
            details: "Ana Sayfa",
            state: "Gönderilere bakıyor...",
            startTimestamp: browsingStamp
        });
    }
    if (page.startsWith("/news") && page.length > "/news".length + 1) {
        const title = document.querySelector("#content > div:nth-child(3) > a.title");
        presence.setActivity({
            largeImageKey: "gly-logo",
            details: "Bir haber okuyor:",
            state: title ? title.textContent : "Bilinmeyen",
            startTimestamp: browsingStamp
        });
    }
    else if (page.startsWith("/news") && page.length <= "/news".length + 1) {
        presence.setActivity({
            largeImageKey: "gly-logo",
            details: "Haberlere göz atıyor...",
            startTimestamp: browsingStamp
        });
    }
    if (page.startsWith("/songs")) {
        presence.setActivity({
            largeImageKey: "gly-logo",
            details: "Şarkılara göz atıyor...",
            startTimestamp: browsingStamp
        });
    }
    else if (page.startsWith("/play")) {
        const artist = document.querySelector("#you_followings > div.contain > div > div > div.titre > h3");
        const song = document.querySelector("#you_followings > div.contain > div > div > div.titre > h1");
        presence.setActivity({
            largeImageKey: "gly-logo",
            state: artist && song
                ? `${artist.textContent} - ${song.textContent}`
                : "Bilinmeyen",
            smallImageKey: "play-bt",
            startTimestamp: browsingStamp
        });
    }
    if (page.startsWith("/explore")) {
        presence.setActivity({
            largeImageKey: "gly-logo",
            details: "Keşfet bölümünde...",
            startTimestamp: browsingStamp
        });
    }
    if (page.startsWith("/notifications")) {
        presence.setActivity({
            largeImageKey: "gly-logo",
            details: "Bildirimlerine göz atıyor...",
            startTimestamp: browsingStamp
        });
    }
    if (page.startsWith("/settings")) {
        if (page == "/settings") {
            presence.setActivity({
                largeImageKey: "gly-logo",
                details: "Profil ayarlarında",
                startTimestamp: browsingStamp
            });
        }
        else if (page == "/settings-bio")
            presence.setActivity({
                largeImageKey: "gly-logo",
                details: "Hesap ayarlarında",
                state: "Bir ayar yapıyor: Biyografi",
                startTimestamp: browsingStamp
            });
        else if (page == "/settings-avatar")
            presence.setActivity({
                largeImageKey: "gly-logo",
                details: "Hesap ayarlarında",
                state: "Bir ayar yapıyor: Profil fotoğrafı",
                startTimestamp: browsingStamp
            });
        else if (page == "/settings-exinfo")
            presence.setActivity({
                largeImageKey: "gly-logo",
                details: "Hesap ayarlarında",
                state: "Bir ayar yapıyor: Ekstra bilgiler",
                startTimestamp: browsingStamp
            });
        else if (page == "/settings-links")
            presence.setActivity({
                largeImageKey: "gly-logo",
                details: "Profil ayarlarında",
                state: "Bir ayar yapıyor: Bağlantılar",
                startTimestamp: browsingStamp
            });
        else if (page == "/settings-view")
            presence.setActivity({
                largeImageKey: "gly-logo",
                details: "Profil ayarlarında",
                state: "Bir ayar yapıyor: Görünüm",
                startTimestamp: browsingStamp
            });
        else if (page == "/settings-mail")
            presence.setActivity({
                largeImageKey: "gly-logo",
                details: "Profil ayarlarında",
                state: "Bir ayar yapıyor: Mail",
                startTimestamp: browsingStamp
            });
        else if (page == "/settings-password")
            presence.setActivity({
                largeImageKey: "gly-logo",
                details: "Profil ayarlarında",
                state: "Bir ayar yapıyor: Parola",
                startTimestamp: browsingStamp
            });
        else if (page == "/settings-privacy")
            presence.setActivity({
                largeImageKey: "gly-logo",
                details: "Profil ayarlarında",
                state: "Bir ayar yapıyor: Gizlilik",
                startTimestamp: browsingStamp
            });
        else if (page == "/settings-language")
            presence.setActivity({
                largeImageKey: "gly-logo",
                details: "Profil ayarlarında",
                state: "Bir ayar yapıyor: Dil",
                startTimestamp: browsingStamp
            });
    }
    if (page.startsWith("/@")) {
        let profile = document.querySelector("#profil_top > div > div:nth-child(2) > a:nth-child(1) > b");
        if (!profile)
            profile = document.querySelector("#profil_top > div > div:nth-child(2) > a:nth-child(3) > b");
        presence.setActivity({
            largeImageKey: "gly-logo",
            details: "Bir profile göz atıyor:",
            state: profile ? profile.textContent : "Bilinmeyen",
            smallImageText: profile ? page.substring(0) : "Bilinmeyen",
            startTimestamp: browsingStamp
        });
    }
    if (page.startsWith("/postdetails")) {
        const profile = document.querySelector("#post_owner_info > div > a:nth-child(3)");
        presence.setActivity({
            largeImageKey: "gly-logo",
            details: "Bir gönderiye göz atıyor,",
            state: profile ? "Gönderen: @" + profile.textContent : "Bilinmeyen",
            startTimestamp: browsingStamp
        });
    }
    if (page.startsWith("/404")) {
        presence.setActivity({
            largeImageKey: "gly-logo",
            details: "Server Error: 404",
            state: "Sayfa bulunamadı.",
            startTimestamp: browsingStamp
        });
    }
    if (page.startsWith("/403")) {
        presence.setActivity({
            largeImageKey: "gly-logo",
            details: "Server Error: 403",
            state: "Yasaklı bölge!",
            startTimestamp: browsingStamp
        });
    }
    if (page.startsWith("/503") || page.startsWith("/500")) {
        presence.setActivity({
            largeImageKey: "gly-logo",
            details: "Server Error: " + page.substring(1),
            state: "Sunucuya şu anda ulaşılamıyor.",
            startTimestamp: browsingStamp
        });
    }
    if (page.startsWith("/400")) {
        presence.setActivity({
            largeImageKey: "gly-logo",
            details: "Server Error: 400",
            state: "Geçersiz istek.",
            startTimestamp: browsingStamp
        });
    }
    if (page.startsWith("/login")) {
        presence.setActivity({
            largeImageKey: "gly-logo",
            details: "Giriş yapıyor...",
            startTimestamp: browsingStamp
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUN4QyxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUVwRCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDNUIsUUFBUSxDQUFDLFdBQVcsQ0FBQztZQUNuQixhQUFhLEVBQUUsVUFBVTtZQUN6QixPQUFPLEVBQUUsV0FBVztZQUNwQixLQUFLLEVBQUUsd0JBQXdCO1lBQy9CLGNBQWMsRUFBRSxhQUFhO1NBQzlCLENBQUMsQ0FBQztLQUNKO0lBR0QsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDaEUsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDbEMsdUNBQXVDLENBQ3hDLENBQUM7UUFFRixRQUFRLENBQUMsV0FBVyxDQUFDO1lBQ25CLGFBQWEsRUFBRSxVQUFVO1lBQ3pCLE9BQU8sRUFBRSxtQkFBbUI7WUFDNUIsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsWUFBWTtZQUMvQyxjQUFjLEVBQUUsYUFBYTtTQUM5QixDQUFDLENBQUM7S0FDSjtTQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxP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