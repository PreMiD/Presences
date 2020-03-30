var presence = new Presence({
    clientId: "652193616617537577",
    
});

presence.on("UpdateData", () => {
    let presenceData = {
        largeImageKey: "logo"
    };

    const browsingStamp = Math.floor(Date.now() / 1000);
    const page = document.location.pathname;

    if (window.location.pathname.endsWith("blog")) {
        presenceData.details = "Tüm bloglara göz atıyor...";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (window.location.pathname.endsWith("faq")) {
        presenceData.details = "Tüm sıkça sorulan sorulara göz atıyor...";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (window.location.pathname.endsWith("commands")) {
        presenceData.details = "Tüm komutlara göz atıyor...";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (window.location.pathname.endsWith("menu")) {
        presenceData.details = "Kahve menüsüne göz atıyor...";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (window.location.pathname.endsWith("dashboard")) {
        presenceData.details = "Sunucularına göz atıyor...";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (window.location.pathname.startsWith("/dashboard/")) {
        presenceData.details = "Bir sunucuyu dashboard üzerinden kontrol ediyor:";
        presenceData.state = document.querySelector('html body.scrollbar.scrollbar-night-fade div.navbar-expand-lg.navbar-dark div.container-fluid ul.navbar-nav.text-white li.nav-item.avatar.dropdown > a ').textContent
        presenceData.startTimestamp = browsingStamp;
    }
    else if (window.location.pathname.endsWith("discord-bot-ekleme")) {
        presenceData.details = "Discord Bot Ekleme bloguna göz atıyor...";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (window.location.pathname.endsWith("kahve-bot-projesi-nasil-basladi")) {
        presenceData.details = "Kahve bot projesi nasıl başladı bloguna göz atıyor...";
        presenceData.startTimestamp = browsingStamp;
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
