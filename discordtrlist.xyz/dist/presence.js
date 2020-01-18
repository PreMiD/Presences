var presence = new Presence({
    clientId: "668013997760708618",
    mediaKeys: false
});

presence.on("UpdateData", () => {
    let presenceData = {
        largeImageKey: "logo"
    };

    const browsingStamp = Math.floor(Date.now() / 1000);
    const page = document.location.pathname;

    if (window.location.pathname.endsWith("botlar")) {
        presenceData.details = "Tüm botlara göz atıyor.";
        presenceData.startTimestamp = browsingStamp;
    }
else if (window.location.pathname.endsWith("")) {
        presenceData.details = "Anasayfada Geziniyor.";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (window.location.pathname.endsWith("api")) {
        presenceData.details = "Api dökümasyonlarına bakıyor.";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (window.location.pathname.endsWith("sertifika")) {
        presenceData.details = "Sertifika kurallarına bakıyor.";
        presenceData.startTimestamp = browsingStamp;
    } else if (window.location.pathname.endsWith("kurucu")) {
        presenceData.details = "Kurucu panelde bakıyor.";
        presenceData.startTimestamp = browsingStamp;
    } else if (window.location.pathname.endsWith("yetkili")) {
        presenceData.details = "Yetkili panele bakıyor..";
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
