var presence = new Presence({
    clientId: "607754656453623843"
});
var strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
function getTime(list) {
    var ret = 0;
    for (let index = list.length - 1; index >= 0; index--) {
        ret += parseInt(list[index]) * 60 ** index;
    }
    return ret;
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
var title, streamer, largeImage = "twitch", smallImageKey, smallImageText, videoTime, videoDuration, elapsed, oldURL, type, logging = false;
presence.on("UpdateData", async () => {
    var elements = {
        squad: {
            users: document.querySelector(".tw-align-items-center.tw-flex.tw-mg-l-1:nth-child(2)"),
            user: (index) => {
                return document.querySelectorAll(".tw-interactive.tw-link.tw-link--hover-underline-none.tw-link--inherit")[index];
            }
        },
        live: {
            label: document.querySelector(".video-player .tw-channel-status-text-indicator"),
            title: document.querySelector(".tw-font-size-4.tw-line-height-body"),
            streamer: document.querySelector(".tw-font-size-5.tw-white-space-nowrap"),
            host: document.querySelector(".tw-c-text-overlay.tw-strong")
        },
        moderator: {
            title: document.querySelector(".tw-c-text-overlay.tw-font-size-5"),
            streamer: document.querySelector("p > a.tw-interactive.tw-link.tw-link--button.tw-link--overlay"),
            live: document.querySelector(".tw-font-size-6.tw-semibold.tw-upcase")
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
    else if (elements.moderator.title && elements.moderator.streamer) {
        type = "moderator";
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
        var timestamps = null;
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
        else if (type === "live" || type === "moderator") {
            if (type !== "moderator") {
                title = elements.live.title
                    ? elements.live.title.textContent
                    : `Hosting ${elements.live.host.textContent}`;
                streamer = elements.live.streamer.textContent;
            }
            if (window.location.pathname.match("/moderator")) {
                title = elements.moderator.title.textContent;
                streamer = `Moderating ${elements.moderator.streamer.textContent}`;
            }
            if (elements.moderator.live.textContent === "Online" || type === "live") {
                smallImageKey = "live";
                smallImageText = (await strings).live;
            }
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
            timestamps = getElementTimestamps(elements.video.time.textContent, elements.video.duration.textContent);
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
            timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
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
    catch (err) {
        console.log("Error! Please contact dev of this presence.");
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDaEMsSUFBSSxFQUFFLDJCQUEyQjtJQUNqQyxLQUFLLEVBQUUsMEJBQTBCO0lBQ2pDLElBQUksRUFBRSx3QkFBd0I7Q0FDL0IsQ0FBQyxDQUFDO0FBT0gsU0FBUyxhQUFhLENBQ3BCLFNBQWlCLEVBQ2pCLGFBQXFCO0lBRXJCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMzQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxTQUFTLEdBQUcsYUFBYSxDQUFDO0lBQ3ZFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNqRCxDQUFDO0FBRUQsU0FBUyxPQUFPLENBQUMsSUFBYztJQUM3QixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDWixLQUFLLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDckQsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksS0FBSyxDQUFDO0tBQzVDO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBRUQsU0FBUyxvQkFBb0IsQ0FDM0IsU0FBaUIsRUFDakIsYUFBcUI7SUFFckIsSUFBSSxjQUFjLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxH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