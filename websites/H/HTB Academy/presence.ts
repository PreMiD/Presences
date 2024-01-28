/* eslint-disable no-one-time-vars/no-one-time-vars */
const presence = new Presence({
		clientId: "1200517025383075840",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	{ pathname } = document.location;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/H/HackTheBox/assets/logo.png",
		startTimestamp: browsingTimestamp,
	};

	if (pathname === "/" || pathname === "/login")
		presenceData.details = "Breaching into the Academy";
	else if (pathname.includes("/dashboard")) {
		presenceData.details = "Browsing the dashboard";
		const persred: HTMLElement = document.querySelector(".red .progress"),
			persblue: HTMLElement = document.querySelector(".blue .progress"),
			persgrn: HTMLElement = document.querySelector(".green .progress");
		presenceData.state =
			`Off: ${persred.textContent} ` +
			`Def: ${persblue.textContent} ` +
			`Gen: ${persgrn.textContent}`;
	} else if (pathname.includes("/exams"))
		presenceData.details = "Browsing the exams";
	else if (pathname.includes("/paths")) presenceData.details = "Browsing paths";
	else if (pathname.includes("/modules"))
		presenceData.details = "Browsing modules";
	else if (pathname.includes("/section")) {
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
	} else if (pathname.includes("/details")) {
		const module2: HTMLElement = document.querySelector(
			".page-title-box .page-title"
		);
		presenceData.details = "Reading details about module:";
		presenceData.state = `"${module2.textContent}"`;
	} else if (pathname.includes("/my-certificates"))
		presenceData.details = "Looking at their certificates";
	else if (pathname.includes("/my-badges"))
		presenceData.details = "Looking at their badges";

	presence.setActivity(presenceData);
});
