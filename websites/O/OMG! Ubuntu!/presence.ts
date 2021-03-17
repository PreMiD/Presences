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
    },
    header = document
      .querySelector(".content-container .loop h2")
      ?.lastChild.textContent.trim();

  if (page.includes("/tag/")) {
    presenceData.details = "Looking at a tag:";
    presenceData.state = header || "Unknown Tag";
  } else if (page.includes("/category/")) {
    presenceData.details = "Looking at a category:";
    presenceData.state = header || "Unknown Category";
  } else if (page.includes("/page/")) {
    const articlesPage = location.pathname.split("/")[2] || "Unknown";

    presenceData.details = "Looking at article pages";
    presenceData.state = `Page: ${articlesPage}`;
  } else if (page === "/" && location.search?.includes("?s=")) {
    const searching =
      decodeURI(location.search).replace("?s=", "").replace(/\+/g, " ") ||
      "Unknown Search";

    presenceData.details = "Searching for:";
    presenceData.smallImageKey = "searching";
    presenceData.state = searching;
  } else if (page.includes("/") && articleHeader) {
    presenceData.details = "Reading an article:";
    presenceData.smallImageKey = "reading";
    presenceData.state = articleHeader;
    presenceData.buttons = [{ label: "Read Article", url: location.href }];
  } else if (pages[page]) {
    presenceData.details = `Looking at the ${pages[page]} page`;
  }
  OMGUbuntu.setActivity(presenceData);
});
