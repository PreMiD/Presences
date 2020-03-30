var presence = new Presence({
    clientId: "514771696134389760"
}), strings;
var localeStrings = {
    en: {
        Chatting: "Browsing PM's...",
        Watching: "Watching",
        Browsing: "Browsing",
        BrowsingFeed: "Browsing feed..."
    },
    ru: {
        Chatting: "Смотрит сообщения...",
        Watching: "Смотрит",
        Browsing: "Просматривает",
        BrowsingFeed: "Смотрит ленту..."
    }
};
function getLocale() {
    return window.navigator.language.replace("-", "_").toLowerCase();
}
function getLocalizedString(stringPath) {
    if (localeStrings[getLocale()][stringPath] !== undefined) {
        return localeStrings[getLocale()][stringPath];
    }
    else {
        console.warn(`Language for [${stringPath}] was not found!`);
        return localeStrings["en"][stringPath];
    }
}
function getVKTrackTimeLeft() {
    let playerDuration = document.querySelector(".audio_page_player_duration");
    var timeLeft;
    if (playerDuration.innerText.startsWith("-")) {
        timeLeft = playerDuration.innerText;
    }
    else {
        playerDuration.click();
        timeLeft = playerDuration.innerText;
        playerDuration.click();
    }
    timeLeft = timeLeft.slice(1);
    return timeLeft.split(":");
}
function getVKTrackTimePassed() {
    let playerDuration = document.querySelector(".audio_page_player_duration");
    var timePassed;
    if (!playerDuration.innerText.startsWith("-")) {
        timePassed = playerDuration.innerText;
    }
    else {
        playerDuration.click();
        timePassed = playerDuration.innerText;
        playerDuration.click();
    }
    return timePassed.split(":");
}
function getVKTrackLength() {
    var timeLeft, timePassed, overallTime;
    timeLeft = getVKTrackTimeLeft();
    timePassed = getVKTrackTimePassed();
    overallTime = [
        Number(timePassed[0]) + Number(timeLeft[0]),
        Number(timePassed[1]) + Number(timeLeft[1])
    ];
    if (Number(overallTime[1]) > 60) {
        var t1 = overallTime[0] + 1;
        var t2 = overallTime[1] - 60;
        overallTime = [t1, t2];
    }
    return overallTime;
}
var browsingTimestamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    if (!strings)
        strings = await presence.getStrings({
            play: "presence.playback.playing",
            pause: "presence.playback.paused"
        });
    if (document.location.pathname.startsWith("/audios") ||
        document.querySelector(".audio_layer_container")) {
        var title = document.querySelector(".audio_page_player_title_song").textContent, author = document.querySelector(".audio_page_player_title_performer a").textContent, isPlaying;
        if (document.querySelector(".audio_playing") == null) {
            isPlaying = true;
        }
        else {
            isPlaying = false;
        }
        var timestamps = getTimestamps(Math.floor(Number(getVKTrackTimePassed()[0]) * 60 +
            Number(getVKTrackTimePassed()[1])), Math.floor(Number(getVKTrackLength()[0]) * 60 + Number(getVKTrackLength()[1])));
        var presenceData = {
            details: title,
            state: author,
            largeImageKey: "vk_logo",
            smallImageKey: isPlaying ? "pause" : "play",
            smallImageText: isPlaying ? strings.pause : strings.play,
            startTimestamp: isPlaying ? null : timestamps[0],
            endTimestamp: isPlaying ? null : timestamps[1]
        };
        presence.setActivity(presenceData, true);
    }
    else if (window.location.href.match(/https:\/\/vk.com\/.*?z=video.*/)) {
        var isPlaying;
        document.querySelector(".videoplayer_ui").getAttribute("data-state") ==
            "paused"
            ? (isPlaying = true)
            : (isPlaying = false);
        var videoTitle = document.querySelector(".mv_title")
            .innerText, videoCurrentTime = document.querySelector("._time_current").innerText.split(":"), videoDuration = document.querySelector("._time_duration").innerText.split(":"), videoAuthor = document.querySelector(".mv_author_name a")
            .innerText;
        var timestamps = getTimestamps(Math.floor(Number(videoCurrentTime[0]) * 60 + Number(videoCurrentTime[1])), Math.floor(Number(videoDuration[0]) * 60 + Number(videoDuration[1])));
        var presenceData = {
            details: getLocalizedString("Watching") + " " + videoTitle,
            state: videoAuthor,
            largeImageKey: "vk_logo",
            smallImageKey: isPlaying ? "pause" : "play",
            smallImageText: isPlaying ? strings.pause : strings.play,
            startTimestamp: isPlaying ? null : timestamps[0],
            endTimestamp: isPlaying ? null : timestamps[1]
        };
        presence.setActivity(presenceData, true);
    }
    else if (document.querySelector(".page_name") !== null) {
        var page_title = document.querySelector(".page_name")
            .innerText;
        var presenceData = {
            details: page_title,
            largeImageKey: "vk_logo",
            startTimestamp: browsingTimestamp
        };
        presence.setActivity(presenceData, true);
    }
    else if (document.location.pathname.startsWith("/feed")) {
        var presenceData = {
            details: getLocalizedString("BrowsingFeed"),
            largeImageKey: "vk_logo",
            startTimestamp: browsingTimestamp
        };
        presence.setActivity(presenceData, true);
    }
    else if (document.location.pathname.startsWith("/im")) {
        var presenceData = {
            details: getLocalizedString("Chatting"),
            largeImageKey: "vk_logo",
            startTimestamp: browsingTimestamp
        };
        presence.setActivity(presenceData, true);
    }
    else {
        browsingTimestamp = Math.floor(Date.now() / 1000);
        presence.clearActivity();
    }
});
function getTimestamps(currentTime, overallTime) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - currentTime + overallTime;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLENBQUM7QUFFVCxJQUFJLGFBQWEsR0FBRztJQUNuQixFQUFFLEVBQUU7UUFDSCxRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFlBQVksRUFBRSxrQkFBa0I7S0FDaEM7SUFDRCxFQUFFLEVBQUU7UUFDSCxRQUFRLEVBQUUsc0JBQXNCO1FBQ2hDLFFBQVEsRUFBRSxTQUFTO1FBQ25CLFFBQVEsRUFBRSxlQUFlO1FBQ3pCLFlBQVksRUFBRSxrQkFBa0I7S0FDaEM7Q0FDRCxDQUFDO0FBRUYsU0FBUyxTQUFTO0lBQ2pCLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUNsRSxDQUFDO0FBRUQsU0FBUyxrQkFBa0IsQ0FBQyxVQUFVO0lBQ3JDLElBQUksYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssU0FBUyxFQUFFO1FBQ3pELE9BQU8sYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDOUM7U0FBTTtRQUNOLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLFVBQVUsa0JBQWtCLENBQUMsQ0FBQztRQUM1RCxPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUN2QztBQUNGLENBQUM7QUFFRCxTQUFTLGtCQUFrQjtJQUMxQixJQUFJLGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUMxQyw2QkFBNkIsQ0FDZCxDQUFDO0lBRWpCLElBQUksUUFBUSxDQUFDO0lBRWIsSUFBSSxjQUFjLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUM3QyxRQUFRLEdBQUcsY0FBYyxDQUFDLFNBQVMsQ0FBQztLQUNwQztTQUFNO1FBQ04sY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3ZCLFFBQVEsR0FBRyxjQUFjLENBQUMsU0FBUyxDQUFDO1FBQ3BDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUN2QjtJQUdELFFBQVEsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTdCLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBRUQsU0FBUyxvQkFBb0I7SUFDNUIsSUFBSSxjQUFjLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDMUMsNkJBQTZCLENBQ2QsQ0FBQztJQUVqQixJQUFJLFVBQVUsQ0FBQztJQUVmLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUM5QyxVQUFVLEdBQUcsY0FBYyxDQUFDLFNBQVMsQ0FBQztLQUN0QztTQUFNO1FBQ04sY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3ZCLFVBQVUsR0FBRyxjQUFjLENBQUMsU0FBUyxDQUFDO1FBQ3RDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUN2QjtJQUVELE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM5QixDQUFDO0FBR0QsU0FBUyxnQkFBZ0I7SUFDeEIsSUFBSSxRQUFRLEVBQUUsVUFBVSxFQUFFLFdBQVcsQ0FBQztJQUV0QyxRQUFRLEdBQUcsa0JBQWtCLEVBQUUsQ0FBQztJQUNoQyxVQUFVLEdBQUcsb0JBQW9CLEVBQUUsQ0FBQztJQUdwQyxXQUFXLEdBQUc7UUFDYixNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMzQyxDQUFDO0lBR0YsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ2hDLElBQUksRUFBRSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsSUFBSSxFQUFFLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUU3QixXQUFXLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDdkI7SUFFRCxPQUFPLFdBQVcsQ0FBQztBQUNwQixDQUFDO0FBRUQsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUV0RCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxJQUFJLENBQUMsT0FBTztRQUNYLE9BQU8sR0FBRyxNQUFNLFFBQVEsQ0FBQyxVQUFVLENBQUM7WUFDbkMsSUFBSSxFQUFFLDJCQUEyQjtZQUNqQyxLQUFLLEVBQUUsMEJBQTBCO1NBQ2pDLENBQUMsQ0FBQztJQUVKLElBQ0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztRQUNoRCxRQUFRLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLEVBQy9DO1FBQ0QsSUFBSSxLQUFLLEdBQVksUUFBUSxDQUFDLGFBQWEsQ0FDekMsK0JBQStCLENBQ2YsQ0FBQyxXQUFXLEVBQzdCLE1BQU0sR0FBWSxRQUFRLENBQUMsYUFBYSxDQUN2QyxzQ0FBc0MsQ0FDdEIsQ0FBQyxXQUFXLEVBQzdCLFNBQWtCLENBQUM7UUFFcEIsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLElBQUksSUFBSSxFQUFFO1lBQ3JELFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDakI7YUFBTTtZQUNOLFNBQVMsR0FBRyxLQUFLLENBQUM7U0FDbEI7UUFFRCxJQUFJLFVBQVUsR0FBRyxhQUFhLENBQzdCLElBQUksQ0FBQyxLQUFLLENBQ1QsTUFBTSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO1lBQ3JDLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ2xDLEVBQ0QsSUFBSSxDQUFDLEtBQUssQ0FDVCxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUNsRSxDQUNELENBQUM7UUFFRixJQUFJLFlBQVksR0FBaUI7WUFDaEMsT0FBTyxFQUFFLEtBQUs7WUFDZCxLQUFLLEVBQUUsTUFBTTtZQUNiLGFBQWEsRUFBRSxTQUFTO1lBQ3hCLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTTtZQUMzQyxjQUFjLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSTtZQUN4RCxjQUFjLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDaEQsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1NBQzlDLENBQUM7UUFFRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztLQUN6QztTQUFNLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdDQUFnQyxDQUFDLEVBQUU7UUFDeEUsSUFBSSxTQUFrQixDQUFDO1FBRXZCLFFBQVEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDO1lBQ3BFLFFBQVE7WUFDUCxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUV2QixJQUFJLFVBQVUsR0FBSSxRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBaUI7YUFDbEUsU0FBUyxFQUNYLGdCQUFnQixHQUFJLFFBQVEsQ0FBQyxhQUFhLENBQ3pDLGdCQUFnQixDQUNBLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFDdEMsYUFBYSxHQUFJLFFBQVEsQ0FBQyxhQUFhLENBQ3RDLGlCQUFpQixDQUNELENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFDdEMsV0FBVyxHQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQWlCO2FBQ3hFLFNBQVMsQ0FBQztRQUViLElBQUksVUFBVSxHQUFHLGFBQWEsQ0FDN0IsSUFBSSxDQUFDLEtBQUssQ0FDVCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQzlELEVBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUNwRSxDQUFDO1FBRUYsSUFBSSxZQUFZLEdBQWlCO1lBQ2hDLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLEdBQUcsVUFBVTtZQUMxRCxLQUFLLEVBQUUsV0FBVztZQUNsQixhQUFhLEVBQUUsU0FBUztZQUN4QixhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU07WUFDM0MsY0FBYyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUk7WUFDeEQsY0FBYyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2hELFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztTQUM5QyxDQUFDO1FBRUYsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDekM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ3pELElBQUksVUFBVSxHQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFpQjthQUNwRSxTQUFTLENBQUM7UUFFWixJQUFJLFlBQVksR0FBaUI7WUFDaEMsT0FBTyxFQUFFLFVBQVU7WUFDbkIsYUFBYSxFQUFFLFNBQVM7WUFDeEIsY0FBYyxFQUFFLGlCQUFpQjtTQUNqQyxDQUFDO1FBRUYsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDekM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUMxRCxJQUFJLFlBQVksR0FBaUI7WUFDaEMsT0FBTyxFQUFFLGtCQUFrQixDQUFDLGNBQWMsQ0FBQztZQUMzQyxhQUFhLEVBQUUsU0FBUztZQUN4QixjQUFjLEVBQUUsaUJBQWlCO1NBQ2pDLENBQUM7UUFFRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztLQUN6QztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3hELElBQUksWUFBWSxHQUFpQjtZQUNoQyxPQUFPLEVBQUUsa0JBQWtCLENBQUMsVUFBVSxDQUFDO1lBQ3ZDLGFBQWEsRUFBRSxTQUFTO1lBQ3hCLGNBQWMsRUFBRSxpQkFBaUI7U0FDakMsQ0FBQztRQUVGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ3pDO1NBQU07UUFDTixpQkFBaUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUNsRCxRQUFRLENBQUMsYUFBYSxFQUFFLENBQUM7S0FDekI7QUFDRixDQUFDLENBQUMsQ0FBQztBQUtILFNBQVMsYUFBYSxDQUFDLFdBQW1CLEVBQUUsV0FBbUI7SUFDOUQsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFDdkUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2hELENBQUMifQ==