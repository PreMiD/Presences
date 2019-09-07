var presence = new Presence({
    clientId: "619416396337643531",
    mediaKeys: false
});

var browsingStamp = Math.floor(Date.now()/1000);

presence.on("UpdateData", async () => {

    let data: presenceData = {
        largeImageKey: "kissmanga-logo"
    };

    if(document.location.pathname == ("/")) {
        data.details = "Viewing Homepage",
        data.startTimestamp = browsingStamp
        presence.setActivity(data);
    } else if (document.location.pathname.endsWith("/MangaList")) {
        data.details = "Browsing Manga",
        data.startTimestamp = browsingStamp
        presence.setActivity(data);
    } else if (document.location.pathname.includes("/Manga/")) {
        const mangacheck = document.querySelector("div.barContent .bigChar") ? true : false;
        if (mangacheck) {
            var manga = document.querySelector("div.barContent .bigChar").textContent;
            data.details = "Viewing a Manga",
            data.state = manga;
            data.startTimestamp = browsingStamp
            presence.setActivity(data);
        } else {
            var manga = document.querySelector("#headnav #navsubbar p a").textContent.split('Manga').pop().split('information')[0];
            var chapter = document.querySelector("select.selectChapter option").textContent;
            data.details = "Reading " + manga.trim(),
            data.state = chapter;
            data.startTimestamp = browsingStamp
            presence.setActivity(data);
        }
    };
});