var genericStyle = "font-weight: 800; padding: 2px 5px; color: white;";

function PMD_info(message) {
  console.log(
    "%cPreMiD%cINFO%c " + message,
    genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;",
    genericStyle + "border-radius: 0 25px 25px 0; background: #5050ff;",
    "color: unset;"
  );
}

function PMD_error(message) {
  console.log(
    "%cPreMiD%cERROR%c " + message,
    genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;",
    genericStyle + "border-radius: 0 25px 25px 0; background: #ff5050;",
    "color: unset;"
  );
}

function PMD_success(message) {
  console.log(
    "%cPreMiD%cSUCCESS%c " + message,
    genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;",
    genericStyle +
      "border-radius: 0 25px 25px 0; background: #50ff50; color: black;",
    "color: unset;"
  );
}

var presence = new Presence({
  clientId: "619561001234464789", // CLIENT ID FOR YOUR PRESENCE
  mediaKeys: false
}),
 
strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused"
});

var title : any, uploader : any, search : any;
 
// the video variable is a html video element
var video : any, videoDuration : any, videoCurrentTime : any, progress : any, progressduration : any, progress2 : any, progressduration2 : any, pause : any;
 
var browsingStamp = Math.floor(Date.now()/1000);
 
var playback : boolean;

presence.on("UpdateData", async () => {
 
// Get the video
video = document.querySelector("#main > div > div.Root__top-container > div.Root__now-playing-bar > footer > div.now-playing-bar > div.now-playing-bar__left > div > div > div.track-info__artists.ellipsis-one-line > span > span > span > a");
 
if (video !== null) {
  if (video.href.includes("/show/")) {
    playback = true;
  } else {
    playback = false;
  }
} else {
  playback = false;
}

if (!playback) {
 
  presenceData: presenceData = {
    largeImageKey: "spotify"
  }
 
  presenceData.startTimestamp = browsingStamp;

  if (document.location.hostname == "open.spotify.com" && document.querySelector("#main > div > div.Root__top-container > div.Root__now-playing-bar > footer > div > div.now-playing-bar__center > div > div.player-controls__buttons > button.control-button.spoticon-pause-16.control-button--circled") == null) {
    if (document.location.pathname.includes("browse/featured")) {
      presenceData.details = "Browsing through the";
      presenceData.state = "featured songs";
      presenceData.smallImageKey = "reading";
  
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("browse/podcasts")) {
      presenceData.details = "Browsing through the";
      presenceData.state = "best podcasts";
      presenceData.smallImageKey = "reading";
  
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("browse/charts")) {
      presenceData.details = "Browsing through";
      presenceData.state = "the charts";
      presenceData.smallImageKey = "reading";
  
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("browse/genres")) {
      presenceData.details = "Browsing through";
      presenceData.state = "the genres";
      presenceData.smallImageKey = "reading";
  
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("browse/newreleases")) {
      presenceData.details = "Browsing through the";
      presenceData.state = "latest releases";
      presenceData.smallImageKey = "reading";
  
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("browse/discover")) {
      presenceData.details = "Discovering new songs";
      delete presenceData.state;
      presenceData.smallImageKey = "reading";
  
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/search/")) {
      search = document.querySelector("#main > div > div.Root__top-container > div.Root__main-view > div.main-view-container > div > div > section > div.Search__header > div > div > input");
      presenceData.details = "Searching for:";
      presenceData.state = search.value;
      presenceData.smallImageKey = "search";
  
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/search")) {
      presenceData.details = "Searching for";
      presenceData.state = "new songs";
      presenceData.smallImageKey = "search";
  
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("collection/playlists")) {
      presenceData.details = "Browsing through";
      presenceData.state = "their playlists";
      presenceData.smallImageKey = "reading";
  
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("collection/made-for-you")) {
      presenceData.details = "Browsing through";
      presenceData.state = "\"Made for you\"";
      presenceData.smallImageKey = "reading";
  
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("collection/tracks")) {
      presenceData.details = "Browsing through";
      presenceData.state = "songs that they like";
      presenceData.smallImageKey = "reading";
  
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("collection/albums")) {
      presenceData.details = "Browsing through";
      presenceData.state = "albums that they like";
      presenceData.smallImageKey = "reading";
  
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("collection/artists")) {
      presenceData.details = "Browsing through";
      presenceData.state = "artists that they like";
      presenceData.smallImageKey = "reading";
  
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("collection/podcasts")) {
      presenceData.details = "Browsing through";
      presenceData.state = "podcasts that they like";
      presenceData.smallImageKey = "reading";
  
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/playlist/")) {
      search = document.querySelector("#main > div > div.Root__top-container > div.Root__main-view > div.main-view-container > div > div > div > div > section > div > div > div.col-xs-12.col-lg-3.col-xl-4 > div > header > div > div > div > div > div.mo-info > div > div > span");
      presenceData.details = "Viewing playlist:";
      presenceData.state = search.innerText;
      delete presenceData.smallImageKey;
  
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/settings")) {
      presenceData.details = "Viewing their settings";
      delete presenceData.state;
      delete presenceData.smallImageKey;
  
      presence.setActivity(presenceData);
    } else {
      presence.setActivity();
      presence.setTrayTitle()
    }
  } else if (document.location.hostname == "open.spotify.com" && document.querySelector("#main > div > div.Root__top-container > div.Root__now-playing-bar > footer > div > div.now-playing-bar__center > div > div.player-controls__buttons > button.control-button.spoticon-pause-16.control-button--circled") !== null) {
  } else if (document.location.hostname == "support.spotify.com") {
    presenceData.details = "Browsing through the";
    presenceData.state = "Support Center";
    presenceData.smallImageKey = "reading";

    presence.setActivity(presenceData);

  } else if (document.location.hostname == "investors.spotify.com") {
    presenceData.details = "Browsing through the";
    presenceData.state = "Support Center";
    presenceData.smallImageKey = "reading";

    presence.setActivity(presenceData);

  } else if (document.location.hostname == "developer.spotify.com") {
    presenceData.details = "Browsing through the";
    presenceData.state = "Spotify for Developers";
    presenceData.smallImageKey = "reading";

    presence.setActivity(presenceData);

  } else if (document.location.hostname == "artists.spotify.com") {
    presenceData.details = "Browsing through the";
    presenceData.state = "Spotify for Artists";
    presenceData.smallImageKey = "reading";

    presence.setActivity(presenceData);

  } else if (document.location.hostname == "newsroom.spotify.com") {
    presenceData.details = "Browsing through the";
    presenceData.state = "Spotify for Newsroom";
    presenceData.smallImageKey = "reading";

    presence.setActivity(presenceData);

  } else if (document.location.hostname == "www.spotify.com") {
    if (document.location.pathname.includes("/premium")) {
      presenceData.details = "Looking at";
      presenceData.state = "Spotify Premium";
      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/download")) {
      presenceData.details = "Downloading Spotify";
      delete presenceData.state;
      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/account")) {
      presenceData.details = "Looking at";
      presenceData.state = "their account";
      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    }  else {
      presence.setActivity();
      presence.setTrayTitle();
    }

  } else {
    
    presence.setActivity();
    presence.setTrayTitle();

  }
} else {
 
progress = document.querySelector("#main > div > div.Root__top-container > div.Root__now-playing-bar > footer > div > div.now-playing-bar__center > div > div.playback-bar > div:nth-child(1)");
progress2 = progress.innerText.split(":");
progressduration = document.querySelector("#main > div > div.Root__top-container > div.Root__now-playing-bar > footer > div > div.now-playing-bar__center > div > div.playback-bar > div:nth-child(3)");
progressduration2 = progressduration.innerText.split(":");

videoCurrentTime = (progress2[0] * 60) + +progress2[1];
videoDuration = (progressduration2[0] * 60) + +progressduration2[1];

if (document.querySelector("#main > div > div.Root__top-container > div.Root__now-playing-bar > footer > div > div.now-playing-bar__center > div > div.player-controls__buttons > button.control-button.spoticon-play-16.control-button--circled") !== null) {
  pause = true;
} else {
  pause = false;
}

var timestamps = getTimestamps(
  Math.floor(videoCurrentTime),
  Math.floor(videoDuration)
),
 
presenceData: presenceData = {
  details: "",
  state: "",
  largeImageKey: "spotify",
  smallImageKey: pause ? "pause" : "play", // if the video is paused, show the pause icon else the play button
  smallImageText: pause ? "Paused" : "Playing",
  startTimestamp: timestamps[0],
  endTimestamp: timestamps[1]
};
 
// Get title, can get the document.querySelector thing with the tips i sent you
title = document.querySelector("#main > div > div.Root__top-container > div.Root__now-playing-bar > footer > div > div.now-playing-bar__left > div > div.track-info.ellipsis-one-line > div.track-info__name.ellipsis-one-line > div > span > a");
 
 
// Get the views number
uploader = document.querySelector("#main > div > div.Root__top-container > div.Root__now-playing-bar > footer > div > div.now-playing-bar__left > div > div.track-info.ellipsis-one-line > div.track-info__artists.ellipsis-one-line > span > span > span > a");
 
// Set presence details to the title (innerText - gets the text from the <strong> tag in this case)
presenceData.details = title.innerText;
 
 
// Set presence state to views value
presenceData.state = uploader.innerText;
 
 
//* Remove timestamps if paused
if (document.querySelector("#main > div > div.Root__top-container > div.Root__now-playing-bar > footer > div > div.now-playing-bar__center > div > div.player-controls__buttons > button.control-button.spoticon-play-16.control-button--circled") !== null) {
 
  delete presenceData.startTimestamp;
  delete presenceData.endTimestamp;
 
}
 
//* If tags are not "null"
if (title !== null && uploader !== null) {
  presence.setActivity(presenceData, !video.paused);
}
 
}

});
 
function getTimestamps(videoTime: number, videoDuration: number) {
var startTime = Date.now();
var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
return [Math.floor(startTime / 1000), endTime];
}