const presence = new Presence({
		clientId: "1121489312370933780",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/dOIzDiM.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname } = document.location,
		site: { [key: string]: string } = {
			"index.html": "Viewing homepage",
			index: "Viewing homepage", // yes i really had to create three ways to read homepage
			"": "Viewing homepage",
			Recruitment: "Considering recruitment",
			Donate: "Donating",
		},
		animeCheckTitle = document.querySelector(
			"body > section > div.container > div > div > div.anime__details__text > a > div > h3"
		)?.textContent,
		animeCheckTitleV2 = document.querySelector(
			"body > section > div > div.anime__details__content > div > div.col-lg-9 > div > a > div > h3" // website isnt dynamic enough and certain subsites have different dom layout
		)?.textContent,
		animeTitle = document.querySelector(
			"body > section > div > div > div.anime__details__episodes > div > h5"
		)?.textContent,
		checkIfHomepage = document.querySelector(
			"body > header > div > div.row > div.col-lg-8 > div > nav > ul > li.active > a"
		);

	if (document.querySelector("body > iframe") !== null)
		presenceData.details = `Currently reading ${animeTitle}`;
	else if (checkIfHomepage !== null)
		presenceData.details = site[pathname.split("/").at(-1)];
	else if (
		document.querySelector("body > section > div.container > div > div.row") !==
		null
	) {
		presenceData.details =
			typeof animeCheckTitle !== "undefined"
				? `Checking "${animeCheckTitle}"`
				: `Checking "${animeCheckTitleV2}"`;
	} else presenceData.details = "Viewing website";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
