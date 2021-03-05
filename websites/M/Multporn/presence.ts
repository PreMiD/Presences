const presence = new Presence({
    clientId: "791258115622305813"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
  const button = await presence.getSetting("button"),
    presenceData: PresenceData = {
      largeImageKey: "mplogo"
    },
    title = document.querySelector(
      "body > div#page-wrapper > div#page > div#main-wrapper.clearfix > div#main.clearfix > div#content.column > div.section > h1#page-title.title"
    );

  if (document.location.hostname == "multporn.net") {
    if (document.location.pathname == "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Homepage";
    } else if (document.location.pathname.includes("/comics/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Reading Comic";
      presenceData.state = "Reading: " + title.innerHTML;
    } else if (document.location.pathname.includes("/porn_comics")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Porn Comics";
    } else if (document.location.pathname.includes("/pictures/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Images";
      presenceData.state = "Viewing: " + title.innerHTML;
    } else if (document.location.pathname.includes("/pictures")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Images";
    } else if (document.location.pathname.includes("/video/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Watching Porn";
      presenceData.state = "Watching: " + title.innerHTML;
    } else if (document.location.pathname.includes("/video")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Videos";
    } else if (document.location.pathname.includes("/hentai_manga/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Reading H-Mangas";
      presenceData.state = "Reading: " + title.innerHTML;
    } else if (document.location.pathname.includes("/hentai_manga")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing H-Mangas";
    } else if (document.location.pathname.includes("/hentai_video/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Watching Hentai";
      presenceData.state = "Watching: " + title.innerHTML;
    } else if (document.location.pathname.includes("/hentai_video")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Hentai";
    } else if (document.location.pathname.includes("/hentai/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Hentai";
      presenceData.state = "Viewing: " + title.innerHTML;
    } else if (document.location.pathname.includes("/hentai")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Hentai Images";
    } else if (document.location.pathname.includes("/gif/" || "/GIF/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Gifs";
      presenceData.state = "Watching: " + title.innerHTML;
    } else if (document.location.pathname.includes("/GIF" || "/gif")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Gifs";
    } else if (document.location.pathname.includes("/rule_63/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Rule 63 Images";
      presenceData.state = "Viewing: " + title.innerHTML;
    } else if (document.location.pathname.includes("/rule_63")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Rule 63 Images";
    } else if (document.location.pathname.includes("/gay_porn_comics/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Reading Gay Porn Comics";
      presenceData.state = "Reading: " + title.innerHTML;
    } else if (document.location.pathname.includes("/gay_porn_comics")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Gay Porn Comics";
    } else if (document.location.pathname.includes("/humor/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Reading Adult Humor Comics";
      presenceData.state = "Reading: " + title.innerHTML;
    } else if (document.location.pathname.includes("/humor")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Adult Humor Comics";
    } else if (document.location.pathname.includes("/gif")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Gifs";
    } else if (document.location.pathname.includes("/new")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Newest Comics";
    } else if (document.location.pathname.includes("/best")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Top Comics";
    } else if (document.location.pathname.includes("/random")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Random Comics";
    } else if (document.location.pathname.includes("/search")) {
      //TODO Show Searches
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Searching for Comics";
    }
  }

  if (button) {
    presenceData.buttons = [
      { label: "Read Along", url: document.location.href }
    ];
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
