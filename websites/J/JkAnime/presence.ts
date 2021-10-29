const presence = new Presence({
    clientId: "902973338404671498"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let video = {
  duration: 0,
  currentTime: 0,
  paused: true
};
  
/**
   * Get Timestamps
   * @param {Number} videoTime Current video time seconds
   * @param {Number} videoDuration Video duration seconds
   */
function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  const startTime = Date.now(),
    endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}
  
presence.on(
  "iFrameData",
  (data: { duration: number; currentTime: number; paused: boolean }) => {
    video = data;
  }
);
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "jk",
    startTimestamp: browsingStamp
  };

  if(document.querySelector(".breadcrumb__links ") !== null) {
    presenceData.details = "Viendo Anime:";
    presenceData.state = document.querySelector(".breadcrumb__links > h1").textContent;
    [presenceData.startTimestamp, presenceData.endTimestamp] = getTimestamps(
      Math.floor(video.currentTime),
      Math.floor(video.duration)
    );
    presenceData.smallImageKey = (video.paused) ? "pause" : "play";
    presenceData.smallImageText = (video.paused) ? "Capítulo pausado" : "Reproduciendo capítulo";
    if(video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }
  } else presenceData.details = "Navegando en la web";


  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
