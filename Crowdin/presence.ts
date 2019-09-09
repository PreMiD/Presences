const presence = new Presence({
  clientId: "614200757989670934",
  mediaKeys: false
});
const stringsPromise = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused"
});
const PROJECT_PAGE_REGEX = /^\/project\/(?<project>\w+)(\/(?<page>[\w-_]+))?$/;
const startTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const { pathname } = window.location;
  const presenceData: presenceData = {
    largeImageKey: "lg",
    startTimestamp
  };

  let regexResult: RegExpMatchArray;

  if (pathname === "/") {
    presenceData.details = "Home";
  } else if ((regexResult = pathname.match(PROJECT_PAGE_REGEX)) !== null) {
    // @ts-ignore
    const { page } = regexResult.groups;
    const projectNameElement: HTMLSpanElement = document.querySelector(
      "#wrap > div.section > div > h1 > span.project-name-text"
    );

    if (projectNameElement !== null) {
      presenceData.details = projectNameElement.innerText;
      presenceData.state = `Viewing ${page ? page.split("_")[0] : "home"}`;
    } else {
      const projectNamePreviewElement: HTMLAnchorElement = document.querySelector(
        "a.title-name.project-name-preview"
      );
      const languageNameElement: HTMLHeadingElement = document.querySelector(
        "#wrap > div.section > div > h1.language-header"
      );
      presenceData.details = projectNamePreviewElement.innerText;
      presenceData.state = `Viewing files (${languageNameElement.innerText})`;
    }
  } else if (pathname.startsWith("/translate/")) {
    const fileNameElement: HTMLSpanElement = document.querySelector(
      "#file-menu-item > div > span.file-name"
    );
    const languageNameElement: HTMLSpanElement = document.querySelector(
      "#file-language-info > a.btn.mdc-button.open-language-menu > span"
    );
    const projectNameElement: HTMLHeadingElement = document.querySelector(
      "#project-menu-content > ul > li:nth-child(1) > h3"
    );

    presenceData.details = `${projectNameElement.innerText} (${languageNameElement.innerText})`;
    presenceData.state = `Translating ${fileNameElement.innerText}`;
  } else if (pathname.startsWith("/profile")) {
    const usernameElement: HTMLHeadingElement = document.querySelector(
      "#profile-page > div > div > div.profile-left-pane > div > div.profile-page-user.clearfix > div > h3"
    );
    const nicknameElement: HTMLSpanElement = document.querySelector(
      "#profile-page > div > div > div.profile-left-pane > div > div.profile-page-user.clearfix > div > div > span"
    );

    presenceData.details = pathname.endsWith("/activity")
      ? "Viewing activity"
      : "Viewing a profile";
    presenceData.state =
      usernameElement.innerText +
      (nicknameElement ? ` - ${nicknameElement.innerText}` : "");
  } else if (pathname.startsWith("/projects")) {
    const hash = window.location.hash;
    presenceData.details = "Exploring projects";
    presenceData.state =
      !hash || hash === "#showcases" ? "Showcases" : "Searching";
  }

  presence.setActivity(presenceData);
});
