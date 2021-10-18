const presence = new Presence({
  clientId: "645290651604221999"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "itv_logo",
      startTimestamp: new Date().getTime()
    },
    path = document.location.pathname;

  if (path === "/") {
    presenceData.details = "Browsing ITV Hub";
    presenceData.state = "Home Page";
  } else if (path === "/hub/itv") {
    const show = document.getElementsByClassName("schedule__title--now")[0]
      .innerHTML;
    presenceData.details = "Watching ITV live";
    presenceData.state = show;
  } else if (path === "/hub/itv2") {
    const show = document.getElementsByClassName("schedule__title--now")[0]
      .innerHTML;
    presenceData.details = "Watching ITV2 live";
    presenceData.state = show;
  } else if (path === "/hub/itvbe") {
    const show = document.getElementsByClassName("schedule__title--now")[0]
      .innerHTML;
    presenceData.details = "Watching ITVBe live";
    presenceData.state = show;
  } else if (path === "/hub/itv3") {
    const show = document.getElementsByClassName("schedule__title--now")[0]
      .innerHTML;
    presenceData.details = "Watching ITV3 live";
    presenceData.state = show;
  } else if (path === "/hub/itv4") {
    const show = document.getElementsByClassName("schedule__title--now")[0]
      .innerHTML;
    presenceData.details = "Watching ITV4 live";
    presenceData.state = show;
  } else if (path === "/hub/citv") {
    const show = document.getElementsByClassName("schedule__title--now")[0]
      .innerHTML;
    presenceData.details = "Watching CITV live";
    presenceData.state = show;
  } else if (path === "/hub/tv-guide") {
    presenceData.details = "Browsing ITV";
    presenceData.state = "Viewing the TV-Guide";
  } else if (path === "/hub/shows") {
    presenceData.details = "Browsing ITV";
    presenceData.state = "Viewing shows";
  } else if (path === "/hub/categories") {
    presenceData.details = "Browsing ITV";
    presenceData.state = "Viewing categories";
  } else if (path.startsWith("/hub/categories/")) {
    const category = path.split("/")[path.split("/").length - 1];
    presenceData.details = "Browsing ITV";
    presenceData.state = `Viewing ${category} category`;
  } else if (
    /^[-+]?[0-9A-Fa-f]+\.?[0-9A-Fa-f]*?$/.test(
      path.split("/")[path.split("/").length - 1]
    )
  ) {
    // Last path is a valid hex (Show ID)
    delete presenceData.startTimestamp;
    const showDetails = {
        name: document.getElementById("programme-title").innerText,
        episode: document
          .getElementsByClassName("episode-info__episode-title")[0]
          .textContent.trim()
      },
      [video] = document.getElementsByTagName("video");
    if (!video.paused) {
      [presenceData.startTimestamp, presenceData.endTimestamp] =
        presence.getTimestamps(
          Math.floor(video.currentTime),
          Math.floor(video.duration)
        );

      presenceData.details = `Watching ${showDetails.name}`;
      presenceData.state = showDetails.episode;
      presenceData.smallImageKey = "play";
      presenceData.smallImageText = "Playing";
    } else {
      presenceData.details = `Watching ${showDetails.name}`;
      presenceData.state = showDetails.episode;
      presenceData.smallImageKey = "pause";
      presenceData.smallImageText = "Paused";
    }
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
