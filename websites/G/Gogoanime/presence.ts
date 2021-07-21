interface GogoanimeApiResponse {
  error: boolean;
  errors: {
    message: string;
    code: string;
  }[];
  payload: {
    allDomains: string[];
    activeDomains: string[];
    asianServers: string[];
    northAmericanServers: string[];
  };
  date: {
    data: number;
  };
}

interface DomainCheckState {
  invalid: boolean;
  validDomains: string[];
}

const presence = new Presence({
  clientId: "696341580096733185",
  appMode: true
});

let videoInfos = {
    duration: 0,
    currentTime: 0,
    paused: false
  },
  framaDataUpdated = false,
  isDomainChecked = false, // we only need to verify the authenticity of the domain ONCE
  isClone = false, // true if the current gogoanime domain is a clone
  oldTime = 0;

const states = {
  // both the state and logo to use
  NOTFOUND: ["404", ""],
  BROWSING: ["Browsing...", "browsing"],
  READING: ["Reading...", "reading"],
  SEARCHING: ["Searching...", "browsing"],
  WATCHING: ["Watching...", ""],
  LOGIN: ["Logging in...", "login"],
  SIGNUP: ["Signing up...", "signup"],
  BOOKMARK: ["Managing bookmarks...", "bookmark"],
  REQUESTING: ["Requesting an anime...", "request"],
  CONTACTING: ["Contacting the support...", "contact"]
};

presence.on(
  "iFrameData",
  (videoData: { duration: number; currentTime: number; paused: boolean }) => {
    videoInfos = videoData;
    framaDataUpdated = true;
  }
);

function upperCaseFirstChar(word: string) {
  return `${word[0].toUpperCase()}${word.slice(1, word.length)}`;
}

function formatStr(anime: string[]): string {
  return anime
    .reduce((t, c): string => {
      return t + upperCaseFirstChar(c) + " ";
    }, "")
    .replace(/Dub/g, "(Dub)");
}

function parseCookieString(cookie: string): Record<string, string>[] {
  const dict: Record<string, string>[] = [];
  if (cookie) {
    const cookies = cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const parts = cookies[i].split("=");
      if (parts.length === 2) {
        dict.push({
          key: parts[0].trimStart(),
          value: parts[1]
        });
      }
    }
  }
  return dict;
}

async function sendRequestToDomainAPI(): Promise<Response> {
  const response = await fetch("https://yuabot.com/weeb/api/v1/meta/domains", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    }
  });
  return response;
}

async function checkDomain(): Promise<DomainCheckState> {
  const result: DomainCheckState = { invalid: true, validDomains: null },
    cookies = parseCookieString(document.cookie),
    cookieName = "PMD_GOGOANIME_VALID_DOMAINS";
  let currentDomain = document.location.hostname;
  if (currentDomain.split(".").length > 2) {
    currentDomain = document.location.hostname.substring(
      document.location.hostname.indexOf(".") + 1
    ); // ignore the subdomain;
  }

  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].key === cookieName) {
      const cachedValidDomains = (result.validDomains =
        cookies[i].value.split("-"));
      if (cachedValidDomains.includes(currentDomain)) {
        result.invalid = false;
        return result;
      }
    }
  }

  await sendRequestToDomainAPI().then(async (body) => {
    if (body.status !== 200) {
      return;
    }
    const data: GogoanimeApiResponse = await body.json();
    if (data) {
      const domains: string[] = (result.validDomains = data.payload.allDomains);
      document.cookie = `${cookieName}=${domains.join("-")}; max-age=1800`;
      if (domains.includes(currentDomain)) {
        result.invalid = false;
      }
    }
  });
  return result;
}

function getEndTime(current: number, duration: number): number {
  return Date.now() / 1000 + (duration - current);
}

function getTimestampAsString(duration: number, current: number) {
  return new Date((duration - current) * 1000).toISOString().substr(11, 8);
}

