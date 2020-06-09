var presence = new Presence({
  clientId: "612653415419609088"
});

var lastPlaybackState = null;
var reading;
var browsingStamp = Math.floor(Date.now() / 1000);

var title: any,
  title2: any,
  currentPage: any,
  pageNumber: any,
  tabTitle: any,
  homeCurrentPage: any;

var pattern = "- Page";

var character: any, parody: any;

var searchURL = new URL(document.location.href);
var searchResult = searchURL.searchParams.get("q");

var truncateAfter = function (str, pattern): string {
  return str.slice(0, str.indexOf(pattern));
};

if (lastPlaybackState != reading) {
  lastPlaybackState = reading;
  browsingStamp = Math.floor(Date.now() / 1000);
}

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "lg"
  };

  tabTitle = document.title;

  title = document.querySelector("#info > h1");

  if (document.location.pathname == "/" || !document.location.pathname) {
    homeCurrentPage = document.querySelector(
      "#content > section.pagination > a.page.current"
    );

    presenceData.details = "Home";

    presenceData.state = "Page: " + homeCurrentPage.innerText;

    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/g/")) {
    if (tabTitle.includes("Page")) {
      currentPage = document.querySelector(
        "#pagination-page-top > button > span.current"
      );

      pageNumber = document.querySelector(
        "#pagination-page-top > button > span.num-pages"
      );

      title2 = truncateAfter(tabTitle, pattern);

      presenceData.details = "Reading: " + title2;

      presenceData.state =
        "Current page: " + currentPage.innerText + "/" + pageNumber.innerText;

      presenceData.startTimestamp = browsingStamp;
    } else if (title.innerText.length > 0) {
      if (title.innerText.length > 128) {
        presenceData.state = "Title longer than 128 characters.";
      } else {
        presenceData.state = title.innerText;
      }

      presenceData.details = "Viewing a page: ";

      presenceData.startTimestamp = browsingStamp;
    }
  } else if (document.location.pathname.includes("/tags/")) {
    presenceData.details = "Browsing tags...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.state;
  } else if (document.location.pathname.includes("/artists/")) {
    presenceData.details = "Browsing artists...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.state;
  } else if (document.location.pathname.includes("/characters/")) {
    presenceData.details = "Browsing characters...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.state;
  } else if (document.location.pathname.includes("/parodies/")) {
    presenceData.details = "Browsing parodies...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.state;
  } else if (document.location.pathname.includes("/groups/")) {
    presenceData.details = "Browsing groups...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.state;
  } else if (document.location.pathname.includes("/info/")) {
    presenceData.details = "Reading informations...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.state;
  } else if (document.location.pathname.includes("/search/")) {
    presenceData.details = "Searching for: ";

    presenceData.state = searchResult;

    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/character/")) {
    character = document.querySelector("#content > h1 > span:nth-child(2)");

    presenceData.details = "Searching by character: ";

    presenceData.state = character.innerText;

    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/parody/")) {
    parody = document.querySelector("#content > h1 > span:nth-child(2)");

    presenceData.details = "Searching by parody: ";

    presenceData.state = parody.innerText;

    presenceData.startTimestamp = browsingStamp;
  } else {
    presenceData.details = "Browsing...";
    presenceData.startTimestamp = browsingStamp;

    delete presenceData.state;
    delete presenceData.smallImageKey;
  }

  presence.setActivity(presenceData);

  /*

		let presenceData: PresenceData = {
			largeImageKey: "lg"
		}

		presenceData.details = "Browsing...";
		presenceData.startTimestamp = browsingStamp;

		delete presenceData.state;
		delete presenceData.smallImageKey;

		presence.setActivity(presenceData, true);
	*/
});
