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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUM3QyxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxFQUNGLGNBQWMsRUFDZCxhQUFhLEVBQ2IsY0FBYyxFQUNkLEtBQUssQ0FBQztBQUVSLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksU0FBUyxFQUFFO1FBQzNDLGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNyQywwRUFBMEUsQ0FDM0UsQ0FBQztRQUNGLElBQ0UsUUFBUSxDQUFDLGFBQWEsQ0FDcEIsOEdBQThHLENBQy9HLElBQUksSUFBSSxFQUNUO1lBQ0EsQ0FBQyxhQUFhLEdBQUcsb0JBQW9CLENBQUMsRUFBRSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsQ0FBQztTQUNqRTthQUFNO1lBQ0wsQ0FBQyxhQUFhO2dCQUNaLDRCQUE0QixHQUFHLGNBQWMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO2dCQUNwRSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsQ0FBQztTQUM1QjtRQUNELEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM1Qiw2SEFBNkgsQ0FDOUgsQ0FBQztRQUNGLElBQUksY0FBYyxJQUFJLElBQUksRUFBRTtZQUMxQixJQUFJLFlBQVksR0FBaUI7Z0JBQy9C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