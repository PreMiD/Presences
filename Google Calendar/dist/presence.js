var presence = new Presence({
    clientId: "671599195462959104",
    
});
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
    let data = {
        largeImageKey: "gcalendar"
    };
    if (document.location.pathname == ("/")) {
        data.details = "In the Homepage",
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
        } else if (document.location.pathname.startsWith("/calendar/")) {
            if (document.location.pathname.startsWith("/calendar/r/day")){
            var dated = document.querySelector("head > title").textContent;
            data.details = "Viewing the day schedule:",
            data.state = dated.replace("Google Calendar - ", "").replace(/,/g, " -");
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
            } else if (document.location.pathname.startsWith("/calendar/r/week")){
            var datew = document.querySelector("head > title").textContent;
            data.details = "Viewing the week schedule:",
            data.state = datew.replace("Google Calendar - ", "").replace(/,/g, " -");
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
            } else if (document.location.pathname.startsWith("/calendar/r/month")){
            var datem = document.querySelector("head > title").textContent;
            data.details = "Viewing the month schedule:",
            data.state = datem.replace("Google Calendar - ", "");
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
            } else if (document.location.pathname.startsWith("/calendar/r/year")){
            var datey = document.querySelector("head > title").textContent;
            data.details = "Viewing the year schedule:",
            data.state = datey.replace("Google Calendar - ", "").split(" ")[1];
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
            } else if (document.location.pathname.startsWith("/calendar/r/agenda")){
            data.details = "Browsing in the schedule",
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
            } else if (document.location.pathname.startsWith("/calendar/r/customday")){
            data.details = "Viewing the schedule of",
            data.state = "custom days"
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
            } else if (document.location.pathname.startsWith("/calendar/r/eventedit")){
            data.details = "Editing a event",
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
            } else if (document.location.pathname.startsWith("/calendar/r/search")){
            var eventsearch = document.location.href
            data.details = "Searching the event:",
            data.state = eventsearch.replace("https://calendar.google.com/calendar/r/search?q=", "").replace(/%20/g, " "),
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
            } else if (document.location.pathname.startsWith("/calendar/r/trash")){
            data.details = "Browsing the Trash",
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
            } else if (document.location.pathname == ("/calendar/r/settings")){
            data.details = "In the general settings",
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
            } else if (document.location.pathname.startsWith("/calendar/r/settings/addcalendar")){
            data.details = "Adding a calendar",
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
            } else if (document.location.pathname.startsWith("/calendar/r/settings/createcalendar")){
            data.details = "Creating a calendar",
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
            } else if (document.location.pathname.startsWith("/calendar/r/settings/browsecalendars")){
            data.details = "Browsing the calendars",
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
            } else if (document.location.pathname.startsWith("/calendar/r/settings/addbyurl")){
            data.details = "Adding a calendar",
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
            } else if (document.location.pathname.startsWith("/calendar/r/settings/export")){
            data.details = "Exporting or ixporting",
            data.state = "a calendar"
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
            } else if (document.location.pathname.startsWith("/calendar/r/settings/calendar")){
            data.details = "In the settings of a",
            data.state = "calendar"
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
            } else if (document.location.href.startsWith("https://calendar.google.com/calendar/embed?")){
            var calendarn = document.querySelector("head > title").textContent;
            data.details = "Browsing the calendar:",
            data.state = calendarn,
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
            } else if (document.location.href.startsWith("https://calendar.google.com/calendar/embedhelper?")){
            data.details = "Customizing a calendar",
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
            } else {
        data.details = "Viewing the calendar",
        data.startTimestamp = browsingStamp;
        presence.setActivity(data); }
    };
});
