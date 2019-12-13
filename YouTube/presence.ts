var presence = new Presence({
    clientId: "463097721130188830",
    mediaKeys: true
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
  });

var pattern = "•";
var truncateAfter = function (str, pattern) {
  return str.slice(0, str.indexOf(pattern));
} 

presence.on("UpdateData", async () => {
  //* If user is on /watch?v=...
  var video: HTMLVideoElement = document.querySelector(".video-stream");
  if (video !== null && !isNaN(video.duration)) {
    //* Get required tags
    var oldYouTube: boolean = null;
    var YouTubeTV: boolean = null;
    var YouTubeEmbed: boolean = null;
    var title: any;

    //* Checking if user has old YT layout.
    document.querySelector(".watch-title") !== null
      ? (oldYouTube = true)
      : (oldYouTube = false);

    document.querySelector(".player-video-title") !== null
      ? (YouTubeTV = true)
      : (YouTubeTV = false)

    document.location.pathname.includes("/embed")
      ? (YouTubeEmbed = true)
      : (YouTubeEmbed = false)

    //* Due to differences between old and new YouTube, we should add different selectors.
    if (!oldYouTube && !YouTubeTV) {
      if(YouTubeEmbed) {
        title = document.querySelector("div.ytp-title-text > a");
      }
      else {
        title =
          document.location.pathname !== "/watch"
            ? document.querySelector(".ytd-miniplayer .title")
            : document.querySelector("h1 yt-formatted-string.ytd-video-primary-info-renderer");
      }
    } else {
      if(oldYouTube) {
        if (document.location.pathname == "/watch")
          title = document.querySelector(".watch-title");
      } else if(YouTubeTV) {
        title = document.querySelector(".player-video-title");
      }
    }

    var uploaderTV : any, uploaderMiniPlayer : any, uploader2 : any, edited : boolean, uploaderEmbed : any;

    edited = false;

    uploaderTV = uploaderTV = document.querySelector(".player-video-details") || document.querySelector(".ytd-channel-name");

    uploaderEmbed = document.querySelector("div.ytp-title-expanded-heading > h2 > a");

    uploaderMiniPlayer = document.querySelector("yt-formatted-string#owner-name");

    if(uploaderMiniPlayer !== null) {

      if(uploaderMiniPlayer.innerText == "YouTube") {

        edited = true;

        uploaderMiniPlayer.setAttribute("premid-value", "Listening to a playlist");
        
      }

    }
    uploader2 = document.querySelector("#owner-name a");

    var uploader : any =
      uploaderMiniPlayer !== null && uploaderMiniPlayer.innerText.length > 0
          ? uploaderMiniPlayer
          : uploader2 !== null && uploader2.innerText.length > 0
            ? uploader2
            : document.querySelector("#upload-info yt-formatted-string.ytd-channel-name a") !== null 
              ? document.querySelector("#upload-info yt-formatted-string.ytd-channel-name a")
              : uploaderEmbed !== null && YouTubeEmbed && uploaderEmbed.innerText.length > 0
                ? uploaderEmbed
                  : uploaderTV = truncateAfter(uploaderTV.textContent.replace(/\s+/g, ''), pattern),
      timestamps = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      ),
      live = Boolean(document.querySelector(".ytp-live")),
      ads = Boolean(document.querySelector(".ytp-ad-player-overlay")),
      presenceData: presenceData = {
        details: title.textContent.replace(/\s+/g, '') == "" ? document.querySelector("div.ytp-title-text > a").textContent : title.textContent,
        state: edited == true
        ? uploaderMiniPlayer.getAttribute("premid-value")
        : uploaderTV !== null
          ? uploaderTV.textContent
          : uploader.textContent,
        largeImageKey: "yt_lg",
        smallImageKey: video.paused ? "pause" : "play", //general.playing general.paused
        smallImageText: video.paused
          ? (await strings).pause
          : (await strings).play,
        startTimestamp: timestamps[0],
        endTimestamp: timestamps[1]
      };

    presence.setTrayTitle(video.paused ? "" : title.innerText);

    //* Remove timestamps if paused or live
    if (video.paused || live) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;

      if (live) {
        presenceData.smallImageKey = "live";
        presenceData.smallImageText = (await strings).live; //general.live
      }
    }
    if (uploader == null && document.querySelector(".style-scope.ytd-channel-name > a") !== null) { // fixes issue with movies
      uploader = document.querySelector(".style-scope.ytd-channel-name > a");
      presenceData.state = uploader.textContent;
    }
    if (title == null && document.querySelector(".title.style-scope.ytd-video-primary-info-renderer") !== null) {
      title = document.querySelector(".title.style-scope.ytd-video-primary-info-renderer");
      presenceData.details = title.textContent;
    }   
    //* Update title to indicate when an ad is being played
    if (ads) {
      presenceData.details = "Currently watching an ad";//youtube.ad
      delete presenceData.state;
    }

    /*
    If (Hide title etc.) {
      general.watchingVid
      general.watchingLive
    }
    */



    //* If tags are not "null"
    uploader = uploader; 
    if (title !== null && uploader !== null) {
      presence.setActivity(presenceData);
    }
  } else if (document.location.hostname == "www.youtube.com") {
    let presenceData: presenceData = {
      largeImageKey: "yt_lg"
    };

    var search : any;
    var user : any;
    var browsingStamp = Math.floor(Date.now()/1000);

    if(document.location.pathname.includes("/results")) { //When searching something
      search = document.querySelector("#search-input > div > div:nth-child(2) > input");
      if (search == null) {
        search = document.querySelector("#search-input > input");
      }
      presenceData.details = "Searching for:";//general.searchFor
      presenceData.state = search.value;
      presenceData.smallImageKey = "search";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/channel") || document.location.pathname.includes("/user")) {
      user = document.querySelector(".ytd-channel-name").textContent.replace(/\s+/g, '');
      if (user == "" || user == "‌") {
        user = "null";
      } else {
        user = document.querySelector(".ytd-channel-name").textContent;
      }
      if (document.location.pathname.includes("/videos")) {
        presenceData.details = "Browsing through videos";//youtube.browsingVideos
        presenceData.state = "of channel: " + user;//youtube.ofChannel
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/playlists")) {
        presenceData.details = "Browsing through playlists";//youtube.browsingPlaylists
        presenceData.state = "of channel: " + user;//youtube.ofChannel
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/community")) {
        presenceData.details = "Viewing community posts";//youtube.viewingCommunityPost
        presenceData.state = "of channel: " + user;//youtube.ofChannel
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/about")) {
        presenceData.details = "Reading about channel:";//youtube.readingChannel
        presenceData.state = user;
        presenceData.smallImageKey = "reading";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/search")) {
        search = document.URL.split("search?query=")[1];
        presenceData.details = "Searching through channel: " + user;//youtube.searchChannel or for privacy general.searchSomething
        presenceData.state = "for: " + search;
        presenceData.smallImageKey = "search";
        presenceData.startTimestamp = browsingStamp;
      } else {
        presenceData.details = "Viewing channel:";//general.viewChannel
        presenceData.state = user; 
        presenceData.startTimestamp = browsingStamp;
      }
    } else if (document.location.pathname.includes("/feed/trending")) { 
      presenceData.details = "Viewing what's trending";//youtube.trending
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/feed/subscriptions")) {
      presenceData.details = "Browsing through";//youtube.browsingThrough
      presenceData.state = "their subscriptions";//youtube.subscriptions
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/feed/library")) {
      presenceData.details = "Browsing through";//youtube.browsingThrough
      presenceData.state = "their library";//youtube.library
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/feed/history")) {
      presenceData.details = "Browsing through";//youtube.browsingThrough
      presenceData.state = "their history";//youtube.history
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/feed/purchases")) { 
      presenceData.details = "Browsing through";//youtube.browsingThrough
      presenceData.state = "their purchases";//youtube.purchases
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/playlist")) { 
      presenceData.details = "Viewing playlist:";//general.viewPlaylist

      title = document.querySelector("#text-displayed");
      if (title == null) {
        title = document.querySelector("#title > yt-formatted-string > a");
      }

      presenceData.state = title.innerText;
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/premium")) {
      presenceData.details = "Reading about";//general.readingAbout
      presenceData.state = "Youtube Premium";
      presenceData.smallImageKey = "reading";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/gaming")) {
      presenceData.details = "Browsing through";//youtube.browsingThrough
      presenceData.state = "Youtube Gaming";
      presenceData.smallImageKey = "reading";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/account")) {
      presenceData.details = "Viewing their account";//general.viewAccount
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/reporthistory")) {
      presenceData.details = "Viewing their report history";//youtube.reportHistory
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/intl")) {
      presenceData.details = "Reading about:";//general.readingAbout
      title = document.querySelector("head > title");
      presenceData.state = title.innerText.replace(" - YouTube", "");
      presenceData.smallImageKey = "reading";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.URL == "https://www.youtube.com/") {
      presenceData.details = "Browsing the main page...";//general.viewHome
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/upload")) {
      presenceData.details = "Uploading something...";//youtube.upload
      presenceData.startTimestamp = browsingStamp;
      presenceData.smallImageKey = "writing";
    } else if (document.location.pathname.includes("/view_all_playlists")) {
      presenceData.details = "Viewing all their playlists";//youtube.viewAllPlaylist
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/my_live_events")) {
      presenceData.details = "Viewing their live events";//youtube.viewLiveEvents
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/live_dashboard")) {
      presenceData.details = "Viewing their live dashboard";//youtube.viewLiveDashboard
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/audiolibrary")) {
      presenceData.details = "Viewing the audio library";//youtube.viewAudioLibrary
      presenceData.startTimestamp = browsingStamp;
    }

    if (presenceData.details == null) {
      presence.setTrayTitle();
      presence.setActivity();
    } else {
      presence.setActivity(presenceData);
    } 
  } else if (document.location.hostname == "studio.youtube.com") {
    let presenceData: presenceData = {
      largeImageKey: "yt_lg",
      smallImageKey: "studio",
      smallImageText: "Youtube Studio"
    };
    
    var search : any;
    var user : any;
    var browsingStamp = Math.floor(Date.now()/1000);

    if (document.location.pathname.includes("/videos")) {
      presenceData.details = "Viewing their videos";//youtube.studio.viewVideos
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/video")) {
      title = document.querySelector("#entity-name");
      presenceData.startTimestamp = browsingStamp;
      if (document.location.pathname.includes("/edit")) {
        presenceData.details = "Editing video:";//youtube.studio.editVideo
        presenceData.state = title.innerText;
      } else if (document.location.pathname.includes("/analytics")) {
        presenceData.details = "Viewing analytics of video:";//youtube.studio.videoAnalytics
        presenceData.state = title.innerText;
      } else if (document.location.pathname.includes("/comments")) {
        presenceData.details = "Viewing comments of video:";//youtube.studio.videoComments
        presenceData.state = title.innerText;
      } else if (document.location.pathname.includes("/translations")) {
        presenceData.details = "Viewing translations of video:";//youtube.studio.videoTranslations
        presenceData.state = title.innerText;
      }
    } else if (document.location.pathname.includes("/analytics")) {
      presenceData.details = "Viewing their";//youtube.studio.viewTheir
      presenceData.state = "channel analytics";//youtube.studio.channelAnalytics
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/comments")) {
      presenceData.details = "Viewing their";//youtube.studio.viewTheir
      presenceData.state = "channel comments";//youtube.studio.channelComments
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/translations")) {
      presenceData.details = "Viewing their";//youtube.studio.viewTheir
      presenceData.state = "channel translations"; //youtube.studio.channelTranslations
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/channel")) {
      presenceData.details = "Viewing their dashboard"; //youtube.studio.dashboard
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/artist")) {
      presenceData.details = "Viewing their";//youtube.studio.viewTheir
      presenceData.state = "artist page"; //youtube.studio.artistPage
      presenceData.startTimestamp = browsingStamp;
    }

    if (presenceData.details == null) {
      presence.setTrayTitle();
      presence.setActivity();
    } else {
      presence.setActivity(presenceData);
    } 
  } 
});

presence.on("MediaKeys", (key: string) => {
  switch (key) {
    case "pause":
      var video = document.querySelector(".video-stream") as HTMLVideoElement;
      video.paused ? video.play() : video.pause();
      break;
    case "nextTrack":
      (document.querySelector(".ytp-next-button") as HTMLAnchorElement).click();
      break;
    case "previousTrack":
      (document.querySelector(".ytp-prev-button") as HTMLAnchorElement).click();
      break;
  }
});

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(videoTime: number, videoDuration: number) {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}