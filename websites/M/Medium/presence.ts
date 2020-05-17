const presence = new Presence({
    clientId: "632936001269923880"
  }),
  pages = {
    "/elemental-by-medium": "Elemental by Medium",
    "/one-zero": "One Zero by Medium",
    "/gen": "Gen by Medium",
    "/zora": "ZORA by Medium",
    "/forge": "Forge by Medium",
    "/human-parts": "Humand Parts by Medium",
    "/marker": "Marker by Medium",
    "/topic/self": "Self Topics",
    "/topic/technology": "Technology Topics",
    "/heated": "Heated by Medium x Mark Bittman",
    "/modus": "Modus by Medium",
    "/topics": "Topics",
    "/me/stories/drafts": "My Stories",
    "/me/stories": "My Stories",
    "/me/series/drafts": "My Series",
    "/me/series": "My Series",
    "/me/stats": "My Stats",
    "/creators": "Creators",
    "/me/list/bookmarks": "Bookmarks",
    "/me/publications": "Publications",
    "/me/settings": "Settings"
  },
  subdomains = {
    help: {
      details: "Viewing help page",
      state: "Probably needs some help."
    } // We can add some stuff if we find it "necessary" in the future.
  };

presence.on("UpdateData", async () => {
  const page = document.location.pathname,
    subdomain = document.location.hostname.split(".")
      ? document.location.hostname.split(".")[0]
      : document.location.hostname,
    title =
      document.querySelector("#\\35 ee1 > h1") ||
      document.querySelector("#\\33 d2a > h1") ||
      document.querySelector("h1"),
    author =
      document.querySelector(
        "#root > div > article > div > section > div > div.kl > div > div.ks.af.l > div > div > span > div > span > a"
      ) ||
      document.querySelector(
        "#root > div > article > div > section > div > div.fr > div > div.fz.af.l > div > div > span > div > span > a"
      ) ||
      document.querySelector("div > span > a"),
    createdAt =
      document.querySelector(
        "#root > div > article > div > section > div > div.kl > div > div.ks.af.l > span > span > div > a"
      ) ||
      document.querySelector(
        "#root > div > article > div > section > div > div.fr > div > div.fz.af.l > span > span > div > a"
      ) ||
      document.querySelector("span > span > div > a"),
    draft = document.querySelector(
      "#_obv\\.shell\\._surface_1570974921796 > div > div.metabar.u-clearfix.u-fixed.u-backgroundTransparentWhiteDarkest.u-xs-sizeFullViewportWidth.js-metabar > div.js-metabarMiddle.metabar-inner.u-marginAuto.u-maxWidth1032.u-flexCenter.u-justifyContentSpaceBetween.u-height65.u-xs-height56.u-paddingHorizontal20 > div.metabar-block.u-flex1.u-flexCenter > div.u-flexCenter.u-height65.u-xs-height56.u-marginLeft10 > span"
    ),
    href = document.location.href
      .replace("https://", "")
      .replace("http://", "");

  const data: { [k: string]: any } = {
    largeImageKey: "medium-logo",
    startTimestamp: Math.floor(Date.now() / 1000)
  };

  if (
    page == "/new-story" ||
    page == "/new-story/" ||
    (draft && draft.textContent != "")
  ) {
    const newArticleTitle = document.querySelector(
      "#editor_6 > section > div.section-content > div > h3"
    );

    data.details = "Writing a New Story";
    data.state =
      newArticleTitle && newArticleTitle.textContent != ""
        ? newArticleTitle.textContent
        : "No title set.";
    data.smallImageKey = "writing";
    data.smallImageText = "Writing a new story...";
  } else if ((page && pages[page]) || (page && pages[page.slice(0, -1)])) {
    data.details = "Viewing a page:";
    data.state = pages[page] || pages[page.slice(0, -1)];
  } else if (
    href.includes("medium.com/@") &&
    href.match("[^/]*$")[0].includes("@") &&
    href.match("[^/]*$")[0] == href.slice(-href.match("[^/]*$")[0].length) &&
    title &&
    title.textContent != ""
  ) {
    data.details = "Viewing a profile:";
    data.state = title.textContent;
  } else if (
    (title && title.textContent != "" && author && author.textContent != "") ||
    (author &&
      author.textContent &&
      document.title.includes(author.textContent + " - "))
  ) {
    data.details = title
      ? title.textContent
      : document.title.replace(author.textContent + " - ", "");
    data.state = `by ${author.textContent}${
      createdAt && createdAt.textContent != ""
        ? " • " + createdAt.textContent
        : ""
    }`;
    data.smallImageKey = "reading";
    data.smallImageText = "Reading a story...";
  } else if (page == "/search") {
    const searchingFor =
      document.querySelector(
        "#_obv\\.shell\\._surface_1570975515304 > div > div.container.u-foreground.u-maxWidth1000.u-paddingTop40 > div.row.u-paddingBottom40.u-xs-paddingBottom20 > header > h1"
      ) || document.querySelector("header > .u-hide");

    data.details = "Searching for:";
    data.state =
      searchingFor && searchingFor.textContent != ""
        ? searchingFor.textContent
        : "Something...";
    data.smallImageKey = "search";
  } else if (subdomains[subdomain] || subdomains[subdomain.slice(0, -1)]) {
    data.details = subdomains[subdomain].details;
    data.state = subdomains[subdomain].state;
  } else {
    data.details = "Viewing a page:";
    data.state = "Home";
  }

  if (data.details && data.state && data.details != "" && data.state != "")
    presence.setActivity(data);
});
