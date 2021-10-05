const presence = new Presence({
    clientId: "662841394171346955"
  }),
  strings = presence.getStrings({
    browsing: "presence.activity.browsing",
    paused: "presence.playback.paused",
    playing: "presence.playback.playing"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

function capitalize(str: string): string {
  const text = str.toLowerCase().split(" ");
  for (let i = 0, x = text.length; i < x; i++)
    text[i] = text[i][0].toUpperCase() + text[i].substr(1);

  return text.join(" ");
}

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = { largeImageKey: "wakanim" },
    path = document.location.pathname,
    video = document.querySelector("video"),
    title = document.querySelector(".episode_title"),
    subtitle = document.querySelector(".episode_subtitle") as HTMLElement;

  if (path.includes("/v2/catalogue/episode/") && video !== null && title) {
    presenceData.details = title.innerHTML;
    if (subtitle && subtitle.innerText)
      presenceData.state = capitalize(subtitle.innerText);

    if (video.paused) {
      presenceData.smallImageKey = "paused";
      presenceData.smallImageText = (await strings).paused;
    } else {
      presenceData.startTimestamp = Math.floor(Date.now() / 1000);
      presenceData.endTimestamp = Math.floor(
        presenceData.startTimestamp + (video.duration - video.currentTime)
      );
      presenceData.smallImageKey = "playing";
      presenceData.smallImageText = (await strings).playing;
    }
  } else {
    presenceData.details = (await strings).browsing;
    presenceData.startTimestamp = browsingStamp;
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
