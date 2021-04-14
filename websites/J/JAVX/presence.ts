const presence = new Presence({
    clientId: "830476272978362408"
  }),
  strings = presence.getStrings({
    viewHome: "general.viewHome",
    viewPage: "general.viewPage",
    viewList: "general.viewList",
    viewSeries: "general.viewSeries",
    viewGenre: "general.viewGenre",
    viewAccount: "general.viewAccount",
    watchingVid: "general.watchingVid",
    playing: "general.playing",
    paused: "general.paused",
    searchFor: "general.searchFor",
    searchSomething: "general.searchSomething",
    search: "general.search"
  }),
  getSearchKeyword = (): string =>
    new URLSearchParams(location.search).get("s"),
  upperFirstLetter = (text: string): string =>
    text.charAt(0).toUpperCase() + text.slice(1),
  getPage = (): string => {
    const elPagination = document.querySelector("ul.pagination");
    if (!elPagination) return "p.1/1";

    const currentPage = elPagination
        .querySelector("li.page-item.active > a")
        .textContent.trim(),
      lastPage = parseInt(
        elPagination
          .querySelector("li.page-item:last-child > a")
          .getAttribute("href")
          .split("page/")
          .pop()
      );

    return `p.${currentPage}/${lastPage}`;
  },
  getEpisode = (): string => {
    const elEpisodes = document.querySelector("#episodes");
    if (!elEpisodes) return "ep.1/1";

    const currentEpisode = elEpisodes
        .querySelector("button.active")
        .textContent.replace("Tập", "")
        .trim(),
      totalEpisodes = elEpisodes.childNodes.length;

    return `ep.${currentEpisode}/${totalEpisodes}`;
  };

let video = { playback: false, currentTime: 0, duration: 0, paused: false };

presence.on(
  "iFrameData",
  (data: {
    playback: boolean;
    currentTime: number;
    duration: number;
    paused: boolean;
  }) => {
    video = data;
  }
);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "javx",
      startTimestamp: Math.floor(Date.now() / 1000)
    },
    { pathname, search } = location,
    pagesWithoutTermName = [
      "/censored",
      "/uncensored",
      "/porn",
      "/favorite",
      "/actresses",
      "/studios",
      "/years"
    ],
    pagesWithTermName = ["/actress", "/studio", "/release_year"];

  if (pathname === "/" && !search) {
    presenceData.details = (await strings).viewHome;
    presenceData.state = (await strings).searchSomething;
  } else if (search.startsWith("?s")) {
    const keyword = getSearchKeyword(),
      page = getPage();

    presenceData.details = keyword
      ? (await strings).searchFor
      : (await strings).search;
    presenceData.state = keyword ? `"${encodeURI(keyword)}" ${page}` : page;
  } else if (pathname.startsWith("/sign-")) {
    presenceData.details = (await strings).viewPage;
    presenceData.state = document
      .querySelector(".navbar .border-left")
      .textContent.trim();
  } else if (pathname.startsWith("/profile")) {
    const name = document.querySelector("h2").textContent.trim(),
      role = document.querySelector("p > small").textContent.trim();

    presenceData.details = (await strings).viewAccount;
    presenceData.state = `${upperFirstLetter(role.toLowerCase())}: ${name}`;
  } else if (pathname.startsWith("/category")) {
    const genre = document
      .querySelector("h2")
      .textContent.replace(/\(.*\)$/, "")
      .trim();

    presenceData.details = (await strings).viewGenre;
    presenceData.state = `${genre} ${getPage()}`;
  } else if (pathname.startsWith("/tag")) {
    const tag = document
      .querySelector("h2")
      .textContent.replace(/\(.*\)$/, "")
      .trim();

    presenceData.details = (await strings).viewSeries;
    presenceData.state = `${tag} ${getPage()}`;
  } else if (~pagesWithoutTermName.findIndex((x) => pathname.startsWith(x))) {
    const title = document
      .querySelector("h2")
      .textContent.replace(/\(.*\)$/, "")
      .trim();

    presenceData.details = (await strings).viewList;
    presenceData.state = `${title} ${getPage()}`;
  } else if (~pagesWithTermName.findIndex((x) => pathname.startsWith(x))) {
    const title = document
        .querySelector(".navbar .border-left")
        .textContent.trim(),
      name = document
        .querySelector("h2")
        .textContent.replace(/\(.*\)$/, "")
        .trim();

    presenceData.details = (await strings).viewList;
    presenceData.state = `${title} ${name} ${getPage()}`;
  } else if (Object.keys(video).length > 0) {
    const censorship = document
        .querySelector("#censorship > a")
        .textContent.trim(),
      engname = document.querySelector("#title").textContent.trim(),
      id = document.querySelector("#id .list-inline-item").textContent.trim(),
      title = censorship === "Porn" ? engname : id,
      actresses: string[] = [],
      studios: string[] = [];

    document
      .querySelectorAll("#actresses .stretched-link")
      .forEach((actress) => actresses.push(actress.textContent.trim()));
    document
      .querySelectorAll("#studios .stretched-link")
      .forEach((studio) => studios.push(studio.textContent.trim()));

    const episodes = getEpisode(),
      strActresses = actresses.join(", "),
      strStudios = studios.join(", "),
      strTitle = `${title} ${episodes}`;

    presenceData.details = `${(await strings).watchingVid}: ${strTitle}`;
    presenceData.state = `${strActresses} - ${strStudios}`;

    const { playback, currentTime, duration, paused } = video;

    if (playback) {
      const timestamps = presence.getTimestamps(
        Math.floor(currentTime),
        Math.floor(duration)
      );

      presenceData.endTimestamp = timestamps[1];
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).paused
        : (await strings).playing;

      if (paused) delete presenceData.endTimestamp;
    }
  } else presenceData.details = (await strings).searchSomething;

  presence.setActivity(presenceData);
});
