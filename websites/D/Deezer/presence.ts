var presence = new Presence({
  clientId: "607651992567021580"
});
var strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused",
  live: "presence.activity.live"
});

function getTimestamps(
  audioTime: string,
  audioDuration: string
): Array<number> {
  var splitAudioTime = audioTime.split(":");
  var splitAudioDuration = audioDuration.split(":");

  var parsedAudioTime =
    parseInt(splitAudioTime[0]) * 60 + parseInt(splitAudioTime[1]);
  var parsedAudioDuration =
    parseInt(splitAudioDuration[0]) * 60 + parseInt(splitAudioDuration[1]);

  var startTime = Date.now();
  var endTime =
    Math.floor(startTime / 1000) - parsedAudioTime + parsedAudioDuration;
  return [Math.floor(startTime / 1000), endTime];
}

var live, prevLive, elapsed, author, title, timestamps;

presence.on("UpdateData", async () => {
  var player = document.querySelector(".page-player");

  if (player) {
    var paused =
      document.querySelector(
        ".svg-icon-group-item:nth-child(3) .svg-icon-pause"
      ) === null;

    var on_air = document.querySelector(".track-label");

    if (on_air && on_air.textContent == "ON AIR") {
      live = true;
      if (prevLive !== live) {
        prevLive = live;
        elapsed = Math.floor(Date.now() / 1000);
      }
    } else {
      live = false;
    }

    if (!live) {
      title = document.querySelector(".track-link:nth-child(1)").textContent;
      author = document.querySelector(".track-link:nth-child(2)").textContent;
      var audioTime = document.querySelector(".slider-counter-current")
        .textContent;
      var audioDuration = document.querySelector(".slider-counter-max")
        .textContent;
      timestamps = getTimestamps(audioTime, audioDuration);
    } else {
      title = document.querySelector(".marquee-content").textContent;
      author = "On Air";
      timestamps = [elapsed, undefined];
    }

    var data: PresenceData = {
      details: title,
      state: author,
      largeImageKey: "deezer",
      smallImageKey: paused ? "pause" : "play",
      smallImageText: paused ? (await strings).pause : (await strings).play,
      startTimestamp: timestamps[0],
      endTimestamp: timestamps[1]
    };

    if (live) {
      data.smallImageKey = "live";
      data.smallImageText = (await strings).live;
    }

    if (paused) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }

    if (timestamps[0] === timestamps[1]) {
      var details = "Browsing...";
      var state = undefined;

      var header = document.querySelector("div.header-infos.ellipsis > h1");

      var playlist = document.querySelector("#page_naboo_playlist");
      if (playlist) {
        details = "Viewing Playlist";
      }

      var album = document.querySelector("#page_naboo_album");
      if (album) {
        details = "Viewing Album";
      }

      var artist = document.querySelector("#page_naboo_artist");
      if (artist) {
        details = "Viewing Artist";
      }

      var podcast = document.querySelector("#page_naboo_podcast");
      if (podcast) {
        details = "Viewing Podcast";
      }

      if (header) {
        state = header.textContent;
      }

      presence.setActivity(
        {
          details: details,
          state: state,
          largeImageKey: "deezer"
        },
        true
      );
    } else if (title !== null && author !== null) {
      presence.setActivity(data, !paused);
    }
  } else {
    presence.clearActivity();
  }
});
