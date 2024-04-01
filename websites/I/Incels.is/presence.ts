const presence = new Presence({
		clientId: "1094962047906758796",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/I/Incels.is/assets/logo.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		threadTitle = document.querySelector(".p-title-value")?.textContent,
		threadTag = document.querySelector(
			'[class*="label label--custom-"]'
		)?.textContent,
		{ pathname } = document.location,
		{ search } = document.location;

	if (pathname === "/")
		presenceData.details = "Hopelessly staring at the home page";
	else if (pathname.includes("/news-announcements"))
		presenceData.details = "Doom scrolling through news and announcements";
	else if (
		pathname.includes("/suggestions") &&
		pathname.includes("/post-thread")
	) {
		presenceData.details =
			"Typing up a suggestion that will never be implemented";
	} else if (pathname.includes("/suggestions")) {
		presenceData.details =
			"Looking through suggestions that will never be implemented";
	} else if (pathname.includes("/rules-and-faq")) {
		presenceData.details =
			"Learning how to sit there and take it, like a good little boy";
	} else if (
		pathname.includes("/the-bunker") &&
		pathname.includes("/post-thread")
	)
		presenceData.details = "Typing up a post for the bunker dwellers";
	else if (pathname.includes("/the-bunker"))
		presenceData.details = "Seeking shelter in the bunker";
	else if (pathname.includes("/must-read-content"))
		presenceData.details = "Looking through the good stuff";
	else if (pathname.includes("/inceldom-discussion"))
		presenceData.details = "Looking through (recycled) discussions";
	else if (
		pathname.includes("/the-lounge") &&
		pathname.includes("/post-thread")
	) {
		presenceData.details =
			"Typing up something unrelated to inceldom (probably a lie)";
	} else if (pathname.includes("/the-lounge"))
		presenceData.details = "He be loungin'";
	else if (
		pathname.includes("/the-sewers") &&
		pathname.includes("/post-thread")
	)
		presenceData.details = "Typing up a post for the sewer rats";
	else if (pathname.includes("/the-sewers"))
		presenceData.details = "Going through the sewers (yuck)";
	else if (
		pathname.includes("/ban-appeals") &&
		pathname.includes("/post-thread")
	)
		presenceData.details = "LET ME IN! REEEEEEEE!!!";
	else if (pathname.includes("/ban-appeals")) {
		presenceData.details =
			"Trying hard to get back in (or laughing at those who can't)";
	} else if (pathname.includes("/post-thread"))
		presenceData.details = "Typing up a controversial opinion";
	else if (pathname.includes("/conversations"))
		presenceData.details = "Currently e-socializing";
	else if (pathname.includes("/account/account-details"))
		presenceData.details = "Pimpin' out the profile";
	else if (pathname.includes("/members/")) {
		if (
			pathname.includes(
				document.querySelector(".p-navgroup-user-linkText")?.textContent
			)
		)
			presenceData.details = "Looking at self with disgust";
		else presenceData.details = "Watching over other lost souls";
	} else if (pathname.includes("/account/preferences"))
		presenceData.details = "Customizing the experience";
	else if (pathname.includes("/help"))
		presenceData.details = "Looking for help (all help is too late)";
	else if (pathname.includes("/whats-new"))
		presenceData.details = "Looking for something new (it's all the same)";
	else if (pathname.includes("/find-threads/started"))
		presenceData.details = "Looking at the only good threads (the ones I made)";
	else if (pathname.includes("/watched/threads"))
		presenceData.details = "Checking up on watched threads";
	else if (pathname.includes("/chat/"))
		presenceData.details = "Talking to like-minded (based) individuals";
	else if (pathname.includes("/media/")) {
		presenceData.details =
			"Either looking at memes, family friendly content, or both (or posting them)";
	} else if (pathname.includes("/search/") && search.includes("?q=") === false)
		presenceData.details = "Searching for something really specific";
	else if (pathname.includes("/search/")) {
		presenceData.details = `Searching for "${
			document.querySelector(".p-title-value em").textContent
		}"`;
	} else if (pathname.includes("/threads/")) {
		if (threadTitle) {
			presenceData.details = "Reading a thread:";

			if (document.querySelector("[class*='nsfw']"))
				presenceData.state = "Looking at family friendly content";
			else {
				presenceData.state = threadTag
					? threadTitle.replace(threadTag, `[${threadTag}]`)
					: threadTitle;
			}
		}
	} else presenceData.details = "Wandering around aimlessly";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
