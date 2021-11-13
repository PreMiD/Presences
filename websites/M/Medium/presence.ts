const medium = new Presence({
    clientId: "632936001269923880"
  }),
  pages: { [k: string]: string } = {
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
  };

medium.on("UpdateData", async () => {
  const page = document.location.pathname,
    title = document.querySelector("article div section div div div h1"),
    author =
      document.querySelector("div span div div a[href*=post_page---] p") ||
      document.querySelector("span div span a[href*=post_page---]"),
    [, ...hrefRest] = document.location.href.split("//"),
    href = hrefRest.join(""),
    presenceData: PresenceData = {
      largeImageKey: "medium-logo",
      startTimestamp: Math.floor(Date.now() / 1000)
    };

  if ((page && pages[page]) || (page && pages[page.slice(0, -1)])) {
    presenceData.details = "Viewing a page:";
    presenceData.state = pages[page] || pages[page.slice(0, -1)];
  } else if (
    href.includes("medium.com/@") &&
    href.match("[^/]*$")[0].includes("@") &&
    href.match("[^/]*$")[0] === href.slice(-href.match("[^/]*$")[0].length)
  ) {
    const user = document.querySelector("div div div div h2");

    presenceData.details = "Viewing a profile:";
    presenceData.state = user?.textContent || "Unknown User";
  } else if (
    (title?.textContent && author?.textContent) ||
    (author?.textContent && document.title.includes(`${author?.textContent}-`))
  ) {
    presenceData.details =
      title?.textContent ||
      document.title.replace(`${author.textContent}-`, "");
    presenceData.state = `by ${author.textContent}`;

    presenceData.smallImageKey = "reading";
    presenceData.smallImageText = "Reading a story...";
  } else if (page.includes("/search")) {
    const searchingFor = new URLSearchParams(location.search).get("q");

    presenceData.details = "Searching for:";
    presenceData.state = searchingFor || "Something...";

    presenceData.smallImageKey = "search";
  } else {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Home";
  }

  medium.setActivity(presenceData);
});
