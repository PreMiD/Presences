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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxDQUFDO0FBRUosSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxJQUFTLENBQUM7QUFDZCxJQUFJLEtBQVUsQ0FBQztBQUNmLElBQUksT0FBWSxDQUFDO0FBQ2pCLElBQUksTUFBVyxDQUFDO0FBQ2hCLElBQUksSUFBWSxFQUFFLEdBQVcsRUFBRSxHQUFXLEVBQUUsSUFBWSxDQUFDO0FBQ3pELElBQUksS0FBYSxFQUFFLElBQVksRUFBRSxJQUFZLEVBQUUsS0FBYSxDQUFDO0FBQzdELElBQUksTUFBVyxFQUFFLFVBQWUsQ0FBQztBQUVqQyxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxJQUFJLFlBQVksR0FBaUI7UUFDaEMsYUFBYSxFQUFFLEtBQUs7S0FDcEIsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksZUFBZSxFQUFFO1FBQ2xELElBQ0MsUUFBUSxDQUFDLGFBQWEsQ0FDckIsbURBQW1ELENBQ25ELEtBQUssSUFBSSxFQUNUO1lBQ0QsSUFBSSxHQUFHLFFBQVEsQ0FDZCxRQUFRLENBQUMsYUFBYSxDQUNyQixtRUFBbUUsQ0FDbkUsQ0FBQyxXQUFXLENBQ2IsQ0FBQztZQUNGLEdBQUcsR0FBRyxRQUFRLENBQ2IsUUFBUSxDQUFDLGFBQWEsQ0FD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