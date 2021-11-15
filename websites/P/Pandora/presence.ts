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
        `An error occurred while stripping data off the page. Please contact Alanexei on the PreMiD Discord server, and send him a screenshot of this error. ID: ${id}`
      );
    }
    return null;
  }
}

presence.on("UpdateData", async () => {
  // Define presence data
  const data: PresenceData = {};

  // Set default data
  data.details = "Browsing...";
  data.largeImageKey = "pandora";

  // Define whether or not we're currently playing
  const isPlaying = true,

  // Fetch audio bar
   audioBar: HTMLElement = document.querySelector(".Tuner__Audio__NowPlayingHitArea");
  
  // If the audio bar exists, assume we're listening to something
  if (audioBar !== null) {
    // Fetch title and artist
    const title: HTMLElement = document.querySelector(".Tuner__Audio__TrackDetail__title"),
     artist: HTMLElement = document.querySelector(".Tuner__Audio__TrackDetail__artist");

    // Return if either of them are null
    if (title === null || artist === null) 
      return;

    // Set them to the presence
    data.details = stripText(title, "Title");
    data.state = stripText(artist, "Artist");

    // Get duration control
    const timeElapsed: HTMLElement = document.querySelector(".VolumeDurationControl__Duration [data-qa=elapsed_time]"),
     timeRemaining: HTMLElement = document.querySelector(".VolumeDurationControl__Duration [data-qa=remaining_time]");

    // Return if either are null
    if (timeElapsed === null || timeRemaining === null) 
      return;

    // Fetch play button
    const playButton: HTMLElement = document.querySelector(".Tuner__Control__Play__Button");

    // Return if null
    if (playButton === null) 
      return;

    // Check if we're paused or playing
    const isPlaying = playButton.getAttribute("aria-checked") === "true";

    // If we're not paused, set the small image to playing and fetch the timestamps
    // Otherwise, set the small image to paused
    if (isPlaying) {
      data.smallImageKey = "play";
      data.smallImageText = (await strings).play;

      // Get timestamps
      const [startTime, endTime] = presence.getTimestamps(
        presence.timestampFromFormat(stripText(timeElapsed, "Time Elapsed")),
        presence.timestampFromFormat(stripText(timeRemaining, "Time Remaining"))
      );

      // Set timestamps
      data.startTimestamp = startTime;
      data.endTimestamp = endTime;
    } else {
      data.smallImageKey = "pause";
      data.smallImageText = (await strings).pause;
    }
  }

  presence.setActivity(data, isPlaying);
});
