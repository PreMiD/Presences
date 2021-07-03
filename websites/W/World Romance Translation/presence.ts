const presence = new Presence({
    clientId: "857964031700238356"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "wrt_icon",
      startTimestamp: browsingStamp
    },
    { pathname } = document.location,
    readerArea: HTMLDivElement = document.querySelector("div#readerarea");

  if (pathname === "/") {
    const searchQuery: HTMLHeadingElement =
      document.querySelector("div.releases > h1");
    if (searchQuery === null) presenceData.details = "Browsing Home Page";
    else {
      const { innerText } = searchQuery;
      presenceData.details = `Searching for ${innerText.substring(
        innerText.indexOf("'") + 1,
        innerText.lastIndexOf("'")
      )}`;
    }
  } else if (readerArea !== null) {
    const mangaName: HTMLHeadingElement =
        document.querySelector("h1.entry-title"),
      chapterNumber: HTMLSelectElement =
        document.querySelector("select#chapter"),
      pageNumber: HTMLSelectElement = document.querySelector(
        "select#select-paged"
      );
    if (mangaName !== null && chapterNumber !== null && pageNumber !== null) {
      presenceData.details = `Reading ${mangaName.innerText.substring(
        0,
        mangaName.innerText.indexOf("Chapter")
      )}`;
      presenceData.state = `${chapterNumber.selectedOptions[0].innerText} Page ${pageNumber.selectedOptions[0].innerText}`;
    }
    presenceData.buttons = [
      {
        label: "Read Manga",
        url: document.location.href
      }
    ];
  } else if (pathname.startsWith("/manga/")) {
    const mangaName: HTMLHeadingElement =
      document.querySelector("h1.entry-title");
    presenceData.details =
      pathname === "/manga/" ? "Browsing Manga List" : "Checking Synopsis";
    if (mangaName) presenceData.state = mangaName.innerText;
    presenceData.buttons = [
      {
        label: pathname === "/manga/" ? "Browse Manga List" : "Check Synopsis",
        url: document.location.href
      }
    ];
  } else if (pathname.startsWith("/bookmark/"))
    presenceData.details = "Browsing Bookmarks";
  else if (pathname === "/project-wrt/") {
    presenceData.details = "Viewing Project WRT";
    presenceData.state = "Browsing List of Staff Translated Manga";
  } else if (pathname === "/recruitment/")
    presenceData.details = "Viewing Join Us Page";
  else if (pathname === "/contact-us/")
    presenceData.details = "Viewing Contact Us Page";
  else if (pathname === "/privacy-policy/")
    presenceData.details = "Viewing Privacy Policy";
  else if (pathname === "/dmca/") presenceData.details = "Viewing DMCA Policy";

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
