var presence = new Presence({
    clientId: "787739407720513596"
}),

strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
});

/**
 * Get Timestamps (Credit to Bas950)
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
var browsingTimer = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
    var presenceData: presenceData = {
        largeImageKey: "logo-v2",
    };

    if (document.location.hostname == "animixplay.to") {
      if (document.location.pathname == "/") {

        urlParams = new URLSearchParams(window.location.search);

        if (urlParams.get("q")) {
          presenceData.startTimestamp = browsingTimer;
          presenceData.details = "Currently searching for...";
          presenceData.state = '"' + urlParams.get("q") + '"';
          presenceData.smallImageKey = "browsing-v1";
          presenceData.smallImageText = (await strings).browsing;
        } else if (urlParams.get("genre")) {
            presenceData.startTimestamp = browsingTimer;
            presenceData.details = "Currently exploring...";
            presenceData.state = "" + urlParams.get("genre").toLowerCase().replaceAll(",", " + ") + " related anime";
            presenceData.smallImageKey = "browsing-v1";
            presenceData.smallImageText = "Exploring...";
        } else if (urlParams.get("season") && urlParams.get("year")) {
            presenceData.startTimestamp = browsingTimer;
            presenceData.details = "Currently exploring...";
            presenceData.state = "" + urlParams.get("season").toLowerCase() + " " + urlParams.get("year").toLowerCase() + " anime";
            presenceData.smallImageKey = "browsing-v1";
            presenceData.smallImageText = "Exploring...";
        } else {
            presenceData.startTimestamp = browsingTimer;
            presenceData.details = "Currently browsing...";
            presenceData.smallImageKey = "browsing-v1";
            presenceData.smallImageText = (await strings).browsing;
        }
      } else if (document.location.pathname.includes("/v4/") || document.location.pathname.includes("/v1/") || document.location.pathname.includes("/v7/")) {
        var currentTime: any,
          duration: any,
          paused: any,
          timestamps: any,
          video: HTMLVideoElement;
        
        iframe = document.getElementById("iframeplayer");
        video = iframe.contentWindow.document.getElementsByTagName("video")[0];
        title = document.querySelector("#aligncenter > span.animetitle").textContent;

        currentTime = video.currentTime;
        duration = video.duration;
        paused = video.paused;

        const timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));

        if (!isNaN(duration)) {
          presenceData.smallImageKey = paused ? "pause-v1" : "play-v1";
          presenceData.smallImageText = paused
            ? (await strings).pause
            : (await strings).play;
          presenceData.startTimestamp = timestamps[0];
          presenceData.endTimestamp = timestamps[1];
          presenceData.details = "Currently watching...";
          presenceData.state = title;

          if (paused) {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
          }
        }
      } else if (document.location.pathname.includes("/anime/")) {
        animepagetitle = document.querySelector("#animepagetitle").textContent;
        animatepagetype = document.querySelector("#addInfo").textContent.split(" ")[5].trim(-1);
        presenceData.details = "Currently reading...";
        presenceData.state =  animepagetitle + " (" + animatepagetype + ")";
        presenceData.smallImageKey = "reading-v1";
        presenceData.smallImageText = "Reading...";
      }
    }

    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else {
        presence.setActivity(presenceData);
    }
});