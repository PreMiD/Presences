const presence = new Presence({
    clientId: "643606929570005014"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    search: "presence.activity.searching"
  });

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  const startTime = Date.now();
  const endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

presence.on("UpdateData", async () => {
  const video: HTMLVideoElement = document.querySelector(
    "#wbplayer > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video"
  );
  const browsingStamp = Math.floor(Date.now() / 1000);

  if (document.location.pathname == "/") {
    const presenceData: presenceData = {
      details: "Viewing home page",
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/trending")) {
    const presenceData: presenceData = {
      details: "Viewing Trending tab",
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/featured")) {
    const presenceData: presenceData = {
      details: "Viewing Featured tab",
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/videos")) {
    const presenceData: presenceData = {
      details: "Viewing All Videos",
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/trending_channels")) {
    const presenceData: presenceData = {
      details: "Viewing Trending Channels",
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/channels")) {
    const presenceData: presenceData = {
      details: "Viewing All Channels",
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/blogs/view")) {
    var blogPost = document.querySelector(
      "body > main > section > div > div.vc > div:nth-child(2) > section:nth-child(1) > div:nth-child(1) > span"
    ).textContent;
    const presenceData: presenceData = {
      details: "Reading a blog post",
      state: blogPost,
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/blogs") {
    const presenceData: presenceData = {
      details: "Viewing Channel Blogs",
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/group/")) {
    var groupName = document.querySelector(
      "body > main > section > div.group_stats > div:nth-child(3) > div:nth-child(1)"
    ).textContent;
    const presenceData: presenceData = {
      details: "Viewing an group",
      state: groupName,
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/groups")) {
    const presenceData: presenceData = {
      details: "Viewing Groups",
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/statistics")) {
    const presenceData: presenceData = {
      details: "Viewing your statistics",
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/history/video_comments")) {
    const presenceData: presenceData = {
      details: "Viewing your Video Comments",
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/history/channel_comments")) {
    const presenceData: presenceData = {
      details: "Viewing your Channel Comments",
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/history/search")) {
    const presenceData: presenceData = {
      details: "Viewing your Search Queries",
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/history/rated")) {
    const presenceData: presenceData = {
      details: "Viewing your Rated Videos",
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/history")) {
    const presenceData: presenceData = {
      details: "Viewing your Watched Videos",
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/quicklist")) {
    const presenceData: presenceData = {
      details: "Viewing your Quicklist",
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname.includes("/settings") ||
    document.location.pathname.includes("/my_privacy") ||
    document.location.pathname.includes("/my_emails")
  ) {
    const presenceData: presenceData = {
      details: "Viewing your Settings",
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/search/")) {
    var search = (document.querySelector("#search_area") as HTMLInputElement)
      .value;
    const presenceData: presenceData = {
      details: "Searching for:",
      state: search,
      largeImageKey: "logo",
      smallImageKey: "search",
      smallImageText: (await strings).search,
      startTimestamp: browsingStamp
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/u/")) {
    var channelName = document.querySelector(
      "body > main > section > div.channel_right > div.channel_top.dragscroll > div.c_link.channel_link > div:nth-child(1)"
    ).textContent;
    const presenceData: presenceData = {
      details: "Viewing a channel",
      state: channelName,
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/upload")) {
    const presenceData: presenceData = {
      details: "Uploading a video",
      largeImageKey: "logo",
      smallImageKey: "upload",
      smallImageText: "Uploading",
      startTimestamp: browsingStamp
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname.includes("/dashboard") ||
    document.location.pathname.includes("/my_channel") ||
    document.location.pathname.includes("/my_community") ||
    document.location.pathname.includes("/my_account")
  ) {
    const presenceData: presenceData = {
      details: "Viewing your dashboard",
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/analytics")) {
    const presenceData: presenceData = {
      details: "Viewing your analytics",
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname.includes("/following") ||
    document.location.pathname.includes("/following/")
  ) {
    const presenceData: presenceData = {
      details: "Viewing my follows",
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/v/")) {
    if (video && !isNaN(video.duration)) {
      var title = document.getElementById("v_page_title").textContent;
      var uploader = document.querySelector(
        "#video_page > div.v_l > section.dfl_sct.v_page_user.v_page_user_top.under_sct > div > div > a"
      ).textContent;
      const timestamps = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );
      const presenceData: presenceData = {
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
