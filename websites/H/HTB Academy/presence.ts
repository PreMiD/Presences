/* eslint-disable no-one-time-vars/no-one-time-vars */
const presence = new Presence({
		clientId: "1200517025383075840",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	path = document.location.pathname;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/H/HackTheBox/assets/logo.png",
		startTimestamp: browsingTimestamp,
	};

	if (path === "/" || path === "/login")
		presenceData.details = "Breaching into the Academy";
	else if (path.includes("/dashboard")) {
		presenceData.details = "Browsing the dashboard";
		const persred: HTMLElement = document.querySelector(".red .progress"),
			persblue: HTMLElement = document.querySelector(".blue .progress"),
			persgrn: HTMLElement = document.querySelector(".green .progress");
		presenceData.state =
			`Off: ${persred.textContent} ` +
			`Def: ${persblue.textContent} ` +
			`Gen: ${persgrn.textContent}`;
	} else if (path.includes("/exams"))
		presenceData.details = "Browsing the exams";
	else if (path.includes("/paths")) presenceData.details = "Browsing paths";
	else if (path.includes("/modules")) presenceData.details = "Browsing modules";
	else if (path.includes("/section")) {
		let module: HTMLElement;
		const iterminal: HTMLElement = document.querySelector(".iterminal");
		if (iterminal) {
			module = document.querySelector(
				"#layout-wrapper > div.main-content > div > div:nth-child(2) > div > div > h4"
			);
		} else {
			module = document.querySelector(
				"#layout-wrapper > div.main-content > div > div:nth-child(1) > div > div > h4"
			);
		}

		const section: HTMLElement = document.querySelector(".training-module h1");
		presenceData.details = `Reading Module: ${module.textContent}`;
		presenceData.state = `Section: ${section?.textContent}`;
	} else if (path.includes("/details")) {
		const module2: HTMLElement = document.querySelector(
			".page-title-box .page-title"
		);
		presenceData.details = "Reading details about module:";
		presenceData.state = `"${module2.textContent}"`;
	} else if (path.includes("/my-certificates"))
		presenceData.details = "Looking at their certificates";
	else if (path.includes("/my-badges"))
		presenceData.details = "Looking at their badges";

	presence.setActivity(presenceData);
});
