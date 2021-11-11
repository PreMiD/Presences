const presence = new Presence({
    clientId: "808753360152559716"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "logo"
  };

  let story;
  const path = document.location.pathname;
  if (path === "/home" || path === "/") {
    presenceData.details = "Viewing Homepage";
    data.startTimestamp = browsingTimestamp;
  } else if (path.includes("/stories") || path.includes("/featured")) {
    presenceData.details = "Browsing Stories";
    data.startTimestamp = browsingTimestamp;
  } else if (path.startsWith("/user")) {
    presenceData.details = "Viewing User Profile";
    data.state = document.querySelector("#alias").textContent;
    data.startTimestamp = browsingTimestamp;
  } else if (path.includes("/myworks")) {
    if (path.endsWith("/myworks")) {
      presenceData.details = "Viewing their Stories";
      data.startTimestamp = browsingTimestamp;
    } else if (path.includes("/write")) {
      story = document.querySelector("p.group-title").textContent;
      presenceData.details = "Writing a Story";
      data.state = story;
      data.startTimestamp = browsingTimestamp;
    } else if (path.includes("/analytics")) {
      story = document.querySelector(".text-left h2").textContent;
      presenceData.details = "Viewing Analytics";
      data.state = story;
      data.startTimestamp = browsingTimestamp;
    } else if (path.includes("/new")) {
      presenceData.details = "Setting-up a new Story";
      data.startTimestamp = browsingTimestamp;
    } else {
      story = document.querySelector(
        "div.works-item-metadata span.h4"
      ).textContent;
      presenceData.details = "Viewing their Story";
      data.state = story;
      data.startTimestamp = browsingTimestamp;
    }
  } else if (path.includes("/story")) {
    if (path.endsWith("/rankings")) {
      story = document.querySelector("#story-ranking h2").textContent;
      presenceData.details = "Viewing Rankings";
      data.state = story;
      data.startTimestamp = browsingTimestamp;
    } else {
      story = document.querySelector("head > title").textContent;
      presenceData.details = "Viewing a Story";
      data.state = story;
      data.startTimestamp = browsingTimestamp;
    }
  } else if (
    document.location.pathname.split("/")[1].match(/^\d/) ? true : false
  ) {
    story = document.querySelector(
      "#funbar-part-details > span > span.info > h2"
    ).textContent;

    presenceData.details = `Reading ${story}`;
    data.state = document.querySelector(
      "#funbar-story > div > ul > li.active > a > div"
    ).textContent;
    data.startTimestamp = browsingTimestamp;
  } else if (path.includes("/settings")) {
    presenceData.details = "Viewing Settings";
    data.startTimestamp = browsingTimestamp;
  } else if (path.includes("/inbox")) {
    presenceData.details = "Viewing Inbox";
    data.startTimestamp = browsingTimestamp;
  } else if (path.includes("/notifications")) {
    presenceData.details = "Viewing Notifications";
    data.startTimestamp = browsingTimestamp;
  } else if (path.includes("/newsfeed")) {
    presenceData.details = "Viewing Newsfeed";
    data.startTimestamp = browsingTimestamp;
  } else if (path.includes("/library")) {
    presenceData.details = "Viewing Library";
    data.startTimestamp = browsingTimestamp;
  } else if (path.includes("/archive")) {
    presenceData.details = "Viewing Archive";
    data.startTimestamp = browsingTimestamp;
  } else if (path.includes("/list")) {
    presenceData.details = "Viewing Reading Lists";
    data.startTimestamp = browsingTimestamp;
  } else if (path.includes("/invite-friends")) {
    presenceData.details = "Inviting Friends";
    data.startTimestamp = browsingTimestamp;
  } else if (path.includes("/writers")) {
    presenceData.details = "Viewing Writers Resources";
    data.startTimestamp = browsingTimestamp;
  } else if (path.includes("contests")) {
    presenceData.details = "Viewing Writing Contests";
    data.startTimestamp = browsingTimestamp;
  } else if (path.includes("premium")) {
    presenceData.details = "Viewing Premium";
    data.startTimestamp = browsingTimestamp;
  } else {
    presenceData.details = "Somewhere on the site";
    data.startTimestamp = browsingTimestamp;
  }

  presence.setActivity(data);
});
