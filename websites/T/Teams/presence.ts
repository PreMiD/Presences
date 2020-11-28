const presence = new Presence({
  clientId: "781455654560595998"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "icon"
  };

  function setTimestamp(): number {
    return Math.floor(Date.now() / 1000);
  }

  if (
    document.URL === "https://teams.microsoft.com/" ||
    document.URL === "https://teams.microsoft.com"
  ) {
    presenceData.details = await presence.getSetting("homepageMessage");
    presenceData.startTimestamp = setTimestamp();
  } else if (document.location.href.includes("/calendar")) {
    presenceData.details = await presence.getSetting("calendarMessage");
    presenceData.startTimestamp = setTimestamp();
  } else if (document.location.href.includes("/my/file")) {
    presenceData.details = await presence.getSetting("filesMessage");
    presenceData.startTimestamp = setTimestamp();
  } else if (document.location.href.includes("/conversations/")) {
    presenceData.details = await presence.getSetting("conversationsMessage");
    presenceData.startTimestamp = setTimestamp();
  } else if (
    document.location.href.includes(
      "/apps/66aeee93-507d-479a-a3ef-8f494af43945"
    )
  ) {
    presenceData.details = await presence.getSetting("homeworkMessage");
    presenceData.startTimestamp = setTimestamp();
  } else if (document.location.href.includes("/analytics/")) {
    presenceData.details = await presence.getSetting("analyticsMessage");
    presenceData.startTimestamp = setTimestamp();
  } else if (document.location.href.includes("/manageteams/")) {
    presenceData.details = await presence.getSetting("manageMessage");
    presenceData.startTimestamp = setTimestamp();
  } else if (document.location.href.includes("/gradebook/")) {
    presenceData.details = await presence.getSetting("gradesMessage");
    presenceData.startTimestamp = setTimestamp();
  } else if (
    document.location.href.includes(
      "/tab::6f9be796-2b0f-441f-a79a-800563081010/"
    )
  ) {
    presenceData.details = await presence.getSetting("notesMessage");
    presenceData.startTimestamp = setTimestamp();
  } else if (document.location.href.includes("/school/classroom/")) {
    presenceData.details = await presence.getSetting("teamHomeworkMessage");
    presenceData.startTimestamp = setTimestamp();
  } else if (document.location.href.includes("/ClassNotebook/")) {
    presenceData.details = await presence.getSetting("notebookMessage");
    presenceData.startTimestamp = setTimestamp();
  } else if (document.location.href.includes("/school/files/")) {
    presenceData.details = await presence.getSetting("teamFilesMessage");
    presenceData.startTimestamp = setTimestamp();
  } else if (document.location.href.includes("/channelDashboard/")) {
    presenceData.details = await presence.getSetting("channelDashboardMessage");
    presenceData.startTimestamp = setTimestamp();
  } else if (document.location.href.includes("/teamDashboard/")) {
    presenceData.details = await presence.getSetting("teamDashboardMessage");
    presenceData.startTimestamp = setTimestamp();
  } else if (document.location.href.includes("/discover")) {
    presenceData.details = await presence.getSetting("discoverMessage");
    presenceData.startTimestamp = setTimestamp();
  } else if (document.location.href.includes("/apps")) {
    presenceData.details = await presence.getSetting("appsMessage");
    presenceData.startTimestamp = setTimestamp();
  } else if (
    document.location.href.includes(
      "/tab::18efb661-92b3-4a04-9c27-024c8c7bf70a"
    )
  ) {
    presenceData.details = await presence.getSetting("testMessage");
    presenceData.startTimestamp = setTimestamp();
  } else if (document.location.href.includes("calling/")) {
    presenceData.details = await presence.getSetting("callMessage");
    presenceData.startTimestamp = setTimestamp();
  } else {
    presenceData.details = await presence.getSetting("noMessage");
    presenceData.startTimestamp = setTimestamp();
  }
  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
