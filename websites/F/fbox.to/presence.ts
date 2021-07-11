const presence = new Presence({
    clientId: "861567034706100234"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

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
      startTimestamp: browsingStamp,
      largeImageKey: "fbox_logo"
    },
    { pathname } = document.location;

  if (pathname === "/") presenceData.details = "Browsing";
  else if (pathname.startsWith("/series/")) {
    const title: HTMLHeadingElement = document.querySelector(
        "#watch > div.container > div.watch-extra > div.bl-1 > section.info > div.info > h1"
      ),
      season: HTMLDataListElement = document.querySelector(
        "#episodes > div.bl-seasons > ul > li"
      ),
      date: HTMLSpanElement = season ? season.querySelector("span") : null,
      episode: HTMLAnchorElement = document.querySelector(
        ".episodes > li > a.active"
      );
    if (title) presenceData.details = title.innerText;
    if (season && date) {
      presenceData.state = season.innerText.substring(
        0,
        season.innerText.indexOf(date.innerText)
      );
      if (episode) presenceData.state += episode.innerText;
    }
    if (iFrameData && !iFrameData.paused) {
      [, presenceData.endTimestamp] = presence.getTimestamps(
        iFrameData.currTime,
        iFrameData.duration
      );
    }
    presenceData.buttons = [
      {
        label: "Watch Series",
        url: document.location.href
      }
    ];
  } else if (pathname.startsWith("/movie/")) {
    const title: HTMLHeadingElement = document.querySelector(
      "#watch > div.container > div.watch-extra > div.bl-1 > section.info > div.info > h1"
    );
    if (title) presenceData.details = title.innerText;
    if (iFrameData && !iFrameData.paused) {
      [, presenceData.endTimestamp] = presence.getTimestamps(
        iFrameData.currTime,
        iFrameData.duration
      );
    }
    presenceData.buttons = [
      {
        label: "Watch Movie",
        url: document.location.href
      }
    ];
  } else if (pathname === "/user/profile")
    presenceData.details = "Checking Profile";
  else if (pathname === "/user/watchlist")
    presenceData.details = "Checking Watchlist";
  else {
    const genre: HTMLHeadingElement = document.querySelector(
      "#body > div > div.col-left > section > div.heading > h1"
    );
    if (genre) presenceData.details = genre.innerText;
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
