const presence = new Presence({
  clientId: "660519861742731264"
});

let strings: Awaited<ReturnType<typeof getStrings>>, timestamp: number;

presence.on("UpdateData", async () => {
  const path = window.location.pathname.split("/").slice(1),
    presenceData: PresenceData = {};

  strings = await getStrings();

  switch (path[0]) {
    // Search
    case "search":
      presenceData.details = new URLSearchParams(window.location.search).get(
        "term"
      );
      presenceData.state =
        document.querySelector<HTMLHeadingElement>("h1").textContent;
      presenceData.largeImageKey = "logo_big";
      presenceData.smallImageText = strings.search;
      presenceData.smallImageKey = "search";
      break;
    // Privacy policy, Imprint
    case "c":
      presenceData.details = document.title;
      presenceData.largeImageKey = "logo_big";
      break;
    // Startpage, Radio station, Region, Unknown
    default: {
      const region = [
          ...document.querySelectorAll<HTMLAnchorElement>(".region-btn")
        ]
          .filter(e => e.classList.contains("active"))[0]
          .pathname?.slice(1),
        station =
          document.querySelector<HTMLSpanElement>(".song-name")?.textContent;

      if (region && path[0] === region) {
        presenceData.details =
          document.querySelector<HTMLHeadingElement>("h1")?.textContent ??
          document.title;
        presenceData.largeImageKey = "logo_big";
      } else if (station) {
        // Check if the playing icon is shown
        if (
          document.querySelector<HTMLDivElement>(".playbutton-global-playing")
        ) {
          // Radio is playing / buffering
          timestamp ||= Date.now();

          presenceData.details = station;
          presenceData.largeImageKey = (
            document.querySelector<HTMLAnchorElement>(
              "#player-station-logo-link"
            ).children[0] as HTMLImageElement
          ).src;
          presenceData.smallImageText = strings.play;
          presenceData.smallImageKey = "play";
          presenceData.startTimestamp = timestamp;
        } else {
          // Radio is paused
          timestamp = 0;

          presenceData.details = station;
          presenceData.largeImageKey = (
            document.querySelector<HTMLAnchorElement>(
              "#player-station-logo-link"
            ).children[0] as HTMLImageElement
          ).src;
          presenceData.smallImageText = strings.pause;
          presenceData.smallImageKey = "pause";
        }
      }
      break;
    }
  }

  presence.setActivity(presenceData);
});

async function getStrings() {
  return presence.getStrings(
    {
      play: "general.playing",
      pause: "general.paused",
      search: "general.searching",
      browsing: "general.browsing"
    },
    await presence.getSetting<string>("lang").catch(() => "en")
  );
}
