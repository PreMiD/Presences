const presence = new Presence({
	clientId: "843060416208306196"
});

let showName: HTMLElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "logo"
	};

	if (
		document.location.pathname.includes("/home/") ||
		document.location.pathname === "/"
	)
		presenceData.details = "Viewing 7plus home";
	else if (document.location.pathname === "/shows-a-z")
		presenceData.details = "Viewing 7plus Shows";
	else if (document.location.pathname === "/sport")
		presenceData.details = "Viewing 7plus Sports";
	else if (document.location.pathname === "/search")
		presenceData.details = "Searching 7plus";
	else if (document.location.pathname === "/live-tv") {
		showName = document.querySelector(
			"h2.h3§3Lep4.fw700§1YAxq.truncate2§d57BK.truncateMobile§1Yywu"
		);
		presenceData.details = "Tuned Into 7plus Live!";
		presenceData.state = `Watching: ${showName.textContent}`;
	} else if (document.location.pathname === "/watch-live-tv") {
		showName = document.querySelector(
			"h2.h3§3Lep4.fw700§1YAxq.truncate2§d57BK.truncateMobile§1Yywu"
		);
		presenceData.details = "Tuned Into 7plus Live!";
		presenceData.state = `Watching: ${showName.textContent}`;
	} else if (document.location.pathname === "/query")
		presenceData.details = "Searching 7plus!";
	else {
		const cover = document.querySelector(
			"#app > div > section.Section--page§DHZyX.Section--heroBanner§1F7Fz > div > div.contentContainer§35zFv > div > div.thumbnail§umnvX > img"
		);
		presenceData.largeImageKey = cover?.getAttribute("src") ?? "logo";

		presenceData.details = `Viewing "${document
			.querySelector<HTMLMetaElement>('meta[property="og:title"]')
			.content.replace("Online: Free Streaming & Catch Up TV in Australia", "")
			.slice(
				6,
				document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
					.content.length
			)}"`;
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
