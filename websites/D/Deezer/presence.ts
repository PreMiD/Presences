const presence = new Presence({
    clientId: "607651992567021580"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
  });

function parseAudioTimestamps(
  audioTime: string,
  audioDuration: string
): Array<number> {
  const splitAudioTime = audioTime.split(":"),
    splitAudioDuration = audioDuration.split(":"),
    parsedAudioTime =
      parseInt(splitAudioTime[0]) * 60 + parseInt(splitAudioTime[1]),
    parsedAudioDuration =
      parseInt(splitAudioDuration[0]) * 60 + parseInt(splitAudioDuration[1]),
    startTime = Date.now(),
    endTime =
      Math.floor(startTime / 1000) - parsedAudioTime + parsedAudioDuration;
  return [Math.floor(startTime / 1000), endTime];
}

let live: boolean,
  prevLive: boolean,
  elapsed: number,
  author: string,
  title: string,
  timestamps: number[],
  parsedTimestamps: Array<number>;

presence.on("UpdateData", async () => {
  const player = document.querySelector(".page-player");

  if (player) {
    const paused =
        document.querySelector(
          ".svg-icon-group-item:nth-child(3) .svg-icon-pause"
        ) === null,
      on_air = document.querySelector(".track-label");

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
      const audioTime = document.querySelector(".slider-counter-current")
          .textContent,
        audioDuration = document.querySelector(".slider-counter-max")
          .textContent;
      parsedTimestamps = parseAudioTimestamps(audioTime, audioDuration);
      timestamps = presence.getTimestamps(
        parsedTimestamps[0],
        parsedTimestamps[1]
      );
    } else {
      title = document.querySelector(".marquee-content").textContent;
      author = "On Air";
      timestamps = [elapsed, undefined];
    }

    const data: PresenceData = {
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
      let details = "Browsing...",
        state = undefined;

      const header = document.querySelector("div.header-infos.ellipsis > h1"),
        playlist = document.querySelector("#page_naboo_playlist");
      if (playlist) {
        details = "Viewing Playlist";
      }

      const album = document.querySelector("#page_naboo_album");
      if (album) {
        details = "Viewing Album";
      }

      const artist = document.querySelector("#page_naboo_artist");
      if (artist) {
        details = "Viewing Artist";
      }

      const podcast = document.querySelector("#page_naboo_podcast");
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
