const presence = new Presence({
    clientId: "666412985513672715"
  }),
  browsingStamp = Math.floor(Date.now() / 1000),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

//! Songs timestamp will reset on new song (see further below)
let songTimestamp = Math.floor(Date.now() / 1000),
  currentTitle = "",
  lastTitle = "";

presence.on("UpdateData", async () => {
  //* Get customizable settings
  let format1 = await presence.getSetting("sFormat1"),
    format2 = await presence.getSetting("sFormat2"),
    info = await presence.getSetting("sInfo"),
    showElapsed = await presence.getSetting("tElapsed");

  //! Only needed due to a bug PreMiD has atm
  if (!info) {
    format1 = '"%song%"';
    format2 = "by %artist%";
    info = true;
    showElapsed = true;
  }

  const presenceData: PresenceData = {};

  //! Merch website
  if (document.location.hostname === "onlyhit.merchforall.com") {
    //* Show timestamp if the setting is enabled and set largeImageKey
    if (showElapsed) presenceData.startTimestamp = browsingStamp;
    else delete presenceData.startTimestamp;

    presenceData.largeImageKey = "logo_onlyhit";
    presenceData.smallImageKey = "reading";

    //* If they have site information enabled
    if (document.location.hash.includes("/cart"))
      presenceData.details = "Store - Viewing cart";
    else if (document.location.pathname === "/") {
      if (document.querySelector(".popup-container.active") !== null) {
        presenceData.details = "Store - Viewing product:";
        presenceData.state = document.querySelector(
          ".popup-container.active .product-title"
        ).textContent;
      } else {
        presenceData.details = "Browsing through";
        presenceData.state = "the store...";
      }
    }
  } else {
    //! Normal website
    //* Set largeImageKey to the radio type
    switch (document.querySelector(".stream-name").textContent) {
      case "OnlyHit Gold":
        presenceData.largeImageKey = "logo_gold";
        break;
      case "OnlyHit Japan":
        presenceData.largeImageKey = "logo_japan";
        break;
      case "OnlyHit K-Pop":
        presenceData.largeImageKey = "logo_k-pop";
        break;
      default:
        presenceData.largeImageKey = "logo_onlyhit";
        break;
    }

    //* Get track information
    const artist = document.querySelector(".artist").textContent,
      title = document.querySelector(".title").textContent,
      paused =
        (document.querySelector(".fa-pause.pause-button") as HTMLElement).style
          .cssText === "display: none;";

    //* Set state details and image to track information.
    presenceData.details = format1
      .replace("%song%", title)
      .replace("%artist%", artist);
    presenceData.state = format2
      .replace("%song%", title)
      .replace("%artist%", artist);
    presenceData.smallImageKey = paused ? "pause" : "play";
    presenceData.smallImageText = paused
      ? (await strings).pause
      : (await strings).play;

    //* Refresh timestamp if a new song is playing
    currentTitle = title;
    if (currentTitle !== lastTitle) {
      lastTitle = currentTitle;
      songTimestamp = Math.floor(Date.now() / 1000);
    }

    //* Show timestamp if the setting is enabled
    if (showElapsed) presenceData.startTimestamp = songTimestamp;
    else delete presenceData.startTimestamp;

    //* If they have site information enabled
    //! Check if user is on homepage or not
    if (
      document.location.pathname !== "/" &&
      !document.location.pathname.includes("video-version")
    ) {
      //* Show timestamp if the setting is enabled
      if (showElapsed) presenceData.startTimestamp = browsingStamp;
      else delete presenceData.startTimestamp;

      //* Get page title, and set smallImageText to track information
      const page = document.querySelector(".main_title").textContent.trim();
      presenceData.smallImageText = `"${title}" by ${artist}`;

      //* Show page information
      if (document.location.pathname.includes("/contact")) {
        presenceData.details = "Contacting OnlyHit";
        delete presenceData.state;
        presenceData.smallImageKey = "writing";
      } else if (page.includes("Request a Song")) {
        presenceData.details = "Requesting a song";
        presenceData.state = `for ${page.split(" - ")[0]}`;
        presenceData.smallImageKey = "writing";
      } else if (document.location.pathname.includes("/programs/")) {
        presenceData.details = "Viewing program:";
        presenceData.state = page;
        presenceData.smallImageKey = "reading";
      } else if (document.location.pathname.includes("/programs")) {
        presenceData.details = "Browsing through";
        presenceData.state = "the upcoming programs";
        presenceData.smallImageKey = "reading";
      } else if (document.location.pathname.includes("/played-tracks")) {
        presenceData.details = "Browsing through the";
        presenceData.state = "recently played tracks";
        presenceData.smallImageKey = "reading";
      } else if (document.location.pathname.includes("/team/")) {
        presenceData.details = "Viewing OnlyHit team member:";
        presenceData.state = page;
        presenceData.smallImageKey = "reading";
      } else if (document.location.pathname.includes("/team")) {
        presenceData.details = "Viewing the OnlyHit Team";
        delete presenceData.state;
        presenceData.smallImageKey = "reading";
      } else if (document.location.pathname.includes("/where-to-listen")) {
        presenceData.details = "Viewing where you can";
        presenceData.state = "listen to OnlyHit";
        presenceData.smallImageKey = "reading";
      } else if (document.location.pathname.includes("/discord-bot")) {
        presenceData.details = "Viewing the Discord Bot";
        delete presenceData.state;
        presenceData.smallImageKey = "reading";
      } else if (document.location.pathname.includes("/search")) {
        presenceData.details = "Searching for:";
        [, presenceData.state] = page.split('"');
        presenceData.smallImageKey = "search";
      } else {
        //* Show normal page information if there isn't a "special" one set above
        presenceData.details = "Viewing page:";
        presenceData.state = page;
        presenceData.smallImageKey = "reading";
      }
    }
  }

  //* Sets the presenceData, if there is no details it sets empty data (Which will still show "Playing OnlyHit")
  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
