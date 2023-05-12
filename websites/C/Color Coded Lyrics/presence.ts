const presence = new Presence({
		clientId: "1023360990802366544",
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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/x6zqFVQ.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href, search } = window.location,
		searchParams = new URLSearchParams(search),
		pathSplit = pathname.split("/").filter(x => x),
		pageTitle = document.querySelector<HTMLHeadingElement>("h1")?.textContent;

	switch (pathSplit[0] ?? "") {
		case "":
		case "page": {
			if (searchParams.get("s")) {
				presenceData.details = "Searching songs";
				presenceData.state = searchParams.get("s");
			} else {
				presenceData.details = "Browsing";
				presenceData.state = "Home page";
			}
			break;
		}
		case "author": {
			presenceData.details = "Viewing contributions by an author";
			presenceData.state = pageTitle.match(/^Author: (.*?)$/)[1];
			break;
		}
		case "calendar": {
			presenceData.details = "Viewing calendar";
			if (
				pathSplit[1] === "today" ||
				pathSplit[1] === "month" ||
				/^\d{4}-\d{2}(-\d{2})?$/.test(pathSplit[1])
			) {
				presenceData.state = `In ${document
					.querySelector<HTMLSpanElement>(
						".tribe-events-c-top-bar__datepicker-desktop"
					)
					.textContent.trim()}`;
			} else {
				presenceData.details = "Viewing an event";
				presenceData.state = document.querySelector<HTMLHeadingElement>(
					".tribe-events-single-event-title"
				).textContent;
			}
			break;
		}
		case "category": {
			presenceData.details = "Viewing contributions by a category";
			presenceData.state = pageTitle.match(/^Category: (.*?)$/)[1];
			break;
		}
		case "index": {
			presenceData.details = "Viewing index of songs";
			break;
		}
		case "requests": {
			presenceData.details = "Submitting a request";
			break;
		}
		case "translations": {
			presenceData.details = "Submitting a translation";
			break;
		}
		case "wp-login.php": {
			presenceData.details = "Logging in to WordPress dashboard";
			break;
		}
		case "wp-admin": {
			presenceData.details = "Viewing WordPress page";
			switch (pathSplit[1]) {
				case "index.php": {
					presenceData.state = "Dashboard";
					break;
				}
				case "profile.php": {
					presenceData.state = "Profile";
					break;
				}
				default: {
					document.title.match(
						/(.*?) \u2039 Color Coded Lyrics — WordPress/
					)[1];
				}
			}
			break;
		}
		default: {
			if (/^\/\d{4}(\/\d{2}\/?(\d{2})?)?\/?$/.test(pathname)) {
				presenceData.details = "Viewing contributions by a date";
				presenceData.state = pageTitle.match(/^.*?: (.*?)$/)[1];
			} else if (/^\/\d{4}\/\d{2}\/\d{2}\/.*?\/$/.test(pathname)) {
				presenceData.details = "Viewing song lyrics";
				presenceData.state = pageTitle;
				presenceData.buttons = [
					{
						label: "View Song",
						url: href,
					},
				];
				presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
					".inner-article-content img"
				).src;
			} else {
				presenceData.details = "Browsing";
				presenceData.state = pageTitle;
			}
		}
	}

	presence.setActivity(presenceData);
});
