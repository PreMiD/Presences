var presence = new Presence({
    clientId: "640561280800915456"
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
var browsingStamp = Math.floor(Date.now() / 1000);
var min, sec, time;
var min2, sec2, time2;
var timestamps;
presence.on("UpdateData", async () => {
    const presenceData = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQU9ILFNBQVMsYUFBYSxDQUNwQixTQUFpQixFQUNqQixhQUFxQjtJQUVyQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHLGFBQWEsQ0FBQztJQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUVELElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ2xELElBQUksR0FBVyxFQUFFLEdBQVcsRUFBRSxJQUFZLENBQUM7QUFDM0MsSUFBSSxJQUFZLEVBQUUsSUFBWSxFQUFFLEtBQWEsQ0FBQztBQUM5QyxJQUFJLFVBQWUsQ0FBQztBQUVwQixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLElBQUk7S0FDcEIsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksY0FBYyxFQUFFO1FBQ2hELElBQ0UsUUFBUSxDQUFDLGFBQWEsQ0FDcEIsNElBQTRJLENBQzdJLENBQUMsU0FBUyxJQUFJLG9CQUFvQixFQUNuQztZQUNBLEdBQUcsR0FBRyxRQUFRLENBQ1osUUFBUTtpQkFDTCxhQUFhLENBQ1osdUxBQXVMLENB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