const presence = new Presence({
    clientId: "923958284032032818"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: browsingTimestamp
    },
    [shortTitle] = document.title.split(/[|]/, 1),
    path = document.location.pathname;

  if (path === "/post") presenceData.details = "Browsing posts";
  else if (path.startsWith("/post")) {
    presenceData.details = "Viewing an artwork";
    presenceData.state = shortTitle;
    presenceData.buttons = [
      { label: "View Artwork", url: document.location.href }
    ];
  } else if (path.startsWith("/history"))
    presenceData.details = "Viewing post history";
  else if (path === "/comment") presenceData.details = "Reading comments";
  else if (path === "/note") presenceData.details = "Reading notes";
  else if (path === "/wiki") presenceData.details = "Browsing the wiki";
  else if (path.startsWith("/wiki")) {
    presenceData.details = "Reading a wiki page";
    presenceData.state = shortTitle;
  } else if (path === "/artist") presenceData.details = "Browsing artists";
  else if (path.startsWith("/artist")) {
    presenceData.details = "Viewing an artist";
    presenceData.state = shortTitle;
    presenceData.buttons = [
      { label: "View Artist", url: document.location.href }
    ];
  } else if (path === "/user") presenceData.details = "Looking up users";
  else if (path.startsWith("/user")) {
    presenceData.details = "Viewing a user";
    presenceData.state = shortTitle;
  } else if (path === "/tag") presenceData.details = "Browsing tags";
  else if (path === "/pool") presenceData.details = "Browsing pools";
  else if (path.startsWith("/pool")) {
    presenceData.details = "Viewing a pool";
    presenceData.state = shortTitle;
  } else if (path === "/forum") presenceData.details = "Browsing the forum";
  else if (path.startsWith("/forum")) {
    presenceData.details = "Viewing a forum";
    presenceData.state = shortTitle;
  } else if (
    document.location.href === "https://konachan.com/" ||
    document.location.href === "https://konachan.net/"
  )
    presenceData.details = "Home page";
  else presenceData.details = "Browsing the site";
  presence.setActivity(presenceData);
});
