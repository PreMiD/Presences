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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDaEMsSUFBSSxFQUFFLDJCQUEyQjtJQUNqQyxLQUFLLEVBQUUsMEJBQTBCO0lBQ2pDLElBQUksRUFBRSx3QkFBd0I7Q0FDL0IsQ0FBQyxDQUFDO0FBRUgsSUFBSSxLQUFLLEVBQ1AsUUFBUSxFQUNSLFVBQVUsR0FBRyxRQUFRLEVBQ3JCLGFBQWEsRUFDYixjQUFjLEVBQ2QsU0FBUyxFQUNULGFBQWEsRUFDYixJQUFJLEVBQ0osT0FBTyxFQUNQLE1BQU0sRUFDTixJQUFJLEVBQ0osT0FBTyxHQUFHLEtBQUssQ0FBQztBQUVsQixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxJQUFJLFFBQVEsR0FBRztRQUNiLEtBQUssRUFBRTtZQUNMLEtBQUssRUFBRSxRQUFRLENBQUMsYUFBYSxDQUMzQix1REFBdUQsQ0FDeEQ7WUFDRCxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQ1osT0FBTyxRQUFRLENBQUMsZ0JBQWdCLENBQzlCLHdFQUF3RSxDQUN6RSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ1gsQ0FBQztTQUNGO1FBQ0QsSUFBSSxFQUFFO1lBQ0osS0FBSyxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQzNCLGlEQUFpRCxDQUNsRDtZQUNELEtBQUssRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLHFDQUFxQyxDQUFDO1lBQ3BFLFFBQVEsRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLHVDQUF1QyxDQUFDO1lBQ3pFLElBQUksRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLDhCQUE4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