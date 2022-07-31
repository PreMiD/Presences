const presence = new Presence({
		clientId: "1002575262292131910",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	slideshow = new Slideshow();

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "artfight-logo",
			startTimestamp: browsingTimestamp,
		},
		presenceDataSlide: PresenceData = {
			largeImageKey: "artfight-logo",
			startTimestamp: browsingTimestamp,
		},
		pathnameArray = document.location.pathname.split("/"),
		showCover = await presence.getSetting<boolean>("cover");

	switch (pathnameArray[1]) {
		case "":
			presenceData.details = "Browsing homepage";
			break;
		case "attack": {
			const presenceDataTeam: PresenceData = {
				largeImageKey: "artfight-logo",
				startTimestamp: browsingTimestamp,
			};

			presenceData.details =
				presenceDataSlide.details =
				presenceDataTeam.details =
					`Viewing a${
						document.querySelector("td > div.badge.badge-info")?.textContent ??
						"n attack"
					}`;

			presenceData.state = `"${document
				.querySelector(".profile-header-name > a > u")
				.textContent.trim()}"`;

			if (showCover && !document.querySelector("div.alert")) {
				presenceData.largeImageKey =
					presenceDataSlide.largeImageKey =
					presenceDataTeam.largeImageKey =
						document
							.querySelector("#image-pane > div > a > img")
							.getAttribute("src");
			}

			const tableAttackData = document.querySelectorAll("tbody > tr > td");
			presenceDataSlide.state = `From ${tableAttackData[1].textContent.trim()} to ${tableAttackData[3].textContent.trim()}`;
			presenceDataTeam.state = `Team ${tableAttackData[5].textContent.trim()}`;

			presenceData.buttons =
				presenceDataSlide.buttons =
				presenceDataTeam.buttons =
					[
						{ label: "View Drawing", url: document.location.href },
						{
							label: "View Artist",
							url: `${
								document.location.origin
							}/~${tableAttackData[1].textContent.trim()}`,
						},
					];

			slideshow.addSlide("attackName", presenceData, 5000);
			slideshow.addSlide("authorName", presenceDataSlide, 5000);
			slideshow.addSlide("teamName", presenceDataTeam, 5000);
			break;
		}
	}

	if (slideshow.getSlides().length > 0) presence.setActivity(slideshow);
	else if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
