var presence = new Presence({
    clientId: "640561280800915456"
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
        largeImageKey: "bc"
    };
    if (document.location.hostname == "bandcamp.com") {
        if (document.querySelector("#discover > div:nth-child(9) > div:nth-child(2) > div > div.detail-player > div > table > tbody > tr:nth-child(1) > td.play_cell > a > div").className == "playbutton playing") {
            min = parseInt(document
                .querySelector("#discover > div:nth-child(9) > div:nth-child(2) > div > div.detail-player > div > table > tbody > tr:nth-child(1) > td.track_cell > div > span.time.secondaryText > span.time_elapsed")
                .textContent.split(":")[0]);
            sec = parseInt(document
                .querySelector("#discover > div:nth-child(9) > div:nth-child(2) > div > div.detail-player > div > table > tbody > tr:nth-child(1) > td.track_cell > div > span.time.secondaryText > span.time_elapsed")
                .textContent.split(":")[1]);
            min = min * 60;
            time = min + sec;
            min2 = parseInt(document
                .querySelector("#discover > div:nth-child(9) > div:nth-child(2) > div > div.detail-player > div > table > tbody > tr:nth-child(1) > td.track_cell > div > span.time.secondaryText > span.time_total")
                .textContent.split(":")[0]);
            sec2 = parseInt(document
                .querySelector("#discover > div:nth-child(9) > div:nth-child(2) > div > div.detail-player > div > table > tbody > tr:nth-child(1) > td.track_cell > div > span.time.secondaryText > span.time_total")
                .textContent.split(":")[1]);
            min2 = min2 * 60;
            time2 = min2 + sec2;
            timestamps = getTimestamps(time, time2);
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
            presenceData.smallImageKey = "play";
            presenceData.smallImageText = "Playing";
            presenceData.details = document.querySelector("#discover > div:nth-child(9) > div:nth-child(2) > div > div.detail-player > div > table > tbody > tr:nth-child(1) > td.track_cell > div > span.title-section > span").textContent;
            presenceData.state =
                "Album: " +
                    document.querySelector("#discover > div:nth-child(9) > div:nth-child(2) > div > div.detail-body > div:nth-child(2) > span.detail-album > a").textContent +
                    " by: " +
                    document.querySelector("#discover > div:nth-child(9) > div:nth-child(2) > div > div.detail-body > p.detail-artist > a").textContent;
        }
        else {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = document.querySelector("head > title").textContent;
        }
    }
    else if (document.location.hostname == "daily.bandcamp.com") {
        if (document.querySelector("#content > div:nth-child(2) > h2") !== null &&
            document.location.pathname !== "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Reading article:";
            presenceData.state = document.querySelector("#content > div:nth-child(2) > h2").textContent;
            presenceData.smallImageKey = "reading";
        }
        else {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Bandcamp Daily";
            presenceData.state = "Browsing...";
        }
    }
    else {
        if (document.querySelector("#trackInfoInner > div.inline_player > table > tbody > tr:nth-child(1) > td.play_cell > a > div") !== null &&
            document.querySelector("#trackInfoInner > div.inline_player > table > tbody > tr:nth-child(1) > td.play_cell > a > div").className == "playbutton playing" &&
            document.location.pathname.includes("/album/")) {
            min = parseInt(document
                .querySelector("#trackInfoInner > div.inline_player > table > tbody > tr:nth-child(1) > td.track_cell > div > span.time.secondaryText > span.time_elapsed")
                .textContent.split(":")[0]);
            sec = parseInt(document
                .querySelector("#trackInfoInner > div.inline_player > table > tbody > tr:nth-child(1) > td.track_cell > div > span.time.secondaryText > span.time_elapsed")
                .textContent.split(":")[1]);
            min = min * 60;
            time = min + sec;
            min2 = parseInt(document
                .querySelector("#trackInfoInner > div.inline_player > table > tbody > tr:nth-child(1) > td.track_cell > div > span.time.secondaryText > span.time_total")
                .textContent.split(":")[0]);
            sec2 = parseInt(document
                .querySelector("#trackInfoInner > div.inline_player > table > tbody > tr:nth-child(1) > td.track_cell > div > span.time.secondaryText > span.time_total")
                .textContent.split(":")[1]);
            min2 = min2 * 60;
            time2 = min2 + sec2;
            timestamps = getTimestamps(time, time2);
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
            presenceData.smallImageKey = "play";
            presenceData.smallImageText = "Playing";
            presenceData.details = document.querySelector("#trackInfoInner > div.inline_player > table > tbody > tr:nth-child(1) > td.track_cell > div > span.title-section > a > span").textContent;
            presenceData.state =
                "Album: " +
                    document.querySelector("#name-section > h2").textContent.trim() +
                    " by: " +
                    document.querySelector("#name-section > h3 > span > a").textContent;
        }
        else if (document.location.pathname.includes("/album/")) {
            presenceData.details = "Viewing album:";
            presenceData.state =
                document.querySelector("#name-section > h2").textContent.trim() +
                    " by: " +
                    document.querySelector("#name-section > h3 > span > a").textContent;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.querySelector("#trackInfoInner > div.inline_player.one-track > table > tbody > tr:nth-child(1) > td.play_cell > a > div") !== null &&
            document.querySelector("#trackInfoInner > div.inline_player.one-track > table > tbody > tr:nth-child(1) > td.play_cell > a > div").className == "playbutton playing" &&
            document.location.pathname.includes("/track/")) {
            min = parseInt(document
                .querySelector("#trackInfoInner > div.inline_player.one-track > table > tbody > tr:nth-child(1) > td.track_cell > div > span.time.secondaryText > span.time_elapsed")
                .textContent.split(":")[0]);
            sec = parseInt(document
                .querySelector("#trackInfoInner > div.inline_player.one-track > table > tbody > tr:nth-child(1) > td.track_cell > div > span.time.secondaryText > span.time_elapsed")
                .textContent.split(":")[1]);
            min = min * 60;
            time = min + sec;
            min2 = parseInt(document
                .querySelector("#trackInfoInner > div.inline_player.one-track > table > tbody > tr:nth-child(1) > td.track_cell > div > span.time.secondaryText > span.time_total")
                .textContent.split(":")[0]);
            sec2 = parseInt(document
                .querySelector("#trackInfoInner > div.inline_player.one-track > table > tbody > tr:nth-child(1) > td.track_cell > div > span.time.secondaryText > span.time_total")
                .textContent.split(":")[1]);
            min2 = min2 * 60;
            time2 = min2 + sec2;
            timestamps = getTimestamps(time, time2);
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
            presenceData.smallImageKey = "play";
            presenceData.smallImageText = "Playing";
            presenceData.details = document
                .querySelector("#name-section > h2")
                .textContent.trim();
            presenceData.state =
                "By: " +
                    document.querySelector("#name-section > h3 > span > a").textContent;
        }
        else if (document.location.pathname.includes("/track/")) {
            presenceData.details = "Viewing track:";
            presenceData.state =
                document.querySelector("#name-section > h2").textContent.trim() +
                    " by: " +
                    document.querySelector("#name-section > h3 > span > a").textContent;
            presenceData.startTimestamp = browsingStamp;
        }
        else {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = document.querySelector("head > title").textContent;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxDQUFDO0FBRUosSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxJQUFTLENBQUM7QUFDZCxJQUFJLEtBQVUsQ0FBQztBQUNmLElBQUksT0FBWSxDQUFDO0FBQ2pCLElBQUksTUFBVyxDQUFDO0FBQ2hCLElBQUksSUFBWSxFQUFFLEdBQVcsRUFBRSxHQUFXLEVBQUUsSUFBWSxDQUFDO0FBQ3pELElBQUksS0FBYSxFQUFFLElBQVksRUFBRSxJQUFZLEVBQUUsS0FBYSxDQUFDO0FBQzdELElBQUksTUFBVyxFQUFFLFVBQWUsQ0FBQztBQUVqQyxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxJQUFJLFlBQVksR0FBaUI7UUFDaEMsYUFBYSxFQUFFLElBQUk7S0FDbkIsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksY0FBYyxFQUFFO1FBQ2pELElBQ0MsUUFBUSxDQUFDLGFBQWEsQ0FDckIsNElBQTRJLENBQzVJLENBQUMsU0FBUyxJQUFJLG9CQUFvQixFQUNsQztZQUNELEdBQUcsR0FBRyxRQUFRLENBQ2IsUUFBUTtpQkFDTixhQUFhLENBQ2IsdUxBQXVMLENBQ3ZMO2lCQUNBLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFD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