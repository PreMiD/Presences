var presence = new Presence({
    clientId: "607754656453623843"
});
var strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
});
var title, streamer, largeImage = "twitch", smallImageKey, smallImageText, videoTime, videoDuration, live, elapsed, oldURL, type, logging = false;
presence.on("UpdateData", async () => {
    var elements = {
        squad: {
            users: document.querySelector(".tw-align-items-center.tw-flex.tw-mg-l-1:nth-child(2)"),
            user: index => {
                return document.querySelectorAll(".tw-interactive.tw-link.tw-link--hover-underline-none.tw-link--inherit")[index];
            }
        },
        live: {
            label: document.querySelector(".video-player .tw-channel-status-text-indicator"),
            title: document.querySelector(".tw-font-size-4.tw-line-height-body"),
            streamer: document.querySelector(".tw-font-size-5.tw-white-space-nowrap"),
            host: document.querySelector(".tw-c-text-overlay.tw-strong")
        },
        video: {
            title: document.querySelector(".tw-font-size-4.tw-strong"),
            streamer: document.querySelector(".tw-font-size-5.tw-white-space-nowrap"),
            time: document.querySelector(".vod-seekbar-time-labels > p:nth-child(1)"),
            duration: document.querySelector(".vod-seekbar-time-labels > p:nth-child(2)")
        },
        clip: {
            title: document.querySelector(".tw-font-size-4.tw-strong"),
            streamer: document.querySelector(".tw-font-size-5.tw-white-space-nowrap")
        }
    };
    if (window.location.href !== oldURL) {
        oldURL = window.location.href;
        elapsed = Math.floor(Date.now() / 1000);
    }
    var video = document.querySelector("video");
    var squad = document.querySelector(".squad-stream-top-bar__container");
    if (squad) {
        type = "squad";
    }
    else if ((elements.live.title && elements.live.streamer && elements.live.label) ||
        elements.live.host) {
        type = "live";
    }
    else if (elements.video.title &&
        elements.video.streamer &&
        elements.video.time &&
        elements.video.duration) {
        type = "video";
    }
    else if (elements.clip.title && elements.clip.streamer) {
        type = "clip";
    }
    else {
        type = "browsing";
    }
    if (logging) {
        console.log(`Type: ${type}`);
        console.log(`Video Time: ${video ? video.currentTime : 0}`);
        console.log(`Video Duration: ${video ? video.duration : 0}`);
    }
    try {
        if (type === "squad") {
            var users = [];
            var user_path = elements.squad.users;
            for (var index = 0; index <= user_path.children.length - 1; index++) {
                users = users.concat(elements.squad.user(index).textContent);
            }
            title = "Squad Stream";
            streamer = users.join(", ");
            smallImageKey = "live";
            smallImageText = (await strings).live;
            videoTime = elapsed;
            videoDuration = undefined;
        }
        else if (type === "live") {
            title = elements.live.title
                ? elements.live.title.textContent
                : `Hosting ${elements.live.host.textContent}`;
            streamer = elements.live.streamer.textContent;
            smallImageKey = "live";
            smallImageText = (await strings).live;
            videoTime = elapsed;
            videoDuration = undefined;
        }
        else if (type === "video") {
            title = elements.video.title.textContent;
            streamer = elements.video.streamer.textContent;
            smallImageKey = video.paused ? "pause" : "play";
            smallImageText = video.paused
                ? (await strings).pause
                : (await strings).play;
            var timestamps = getElementTimestamps(elements.video.time.textContent, elements.video.duration.textContent);
            videoTime = timestamps[0];
            videoDuration = timestamps[1];
        }
        else if (type === "clip") {
            title = elements.clip.title.textContent;
            streamer = elements.clip.streamer.textContent;
            smallImageKey = video.paused ? "pause" : "play";
            smallImageText = video.paused
                ? (await strings).pause
                : (await strings).play;
            var timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
            videoTime = timestamps[0];
            videoDuration = timestamps[1];
        }
        else if (type === "browsing") {
            var location = window.location.pathname;
            title = "Browsing";
            streamer = undefined;
            smallImageKey = undefined;
            smallImageText = undefined;
            videoTime = undefined;
            videoDuration = undefined;
            var user = location.match("/(\\S*)/(\\S*)");
            var user_header = document.querySelector(".tw-bold.tw-font-size-2");
            if (elements.live.streamer && user && user_header) {
                streamer = elements.live.streamer.textContent + "'s " + user[2];
            }
            if (location.match("/directory")) {
                streamer = "Categories";
            }
            if (location.match("/directory/all")) {
                streamer = "Live";
            }
            if (location.match("/directory/following")) {
                title = "Browsing Following";
                streamer = "Overview";
            }
            if (location.match("/directory/following/live")) {
                streamer = "Live";
            }
            if (location.match("/directory/following/videos")) {
                streamer = "Videos";
            }
            if (location.match("/directory/following/hosts")) {
                streamer = "Hosts";
            }
            if (location.match("/directory/following/games")) {
                streamer = "Categories";
            }
            if (location.match("/directory/following/channels")) {
                streamer = "Channels";
            }
            if (location.match("/directory/game")) {
                title = "Browsing Game";
                streamer = document.querySelector(".tw-c-text-base.tw-font-size-2.tw-strong").textContent;
            }
        }
    }
    catch (err) { }
    var data = {
        details: title,
        state: streamer,
        largeImageKey: largeImage,
        smallImageKey: smallImageKey,
        smallImageText: smallImageText,
        startTimestamp: videoTime,
        endTimestamp: videoDuration
    };
    if (video && video.paused) {
        delete data.startTimestamp;
        delete data.endTimestamp;
    }
    if (title !== null && streamer !== null) {
        presence.setActivity(data, video ? !video.paused : true);
        presence.setTrayTitle(title);
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
function getElementTimestamps(audioTime, audioDuration) {
    var splitAudioTime = audioTime.split(":").reverse();
    var splitAudioDuration = audioDuration.split(":").reverse();
    var parsedAudioTime = getTime(splitAudioTime);
    var parsedAudioDuration = getTime(splitAudioDuration);
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - parsedAudioTime + parsedAudioDuration;
    return [Math.floor(startTime / 1000), endTime];
}
function getTime(list) {
    var ret = 0;
    for (let index = list.length - 1; index >= 0; index--) {
        ret += parseInt(list[index]) * 60 ** index;
    }
    return ret;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUNILElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDakMsSUFBSSxFQUFFLDJCQUEyQjtJQUNqQyxLQUFLLEVBQUUsMEJBQTBCO0lBQ2pDLElBQUksRUFBRSx3QkFBd0I7Q0FDOUIsQ0FBQyxDQUFDO0FBRUgsSUFBSSxLQUFLLEVBQ1IsUUFBUSxFQUNSLFVBQVUsR0FBRyxRQUFRLEVBQ3JCLGFBQWEsRUFDYixjQUFjLEVBQ2QsU0FBUyxFQUNULGFBQWEsRUFDYixJQUFJLEVBQ0osT0FBTyxFQUNQLE1BQU0sRUFDTixJQUFJLEVBQ0osT0FBTyxHQUFHLEtBQUssQ0FBQztBQUVqQixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxJQUFJLFFBQVEsR0FBRztRQUNkLEtBQUssRUFBRTtZQUNOLEtBQUssRUFBRSxRQUFRLENBQUMsYUFBYSxDQUM1Qix1REFBdUQsQ0FDdkQ7WUFDRCxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQ2IsT0FBTyxRQUFRLENBQUMsZ0JBQWdCLENBQy9CLHdFQUF3RSxDQUN4RSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ1YsQ0FBQztTQUNEO1FBQ0QsSUFBSSxFQUFFO1lBQ0wsS0FBSyxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQzVCLGlEQUFpRCxDQUNqRDtZQUNELEtBQUssRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLHFDQUFxQyxDQUFDO1lBQ3BFLFFBQVEsRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLHVDQUF1QyxDQUFDO1lBQ3pFLElBQUksRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLDhCQUE4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