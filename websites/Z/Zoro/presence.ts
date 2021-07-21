const presence = new Presence({
    clientId: "859440340683325491"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let data: {
  currTime: number;
  duration: number;
  paused: boolean;
} = null;

presence.on(
  "iFrameData",
  async (recievedData: {
    currTime: number;
    duration: number;
    paused: boolean;
  }) => {
    data = recievedData;
  }
);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    },
    { pathname } = document.location,
    pages =
      /\/(most-favorite|most-popular|movie|recently-added|recently-updated|tv|top-airing|top-upcoming|ona|ova|special|(genre\/.*))/;

  if (pathname === "/" || pathname === "/home")
    presenceData.details = "Exploring Zoro.to";
  else if (pages.test(pathname)) {
    const heading: HTMLHeadElement = document.querySelector("h2.cat-heading");
    if (heading) presenceData.details = `Looking at ${heading.innerText}`;
  } else if (pathname.startsWith("/news")) {
    presenceData.details = "Looking at Anime news";
    if (pathname !== "/news") {
      const title: HTMLHeadingElement = document.querySelector("h2.news-title");
      if (title) presenceData.state = title.innerText;
    }
  } else if (pathname === "/search") {
    presenceData.details = "Searching";
    const { search } = document.location;
    presenceData.state = search.substring(9);
  } else if (pathname.startsWith("/user")) {
    const profile: HTMLDivElement = document.querySelector("div.ph-title"),
      link: HTMLAnchorElement = document
        .querySelector("ul.nav.nav-tabs.pre-tabs")
        .querySelector("a.nav-link.active");
    if (profile) presenceData.details = `Viewing User: ${profile.innerText}`;
    if (link) presenceData.state = `At ${link.innerText}`;
  } else if (
    pathname.startsWith("people") ||
    pathname.startsWith("character")
  ) {
    const name: HTMLHeadingElement = document.querySelector("h4.name");
    if (name) {
      presenceData.details = `Looking at ${
        pathname.startsWith("/people") ? "People" : "Character"
      }`;
      presenceData.state = name.innerText;
    }
  } else if (pathname.startsWith("/az-list")) {
    presenceData.details = "Looking at Anime list";
    if (pathname !== "/az-list") {
      presenceData.state = `Titles starting with ${
        pathname.substring(9) === "other"
          ? "Other characters"
          : `${pathname.substring(9)}`
      }`;
    }
  } else if (pathname.startsWith("/watch2gether/")) {
    if (pathname === "/watch2gether/")
      presenceData.details = "Looking for anime rooms";
    else {
      const filmName: HTMLHeadingElement =
        document.querySelector("h2.film-name");
      presenceData.details = "In a room";
      if (filmName) presenceData.state = `Watching ${filmName.innerText}`;
      if (data) {
        if (!data.paused) {
          [, presenceData.endTimestamp] = presence.getTimestamps(
            data.currTime,
            data.duration
          );
        }
      }
      presenceData.buttons = [
        {
          label: "Join Room",
          url: document.location.href
        }
      ];
    }
  } else if (pathname.startsWith("/watch")) {
    const title: HTMLDataListElement = document.querySelector(
        "li.breadcrumb-item.dynamic-name.active"
      ),
      episode: HTMLSpanElement = document.querySelector(
        "span#cm-episode-number"
      );
    if (title) presenceData.details = title.innerText;
    if (episode) presenceData.state = `Episode ${episode.innerText}`;
    if (data) {
      if (!data.paused) {
        [, presenceData.endTimestamp] = presence.getTimestamps(
          data.currTime,
          data.duration
        );
      }
    }
    presenceData.buttons = [
      {
        label: "Watch Episode",
        url: document.location.href
      }
    ];
  } else if (pathname === "/events") presenceData.details = "Looking at events";
  else if (pathname.startsWith("/event/")) {
    const title: HTMLDivElement = document.querySelector("div.title"),
      description: HTMLDivElement = document.querySelector("div.description");
    if (title) presenceData.details = `Event: ${title.innerText}`;
    if (description) presenceData.state = description.innerText;
  } else {
    const title: HTMLHeadingElement = document.querySelector(
      "h2.film-name.dynamic-name"
    );
    if (title) {
      presenceData.details = "Checking Synopsis";
      presenceData.state = title.innerText;
      presenceData.buttons = [
        {
          label: "Check Synopsis",
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
