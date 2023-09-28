const presence = new Presence({
	clientId: "943391951611396106",
});

let courseName: HTMLElement,
	lessonName: HTMLElement,
	lessonActivity: HTMLElement;

presence.on("UpdateData", async () => {
	const info = await presence.getSetting<boolean>("eSI"),
		classInfo = await presence.getSetting<boolean>("eCI"),
		presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/E/Edgenuity/assets/logo.png",
		};
	if (info) {
		if (document.location.pathname === "/")
			presenceData.details = "Viewing Edgenuity Home";
		else if (document.location.pathname === "/Login/Login/Student")
			presenceData.details = "Logging in...";

		if (classInfo) {
			if (document.location.pathname === "/Player/") {
				courseName = document.querySelector("span.course");
				lessonName = document.querySelector("[data-bind='html: Title']");
				lessonActivity = document.querySelector(
					"[data-bind='html: ActivityName']"
				);
				presenceData.details = courseName.textContent;
				presenceData.state = `${lessonName.textContent} - ${lessonActivity.textContent}`;
			}
		} else if (document.location.pathname === "/Player/")
			presenceData.details = "Working on Classwork";
		else presenceData.details = "Can't read page";
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
