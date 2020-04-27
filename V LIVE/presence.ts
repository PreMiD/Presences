var genericStyle = "font-weight: 800; padding: 2px 5px; color: white;";

function PMD_info(message): void {
  console.log(
    "%cPreMiD%cINFO%c " + message,
    genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;",
    genericStyle + "border-radius: 0 25px 25px 0; background: #5050ff;",
    "color: unset;"
  );
}

var presence = new Presence({
    clientId: "614386371532161054" // CLIENT ID FOR YOUR PRESENCE
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
  });

PMD_info(
  "An error might be created in console when loading a page, it means that PreMiD is trying to get information too fast. (The information isn't loaded yet.) You may ignore the error if it is created, the presence should still work fine."
);

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

var title: any, uploader: any, search: any, livechecker: any;
var video: HTMLVideoElement;
var browsingStamp = Math.floor(Date.now() / 1000);
var playback: boolean;

presence.on("UpdateData", async () => {
  // Get the video
  video = document.querySelector("video._hide_controls");

  playback = video ? true : false;

  if (!playback) {
    const pdata: presenceData = {
      largeImageKey: "vlive2"
    };

    pdata.startTimestamp = browsingStamp;

    if (
      document.location.hostname == "www.vlive.tv" &&
      document.location.pathname == "/home/new"
    ) {
      pdata.details = "Browsing through the";
      pdata.smallImageKey = "reading";
      pdata.state = "new video's page";

      presence.setActivity(pdata);
    } else if (
      document.location.hostname == "www.vlive.tv" &&
      document.location.pathname == "/home/my"
    ) {
      pdata.details = "Browsing through their";
      pdata.smallImageKey = "reading";
      pdata.state = "followers recent uploads";

      presence.setActivity(pdata);
    } else if (
      document.location.hostname == "www.vlive.tv" &&
      document.location.pathname.includes("/home/chart")
    ) {
      pdata.details = "Browsing through";
      pdata.smallImageKey = "reading";
      pdata.state = "the charts page";

      presence.setActivity(pdata);
    } else if (
      document.location.hostname == "www.vlive.tv" &&
      document.location.pathname == "/upcoming"
    ) {
      pdata.details = "Browsing through";
      pdata.smallImageKey = "reading";
      pdata.state = "the upcoming page";

      presence.setActivity(pdata);
    } else if (
      document.location.hostname == "www.vlive.tv" &&
      document.location.pathname == "/channels"
    ) {
      pdata.details = "Browsing through";
      pdata.smallImageKey = "reading";
      pdata.state = "the channels page";

      presence.setActivity(pdata);
    } else if (
      document.location.hostname == "www.vlive.tv" &&
      document.location.pathname == "/events"
    ) {
      pdata.details = "Browsing through";
      pdata.smallImageKey = "reading";
      pdata.state = "the events page";

      presence.setActivity(pdata);
    } else if (
      document.location.hostname == "www.vlive.tv" &&
      document.location.pathname.includes("/vstore")
    ) {
      pdata.details = "Browsing through";
      pdata.smallImageKey = "reading";
      pdata.state = "the store page";

      presence.setActivity(pdata);
    } else if (
      document.location.hostname == "www.vlive.tv" &&
      document.location.pathname.includes("/product/")
    ) {
      search = document.querySelector(
        "#content > div.title_series_home > div > div > div > div.series_info > div.series_tit > h3"
      );
      uploader = document.querySelector(
        "#content > div.title_series_home > div > div > div > div.series_info > div.series_tit > div > span:nth-child(2) > a"
      );

      pdata.details = "Looking at product by " + uploader.innerText;
      pdata.smallImageKey = "reading";
      pdata.state = search.innerText;

      presence.setActivity(pdata);
    } else if (
      document.location.hostname == "www.vlive.tv" &&
      document.location.pathname == "/my/profile"
    ) {
      pdata.details = "Editting their";
      pdata.smallImageKey = "search";
      pdata.state = "own profile";

      presence.setActivity(pdata);
    } else if (
      document.location.hostname == "www.vlive.tv" &&
      document.location.pathname == "/my/fanship"
    ) {
      pdata.details = "Looking at their";
      pdata.smallImageKey = "reading";
      pdata.state = "fanships subscriptions";

      presence.setActivity(pdata);
    } else if (
      document.location.hostname == "www.vlive.tv" &&
      document.location.pathname == "/my/watched"
    ) {
      pdata.details = "Looking at their";
      pdata.smallImageKey = "reading";
      pdata.state = "watched videos";

      presence.setActivity(pdata);
    } else if (
      document.location.hostname == "www.vlive.tv" &&
      document.location.pathname.includes("/my/purchased")
    ) {
      pdata.details = "Looking at their";
      pdata.smallImageKey = "reading";
      pdata.state = "recent purchases";

      presence.setActivity(pdata);
    } else if (
      document.location.hostname == "www.vlive.tv" &&
      document.location.pathname == "/my/coin"
    ) {
      pdata.details = "Looking at their";
      pdata.smallImageKey = "reading";
      pdata.state = "coin balance";

      presence.setActivity(pdata);
    } else if (
      document.location.hostname == "www.vlive.tv" &&
      document.location.pathname == "/my/devices"
    ) {
      pdata.details = "Looking at their";
      pdata.smallImageKey = "reading";
      pdata.state = "connected devices";

      presence.setActivity(pdata);
    } else if (
      document.location.hostname == "www.vlive.tv" &&
      document.location.pathname == "/my"
    ) {
      pdata.details = "Looking at their";
      pdata.smallImageKey = "reading";
      pdata.state = "profile page";

      presence.setActivity(pdata);
    } else if (
      document.location.hostname == "www.vlive.tv" &&
      document.location.pathname == "/my/channels"
    ) {
      pdata.details = "Looking at their";
      pdata.smallImageKey = "reading";
      pdata.state = "followed channels";

      presence.setActivity(pdata);
    } else if (
      document.location.hostname == "www.vlive.tv" &&
      document.location.pathname.includes("/search/")
    ) {
      search = document.querySelector("#search_txt3");

      pdata.details = "Searching for:";
      pdata.smallImageKey = "search";
      pdata.state = search.value;

      presence.setActivity(pdata);
    } else if (
      document.location.hostname == "channels.vlive.tv" &&
      document.location.pathname.includes("/home")
    ) {
      search = document.querySelector("#container > channel > div > div > h2");

      pdata.details = "Watching the home page";
      pdata.smallImageKey = "reading";
      pdata.state = "of " + search.innerText + "'s channel";

      presence.setActivity(pdata);
    } else if (
      document.location.hostname == "channels.vlive.tv" &&
      document.location.pathname.includes("/video")
    ) {
      search = document.querySelector("#container > channel > div > div > h2");

      pdata.details = "Watching the video page";
      pdata.smallImageKey = "reading";
      pdata.state = "of " + search.innerText + "'s channel";

      presence.setActivity(pdata);
    } else if (
      document.location.hostname == "channels.vlive.tv" &&
      document.location.pathname.includes("/celeb/")
    ) {
      search = document.querySelector("div p span.se-fs-");
      uploader = document.querySelector(
        "#container > smarteditor-view > div > div.header > div > smarteditor-channel-info > div > div.info > a > div.info_area > div"
      );
      const test = uploader.innerText.replace("celeb", "");

      pdata.details = "Reading an article by " + test;
      pdata.smallImageKey = "reading";
      pdata.state = search.innerText;

      presence.setActivity(pdata);
    } else if (
      document.location.hostname == "channels.vlive.tv" &&
      document.location.pathname.includes("/celeb")
    ) {
      search = document.querySelector("#container > channel > div > div > h2");

      pdata.details = "Watching the post page";
      pdata.smallImageKey = "reading";
      pdata.state = "of " + search.innerText + "'s channel";

      presence.setActivity(pdata);
    } else if (
      document.location.hostname == "channels.vlive.tv" &&
      document.location.pathname.includes("/fan")
    ) {
      search = document.querySelector("#container > channel > div > div > h2");

      pdata.details = "Watching the fan page";
      pdata.smallImageKey = "reading";
      pdata.state = "of " + search.innerText + "'s channel";

      presence.setActivity(pdata);
    } else if (
      document.location.hostname == "channels.vlive.tv" &&
      document.location.pathname.includes("/about")
    ) {
      search = document.querySelector("#container > channel > div > div > h2");

      pdata.details = "Watching the about page";
      pdata.smallImageKey = "reading";
      pdata.state = "of " + search.innerText + "'s channel";

      presence.setActivity(pdata);
    } else if (
      document.location.hostname == "www.vlive.tv" &&
      document.location.pathname.includes("/fanship/")
    ) {
      search = document.querySelector(
        "#content > div.ticket_section > div > div.ticket_info_area > div > div > h4"
      );
      const test = search.innerText.replace("+", "");

      pdata.details = "Watching the fanship page";
      pdata.smallImageKey = "reading";
      pdata.state = "of " + test;

      presence.setActivity(pdata);
    } else if (
      document.location.hostname == "www.vlive.tv" &&
      document.location.pathname.includes("/policies/")
    ) {
      pdata.details = "Reading the policies";
      pdata.smallImageKey = "reading";
      delete pdata.state;

      presence.setActivity(pdata);
    } else if (
      document.location.hostname == "channels.vlive.tv" &&
      document.location.pathname.includes("/vtoday/")
    ) {
      search = document.querySelector("span.se-fs-");
      uploader = document.querySelector(
        "#container > smarteditor-view > div > div.header > div > smarteditor-channel-info > div > div.info > a > div.info_area > div"
      );
      const test = uploader.innerText.replace("celeb", "");

      pdata.details = "Reading an article by " + test;
      pdata.smallImageKey = "reading";
      pdata.state = search.innerText;

      presence.setActivity(pdata);
    } else if (
      document.location.hostname == "vtoday.vlive.tv" &&
      document.location.pathname == "/home"
    ) {
      pdata.details = "Browsing the home";
      pdata.smallImageKey = "reading";
      pdata.state = "page of V Today";

      presence.setActivity(pdata);
    } else if (
      document.location.hostname == "vtoday.vlive.tv" &&
      document.location.pathname == "/exclusive"
    ) {
      pdata.details = "Browsing the exclusive";
      pdata.smallImageKey = "reading";
      pdata.state = "page of V Today";

      presence.setActivity(pdata);
    } else if (
      document.location.hostname == "vtoday.vlive.tv" &&
      document.location.pathname == "/celeb"
    ) {
      pdata.details = "Browsing the celeb";
      pdata.smallImageKey = "reading";
      pdata.state = "page of V Today";

      presence.setActivity(pdata);
    } else if (
      document.location.hostname == "vtoday.vlive.tv" &&
      document.location.pathname == "/music"
    ) {
      pdata.details = "Browsing the music";
      pdata.smallImageKey = "reading";
      pdata.state = "page of V Today";

      presence.setActivity(pdata);
    } else if (
      document.location.hostname == "vtoday.vlive.tv" &&
      document.location.pathname == "/tv"
    ) {
      pdata.details = "Browsing the tv";
      pdata.smallImageKey = "reading";
      pdata.state = "page of V Today";

      presence.setActivity(pdata);
    } else if (
      document.location.hostname == "vtoday.vlive.tv" &&
      document.location.pathname == "/photo"
    ) {
      pdata.details = "Browsing the photo";
      pdata.smallImageKey = "reading";
      pdata.state = "page of V Today";

      presence.setActivity(pdata);
    } else if (
      document.location.hostname == "www.vlive.tv" &&
      document.location.pathname.includes("/video/")
    ) {
      uploader = document.querySelector(
        "#content > div.vlive_section > div > div.vlive_top > div.star_profile > div.info_area > a"
      );
      search = document.querySelector(
        "#content > div.vlive_section > div > div.vlive_cont > div.vlive_area > div.vlive_info > strong"
      );
      livechecker = document.querySelector(
        "#content > div.vlive_section > div > div.vlive_cont > div.vlive_area > script"
      );

      if (livechecker.innerText.includes('"viewType" : "live"')) {
        pdata.details = uploader.innerText;
        pdata.smallImageKey = "live";
        pdata.state = search.innerText;
        delete pdata.startTimestamp;

        presence.setActivity(pdata);
      } else if (
        livechecker.innerText.includes('"viewType" : "liveComingSoon"')
      ) {
        pdata.details = "Waiting for livestream by " + uploader.innerText;
        pdata.smallImageKey = "live";
        pdata.state = search.innerText;
        delete pdata.startTimestamp;

        presence.setActivity(pdata);
      } else {
        pdata.details = "Waiting for video by " + uploader.innerText;
        pdata.smallImageKey = "pause";
        pdata.state = search.innerText;

        presence.setActivity(pdata);
      }
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  }

  // Check if it can find the video
  if (video !== null && !isNaN(video.duration)) {
    const timestamps = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      ),
      pdata: presenceData = {
        details: "",
        state: "",
        largeImageKey: "vlive2",
        smallImageKey: video.paused ? "pause" : "play", // if the video is paused, show the pause icon else the play button
        smallImageText: video.paused
          ? (await strings).pause // paused text when you hover the pause icon on discord
          : (await strings).play,
        startTimestamp: timestamps[0],
        endTimestamp: timestamps[1]
      };

    // Set presence details to the title (innerText - gets the text from the <strong> tag in this case)
    pdata.details = document.querySelector(
      "#content > div.vlive_section > div > div.vlive_cont > div.vlive_area > div.vlive_info > strong"
    ).textContent;

    // Set presence state to views value
    pdata.state = document.querySelector(
      "#content > div.vlive_section > div > div.vlive_top > div.star_profile > div.info_area > a"
    ).textContent;

    //* Remove timestamps if paused
    if (video.paused) {
      delete pdata.startTimestamp;
      delete pdata.endTimestamp;
    }

    //* If tags are not "null"
    if (title !== null && uploader !== null) {
      presence.setActivity(pdata, !video.paused);
    }
  }
});
