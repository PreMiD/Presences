const presence = new Presence({
  clientId: "616738921765667023"
});
let title: HTMLElement,
  mTitle: HTMLMetaElement,
  search: HTMLInputElement,
  search2: HTMLInputElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    path = document.location.pathname;
  if (path === "/") presenceData.details = "Viewing the homepage";
  else if (path.includes("posts")) {
    search = document.querySelector("#tags");
    if (search.value !== "") {
      presenceData.details = "Searching Posts For:";
      presenceData.state = search.value;
    } else if (document.location.href.includes("/posts?tags=")) {
      mTitle = document.querySelector('meta[name="og:title"]');
      presenceData.details = "Viewing posts about:";
      presenceData.state = mTitle.content.slice(0, mTitle.content.length - 6);
    } else if (path.includes("posts/")) {
      mTitle = document.querySelector('meta[property="og:title"]');
      const split = mTitle.content
        .slice(0, mTitle.content.length - 6)
        .split("created by");
      presenceData.details = split[0];
      presenceData.state = `Created By: ${split[1]}`;
    } else {
      presenceData.details = "All Posts";
      delete presenceData.state;
    }
  } else if (path.includes("comments")) {
    title = document.querySelector(
      "#a-index > div.paginator > menu > li.current-page"
    );
    presenceData.details = "Comments";
    presenceData.state = `Page ${title.textContent}`;
  } else if (path.includes("users/")) {
    title = document.querySelector("head > title");
    presenceData.details = `Viewing ${title.textContent.slice(
      9,
      title.textContent.length - 8
    )}'s Profile`;
  } else if (path.includes("artists")) {
    search = document.querySelector("#search_any_name_matches");
    if (!search) search = document.querySelector("#quick_search_name");
    if (search.value !== "") {
      presenceData.details = "Searching Artists For:";
      presenceData.state = search.value;
    } else if (path.includes("artists/")) {
      title = document.querySelector("#a-show > h1 > a");
      presenceData.details = `Viewing Artist: ${title.textContent.replace(
        "(artist)",
        ""
      )}`;
    } else presenceData.details = "Artists";
  } else if (path.includes("tags")) {
    search = document.querySelector("#search_name_matches");
    if (search.value !== "") {
      presenceData.details = "Searching Artists For:";
      presenceData.state = search.value;
    } else if (document.location.href.includes("&search%5Border%5D=")) {
      title = document.querySelector("#search_order");
      const string = document.location.href.slice(
        document.location.href.length - 6,
        document.location.href.length
      );
      let sortedBy: string;
      if (string.includes("name")) {
        sortedBy = "Name";
      } else if (string.includes("count")) {
        sortedBy = "Count";
      } else if (string.includes("date")) {
        sortedBy = "Newest";
      }
      presenceData.details = "All Tags";
      presenceData.state = `Sorted by: ${sortedBy}`;
    } else presenceData.details = "All Tags";
  } else if (path.includes("blips")) {
    title = document.querySelector(
      "#paginator > div > menu > li.current-page > span"
    );
    presenceData.details = "Blips";
    presenceData.state = `Page ${title.textContent}`;
  }
  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
