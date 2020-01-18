var presence = new Presence({
    clientId: "668013997760708618",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
    let presenceData = {
        largeImageKey: "logo",
        startTimestamp: Math.floor(Date.now() / 1000)
};
    if (document.location.hostname == "discordtrlist.xyz") {
        presenceData.details = "Görüntülenen sayfa:";
        presenceData.state = ('Anasayfa')
if (document.location.pathname.includes("/api")) {
          presenceData.details = "Görüntülenen Sayfa:";
          presenceData.state = ('Api sayfası')
}else if (document.location.pathname.includes("/botlar")) {
          presenceData.details = "Görüntülenen Sayfa:";
          presenceData.state = ('Bütün Botlar')

    } else if (document.location.pathname.includes("/profil/")) {
        var priceEls = document.getElementsByClassName("uname");
        for (var i = 0; i < priceEls.length; i++) {
         var profilename = priceEls[i].innerText;
            presenceData.details = "Bir kişinin profiline bakıyor:";
            presenceData.state = profilename
        }
    } else if (document.location.pathname.includes("/botekle")) {
            presenceData.details = "Görüntülenen Sayfa:";    
            presenceData.state = "Bot ekleme sayfası";
    } else if (document.location.pathname.includes("/yetkili")) {
            presenceData.details = "Görüntülenen Sayfa:";    
            presenceData.state = "Yetkili paneli";

    }
     else if (document.location.pathname.includes("/bot/")) {
        var priceEls = document.getElementsByClassName("ubot");
        for (var i = 0; i < priceEls.length; i++) {
         var botname = priceEls[i].innerText;
            presenceData.details = "Bir Bota bakıyor:";
            presenceData.state = botname
        }
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
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
