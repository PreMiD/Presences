const presence = new Presence({
    clientId: "643606929570005014"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    search: "presence.activity.searching"
});
function getTimestamps(videoTime, videoDuration) {
    const startTime = Date.now();
    const endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
presence.on("UpdateData", async () => {
    const video = document.querySelector("#wbplayer > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video");
    const browsingStamp = Math.floor(Date.now() / 1000);
    if (document.location.pathname == "/") {
        const presenceData = {
            details: "Viewing home page",
            largeImageKey: "logo",
            startTimestamp: browsingStamp
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/trending")) {
        const presenceData = {
            details: "Viewing Trending tab",
            largeImageKey: "logo",
            startTimestamp: browsingStamp
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/featured")) {
        const presenceData = {
            details: "Viewing Featured tab",
            largeImageKey: "logo",
            startTimestamp: browsingStamp
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/videos")) {
        const presenceData = {
            details: "Viewing All Videos",
            largeImageKey: "logo",
            startTimestamp: browsingStamp
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/trending_channels")) {
        const presenceData = {
            details: "Viewing Trending Channels",
            largeImageKey: "logo",
            startTimestamp: browsingStamp
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/channels")) {
        const presenceData = {
            details: "Viewing All Channels",
            largeImageKey: "logo",
            startTimestamp: browsingStamp
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/blogs/view")) {
        var blogPost = document.querySelector("body > main > section > div > div.vc > div:nth-child(2) > section:nth-child(1) > div:nth-child(1) > span").textContent;
        const presenceData = {
            details: "Reading a blog post",
            state: blogPost,
            largeImageKey: "logo",
            startTimestamp: browsingStamp
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname === "/blogs") {
        const presenceData = {
            details: "Viewing Channel Blogs",
            largeImageKey: "logo",
            startTimestamp: browsingStamp
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/group/")) {
        var groupName = document.querySelector("body > main > section > div.group_stats > div:nth-child(3) > div:nth-child(1)").textContent;
        const presenceData = {
            details: "Viewing an group",
            state: groupName,
            largeImageKey: "logo",
            startTimestamp: browsingStamp
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/groups")) {
        const presenceData = {
            details: "Viewing Groups",
            largeImageKey: "logo",
            startTimestamp: browsingStamp
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/statistics")) {
        const presenceData = {
            details: "Viewing your statistics",
            largeImageKey: "logo",
            startTimestamp: browsingStamp
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/history/video_comments")) {
        const presenceData = {
            details: "Viewing your Video Comments",
            largeImageKey: "logo",
            startTimestamp: browsingStamp
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/history/channel_comments")) {
        const presenceData = {
            details: "Viewing your Channel Comments",
            largeImageKey: "logo",
            startTimestamp: browsingStamp
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/history/search")) {
        const presenceData = {
            details: "Viewing your Search Queries",
            largeImageKey: "logo",
            startTimestamp: browsingStamp
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/history/rated")) {
        const presenceData = {
            details: "Viewing your Rated Videos",
            largeImageKey: "logo",
            startTimestamp: browsingStamp
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/history")) {
        const presenceData = {
            details: "Viewing your Watched Videos",
            largeImageKey: "logo",
            startTimestamp: browsingStamp
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/quicklist")) {
        const presenceData = {
            details: "Viewing your Quicklist",
            largeImageKey: "logo",
            startTimestamp: browsingStamp
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/settings") ||
        document.location.pathname.includes("/my_privacy") ||
        document.location.pathname.includes("/my_emails")) {
        const presenceData = {
            details: "Viewing your Settings",
            largeImageKey: "logo",
            startTimestamp: browsingStamp
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/search/")) {
        var search = document.querySelector("#search_area")
            .value;
        const presenceData = {
            details: "Searching for:",
            state: search,
            largeImageKey: "logo",
            smallImageKey: "search",
            smallImageText: (await strings).search,
            startTimestamp: browsingStamp
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/u/")) {
        var channelName = document.querySelector("body > main > section > div.channel_right > div.channel_top.dragscroll > div.c_link.channel_link > div:nth-child(1)").textContent;
        const presenceData = {
            details: "Viewing a channel",
            state: channelName,
            largeImageKey: "logo",
            startTimestamp: browsingStamp
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/upload")) {
        const presenceData = {
            details: "Uploading a video",
            largeImageKey: "logo",
            smallImageKey: "upload",
            smallImageText: "Uploading",
            startTimestamp: browsingStamp
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/dashboard") ||
        document.location.pathname.includes("/my_channel") ||
        document.location.pathname.includes("/my_community") ||
        document.location.pathname.includes("/my_account")) {
        const presenceData = {
            details: "Viewing your dashboard",
            largeImageKey: "logo",
            startTimestamp: browsingStamp
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/analytics")) {
        const presenceData = {
            details: "Viewing your analytics",
            largeImageKey: "logo",
            startTimestamp: browsingStamp
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/following") ||
        document.location.pathname.includes("/following/")) {
        const presenceData = {
            details: "Viewing my follows",
            largeImageKey: "logo",
            startTimestamp: browsingStamp
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/v/")) {
        if (video && !isNaN(video.duration)) {
            var title = document.getElementById("v_page_title").textContent;
            var uploader = document.querySelector("#video_page > div.v_l > section.dfl_sct.v_page_user.v_page_user_top.under_sct > div > div > a").textContent;
            const timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
            const presenceData = {
                details: title,
                state: uploader,
                largeImageKey: "logo",
                smallImageKey: video.paused ? "pause" : "play",
                smallImageText: video.paused
                    ? (await strings).pause
                    : (await strings).play,
                startTimestamp: timestamps[0],
                endTimestamp: timestamps[1]
            };
            if (video.paused) {
                delete presenceData.startTimestamp;
                delete presenceData.endTimestamp;
            }
            if (title !== null && uploader !== null) {
                presence.setActivity(presenceData, !video.paused);
            }
        }
        presence.setTrayTitle();
        presence.setActivity();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsTUFBTSxFQUFFLDZCQUE2QjtDQUN0QyxDQUFDLENBQUM7QUFPTCxTQUFTLGFBQWEsQ0FDcEIsU0FBaUIsRUFDakIsYUFBcUI7SUFFckIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzdCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLFNBQVMsR0FBRyxhQUFhLENBQUM7SUFDekUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFFRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxNQUFNLEtBQUssR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FDcEQscUVBQXFFLENBQ3RFLENBQUM7SUFDRixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUVwRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsRUFBRTtRQUNyQyxNQUFNLFlBQVksR0FBaUI7WUFDakMsT0FBTyxFQUFFLG1CQUFtQjtZQUM1QixhQUFhLEVBQUUsTUFBTTtZQUNyQixjQUFjLEVBQUUsYUFBYTtTQUM5QixDQUFDO1FBQ0YsUUFBUSxD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