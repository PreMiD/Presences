const presence: Presence = new Presence({
    clientId: "631379801826918400"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  startTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "large_img",
      startTimestamp
    },
    url = document.URL;
  if (url.includes("/videoplayer/")) {
    const [video] = document.getElementsByTagName("video"),
      title = document.querySelectorAll("h1.title")[0].textContent,
      authorElement = document.getElementsByClassName(
        "primary-relation-name"
      )[0] as HTMLElement,
      author = authorElement.innerText;
    presenceData.details = title;
    presenceData.state = author;
    presenceData.largeImageKey = "large_img";
    presenceData.smallImageKey = video.paused ? "paused" : "playing";
    presenceData.smallImageText = video.paused
      ? (await strings).pause
      : (await strings).play;
    [presenceData.startTimestamp, presenceData.endTimestamp] =
      presence.getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );
    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }
  } else if (url.includes("/find?")) {
    presenceData.details = "Searching...";
    presenceData.smallImageKey = "search";
  } else if (url.includes("/title/")) {
    const tokens = document.title.split(" - "),
      [title] = tokens;
    presenceData.details = title;
    if (tokens[1].trim() === "IMDb") presenceData.state = "Browsing...";
    else presenceData.state = tokens[1].trim();
  } else if (url.includes("/user/") || url.includes("/poll/"))
    [presenceData.details] = document.title.split(" - ");
  else if (url.includes("/list/")) {
    [presenceData.details] = document.title.split(" - ");
    presenceData.state = "Viewing a list";
  } else if (url.includes("/search/")) {
    [presenceData.details] = document.title.split(" - ");
    presenceData.state = "Searching...";
  } else if (url.includes("/name/")) {
    [presenceData.details] = document.title.split(" - ");
    if (document.title.split(" - ")[1].trim() === "IMDb")
      presenceData.state = "Filmography";
    else presenceData.state = document.title.split(" - ")[1].trim();
  } else {
    if (
      !url.includes("/ap/") &&
      !url.includes("/registration/") &&
      url !== "https://www.imdb.com/"
    )
      [presenceData.details] = document.title.split(" - ");

    presenceData.state = "Browsing";
  }
  presence.setActivity(presenceData, true);
});
