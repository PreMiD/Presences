const presence = new Presence({
    clientId: "758864138897850368"
  }),
  startTimeStamp = Math.round(Date.now());
let author: string,
  title: string,
  language: string,
  searchQuery: string,
  username: string;
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "flickr_logo",
    startTimestamp: startTimeStamp,
    smallImageKey: "flickr_logo",
    smallImageText: "Viewing Images or videos on Flickr"
  };
  if (document.location.hostname === "www.flickr.com") {
    if (
      document.location.pathname === "/" ||
      document.location.pathname === "/new/"
    )
      presenceData.details = "Viewing home page";
    else if (document.location.pathname.includes("/photos/")) {
      if (
        document.location.pathname.split("/").length === 4 ||
        document.location.pathname.split("/").length === 5
      ) {
        [, , username] = document.location.pathname.split("/");
        presenceData.details = `Viewing user: ${username}`;
        if (document.location.pathname.split("/")[3].length !== 0) {
          presenceData.state = `Viewing their: ${
            document.location.pathname.split("/")[3]
          }`;
        }
        return;
      }
      title = document.querySelector("title").innerText;
      [, title] = title.split("|");
      [, author] = document.querySelector("title").innerText;
      presenceData.details = `Viewing: ${title}`;
      presenceData.state = `From: ${author}`;
    } else if (document.location.pathname === "/about")
      presenceData.details = "Viewing what Flickr is about";
    else if (document.location.pathname === "/jobs")
      presenceData.details = "Viewing job oppurtunities at Flickr";
    else if (document.location.pathname === "/services/developer")
      presenceData.details = "Viewing the Flickr Developer Guide";
    else if (document.location.pathname === "/help/guidelines")
      presenceData.details = "Viewing the Flickr Guidelines";
    else if (document.location.pathname === "/help/terms")
      presenceData.details = "Viewing the Flickr Terms & Conditions of Use";
    else if (document.location.pathname === "/help/privacy")
      presenceData.details = "Viewing the Flickr Privacy Policy";
    else if (document.location.pathname === "/help/api")
      presenceData.details = "Viewing the Flickr APIs Terms of Use";
    else if (document.location.pathname === "/help/cookies")
      presenceData.details = "Viewing the Flickr Policy on Cookies";
    else if (document.location.pathname === "/help/dpa")
      presenceData.details = "Viewing the Flickr Data Processing Addendum";
    else if (document.location.pathname === "/explore")
      presenceData.details = "Exploring cool images";
    else if (document.location.pathname === "/photos/tags")
      presenceData.details = "Exploring popular tags";
    else if (document.location.pathname === "/events")
      presenceData.details = "Viewing Flickr events";
    else if (document.location.pathname === "/commons")
      presenceData.details = "Viewing the Flickr Commons";
    else if (document.location.pathname.startsWith("/help/forum/")) {
      [, , , , language] = document.location.pathname.split("/");
      presenceData.details = `Viewing the Flickr Help Forums in: ${language}`;
      if (document.location.pathname.split("/").length === 6) {
        title = document.querySelector("title").innerText;
        [, , title] = title.split(":");
        //Flickr automatically adds a space in front of the colon
        presenceData.state = `Viewing:${title}`;
      }
    } else if (document.location.pathname.startsWith("/search/")) {
      searchQuery = document.querySelector("title").innerText;
      [, searchQuery] = searchQuery.split(":");
      [searchQuery] = searchQuery.split("|");
      presenceData.details = `Searching:${searchQuery}`;
    } else if (document.location.pathname === "/map")
      presenceData.state = "Viewing Flickr's worldmap";
  }
  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
