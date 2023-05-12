const presence = new Presence({
		clientId: "846725225219489812",
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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/G7Adh20.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.pathname === "/")
		presenceData.details = await presence.getSetting<string>("homepageMessage");
	else if (document.location.href.includes("/calendar"))
		presenceData.details = await presence.getSetting<string>("calendarMessage");
	else if (document.location.href.includes("/my/file"))
		presenceData.details = await presence.getSetting<string>("filesMessage");
	else if (document.location.href.includes("/conversations/")) {
		presenceData.details = await presence.getSetting<string>(
			"conversationsMessage"
		);
	} else if (
		document.location.href.includes(
			"/apps/66aeee93-507d-479a-a3ef-8f494af43945"
		)
	)
		presenceData.details = await presence.getSetting<string>("homeworkMessage");
	else if (document.location.href.includes("/analytics/")) {
		presenceData.details = await presence.getSetting<string>(
			"analyticsMessage"
		);
	} else if (document.location.href.includes("/manageteams/"))
		presenceData.details = await presence.getSetting<string>("manageMessage");
	else if (document.location.href.includes("/gradebook/"))
		presenceData.details = await presence.getSetting<string>("gradesMessage");
	else if (
		document.location.href.includes(
			"/tab::6f9be796-2b0f-441f-a79a-800563081010/"
		)
	)
		presenceData.details = await presence.getSetting<string>("notesMessage");
	else if (document.location.href.includes("/school/classroom/")) {
		presenceData.details = await presence.getSetting<string>(
			"teamHomeworkMessage"
		);
	} else if (document.location.href.includes("/ClassNotebook/"))
		presenceData.details = await presence.getSetting<string>("notebookMessage");
	else if (document.location.href.includes("/school/files/")) {
		presenceData.details = await presence.getSetting<string>(
			"teamFilesMessage"
		);
	} else if (document.location.href.includes("/channelDashboard/")) {
		presenceData.details = await presence.getSetting<string>(
			"channelDashboardMessage"
		);
	} else if (document.location.href.includes("/teamDashboard/")) {
		presenceData.details = await presence.getSetting<string>(
			"teamDashboardMessage"
		);
	} else if (document.location.href.includes("/discover"))
		presenceData.details = await presence.getSetting<string>("discoverMessage");
	else if (document.location.href.includes("/apps"))
		presenceData.details = await presence.getSetting<string>("appsMessage");
	else if (
		document.location.href.includes(
			"/tab::18efb661-92b3-4a04-9c27-024c8c7bf70a"
		)
	)
		presenceData.details = await presence.getSetting<string>("testMessage");
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
	} else presenceData.details = await presence.getSetting<string>("noMessage");

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
