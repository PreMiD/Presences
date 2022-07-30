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
		pathnameArray = document.location.pathname.split("/");

	switch (pathnameArray[1]) {
		case "":
			presenceData.details = "Browsing homepage";
			break;
		case "attack": {
			presenceData.details = presenceDataSlide.details = "Viewing an attack";
			presenceData.state = `"${document
				.querySelector(".profile-header-name > a > u")
				.textContent.trim()}"`;
			presenceData.largeImageKey = presenceDataSlide.largeImageKey = document
				.querySelector("#image-pane > div > a > img")
				.getAttribute("src");

			const tableAttackData = document.querySelectorAll("tbody > tr > td");
			presenceDataSlide.state = `From ${tableAttackData[1].textContent.trim()} to ${tableAttackData[3].textContent.trim()}`;
			slideshow.addSlide("attackName", presenceData, 5000);
			slideshow.addSlide("authorName", presenceDataSlide, 5000);
			break;
		}
	}

	if (slideshow.getSlides().length > 0) presence.setActivity(slideshow);
	else if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
