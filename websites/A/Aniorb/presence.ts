const presence = new Presence({
  clientId: "776312991939428373"
}),
strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused",
  browsing: "presence.activity.browsing"
});
let video = {
video: false,
duration: 0,
currentTime: 0,
paused: true
};
presence.on(
"iFrameData",
(data: {
  video: boolean;
  duration: number;
  currentTime: number;
  paused: boolean;
}) => {
  video = data;
}
);
presence.on("UpdateData", async () => {
const presenceData: PresenceData = {
  largeImageKey: "aniorb"
};
   if (document.location.pathname.includes("/genre")) {
  presenceData.details = "Browsing Through";
  presenceData.state = "The Genres";
  presenceData.smallImageKey = "reading";
} else if (document.location.pathname.includes("/search")) {
  presenceData.details = "Searching for some anime...";
  presenceData.smallImageKey = "search";
} else if (document.location.pathname.includes("/popular")) {
  presenceData.details = "Browsing Through";
  presenceData.state = "Popular Anime";
  presenceData.smallImageKey = "popular";
} else if (document.location.pathname.includes("/recentlyadded")) {
  presenceData.details = "Browsing through";
  presenceData.state = "Recently Added";
  presenceData.smallImageKey = "recent";
} else if (document.location.pathname.includes("/myList")) {
  presenceData.details = "Browsing through";
  presenceData.state = "My List";
  presenceData.smallImageKey = "heart";
} else if (document.location.pathname.includes("/details")) {
  presenceData.details = "Browsing through";
  presenceData.state = "Anime Details";
  presenceData.smallImageKey = "reading";
}
else if (document.querySelector("#__next > div > div.flex.justify-between > div.w-full.justify-center.items-center.min-h-screen.lg\\:h-full.lg\\:w-10\\/12 > div > div.flex.flex-col.pb-2.xl\\:w-player.justify-between.items-center.w-full.text-white.my-4 > div.w-full.py-4.uppercase.flex.flex-col.items-start.lg\\:items-start > span").textContent.toUpperCase() !== null) {
  presenceData.details = "Watching:";
  presenceData.state = document.querySelector("#__next > div > div.flex.justify-between > div.w-full.justify-center.items-center.min-h-screen.lg\\:h-full.lg\\:w-10\\/12 > div > div.flex.flex-col.pb-2.xl\\:w-player.justify-between.items-center.w-full.text-white.my-4 > div.w-full.py-4.uppercase.flex.flex-col.items-start.lg\\:items-start > span").textContent.toUpperCase();
  presenceData.smallImageKey = "watching";
}
else if (
  document.querySelector("#__next > div > div.flex.justify-between > div.w-full.justify-center.items-center.min-h-screen.lg\\:h-full.lg\\:w-10\\/12 > div > div.flex.flex-col.pb-2.xl\\:w-player.justify-between.items-center.w-full.text-white.my-4 > div.w-full.py-4.uppercase.flex.flex-col.items-start.lg\\:items-start > span").textContent.toUpperCase() !== null &&
  document.querySelector("video") !== null &&
  video.video
) if (video !== null && !isNaN(video.duration)) {
  const series =   document.querySelector("#__next > div > div.flex.justify-between > div.w-full.justify-center.items-center.min-h-screen.lg\\:h-full.lg\\:w-10\\/12 > div > div.flex.flex-col.pb-2.xl\\:w-player.justify-between.items-center.w-full.text-white.my-4 > div.w-full.py-4.uppercase.flex.flex-col.items-start.lg\\:items-start > span"),
    seriesTitle = series.textContent.toUpperCase(),
    episode = document.querySelector("#__next > div > div.flex.justify-between > div.w-full.justify-center.items-center.min-h-screen.lg\\:h-full.lg\\:w-10\\/12 > div > div.flex.flex-col.pb-2.xl\\:w-player.justify-between.items-center.w-full.text-white.my-4 > div.flex.w-full.justify-between.items-end > span").textContent,
    timestamps = presence.getTimestampsfromMedia(video);
  presenceData.smallImageKey = video.paused ? "pause" : "play";
  presenceData.smallImageText = video.paused
    ? (await strings).pause
    : (await strings).play;
  presenceData.startTimestamp = timestamps[0];
  presenceData.endTimestamp = timestamps[1];
  presence.setTrayTitle();
  presenceData.details = seriesTitle;
  presenceData.state = episode;
  if (video.paused) {
    delete presenceData.startTimestamp;
    delete presenceData.endTimestamp;
  }
    presenceData.buttons = [
    {
      label: "Watch Episode",
      url: document.baseURI
    }
  ];
  presence.setActivity(presenceData, !video.paused);
}
if (presenceData.details == null) {
  presenceData.details = (await strings).browsing;
  presenceData.smallImageKey = "reading";
  presenceData.smallImageText = (await strings).browsing;
  presence.setActivity(presenceData);
} else {
  presence.setActivity(presenceData);
}
});
