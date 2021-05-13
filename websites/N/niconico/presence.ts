{
  const presence = new Presence({
    clientId: "609220157910286346"
  });
  const strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
  });

  function getTimesec(
    elapsedString = "00:00",
    durationString = "00:00",
    separator = ":"
  ): { elapsedSec: number; durationSec: number } {
    const elapsed = elapsedString.split(separator);
    const duration = durationString.split(separator);

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

    return { elapsedSec: elapsedSec, durationSec: durationSec };
  }

  presence.on("UpdateData", async () => {
    switch (location.hostname) {
      case "www.nicovideo.jp": {
        if (
          location.pathname.startsWith("/watch/") &&
          document.querySelector(".VideoPlayer video")
        ) {
          const title = document.querySelector(".VideoTitle").textContent;

          const ownerElement =
            document.querySelector(".ChannelInfo-pageLink") ||
            document.querySelector(".VideoOwnerInfo-pageLink") ||
            null;
          let owner;
          if (ownerElement) {
            [, owner] = ownerElement.textContent.match(/(.+) さん$/) || [
              ownerElement.textContent
            ];
          } else {
            owner = "Deleted User";
          }

          const [videoId] = location.pathname.match(/..\d+$/);

          const isPlaying = !!document.querySelector(".PlayerPauseButton");

          const video: HTMLVideoElement =
            document.querySelector(".VideoPlayer video");
          const elapsedSec = Math.floor(video.currentTime);

          const presenceData: PresenceData = {
            details: title,
            state: `${owner} - ${videoId}`,
            largeImageKey: "niconico",
            smallImageKey: isPlaying ? "play" : "pause",
            smallImageText: isPlaying
              ? (await strings).play
              : (await strings).pause,
            startTimestamp: Math.floor(Date.now() / 1000) - elapsedSec
          };

          if (isPlaying) {
            presence.setTrayTitle(title);
          } else {
            delete presenceData.startTimestamp;
          }

          presence.setActivity(presenceData);
        }
        break;
      }

      case "live.nicovideo.jp":
      case "live2.nicovideo.jp": {
        if (location.pathname.startsWith("/watch/lv")) {
          const title = document.querySelector(
            "[class^='___title___']"
          ).textContent;
          const ownerElement =
            document.querySelector("[class^='___channel-name-anchor___']") ||
            document.querySelector("[class^='___group-name-anchor___']");
          const owner = ownerElement.textContent;
          const [liveId] = location.pathname.match(/lv\d+/);

          const elapsed = document.querySelector(
            "span[class^='___elapsed-time___'] span"
          ).textContent;

          const presenceData: PresenceData = {
            details: title,
            state: `${owner} - ${liveId}`,
            largeImageKey: "niconico",
            smallImageKey: "live",
            smallImageText: (await strings).live,
            startTimestamp:
              Math.floor(Date.now() / 1000) - getTimesec(elapsed).elapsedSec
          };

          presence.setActivity(presenceData);
        } else {
          presence.clearActivity();
        }
        break;
      }

      case "seiga.nicovideo.jp": {
        if (location.pathname.startsWith("/seiga/im")) {
          const title = document.querySelector(".title").textContent;
          const owner = document.querySelector(
            "#ko_watchlist_header.user .user_name strong"
          ).textContent;
          const [seigaId] = location.pathname.match(/im\d+/);

          const presenceData: PresenceData = {
            details: title,
            state: `${owner} - ${seigaId}`,
            largeImageKey: "niconico"
          };

          presence.setActivity(presenceData);
        } else if (location.pathname.startsWith("/watch/mg")) {
          const title = document.querySelector(".title").textContent;
          const owner = document.querySelector(".author_name").textContent;
          const [mangaId] = location.pathname.match(/mg\d+/);

          const presenceData: PresenceData = {
            details: title,
            state: `${owner} - ${mangaId}`,
            largeImageKey: "niconico"
          };

          presence.setActivity(presenceData);
        } else {
          presence.clearActivity();
        }
        break;
      }

      default:
        presence.clearActivity();
        break;
    }
  });
}
