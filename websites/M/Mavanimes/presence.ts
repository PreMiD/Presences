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
    animeName = document.getElementsByClassName("entry-title")[0].textContent,
    url = new URL(window.location.href),
    params = new URLSearchParams(url.search);
  if (document.location.pathname === "/") {
    if (params.has("s") === true) {
      data.details = "Cherche un animé..";
      data.state = params.get("s");
    } else data.details = "Page d'accueil";
  } else if (document.location.pathname.endsWith("/tous-les-animes-en-vf/"))
    data.details = "Cherche un animé en VF..";
  else if (document.location.pathname.endsWith("/films/"))
    data.details = "Cherche un film..";
  else if (
    document.location.pathname.endsWith("/tous-les-animes-en-vostfr-fullhd-2/")
  )
    data.details = "Cherche un animé..";
  else if (
    document.location.pathname.endsWith("/regarder-animes-oav-streaming/")
  )
    data.details = "Cherche un OAV..";
  else if (
    document.location.pathname.endsWith(
      "/calendrier-de-sorties-des-nouveaux-episodes/"
    )
  )
    data.details = "Regarde le calendrier de sortie";
  else {
    data.details = "Regarde un animé :";
    data.state = animeName;
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
