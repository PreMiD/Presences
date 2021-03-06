const presence = new Presence({
    clientId: "808753360152559716"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "logo"
  };

  let story;
  const path = document.location.pathname,
    storyCheck = document.location.pathname.split("/")[1].match(/^\d/)
      ? true
      : false;
  if (path == "/home") {
    data.details = "Viewing Homepage";
    data.startTimestamp = browsingStamp;
  } else if (path.includes("/stories") || path.includes("/featured")) {
    data.details = "Browsing Stories";
    data.startTimestamp = browsingStamp;
  } else if (path.startsWith("/user")) {
    const user = document.querySelector("#alias").textContent;
    data.details = "Viewing User Profile";
    data.state = user;
    data.startTimestamp = browsingStamp;
  } else if (path.includes("/myworks")) {
    if (path.endsWith("/myworks")) {
      data.details = "Viewing their Stories";
      data.startTimestamp = browsingStamp;
    } else if (path.includes("/write")) {
      story = document.querySelector("p.group-title").textContent;
      data.details = "Writing a Story";
      data.state = story;
      data.startTimestamp = browsingStamp;
    } else if (path.includes("/analytics")) {
      story = document.querySelector(".text-left h2").textContent;
      data.details = "Viewing Analytics";
      data.state = story;
      data.startTimestamp = browsingStamp;
    } else if (path.includes("/new")) {
      data.details = "Setting-up a new Story";
      data.startTimestamp = browsingStamp;
    } else {
      story = document.querySelector("div.works-item-metadata span.h4")
        .textContent;
      data.details = "Viewing their Story";
      data.state = story;
      data.startTimestamp = browsingStamp;
    }
  } else if (path.includes("/story")) {
    if (path.endsWith("/rankings")) {
      story = document.querySelector("#story-ranking h2").textContent;
      data.details = "Viewing Rankings";
      data.state = story;
      data.startTimestamp = browsingStamp;
    } else {
      story = document.querySelector("#story-landing h1").textContent;
      data.details = "Viewing a Story";
      data.state = story;
      data.startTimestamp = browsingStamp;
    }
  } else if (storyCheck) {
    story = document.querySelector("span.info h1.title").textContent;
    const chapter = document.querySelector(".panel-reading h2").textContent;
    data.details = "Reading " + story;
    data.state = chapter;
    data.startTimestamp = browsingStamp;
  } else if (path.includes("/settings")) {
    data.details = "Viewing Settings";
    data.startTimestamp = browsingStamp;
  } else if (path.includes("/inbox")) {
    data.details = "Viewing Inbox";
    data.startTimestamp = browsingStamp;
  } else if (path.includes("/notifications")) {
    data.details = "Viewing Notifications";
    data.startTimestamp = browsingStamp;
  } else if (path.includes("/newsfeed")) {
    data.details = "Viewing Newsfeed";
    data.startTimestamp = browsingStamp;
  } else if (path.includes("/library")) {
    data.details = "Viewing Library";
    data.startTimestamp = browsingStamp;
  } else if (path.includes("/archive")) {
    data.details = "Viewing Archive";
    data.startTimestamp = browsingStamp;
  } else if (path.includes("/list")) {
    data.details = "Viewing Reading Lists";
    data.startTimestamp = browsingStamp;
  } else if (path.includes("/invite-friends")) {
    data.details = "Inviting Friends";
    data.startTimestamp = browsingStamp;
  } else if (path.includes("/writers")) {
    data.details = "Viewing Writers Resources";
    data.startTimestamp = browsingStamp;
  } else if (path.includes("contests")) {
    data.details = "Viewing Writing Contests";
    data.startTimestamp = browsingStamp;
  } else if (path.includes("premium")) {
    data.details = "Viewing Premium";
    data.startTimestamp = browsingStamp;
  } else {
    data.details = "Somewhere on the site";
    data.startTimestamp = browsingStamp;
  }

  presence.setActivity(data);
});
