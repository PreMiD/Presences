const presence = new Presence({
		clientId: "655534149871992845",
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

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/4Q8nbiR.png",
			startTimestamp: browsingTimestamp,
		},
		path = (text: string) => {
			return document.location.pathname.includes(text);
		},
		title = document.querySelector("h1").textContent;

	if (path("/dashboard")) presenceData.details = "In dashboard";
	else if (path("/domains")) {
		presenceData.details = "Viewing challenges:";
		presenceData.state = title;
	} else if (path("/challenges")) {
		presenceData.details = "Solving a challenge:";
		presenceData.state = title;
	} else if (path("/skills-verification")) {
		presenceData.details = "Skills Certification";
		if (title !== "Get Your Skills Certified")
			presenceData.state = title.split("Skills Certification Test")[0].trim();
	} else if (path("/competitions")) {
		presenceData.details = "Viewing a competition:";
		presenceData.state = title;
	} else if (path("/inbox")) presenceData.details = "Viewing inbox";
	else if (path("/notifications"))
		presenceData.details = "Viewing notifications";
	else if (
		document.querySelector(
			"#content button.ui-btn.ui-btn-normal.ui-btn-primary.profile-btn-follow.ui-btn-styled"
		)
	) {
		// profiles
		presenceData.details = "Viewing profile of:";
		presenceData.state = `${title} (${
			document.querySelector("#content p.profile-username-heading").textContent
		})`;
	} else if (
		document.location.pathname.match(/\/companies\/.*?\/jobs/g) &&
		title !== "Find Your Dream Job"
	) {
		presenceData.details = "Viewing a job:";
		presenceData.state = title;
	} else if (path("/jobs/")) presenceData.details = "Viewing jobs";
	else if (path("/companies")) {
		presenceData.details = "Viewing a company:";
		presenceData.state = document
			.querySelector("p")
			.textContent.split("More about")[1]
			.trim();
	} else if (path("/leaderboard")) {
		presenceData.details = "Viewing a leaderboard:";
		presenceData.state = document.querySelector(
			"span.selected-track-name"
		).textContent;
	}
	presence.setActivity(presenceData);
});
