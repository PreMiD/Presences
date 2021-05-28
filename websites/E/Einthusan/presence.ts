const presence = new Presence({
    clientId: "702375041320484944"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let search: string,
  title: string,
  director: string,
  video: HTMLVideoElement,
  Name: string;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };
  /* TODO:
    1. Check if the Movie Variables is Nessisary
    2. Create a Presence Dashboard
    3. Publish
    */
  if (document.location.pathname === "/movie/browse/") {
    presenceData.details = "Browsing Movies";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname === "/movie/results/") {
    search = document.querySelector(
      "#content > div.results-info > h5 > span"
    ).textContent;
    presenceData.details = `Searching: ${search}`;
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "searching";
    presenceData.state = "Movie";
  } else if (
    document.location.pathname === "/movie-clip/results/music-video/"
  ) {
    search = document.querySelector(
      "#content > div.results-info > h5 > span"
    ).textContent;
    presenceData.details = `Searching: ${search}`;
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "searching";
    presenceData.state = "Music Video";
  } else if (
    document.location.pathname === "/movie-clip/playlist/results/music-video/"
  ) {
    search = document.querySelector(
      "#content > div.results-info > h5 > span"
    ).textContent;
    presenceData.details = `Searching: ${search}`;
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "searching";
    presenceData.state = "Music Video Playlist";
  } else if (document.location.pathname === "/movie-clip/results/clip/") {
    search = document.querySelector(
      "#content > div.results-info > h5 > span"
    ).textContent;
    presenceData.details = `Searching: ${search}`;
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "searching";
    presenceData.state = "Movie Clip";
  } else if (
    document.location.pathname === "/movie-clip/playlist/results/clip/"
  ) {
    search = document.querySelector(
      "#content > div.results-info > h5 > span"
    ).textContent;
    presenceData.details = `Searching: ${search}`;
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "searching";
    presenceData.state = "Movie Clip Playlist";
  } else if (document.location.pathname.indexOf("/movie/watch/") === 0) {
    title = document.querySelector(
      "#UIMovieSummary > ul > li > div.block2 > a > h3"
    ).textContent;
    const containerDiv = document.querySelector("div.professionals"),
      count = containerDiv.getElementsByTagName("div").length,
      countby3 = count / 3;
    director = document.querySelector(
      `div.professionals > div:nth-child(${count - countby3} ) > div.prof > p`
    ).textContent;
    video = document.querySelector("#icons-and-text > div#play.show");
    const start = document.querySelector(
        "#controlbar > div.durations > div.watched-duration"
      ).textContent,
      end = document.querySelector(
        "#controlbar > div.durations > div.content-duration"
      ).textContent,
      // var timestamps = getTimestamps(Math.floor(start), Math.floor(end));
      div = document.querySelector(
        "#UIMovieSummary > ul > li > div.block2 > div.info > p:nth-child(1)"
      );
    Name = div.firstChild.nodeValue;
    if (video === null && end !== "--:--:--") {
      const startFormat = presence.timestampFromFormat(start),
        endFormat = presence.timestampFromFormat(end),
        [, endTimestamp] = presence.getTimestamps(startFormat, endFormat);
      presenceData.details = `${title} (${Name})`;
      presenceData.state = director;
      presenceData.smallImageKey = "play";
      presenceData.smallImageText = "playing";
      presenceData.endTimestamp = endTimestamp;
    } else if (video !== null && end !== "--:--:--") {
      presenceData.details = `${title} (${Name})`;
      presenceData.state = director;
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
      presenceData.smallImageKey = "pause";
      presenceData.smallImageText = "paused";
    } else {
      presenceData.details = `${title} (${Name})`;
      presenceData.startTimestamp = browsingStamp;
      presenceData.state = director;
      presenceData.smallImageKey = "search";
      presenceData.smallImageText = "Browsing";
    }
  } else if (document.location.pathname === "/privacy/") {
    presenceData.details = "Viewing privacy";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname === "/terms/") {
    presenceData.details = "Viewing terms of service";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname === "/adblocker/") {
    presenceData.details = "Look at the adblock turn off page";
    presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Turning off Adblock";
  } else if (document.location.pathname === "/intro/") {
    presenceData.details = "Selecting Language";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname === "/launcher/") {
    presenceData.details = "Viewing Menu";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname === "/login/") {
    presenceData.details = "Logining In";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname === "/register/") {
    presenceData.details = "Signing Up";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname === "/movie/speedtest/") {
    presenceData.details = "Running A Speed Test";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname === "/e500/") {
    presenceData.details = "Logging a Bug.";
    presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Logging a Bug";
  } else if (
    document.location.pathname === "/movie-clip/playlist/browse/clip/"
  ) {
    presenceData.details = "Viewing Movie Clips";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/feed")) {
    if (document.location.pathname === "/feed/home/") {
      presenceData.details = "Viewing your feed.";
      presenceData.startTimestamp = browsingStamp;
    } else {
      const profile = document.querySelector(
        "#UIFeedSidebar > div.quickinfo > h2"
      ).textContent;
      presenceData.details = `Viewing: ${profile}`;
      presenceData.startTimestamp = browsingStamp;
    }
  } else if (
    document.location.pathname === "/movie-clip/playlist/browse/music-video/"
  ) {
    presenceData.details = "Viewing music videos";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname === "/account/") {
    presenceData.details = "Viewing account details";
    presenceData.startTimestamp = browsingStamp;
  } else {
    presenceData.details = "Unable to Read Page";
    presenceData.startTimestamp = browsingStamp;
  }
  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
