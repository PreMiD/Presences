var presence = new Presence({
    clientId: "613628090219757599"
});
let timeElapsed = Math.floor(Date.now() / 1000), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
}), otherListeners, stationStatus, listeningCheck, onAir;
presence.on("UpdateData", async () => {
    if (document.location.pathname == "/player") {
        otherListeners = document.querySelector("html > body > #playerContent > #about > div > div.col-sm-12 > h4 > small");
        if (document.querySelector("html > body > #playerContent > #about > div.row > div.col-sm-12 > div.sm2-bar-ui.textured.full-width.playing") == null) {
            (stationStatus = "Paused on PVFM One"), (listeningCheck = "No");
        }
        else {
            (stationStatus =
                "Listening on PVFM One with" + otherListeners.innerText + " others"),
                (listeningCheck = "Yes");
        }
        onAir = document.querySelector("html > body > div#playerContent.content > div#about.container.ng-scope > div.row > div.col-sm-12 > h3#mane_onair.ng-binding");
        if (listeningCheck == "No") {
            let presenceData = {
                details: stationStatus,
                largeImageKey: "pvfm",
                smallImageKey: "pause"
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
    }
    else if (document.location.pathname == "/player/two") {
        otherListeners = document.querySelector("html > body > #playerContent > #about > div > div.col-sm-12 > h4 > small");
        if (document.querySelector("html > body > #playerContent > #about > div.row > div.col-sm-12 > div.sm2-bar-ui.textured.full-width.playing") == null) {
            (stationStatus = "Paused on PVFM Two"), (listeningCheck = "No");
        }
        else {
            (stationStatus =
                "Listening on PVFM Two with" + otherListeners.innerText + " others"),
                (listeningCheck = "Yes");
        }
        onAir = document.querySelector("html > body > div#playerContent.content > div#about.container.ng-scope > div.row > div.col-sm-12 > h3");
        if (listeningCheck == "No") {
            let presenceData = {
                details: stationStatus,
                largeImageKey: "pvfm",
                smallImageKey: "pause"
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
    }
    else if (document.location.pathname == "/player/free") {
        otherListeners = document.querySelector("html > body > #playerContent > #about > div > div.col-sm-12 > h4 > small");
        if (document.querySelector("html > body > #playerContent > #about > div.row > div.col-sm-12 > div.sm2-bar-ui.textured.full-width.playing") == null) {
            (stationStatus = "Paused on PVFM Free"), (listeningCheck = "No");
        }
        else {
            (stationStatus =
                "Listening on PVFM Free with" + otherListeners.innerText + " others"),
                (listeningCheck = "Yes");
        }
        onAir = document.querySelector("html > body > div#playerContent.content > div#about.container.ng-scope > div.row > div.col-sm-12 > h3");
        if (listeningCheck == "No") {
            let presenceData = {
                details: stationStatus,
                largeImageKey: "pvfm",
                smallImageKey: "pause"
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
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUM5QyxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxFQUNGLGNBQWMsRUFDZCxhQUFhLEVBQ2IsY0FBYyxFQUNkLEtBQUssQ0FBQztBQUVQLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksU0FBUyxFQUFFO1FBQzVDLGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUN0QywwRUFBMEUsQ0FDMUUsQ0FBQztRQUNGLElBQ0MsUUFBUSxDQUFDLGFBQWEsQ0FDckIsOEdBQThHLENBQzlHLElBQUksSUFBSSxFQUNSO1lBQ0QsQ0FBQyxhQUFhLEdBQUcsb0JBQW9CLENBQUMsRUFBRSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsQ0FBQztTQUNoRTthQUFNO1lBQ04sQ0FBQyxhQUFhO2dCQUNiLDRCQUE0QixHQUFHLGNBQWMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO2dCQUNwRSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsQ0FBQztTQUMxQjtRQUNELEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM3Qiw2SEFBNkgsQ0FDN0gsQ0FBQztRQUNGLElBQUksY0FBYyxJQUFJLElBQUksRUFBRTtZQUMzQixJQUFJLFlBQVksR0FBaUI7Z0JBQ2hD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