const presence = new Presence({
    clientId: "702375041320484944"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

let search: string,
  title: string,
  director: string,
  video: HTMLElement,
  Name: string;

function getSeconds(videoTime: string, videoDuration: string) {
  const a = videoTime.split(":"),
    b = videoDuration.split(":");

  return presence.getTimestamps(
    Math.floor(+a[0] * 60 * 60 + +a[1] * 60 + +a[2]),
    Math.floor(+b[0] * 60 * 60 + +b[1] * 60 + +b[2])
  );
}

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
    presenceData.startTimestamp = browsingTimestamp;
  } else if (document.location.pathname === "/movie/results/") {
    // Searching Part
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
    // Watching Movie
    title = document.querySelector(
      "#UIMovieSummary > ul > li > div.block2 > a > h3"
    ).textContent;
    const count = document
      .querySelector("div.professionals")
      .getElementsByTagName("div").length;
    director = document.querySelector(
      `div.professionals > div:nth-child(${count - count / 3} ) > div.prof > p`
    ).textContent;
    video = document.querySelector("#icons-and-text > div#play.show");
    const end = document.querySelector(
      "#controlbar > div.durations > div.content-duration"
    ).textContent;
    Name = document.querySelector(
      "#UIMovieSummary > ul > li > div.block2 > div.info > p:nth-child(1)"
    ).firstChild.nodeValue;
    if (!video && end !== "--:--:--") {
      [presenceData.startTimestamp, presenceData.endTimestamp] = getSeconds(
        document.querySelector(
          "#controlbar > div.durations > div.watched-duration"
        ).textContent,
        end
      );
      presenceData.details = `${title} (${Name})`;
      presenceData.state = director;
      presenceData.smallImageKey = "play";
      presenceData.smallImageText = "playing";
    } else if (video !== null && end !== "--:--:--") {
      presenceData.details = `${title} (${Name})`;
      presenceData.state = director;
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
      presenceData.smallImageKey = "pause";
      presenceData.smallImageText = "paused";
    } else {
      presenceData.details = `${title} (${Name})`;
      presenceData.startTimestamp = browsingTimestamp;
      presenceData.state = director;
      presenceData.smallImageKey = "search";
      presenceData.smallImageText = "Browsing";
    }
  } else if (document.location.pathname === "/privacy/") {
    // Viewing other non-important pages
    presenceData.details = "Viewing privacy";
    presenceData.startTimestamp = browsingTimestamp;
  } else if (document.location.pathname === "/terms/") {
    presenceData.details = "Viewing terms of service";
    presenceData.startTimestamp = browsingTimestamp;
  } else if (document.location.pathname === "/adblocker/") {
    presenceData.details = "Look at the adblock turn off page";
    presenceData.startTimestamp = browsingTimestamp;
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Turning off Adblock";
  } else if (document.location.pathname === "/intro/") {
    presenceData.details = "Selecting Language";
    presenceData.startTimestamp = browsingTimestamp;
  } else if (document.location.pathname === "/launcher/") {
    presenceData.details = "Viewing Menu";
    presenceData.startTimestamp = browsingTimestamp;
  } else if (document.location.pathname === "/login/") {
    presenceData.details = "Logining In";
    presenceData.startTimestamp = browsingTimestamp;
  } else if (document.location.pathname === "/register/") {
    presenceData.details = "Signing Up";
    presenceData.startTimestamp = browsingTimestamp;
  } else if (document.location.pathname === "/movie/speedtest/") {
    presenceData.details = "Running A Speed Test";
    presenceData.startTimestamp = browsingTimestamp;
  } else if (document.location.pathname === "/e500/") {
    presenceData.details = "Logging a Bug.";
    presenceData.startTimestamp = browsingTimestamp;
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Logging a Bug";
  } else if (
    document.location.pathname === "/movie-clip/playlist/browse/clip/"
  ) {
    presenceData.details = "Viewing Movie Clips";
    presenceData.startTimestamp = browsingTimestamp;
  } else if (document.location.pathname.includes("/feed")) {
    if (document.location.pathname === "/feed/home/") {
      presenceData.details = "Viewing your feed.";
      presenceData.startTimestamp = browsingTimestamp;
    } else {
      presenceData.details = `Viewing: ${
        document.querySelector("#UIFeedSidebar > div.quickinfo > h2")
          .textContent
      }`;
      presenceData.startTimestamp = browsingTimestamp;
    }
  } else if (
    document.location.pathname === "/movie-clip/playlist/browse/music-video/"
  ) {
    presenceData.details = "Viewing music videos";
    presenceData.startTimestamp = browsingTimestamp;
  } else if (document.location.pathname === "/account/") {
    presenceData.details = "Viewing account details";
    presenceData.startTimestamp = browsingTimestamp;
  } else {
    presenceData.details = "Unable to Read Page";
    presenceData.startTimestamp = browsingTimestamp;
  }
  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
