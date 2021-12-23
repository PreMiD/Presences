const presence = new Presence({
    clientId: "917417055458852865"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "artstation",
      startTimestamp: browsingTimestamp
    },
    [, shortTitle] = document.title.split(/-(.+)/);

  if (document.location.pathname.startsWith("/messages")) {
    presenceData.details = "Checking inbox";
    presenceData.smallImageKey = "inbox";
    presenceData.smallImageText = "Checking inbox";
  } else if (
    document.querySelector<HTMLDivElement>(
      "body > div.wrapper > div.wrapper-main > div > div > div.user-profile"
    )
  ) {
    presenceData.details = "Viewing an artist's profile";
    presenceData.state = shortTitle;
    presenceData.smallImageKey = "user";
    presenceData.smallImageText = "Viewing profile";
    presenceData.buttons = [{ label: "View Artist", url: document.URL }];
  } else if (document.location.pathname.startsWith("/artwork")) {
    presenceData.details = "Viewing an artwork";
    presenceData.state = shortTitle;
    presenceData.smallImageKey = "artwork";
    presenceData.smallImageText = "Viewing artwork";
    presenceData.buttons = [
      { label: "View Artwork", url: document.location.href }
    ];
  } else if (document.location.pathname.startsWith("/marketplace"))
    presenceData.details = "Surfing the marketplace";
  else if (document.location.pathname.startsWith("/studios"))
    presenceData.details = "Visiting studios";
  else if (document.location.href.indexOf("/jobs") > -1) {
    presenceData.details = "Viewing jobs";
    presenceData.state = document
      .querySelector('meta[property="og:title"]')
      .getAttribute("content");
    presenceData.smallImageKey = "searchjob";
    presenceData.smallImageText = "Viewing jobs";
  } else if (document.location.pathname === "/blogs")
    presenceData.details = "Reading blogs";
  else if (document.location.pathname.startsWith("/blogs")) {
    presenceData.details = "Reading a blog";
    presenceData.state = shortTitle;
  } else if (document.location.pathname === "/contests")
    presenceData.details = "Looking for challenges";
  else if (document.location.pathname.startsWith("/contests")) {
    presenceData.details = "Viewing a challenge";
    presenceData.state = shortTitle;
  } else if (document.location.pathname === "/podcast")
    presenceData.details = "Finding a podcast";
  else if (document.location.pathname === "/guides")
    presenceData.details = "Looking for guides";
  else if (document.location.pathname === "/learning") {
    presenceData.details = "Learning";
    presenceData.smallImageKey = "learning";
    presenceData.smallImageText = "Learning";
  } else if (document.location.href.indexOf("courses") > -1) {
    presenceData.details = "Viewing a course";
    presenceData.state = shortTitle;
    presenceData.smallImageKey = "learning";
    presenceData.smallImageText = "Learning";
  } else if (document.location.href.indexOf("series") > -1) {
    presenceData.details = "Viewing a series";
    presenceData.state = shortTitle;
    presenceData.smallImageKey = "learning";
    presenceData.smallImageText = "Learning";
  } else if (document.location.href.indexOf("instructors") > -1) {
    presenceData.details = "Viewing an instructor";
    presenceData.state = shortTitle;
    presenceData.smallImageKey = "learning";
    presenceData.smallImageText = "Learning";
  } else if (document.location.href.indexOf("playlists") > -1) {
    presenceData.details = "Viewing a playlist";
    presenceData.state = shortTitle;
    presenceData.smallImageKey = "learning";
    presenceData.smallImageText = "Learning";
  } else if (document.location.href.indexOf("settings") > -1)
    presenceData.details = "Changing settings";
  else if (document.location.href.indexOf("profile/edit") > -1) {
    presenceData.details = "Editing profile";
    presenceData.smallImageKey = "editprofile";
    presenceData.smallImageText = "Editing profile";
  } else if (document.location.href.indexOf("project/new") > -1) {
    presenceData.details = "Uploading an artwork";
    presenceData.smallImageKey = "upload";
    presenceData.smallImageText = "Uploading artwork";
  } else if (document.location.hostname === "magazine.artstation.com") {
    presenceData.details = "Reading magazines";
    presenceData.state = shortTitle;
  } else if (document.location.hostname === "www.artstation.com") {
    presenceData.details = "Exploring artworks";
    presenceData.smallImageKey = "artwork";
    presenceData.smallImageText = "Exploring artworks";
  } else {
    presenceData.details = "Viewing a portfolio of:";
    presenceData.state = document
      .querySelector('meta[property="og:site_name"]')
      .getAttribute("content");
    presenceData.smallImageKey = "portfolio";
    presenceData.smallImageText = "Viewing portfolio";
  }
  presence.setActivity(presenceData);
});
