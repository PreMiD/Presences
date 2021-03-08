type domainList = string[];

interface GogoanimeApiResponse {
  error: boolean;
  errors: {
    message: string;
    code: string
  }[],
  payload: {
    allDomains: domainList;
    activeDomains: domainList;
    asianServers: domainList;
    northAmericanServers: domainList;
  },
  date: {
    data: number;
  }
}

const presence = new Presence({
  clientId: "696341580096733185",
  injectOnComplete: false,
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
  NOTFOUND: "404",
  BROWSING: "Browsing...",
  SEARCHING: "Searching...",
  WATCHING: "Watching...",
  LOGIN: "Logging in...",
  SIGNUP: "Signing up...",
  BOOKMARK: "Managing bookmarks..."
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
  return anime.reduce((t, c): string => {
    return t + upperCaseFirstChar(c) + " ";
  }, "").replace(/Dub/g, "(Dub)");
}

function parseCookieString(cookie: string): Record<string,string>[] {
  const dict: Record<string,string>[] = [];
  if(cookie){
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
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response;
}

async function checkDomain(): Promise<boolean> {
  const cookies = parseCookieString(document.cookie),
  currentDomain = document.location.hostname,
  cookieName = "PMD_GOGOANIME_VALID_DOMAINS";
  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].key === cookieName) {
      if (cookies[i].value.split("-").includes(currentDomain)) {
        return false;
      }
    }
  }

  let invalid = true;
  await sendRequestToDomainAPI().then(async body => {
    if(body.status !== 200){
      return;
    }
    const data: GogoanimeApiResponse = await body.json();
    if (data) {
      const domains: domainList = data.payload.allDomains;
      document.cookie = `${cookieName}=${domains.join("-")}; max-age=1800`;
      if (domains.includes(currentDomain)) {
        invalid = false;
      }
    }
  });
  return invalid;
}
    
function getEndTime(current: number, duration: number): number {
  return (Date.now() / 1000) + (duration - current);
}

function getTimestampAsString(duration: number, current: number) {
  return new Date((duration - current) * 1000).toISOString().substr(11, 8);
}

presence.on("UpdateData", async () => {
  if (!isDomainChecked) {
    isDomainChecked = true;
    await checkDomain().then(result => {
      isClone = result; 
      if(result){
        presence.error("The following gogoanime domain is a clone therefore not supported by this extension.");
      }
      else{
        presence.success("The following gogoanime domain is supported by this extension.");
      }
    });

      if(isClone){
        presence.clearActivity();
      }
    }
      
    if (isClone) {
      return;
    } 
    
    const currentPath = document.location.pathname;
    let detail: string,
    state: string = states.BROWSING;
    const is404 = document.querySelector("#wrapper_bg > section > section.content_left > h1")?.textContent === states.NOTFOUND;
    if (is404) {
      state = states.NOTFOUND;
    }
    else if (currentPath === "/") {
      const sel = document.querySelector("#load_recent_release > div.anime_name.recent_release > h2").children;
      if(sel){
        for(let i = 0; i < sel.length; i++){
          const child = sel[i];
          if(child.className.includes("active")){
            switch(child.textContent){
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
            } 
          }
    else if (currentPath === "/anime-list.html") {
      detail = "The anime list";
    }
    else if (currentPath === "/new-season.html") {
      detail = "Most recent anime";
    }
    else if (currentPath === "/anime-movies.html") {
      detail = "Anime movies";
    }
    else if (currentPath === "/popular.html") {
      detail = "Most popular anime";
    }
    else if (currentPath.includes("/genre/")) {
      const genre = currentPath.split("/").pop();
      detail = `Anime genre: ${upperCaseFirstChar(genre)}`;
    }
    else if (currentPath.includes("/category/")) {
      const animeTitle = document.querySelector("#wrapper_bg > section > section.content_left > div.main_body > div:nth-child(2) > div.anime_info_body_bg > h1")?.textContent,
      anime = animeTitle ?? formatStr(currentPath.split("/").pop().split("-")); // use the url path as fallback
      detail = `Anime: ${anime}`;
    }
    else if (currentPath.includes("/sub-category/")) {
      const cat = currentPath.split("/").pop().split("-");
      detail = `${formatStr(cat)}`;
    }
    else if (currentPath === "/login.html") {
      state = states.LOGIN;
    }
    else if (currentPath === "/register.html") {
      state = states.SIGNUP;
    }
    else if (currentPath === "/user/bookmark") {
      state = states.BOOKMARK;
    }
    else if (currentPath === "//search.html") {
      state = states.SEARCHING;
      const word = new URLSearchParams(window.location.search).get("keyword").split(" ");
      detail = `Keyword: ${formatStr(word)}`;
    }
    else {
      state = states.WATCHING;
      const anime = currentPath.split("/").pop().split("-"),
      episode = `${anime[anime.length - 2]} ${anime[anime.length - 1]}`;
      detail = `${formatStr(anime.slice(0, anime.length - 2))}: ${upperCaseFirstChar(episode)}`;
    }
    
    const presenceData: PresenceData = {
      largeImageKey: "logo",
      details: state,
      state: detail
    };
     
    if (state === states.NOTFOUND) {
      presence.setActivity({});
    }
    else if (state === states.WATCHING && videoInfos) {
      presenceData.buttons = [{
        label: "Watch",
        url: document.location.href
      }];
  
      if (videoInfos.paused || (framaDataUpdated && videoInfos.currentTime === oldTime)) {
        presenceData.smallImageKey = "pause";
        presenceData.smallImageText = `${getTimestampAsString(videoInfos.duration, videoInfos.currentTime)} left`;
      }
      else {
        presenceData.smallImageKey = "play";
        presenceData.endTimestamp = getEndTime(videoInfos.currentTime, videoInfos.duration);
        oldTime = videoInfos.currentTime;
        framaDataUpdated = false;
      }
      presence.setActivity(presenceData, !videoInfos.paused);
    }
    else {
      presenceData.smallImageKey = "browsing";
      presenceData.startTimestamp = new Date().getTime();
      presence.setActivity(presenceData);
    }
  });