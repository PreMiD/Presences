const OMGUbuntu = new Presence({
    clientId: "821058353094590474"
  }),
  pages: { [k: string]: string } = {
    "/": "Home",
    "/about-us": "About",
    "/commenting-conduct": "Code of Conduct",
    "/privacy-policy": "Privacy Policy",
    "/tip": "Contact"
  },
  startTimestamp = Math.round(Date.now() / 1000),
  articleHeader =
    document.querySelector("div.primary .post h1.post-title")?.textContent ||
    document
      .querySelector(".post__hero-header .post-title")
      ?.textContent.trim();

OMGUbuntu.on("UpdateData", async () => {
  const page = location.pathname,
    presenceData: PresenceData = {
      largeImageKey: "omgubuntu-logo",
      startTimestamp
    };

  if (page.includes("/tag/")) {
    const tag =
      document
        .querySelector(".content-container .loop h2")
        ?.lastChild.textContent.trim() || "Unknown Tag";

    presenceData.details = "Looking a tag:";
    presenceData.state = tag;

    OMGUbuntu.setActivity(presenceData);
  } else if (page.includes("/category/")) {
    const category =
      document
        .querySelector(".content-container .loop h2")
        ?.lastChild.textContent.trim() || "Unknown Category";

    presenceData.details = "Looking a category:";
    presenceData.state = category;

    OMGUbuntu.setActivity(presenceData);
  } else if (page.includes("/page/")) {
    const articlesPage = location.pathname.split("/")[2] || "Unknown Page";

    presenceData.details = "Looking at articles";
    presenceData.state = `Page: ${articlesPage}`;

    OMGUbuntu.setActivity(presenceData);
  } else if (page === "/" && location.search?.includes("?s=")) {
    const searching =
      decodeURI(location.search).replace("?s=", "").replace(/\+/g, " ") ||
      "Unknown Search";

    presenceData.details = "Searching for:";
    presenceData.smallImageKey = "searching";
    presenceData.state = searching;

    OMGUbuntu.setActivity(presenceData);
  } else if (page.includes("/") && articleHeader) {
    presenceData.details = "Reading an article:";
    presenceData.smallImageKey = "reading";
    presenceData.state = articleHeader;
    presenceData.buttons = [{ label: "Read Article", url: location.href }];

    OMGUbuntu.setActivity(presenceData);
  } else if (pages[page]) {
    presenceData.details = "Looking a page:";
    presenceData.state = pages[page];

    OMGUbuntu.setActivity(presenceData);
  } else OMGUbuntu.setActivity();
});
