const presence = new Presence({
		clientId: "981442534167441428",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/eX5kOQU.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, hostname } = document.location;

	if (["www.brain.fm", "try.brain.fm"].includes(hostname)) {
		if (["/", "/home"].includes(pathname))
			presenceData.details = "Viewing the home page";
		else if (pathname.startsWith("/about"))
			presenceData.details = "Viewing the about page";
		else if (pathname.startsWith("/pdfs")) {
			presenceData.details = "Reading a PDF";
			switch (pathname) {
				case "/pdfs/performance-pilot.pdf":
					presenceData.state = "Performance Pilot";
					break;
				case "/pdfs/white-paper.pdf":
					presenceData.state = "White Paper";
					break;
				case "/pdfs/sleep-study.pdf":
					presenceData.state = "Sleep Studies";
					break;
			}
		} else if (pathname.startsWith("/science"))
			presenceData.details = "Viewing the science page";
		else if (pathname.startsWith("/press"))
			presenceData.details = "Viewing the press page";
		else if (pathname.startsWith("/pricing"))
			presenceData.details = "Viewing pricing options";
		else if (pathname.startsWith("/jobs"))
			presenceData.details = "Viewing the jobs page";
		else if (pathname.startsWith("/faq"))
			presenceData.details = "Viewing the FAQ page";
		else if (pathname.startsWith("/contact"))
			presenceData.details = "Viewing the contact page";
		else if (pathname.startsWith("/terms"))
			presenceData.details = "Viewing the terms page";
		else if (pathname.startsWith("/privacy"))
			presenceData.details = "Viewing the privacy page";
		else if (pathname.startsWith("/legal"))
			presenceData.details = "Viewing the legal page";
		else if (pathname.startsWith("/forgot-password"))
			presenceData.details = "Resetting their password";
	} else if (hostname.startsWith("my")) {
		if (pathname === "/") {
			if (
				document.querySelector(
					"#root > div > div.sc-gKsewC.sc-iBPRYJ.sc-gGiJkG.efCouF.cOWINi.jzdkxv"
				)
			)
				presenceData.details = "Logging in";
			else if (
				document.querySelector("#root > div > div > div > div.sc-jsNsAp.byZiWf")
			)
				presenceData.details = "Choosing mode";
		} else if (pathname.startsWith("/signup"))
			presenceData.details = "Signing up";
		else if (pathname.startsWith("/welcome"))
			presenceData.details = "Getting started";
		else if (["/focus", "/relax", "/sleep"].includes(pathname)) {
			const activity = document
				.querySelector(
					"#root > div > div > div.sc-sCrnh.fGBZrg > div.sc-gJLCiq.iGquue > div.sc-kBizdN.gGaVww > div.sc-jNpQCG.dAEozB > div > div > span"
				)
				.textContent.trim();
			switch (pathname) {
				case "/focus":
					presenceData.state = `Focusing • ${activity}`;
					break;
				case "/relax":
					presenceData.state = `Relaxing • ${activity}`;
					break;
				case "/sleep":
					presenceData.state = `Sleeping • ${activity}`;
					break;
			}

			const songTypeInfo = document
				.querySelector(
					"#root > div > div > div.sc-VhGJa.kMMYFW > div.sc-jwBoPJ.glJHPW > div > div.sc-chbBtj.ciMhIb > div > div > div > div > div.sc-leFDRL.iaABgi"
				)
				.textContent.trim()
				.split(" • ");

			presenceData.details = `${document
				.querySelector(
					"#root > div > div > div.sc-VhGJa.kMMYFW > div.sc-jwBoPJ.glJHPW > div > div.sc-chbBtj.ciMhIb > div > div > div > div > div.sc-hDjjHo.jwdsSo"
				)
				.textContent.trim()} • ${songTypeInfo[0]}`;

			presenceData.largeImageKey = document
				.querySelector(
					"#root > div > div > div.sc-VhGJa.kMMYFW > div.sc-jwBoPJ.glJHPW > div > div.sc-chbBtj.ciMhIb > div > div > div > img"
				)
				.getAttribute("src");
			presenceData.smallImageKey = "logo";
			presenceData.smallImageText = songTypeInfo[1];
		} else if (pathname.startsWith("/user"))
			presenceData.details = "Viewing their user information";
		else if (pathname.startsWith("/payment"))
			presenceData.details = "Viewing payment information";
	} else presenceData.details = "Browsing";

	presence.setActivity(presenceData);
});
