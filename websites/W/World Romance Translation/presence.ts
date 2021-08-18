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
    if (searchQuery === null) presenceData.details = "Melihat Homepage";
    else {
      const { innerText } = searchQuery;
      presenceData.details = `Sedang Mencari ${innerText.substring(
        innerText.indexOf("'") + 1,
        innerText.lastIndexOf("'")
      )}`;
    }
  } else if (pathname.startsWith("/genres/")) {
    const genres = document.querySelector(
      "div.wrapper > div > div > div.releases > h1"
    ).textContent;
    presenceData.details = "Filter Berdasarkan Genre...";
    presenceData.state = `Genre: ${genres}`;
    presenceData.smallImageKey = "search";
  } else if (readerArea !== null) {
    const mangaName: HTMLHeadingElement =
        document.querySelector("h1.entry-title"),
      chapterNumber: HTMLSelectElement =
        document.querySelector("select#chapter"),
      pageNumber: HTMLSelectElement = document.querySelector(
        "select#select-paged"
      );
    if (mangaName !== null && chapterNumber !== null && pageNumber !== null) {
      presenceData.details = `Membaca ${mangaName.innerText.substring(
        0,
        mangaName.innerText.indexOf("Chapter")
      )}`;
      presenceData.state = `${chapterNumber.selectedOptions[0].innerText} Slide ${pageNumber.selectedOptions[0].innerText}`;
    }

    presenceData.buttons = [
      {
        label: "Lihat Manga",
        url: document.location.href
      }
    ];
  } else if (pathname.startsWith("/manga/")) {
    const mangaName: HTMLHeadingElement =
      document.querySelector("h1.entry-title");
    presenceData.details =
      pathname === "/manga/" ? "Melihat Daftar Manga" : "Melihat Detail Manga";
    if (mangaName) presenceData.state = mangaName.innerText;
    presenceData.buttons = [
      {
        label:
          pathname === "/manga/" ? "Lihat Daftar Manga" : "Lihat Detail Manga",
        url: document.location.href
      }
    ];
  } else if (pathname.startsWith("/bookmark/"))
    presenceData.details = "Membuka Bookmarks";
  else if (pathname === "/project-wrt/") {
    presenceData.details = "Melihat Project WRT";
    presenceData.state = "Lihat Daftar Project WRT";
  } else if (pathname === "/recruitment/")
    presenceData.details = "Membuka Halaman Join Us";
  else if (pathname === "/contact-us/")
    presenceData.details = "Membuka Halaman Contact Us";
  else if (pathname === "/privacy-policy/")
    presenceData.details = "Melihat Kebijakan Privasi";
  else if (pathname === "/dmca/") presenceData.details = "Melihat DMCA";

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
