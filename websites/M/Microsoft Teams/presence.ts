const presence = new Presence({
    clientId: "846725225219489812"
  }),
  startTime = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "icon",
    startTimestamp: startTime
  };

  if (document.location.pathname === "/")
    presenceData.details = await presence.getSetting("homepageMessage");
  else if (document.location.href.includes("/calendar"))
    presenceData.details = await presence.getSetting("calendarMessage");
  else if (document.location.href.includes("/my/file"))
    presenceData.details = await presence.getSetting("filesMessage");
  else if (document.location.href.includes("/conversations/"))
    presenceData.details = await presence.getSetting("conversationsMessage");
  else if (
    document.location.href.includes(
      "/apps/66aeee93-507d-479a-a3ef-8f494af43945"
    )
  )
    presenceData.details = await presence.getSetting("homeworkMessage");
  else if (document.location.href.includes("/analytics/"))
    presenceData.details = await presence.getSetting("analyticsMessage");
  else if (document.location.href.includes("/manageteams/"))
    presenceData.details = await presence.getSetting("manageMessage");
  else if (document.location.href.includes("/gradebook/"))
    presenceData.details = await presence.getSetting("gradesMessage");
  else if (
    document.location.href.includes(
      "/tab::6f9be796-2b0f-441f-a79a-800563081010/"
    )
  )
    presenceData.details = await presence.getSetting("notesMessage");
  else if (document.location.href.includes("/school/classroom/"))
    presenceData.details = await presence.getSetting("teamHomeworkMessage");
  else if (document.location.href.includes("/ClassNotebook/"))
    presenceData.details = await presence.getSetting("notebookMessage");
  else if (document.location.href.includes("/school/files/"))
    presenceData.details = await presence.getSetting("teamFilesMessage");
  else if (document.location.href.includes("/channelDashboard/"))
    presenceData.details = await presence.getSetting("channelDashboardMessage");
  else if (document.location.href.includes("/teamDashboard/"))
    presenceData.details = await presence.getSetting("teamDashboardMessage");
  else if (document.location.href.includes("/discover"))
    presenceData.details = await presence.getSetting("discoverMessage");
  else if (document.location.href.includes("/apps"))
    presenceData.details = await presence.getSetting("appsMessage");
  else if (
    document.location.href.includes(
      "/tab::18efb661-92b3-4a04-9c27-024c8c7bf70a"
    )
  )
    presenceData.details = await presence.getSetting("testMessage");
  else if (document.location.href.includes("calling/")) {
    const memberCount = document
      .querySelector("accordion-section:nth-child(2) span.toggle-number")
      ?.textContent.match(/([0-9]+)/);

    if (document.querySelector("#video-button")) {
      presenceData.details = "In a meeting";
      presenceData.state = memberCount
        ? `${memberCount[0]} ${
            memberCount[0] === "1" ? "participant" : "participants"
          } in a room`
        : "Unknown participant(s) in a room";

      presenceData.smallImageKey = document
        .querySelector("#video-button")
        .getAttribute("aria-label")
        .endsWith("off")
        ? "vcall"
        : "call";
    } else presenceData.details = "Joining a meeting...";
  } else presenceData.details = await presence.getSetting("noMessage");

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
