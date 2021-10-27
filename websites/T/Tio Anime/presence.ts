const presence = new Presence({
    clientId: "896323132871299103"
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
    largeImageKey: "tioanimelogo",
    startTimestamp: browsingStamp
  };

  if (document.location.pathname === "/") presenceData.details = "En la página de inicio...";
  else if (document.location.pathname.includes("/anime/")) {
    presenceData.details = "Viendo lista de episodios:";
    presenceData.state = document.querySelector(".title").textContent;
  } else if (document.location.pathname.includes("/ver/")) {
    presenceData.details = "Viendo Anime:";
    presenceData.state = document.querySelector("h1").textContent;

    if(video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
      presenceData.smallImageKey = "stop";
      presenceData.smallImageText = "Capítulo pausado";
    } else {
      const [start, end] = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );
      presenceData.smallImageKey = "play";
      presenceData.smallImageText = "Reproduciendo capítulo";
      presenceData.startTimestamp = start;
      presenceData.endTimestamp = end;
    }

  } switch (document.location.pathname) {
    case "/directorio":
      presenceData.details = "Viendo el directorio de animes";
      break;
    case "/programacion":
      presenceData.details = "Viendo la programación Semanal";
      break;
    case "/peticiones":
      presenceData.details = "Viendo peticiones";
      break;
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
