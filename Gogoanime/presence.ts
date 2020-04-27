var presence = new Presence({
  clientId: "696341580096733185"
});

var videoInfos = {
  duration: 0,
  currentTime: 0,
  paused: true
};

var dataUpdated = false;

presence.on(
  "iFrameData",
  (videoData: { duration: number; currentTime: number; paused: boolean }) => {
    videoInfos = videoData;
    dataUpdated = true;
  }
);

var oldTime = 0;

function upperCaseFirstChar(word: string): string {
  return word[0].toUpperCase() + word.slice(1, word.length);
}

function formatAnime(anime: string[]): string {
  let format = "";
  for (var i = 0; i < anime.length; i++) {
    const part = anime[i];
    format += upperCaseFirstChar(part) + " ";
  }
  return format.replace("Dub", "(Dub)");
}

function getEndTime(current: number, duration: number): number {
  const startTime = Date.now();
  const endTime = Math.floor(startTime / 1000) - current + duration;
  return endTime;
}

function getTimestampAsString(duration: number, current: number): string {
  return new Date((duration - current) * 1000).toISOString().substr(11, 8);
}

presence.on("UpdateData", () => {
  const url = document.location.pathname;
  var detail = "Browsing . . .";
  var state: string;
  const is404 = document.querySelector(
    "#wrapper_bg > section > section.content_left > h1"
  );
  if (is404 != null && is404.textContent === "404") {
    detail = "404";
    state = "Non-existent page";
  } else if (url === "/") {
    state = "Recent animes release";
  } else if (url === "/login.html") {
    detail = "Logging in . . .";
  } else if (url === "/register.html") {
    detail = "Signing up . . .";
  } else if (url === "/user/bookmark") {
    detail = "Managing bookmarks";
  } else if (url === "/anime-list.html") {
    state = "Animes list";
  } else if (url === "//search.html") {
    detail = "Searching . . .";
    const anime = decodeURI(document.location.href).split("=")[1].split(" ");
    state = "Anime: " + formatAnime(anime);
  } else if (url === "/new-season.html") {
    state = "Newest animes";
  } else if (url === "/anime-movies.html") {
    state = "Animes' movies";
  } else if (url === "/popular.html") {
    state = "Popular animes";
  } else if (url.includes("/genre/")) {
    const genre = url.split("/").pop();
    state = "Anime genre: " + upperCaseFirstChar(genre);
  } else if (url.includes("/category/")) {
    const anime = url.split("/").pop().split("-");
    state = "Anime: " + formatAnime(anime);
  } else {
    detail = "Watching . . .";
    let anime = url.split("/").pop().split("-");
    const episode = anime[anime.length - 2] + " " + anime[anime.length - 1];
    anime = anime.slice(0, anime.length - 2);
    state = formatAnime(anime) + ": " + upperCaseFirstChar(episode);
  }
  var presenceData: presenceData = {
    largeImageKey: "logo",
    details: detail,
    state: state
  };

  if (detail === "Watching . . ." && videoInfos != null) {
    if (
      videoInfos.paused ||
      (dataUpdated && videoInfos.currentTime === oldTime)
    ) {
      presenceData.smallImageKey = "pause";
      presenceData.smallImageText =
        getTimestampAsString(videoInfos.duration, videoInfos.currentTime) +
        " left";
      delete presenceData.endTimestamp;
    } else {
      presenceData.smallImageKey = "play";
      presenceData.endTimestamp = getEndTime(
        Math.floor(videoInfos.currentTime),
        Math.floor(videoInfos.duration)
      );
      oldTime = videoInfos.currentTime;
      dataUpdated = false;
    }
    presence.setActivity(presenceData, !videoInfos.paused);
  } else {
    presenceData.smallImageKey = "browsing";
    presenceData.startTimestamp = new Date().getTime();
    presence.setActivity(presenceData);
  }
});
