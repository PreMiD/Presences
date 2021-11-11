const mavanimes = new Presence({
  clientId: "814986239681626143"
});
let video: {
  currentTime?: number;
  duration?: number;
  paused?: boolean;
} = {};
mavanimes.on(
  "iFrameData",
  (videoData: { currentTime: number; duration: number; paused: boolean }) => {
    if (videoData.duration) video = videoData;
  }
);
mavanimes.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "logo"
    },
    params = new URLSearchParams(new URL(window.location.href).search);
  if (document.location.pathname === "/") {
    if (params.has("s") === true) {
      presenceData.details = "Cherche un animé..";
      data.state = params.get("s");
    } else presenceData.details = "Page d'accueil";
  } else if (document.location.pathname.endsWith("/tous-les-animes-en-vf/"))
    presenceData.details = "Cherche un animé en VF..";
  else if (document.location.pathname.endsWith("/films/"))
    presenceData.details = "Cherche un film..";
  else if (
    document.location.pathname.endsWith("/tous-les-animes-en-vostfr-fullhd-2/")
  )
    presenceData.details = "Cherche un animé..";
  else if (
    document.location.pathname.endsWith("/regarder-animes-oav-streaming/")
  )
    presenceData.details = "Cherche un OAV..";
  else if (
    document.location.pathname.endsWith(
      "/calendrier-de-sorties-des-nouveaux-episodes/"
    )
  )
    presenceData.details = "Regarde le calendrier de sortie";
  else {
    presenceData.details = "Regarde un animé :";
    data.state = document.getElementsByClassName("entry-title")[0].textContent;
    const timestamps = mavanimes.getTimestamps(
      Math.floor(video.currentTime),
      Math.floor(video.duration)
    );
    if (!isNaN(timestamps[0]) && !isNaN(timestamps[1]))
      [data.startTimestamp, data.endTimestamp] = timestamps;
    if (video.paused) {
      delete data.startTimestamp;
      delete data.endTimestamp;
      data.smallImageText = "En pause";
      data.smallImageKey = "pause";
    } else {
      data.smallImageText = "Lecture..";
      data.smallImageKey = "play";
    }
  }
  mavanimes.setActivity(data);
});
