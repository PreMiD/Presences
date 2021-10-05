const presence = new Presence({
    clientId: "642719342609432586"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
let title: HTMLElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "ff"
  };

  if (document.location.hostname === "www.fimfiction.net") {
    if (document.location.pathname === "/") {
      presenceData.details = "Viewing home page";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.querySelector("#chapter_title") !== null) {
      presenceData.details = `Reading: ${
        document.querySelector(
          "#chapter_format > div.story-page-header > div.inner > div.info-container > div > h1 > a"
        ).textContent
      }`;
      presenceData.state = `Chapter: ${
        document.querySelector("#chapter_title").textContent
      }`;
      presenceData.smallImageKey = "reading";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/story/")) {
      presenceData.details = "Viewing story:";
      presenceData.state = document.querySelector(".story_name").textContent;
      presenceData.smallImageKey = "reading";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/user/")) {
      presenceData.details = "Viewing user:";
      presenceData.state = document.querySelector(
        "body > div.body-layout > div.body_container > div:nth-child(4) > div > div.user-page-header > div > div.info-container > h1 > a"
      ).textContent;
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/tag/")) {
      presenceData.details = "Viewing tag:";
      presenceData.state = document.querySelector(
        "body > div.body-layout > div.body_container > div:nth-child(4) > div > div > form > div > div > div.tag-header-inner > div.info > h1 > a"
      ).textContent;
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/blog/")) {
      presenceData.details = "Reading blog post:";
      title =
        document.querySelector(
          "body > div.body-layout > div.body_container > div:nth-child(4) > div.content.mobile-no-margin > div.two-columns > div.left > div > div.content_box.blog-post-content-box > h1 > span"
        ) ||
        document.querySelector(
          "body > div.body-layout > div.body_container > div:nth-child(4) > div > div.content.mobile-no-margin > div > div.left > div > div.content_box.blog-post-content-box > h1 > span > a"
        );
      presenceData.state = title.textContent;
      presenceData.smallImageKey = "reading";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/news/story-reviews")) {
      presenceData.details = "Viewing story revies";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/group/")) {
      presenceData.details = "Viewing group:";
      presenceData.state = document.querySelector(".group_name").textContent;
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/groups")) {
      presenceData.details = "Viewing all groups";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/stories")) {
      presenceData.details = "Browsing stories...";
      presenceData.startTimestamp = browsingStamp;
    }
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
