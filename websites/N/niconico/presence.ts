const presence = new Presence({
    clientId: "609220157910286346"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
  });

function getTimesec(
  elapsedString = "00:00",
  durationString = "00:00",
  separator = ":"
): { elapsedSec: number; durationSec: number } {
  const elapsed = elapsedString.split(separator),
    duration = durationString.split(separator);

  let elapsedSec: number, durationSec: number;

  switch (elapsed.length) {
    case 3: {
      elapsedSec =
        parseInt(elapsed[0]) * 60 * 60 +
        parseInt(elapsed[1]) * 60 +
        parseInt(elapsed[2]);
      break;
    }
    case 2: {
      elapsedSec = parseInt(elapsed[0]) * 60 + parseInt(elapsed[1]);
      break;
    }
    case 1: {
      elapsedSec = parseInt(elapsed[0]);
      break;
    }
  }

  switch (duration.length) {
    case 3: {
      durationSec =
        parseInt(duration[0]) * 60 * 60 +
        parseInt(duration[1]) * 60 +
        parseInt(duration[2]);
      break;
    }
    case 2: {
      durationSec = parseInt(duration[0]) * 60 + parseInt(duration[1]);
      break;
    }
    case 1: {
      durationSec = parseInt(duration[0]);
      break;
    }
  }

  return { elapsedSec, durationSec };
}

presence.on("UpdateData", async () => {
  switch (location.hostname) {
    case "www.nicovideo.jp": {
      if (
        location.pathname.startsWith("/watch/") &&
        document.querySelector(".VideoPlayer video")
      ) {
        const title = document.querySelector(".VideoTitle").textContent,
          ownerElement =
            document.querySelector(".ChannelInfo-pageLink") ||
            document.querySelector(".VideoOwnerInfo-pageLink") ||
            null;
        let owner;
        if (ownerElement) {
          [, owner] = ownerElement.textContent.match(/(.+) さん$/) || [
            ownerElement.textContent
          ];
        } else owner = "Deleted User";

        const [videoId] = location.pathname.match(/..\d+$/),
          isPlaying = !!document.querySelector(".PlayerPauseButton"),
          presenceData: PresenceData = {
            details: title,
            state: `${owner} - ${videoId}`,
            largeImageKey: "niconico",
            smallImageKey: isPlaying ? "play" : "pause",
            smallImageText: isPlaying
              ? (await strings).play
              : (await strings).pause,
            startTimestamp:
              Math.floor(Date.now() / 1000) -
              Math.floor(
                document.querySelector(".VideoPlayer video").currentTime
              )
          };

        if (isPlaying) presence.setTrayTitle(title);
        else delete presenceData.startTimestamp;

        presence.setActivity(presenceData);
      }
      break;
    }

    case "live.nicovideo.jp":
    case "live2.nicovideo.jp": {
      if (location.pathname.startsWith("/watch/lv")) {
        const [liveId] = location.pathname.match(/lv\d+/);

        presence.setActivity({
          details: document.querySelector(
            " [class^='___program-title___'] span "
          ).textContent,
          state: `${
            document.querySelector("[class^='___channel-name-anchor___']") ||
            document.querySelector("[class^='___group-name-anchor___']")
              .textContent
          } - ${liveId}`,
          largeImageKey: "niconico",
          smallImageKey: "live",
          smallImageText: (await strings).live,
          startTimestamp:
            Math.floor(Date.now() / 1000) -
            getTimesec(
              document.querySelector(
                " span[class^='___time-score___'] span[class^='___value___'] "
              ).textContent
            ).elapsedSec
        });
      } else presence.clearActivity();

      break;
    }

    case "seiga.nicovideo.jp": {
      if (location.pathname.startsWith("/seiga/im")) {
        const [seigaId] = location.pathname.match(/im\d+/);
        presence.setActivity({
          details: document.querySelector(".title").textContent,
          state: `${
            document.querySelector(
              "#ko_watchlist_header.user .user_name strong"
            ).textContent
          } - ${seigaId}`,
          largeImageKey: "niconico"
        });
      } else if (location.pathname.startsWith("/watch/mg")) {
        const [mangaId] = location.pathname.match(/mg\d+/);
        presence.setActivity({
          details: document.querySelector(".title").textContent,
          state: `${
            document.querySelector(".author_name").textContent
          } - ${mangaId}`,
          largeImageKey: "niconico"
        });
      } else presence.clearActivity();

      break;
    }

    default:
      presence.clearActivity();
      break;
  }
});
