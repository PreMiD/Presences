const presence = new Presence({
		clientId: "1200517025383075840",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let persred: HTMLElement,
	module: HTMLElement,
	persblue: HTMLElement,
	persgrn: HTMLElement,
	section: HTMLElement,
	iterminal: HTMLElement,
	module2: HTMLElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/H/HackTheBox/assets/logo.png",
		startTimestamp: browsingTimestamp,
	};

	if (
		document.location.pathname === "/" ||
		document.location.pathname === "/login"
	)
		presenceData.details = "Breaching into the Academy";
	else if (document.location.pathname.includes("/dashboard")) {
		presenceData.details = "Browsing the dashboard";
		persred = document.querySelector(
			"#app > div:nth-child(2) > div.col-md-12.col-xl-8 > div.card.userProgress > div > div > div:nth-child(1) > div > div.red > div > div > div.percent > span"
		);
		persblue = document.querySelector(
			"#app > div:nth-child(2) > div.col-md-12.col-xl-8 > div.card.userProgress > div > div > div:nth-child(2) > div > div.blue > div > div > div.percent > span"
		);
		persgrn = document.querySelector(
			"#app > div:nth-child(2) > div.col-md-12.col-xl-8 > div.card.userProgress > div > div > div:nth-child(3) > div > div.green > div > div > div.percent > span"
		);
		presenceData.state =
			`Off: ${persred.textContent}% ` +
			`Def: ${persblue.textContent}% ` +
			`Gen: ${persgrn.textContent}%`;
	} else if (document.location.pathname.includes("/exams"))
		presenceData.details = "Browsing the exams";
	else if (document.location.pathname.includes("/paths"))
		presenceData.details = "Browsing paths";
	else if (document.location.pathname.includes("/modules"))
		presenceData.details = "Browsing modules";
	else if (document.location.pathname.includes("/section")) {
		iterminal = document.querySelector(".iterminal");
		if (iterminal) {
			module = document.querySelector(
				"#layout-wrapper > div.main-content > div > div:nth-child(2) > div > div > h4"
			);
		} else {
			module = document.querySelector(
				"#layout-wrapper > div.main-content > div > div:nth-child(1) > div > div > h4"
			);
		}

		section = document.querySelector(".training-module h1");
		presenceData.details = `Reading Module: ${module?.textContent}`;
		presenceData.state = `Section: ${section?.textContent}`;
	} else if (document.location.pathname.includes("/details")) {
		module2 = document.querySelector(
			"#app > div:nth-child(1) > div > div > h4"
		);
		presenceData.details = "Reading details about module:";
		presenceData.state = module2.textContent;
	} else if (document.location.pathname.includes("/my-certificates"))
		presenceData.details = "Looking at their certificates";
	else if (document.location.pathname.includes("/my-badges"))
		presenceData.details = "Looking at their badges";

	presence.setActivity(presenceData);
});
