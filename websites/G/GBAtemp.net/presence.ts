const presence = new Presence({
		clientId: "632110854543769601",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}
let threadName: HTMLElement,
	authorName: HTMLElement,
	newsAuthor: HTMLElement,
	profileName: HTMLElement,
	gName: HTMLElement,
	pName: HTMLElement,
	cName: HTMLElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/Q8Jx76k.jpg",
		startTimestamp: browsingTimestamp,
	};
	if (document.location.pathname.startsWith("/threads")) {
		threadName = document.querySelector("a#threadTitle");
		authorName = document.querySelector(
			"span.postedBy > span.posted.iconKey > a.username"
		);
		newsAuthor = document.querySelector("div.news-author > a.username > b");
		if (!authorName) {
			presenceData.details = `Reading a news post by ${newsAuthor.textContent}`;
			presenceData.state = threadName.textContent;
		} else {
			presenceData.details = `Reading a thread by ${authorName.textContent}`;
			presenceData.state = threadName.textContent;
		}
	} else if (document.location.pathname.startsWith("/game")) {
		gName = document.querySelector("h1.dynamicTitle");
		if (gName.textContent === "GBAtemp Game Center Home")
			presenceData.details = "Browsing...";
		else {
			presenceData.details = "Reading about a game";
			presenceData.state = gName.textContent;
		}
	} else if (document.location.pathname.startsWith("/platform")) {
		pName = document.querySelector("h1.dynamicTitle");
		if (
			pName.textContent === "Game Center Platform List" ||
			cName.textContent === "List of video game companies" ||
			pName.textContent === "Game Database"
		)
			presenceData.details = "Browsing...";
		else {
			presenceData.details = "Reading about a platform";
			presenceData.state = pName.textContent;
		}
	} else if (document.location.pathname.startsWith("/company")) {
		cName = document.querySelector("h1.dynamicTitle");
		presenceData.details = "Reading about a company";
		presenceData.state = cName.textContent;
	} else if (document.location.pathname.startsWith("/questions")) {
		presenceData.details = "Reading a question";
		presenceData.state = document.querySelector("h1.blueHeader").textContent;
	} else if (document.location.pathname.startsWith("/members")) {
		profileName = document.querySelector(
			"div.mainText.secondaryContent > h1.username"
		);
		if (!profileName) presenceData.details = "Browsing...";
		else
			presenceData.details = `Looking at ${profileName.textContent}'s profile`;
	} else if (document.location.pathname.startsWith("/chat"))
		presenceData.details = "Chatting in IRC";
	else if (document.location.pathname.startsWith("/shoutbox"))
		presenceData.details = "Chatting in the Shoutbox";
	else if (document.location.pathname.startsWith("/search"))
		presenceData.details = "Searching...";
	else if (document.location.pathname.startsWith("/review")) {
		presenceData.details = `Reading a review by ${
			document.querySelector("h1#review_title > a").textContent
		}`;
		presenceData.state = document.querySelector(
			"span.review_author > a.username"
		).textContent;
	} else if (document.location.pathname.startsWith("/entry")) {
		presenceData.details = `Reading a blog post by ${
			document.querySelector("span.postedBy > span.posted.iconKey > a.username")
				.textContent
		}`;
		presenceData.state = document.querySelector("a.newsTitle").textContent;
	}
	presence.setActivity(presenceData);
});
