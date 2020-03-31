let presence = new Presence({
    clientId: "687352219598585905"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
let browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "animeradio"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.host == "www.animeradio.de") {
        if (document.location.pathname.includes("/webplayer/")) {
            presenceData.details = "Hört AnimeRadio";
            presenceData.smallImageKey = "play";
        }
        else if (document.URL.includes("top100")) {
            presenceData.details = "Betrachtet Top100";
        }
        else if (document.URL.includes("events")) {
            presenceData.details = "Betrachtet Events";
        }
        else if (document.URL.includes("programm")) {
            presenceData.details = "Betrachtet Programm";
        }
    }
    else if (document.location.host == "www.animetreff.de") {
        presenceData.largeImageKey = "animetreff";
        if (document.URL.includes("/CustomPage/?id=1")) {
            presenceData.details = "Chattet";
            presenceData.smallImageKey = "writing";
        }
        else if (document.location.pathname.includes("/gallery/")) {
            if (document.location.pathname.includes("/Image/")) {
                presenceData.details = "Betrachtet Bild";
                presenceData.state = document.querySelector("#content > header > h1").textContent;
            }
            else if (document.location.pathname.includes("/Album/")) {
                presenceData.details = "Betrachtet Album";
                presenceData.state = document
                    .querySelector("#content > header > h1")
                    .textContent.replace(document.querySelector("#content > header > h1 > span").textContent, "");
            }
            else if (document.location.pathname.includes("/AlbumList/")) {
                presenceData.details = "Betrachtet Galerie";
            }
        }
        else if (document.location.pathname.includes("/calendar/")) {
            presenceData.details = "Betrachtet Kalender";
            presenceData.state = document.querySelector("#content > header > h1").textContent;
        }
        else if (document.location.pathname.includes("/MemberList/")) {
            presenceData.details = "Betrachtet Mitglieder";
        }
        else if (document.location.pathname.includes("/User/")) {
            presenceData.details = "Betrachtet Nutzer";
        }
        else if (document.location.pathname.includes("/Thread/")) {
            presenceData.details = "Liest Beiträge:";
            presenceData.state = document.querySelector("#content > header > h1 > a").textContent;
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/Board/")) {
            presenceData.details =
                "Betrachtet " +
                    document.querySelector("#content > header > h1 > a").textContent;
        }
        else if (document.location.pathname.includes("/Search/")) {
            if (document.querySelector("#errorMessage") !== null) {
                presenceData.details =
                    "Sucht nach " +
                        document
                            .querySelector("#errorMessage")
                            .textContent.split("„")[1]
                            .split("“")[0];
            }
            else {
                presenceData.details =
                    "Sucht nach " +
                        document.querySelector("#content > header > p > strong").textContent;
            }
        }
        else {
            presenceData.details = "Stöbert in den Foren";
        }
    }
    else if (document.location.host == "www.animenews.de") {
        presenceData.largeImageKey = "animenews";
        presenceData.details = "Liest Neuigkeiten";
        presenceData.smallImageKey = "reading";
    }
    else if (document.location.host == "www.animekino.de") {
        presenceData.largeImageKey = "animekino";
        if (document.URL.includes("partner")) {
            presenceData.details = "Betrachtet Partner";
        }
        else if (document.URL.includes("kontakt")) {
            presenceData.details = "Betrachtet Kontakt";
        }
        else if (document.URL.includes("ort")) {
            presenceData.details = "Betrachtet Ort";
        }
        else if (document.URL.includes("filme")) {
            presenceData.details = "Betrachtet Filmvorstellungen";
        }
        else {
            presenceData.details = "Betrachtet Kino";
        }
    }
    else if (document.location.host == "www.animehamburg.de") {
        if (document.URL.includes("partner")) {
            presenceData.details = "Betrachtet Partner";
        }
        else if (document.URL.includes("kontakt")) {
            presenceData.details = "Betrachtet Kontakt";
        }
        else if (document.URL.includes("ort")) {
            presenceData.details = "Betrachtet Ort";
        }
        else if (document.URL.includes("programm")) {
            presenceData.details = "Betrachtet Programm";
        }
        else {
            presenceData.details = "Betrachtet Hanmaco";
        }
    }
    else if (document.location.host == "www.animekultur.de") {
        if (document.URL.includes("joinus")) {
            presenceData.details = "Will ein Mitglied werden";
            presenceData.smallImageKey = "writing";
        }
        else if (document.URL.includes("projekte")) {
            presenceData.details = "Betrachtet Projekte";
        }
        else if (document.URL.includes("pressemitteilungen")) {
            presenceData.details = "Betrachtet Pressemitteilungen";
        }
        else if (document.URL.includes("marketing")) {
            presenceData.details = "Betrachtet Marketing";
        }
        else if (document.URL.includes("kontakt")) {
            presenceData.details = "Betrachtet Kontakt";
        }
        else if (document.URL.includes("hajime")) {
            presenceData.details = "Betrachtet Hanjime! Anime-Con";
        }
        else {
            presenceData.details = "Betrachtet Kultur / Über uns";
        }
    }
    else if (document.location.host == "www.animetickets.de") {
        if (document.location.pathname.includes("/event/")) {
            presenceData.details = "Betrachtet Eventtickets für";
            presenceData.state = document.querySelector("body > div > div > div > div:nth-child(2) > span").textContent;
        }
        else if (document.location.pathname.includes("/events")) {
            presenceData.details = "Betrachtet Events";
        }
        else if (document.location.pathname.includes("contact")) {
            presenceData.details = "Betrachtet Kontakt";
        }
        else if (document.location.pathname.includes("order")) {
            presenceData.details = "Betrachtet Order";
        }
    }
    else if (document.location.host == "www.animemesse.de") {
        presenceData.largeImageKey = "animemesse";
        presenceData.details =
            "Betrachtet " +
                document.querySelector("#content > li.active > a").textContent;
    }
    else if (document.location.host == "www.animefanshop.de") {
        presenceData.largeImageKey = "animefanshop";
        let product = document.querySelector(".product-info-title-desktop > span");
        if (product !== null) {
            presenceData.details = "Betrachtet Produkt:";
            presenceData.state = product.textContent;
        }
        else if (document.location.pathname.includes("/advanced_search_result")) {
            presenceData.details =
                "Sucht nach " +
                    document
                        .querySelector("#main > div > h1")
                        .textContent.split('"')[1]
                        .split('"')[0];
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
    let startTime = Date.now();
    let endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUwsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsSUFBSSxZQUFZLEdBQWlCO1FBQy9CLGFBQWEsRUFBRSxZQUFZO0tBQzVCLENBQUM7SUFFRixZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztJQUU1QyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLG1CQUFtQixFQUFFO1FBQ2pELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ3RELFlBQVksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUM7WUFDekMsWUFBWSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7U0FDckM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7U0FDNUM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7U0FDNUM7YUFBTSxJQUFJLFFBQVEs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