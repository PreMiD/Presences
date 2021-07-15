var presence = new Presence({
  clientId: "702375041320484944"
});
var browsingStamp = Math.floor(Date.now() / 1000);

var search: string,
  title: string,
  director: string,
  video: any,
  timestamps: any[];
let Name: any;

function getTimestamps(videoTime: number, videoDuration: number): any {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}
function getSeconds(videoTime: string, videoDuration: string): any {
  var a = videoTime.split(":");
  var b = videoDuration.split(":");
  var secondsStart = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
  var secondsEnd = +b[0] * 60 * 60 + +b[1] * 60 + +b[2];
  return (timestamps = getTimestamps(
    Math.floor(secondsStart),
    Math.floor(secondsEnd)
  ));
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
  if (document.location.pathname == "/movie/browse/") {
    presenceData.details = "Browsing Movies";
    presenceData.startTimestamp = browsingStamp;
  }
  // Searching Part
  else if (document.location.pathname == "/movie/results/") {
    search = document.querySelector(
      "#content > div.results-info > h5 > span"
    ).textContent;
    presenceData.details = "Searching: " + search;
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "searching";
    presenceData.state = "Movie";
  } else if (document.location.pathname == "/movie-clip/results/music-video/") {
    search = document.querySelector(
      "#content > div.results-info > h5 > span"
    ).textContent;
    presenceData.details = "Searching: " + search;
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "searching";
    presenceData.state = "Music Video";
  } else if (
    document.location.pathname == "/movie-clip/playlist/results/music-video/"
  ) {
    search = document.querySelector(
      "#content > div.results-info > h5 > span"
    ).textContent;
    presenceData.details = "Searching: " + search;
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "searching";
    presenceData.state = "Music Video Playlist";
  } else if (document.location.pathname == "/movie-clip/results/clip/") {
    search = document.querySelector(
      "#content > div.results-info > h5 > span"
    ).textContent;
    presenceData.details = "Searching: " + search;
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "searching";
    presenceData.state = "Movie Clip";
  } else if (
    document.location.pathname == "/movie-clip/playlist/results/clip/"
  ) {
    search = document.querySelector(
      "#content > div.results-info > h5 > span"
    ).textContent;
    presenceData.details = "Searching: " + search;
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "searching";
    presenceData.state = "Movie Clip Playlist";
  }

  // Watching Movie
  else if (document.location.pathname.indexOf("/movie/watch/") == 0) {
    title = document.querySelector(
      "#UIMovieSummary > ul > li > div.block2 > a > h3"
    ).textContent;
    var container_div = document.querySelector("div.professionals");
    var count = container_div.getElementsByTagName("div").length;
    director = document.querySelector(
      "div.professionals > div:nth-child(" +
        (count - count / 3) +
        " ) > div.prof > p"
    ).textContent;
    video = document.querySelector("#icons-and-text > div#play.show");
    var start = document.querySelector(
      "#controlbar > div.durations > div.watched-duration"
    ).textContent;
    var end = document.querySelector(
      "#controlbar > div.durations > div.content-duration"
    ).textContent;
    // var timestamps = getTimestamps(Math.floor(start), Math.floor(end));
    var div = document.querySelector(
      "#UIMovieSummary > ul > li > div.block2 > div.info > p:nth-child(1)"
    );
    Name = div.firstChild.nodeValue;
    if (video == null && end != "--:--:--") {
      timestamps = getSeconds(start, end);
      console.log(timestamps[0]);
      console.log(timestamps[1]);
      presenceData.details = title + " (" + Name + ")";
      presenceData.state = director;
      presenceData.smallImageKey = "play";
      presenceData.smallImageText = "playing";
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];
    } else if (video != null && end != "--:--:--") {
      presenceData.details = title + " (" + Name + ")";
      presenceData.state = director;
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
      presenceData.smallImageKey = "pause";
      presenceData.smallImageText = "paused";
    } else {
      presenceData.details = title + " (" + Name + ")";
      presenceData.startTimestamp = browsingStamp;
      presenceData.state = director;
      presenceData.smallImageKey = "search";
      presenceData.smallImageText = "Browsing";
    }
  }
  // Viewing other non-important pages
  else if (document.location.pathname == "/privacy/") {
    presenceData.details = "Viewing privacy";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname == "/terms/") {
    presenceData.details = "Viewing terms of service";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname == "/adblocker/") {
    presenceData.details = "Look at the adblock turn off page";
    presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Turning off Adblock";
  } else if (document.location.pathname == "/intro/") {
    presenceData.details = "Selecting Language";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname == "/launcher/") {
    presenceData.details = "Viewing Menu";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname == "/login/") {
    presenceData.details = "Logining In";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname == "/register/") {
    presenceData.details = "Signing Up";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname == "/movie/speedtest/") {
    presenceData.details = "Running A Speed Test";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname == "/e500/") {
    presenceData.details = "Logging a Bug.";
    presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Logging a Bug";
  } else if (
    document.location.pathname == "/movie-clip/playlist/browse/clip/"
  ) {
    presenceData.details = "Viewing Movie Clips";
    presenceData.startTimestamp = browsingStamp;
  }
  // Works Locally with mine but don't know if it will work for everyone
  else if (document.location.pathname.includes("/feed")) {
    if (document.location.pathname == "/feed/home/") {
      presenceData.details = "Viewing your feed.";
      presenceData.startTimestamp = browsingStamp;
    } else {
      var profile = document.querySelector(
        "#UIFeedSidebar > div.quickinfo > h2"
      ).textContent;
      presenceData.details = "Viewing: " + profile;
      presenceData.startTimestamp = browsingStamp;
    }
  } else if (
    document.location.pathname == "/movie-clip/playlist/browse/music-video/"
  ) {
    presenceData.details = "Viewing music videos";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname == "/account/") {
    presenceData.details = "Viewing account details";
    presenceData.startTimestamp = browsingStamp;
  } else {
    presenceData.details = "Unable to Read Page";
    presenceData.startTimestamp = browsingStamp;
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
