const presence = new Presence({
    clientId: "603319708191555609"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
  });
let video = {
  duration: 0,
  currentTime: 0,
  paused: true
};

function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  const startTime = Math.floor(Date.now());
  const endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), (Math.floor(endTime))];
}

presence.on(
  "iFrameData",
  (data: { duration: number; currentTime: number; paused: boolean }) => {
    video = data;
  }
);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "animefenix"
  };
  console.log(video);
  if (
    video != null &&
    !isNaN(video.duration)
  ) {
    const timestamps = getTimestamps(
      video.currentTime,
      video.duration
    );
    console.log("The current time is " + timestamps[0] + "and the durration is " + timestamps[1]);
    console.log("The video is " + video.paused);
    const title = document.querySelector(
        "#reproductor-box > div.video-header > h1"
      ).textContent;
    if(title && timestamps[0] && timestamps[1]){
        data.details = title;
        (data.smallImageKey = video.paused ? "pause" : "play");
        (data.smallImageText = video.paused
            ? (await strings).pause
            : (await strings).play);
        data.startTimestamp = timestamps[0];
        data.endTimestamp = timestamps[1];

        if (video.paused) {
        delete data.startTimestamp;
        delete data.endTimestamp;
        }
    }
  } else {
    data.details = "Unable to Read Page";
    data.state = "Define a statement for the site url";
    data.smallImageKey = "search";
    data.smallImageText = "Define a statement for the site url";
  }
  if (data.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
} else {
    presence.setActivity(data);
}
});