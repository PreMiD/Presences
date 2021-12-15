const presence = new Presence({
    clientId: "608109837657702566"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

function stripText(element: HTMLElement, id = "None", log = true) {
  if (element && element.firstChild) return element.firstChild.textContent;
  else {
    if (log) {
      presence.error(
        `An error occurred while stripping data off the page. Please contact FireController1847 on the PreMiD Discord server, and send him a screenshot of this error. ID: ${id}`
      );
    }
    return null;
  }
}

presence.on("UpdateData", async () => {
  // Define presence data
  const data: PresenceData = {
    details: "Browsing...",
    largeImageKey: "pandora"
  };

  // Define whether or not we're currently playing
  let isPlaying = false;

  // Fetch audio bar
  const audioBar: HTMLElement = document.querySelector(
    ".Tuner__Audio__NowPlayingHitArea"
  );

  // If the audio bar exists, assume we're listening to something
  if (audioBar) {
    // Fetch title and artist
    const title: HTMLElement = document.querySelector(
        ".Tuner__Audio__TrackDetail__title"
      ),
      artist: HTMLElement = document.querySelector(
        ".Tuner__Audio__TrackDetail__artist"
      );

    // Only apply them to presence if they're not null
    if (title !== null && artist !== null) {
      // Set them to the presence
      data.details = stripText(title, "Title");
      data.state = stripText(artist, "Artist");
    } else presence.error("Title and artist are null!");

    // Fetch play button
    const playButton: HTMLElement = document.querySelector(
      ".Tuner__Control__Play__Button"
    );

    // Return if null
    if (playButton !== null) {
      // Check if we're paused or playing
      isPlaying = playButton.getAttribute("aria-checked") === "true";

      // If we're not paused, set the small image to playing and fetch the timestamps
      // Otherwise, set the small image to paused
      if (isPlaying) {
        data.smallImageKey = "play";
        data.smallImageText = (await strings).play;

        // Get duration control
        const timeElapsed: HTMLElement = document.querySelector(
            ".VolumeDurationControl__Duration [data-qa=elapsed_time]"
          ),
          timeRemaining: HTMLElement = document.querySelector(
            ".VolumeDurationControl__Duration [data-qa=remaining_time]"
          );

        // Return if either are null
        if (timeElapsed !== null && timeRemaining !== null) {
          // Get timestamps
          [data.startTimestamp, data.endTimestamp] = presence.getTimestamps(
            presence.timestampFromFormat(
              stripText(timeElapsed, "Time Elapsed")
            ),
            presence.timestampFromFormat(
              stripText(timeRemaining, "Time Remaining")
            )
          );
        } else presence.error("Timestamps are null!");
      } else {
        data.smallImageKey = "pause";
        data.smallImageText = (await strings).pause;
      }
    } else presence.error("Play button is null!");
  }

  presence.setActivity(data);
});
