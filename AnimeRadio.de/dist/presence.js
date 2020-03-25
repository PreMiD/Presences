var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let presence = new Presence({
    clientId: "687352219598585905",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
let browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
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
}));
function getTimestamps(videoTime, videoDuration) {
    let startTime = Date.now();
    let endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzFCLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsU0FBUyxFQUFFLEtBQUs7Q0FDaEIsQ0FBQyxFQUNGLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQzdCLElBQUksRUFBRSwyQkFBMkI7SUFDakMsS0FBSyxFQUFFLDBCQUEwQjtDQUNqQyxDQUFDLENBQUM7QUFFSixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVsRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFTLEVBQUU7SUFDcEMsSUFBSSxZQUFZLEdBQWlCO1FBQ2hDLGFBQWEsRUFBRSxZQUFZO0tBQzNCLENBQUM7SUFFRixZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztJQUU1QyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLG1CQUFtQixFQUFFO1FBQ2xELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ3ZELFlBQVksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUM7WUFDekMsWUFBWSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7U0FDcEM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzNDLFlBQVksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7U0FDM0M7YUFBTSxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzNDLFlBQVksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENB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