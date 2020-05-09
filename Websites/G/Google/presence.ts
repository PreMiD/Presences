var presence = new Presence({
  clientId: "612704158826496028"
});

var browsingStamp = Math.floor(Date.now() / 1000);

var doodleTitle: any;

var homepageImage: any;

var resultsInfo: any, searchTab: any;

var pageInput: any, homepageInput;

homepageInput = document.querySelector(
  "#tsf > div:nth-child(2) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input"
);

homepageImage = document.querySelector("#hplogo");

var imgInput: any = document.querySelector("#REsRA");

presence.on("UpdateData", async () => {
  const presenceData: presenceData = {
    largeImageKey: "lg"
  };

  if ((homepageInput && homepageImage) || !document.location.pathname) {
    presenceData.state = "Home";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;
  } else if (document.location.pathname.startsWith("/doodles/")) {
    var searchURL = new URL(document.location.href);

    var doodleResult = searchURL.searchParams.get("q");

    doodleTitle = document.querySelector("#title-card > div > h2");

    if (document.location.pathname.includes("/about")) {
      presenceData.details = "Doodles";

      presenceData.state = "About";

      presenceData.startTimestamp = browsingStamp;
    } else if (doodleTitle != null) {
      presenceData.details = "Viewing a doodle:";

      presenceData.state = doodleTitle.innerText;

      presenceData.startTimestamp = browsingStamp;
    } else if (doodleResult && document.location.pathname == "/doodles/") {
      presenceData.details = "Searching for a doodle:";

      presenceData.state = doodleResult;

      presenceData.startTimestamp = browsingStamp;

      presenceData.smallImageKey = "search";
    } else {
      presenceData.details = "Current page:";

      presenceData.state = "Doodles";

      presenceData.startTimestamp = browsingStamp;
    }
  } else if (document.location.pathname.startsWith("/search")) {
    searchURL = new URL(document.location.href);

    searchTab = searchURL.searchParams.get("tbm");

    resultsInfo = document.querySelector("#result-stats");

    presenceData.smallImageKey = "search";

    if (!searchTab) {
      presenceData.details = "Searching for " + homepageInput.value;

      presenceData.state = resultsInfo.textContent;

      presenceData.startTimestamp = browsingStamp;
    } else if (searchTab == "isch") {
      presenceData.details = "Google Images";

      presenceData.state = "Searching for " + imgInput.value;

      presenceData.startTimestamp = browsingStamp;
    } else if (searchTab == "vid") {
      pageInput = document.querySelector("#lst-ib");

      presenceData.details = "Google Videos";

      presenceData.state = "Searching for " + pageInput.value;

      presenceData.startTimestamp = browsingStamp;
    } else if (searchTab == "nws") {
      pageInput = document.querySelector("#lst-ib");

      presenceData.details = "Google News";

      presenceData.state = "Searching for " + pageInput.value;

      presenceData.startTimestamp = browsingStamp;
    } else if (searchTab == "bks") {
      pageInput = document.querySelector("#lst-ib");

      presenceData.details = "Google Books";

      presenceData.state = "Searching for " + pageInput.value;

      presenceData.startTimestamp = browsingStamp;
    } else if (searchTab == "fin") {
      pageInput = document.querySelector("#lst-ib");

      presenceData.details = "Google Finance";

      presenceData.state = "Searching for " + pageInput.value;

      presenceData.startTimestamp = browsingStamp;
    } else if (searchTab == "pers") {
      pageInput = document.querySelector("#lst-ib");

      presenceData.details = "Google Personal";

      presenceData.state = "Searching for " + pageInput.value;

      presenceData.startTimestamp = browsingStamp;
    }
  }

  presence.setActivity(presenceData);
});
