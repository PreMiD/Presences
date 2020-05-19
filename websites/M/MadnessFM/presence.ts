const presence = new Presence({
  clientId: "701922288488022046"
});

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "mad"
  };

  if (document.location.pathname == "/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Choosing station";
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Choosing the best station";
  } else if (
    document.location.pathname == "/home.php" ||
    document.location.pathname == "/home"
  ) {
    presenceData.details = "Viewing the home page";
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Checking out the cool new advertisments!";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname == "/team") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the Team";
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Viewing the best DJs, Jack and Bobby!";
  } else if (document.location.pathname == "/schedule") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the Schedule";
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Seeing when GlobalHits is!";
  } else if (document.location.pathname == "/community") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the Community";
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Looking at the community!";
  } else if (document.location.pathname == "/getinvolved") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing how to get involved";
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Checking how I can become a DJ!";
  } else if (document.location.pathname == "/contactus") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Contact MadnessFM";
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "I need to contact Madness!";
  } else if (document.location.pathname == "/popoutplayer.php") {
    const play = document.querySelector(
      "#stream1 > div > div > div.ppBtn.play-btn"
    );
    const pause = document.querySelector(
      "#stream1 > div > div > div.ppBtn.playing.stop-btn"
    );
    const songTitle = document.querySelector(
      "#stream1 > div > div > div.player-ctr > div.track-info.animated > div.track-title.animated"
    ).textContent;
    const songArtist = document.querySelector(
      "#stream1 > div > div > div.player-ctr > div.track-info.animated > div.artist-name.animated"
    ).textContent;
    const dj = document.querySelector(
      "body > div.container > div > div.card-header.col-md-12.centertext.bg-danger > h5 > small"
    ).textContent;
    if (play != null) {
      //Set to Pause
      presenceData.details = songTitle + " by " + songArtist;
      presenceData.state = "DJ: " + dj;
      presenceData.smallImageKey = "pause";
      presenceData.smallImageText = "Paused";
      presenceData.startTimestamp = browsingStamp;
    } else if (pause != null) {
      // Set to Play
      presenceData.details = songTitle + " by " + songArtist;
      presenceData.state = "DJ: " + dj;
      presenceData.smallImageKey = "play";
      presenceData.smallImageText = "Listening...";
      presenceData.startTimestamp = browsingStamp;
    } else {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing:" + songTitle + " by " + songArtist;
      presenceData.state = "DJ: " + dj;
      presenceData.smallImageKey = "search";
      presenceData.smallImageText = "Who's on air?";
    }
  } else if (document.location.pathname == "/privacy") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing privacy";
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Checking my privacy!";
  } else if (document.location.pathname == "/tandcs") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing T&CS";
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Making sure I am following the rules";
  } else if (document.location.pathname == "/public") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing About Page";
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Whats MadnessFM about?";
  } else if (document.location.pathname == "/advertise") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Advertisements";
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Why not advertise?";
  } else if (document.location.pathname == "/keepusonair") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Keep Us On Air";
    presenceData.smallImageKey = "search";
    presenceData.smallImageText =
      "Please keep us on air! Our DJs need this station!";
  } else {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Error 1:";
    presenceData.state = "Unable to read the page.";
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Error 1";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
