var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "613628090219757599",
    mediaKeys: false
});
timeElapsed = Math.floor(Date.now() / 1000);
strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if (document.location.pathname == ("/player")) {
        otherListeners = document.querySelector("html > body > #playerContent > #about > div > div.col-sm-12 > h4 > small");
        if (document.querySelector("html > body > #playerContent > #about > div.row > div.col-sm-12 > div.sm2-bar-ui.textured.full-width.playing") == null) {
            stationStatus = "Paused on PVFM One",
                listeningCheck = "No";
        }
        else {
            stationStatus = "Listening on PVFM One with" + otherListeners.innerText + " others",
                listeningCheck = "Yes";
        }
        ;
        onAir = document.querySelector("html > body > div#playerContent.content > div#about.container.ng-scope > div.row > div.col-sm-12 > h3#mane_onair.ng-binding");
        if (listeningCheck == "No") {
            let presenceData = {
                details: stationStatus,
                largeImageKey: "pvfm",
                smallImageKey: "pause",
            };
            presence.setActivity(presenceData);
        }
        else {
            let presenceData = {
                details: stationStatus,
                state: "On air: " + onAir.innerText,
                largeImageKey: "pvfm",
                smallImageKey: "play",
                startTimestamp: timeElapsed
            };
            presence.setActivity(presenceData);
        }
        ;
    }
    else if (document.location.pathname == ("/player/two")) {
        otherListeners = document.querySelector("html > body > #playerContent > #about > div > div.col-sm-12 > h4 > small");
        if (document.querySelector("html > body > #playerContent > #about > div.row > div.col-sm-12 > div.sm2-bar-ui.textured.full-width.playing") == null) {
            stationStatus = "Paused on PVFM Two",
                listeningCheck = "No";
        }
        else {
            stationStatus = "Listening on PVFM Two with" + otherListeners.innerText + " others",
                listeningCheck = "Yes";
        }
        ;
        onAir = document.querySelector("html > body > div#playerContent.content > div#about.container.ng-scope > div.row > div.col-sm-12 > h3");
        if (listeningCheck == "No") {
            let presenceData = {
                details: stationStatus,
                largeImageKey: "pvfm",
                smallImageKey: "pause",
            };
            presence.setActivity(presenceData);
        }
        else {
            let presenceData = {
                details: stationStatus,
                state: "On air: " + onAir.innerText,
                largeImageKey: "pvfm",
                smallImageKey: "play",
                startTimestamp: timeElapsed
            };
            presence.setActivity(presenceData);
        }
        ;
    }
    else if (document.location.pathname == ("/player/free")) {
        otherListeners = document.querySelector("html > body > #playerContent > #about > div > div.col-sm-12 > h4 > small");
        if (document.querySelector("html > body > #playerContent > #about > div.row > div.col-sm-12 > div.sm2-bar-ui.textured.full-width.playing") == null) {
            stationStatus = "Paused on PVFM Free",
                listeningCheck = "No";
        }
        else {
            stationStatus = "Listening on PVFM Free with" + otherListeners.innerText + " others",
                listeningCheck = "Yes";
        }
        ;
        onAir = document.querySelector("html > body > div#playerContent.content > div#about.container.ng-scope > div.row > div.col-sm-12 > h3");
        if (listeningCheck == "No") {
            let presenceData = {
                details: stationStatus,
                largeImageKey: "pvfm",
                smallImageKey: "pause",
            };
            presence.setActivity(presenceData);
        }
        else {
            let presenceData = {
                details: stationStatus,
                state: "On air: " + onAir.innerText,
                largeImageKey: "pvfm",
                smallImageKey: "play",
                startTimestamp: timeElapsed
            };
            presence.setActivity(presenceData);
        }
        ;
    }
    ;
}));
