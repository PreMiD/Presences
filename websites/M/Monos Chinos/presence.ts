type PageAction = {
  id: string;
  path: string;
  text: string;
  icon?: string;
};

type VideoContext = {
  elapsed: number;
  duration: number;
  ended: boolean;
  paused: boolean;
};

const presence = new Presence({
    clientId: "707389880505860156"
  }),
  strings = presence.getStrings({
    playing: "presence.playback.playing",
    paused: "presence.playback.paused",
    browsing: "presence.activity.browsing",
    searching: "presence.activity.searching",
    episode: "presence.media.info.episode"
  });
let video: VideoContext = null,
  lastVideoOption = 1;

presence.on("iFrameData", async (context: VideoContext) => {
  video = context;
});

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "logo"
    },
    browsingData: PresenceData = {
      largeImageKey: "logo",
      details: (await strings).browsing,
      smallImageKey: "browsing",
      smallImageText: (await strings).browsing
    },
    actions: PageAction[] = [
      {
        id: "episode",
        path: "/ver",
        text: (await strings).playing
      },
      {
        id: "seasonList",
        path: "/emision",
        text: "viendo lista de emisión",
        icon: "season"
      },
      {
        id: "directory",
        path: "/animes",
        text: "viendo el directorio",
        icon: "directory"
      },
      {
        id: "directoryAnime",
        path: "/anime/",
        text: "viendo lista de episodios",
        icon: "directory"
      },
      {
        id: "search",
        path: "/search",
        text: (await strings).searching,
        icon: "search"
      }
    ];
  let action: PageAction = null;

  for (const [i, info] of actions.entries()) {
    if (document.location.pathname.startsWith(info.path)) {
      action = actions[i];
      break;
    }
  }

  if (action === null) Object.assign(data, browsingData);
  else if (action.id === "episode") {
    const detailsPattern = /^([^\d]+).* (\d+).+$/,
      detailsMatch = document
        .querySelector(".Title-epi")
        .textContent.match(detailsPattern);

    if (!detailsMatch) return presence.setActivity(browsingData);

    const [title, episode] = detailsMatch.slice(1);

    Object.assign(data, {
      details: title,
      state: (await strings).episode.replace("{0}", episode),
      smallImageKey: "browsing",
      smallImageText: "viendo el capitulo"
    });

    const currentOptionElement = document.querySelector(
        ".TPlayerNv > .Button.Current"
      ),
      currentOption = currentOptionElement
        ? parseInt(
            currentOptionElement
              .getAttribute("data-tplayernv")
              .match(/Opt(\d+)/i)[1]
          )
        : -1;

    if (currentOption !== -1 && currentOption !== lastVideoOption) {
      lastVideoOption = currentOption;
      video = null;
    }

    if (!video || (video && video.ended)) return presence.setActivity(data);

    const [startTimestamp, endTimestamp] = presence.getTimestamps(
      Math.floor(video.elapsed),
      Math.floor(video.duration)
    );

    Object.assign(data, {
      smallImageKey: video.paused ? "paused" : "playing",
      smallImageText: (await strings)[video.paused ? "paused" : "playing"]
    } as PresenceData);

    if (!video.paused) {
      Object.assign(data, {
        startTimestamp,
        endTimestamp
      });
    }
  } else {
    if (
      document.location.pathname.includes("/anime/") &&
      document.querySelector("h1.Title")
    )
      data.state = document.querySelector("h1.Title").textContent;

    Object.assign(data, {
      details: action.text,
      smallImageKey: action.icon,
      smallImageText: action.text
    } as PresenceData);
  }

  presence.setActivity(data);
});
