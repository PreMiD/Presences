const presence = new Presence({
  clientId: "706585201479909476"
});

let Name: Element, Artist: Element, timeDuration: Element, timeElapsed: Element;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (
    document.querySelector(
      "body.section-home.page-.active-player-kodi.kodi-shuffled-off.kodi-partymode-off.kodi-mute-off.kodi-repeat-off.kodi-media-audio.kodi-paused"
    )
  ) {
    Name = document.querySelector("div.playing-title");
    (Artist = document.querySelector("div.playing-subtitle")),
      (presenceData.smallImageKey = "pause"),
      (presenceData.smallImageText = "Paused");

    presenceData.details = `${Name.textContent} - ${Artist.textContent}`;
    presenceData.state = "Paused";
  } else if (
    document.querySelector(
      "body.section-home.page-.active-player-kodi.kodi-shuffled-off.kodi-partymode-off.kodi-mute-off.kodi-repeat-all.kodi-media-audio.kodi-paused"
    )
  ) {
    Name = document.querySelector("div.playing-title");
    (Artist = document.querySelector("div.playing-subtitle")),
      (presenceData.smallImageKey = "pause"),
      (presenceData.smallImageText = "Paused");

    presenceData.details = `${Name.textContent} - ${Artist.textContent}`;
    presenceData.state = "Paused";
  } else if (
    document.querySelector(
      "body.section-home.page-.active-player-kodi.kodi-shuffled-off.kodi-partymode-off.kodi-mute-off.kodi-repeat-one.kodi-media-audio.kodi-paused"
    )
  ) {
    Name = document.querySelector("div.playing-title");
    (Artist = document.querySelector("div.playing-subtitle")),
      (presenceData.smallImageKey = "pause"),
      (presenceData.smallImageText = "Paused");

    presenceData.details = `${Name.textContent} - ${Artist.textContent}`;
    presenceData.state = "Paused";
  } else if (
    document.querySelector(
      "body.section-home.page-.active-player-kodi.kodi-shuffled-on.kodi-partymode-off.kodi-mute-off.kodi-repeat-off.kodi-media-audio.kodi-paused"
    )
  ) {
    Name = document.querySelector("div.playing-title");
    (Artist = document.querySelector("div.playing-subtitle")),
      (presenceData.smallImageKey = "pause"),
      (presenceData.smallImageText = "Paused");

    presenceData.details = `${Name.textContent} - ${Artist.textContent}`;
    presenceData.state = "Paused";
  } else if (
    document.querySelector(
      "body.section-home.page-.active-player-kodi.kodi-shuffled-on.kodi-partymode-off.kodi-mute-off.kodi-repeat-one.kodi-media-audio.kodi-paused"
    )
  ) {
    Name = document.querySelector("div.playing-title");
    (Artist = document.querySelector("div.playing-subtitle")),
      (presenceData.smallImageKey = "pause"),
      (presenceData.smallImageText = "Paused");

    presenceData.details = `${Name.textContent} - ${Artist.textContent}`;
    presenceData.state = "Paused";
  } else if (
    document.querySelector(
      "body.section-home.page-.active-player-kodi.kodi-shuffled-on.kodi-partymode-off.kodi-mute-off.kodi-repeat-all.kodi-media-audio.kodi-paused"
    )
  ) {
    Name = document.querySelector("div.playing-title");
    (Artist = document.querySelector("div.playing-subtitle")),
      (presenceData.smallImageKey = "pause"),
      (presenceData.smallImageText = "Paused");

    presenceData.details = `${Name.textContent} - ${Artist.textContent}`;
    presenceData.state = "Paused";
  } else if (
    document.querySelector(
      "body.section-home.page-.active-player-kodi.kodi-shuffled-off.kodi-partymode-off.kodi-mute-off.kodi-repeat-off.kodi-media-audio.kodi-playing"
    )
  ) {
    Name = document.querySelector("div.playing-title");
    (Artist = document.querySelector("div.playing-subtitle")),
      (timeElapsed = document.querySelector("div.playing-time-current"));
    timeDuration = document.querySelector("div.playing-time-duration");
    (presenceData.smallImageKey = "play"),
      (presenceData.smallImageText = "Playing");
    presenceData.details = `${Name.textContent} - ${Artist.textContent}`;
    presenceData.state =
      `${timeElapsed.textContent}/${timeDuration.textContent}`;
  } else if (
    document.querySelector(
      "body.section-home.page-.active-player-kodi.kodi-shuffled-on.kodi-partymode-off.kodi-mute-off.kodi-repeat-off.kodi-media-audio.kodi-playing"
    )
  ) {
    Name = document.querySelector("div.playing-title");
    (Artist = document.querySelector("div.playing-subtitle")),
      (timeElapsed = document.querySelector("div.playing-time-current"));
    timeDuration = document.querySelector("div.playing-time-duration");
    (presenceData.smallImageKey = "play"),
      (presenceData.smallImageText = "Playing");
    presenceData.details = `${Name.textContent} - ${Artist.textContent}`;
    presenceData.state =
      `${timeElapsed.textContent}/${timeDuration.textContent}`;
  } else if (
    document.querySelector(
      "body.section-home.page-.active-player-kodi.kodi-shuffled-off.kodi-partymode-off.kodi-mute-off.kodi-repeat-all.kodi-media-audio.kodi-playing"
    )
  ) {
    Name = document.querySelector("div.playing-title");
    (Artist = document.querySelector("div.playing-subtitle")),
      (timeElapsed = document.querySelector("div.playing-time-current"));
    timeDuration = document.querySelector("div.playing-time-duration");
    (presenceData.smallImageKey = "repeat"),
      (presenceData.smallImageText = "Repeating");
    presenceData.details = `${Name.textContent} - ${Artist.textContent}`;
    presenceData.state =
      `${timeElapsed.textContent}/${timeDuration.textContent}`;
  } else if (
    document.querySelector(
      "body.section-home.page-.active-player-kodi.kodi-shuffled-off.kodi-partymode-off.kodi-mute-off.kodi-repeat-one.kodi-media-audio.kodi-playing"
    )
  ) {
    Name = document.querySelector("div.playing-title");
    (Artist = document.querySelector("div.playing-subtitle")),
      (timeElapsed = document.querySelector("div.playing-time-current"));
    timeDuration = document.querySelector("div.playing-time-duration");
    (presenceData.smallImageKey = "repeat-one"),
      (presenceData.smallImageText = "Repeating");
    presenceData.details = `${Name.textContent} - ${Artist.textContent}`;
    presenceData.state =
      `${timeElapsed.textContent}/${timeDuration.textContent}`;
  } else if (
    document.querySelector(
      "body.section-home.page-.active-player-kodi.kodi-shuffled-on.kodi-partymode-off.kodi-mute-off.kodi-repeat-all.kodi-media-audio.kodi-playing"
    )
  ) {
    Name = document.querySelector("div.playing-title");
    (Artist = document.querySelector("div.playing-subtitle")),
      (timeElapsed = document.querySelector("div.playing-time-current"));
    timeDuration = document.querySelector("div.playing-time-duration");
    (presenceData.smallImageKey = "repeat"),
      (presenceData.smallImageText = "Repeating");
    presenceData.details = `${Name.textContent} - ${Artist.textContent}`;
    presenceData.state =
      `${timeElapsed.textContent}/${timeDuration.textContent}`;
  } else if (
    document.querySelector(
      "body.section-home.page-.active-player-kodi.kodi-shuffled-on.kodi-partymode-off.kodi-mute-off.kodi-repeat-one.kodi-media-audio.kodi-playing"
    )
  ) {
    Name = document.querySelector("div.playing-title");
    (Artist = document.querySelector("div.playing-subtitle")),
      (timeElapsed = document.querySelector("div.playing-time-current"));
    timeDuration = document.querySelector("div.playing-time-duration");
    (presenceData.smallImageKey = "repeat-one"),
      (presenceData.smallImageText = "Repeating");
    presenceData.details = `${Name.textContent} - ${Artist.textContent}`;
    presenceData.state =
      `${timeElapsed.textContent}/${timeDuration.textContent}`;
  } else if (
    document.querySelector(
      "body.section-home.page-.active-player-kodi.kodi-shuffled-off.kodi-partymode-off.kodi-mute-off.kodi-repeat-off.kodi-media-audio.kodi-not-playing"
    )
  ) {
    Name = document.querySelector("div.playing-title");
    (presenceData.smallImageKey = "stop"),
      (presenceData.smallImageText = "Stopped");
    presenceData.details = Name.textContent;
    presenceData.state = "Stopped";
  } else if (
    document.querySelector(
      "body.section-home.page-.active-player-kodi.kodi-shuffled-on.kodi-partymode-off.kodi-mute-off.kodi-repeat-off.kodi-media-audio.kodi-not-playing"
    )
  ) {
    Name = document.querySelector("div.playing-title");
    (presenceData.smallImageKey = "stop"),
      (presenceData.smallImageText = "Stopped");
    presenceData.details = Name.textContent;
    presenceData.state = "Stopped";
  } else if (
    document.querySelector(
      "body.section-home.page-.active-player-kodi.kodi-shuffled-off.kodi-partymode-off.kodi-mute-off.kodi-repeat-off.kodi-media-video.kodi-paused"
    )
  ) {
    Name = document.querySelector("div.playing-title");
    timeElapsed = document.querySelector("div.playing-time-current");
    timeDuration = document.querySelector("div.playing-time-duration");
    (presenceData.smallImageKey = "pause"),
      (presenceData.smallImageText = "Paused");
    presenceData.details = `Watching: ${Name.textContent}`;
    presenceData.state = "Paused";
  } else if (
    document.querySelector(
      "body.section-home.page-.active-player-kodi.kodi-shuffled-off.kodi-partymode-off.kodi-mute-off.kodi-repeat-off.kodi-media-video.kodi-playing"
    )
  ) {
    Name = document.querySelector("div.playing-title");
    timeElapsed = document.querySelector("div.playing-time-current");
    timeDuration = document.querySelector("div.playing-time-duration");
    (presenceData.smallImageKey = "play"),
      (presenceData.smallImageText = "Playing");
    presenceData.details = `Watching: ${Name.textContent}`;
    presenceData.state =
      `${timeElapsed.textContent}/${timeDuration.textContent}`;
  } else if (
    document.querySelector(
      "body.section-home.page-.active-player-kodi.kodi-shuffled-off.kodi-partymode-off.kodi-mute-off.kodi-repeat-all.kodi-media-video.kodi-playing"
    )
  ) {
    Name = document.querySelector("div.playing-title");
    timeElapsed = document.querySelector("div.playing-time-current");
    timeDuration = document.querySelector("div.playing-time-duration");
    (presenceData.smallImageKey = "repeat"),
      (presenceData.smallImageText = "Repeating");
    presenceData.details = `Watching: ${Name.textContent}`;
    presenceData.state =
      `${timeElapsed.textContent}/${timeDuration.textContent}`;
  } else if (
    document.querySelector(
      "body.section-home.page-.active-player-kodi.kodi-shuffled-off.kodi-partymode-off.kodi-mute-off.kodi-repeat-one.kodi-media-video.kodi-playing"
    )
  ) {
    Name = document.querySelector("div.playing-title");
    timeElapsed = document.querySelector("div.playing-time-current");
    timeDuration = document.querySelector("div.playing-time-duration");
    (presenceData.smallImageKey = "repeat-one"),
      (presenceData.smallImageText = "Repeating");
    presenceData.details = `Watching: ${Name.textContent}`;
    presenceData.state =
      `${timeElapsed.textContent}/${timeDuration.textContent}`;
  } else if (
    document.querySelector(
      "body.section-home.page-.active-player-kodi.kodi-shuffled-off.kodi-partymode-off.kodi-mute-off.kodi-repeat-all.kodi-media-video.kodi-paused"
    )
  ) {
    Name = document.querySelector("div.playing-title");
    timeElapsed = document.querySelector("div.playing-time-current");
    timeDuration = document.querySelector("div.playing-time-duration");
    (presenceData.smallImageKey = "pause"),
      (presenceData.smallImageText = "Paused");
    presenceData.details = `Watching: ${Name.textContent}`;
    presenceData.state = "Paused";
  } else if (
    document.querySelector(
      "body.section-home.page-.active-player-kodi.kodi-shuffled-off.kodi-partymode-off.kodi-mute-off.kodi-repeat-one.kodi-media-video.kodi-paused"
    )
  ) {
    Name = document.querySelector("div.playing-title");
    timeElapsed = document.querySelector("div.playing-time-current");
    timeDuration = document.querySelector("div.playing-time-duration");
    (presenceData.smallImageKey = "pause"),
      (presenceData.smallImageText = "Paused");
    presenceData.details = `Watching: ${Name.textContent}`;
    presenceData.state = "Paused";
  } else if (
    document.querySelector(
      "body.section-home.page-.active-player-kodi.kodi-shuffled-on.kodi-partymode-off.kodi-mute-off.kodi-repeat-off.kodi-media-video.kodi-playing"
    )
  ) {
    Name = document.querySelector("div.playing-title");
    timeElapsed = document.querySelector("div.playing-time-current");
    timeDuration = document.querySelector("div.playing-time-duration");
    (presenceData.smallImageKey = "play"),
      (presenceData.smallImageText = "Playing");
    presenceData.details = `Watching: ${Name.textContent}`;
    presenceData.state =
      `${timeElapsed.textContent}/${timeDuration.textContent}`;
  } else if (
    document.querySelector(
      "body.section-home.page-.active-player-kodi.kodi-shuffled-on.kodi-partymode-off.kodi-mute-off.kodi-repeat-all.kodi-media-video.kodi-playing"
    )
  ) {
    Name = document.querySelector("div.playing-title");
    timeElapsed = document.querySelector("div.playing-time-current");
    timeDuration = document.querySelector("div.playing-time-duration");
    (presenceData.smallImageKey = "repeat"),
      (presenceData.smallImageText = "Repeating");
    presenceData.details = `Watching: ${Name.textContent}`;
    presenceData.state =
      `${timeElapsed.textContent}/${timeDuration.textContent}`;
  } else if (
    document.querySelector(
      "body.section-home.page-.active-player-kodi.kodi-shuffled-on.kodi-partymode-off.kodi-mute-off.kodi-repeat-one.kodi-media-video.kodi-playing"
    )
  ) {
    Name = document.querySelector("div.playing-title");
    timeElapsed = document.querySelector("div.playing-time-current");
    timeDuration = document.querySelector("div.playing-time-duration");
    (presenceData.smallImageKey = "repeat-one"),
      (presenceData.smallImageText = "Repeating");
    presenceData.details = `Watching: ${Name.textContent}`;
    presenceData.state =
      `${timeElapsed.textContent}/${timeDuration.textContent}`;
  } else if (
    document.querySelector(
      "body.section-home.page-.active-player-kodi.kodi-shuffled-on.kodi-partymode-off.kodi-mute-off.kodi-repeat-all.kodi-media-video.kodi-paused"
    )
  ) {
    Name = document.querySelector("div.playing-title");
    timeElapsed = document.querySelector("div.playing-time-current");
    timeDuration = document.querySelector("div.playing-time-duration");
    (presenceData.smallImageKey = "pause"),
      (presenceData.smallImageText = "Paused");
    presenceData.details = `Watching: ${Name.textContent}`;
    presenceData.state = "Paused";
  } else if (
    document.querySelector(
      "body.section-home.page-.active-player-kodi.kodi-shuffled-on.kodi-partymode-off.kodi-mute-off.kodi-repeat-one.kodi-media-video.kodi-paused"
    )
  ) {
    Name = document.querySelector("div.playing-title");
    timeElapsed = document.querySelector("div.playing-time-current");
    timeDuration = document.querySelector("div.playing-time-duration");
    (presenceData.smallImageKey = "pause"),
      (presenceData.smallImageText = "Paused");
    presenceData.details = `Watching: ${Name.textContent}`;
    presenceData.state = "Paused";
  } else {
    Name = document.querySelector("div.playing-title");
    (Artist = document.querySelector("div.playing-subtitle")),
      (timeElapsed = document.querySelector("div.playing-time-current"));
    timeDuration = document.querySelector("div.playing-time-duration");
    (presenceData.smallImageKey = "play"),
      (presenceData.smallImageText = "Playing");
    presenceData.details = `${Name.textContent} - ${Artist.textContent}`;
    presenceData.state =
      `${timeElapsed.textContent}/${timeDuration.textContent}`;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else 
    presence.setActivity(presenceData);
  
});
