const presence = new Presence({
  clientId: "791258115622305813"
}),

 browsingStamp = Math.floor(Date.now() / 1000);
let viewing: unknown;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "mplogo"
  };

  if (document.location.hostname == "multporn.net") {
    if (document.location.pathname == "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Homepage";
    } else if (document.location.pathname.includes("/comics/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Reading Comic";
      viewing = document.querySelector(
        "body > div#page-wrapper > div#page > div#main-wrapper.clearfix > div#main.clearfix > div#content.column > div.section > h1#page-title.title"
      );
      presenceData.state = "Reading: " + viewing.innerText;
    } else if (document.location.pathname.includes("/porn_comics")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Porn Comics";
    } else if (document.location.pathname.includes("/pictures/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Images";
      viewing = document.querySelector(
        "body > div#page-wrapper > div#page > div#main-wrapper.clearfix > div#main.clearfix > div#content.column > div.section > h1#page-title.title"
      );
      presenceData.state = "Viewing: " + viewing.innerText;
    } else if (document.location.pathname.includes("/pictures")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Images";
    } else if (document.location.pathname.includes("/video/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Watching Porn";
      viewing = document.querySelector(
        "body > div#page-wrapper > div#page > div#main-wrapper.clearfix > div#main.clearfix > div#content.column > div.section > h1#page-title.title"
      );
      presenceData.state = "Watching: " + viewing.innerText;
    } else if (document.location.pathname.includes("/video")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Videos";
    } else if (document.location.pathname.includes("/hentai_manga/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Reading H-Mangas";
      viewing = document.querySelector(
        "body > div#page-wrapper > div#page > div#main-wrapper.clearfix > div#main.clearfix > div#content.column > div.section > h1#page-title.title"
      );
      presenceData.state = "Reading: " + viewing.innerText;
    } else if (document.location.pathname.includes("/hentai_manga")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing H-Mangas";
    } else if (document.location.pathname.includes("/hentai_video/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Watching Hentai";
      viewing = document.querySelector(
        "body > div#page-wrapper > div#page > div#main-wrapper.clearfix > div#main.clearfix > div#content.column > div.section > h1#page-title.title"
      );
      presenceData.state = "Watching: " + viewing.innerText;
    } else if (document.location.pathname.includes("/hentai_video")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Hentai";
    } else if (document.location.pathname.includes("/hentai/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Hentai";
      viewing = document.querySelector(
        "body > div#page-wrapper > div#page > div#main-wrapper.clearfix > div#main.clearfix > div#content.column > div.section > h1#page-title.title"
      );
      presenceData.state = "Viewing: " + viewing.innerText;
    } else if (document.location.pathname.includes("/hentai")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Hentai Images";
    } else if (document.location.pathname.includes("/gif/" || "/GIF/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Gifs";
      viewing = document.querySelector(
        "body > div#page-wrapper > div#page > div#main-wrapper.clearfix > div#main.clearfix > div#content.column > div.section > h1#page-title.title"
      );
      presenceData.state = "Watching: " + viewing.innerText;
    } else if (document.location.pathname.includes("/GIF" || "/gif")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Gifs";
    } else if (document.location.pathname.includes("/rule_63/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Rule 63 Images";
      viewing = document.querySelector(
        "body > div#page-wrapper > div#page > div#main-wrapper.clearfix > div#main.clearfix > div#content.column > div.section > h1#page-title.title"
      );
      presenceData.state = "Viewing: " + viewing.innerText;
    } else if (document.location.pathname.includes("/rule_63")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Rule 63 Images";
    } else if (document.location.pathname.includes("/gay_porn_comics/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Reading Gay Porn Comics";
      viewing = document.querySelector(
        "body > div#page-wrapper > div#page > div#main-wrapper.clearfix > div#main.clearfix > div#content.column > div.section > h1#page-title.title"
      );
      presenceData.state = "Reading: " + viewing.innerText;
    } else if (document.location.pathname.includes("/gay_porn_comics")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Gay Porn Comics";
    } else if (document.location.pathname.includes("/humor/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Reading Adult Humor Comics";
      viewing = document.querySelector(
        "body > div#page-wrapper > div#page > div#main-wrapper.clearfix > div#main.clearfix > div#content.column > div.section > h1#page-title.title"
      );
      presenceData.state = "Reading: " + viewing.innerText;
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
    } else if (document.location.pathname.includes("/search")) {    //TODO Show Searches
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Searching for Comics";
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle(); //Clears the tray title for mac users
    presence.setActivity(); /*Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name*/
  } else {
    presence.setActivity(presenceData); //Update the presence with all the values from the presenceData object
  }
});
