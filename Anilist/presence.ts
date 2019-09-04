const presence = new Presence({
  clientId: "614220272790274199"
});
const USER_PAGE_REGEX = /^\/user\/(?<user>\w+)\/(?<pageType>\w+)?/;
const SEARCH_PAGE_REGEX = /^\/search\/(?<type>\w+)/;
const startTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const { pathname } = window.location;
  const presenceData: presenceData = {
    largeImageKey: "anilist_lg",
    startTimestamp
  };

  const contentTitleElement: HTMLHeadingElement = document.querySelector(
    "div.content > h1:first-child"
  );
  const containerTitleElement: HTMLHeadingElement = document.querySelector(
    "div.container > h1:first-child"
  );
  const forumPostTitleElement: HTMLHeadingElement = document.querySelector(
    ".forum-thread > h1.title"
  );

  let regexResult: RegExpMatchArray;

  if (pathname.includes("home")) {
    const strings = await presence.getStrings({
      browsing: "presence.activity.browsing"
    });
    presenceData.details = strings.browsing;
    presenceData.state = "Home";
  } else if ((regexResult = pathname.match(USER_PAGE_REGEX)) !== null) {
    // @ts-ignore
    const { user, pageType } = regexResult.groups;
    presenceData.details = `Viewing ${user}'s ${
      !pageType ? "profile" : pageType
    }`;
  } else if ((regexResult = pathname.match(SEARCH_PAGE_REGEX)) !== null) {
    // @ts-ignore
    const { type } = regexResult.groups;
    const input: HTMLInputElement = document.querySelector(
      "input.el-input__inner"
    );
    presenceData.details = `Searching for an ${type.toLowerCase()}`;
    if (input.value.trim().length > 0) {
      presenceData.state = `'${input.value}'`;
    }
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Searching";
  } else if (pathname.startsWith("/anime")) {
    presenceData.details = "Looking an anime";
    presenceData.state = contentTitleElement.innerText;
  } else if (pathname.startsWith("/manga")) {
    presenceData.details = "Looking an manga";
    presenceData.state = contentTitleElement.innerText;
  } else if (pathname.startsWith("/forum")) {
    if (pathname.split("/").length > 3) {
      presenceData.details = "Reading a forum post";
      presenceData.state = `'${forumPostTitleElement.innerText.trim()}'`;
    } else {
      presenceData.details = "Browsing the forum";
    }
  } else if (pathname.startsWith("/studio")) {
    presenceData.details = "Looking a studio";
    presenceData.state = containerTitleElement.innerText;
  }

  if (!presenceData.details) {
    presence.setActivity();
    presence.setTrayTitle();
  } else {
    presence.setActivity(presenceData, true);
  }
});
