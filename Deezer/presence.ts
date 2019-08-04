var presence = new Presence({
  clientId: "607651992567021580",
  mediaKeys: true
});
var strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused",
  live: "presence.activity.live"
});

var live, prevLive, elapsed;

presence.on("UpdateData", async () => {
  var player = document.querySelector("#page_player > div");

  if (player) {
    var player_button = document.querySelector(
      "#page_player > div > div.player-controls > ul > li:nth-child(3) > button"
    );
    var player_button_aria = player_button.getAttribute("aria-label");

    var paused = player_button_aria === "Play";

    var on_air = document.querySelector(
      "#page_player > div > div.player-track > div > div.track-heading > span"
    );

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
      var title = document.querySelector(
        "#page_player > div > div.player-track > div > div.track-heading > div.track-title > div > div > div > a:nth-child(1)"
      ).textContent;
      var author = document.querySelector(
        "#page_player > div > div.player-track > div > div.track-heading > div.track-title > div > div > div > a:nth-child(2)"
      ).textContent;
      var audioTime = document.querySelector(
        "#page_player > div > div.player-track > div > div.track-seekbar > div > div.slider-counter.slider-counter-current"
      ).textContent;
      var audioDuration = document.querySelector(
        "#page_player > div > div.player-track > div > div.track-seekbar > div > div.slider-counter.slider-counter-max"
      ).textContent;
      var timestamps = getTimestamps(audioTime, audioDuration);
    } else {
      var title = document.querySelector(
        "#page_player > div > div.player-track > div > div.track-heading > div.track-title > div > div > div"
      ).textContent;
      var author = "On Air";
      var timestamps: number[] = [elapsed, undefined];
    }

    var data: presenceData = {
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

      var playlist = document.querySelector(
        "#page_naboo_playlist > div.catalog-content > div > div.catalog-header > div.header-info.has-info-list > h1"
      );
      if (playlist) {
        details = "Viewing " + playlist.textContent;
        state = "Playlist";
      }

      var album = document.querySelector(
        "#page_naboo_album > div:nth-child(1) > div > div.catalog-header > div.header-info.has-info-list > h1"
      );
      if (album) {
        details = "Viewing " + album.textContent;
        state = "Album";
      }

      var artist = document.querySelector(
        "#page_naboo_artist > div.catalog-header > div > div.catalog-header-infos > div.header-infos.ellipsis > h1"
      );
      if (artist) {
        details = "Viewing " + artist.textContent;
        state = "Artist";
      }

      var podcast = document.querySelector(
        "#page_naboo_show > div.catalog-content > div > div.catalog-header > div.header-info > h1"
      );
      if (podcast) {
        details = "Viewing " + podcast.textContent;
        state = "Podcast";
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

presence.on("MediaKeys", (key: string) => {
  switch (key) {
    case "pause":
      var pause_button = document.querySelector(
        "#page_player > div > div.player-controls > ul > li:nth-child(3) > button"
      );
      pause_button.click();
      break;
    case "nextTrack":
      var next_button = document.querySelector(
        "#page_player > div > div.player-controls > ul > li:nth-child(5) > div > button"
      );
      next_button.click();
      break;
    case "previousTrack":
      var prev_button = document.querySelector(
        "#page_player > div > div.player-controls > ul > li:nth-child(1) > div > button"
      );
      prev_button.click();
      break;
  }
});

function getTimestamps(audioTime: string, audioDuration: string) {
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
