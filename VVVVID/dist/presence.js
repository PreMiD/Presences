var presence = new Presence({
    clientId: "639916600031707149"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var title;
var replace;
var search;
var hour, min, sec, time;
var hour2, min2, sec2, time2;
var paused, timestamps;
presence.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "vid"
    };
    if (document.location.hostname == "www.vvvvid.it") {
        if (document.querySelector("#pl_controls > div.ppcontroltime > div.pptimeleft") !== null) {
            hour = parseInt(document.querySelector("#pl_controls > div.ppcontroltime > div.pptimeleft > span.pphr_elp").textContent);
            min = parseInt(document.querySelector("#pl_controls > div.ppcontroltime > div.pptimeleft > span.ppmin_elp").textContent);
            sec = parseInt(document.querySelector("#pl_controls > div.ppcontroltime > div.pptimeleft > span.ppsec_elp").textContent);
            hour = hour * 60 * 60;
            min = min * 60;
            time = hour + min + sec;
            hour2 = parseInt(document.querySelector("#pl_controls > div.ppcontroltime > div.pptimeduration > span.pphr_dur").textContent);
            min2 = parseInt(document.querySelector("#pl_controls > div.ppcontroltime > div.pptimeduration > span.ppmin_dur").textContent);
            sec2 = parseInt(document.querySelector("#pl_controls > div.ppcontroltime > div.pptimeduration > span.ppsec_dur").textContent);
            hour2 = hour2 * 60 * 60;
            min2 = min2 * 60;
            time2 = hour2 + min2 + sec2;
            paused =
                document.querySelector("#pl_controls > div:nth-child(1) > div.pppause.active") !== null
                    ? false
                    : true;
            if (paused == true) {
                presenceData.smallImageKey = "pause";
                presenceData.smallImageText = "In pausa";
            }
            else {
                timestamps = getTimestamps(time, time2);
                presenceData.startTimestamp = timestamps[0];
                presenceData.endTimestamp = timestamps[1];
                presenceData.smallImageKey = "play";
                presenceData.smallImageText = "Riproducendo";
            }
            presenceData.details = document.querySelector("#player-video-info > div.player-info-container > div.player-info-publisher.player-info-show").textContent;
            presenceData.state = document.querySelector("#player-video-info > div.player-info-container > div.player-info-title").textContent;
        }
        else if (document.location.pathname.includes("/show/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Guardando una serie:";
            presenceData.state = document.querySelector("#content-body > div.show-container.fillParent > div > div > div.show-inside-container > div.show-top-container > div.show-title").textContent;
        }
        else if (document.location.pathname.includes("/fandom")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Guardando un fandom:";
            presenceData.state = document.querySelector("#content-body > div.show-container.fillParent > div > div > div.show-inside-container > div.show-top-container > div.show-title").textContent;
        }
        else if (document.location.pathname.includes("/profile/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Visualizzando un utente:";
            presenceData.state = document.querySelector("#content-body > div.profile-container-opaque.text-shadow.open > div.profile-friend-content > div > div.profile-friend-top > div.profile-friend-top-right > div.profile-friend-name-container > div").textContent;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUwsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxJQUFTLENBQUM7QUFDZCxJQUFJLEtBQVUsQ0FBQztBQUNmLElBQUksT0FBWSxDQUFDO0FBQ2pCLElBQUksTUFBVyxDQUFDO0FBQ2hCLElBQUksSUFBWSxFQUFFLEdBQVcsRUFBRSxHQUFXLEVBQUUsSUFBWSxDQUFDO0FBQ3pELElBQUksS0FBYSxFQUFFLElBQVksRUFBRSxJQUFZLEVBQUUsS0FBYSxDQUFDO0FBQzdELElBQUksTUFBVyxFQUFFLFVBQWUsQ0FBQztBQUVqQyxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxJQUFJLFlBQVksR0FBaUI7UUFDL0IsYUFBYSxFQUFFLEtBQUs7S0FDckIsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksZUFBZSxFQUFFO1FBQ2pELElBQ0UsUUFBUSxDQUFDLGFBQWEsQ0FDcEIsbURBQW1ELENBQ3BELEtBQUssSUFBSSxFQUNWO1lBQ0EsSUFBSSxHQUFHLFFBQVEsQ0FDYixRQUFRLENBQUMsYUFBYSxDQUNwQixtRUFBbUUsQ0FDcEUsQ0FBQyxXQUFXLENBQ2QsQ0FBQztZQUNGLEdBQUcsR0FBRyxRQUFRLENBQ1osUUFBUSxDQUFDLGFBQWEsQ0FD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