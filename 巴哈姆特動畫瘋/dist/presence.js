var presence = new Presence({
    clientId: "640194732718292992"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var title;
var replace;
var search;
presence.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "ani"
    };
    if (document.location.hostname == "ani.gamer.com.tw") {
        if (document.location.pathname == "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing home page";
        }
        else if (document.querySelector("#ani_video_html5_api") !== null) {
            var video, videoDuration, videoCurrentTime, paused, timestamps;
            video = document.querySelector("#ani_video_html5_api");
            videoDuration = video.duration;
            videoCurrentTime = video.currentTime;
            paused = video.paused;
            timestamps = getTimestamps(Math.floor(videoCurrentTime), Math.floor(videoDuration));
            if (!isNaN(videoDuration)) {
                presenceData.smallImageKey = paused ? "pause" : "play";
                presenceData.smallImageText = paused
                    ? (await strings).pause
                    : (await strings).play;
                presenceData.startTimestamp = timestamps[0];
                presenceData.endTimestamp = timestamps[1];
                title = document.querySelector("#BH_background > div.container-player > div.anime-title > div.anime-option > section.videoname > div.anime_name > h1");
                presenceData.details = title.innerText;
                user = document.querySelector("#BH_background > div.container-player > div.anime-title > div.anime-option > section.videoname > div.anime_name > div > p");
                if (user !== null) {
                    presenceData.state = user.innerText;
                }
                if (paused) {
                    delete presenceData.startTimestamp;
                    delete presenceData.endTimestamp;
                }
            }
            else if (isNaN(videoDuration)) {
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Looking at: ";
                title = document.querySelector("#BH_background > div.container-player > div.anime-title > div.anime-option > section.videoname > div.anime_name > h1");
                presenceData.state = title.innerText;
                presenceData.smallImageKey = "reading";
            }
        }
        else if (document.location.pathname.includes("/animeList")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing all animes";
        }
    }
    if (presenceData.details == null) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing page:";
        presenceData.state = document
            .querySelector("head > title")
            .textContent.replace(" - 巴哈姆特動畫瘋", "");
        presence.setActivity(presenceData);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUwsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxJQUFTLENBQUM7QUFDZCxJQUFJLEtBQVUsQ0FBQztBQUNmLElBQUksT0FBWSxDQUFDO0FBQ2pCLElBQUksTUFBVyxDQUFDO0FBRWhCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksWUFBWSxHQUFpQjtRQUMvQixhQUFhLEVBQUUsS0FBSztLQUNyQixDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxrQkFBa0IsRUFBRTtRQUNwRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsRUFBRTtZQUNyQyxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztZQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDO1NBQzVDO2FBQU0sSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLHNCQUFzQixDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ2xFLElBQUksS0FBdUIsRUFDekIsYUFBa0IsRUFDbEIsZ0JBQXFCLEVBQ3JCLE1BQVcsRUFDWCxVQUFlLENBQUM7WUFDbEIsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUN2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