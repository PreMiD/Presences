var presence = new Presence({
    clientId: "643606929570005014",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    var video = document.querySelector("#wbplayer > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video");
    var browsingStamp = Math.floor(Date.now() / 1000);
    if (document.location.pathname == "/") {
    let data = {
        details: "Viewing home page",
        largeImageKey: "logo",
        startTimestamp: browsingStamp
    };
    presence.setActivity(data)
}
    else if (document.location.pathname.includes("/trending")) {
        
        let data = {
            details: "Viewing Trending tab",
            largeImageKey: "logo",
            startTimestamp: browsingStamp
        };
    presence.setActivity(data)
}
else if (document.location.pathname.includes("/featured")) {
        
    let data = {
        details: "Viewing Featured tab",
        largeImageKey: "logo",
        startTimestamp: browsingStamp
    };
presence.setActivity(data)
}
else if (document.location.pathname.includes("/videos")) {
        
    let data = {
        details: "Viewing All Videos",
        largeImageKey: "logo",
        startTimestamp: browsingStamp
    };
presence.setActivity(data)
}
else if (document.location.pathname.includes("/trending_channels")) {
        
    let data = {
        details: "Viewing Trending Channels",
        largeImageKey: "logo",
        startTimestamp: browsingStamp
    };
presence.setActivity(data)
}
else if (document.location.pathname.includes("/channels")) {
        
    let data = {
        details: "Viewing All Channels",
        largeImageKey: "logo",
        startTimestamp: browsingStamp
    };
presence.setActivity(data)
}
else if (document.location.pathname.includes("/blogs/view")) {
    var blogPost = document.querySelector("body > main > section > div > div.vc > div:nth-child(2) > section:nth-child(1) > div:nth-child(1) > span").textContent;
    let data = {
        details: "Reading a blog post",
        state: blogPost,
        largeImageKey: "logo",
        startTimestamp: browsingStamp
    };
presence.setActivity(data)
}
else if (document.location.pathname === '/blogs') {

    let data = {
        details: "Viewing Channel Blogs",
        largeImageKey: "logo",
        startTimestamp: browsingStamp
    };
presence.setActivity(data)
}
else if (document.location.pathname.includes("/group/")) {
    var groupName = document.querySelector("body > main > section > div.group_stats > div:nth-child(3) > div:nth-child(1)").textContent;
    let data = {
        details: "Viewing an group",
        state: groupName,
        largeImageKey: "logo",
        startTimestamp: browsingStamp
    };
presence.setActivity(data)
}
else if (document.location.pathname.includes("/groups")) {
        
    let data = {
        details: "Viewing Groups",
        largeImageKey: "logo",
        startTimestamp: browsingStamp
    };
presence.setActivity(data)
}
else if (document.location.pathname.includes("/statistics")) {
        
    let data = {
        details: "Viewing your statistics",
        largeImageKey: "logo",
        startTimestamp: browsingStamp
    };
presence.setActivity(data)
}
else if (document.location.pathname.includes("/history/video_comments")) {
        
    let data = {
        details: "Viewing your Video Comments",
        largeImageKey: "logo",
        startTimestamp: browsingStamp
    };
presence.setActivity(data)
}
else if (document.location.pathname.includes("/history/channel_comments")) {
        
    let data = {
        details: "Viewing your Channel Comments",
        largeImageKey: "logo",
        startTimestamp: browsingStamp
    };
presence.setActivity(data)
}
else if (document.location.pathname.includes("/history/search")) {
        
    let data = {
        details: "Viewing your Search Queries",
        largeImageKey: "logo",
        startTimestamp: browsingStamp
    };
presence.setActivity(data)
}
else if (document.location.pathname.includes("/history/rated")) {
        
    let data = {
        details: "Viewing your Rated Videos",
        largeImageKey: "logo",
        startTimestamp: browsingStamp
    };
presence.setActivity(data)
}
else if (document.location.pathname.includes("/history")) {
        
    let data = {
        details: "Viewing your Watched Videos",
        largeImageKey: "logo",
        startTimestamp: browsingStamp
    };
presence.setActivity(data)
}
else if (document.location.pathname.includes("/quicklist")) {
        
    let data = {
        details: "Viewing your Quicklist",
        largeImageKey: "logo",
        startTimestamp: browsingStamp
    };
presence.setActivity(data)
}
else if (document.location.pathname.includes("/settings") || document.location.pathname.includes("/my_privacy") || document.location.pathname.includes("/my_emails")) {
        
    let data = {
        details: "Viewing your Settings",
        largeImageKey: "logo",
        startTimestamp: browsingStamp
    };
presence.setActivity(data)
}   
else if (document.location.pathname.includes("/search/")) {
    var search = document.querySelector("#search_area").value;
    let data = {
        details: "Searching for:",
        state: search,
        largeImageKey: "logo",
        smallImageKey: "search",
        startTimestamp: browsingStamp
    };
presence.setActivity(data)
}
else if (document.location.pathname.includes("/u/")) {
    var channelName = document.querySelector("body > main > section > div.channel_right > div.channel_top.dragscroll > div.c_link.channel_link > div:nth-child(1)").textContent;
    let data = {
        details: "Viewing a channel",
        state: channelName,
        largeImageKey: "logo",
        startTimestamp: browsingStamp
    };
presence.setActivity(data)
}
else if (document.location.pathname.includes("/upload")) {
        
    let data = {
        details: "Uploading a video",
        largeImageKey: "logo",
        smallImageKey: "upload",
        startTimestamp: browsingStamp
    };
presence.setActivity(data)
}
else if (document.location.pathname.includes("/dashboard") || document.location.pathname.includes("/my_channel") || document.location.pathname.includes("/my_community") || document.location.pathname.includes("/my_account")) {
        
    let data = {
        details: "Viewing your dashboard",
        largeImageKey: "logo",
        startTimestamp: browsingStamp
    };
presence.setActivity(data)
}
else if (document.location.pathname.includes("/analytics")) {
        
    let data = {
        details: "Viewing your analytics",
        largeImageKey: "logo",
        startTimestamp: browsingStamp
    };
presence.setActivity(data)
}
else if (document.location.pathname.includes("/following") || document.location.pathname.includes("/following/")) {
        
    let data = {
        details: "Viewing my follows",
        largeImageKey: "logo",
        startTimestamp: browsingStamp
    };
presence.setActivity(data)
}
    else if (document.location.pathname.includes("/v/")) {
    if (video && !isNaN(video.duration)) {
        var title = document.getElementById("v_page_title").textContent;
        var uploader = document.querySelector("#video_page > div.v_l > section.dfl_sct.v_page_user.v_page_user_top.under_sct > div > div > a").textContent;
        var timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
        let data = {
            details: title,
            state: uploader,
            largeImageKey: "logo",
            smallImageKey: video.paused ? "pause" : "play",
            smallImageText: video.paused
                ? (yield strings).pause
                : (yield strings).play,
            startTimestamp: timestamps[0],
            endTimestamp: timestamps[1]
        };
        if (video.paused) {
            delete data.startTimestamp;
            delete data.endTimestamp;
        }
        if (title !== null && uploader !== null) {
            presence.setActivity(data, !video.paused);
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
}}));
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
