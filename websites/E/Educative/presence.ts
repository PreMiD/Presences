const presence = new Presence({
		clientId: "876055665091678228",
	}),
	time = Math.floor(Date.now() / 1000),
	pathStartsWith = (path: string): boolean => {
		return document.location.pathname.startsWith(path);
	},
	isInCourse = (): boolean => {
		return !!document.location.pathname.match(
			/\/courses\/[\w-_]{1,}\/[\w-_]{1,}/g
		);
	};
function setCourseInfo() {
	// Sets course info from page
	if (pathStartsWith("/courses")) {
		if (isInCourse()) {
			courseName = document.querySelectorAll("h4")[0].textContent;
			[courseCompletion] = document
				.querySelectorAll(".whitespace-pre-wrap")[0]
				.querySelectorAll("span")[0]
				.textContent.split("%");
			const [lessonEl] = document
					.querySelectorAll(".bePFDW")[0]
					.querySelectorAll("span"),
				lesson = lessonEl.textContent,
				chapter = lessonEl
					.closest(".CollectionSidebarCategory-sc-15b6owa-0")
					.querySelectorAll("h5")[0].textContent;
			chapterName = chapter + lesson && chapter ? " - " : `${lesson}`;
		} else courseName = document.querySelectorAll("h1")[0].textContent;
	}
}

let courseName: string, chapterName: string, courseCompletion: string;

setInterval(setCourseInfo, 2000);

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/E/Educative/assets/logo.png",
		startTimestamp: time,
	};

	if (pathStartsWith("/courses")) {
		presenceData.details = courseName;
		if (isInCourse()) {
			presenceData.details = courseName || "Learning";
			presenceData.state = chapterName;
			presenceData.smallImageKey = `number_${courseCompletion}`;
			presenceData.smallImageText = `${courseCompletion}% Complete`;
		} else presenceData.state = "Viewing course";
	} else if (pathStartsWith("/explore"))
		presenceData.details = "Exploring courses";
	else if (pathStartsWith("/mycourses")) presenceData.details = "My courses";
	else if (pathStartsWith("/learn")) presenceData.details = "Browsing homepage";
	else if (pathStartsWith("/paths")) presenceData.details = "Exploring paths";
	else if (pathStartsWith("/certificates"))
		presenceData.details = "Browsing certificates";
	else presenceData.details = "Idle";

	if (!presenceData.details) {
		presenceData.details = presenceData.state;
		delete presenceData.state;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
