const presence = new Presence({
    clientId: "861544419005169675"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let iframeData: {
  currTime: number;
  duration: number;
  paused: boolean;
} = null;

presence.on(
  "iFrameData",
  (data: { currTime: number; duration: number; paused: boolean }) => {
    iframeData = data;
  }
);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "my_anime_list_logo",
    startTimestamp: browsingStamp
  },
    { pathname } = document.location;

  if (pathname === "/") {
    if (document.location.search) {
      presenceData.details = `Searching for ${document.location.search.substring(
        3
      )}`;
    } else presenceData.details = "Exploring MyAnimeList.vip";
  } else if (pathname === "/animes-legendado")
    presenceData.details = "Searching for Subs";
  else if (pathname === "/animes-dublado")
    presenceData.details = "Searching for Dubs";
  else if (pathname === "/filme") presenceData.details = "Searching for movies";
  else if (pathname.startsWith("/animes/")) {
    const iframe = document.querySelector("iframe");
    if (!iframe) {
      const title: HTMLHeadingElement = document.querySelector(
        "section.titlePosts > h1"
      );
      presenceData.details = "Checking Synopsis";
      if (title) presenceData.state = title.innerText;
      presenceData.buttons = [
        {
          label: "Check Synopsis",
          url: document.location.href
        }
      ];
    } else {
      const title: HTMLHeadingElement = document.querySelector(
        "section.titlePost > h1"
      );
      if (title) {
        presenceData.details = title.innerText.substring(
          0,
          title.innerText.indexOf("Episódio")
        );
        presenceData.state = title.innerText.substring(
          title.innerText.indexOf("Episódio")
        );
      }
      if (iframeData && !iframeData.paused) {
        [, presenceData.endTimestamp] = presence.getTimestamps(
          iframeData.currTime,
          iframeData.duration
        );
      }
      presenceData.buttons = [
        {
          label: "Watch Episode",
          url: document.location.href
        }
      ];
    }
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
