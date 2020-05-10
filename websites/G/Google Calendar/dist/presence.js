const presence = new Presence({
    clientId: "671599195462959104"
});
const browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "gcalendar"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname == "/") {
        presenceData.details = "In the Homepage";
    }
    else if (document.location.pathname.startsWith("/calendar/")) {
        if (document.location.pathname.startsWith("/calendar/r/day")) {
            const dated = document.querySelector("head > title").textContent;
            presenceData.details = "Viewing the day schedule:";
            presenceData.state = dated
                .replace("Google Calendar - ", "")
                .replace(/,/g, " -");
        }
        else if (document.location.pathname.startsWith("/calendar/r/week")) {
            const datew = document.querySelector("head > title").textContent;
            presenceData.details = "Viewing the week schedule:";
            presenceData.state = datew
                .replace("Google Calendar - ", "")
                .replace(/,/g, " -");
        }
        else if (document.location.pathname.startsWith("/calendar/r/month")) {
            const datem = document.querySelector("head > title").textContent;
            presenceData.details = "Viewing the month schedule:";
            presenceData.state = datem.replace("Google Calendar - ", "");
        }
        else if (document.location.pathname.startsWith("/calendar/r/year")) {
            const datey = document.querySelector("head > title").textContent;
            presenceData.details = "Viewing the year schedule:";
            presenceData.state = datey
                .replace("Google Calendar - ", "")
                .split(" ")[1];
        }
        else if (document.location.pathname.startsWith("/calendar/r/agenda")) {
            presenceData.details = "Browsing in the schedule";
        }
        else if (document.location.pathname.startsWith("/calendar/r/customday")) {
            presenceData.details = "Viewing the schedule of";
            presenceData.state = "custom days";
        }
        else if (document.location.pathname.startsWith("/calendar/r/eventedit")) {
            presenceData.details = "Editing a event";
        }
        else if (document.location.pathname.startsWith("/calendar/r/search")) {
            const eventsearch = document.location.href;
            presenceData.details = "Searching the event:";
            presenceData.state = eventsearch
                .replace("https://calendar.google.com/calendar/r/search?q=", "")
                .replace(/%20/g, " ");
        }
        else if (document.location.pathname.startsWith("/calendar/r/trash")) {
            presenceData.details = "Browsing the Trash";
        }
        else if (document.location.pathname == "/calendar/r/settings") {
            presenceData.details = "In the general settings";
        }
        else if (document.location.pathname.startsWith("/calendar/r/settings/addcalendar")) {
            presenceData.details = "Adding a calendar";
        }
        else if (document.location.pathname.startsWith("/calendar/r/settings/createcalendar")) {
            presenceData.details = "Creating a calendar";
        }
        else if (document.location.pathname.startsWith("/calendar/r/settings/browsecalendars")) {
            presenceData.details = "Browsing the calendars";
        }
        else if (document.location.pathname.startsWith("/calendar/r/settings/addbyurl")) {
            presenceData.details = "Adding a calendar";
        }
        else if (document.location.pathname.startsWith("/calendar/r/settings/export")) {
            presenceData.details = "Exporting or ixporting";
            presenceData.state = "a calendar";
        }
        else if (document.location.pathname.startsWith("/calendar/r/settings/calendar")) {
            presenceData.details = "In the settings of a";
            presenceData.state = "calendar";
        }
        else if (document.location.href.startsWith("https://calendar.google.com/calendar/embed?")) {
            const calendarn = document.querySelector("head > title").textContent;
            presenceData.details = "Browsing the calendar:";
            presenceData.state = calendarn;
        }
        else if (document.location.href.startsWith("https://calendar.google.com/calendar/embedhelper?")) {
            presenceData.details = "Customizing a calendar";
        }
        else {
            presenceData.details = "Viewing the calendar";
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRXBELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLFdBQVc7S0FDM0IsQ0FBQztJQUVGLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0lBRTVDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO1FBQ3JDLFlBQVksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUM7S0FDMUM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUM5RCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO1lBQzVELE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUMsV0FBVyxDQUFDO1lBQ2pFLFlBQVksQ0FBQyxPQUFPLEdBQUcsMkJBQTJCLENBQUM7WUFDbkQsWUFBWSxDQUFDLEtBQUssR0FBRyxLQUFLO2lCQUN2QixPQUFPLENBQUMsb0JBQW9CLEVBQUUsRUFBRSxDQUFDO2lCQUNqQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3hCO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENB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