const presence = new Presence({
    clientId: "715667985267949649"
  }),
  browsingStamp = Math.floor(Date.now() / 1000),
  path = document.location.pathname;

let title, subTitle, chapter, quiz, search;
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingStamp
  };
  if (path === "/") presenceData.details = "Viewing Home";
  else if (path.includes("/literature/")) {
    title = document.querySelector(
      "#mainTag > section > div:nth-child(1) > div.small-12.medium-9.columns > div.title-wrapper > h1"
    ) as HTMLTextAreaElement;
    subTitle = document.querySelector(
      "#mainTag > div.row.background-white > div.small-12.medium-9.columns.left-rail-column.clear-padding-for-small-only > div > div.small-12.medium-9.columns > article > h2 > span:nth-child(2)"
    ) as HTMLTextAreaElement;
    chapter = document.querySelector(
      "#mainTag > div.row.background-white > div.small-12.medium-9.columns.left-rail-column.clear-padding-for-small-only > div > div.small-12.medium-9.columns > article > h2"
    ) as HTMLTextAreaElement;
    quiz = document.querySelector("#headerid");
    if (title && chapter) {
      presenceData.details = title.innerText;
      presenceData.state = chapter.innerText;

      presenceData.smallImageKey = "read";
      presenceData.smallImageText = "Reading";
    } else if (title && subTitle) {
      presenceData.details = title.innerText;
      presenceData.state = subTitle.innerText;

      presenceData.smallImageKey = "read";
      presenceData.smallImageText = "Reading";
    } else if (quiz) presenceData.details = "Taking a Quiz";
    else {
      title = document.querySelector(
        "#mainTag > div.row.background-white > div.small-12.medium-9.columns.left-rail-column.clear-padding-for-small-only > div > div.small-12.medium-9.columns > div > div > div > div.small-12.medium-12.columns.clear-padding > article > h2"
      ) as HTMLTextAreaElement;
      if (title) presenceData.details = title.innerText;
    }
  } else if (path.includes("/test-prep")) {
    title = document.querySelector(
      "#mainTag > section > div:nth-child(1) > div.small-12.medium-9.columns > div.title-wrapper > h1"
    ) as HTMLTextAreaElement;
    subTitle = document.querySelector(
      "#mainTag > div.row.background-white > div.small-12.medium-9.columns.left-rail-column.clear-padding-for-small-only > div > div.small-12.medium-9.columns > article > h2 > span:nth-child(2)"
    ) as HTMLTextAreaElement;
    chapter = document.querySelector(
      "#mainTag > div.row.background-white > div.small-12.medium-9.columns.left-rail-column.clear-padding-for-small-only > div > div.small-12.medium-9.columns > article > h2"
    ) as HTMLTextAreaElement;
    quiz = document.querySelector("#headerid");
    if (title && chapter) {
      presenceData.details = title.innerText;
      presenceData.state = chapter.innerText;

      presenceData.smallImageKey = "read";
      presenceData.smallImageText = "Reading";
    } else if (title && subTitle) {
      presenceData.details = title.innerText;
      presenceData.state = subTitle.innerText;

      presenceData.smallImageKey = "read";
      presenceData.smallImageText = "Reading";
    } else if (quiz) presenceData.details = "Taking a Quiz";
    else presenceData.details = "Viewing Test Prep";
  } else if (path.includes("/study-guides/")) {
    title = document.querySelector(
      "#phsubheader_0_headerTitle"
    ) as HTMLTextAreaElement;
    subTitle = document.querySelector(
      "#mainTag > div.row.background-white > div.small-12.medium-9.columns.left-rail-column.clear-padding-for-small-only > div > div.small-12.medium-9.columns > div > div > h2"
    ) as HTMLTextAreaElement;
    chapter = document.querySelector(
      "#mainTag > div.row.background-white > div.small-12.medium-9.columns.left-rail-column.clear-padding-for-small-only > div > div.small-12.medium-9.columns > article > h2"
    ) as HTMLTextAreaElement;
    quiz = document.querySelector("#headerid");
    if (title && chapter) {
      presenceData.details = title.innerText;
      presenceData.state = chapter.innerText;

      presenceData.smallImageKey = "read";
      presenceData.smallImageText = "Reading";
    } else if (title && subTitle) {
      presenceData.details = title.innerText;
      presenceData.state = subTitle.innerText;

      presenceData.smallImageKey = "read";
      presenceData.smallImageText = "Reading";
    } else if (quiz) presenceData.details = "Taking a Quiz";
    else presenceData.details = "Viewing Study Guides";
  } else if (path.includes("/search")) {
    search = document.querySelector(
      "#phsection1_1_phmiddlesection_0_searchResults > div > h3 > span"
    ) as HTMLTextAreaElement;
    if (search) {
      presenceData.details = "Searching:";
      presenceData.state = search.innerText;

      presenceData.smallImageKey = "search";
      presenceData.smallImageText = "Searching";
    }
  } else if (path.includes("/discover-")) {
    title = document.querySelector(
      "#mainTag > section > div:nth-child(1) > div > div > h1"
    ) as HTMLTextAreaElement;
    presenceData.details = `Viewing ${title.innerText}`;
  } else if (path === "/disclaimer")
    presenceData.details = "Viewing Disclaimer";
  else presenceData.details = "Viewing a Special Page";

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