presence.on("UpdateData", async () => {
  if (!isDomainChecked) {
    isDomainChecked = true;
    await checkDomain().then((result) => {
      isClone = result.invalid;
      if (isClone) {
        presence.error(
          `The following gogoanime domain is a clone therefore not supported by this extension. The valid domains are:\n${result.validDomains.join(
            "\n"
          )}`
        );
      } else {
        presence.success(
          "The following gogoanime domain is supported by this extension."
        );
      }
    });

    if (isClone) {
      presence.clearActivity();
    }
  }

  if (isClone) {
    return;
  }

  const currentPath = document.location.pathname;
  let detail: string,
    state: string[] = states.BROWSING;
  const is404 =
    document.querySelector("#wrapper_bg > section h1.entry-title")
      ?.textContent === "404";
  if (is404) {
    state = states.NOTFOUND;
  } else if (currentPath === "/") {
    const sel = document.querySelector(
      "#load_recent_release > div.anime_name.recent_release > h2"
    )?.children;
    if (sel) {
      for (let i = 0; i < sel.length; i++) {
        const child = sel[i];
        if (child.className.includes("active")) {
          switch (child.textContent) {
            case "DUB":
              detail = "Recent Dubbed anime releases";
              break;
            case "Chinese":
              detail = "Recent Chinese anime releases";
              break;
            default:
              detail = "Recent anime releases";
              break;
          }
          break;
        }
      }
    } else {
      detail = "Home";
    }
  } else if (currentPath === "/anime-list.html") {
    detail = "The anime list";
  } else if (
    currentPath === "/new-season.html" ||
    currentPath === "/recent-release-anime"
  ) {
    detail = "Most recent anime";
  } else if (currentPath === "/anime-movies.html") {
    detail = "Anime movies";
  } else if (currentPath === "/popular.html") {
    detail = "Most popular anime";
  } else if (currentPath === "/news/reviews") {
    detail = "Anime reviews";
  } else if (currentPath === "/news/trailers") {
    detail = "Anime trailers";
  } else if (currentPath === "/requested-list.html") {
    detail = "The requested anime list";
  } else if (currentPath === "/upcoming-anime") {
    detail = "Upcoming anime";
  } else if (currentPath.includes("/genre/")) {
    const genre = currentPath.split("/").pop();
    detail = `Anime genre: ${upperCaseFirstChar(genre)}`;
  } else if (currentPath.includes("/category/")) {
    const animeTitle = document.querySelector(
        "#wrapper_bg > section > section.content_left > div.main_body > div:nth-child(2) > div.anime_info_body_bg > h1"
      )?.textContent,
      anime = animeTitle ?? formatStr(currentPath.split("/").pop().split("-")); // use the url path as fallback
    detail = `Anime: ${anime}`;
  } else if (
    currentPath.includes("/sub-category/") ||
    currentPath.includes("/season/")
  ) {
    const cat = currentPath.split("/").pop().split("-");
    detail = `${formatStr(cat)}`;
  } else if (currentPath === "/announcement.html") {
    detail = "Announcements";
  } else if (currentPath === "/news.html") {
    detail = "Latest News";
  } else if (currentPath.includes("/requested/")) {
    const animeTitle = document.querySelector(
        "#wrapper_bg > section > section.content_left > div > div.anime_info_body > div > h1"
      )?.textContent,
      anime = animeTitle ?? formatStr(currentPath.split("/").pop().split("-")); // use the url path as fallback
    detail = `Requested anime: ${anime}`;
  } else if (currentPath.includes("/announcement/")) {
    state = states.READING;
    const announcement = document.querySelector(
      "#wrapper_bg > section > section.content_left > div > div.page_content > h1"
    ).textContent;
    detail = `Announcement: ${announcement}`;
  } else if (currentPath.includes("/reviews/")) {
    state = states.READING;
    const review = document.querySelector(
      "#wrapper_bg > section > section.content_left > div > div.page_content > h1"
    ).textContent;
    detail = `Review Of: ${review}`;
  } else if (currentPath.includes("/news/")) {
    state = states.READING;
    const news = document.querySelector(
      "#wrapper_bg > section > section.content_left > div > div.page_content > h1"
    ).textContent;
    detail = `News: ${news}`;
  } else if (currentPath.includes("/privacy.html")) {
    state = states.READING;
    detail = "The website's privacy notes";
  } else if (currentPath.includes("/about-us.html")) {
    state = states.READING;
    detail = "The website's about us";
  } else if (currentPath.includes("/request-anime.html")) {
    state = states.REQUESTING;
    const anime = (document.getElementsByName("title")[0] as HTMLInputElement)
      ?.value;
    detail = `Anime: ${anime}`;
  } else if (currentPath === "contact-us.html") {
    state = states.CONTACTING;
  } else if (currentPath === "/login.html") {
    state = states.LOGIN;
  } else if (currentPath === "/register.html") {
    state = states.SIGNUP;
  } else if (currentPath === "/user/bookmark") {
    state = states.BOOKMARK;
  } else if (currentPath === "//search.html") {
    state = states.SEARCHING;
    const word = new URLSearchParams(window.location.search)
      .get("keyword")
      .split(" ");
    detail = `Keyword: ${formatStr(word)}`;
  } else if (currentPath.includes("/trailers/")) {
    state = states.WATCHING;
    const anime = document.querySelector(
      "#wrapper_bg > section > section.content_right.block_mb > div:nth-child(1) > div > div.related_right.center_col1 > div > ul > li > div.name > a > h4"
    ).textContent;
    detail = `Trailer Of: ${anime}`;
  } else {
    state = states.WATCHING;
    const anime = currentPath.split("/").pop().split("-"),
      episode = `${anime[anime.length - 2]} ${anime[anime.length - 1]}`;
    detail = `${formatStr(
      anime.slice(0, anime.length - 2)
    )}: ${upperCaseFirstChar(episode)}`;
  }

  const presenceData: PresenceData = {
    largeImageKey: "logo",
    details: state[0],
    state: detail
  };

  if (state === states.NOTFOUND) {
    presence.setActivity({});
  } else if (state === states.WATCHING && videoInfos) {
    presenceData.buttons = [
      {
        label: "Watch",
        url: document.location.href
      }
    ];

    if (
      videoInfos.paused ||
      (framaDataUpdated && videoInfos.currentTime === oldTime)
    ) {
      presenceData.smallImageKey = "pause";
      presenceData.smallImageText = `${getTimestampAsString(
        videoInfos.duration,
        videoInfos.currentTime
      )} left`;
    } else {
      presenceData.smallImageKey = "play";
      presenceData.endTimestamp = getEndTime(
        videoInfos.currentTime,
        videoInfos.duration
      );
      oldTime = videoInfos.currentTime;
      framaDataUpdated = false;
    }
    presence.setActivity(presenceData, !videoInfos.paused);
  } else {
    presenceData.smallImageKey = state[1];
    presenceData.startTimestamp = new Date().getTime();
    presence.setActivity(presenceData);
  }
});
