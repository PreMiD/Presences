const presence = new Presence({ clientId: "760624576550928455" }),
  presenceData: PresenceData = { largeImageKey: "logo-512" };

let showBrowsingArt: boolean,
  showBrowsingCategory: boolean,
  showBrowsingSubmissions: boolean,
  showBrowsingProfile: boolean,
  showCreateJournal: boolean,
  showBrowsingAccount: boolean,
  showBrowsingNotes: boolean,
  showBrowsingSearch: boolean;

const browsingStamp = Math.floor(Date.now() / 1000);

function checkCurrentPage() {
  if (document.location.hostname === "www.furaffinity.net") {
    if (document.location.pathname === "/")
      presenceData.details = "Viewing home page";
    else if (document.location.pathname.includes("/view/") && showBrowsingArt) {
      const title = document.querySelector(".submission-title>h2>p").innerHTML,
        user = document.querySelector(
          '.submission-id-sub-container a[href*="user"] strong'
        ).innerHTML;
      presenceData.details = `Viewing Art: '${title}' by ${user}`;
    } else if (
      document.location.pathname.includes("/msg/submissions") &&
      showBrowsingSubmissions
    ) {
      const submissionCount = parseInt(
        document.querySelector(
          '.notification-container.inline[href*="submissions"]'
        ).innerHTML
      );
      presenceData.details = "Viewing latest submissions";
      presenceData.state = `${submissionCount} Submissions`;
    } else if (
      document.location.pathname.includes("/browse") &&
      showBrowsingCategory
    ) {
      const category = document.querySelector(
          "select[name=cat] option[selected]"
        ).innerHTML,
        searchPage = parseInt(
          document
            .querySelector(".page-number strong")
            .innerHTML.replace("Browse Page #", "")
        );
      presenceData.details = "Browsing through FA";
      presenceData.state = `Page ${searchPage}`;
      if (category !== "All")
        presenceData.state += ` in category "${category}"`;
    } else if (
      document.location.pathname.includes("/user/") &&
      showBrowsingProfile
    ) {
      const user = document
        .querySelector(".username h2 span")
        .innerHTML.replace(/~/, "")
        .trim();
      presenceData.details = "Viewing user: ";
      presenceData.state = `@${user}`;
    } else if (
      document.location.pathname.includes("/gallery/") &&
      showBrowsingProfile
    ) {
      const user = document
        .querySelector(".username h2 span")
        .innerHTML.replace(/~/, "")
        .trim();
      presenceData.details = "Viewing gallery of user: ";
      presenceData.state = `@${user}`;
    } else if (
      document.location.pathname.includes("/search/") &&
      showBrowsingSearch
    ) {
      let searchTerm = document.location.search.replace("?q=", "");
      const searchResults = parseInt(
          document.querySelector("#query-stats>div span:nth-child(2)").innerHTML
        ),
        searchPage = parseInt(
          document
            .querySelector(".pagination strong")
            .innerHTML.replace("Search Result Page #", "")
        );
      if (searchTerm === "") {
        searchTerm = document
          .querySelector(".search_string_input")
          .getAttribute("value");
      }
      presenceData.details = `Searching for: "${searchTerm}"`;
      presenceData.state = `${searchResults} results on page ${searchPage}`;
    } else if (
      document.location.pathname.includes("/controls/journal") &&
      showCreateJournal &&
      showBrowsingAccount
    ) {
      const journalName = document
        .querySelector('form input[name*="subject"')
        .getAttribute("value");
      if (journalName === "") presenceData.details = "Creates a Journal";
      else {
        presenceData.details = "Updates a Journal";
        presenceData.state = `"${journalName}"`;
      }
    } else if (
      document.location.pathname.includes("/msg/pms/") &&
      showBrowsingNotes &&
      showBrowsingAccount
    ) {
      switch (document.location.hash) {
        case "#message": {
          presenceData.details = "Reads a note";
          presenceData.state = `"${
            document.querySelector("#message h2").innerHTML
          }"`;
          break;
        }
        case "#MsgForm": {
          presenceData.details = "Writes a note";
          break;
        }
      }
    } else {
      presenceData.details = null;
      presenceData.state = null;
    }
  }
}
setInterval(checkCurrentPage, 1000);
presence.on("UpdateData", async () => {
  showBrowsingArt = await presence.getSetting("browse");
  showBrowsingProfile = await presence.getSetting("profile");
  showCreateJournal = await presence.getSetting("journal");
  showBrowsingAccount = await presence.getSetting("account");
  showBrowsingNotes = await presence.getSetting("notes");
  showBrowsingSubmissions = await presence.getSetting("submissions");
  showBrowsingSearch = await presence.getSetting("search");
  showBrowsingCategory = await presence.getSetting("category");
  presenceData.startTimestamp = browsingStamp;
  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
