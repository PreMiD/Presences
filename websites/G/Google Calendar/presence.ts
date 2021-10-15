const presence = new Presence({
    clientId: "671599195462959104"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "gcalendar"
  };

  presenceData.startTimestamp = browsingStamp;

  if (document.location.pathname === "/")
    presenceData.details = "In the Homepage";
  else if (document.location.pathname.startsWith("/calendar/")) {
    if (document.location.pathname.startsWith("/calendar/r/day")) {
      const dated = document.querySelector("head > title").textContent;
      presenceData.details = "Viewing the day schedule:";
      presenceData.state = dated
        .replace("Google Calendar - ", "")
        .replace(/,/g, " -");
    } else if (document.location.pathname.startsWith("/calendar/r/week")) {
      const datew = document.querySelector("head > title").textContent;
      presenceData.details = "Viewing the week schedule:";
      presenceData.state = datew
        .replace("Google Calendar - ", "")
        .replace(/,/g, " -");
    } else if (document.location.pathname.startsWith("/calendar/r/month")) {
      const datem = document.querySelector("head > title").textContent;
      presenceData.details = "Viewing the month schedule:";
      presenceData.state = datem.replace("Google Calendar - ", "");
    } else if (document.location.pathname.startsWith("/calendar/r/year")) {
      const datey = document.querySelector("head > title").textContent;
      presenceData.details = "Viewing the year schedule:";
      [, presenceData.state] = datey
        .replace("Google Calendar - ", "")
        .split(" ");
    } else if (document.location.pathname.startsWith("/calendar/r/agenda"))
      presenceData.details = "Browsing in the schedule";
    else if (document.location.pathname.startsWith("/calendar/r/customday")) {
      presenceData.details = "Viewing the schedule of";
      presenceData.state = "custom days";
    } else if (document.location.pathname.startsWith("/calendar/r/eventedit"))
      presenceData.details = "Editing a event";
    else if (document.location.pathname.startsWith("/calendar/r/search")) {
      const eventsearch = document.location.href;
      presenceData.details = "Searching the event:";
      presenceData.state = eventsearch
        .replace("https://calendar.google.com/calendar/r/search?q=", "")
        .replace(/%20/g, " ");
    } else if (document.location.pathname.startsWith("/calendar/r/trash"))
      presenceData.details = "Browsing the Trash";
    else if (document.location.pathname === "/calendar/r/settings")
      presenceData.details = "In the general settings";
    else if (
      document.location.pathname.startsWith("/calendar/r/settings/addcalendar")
    )
      presenceData.details = "Adding a calendar";
    else if (
      document.location.pathname.startsWith(
        "/calendar/r/settings/createcalendar"
      )
    )
      presenceData.details = "Creating a calendar";
    else if (
      document.location.pathname.startsWith(
        "/calendar/r/settings/browsecalendars"
      )
    )
      presenceData.details = "Browsing the calendars";
    else if (
      document.location.pathname.startsWith("/calendar/r/settings/addbyurl")
    )
      presenceData.details = "Adding a calendar";
    else if (
      document.location.pathname.startsWith("/calendar/r/settings/export")
    ) {
      presenceData.details = "Exporting or ixporting";
      presenceData.state = "a calendar";
    } else if (
      document.location.pathname.startsWith("/calendar/r/settings/calendar")
    ) {
      presenceData.details = "In the settings of a";
      presenceData.state = "calendar";
    } else if (
      document.location.href.startsWith(
        "https://calendar.google.com/calendar/embed?"
      )
    ) {
      const calendarn = document.querySelector("head > title").textContent;
      presenceData.details = "Browsing the calendar:";
      presenceData.state = calendarn;
    } else if (
      document.location.href.startsWith(
        "https://calendar.google.com/calendar/embedhelper?"
      )
    )
      presenceData.details = "Customizing a calendar";
    else presenceData.details = "Viewing the calendar";
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
