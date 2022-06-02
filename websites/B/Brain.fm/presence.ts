const presence = new Presence({
		clientId: "981442534167441428"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey: "logo",
		startTimestamp: browsingTimestamp
	},
	{ pathname, hostname } = document.location

	if (["www.brain.fm", "try.brain.fm"].includes(hostname)) {
		if (["/", "/home"].includes(pathname))
			presenceData.details = "Viewing the home page.";
		else if (pathname.startsWith("/about"))
			presenceData.details = "Viewing Brain.fm's about page.";
		else if (pathname.startsWith("/pdfs"))
			presenceData.details = "Reading a Brain.fm PDF.";
		else if (pathname.startsWith("/science"))
			presenceData.details = "Viewing Brain.fm's science page.";
		else if (pathname.startsWith("/press"))
			presenceData.details = "Viewing Brain.fm's press page.";
		else if (pathname.startsWith("/pricing"))
			presenceData.details = "Viewing pricing for Brain.fm.";
		else if (pathname.startsWith("/jobs"))
			presenceData.details = "Viewing jobs at Brain.fm.";
		else if (pathname.startsWith("/faq"))
			presenceData.details = "Viewing Brain.fm's FAQ page.";
		else if (pathname.startsWith("/contact"))
			presenceData.details = "Viewing Brain.fm's contact page.";
		else if (pathname.startsWith("/terms"))
			presenceData.details = "Viewing Brain.fm's terms page.";
		else if (pathname.startsWith("/privacy"))
			presenceData.details = "Viewing Brain.fm's privacy page.";
		else if (pathname.startsWith("/legal"))
			presenceData.details = "Viewing Brain.fm's legal page.";
		else if (pathname.startsWith("/forgot-password"))
			presenceData.details = "Resetting Password...";
	} else if (hostname.startsWith("my")) {
		if (pathname === "/") {
			if (
				document.querySelector(
					"#root > div > div.sc-gKsewC.sc-iBPRYJ.sc-gGiJkG.efCouF.cOWINi.jzdkxv"
				)
			)
				presenceData.details = "Logging into Brain.fm";
			else if (
				document.querySelector("#root > div > div > div > div.sc-jsNsAp.byZiWf")
			)
				presenceData.details = "Choosing Mode...";
		} else if (pathname.startsWith("/signup"))
			presenceData.details = "Signing Up for Brain.fm";
		else if (pathname.startsWith("/welcome"))
			presenceData.details = "Getting started with Brain.fm";
		else if (
			["/focus", "/relax", "/sleep"].includes(pathname)
		) {
			switch (pathname) {
				case "/focus":
					presenceData.state = `Focusing • ${document
						.querySelector(
							"#root > div > div > div.sc-sCrnh.fGBZrg > div.sc-gJLCiq.iGquue > div.sc-kBizdN.gGaVww > div.sc-jNpQCG.dAEozB > div > div > span"
						)
						.textContent.trim()}`;
					break;
				case "/relax":
					presenceData.state = `Relaxing • ${document
						.querySelector(
							"#root > div > div > div.sc-sCrnh.fGBZrg > div.sc-gJLCiq.iGquue > div.sc-kBizdN.gGaVww > div.sc-jNpQCG.dAEozB > div > div > span"
						)
						.textContent.trim()}`;
					break;
				case "/sleep":
					presenceData.state = `Sleeping • ${document
						.querySelector(
							"#root > div > div > div.sc-sCrnh.fGBZrg > div.sc-gJLCiq.iGquue > div.sc-kBizdN.gGaVww > div.sc-jNpQCG.dAEozB > div > div > span"
						)
						.textContent.trim()}`;
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
			presenceData.details = "Viewing user information...";
		else if (pathname.startsWith("/payment"))
			presenceData.details = "Viewing payment information...";
		else if (pathname.startsWith("/forgot-password"))
			presenceData.details = "Resetting Password...";
	} else presenceData.details = "Browsing...";

	presence.setActivity(presenceData);
});
