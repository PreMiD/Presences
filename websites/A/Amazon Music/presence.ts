const presence = new Presence({
    clientId: "808756700022702120"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

let fullscreen: boolean,
  player = false,
  paused,
  currentTime,
  timeLeft,
  timestamps;

presence.on("UpdateData", async () => {
  player =
    document.querySelector(
      "body > div#root > music-app.hydrated > div.BAibzabUKijQgULVQbqCf > div#transport._333T0bVoft6GGOqUYjsnIA > div._3l2xsX5-KkYUgDHJDu-L0r > music-horizontal-item"
    ) != undefined
      ? true
      : false;

  if (player == true) {
    const exitFSButton = document.querySelector(
      "div._2kGtEHAlQ5t5sY3jvz-wwl > div._1Wgs9MKFGuL58IFgKSM811 > div._2HXusrWftEtKAYukKt5IuO > music-button"
    );
    exitFSButton != null ? (fullscreen = true) : (fullscreen = false);
    if (fullscreen == true) {
      const title = document.querySelector("a.music-headline-2").textContent,
        artist = document
          .querySelector("a.music-primary-text")
          .textContent.split(" - ")[0],
        pausedIcon = document
          .querySelector("music-button.hydrated:nth-child(4)")
          .shadowRoot.querySelector("button > div > music-icon");
      (paused = pausedIcon.attributes[1].value == "pause" ? false : true),
        (currentTime = document.querySelector(
          "div.sXaGQzYs9WqImj2uxDCBs > span:nth-child(1)"
        ).textContent);
      timeLeft = document
        .querySelector("div.sXaGQzYs9WqImj2uxDCBs > span:nth-child(2)")
        .textContent.replace(" - ", "");

      timestamps = presence.getTimestamps(
        presence.timestampFromFormat(currentTime),
        presence.timestampFromFormat(timeLeft) +
          presence.timestampFromFormat(currentTime)
      );

      const data: PresenceData = {
        details: title,
        state: artist,
        smallImageKey: paused == true ? "pause" : "play",
        smallImageText:
          paused == true ? (await strings).pause : (await strings).play,
        largeImageKey: "logo",
        startTimestamp: timestamps[0],
        endTimestamp: timestamps[1]
      };

      if (paused) {
        delete data.startTimestamp;
        delete data.endTimestamp;
      }

      if (title !== null && artist !== null) {
        presence.setActivity(data);
      }
    } else {
      const title = document
          .querySelector(
            "body > div#root > music-app.hydrated > div.BAibzabUKijQgULVQbqCf > div#transport._333T0bVoft6GGOqUYjsnIA > div._3l2xsX5-KkYUgDHJDu-L0r > music-horizontal-item"
          )
          .shadowRoot.querySelector(
            "div.item.parent-undefined > div.center > music-link.hydrated > a"
          ).textContent,
        artist = document
          .querySelector(
            "body > div#root > music-app.hydrated > div.BAibzabUKijQgULVQbqCf > div#transport._333T0bVoft6GGOqUYjsnIA > div._3l2xsX5-KkYUgDHJDu-L0r > music-horizontal-item"
          )
          .shadowRoot.querySelector(
            "div.item.parent-undefined > div.center > span"
          )
          .textContent.split("-")[0],
        pausedIcon = document
          .querySelector("music-button.hydrated:nth-child(4)")
          .shadowRoot.querySelector("button > div > music-icon");
      (paused = pausedIcon.attributes[1].value == "pause" ? false : true),
        (currentTime = document
          .querySelector("div.sXaGQzYs9WqImj2uxDCBs._1KQKoAP31YB14fDTsoEmwh")
          .textContent.split(" - ")[0]);
      (timeLeft = document
        .querySelector("div.sXaGQzYs9WqImj2uxDCBs._1KQKoAP31YB14fDTsoEmwh")
        .textContent.split(" - ")[1]),
        (timestamps = presence.getTimestamps(
          presence.timestampFromFormat(currentTime),
          presence.timestampFromFormat(timeLeft) +
            presence.timestampFromFormat(currentTime)
        ));

      const data: PresenceData = {
        details: title,
        state: artist,
        largeImageKey: "logo",
        startTimestamp: timestamps[0],
        smallImageKey: paused == true ? "pause" : "play",
        smallImageText:
          paused == true ? (await strings).pause : (await strings).play,
        endTimestamp: timestamps[1]
      };

      if (paused) {
        delete data.startTimestamp;
        delete data.endTimestamp;
      }

      if (title !== null && artist !== null) {
        presence.setActivity(data);
      }
    }
  } else {
    const data: PresenceData = {
      details: "Browsing...",
      largeImageKey: "logo"
    };
    presence.setActivity(data);
  }
});
