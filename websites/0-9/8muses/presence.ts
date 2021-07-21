const presence = new Presence({
    clientId: "717563140300210196"
  }),
  strings = presence.getStrings({
    search: "presence.activity.searching"
  });

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };
  if (new URLSearchParams(window.location.search).has("s")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Searching for:";
    presenceData.state = document.title.split(" -").shift();
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = (await strings).search;
  } else if (document.location.pathname == "/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing Homepage";
  } else if (document.location.pathname.includes("/category/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing a category:";
    presenceData.state = (
      document.querySelector(
        "#top-menu > div.top-menu-breadcrumb > ol > li:nth-child(2) > a"
      ) as HTMLAnchorElement
    ).text;
  } else if (document.location.href.includes("/#")) {
    const comicName = (
      document.querySelector("head > meta:nth-child(17)") as HTMLMetaElement
    ).content;
    const issueName = document.location.pathname
      .split("/")[2]
      .replace(/_/g, " ");
    const issueNumber = document
      .querySelector("#left-menu > ol > li:nth-child(3) > div > span")
      .textContent.trim();
    if (document.location.pathname.split("/")[2].includes("")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = comicName + " - " + issueName;
      presenceData.state = issueNumber;
      presenceData.smallImageKey = "reading";
    } else {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = comicName;
      presenceData.state = issueNumber;
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
