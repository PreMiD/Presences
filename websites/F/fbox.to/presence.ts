const presence = new Presence({
    clientId: "861567034706100234"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

let iFrameData: {
  currTime: number;
  duration: number;
  paused: boolean;
} = null;

presence.on(
  "iFrameData",
  (data: { currTime: number; duration: number; paused: boolean }) => {
    iFrameData = data;
  }
);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      startTimestamp: browsingTimestamp,
      largeImageKey: "fbox_logo"
    },
    { pathname } = document.location,
    buttons = await presence.getSetting<boolean>("buttons");

  if (pathname === "/") presenceData.details = "Browsing";
  else if (pathname.startsWith("/series/")) {
    const title: HTMLHeadingElement = document.querySelector(
        "#watch > div.container > div.watch-extra > div.bl-1 > section.info > div.info > h1"
      ),
      season: HTMLDataListElement = document.querySelector(
        "#episodes > div.bl-seasons > ul > li.active"
      ),
      date: HTMLSpanElement = season ? season.querySelector("span") : null,
      episode: HTMLAnchorElement = document.querySelector(
        ".episodes > li > a.active"
      );
    if (title) presenceData.details = title.textContent;
    if (season && date) {
      presenceData.state = season.textContent.substring(
        0,
        season.textContent.indexOf(date.textContent)
      );
      if (episode) presenceData.state += episode.textContent;
    }
    if (iFrameData && !iFrameData.paused) {
      [, presenceData.endTimestamp] = presence.getTimestamps(
        iFrameData.currTime,
        iFrameData.duration
      );
      presenceData.smallImageKey = "play";
    } else presenceData.smallImageKey = "pause";
    if (buttons) {
      presenceData.buttons = [
        {
          label: "Watch Series",
          url: document.location.href
        }
      ];
    }
  } else if (pathname.startsWith("/movie/")) {
    const title: HTMLHeadingElement = document.querySelector(
      "#watch > div.container > div.watch-extra > div.bl-1 > section.info > div.info > h1"
    );
    if (title) presenceData.details = title.textContent;
    if (iFrameData && !iFrameData.paused) {
      [, presenceData.endTimestamp] = presence.getTimestamps(
        iFrameData.currTime,
        iFrameData.duration
      );
      presenceData.smallImageKey = "play";
    } else presenceData.smallImageKey = "pause";
    if (buttons) {
      presenceData.buttons = [
        {
          label: "Watch Movie",
          url: document.location.href
        }
      ];
    }
  } else if (pathname === "/user/profile")
    presenceData.details = "Checking Profile";
  else if (pathname === "/user/watchlist")
    presenceData.details = "Checking Watchlist";
  else {
    const genre: HTMLHeadingElement = document.querySelector(
      "#body > div > div.col-left > section > div.heading > h1"
    );
    if (genre) {
      presenceData.details = genre.textContent;
      presenceData.smallImageKey = "search";
    }
  }

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
