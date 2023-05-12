const presence = new Presence({
		clientId: "1013489969379152022",
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
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}
presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/gtBvHQH.png",
			startTimestamp: browsingTimestamp,
		},
		lesson = document.querySelector<HTMLHeadingElement>(
			"body > div.page-container.lesson > header > div > div > h1"
		),
		course = document.querySelector<HTMLHeadingElement>(
			"body > div.gradient.odin-dark-bg > div > div:nth-child(1) > a > h1"
		),
		courseTitle = document.querySelector<HTMLHeadElement>(
			"body > div.page-container.lesson > header > div > div > a > h2"
		),
		path = document.location.pathname;
	switch (path) {
		case "/paths": {
			presenceData.state = "Viewing all Paths";
			break;
		}
		case "/paths/full-stack-javascript": {
			presenceData.state = "Viewing the Full Stack Javascript Path";
			break;
		}
		case "/paths/full-stack-ruby-on-rails": {
			presenceData.state = "Viewing the Full Stack Ruby Path";
			break;
		}
		case "/paths/foundations/courses/foundations": {
			presenceData.state = "Viewing the Foundations Path";
			break;
		}
		default:
			presenceData.state = "Viewing Dashboard";
	}

	if (path.includes("/paths/full-stack-javascript/courses/")) {
		presenceData.details = "Full Stack Javascript - Courses";
		presenceData.state = `${course.textContent}`;
	} else if (path.includes("/paths/full-stack-ruby-on-rails/courses/")) {
		presenceData.details = "Full Stack Ruby - Courses";
		presenceData.state = `${course.textContent}`;
	} else if (path.includes("/foundations-")) {
		presenceData.state = `${lesson.textContent}`;
		presenceData.details = "Foundations - Lessons";
	} else if (path.includes("/lessons/node-")) {
		presenceData.details = courseTitle.textContent;
		presenceData.state = lesson.textContent;
	} else if (path.includes("/lessons/ruby-")) {
		presenceData.details = courseTitle.textContent;
		presenceData.state = lesson.textContent;
	}
	presence.setActivity(presenceData);
});
