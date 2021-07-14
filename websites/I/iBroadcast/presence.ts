const presence = new Presence({
    clientId: "861594094623129691"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "ibroadcast_logo",
      startTimestamp: browsingStamp
    },
    { hostname } = document.location;

  if (hostname.startsWith("media")) {
    const controls: HTMLImageElement = document.querySelector(
        "img.mgr-player-play"
      ),
      album: HTMLDivElement = document.querySelector(".mgr-player-album"),
      pageTitle: HTMLDivElement = document.querySelector(".mgr-page-title"),
      playlistDetails: HTMLDivElement = document.querySelector(
        ".mgr-list-tracks-header-info"
      );

    if (controls && controls.src.includes("pause")) {
      const currentTime: HTMLDivElement =
          document.querySelector(".jp-current-time"),
        duration: HTMLDivElement = document.querySelector(".jp-duration");

      presenceData.details = document.title;
      if (album) presenceData.state = album.innerText;
      if (currentTime && duration) {
        const currTime = presence.timestampFromFormat(currentTime.innerText),
          dur = presence.timestampFromFormat(duration.innerText);

        [, presenceData.endTimestamp] = presence.getTimestamps(currTime, dur);
      }
    } else if (pageTitle)
      presenceData.details = `Viewing ${pageTitle.innerText}`;
    else if (playlistDetails) {
      const type: HTMLDivElement = playlistDetails.querySelector(
          ".mgr-list-tracks-header-type"
        ),
        name: HTMLDivElement = playlistDetails.querySelector(
          ".mgr-list-tracks-header-name"
        );

      if (type && type.innerText !== "")
        presenceData.details = `Viewing ${type.innerText}`;
      if (name) {
        if (!presenceData.details) presenceData.details = name.innerText;
        else presenceData.state = name.innerText;
      }
    } else presenceData.details = "At homepage";
  } else if (hostname.startsWith("edit"))
    presenceData.details = "Editing Library";
  else if (hostname.startsWith("beta")) {
    const pause: HTMLDivElement = document.querySelector(".icon-player-pause"),
      playlist: HTMLDivElement = document.querySelector(
        ".mgr-list-tracks-title"
      ),
      popup: HTMLDivElement = document.querySelector(
        "body > div.mgr-modal.mgr-modal-opaque > div > div.mgr-title"
      );

    if (pause) {
      const title: HTMLDivElement = document.querySelector(".mgr-player-title"),
        artist: HTMLDivElement = document.querySelector(".mgr-player-artist"),
        currentTime: HTMLDivElement = document.querySelector(
          ".mgr-player-current-time"
        ),
        duration: HTMLDivElement = document.querySelector(
          ".mgr-player-duration"
        );

      if (title && artist)
        presenceData.details = `${title.innerText} by ${artist.innerText}`;
      if (currentTime && duration) {
        const currTime = presence.timestampFromFormat(currentTime.innerText),
          dur = presence.timestampFromFormat(duration.innerText);
        [, presenceData.endTimestamp] = presence.getTimestamps(currTime, dur);
      }
    } else if (playlist) {
      presenceData.details = "Looking at playlist";
      presenceData.state = playlist.innerText;
    } else if (popup) presenceData.details = `Viewing ${popup.innerText}`;
    else presenceData.details = "At homepage";
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
