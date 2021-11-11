const presence = new Presence({
  clientId: "732982987905302570"
});

let lastPlaybackState = null,
  reading,
  browsingTimestamp = Math.floor(Date.now() / 1000),
  title: HTMLElement,
  title2: string,
  tabTitle: string,
  pathname: boolean,
  pageNumber: HTMLElement,
  parody: HTMLElement,
  language: HTMLElement,
  character: HTMLElement,
  tags: HTMLElement,
  category: HTMLElement,
  currentPage: HTMLElement,
  profile: HTMLElement,
  groups: HTMLElement,
  homeCurrentPage: HTMLElement,
  artist: HTMLElement;

const pattern = "- Page",
  searchResult = new URL(document.location.href).searchParams.get("q"),
  truncateAfter = function (str: string, pattern: string): string {
    return str.slice(0, str.indexOf(pattern));
  };

if (lastPlaybackState !== reading) {
  lastPlaybackState = reading;
  browsingTimestamp = Math.floor(Date.now() / 1000);
}

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "largeimage"
  };

  tabTitle = document.title;

  title = document.querySelector("div.gallery_right > div.info > h1");

  if (
    document.location.pathname.includes("/parody/") ||
    document.location.pathname.includes("/parodies/") ||
    document.location.pathname.includes("/tag/") ||
    document.location.pathname.includes("/tags/") ||
    document.location.pathname.includes("/character/") ||
    document.location.pathname.includes("/characters/") ||
    document.location.pathname.includes("/artist/") ||
    document.location.pathname.includes("/artists/") ||
    document.location.pathname.includes("/group/") ||
    document.location.pathname.includes("/groups/")
  )
    pathname = false;
  else if (document.location.pathname.includes("/pag/")) pathname = false;

  if (
    document.location.pathname === "/" ||
    pathname === true ||
    !document.location.pathname
  ) {
    homeCurrentPage = document.querySelector(
      "ul.pagination > li.page-item.active > a.page-link"
    );

    presenceData.details = "Home";
    data.state = `Page: ${homeCurrentPage.textContent}`;
    data.startTimestamp = browsingTimestamp;
  } else if (
    document.location.pathname.includes("/gallery/") ||
    document.location.pathname.includes("/g/")
  ) {
    if (tabTitle.includes("Page")) {
      currentPage = document.querySelector(
        "div.gallery_pagination > button > span.current"
      );

      pageNumber = document.querySelector(
        "div.gallery_pagination > button > span.total_pages"
      );

      title2 = truncateAfter(tabTitle, pattern);

      presenceData.details = `Reading: ${title2}`;

      data.state = `Current page: ${currentPage.textContent}/${pageNumber.textContent}`;

      data.startTimestamp = browsingTimestamp;
    } else if (title.textContent.length > 0) {
      if (title.textContent.length > 128)
        data.state = "Title longer than 128 characters.";
      else data.state = title.textContent;

      presenceData.details = "Viewing a page: ";

      data.startTimestamp = browsingTimestamp;
    }
  } else if (document.location.pathname.includes("/tag/")) {
    presenceData.details = "Browsing tags...";

    tags = document.querySelector(
      "div.galleries_overview.g_center > h1.tag_info > span.skey"
    );
    data.state = `Tag: ${tags.textContent}`;

    data.startTimestamp = browsingTimestamp;
  } else if (document.location.pathname.includes("/artist/")) {
    presenceData.details = "Browsing artists...";

    artist = document.querySelector(
      "div.galleries_overview.g_center > h1.tag_info > span.skey"
    );
    data.state = `Artist: ${artist.textContent}`;

    data.startTimestamp = browsingTimestamp;
  } else if (document.location.pathname.includes("/character/")) {
    presenceData.details = "Browsing characters...";

    character = document.querySelector(
      "div.galleries_overview.g_center > h1.tag_info > span.skey"
    );
    data.state = `Character: ${character.textContent}`;

    data.startTimestamp = browsingTimestamp;
  } else if (document.location.pathname.includes("/parody/")) {
    presenceData.details = "Browsing parodies...";

    parody = document.querySelector(
      "div.galleries_overview.g_center > h1.tag_info > span.skey"
    );
    data.state = `Parody: ${parody.textContent}`;

    data.startTimestamp = browsingTimestamp;
  } else if (document.location.pathname.includes("/group/")) {
    presenceData.details = "Browsing groups...";

    groups = document.querySelector(
      "div.galleries_overview.g_center > h1.tag_info > span.skey"
    );
    data.state = `Group: ${groups.textContent}`;

    data.startTimestamp = browsingTimestamp;
  } else if (document.location.pathname.includes("/language/")) {
    presenceData.details = "Browsing language...";

    language = document.querySelector(
      "div.galleries_overview.g_center > h1.tag_info > span.skey"
    );
    data.state = `Language: ${language.textContent}`;

    data.startTimestamp = browsingTimestamp;
  } else if (document.location.pathname.includes("/category/")) {
    presenceData.details = "Browsing category...";

    category = document.querySelector(
      "div.galleries_overview.g_center > h1.tag_info > span.skey"
    );
    data.state = `Category: ${category.textContent}`;

    data.startTimestamp = browsingTimestamp;
  } else if (document.location.pathname.includes("/parodies/")) {
    presenceData.details = "Browsing parodies...";

    data.startTimestamp = browsingTimestamp;
    delete data.state;
  } else if (document.location.pathname.includes("/tags/")) {
    presenceData.details = "Browsing tags...";

    data.startTimestamp = browsingTimestamp;
    delete data.state;
  } else if (document.location.pathname.includes("/characters/")) {
    presenceData.details = "Browsing characters...";

    data.startTimestamp = browsingTimestamp;
    delete data.state;
  } else if (document.location.pathname.includes("/artists/")) {
    presenceData.details = "Browsing artists...";

    data.startTimestamp = browsingTimestamp;
    delete data.state;
  } else if (document.location.pathname.includes("/groups/")) {
    presenceData.details = "Browsing groups...";

    data.startTimestamp = browsingTimestamp;
    delete data.state;
  } else if (document.location.pathname.includes("/faplist/")) {
    presenceData.details = "Browsing faplist...";

    data.startTimestamp = browsingTimestamp;
    delete data.state;
  } else if (document.location.pathname.includes("/contact/")) {
    presenceData.details = "Browsing contact...";

    data.startTimestamp = browsingTimestamp;
    delete data.state;
  } else if (document.location.pathname.includes("/profile/")) {
    profile = document.querySelector(
      "div.row.profile_block > div.pb_left > h2"
    );

    presenceData.details = "Viewing an profile:";

    data.state = profile.textContent.replace("Welcome,", "");

    data.startTimestamp = browsingTimestamp;
  } else if (document.location.pathname.includes("/search/")) {
    presenceData.details = "Searching for: ";

    data.state = searchResult;

    data.startTimestamp = browsingTimestamp;
  } else {
    presenceData.details = "Browsing...";
    data.startTimestamp = browsingTimestamp;

    delete data.state;
    delete data.smallImageKey;
  }

  presence.setActivity(data);
});
