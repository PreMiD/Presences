/* eslint-disable no-one-time-vars/no-one-time-vars */
interface PlayerData {
  time: {
    progress: number;
    duration: number;
    snowflake: number[];
  };
  title: string;
  episode: number;
  episodeName: string;
  playbackState: string;
}

const presence = new Presence({
    clientId: "826806766033174568"
  }),
  [, page] = window.location.pathname.split("/"),
  $ = (selectors: string) => document.querySelectorAll(selectors),
  initEpoch = Date.now(),
  rpaImage = {
    general: {
      account: "icon-g-account",
      browse: "icon-g-browse",
      read: "icon-g-read",
      search: "icon-g-search"
    },
    player: {
      play: "icon-p-play",
      pause: "icon-p-pause"
    }
  };
let playerData: PlayerData,
  pageLoaded = false;

presence.info("PreMiD extension has loaded");

function updateData() {
  if (page === "watch") {
    const player = <HTMLVideoElement>$("video#ao-video")[0],
      title = $('meta[name="ao-api-malsync-title"]')[0].getAttribute("value"),
      episode = Number(
        $('meta[name="ao-api-malsync-episode"]')[0].getAttribute("value")
      ),
      { paused, currentTime: progress, duration } = player,
      snowflake = presence.getTimestamps(progress, duration);
    playerData = {
      time: {
        progress,
        duration,
        snowflake
      },
      title,
      episode,
      episodeName: "",
      playbackState: paused ? "paused" : "playing"
    };
    if (document.body.contains(player) && !pageLoaded) pageLoaded = true;
  } else pageLoaded = true;
}
setInterval(updateData, 1e3);

presence.on("UpdateData", () => {
  if (!pageLoaded) return;
  let presenceData: PresenceData = {
    largeImageKey: "main-logo",
    smallImageKey: rpaImage.general.browse,
    smallImageText: "Browsing",
    details: "Browsing",
    startTimestamp: initEpoch
  };
  switch (page) {
    case "watch": {
      const { title, episode, episodeName, playbackState, time } = playerData,
        episodeUrl = new URL("https://animeonsen.xyz/watch");
      episodeUrl.searchParams.append(
        "v",
        new URL(window.location.href).searchParams.get("v")
      );
      episodeUrl.searchParams.append("ep", episode.toString());
      presenceData = {
        ...presenceData,
        smallImageKey:
          rpaImage.player[playbackState === "paused" ? "pause" : "play"],
        smallImageText: `Watching - ${
          playbackState[0].toUpperCase() + playbackState.substring(1)
        }`,
        details: title,
        state: `Episode ${episode}${episodeName ? ` - ${episodeName}` : ""}`,
        startTimestamp: time.snowflake[0],
        endTimestamp: time.snowflake[1],
        buttons: [{ label: "Watch", url: episodeUrl.href }]
      };
      break;
    }
    case "search": {
      presenceData.details = "Searching";
      presenceData.smallImageKey = rpaImage.general.search;
      presenceData.smallImageText = "Search Page";
      break;
    }
    case "account": {
      presenceData.details = "Managing account";
      presenceData.smallImageKey = rpaImage.general.account;
      presenceData.smallImageText = "Account Page";
      break;
    }
    case "about": {
      presenceData.details = "Reading";
      presenceData.smallImageKey = rpaImage.general.read;
      presenceData.smallImageText = "About Page";
      break;
    }
    case "cookies": {
      presenceData.details = "Reading";
      presenceData.smallImageKey = rpaImage.general.read;
      presenceData.smallImageText = "Cookies Page";
      break;
    }
    default:
      break;
  }
  presence.setActivity(presenceData);
});
