const presence = new Presence({
		clientId: "671599195462959104",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/AxEDCqw.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.pathname === "/")
		presenceData.details = "In the Homepage";
	else if (document.location.pathname.startsWith("/calendar/")) {
		if (document.location.pathname.startsWith("/calendar/r/day")) {
			presenceData.details = "Viewing the day schedule:";
			presenceData.state = document
				.querySelector("head > title")
				.textContent.replace("Google Calendar - ", "")
				.replaceAll(",", " -");
		} else if (document.location.pathname.startsWith("/calendar/r/week")) {
			presenceData.details = "Viewing the week schedule:";
			presenceData.state = document
				.querySelector("head > title")
				.textContent.replace("Google Calendar - ", "")
				.replaceAll(",", " -");
		} else if (document.location.pathname.startsWith("/calendar/r/month")) {
			presenceData.details = "Viewing the month schedule:";
			presenceData.state = document
				.querySelector("head > title")
				.textContent.replace("Google Calendar - ", "");
		} else if (document.location.pathname.startsWith("/calendar/r/year")) {
			presenceData.details = "Viewing the year schedule:";
			[, presenceData.state] = document
				.querySelector("head > title")
				.textContent.replace("Google Calendar - ", "")
				.split(" ");
		} else if (document.location.pathname.startsWith("/calendar/r/agenda"))
			presenceData.details = "Browsing in the schedule";
		else if (document.location.pathname.startsWith("/calendar/r/customday")) {
			presenceData.details = "Viewing the schedule of";
			presenceData.state = "custom days";
		} else if (document.location.pathname.startsWith("/calendar/r/eventedit"))
			presenceData.details = "Editing a event";
		else if (document.location.pathname.startsWith("/calendar/r/search")) {
			presenceData.details = "Searching the event:";
			presenceData.state = document.location.href
				.replace("https://calendar.google.com/calendar/r/search?q=", "")
				.replaceAll("%20", " ");
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
			presenceData.details = "Browsing the calendar:";
			presenceData.state = document.querySelector("head > title").textContent;
		} else if (
			document.location.href.startsWith(
				"https://calendar.google.com/calendar/embedhelper?"
			)
		)
			presenceData.details = "Customizing a calendar";
		else presenceData.details = "Viewing the calendar";
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
