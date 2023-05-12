const presence = new Presence({
		clientId: "798139973240225812",
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

let course, sub: string;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/yQiWgOw.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.hostname === "eldiru.unsoed.ac.id") {
		if (document.location.pathname === "/")
			presenceData.details = "Viewing homepage";
		else if (document.location.pathname.includes("/login"))
			presenceData.details = "Viewing login page";
		else if (document.location.pathname.includes("/my"))
			presenceData.details = "Viewing dashboard";
		else if (document.location.pathname.includes("/course/")) {
			course = document.querySelector(
				"#page-course-view-topics > div#page-wrapper > div#page > div#learningcontent > header#page-header > div.col-12 > div.card > div.card-body > div.d-flex > div.mr-auto > a > div.page-context-header > div.page-header-headings > h1"
			).textContent;
			presenceData.details = "Viewing course:";
			presenceData.state = course;
		} else if (document.location.pathname.includes("/mod/attendance/")) {
			course = document.querySelector(
				"#page-mod-attendance-view > div#page-wrapper > div#page > div#learningcontent > header#page-header > div.col-12 > div.card > div.card-body > div.d-flex > div.mr-auto > a > div.page-context-header > div.page-header-headings > h1"
			).textContent;
			if (
				document.querySelector(
					"#page-mod-attendance-view > div#page-wrapper > div#page > div#learningcontent > div#page-content > div#region-main-box > section#region-main > div > h2"
				) !== null
			) {
				sub = document.querySelector(
					"#page-mod-attendance-view > div#page-wrapper > div#page > div#learningcontent > div#page-content > div#region-main-box > section#region-main > div > h2"
				).textContent;
				presenceData.details = `Viewing ${sub}`;
			} else presenceData.details = "Viewing attendance:";

			presenceData.state = course;
		} else if (document.location.pathname.includes("/mod/forum/")) {
			course = document.querySelector(
				"#page-mod-forum-view > div#page-wrapper > div#page > div#learningcontent > header#page-header > div.col-12 > div.card > div.card-body > div.d-flex > div.mr-auto > a > div.page-context-header > div.page-header-headings > h1"
			).textContent;
			if (
				document.querySelector(
					"#page-mod-forum-view > div#page-wrapper > div#page > div#learningcontent > div#page-content > div#region-main-box > section#region-main > div > h2"
				) !== null
			) {
				sub = document.querySelector(
					"#page-mod-forum-view > div#page-wrapper > div#page > div#learningcontent > div#page-content > div#region-main-box > section#region-main > div > h2"
				).textContent;
				presenceData.details = `Viewing ${sub}`;
			} else presenceData.details = "Viewing forum:";

			presenceData.state = course;
		} else if (document.location.pathname.includes("/mod/page/")) {
			course = document.querySelector(
				"#page-mod-page-view > div#page-wrapper > div#page > div#learningcontent > header#page-header > div.col-12 > div.card > div.card-body > div.d-flex > div.mr-auto > a > div.page-context-header > div.page-header-headings > h1"
			).textContent;
			if (
				document.querySelector(
					"#page-mod-page-view > div#page-wrapper > div#page > div#learningcontent > div#page-content > div#region-main-box > section#region-main > div > h2"
				) !== null
			) {
				sub = document.querySelector(
					"#page-mod-page-view > div#page-wrapper > div#page > div#learningcontent > div#page-content > div#region-main-box > section#region-main > div > h2"
				).textContent;
				presenceData.details = `Viewing ${sub}`;
			} else presenceData.details = "Viewing page:";

			presenceData.state = course;
		} else if (document.location.pathname.includes("/mod/assign/")) {
			course = document.querySelector(
				"#page-mod-assign-view > div#page-wrapper > div#page > div#learningcontent > header#page-header > div.col-12 > div.card > div.card-body > div.d-flex > div.mr-auto > a > div.page-context-header > div.page-header-headings > h1"
			).textContent;
			if (
				document.querySelector(
					"#page-mod-assign-view > div#page-wrapper > div#page > div#learningcontent > div#page-content > div#region-main-box > section#region-main > div > h2"
				) !== null
			) {
				sub = document.querySelector(
					"#page-mod-assign-view > div#page-wrapper > div#page > div#learningcontent > div#page-content > div#region-main-box > section#region-main > div > h2"
				).textContent;
				presenceData.details = `Viewing ${sub}`;
			} else presenceData.details = "Viewing assignment:";

			presenceData.state = course;
		} else if (document.location.pathname.includes("/mod/quiz/")) {
			course = document.querySelector(
				"#page-mod-quiz-view > div#page-wrapper > div#page > div#learningcontent > header#page-header > div.col-12 > div.card > div.card-body > div.d-flex > div.mr-auto > a > div.page-context-header > div.page-header-headings > h1"
			).textContent;
			if (
				document.querySelector(
					"#page-mod-quiz-view > div#page-wrapper > div#page > div#learningcontent > div#page-content > div#region-main-box > section#region-main > div > h2"
				) !== null
			) {
				sub = document.querySelector(
					"#page-mod-quiz-view > div#page-wrapper > div#page > div#learningcontent > div#page-content > div#region-main-box > section#region-main > div > h2"
				).textContent;
				presenceData.details = `Viewing ${sub}`;
			} else presenceData.details = "Viewing quiz:";

			presenceData.state = course;
		}

		if (!presenceData.details) presence.setActivity();
		else presence.setActivity(presenceData);
	}
});
