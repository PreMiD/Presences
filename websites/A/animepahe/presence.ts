// Note: Developer has been working on a new website design for ages,
//       maybe at some point he'll finish it and this will need updating.

const presence = new Presence({
    clientId: "629355416714739732" // Contact if you want me to edit the discord assets/keys/whatever
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    episode: "presence.media.info.episode",
    browse: "presence.activity.browsing"
  });

let iframe_response = {
  paused: true,
  duration: 0,
  current_time: 0
};

type store_type = Record<string, { id: number; time: number }>;

class anime_storage {
  private list: store_type;

  public anime(title: string, playing: boolean) {
    if (this.list[title]) return this.list[title].id;
    else if (playing) return undefined;
    else {
      const share_link = document.getElementsByClassName("modal-body")[1]
        .lastElementChild.lastElementChild as HTMLAnchorElement;

      this.list[title] = {
        id: parseInt(share_link.href.split("/a/")[1]),
        time: Date.now()
      };

      // Removes the oldest stored anime if the store length has exceeded 10
      if (Object.keys(this.list).length === 11)
        delete this.list[
          Object.entries(Object.assign({}, this.list)).sort(
            (a, b) => a[1].time - b[1].time
          )[0][0]
        ];

      localStorage.setItem("presence_data", btoa(JSON.stringify(this.list)));
    }
  }

  constructor() {
    let storage: store_type | string | null =
      localStorage.getItem("presence_data");
    if (storage) {
      storage = JSON.parse(atob(storage));

      this.list = storage as store_type;
    } else this.list = {};
  }
}

const anime_store = new anime_storage();

function getTimes(time: number): Record<string, number> {
  let seconds = Math.round(time),
    minutes = Math.floor(seconds / 60);

  seconds -= minutes * 60;

  const hours = Math.floor(minutes / 60);

  minutes -= hours * 60;

  return {
    sec: seconds,
    min: minutes,
    hrs: hours
  };
}

function lessTen(digit: number): string {
  return digit < 10 ? "0" : "";
}

function getTimestamp(time: number): string {
  const { sec, min, hrs } = getTimes(time);

  return hrs > 0
    ? hrs + ":" + lessTen(min) + min + ":" + lessTen(sec) + sec
    : min + ":" + lessTen(sec) + sec;
}

presence.on(
  "iFrameData",
  (data: { paused: boolean; duration: number; current_time: number }) => {
    iframe_response = data;
  }
);

presence.on("UpdateData", async () => {
  const path = document.location.pathname,
    presenceData: PresenceData = {
      largeImageKey: "animepahe",
      details: "loading",
      state: "animepahe",
      startTimestamp: Math.floor(Date.now() / 1000)
    };

  // homepage / new releases
  if (!path.includes("anime")) {
    presenceData.smallImageKey = "presence_browsing_home";
    presenceData.smallImageText = (await strings).browse;
    presenceData.details = `${(await strings).browse.slice(
      0,
      -3
    )} Latest Releases`;
    presenceData.state = "animepahe";

    // a-z all browse
  } else if (path == "/anime") {
    presenceData.smallImageKey = "presence_browsing_all";
    presenceData.smallImageText = (await strings).browse;
    presenceData.details = `${(await strings).browse.slice(0, -3)} A-Z`;
    presenceData.state = "animepahe";

    // season browse
  } else if (!path.split("anime/")[1].includes("/")) {
    let type: string, anilist: string;

    for (const info of document.getElementsByClassName("anime-info")[0]
      .children) {
      // Not uniform info order... ugh
      if (info.children[0].textContent == "Type:")
        info.children[1].textContent == "TV"
          ? (type = "Season")
          : (type = info.children[1].textContent);
      if (info.children[0].textContent == "External Links:")
        anilist = (info.children[1] as HTMLAnchorElement).href;
    }

    const title =
      document.getElementsByClassName("title-wrapper")[0].children[1]
        .textContent;

    presenceData.smallImageKey = "presence_browsing_season";
    presenceData.smallImageText = (await strings).browse;
    presenceData.details = title;
    presenceData.state = `${(await strings).browse.slice(0, -3)} ${type}`;

    presenceData.buttons = [
      {
        label: "View on Pahe",
        url: `https://pahe.win/a/${anime_store.anime(title, false)}`
      },
      {
        label: "View on AniList",
        url: anilist
      }
    ];
  }

  // playback / episode
  if (path.split("/")[1] == "play") {
    const timestamps = presence.getTimestamps(
        Math.floor(iframe_response.current_time),
        Math.floor(iframe_response.duration)
      ),
      movie: boolean =
        document.getElementsByClassName("anime-status")[0].firstElementChild
          .textContent == "Movie",
      title =
        document.getElementsByClassName("theatre-info")[0].children[1]
          .children[1].textContent,
      episode = parseInt(
        document
          .getElementById("episodeMenu")
          .textContent.split("Episode ")[1]
          .replace(/^\s+|\s+$/g, "")
      );

    presenceData.smallImageKey = `presence_playback_${
      iframe_response.paused ? "paused" : "playing"
    }`;

    presenceData.smallImageText = iframe_response.paused
      ? (await strings).pause
      : (await strings).play;

    presenceData.details = `Watching ${
      !movie ? `${(await strings).episode.slice(0, -3)} ${episode} of ` : ""
    }${title}`;

    if (!iframe_response.paused) {
      presenceData.state = `${(await strings).play}`;
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];
    } else {
      presenceData.startTimestamp = null;
      presenceData.state = `${(await strings).pause} - ${getTimestamp(
        iframe_response.current_time
      )}`;
    }

    const anime_id = anime_store.anime(title, true);

    if (anime_id)
      presenceData.buttons = [
        {
          label: `Watch ${movie ? "Movie" : "Episode"}`,
          url: `https://pahe.win/a/${anime_id}/${episode}`
        }
      ];

    presence.setActivity(presenceData, true);
  } else {
    presence.setActivity(presenceData, false);
  }
});
