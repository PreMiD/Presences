const presence = new Presence({
  clientId: "808756700022702120"
});
async function getStrings() {
  return presence.getStrings(
    {
      play: "general.playing",
      pause: "general.paused",
      viewPlaylist: "general.buttonViewPlaylist",
      viewArtist: "general.buttonViewArtist"
    },
    await presence.getSetting<string>("lang").catch(() => "en")
  );
}

let fullscreen: boolean,
  player = false,
  currentTime,
  timeLeft,
  timestamps,
  playlistLink,
  artistLink,
  strings: Awaited<ReturnType<typeof getStrings>>,
  oldLang: string = null;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    [buttons, newLang, showPlaylist] = await Promise.all([
      presence.getSetting<boolean>("buttons"),
      presence.getSetting<string>("lang").catch(() => "en"),
      presence.getSetting<boolean>("showPlaylist")
    ]);

  if (oldLang !== newLang || !strings) {
    oldLang = newLang;
    strings = await getStrings();
  }
  player = document.querySelector(
    "body > div#root > music-app.hydrated > div.BAibzabUKijQgULVQbqCf > div#transport._333T0bVoft6GGOqUYjsnIA > div._3l2xsX5-KkYUgDHJDu-L0r > music-horizontal-item"
  )
    ? true
    : false;

  if (player) {
    document.querySelector(
      "div._2kGtEHAlQ5t5sY3jvz-wwl > div._1Wgs9MKFGuL58IFgKSM811 > div._2HXusrWftEtKAYukKt5IuO > music-button"
    )
      ? (fullscreen = true)
      : (fullscreen = false);
    if (fullscreen) {
      const title = document
          .querySelector(
            "#transport > div._3l2xsX5-KkYUgDHJDu-L0r.box > music-horizontal-item"
          )
          .shadowRoot.querySelector("div > div.center > music-link")
          .getAttribute("title"),
        [artist] = document
          .querySelector("a.music-primary-text")
          .textContent.split(" - "),
        paused =
          document
            .querySelector(
              "#transport > div._2EZickYBrNGgbqeaZ5l5hr.box > music-button:nth-child(3)"
            )
            .shadowRoot.querySelector("button > music-icon").attributes[1]
            .textContent === "pause"
            ? false
            : true;
      currentTime = document.querySelector(
        "div.sXaGQzYs9WqImj2uxDCBs > span:nth-child(1)"
      ).textContent;
      timeLeft = document
        .querySelector("div.sXaGQzYs9WqImj2uxDCBs > span:nth-child(2)")
        .textContent.replace(" - ", "");

      timestamps = presence.getTimestamps(
        presence.timestampFromFormat(currentTime),
        presence.timestampFromFormat(timeLeft) +
          presence.timestampFromFormat(currentTime)
      );

      presenceData.details = title;
      presenceData.state = artist;
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused ? strings.pause : strings.play;
      presenceData.largeImageKey = "logo";
      presenceData.endTimestamp = timestamps.pop();

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }

      if (title && artist) presence.setActivity(presenceData);
    } else {
      playlistLink = document
        .querySelector(
          "music-app.hydrated > div.BAibzabUKijQgULVQbqCf > div._333T0bVoft6GGOqUYjsnIA > div._3l2xsX5-KkYUgDHJDu-L0r > music-horizontal-item"
        )
        ?.shadowRoot.querySelector("div > div > span")
        .children[2]?.querySelector("a")?.href;

      artistLink = document
        .querySelector(
          "music-app.hydrated > div.BAibzabUKijQgULVQbqCf > div._333T0bVoft6GGOqUYjsnIA > div._3l2xsX5-KkYUgDHJDu-L0r > music-horizontal-item"
        )
        ?.shadowRoot.querySelector("div > div > span")
        .children[0]?.querySelector("a")?.href;
      const title = document
          .querySelector(
            "body > div#root > music-app.hydrated > div.BAibzabUKijQgULVQbqCf > div#transport._333T0bVoft6GGOqUYjsnIA > div._3l2xsX5-KkYUgDHJDu-L0r > music-horizontal-item"
          )
          .shadowRoot.querySelector(
            "div.item.parent-undefined > div.center > music-link.hydrated > a"
          ).textContent,
        [artist] = document
          .querySelector(
            "body > div#root > music-app.hydrated > div.BAibzabUKijQgULVQbqCf > div#transport._333T0bVoft6GGOqUYjsnIA > div._3l2xsX5-KkYUgDHJDu-L0r > music-horizontal-item"
          )
          .shadowRoot.querySelector(
            "div.item.parent-undefined > div.center > span"
          )
          .textContent.split("-"),
        paused =
          document
            .querySelector(
              "#transport > div._2EZickYBrNGgbqeaZ5l5hr.box > music-button:nth-child(3)"
            )
            .shadowRoot.querySelector("button > music-icon").attributes[1]
            .textContent === "pause"
            ? false
            : true;
      [currentTime] = document
        .querySelector("div.sXaGQzYs9WqImj2uxDCBs._1KQKoAP31YB14fDTsoEmwh")
        .textContent.split(" - ");
      [, timeLeft] = document
        .querySelector("div.sXaGQzYs9WqImj2uxDCBs._1KQKoAP31YB14fDTsoEmwh")
        .textContent.split(" - ");
      timestamps = presence.getTimestamps(
        presence.timestampFromFormat(currentTime),
        presence.timestampFromFormat(timeLeft) +
          presence.timestampFromFormat(currentTime)
      );

      presenceData.details = title;
      presenceData.state = artist;
      presenceData.largeImageKey = "logo";
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused ? strings.pause : strings.play;
      presenceData.endTimestamp = timestamps.pop();

      if (showPlaylist && buttons && artistLink && playlistLink) {
        presenceData.buttons = [
          {
            label: strings.viewArtist,
            url: artistLink
          },
          {
            label: strings.viewPlaylist,
            url: playlistLink
          }
        ];
      } else if (artistLink) {
        presenceData.buttons = [
          {
            label: strings.viewArtist,
            url: artistLink
          }
        ];
      }

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }

      if (title && artist) presence.setActivity(presenceData);
    }
  } else {
    presenceData.details = "Browsing...";
    presenceData.largeImageKey = "logo";
    presence.setActivity(presenceData);
  }
});
