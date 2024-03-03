const presence = new Presence({
	clientId: "1094962047906758796",
}),
browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
Logo = "https://incels.is/logo/512x512.png",
}

const tags: string[] = ["Blackpill",
"LifeFuel",
"SuicideFuel",
"RageFuel",
"Serious",	
"Experiment",
"JFL",
"Venting",
"NSFW",
"News",
"Hypocricy",
"LDAR",
"Story",
"It's Over",
"TeeHee",
"Soy",
"Cope",
"Discussion",
"Toxic Femininity",
"[Whitepill]",
"Theory",
"Brutal",
"Based"];

presence.on("UpdateData", async () => {
const presenceData: PresenceData = {
	largeImageKey: Assets.Logo,
	startTimestamp: browsingTimestamp,
}, threadTitleElement = document.querySelectorAll(".p-title-value")[0] as HTMLHeadingElement,
// eslint-disable-next-line no-undefined
threadTitle: string | undefined = threadTitleElement ? threadTitleElement.textContent : undefined;

if (document.location.pathname === "/") presenceData.details = "Hopelessly staring at the home page";
else if (document.location.pathname.includes("/news-announcements")) presenceData.details = "Doom scrolling through news and announcements";
else if (document.location.pathname.includes("/suggestions") && document.location.pathname.includes("/post-thread")) presenceData.details = "Typing up a suggestion that will never be implemented";
else if (document.location.pathname.includes("/suggestions")) presenceData.details = "Looking through suggestions that will never be implemented";
else if (document.location.pathname.includes("/rules-and-faq")) presenceData.details = "Learning how to sit there and take it, like a good little boy";
else if (document.location.pathname.includes("/the-bunker") && (document.location.pathname.includes("/post-thread"))) presenceData.details = "Typing up a post for the bunker dwellers";
else if (document.location.pathname.includes("/the-bunker")) presenceData.details = "Seeking shelter in the bunker";
else if (document.location.pathname.includes("/must-read-content")) presenceData.details = "Looking through the good stuff";
else if (document.location.pathname.includes("/inceldom-discussion")) presenceData.details = "Looking through (recycled) discussions";
else if (document.location.pathname.includes("/the-lounge") && (document.location.pathname.includes("/post-thread"))) presenceData.details = "Typing up something unrelated to inceldom (probably a lie)";
else if (document.location.pathname.includes("/the-lounge")) presenceData.details = "He be loungin'";
else if (document.location.pathname.includes("/the-sewers") && document.location.pathname.includes("/post-thread")) presenceData.details = "Typing up a post for the sewer rats";
else if (document.location.pathname.includes("/the-sewers")) presenceData.details = "Going through the sewers (yuck)";
else if (document.location.pathname.includes("/ban-appeals") && document.location.pathname.includes("/post-thread")) presenceData.details = "LET ME IN! REEEEEEEE!!!";
else if (document.location.pathname.includes("/ban-appeals")) presenceData.details = "Trying hard to get back in (or laughing at those who can't)";
else if (document.location.pathname.includes("/post-thread")) presenceData.details = "Typing up a controversial opinion";
else if (document.location.pathname.includes("/conversations")) presenceData.details = "Currently e-socializing";
else if (document.location.pathname.includes("/account/account-details")) presenceData.details = "Pimpin' out the profile";
else if (document.location.pathname.includes("/members/")) {
	const selfElement = document.querySelectorAll(".p-navgroup-user-linkText")[0] as HTMLSpanElement;
	// eslint-disable-next-line no-undefined
	if (document.location.pathname.includes(selfElement ? selfElement.textContent : undefined)) presenceData.details = "Looking at self with disgust";
	else presenceData.details = "Watching over other lost souls";
} else if (document.location.pathname.includes("/account/preferences")) presenceData.details = "Customizing the experience";
else if (document.location.pathname.includes("/help")) presenceData.details = "Looking for help (all help is too late)";
else if (document.location.pathname.includes("/whats-new")) presenceData.details = "Looking for something new (it's all the same)";
else if (document.location.pathname.includes("/find-threads/started")) presenceData.details = "Looking at the only good threads (the ones I made)";
else if (document.location.pathname.includes("/watched/threads")) presenceData.details = "Checking up on watched threads";
else if (document.location.pathname.includes("/chat/")) presenceData.details = "Talking to like-minded (based) individuals";
else if (document.location.pathname.includes("/media/")) presenceData.details = "Either looking at memes, porn or both (or posting them)";
else if (document.location.pathname.includes("/search/") && (document.location.search.includes("?q=") === false)) presenceData.details = "Searching for something really specific";
else if (document.location.pathname.includes("/search/")) presenceData.details = `Searching for "${document.querySelectorAll(".p-title-value em")[0].textContent}"`;
else if (document.location.pathname.includes("/threads/")) {
	if (threadTitle) {
		presenceData.details = "Reading a thread:";
		for (const tag of tags) {
			if (threadTitle.startsWith(tag) && tag !== "[Whitepill]") {
				presenceData.state = `${threadTitle.replace(tag, `[${tag}]`)}`;
				break;
			} else presenceData.state = threadTitle;
		}
	}
} else presenceData.details = "Wandering around aimlessly";

if(presenceData.details) presence.setActivity(presenceData);
else presence.setActivity();
});
