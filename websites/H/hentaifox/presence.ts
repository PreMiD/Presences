const presence = new Presence({
  clientId: "732982987905302570"
});

let lastPlaybackState = null;
let reading;
let browsingStamp = Math.floor(Date.now() / 1000);

let title: any,
  title2: any,
  currentPage: any,
  pageNumber: any,
  tabTitle: any,
  homeCurrentPage: any,
  tags: any,
  bartist: any,
  bcharacter: any,
  parodies: any,
  groups: any,
  language: any,
  category: any,
  profile: any,
  parodie1: any,
  parodie: any;

const pattern = "- Page";

let character: any,
  parody: any,
  group: HTMLElement,
  tag: HTMLElement,
  artist: HTMLElement;

const searchURL = new URL(document.location.href);
const searchResult = searchURL.searchParams.get("q");

const truncateAfter = function (str: string, pattern: string): string {
  return str.slice(0, str.indexOf(pattern));
};

if (lastPlaybackState != reading) {
  lastPlaybackState = reading;
  browsingStamp = Math.floor(Date.now() / 1000);
}

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "largeimage"
  };

  tabTitle = document.title;

  title = document.querySelector("div.gallery_right > div.info > h1");

  if(document.location.pathname.includes("/parodies/") || document.location.pathname.includes("/tags/") || document.location.pathname.includes("/characters/") || document.location.pathname.includes("/artists/") || document.location.pathname.includes("/groups/")){
    var pathname = false;
  } else if(document.location.pathname.includes("/pag/")) {
    var pathname = true;
  }

  if (document.location.pathname == "/" || pathname == true || !document.location.pathname) {
    homeCurrentPage = document.querySelector(
      "ul.pagination > li.page-item.active > a.page-link"
    );

    data.details = "Home";
    data.state = "Page: " + homeCurrentPage.innerText;
    data.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/gallery/") || document.location.pathname.includes("/g/")) {
    if (tabTitle.includes("Page")) {
      currentPage = document.querySelector(
        "div.gallery_pagination > button > span.current"
      );

      pageNumber = document.querySelector(
        "div.gallery_pagination > button > span.total_pages"
      );

      title2 = truncateAfter(tabTitle, pattern);

      data.details = "Reading: " + title2;

      data.state = "Current page: " + currentPage.innerText + "/" + pageNumber.innerText;

        data.startTimestamp = browsingStamp;
    } else if (title.innerText.length > 0) {
      if (title.innerText.length > 128) {
        data.state = "Title longer than 128 characters.";
      } else {
        data.state = title.innerText;
      }

      data.details = "Viewing a page: ";

      data.startTimestamp = browsingStamp;
    }
  } else if (document.location.pathname.includes("/tag/")) {
    data.details = "Browsing tags...";
    
    tags = document.querySelector(
      "div.galleries_overview.g_center > h1.tag_info > span.skey"
    );
    data.state = "Tag: " + tags.innerText;

    data.startTimestamp = browsingStamp;

  } else if (document.location.pathname.includes("/artist/")) {
    data.details = "Browsing artists...";

    bartist = document.querySelector(
      "div.galleries_overview.g_center > h1.tag_info > span.skey"
    );
    data.state = "Artist: " + bartist.innerText;

    data.startTimestamp = browsingStamp;
  
  } else if (document.location.pathname.includes("/character/")) {
    data.details = "Browsing characters...";

    bcharacter = document.querySelector(
      "div.galleries_overview.g_center > h1.tag_info > span.skey"
    );
    data.state = "Character: " + bcharacter.innerText;

    data.startTimestamp = browsingStamp;

  } else if (document.location.pathname.includes("/parody/")) {
    data.details = "Browsing parodies...";

    parodies = document.querySelector(
      "div.galleries_overview.g_center > h1.tag_info > span.skey"
    );
    data.state = "Parody: " + parodies.innerText;

    data.startTimestamp = browsingStamp;

  } else if (document.location.pathname.includes("/group/")) {
    data.details = "Browsing groups...";

    groups = document.querySelector(
      "div.galleries_overview.g_center > h1.tag_info > span.skey"
    );
    data.state = "Group: " + groups.innerText;

    data.startTimestamp = browsingStamp;

  } else if (document.location.pathname.includes("/language/")) {
    data.details = "Browsing language...";

    language = document.querySelector(
      "div.galleries_overview.g_center > h1.tag_info > span.skey"
    );
    data.state = "Language: " + language.innerText;

    data.startTimestamp = browsingStamp;

  } else if (document.location.pathname.includes("/category/")) {
    data.details = "Browsing category...";

    category = document.querySelector(
      "div.galleries_overview.g_center > h1.tag_info > span.skey"
    );
    data.state = "Category: " + category.innerText;

    data.startTimestamp = browsingStamp;

  } else if (document.location.pathname.includes("/parodies/")) {
    data.details = "Browsing parodies...";

    data.startTimestamp = browsingStamp;
    delete data.state;
  } else if (document.location.pathname.includes("/tags/")) {
    data.details = "Browsing tags...";

    data.startTimestamp = browsingStamp;
    delete data.state;
  } else if (document.location.pathname.includes("/characters/")) {
    data.details = "Browsing characters...";

    data.startTimestamp = browsingStamp;
    delete data.state;
  } else if (document.location.pathname.includes("/artists/")) {
    data.details = "Browsing artists...";

    data.startTimestamp = browsingStamp;
    delete data.state;
  } else if (document.location.pathname.includes("/groups/")) {
    data.details = "Browsing groups...";

    data.startTimestamp = browsingStamp;
    delete data.state;
  } else if (document.location.pathname.includes("/faplist/")) {
    data.details = "Browsing faplist...";

    data.startTimestamp = browsingStamp;
    delete data.state;
  } else if (document.location.pathname.includes("/contact/")) {
    data.details = "Browsing contact...";

    data.startTimestamp = browsingStamp;
    delete data.state;
  } else if (document.location.pathname.includes("/profile/")) {
    profile = document.querySelector(
      "div.row.profile_block > div.pb_left > h2"
    );

    data.details = "Viewing an profile:";

    var ret = profile.innerText.replace('Welcome,','');

    data.state = ret;

    data.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/search/")) {
    data.details = "Searching for: ";

    data.state = searchResult;

    data.startTimestamp = browsingStamp;
  } else {
    data.details = "Browsing...";
    data.startTimestamp = browsingStamp;

    delete data.state;
    delete data.smallImageKey;
  }

  presence.setActivity(data);

});
