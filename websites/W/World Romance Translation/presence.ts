const presence = new Presence({
    clientId: "857964031700238356"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "wrt_icon",
      startTimestamp: browsingTimestamp
    },
    { pathname } = document.location;

  if (pathname === "/") {
    const searchQuery =
      document.querySelector<HTMLHeadingElement>("div.releases > h1");
    if (!searchQuery) presenceData.details = "Melihat Homepage";
    else {
      const { innerText } = searchQuery;
      presenceData.details = `Sedang Mencari ${innerText.substring(
        innerText.indexOf("'") + 1,
        innerText.lastIndexOf("'")
      )}`;
    }
  } else if (pathname.startsWith("/genres/")) {
    presenceData.details = "Filter Berdasarkan Genre...";
    presenceData.state = `Genre: ${
      document.querySelector("div.wrapper > div > div > div.releases > h1")
        .textContent
    }`;
    presenceData.smallImageKey = "search";
  } else if (document.querySelector("div#readerarea")) {
    const mangaName =
        document.querySelector<HTMLHeadingElement>("h1.entry-title"),
      chapterNumber =
        document.querySelector<HTMLSelectElement>("select#chapter"),
      pageNumber = document.querySelector<HTMLSelectElement>(
        "select#select-paged"
      );
    if (mangaName && chapterNumber && pageNumber) {
      presenceData.details = `Membaca ${mangaName.textContent.substring(
        0,
        mangaName.textContent.indexOf("Chapter")
      )}`;
      presenceData.state = `${chapterNumber.selectedOptions[0].textContent} Slide ${pageNumber.selectedOptions[0].textContent}`;
    }

    presenceData.buttons = [
      {
        label: "Lihat Manga",
        url: document.location.href
      }
    ];
  } else if (pathname.startsWith("/manga/")) {
    const mangaName =
      document.querySelector<HTMLHeadingElement>("h1.entry-title");
    presenceData.details =
      pathname === "/manga/" ? "Melihat Daftar Manga" : "Melihat Detail Manga";
    if (mangaName) presenceData.state = mangaName.textContent;
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

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
