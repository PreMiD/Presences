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

  if (hostname.startsWith("edit")) presenceData.details = "Editing Library";
  else if (hostname.startsWith("beta") || hostname.startsWith("media")) {
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

      if (title && artist) {
        presenceData.details = `${title.innerText} by ${artist.innerText}`;
        presenceData.smallImageKey = "play";
        presenceData.smallImageText = "Listening";
      }
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
