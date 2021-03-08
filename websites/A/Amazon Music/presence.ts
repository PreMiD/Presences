interface LangStrings {
  play: string;
  pause: string;
  viewPlaylist: string;
  viewArtist: string;
}

const presence = new Presence({
    clientId: "808756700022702120"
  }),
  getStrings = async (): Promise<LangStrings> => {
    return presence.getStrings(
      {
        play: "general.playing",
        pause: "general.paused",
        viewPlaylist: "general.buttonViewPlaylist",
        viewArtist: "general.buttonViewArtist"
      },
      await presence.getSetting("lang")
    );
  };

let fullscreen: boolean,
  player = false,
  paused,
  currentTime,
  timeLeft,
  timestamps,
  playlistLink,
  artistLink,
  strings: Promise<LangStrings> = getStrings(),
  oldLang: string = null;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    buttons = await presence.getSetting("buttons"),
    newLang = await presence.getSetting("lang"),
    showPlaylist = await presence.getSetting("showPlaylist");

  if (!oldLang) {
    oldLang = newLang;
  } else if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }
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
      paused = pausedIcon.attributes[1].value == "pause" ? false : true;
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
      presenceData.smallImageText =
        paused == true ? (await strings).pause : (await strings).play;
      presenceData.largeImageKey = "logo";
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }

      if (title !== null && artist !== null) {
        presence.setActivity(presenceData);
      }
    } else {
      playlistLink = document
        .querySelector(
          "music-app.hydrated > div.BAibzabUKijQgULVQbqCf > div._333T0bVoft6GGOqUYjsnIA > div._3l2xsX5-KkYUgDHJDu-L0r > music-horizontal-item"
        )
        .shadowRoot.querySelector("div > div > span")
        .children[2].querySelector("a").href;

      artistLink = document
        .querySelector(
          "music-app.hydrated > div.BAibzabUKijQgULVQbqCf > div._333T0bVoft6GGOqUYjsnIA > div._3l2xsX5-KkYUgDHJDu-L0r > music-horizontal-item"
        )
        .shadowRoot.querySelector("div > div > span")
        .children[0].querySelector("a").href;
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
      paused = pausedIcon.attributes[1].value == "pause" ? false : true;
      currentTime = document
        .querySelector("div.sXaGQzYs9WqImj2uxDCBs._1KQKoAP31YB14fDTsoEmwh")
        .textContent.split(" - ")[0];
      timeLeft = document
        .querySelector("div.sXaGQzYs9WqImj2uxDCBs._1KQKoAP31YB14fDTsoEmwh")
        .textContent.split(" - ")[1];
      timestamps = presence.getTimestamps(
        presence.timestampFromFormat(currentTime),
        presence.timestampFromFormat(timeLeft) +
          presence.timestampFromFormat(currentTime)
      );

      presenceData.details = title;
      presenceData.state = artist;
      presenceData.largeImageKey = "logo";
      presenceData.startTimestamp = timestamps[0];
      presenceData.smallImageKey = paused == true ? "pause" : "play";
      presenceData.smallImageText =
        paused == true ? (await strings).pause : (await strings).play;
      presenceData.endTimestamp = timestamps[1];

      if (showPlaylist && buttons) {
        presenceData.buttons = [
          {
            label: (await strings).viewArtist,
            url: artistLink
          },
          {
            label: (await strings).viewPlaylist,
            url: playlistLink
          }
        ];
      } else {
        presenceData.buttons = [
          {
            label: (await strings).viewArtist,
            url: artistLink
          }
        ];
      }

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }

      if (title !== null && artist !== null) {
        presence.setActivity(presenceData);
      }
    }
  } else {
    presenceData.details = "Browsing...";
    presenceData.largeImageKey = "logo";
    presence.setActivity(presenceData);
  }
});