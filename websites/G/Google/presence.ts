const presence = new Presence({
    clientId: "612704158826496028"
  }),
  browsingStamp = Math.floor(Date.now() / 1000),
  pageInput: HTMLInputElement = document.querySelector("#lst-ib"),
  homepageInput: HTMLInputElement = document.querySelector(
    "#tsf > div:nth-child(1) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input"
  ),
  homepageImage: HTMLElement = document.querySelector("#hplogo"),
  imgInput: HTMLInputElement = document.querySelector("#REsRA");

async function getStrings() {
  return presence.getStrings(
    {
      home: "google.viewHome",
      books: "google.viewBooks",
      about: "google.viewAbout",
      search: "general.searchFor",
      news: "google.viewNews",
      doodles: "google.viewDoodles",
      viewingDoodle: "google.viewingDoodle",
      searchingDoodle: "google.searchingDoodle",
      archive: "google.viewArchive",
      currentPage: "google.currentPage",
      images: "google.viewImages",
      videos: "google.viewVideos",
      finance: "google.viewFinance",
      personal: "google.viewPersonal"
    },
    await presence.getSetting("lang").catch(() => "en")
  );
}

let strings = getStrings(),
  oldLang: string = null;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "lg",
      startTimestamp: browsingStamp
    },
    newLang = await presence.getSetting("lang").catch(() => "en");

  if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  if (
    (homepageInput && homepageImage) ||
    !document.location.pathname ||
    document.location.pathname === "/"
  ) {
    presenceData.state = (await strings).home;
    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;
  } else if (document.location.pathname.startsWith("/doodles")) {
    const searchURL = new URL(document.location.href),
      doodleResult = searchURL.searchParams.get("q"),
      doodleTitle: HTMLElement = document.querySelector(
        "#title-card > div > h2"
      );

    if (document.location.pathname.includes("/about")) {
      presenceData.details = (await strings).doodles;
      presenceData.state = (await strings).about;
    } else if (document.location.hash.includes("#archive")) {
      presenceData.details = (await strings).doodles;
      presenceData.state = (await strings).archive;
    } else if (doodleTitle !== null) {
      presenceData.details = (await strings).viewingDoodle;
      presenceData.state = doodleTitle.innerText;
    } else if (
      doodleResult &&
      (document.location.pathname === "/doodles" ||
        document.location.pathname === "/doodles/")
    ) {
      presenceData.details = (await strings).searchingDoodle;
      presenceData.state = doodleResult;
      presenceData.smallImageKey = "search";
    } else {
      presenceData.details = (await strings).currentPage;
      presenceData.state = (await strings).doodles;
    }
  } else if (document.location.pathname.startsWith("/search")) {
    const searchURL = new URL(document.location.href),
      searchTab = searchURL.searchParams.get("tbm"),
      resultsInfo = document.querySelector("#result-stats");

    presenceData.smallImageKey = "search";

    if (!searchTab) {
      presenceData.details = `${(await strings).search} ${homepageInput.value}`;
      presenceData.state = resultsInfo.textContent;
    } else if (searchTab === "isch") {
      presenceData.details = (await strings).images;
      presenceData.state = `${(await strings).search} ${imgInput.value}`;
    } else if (searchTab === "vid") {
      presenceData.details = (await strings).videos;
      presenceData.state = `${(await strings).search} ${pageInput.value}`;
    } else if (searchTab === "nws") {
      presenceData.details = (await strings).news;
      presenceData.state = `${(await strings).search} ${pageInput.value}`;
    } else if (searchTab === "bks") {
      presenceData.details = (await strings).books;
      presenceData.state = `${(await strings).search} ${pageInput.value}`;
    } else if (searchTab === "fin") {
      presenceData.details = (await strings).finance;
      presenceData.state = `${(await strings).search} ${pageInput.value}`;
    } else if (searchTab === "pers") {
      presenceData.details = (await strings).finance;
      presenceData.state = `${(await strings).search} ${pageInput.value}`;
    }
  }

  presence.setActivity(presenceData);
});
