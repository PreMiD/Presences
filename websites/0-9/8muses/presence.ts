const presence = new Presence({
		clientId: "717563140300210196",
	}),
	strings = presence.getStrings({
		search: "general.searching",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/GQF8Kiq.png",
		startTimestamp: browsingTimestamp,
	};
	if (new URLSearchParams(window.location.search).has("s")) {
		presenceData.details = "Searching for:";
		presenceData.state = document.title.split(" -").shift();
		presenceData.smallImageKey = "search";
		presenceData.smallImageText = (await strings).search;
	} else if (document.location.pathname === "/")
		presenceData.details = "Browsing Homepage";
	else if (document.location.pathname.includes("/category/")) {
		presenceData.details = "Viewing a category:";
		presenceData.state = (
			document.querySelector(
				"#top-menu > div.top-menu-breadcrumb > ol > li:nth-child(2) > a"
			) as HTMLAnchorElement
		).text;
	} else if (document.location.href.includes("/#")) {
		const comicName = (
				document.querySelector("head > meta:nth-child(17)") as HTMLMetaElement
			).content,
			issueNumber = document
				.querySelector("#left-menu > ol > li:nth-child(3) > div > span")
				.textContent.trim();
		if (document.location.pathname.split("/")[2].includes("")) {
			presenceData.details = `${comicName} - ${document.location.pathname
				.split("/")[2]
				.replaceAll("_", " ")}`;
			presenceData.state = issueNumber;
			presenceData.smallImageKey = "reading";
		} else {
			presenceData.details = comicName;
			presenceData.state = issueNumber;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
