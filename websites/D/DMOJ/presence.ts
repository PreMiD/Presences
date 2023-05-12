const presence = new Presence({
		clientId: "754070047193956492",
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

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			smallImageKey: "icon",
			smallImageText: "DMOJ: Modern Online Judge",
			startTimestamp: browsingTimestamp,
		},
		url = document.location.pathname.split("/");
	if (url.includes("post")) {
		presenceData.details = "Viewing post:";
		presenceData.state = document
			.querySelector("#content > h2")
			.textContent.trim();
		presenceData.largeImageKey = "post";
		presenceData.buttons = [
			{ label: "View Post", url: `https://dmoj.ca/post/${url[2][2]}` },
		];
	} else if (url.includes("problems")) {
		presenceData.details = "Browsing problems";
		presenceData.largeImageKey = "problem_list";
	} else if (url.includes("problem")) {
		const problemURL = `https://dmoj.ca/problem/${url[2]}`;

		presenceData.buttons = [{ label: "View Problem", url: problemURL }];

		if (url.includes("submit")) {
			presenceData.details = "Submitting to problem:";
			presenceData.state = document
				.querySelector("#content > h2 > a")
				.textContent.trim();
			presenceData.largeImageKey = "submit";
		} else if (url.includes("submissions")) {
			presenceData.details = "Viewing submissions to problem:";
			presenceData.state = document.querySelectorAll(".tabs > h2 > a")[
				// eslint messed up the next line
				document.querySelectorAll(".tabs > h2 > a").length - 1
			].textContent.trim();
			presenceData.largeImageKey = "submission_list";
			presenceData.buttons.push({
				label: "View Submissions",
				url: `${problemURL}/submissions/`,
			});
		} else if (url.includes("rank")) {
			presenceData.details = "Viewing best submissions to problem:";
			presenceData.state = document
				.querySelector(".tabs > h2 > a")
				.textContent.trim();
			presenceData.largeImageKey = "submission_list";
			presenceData.buttons.push({
				label: "View Best Submissions",
				url: `${problemURL}/rank/`,
			});
		} else if (url.includes("editorial")) {
			presenceData.details = "Viewing editorial for problem:";
			presenceData.state = document
				.querySelector("#content > h2 > a")
				.textContent.trim();
			presenceData.largeImageKey = "editorial";
			presenceData.buttons.push({
				label: "View Editorial",
				url: `${problemURL}/editorial/`,
			});
		} else if (url.includes("tickets") && url.includes("new")) {
			presenceData.details = "Creating a ticket for problem:";
			presenceData.state = document
				.querySelector("#content > h2 > a")
				.textContent.trim();
			presenceData.largeImageKey = "ticket";
		} else {
			const problemName = document
					.querySelector(".problem-title > h2")
					.textContent.trim(),
				problemPoints = document.querySelector(".pi-value").textContent.trim();

			presenceData.details = "Viewing problem:";
			presenceData.largeImageKey = "problem";

			if (problemPoints === "1")
				presenceData.state = `${problemName} (${problemPoints} point)`;
			else presenceData.state = `${problemName} (${problemPoints} points)`;
		}
	} else if (url.includes("submissions")) {
		if (url.includes("user")) {
			presenceData.details = "Viewing submissions by user:";

			if (
				document.querySelector(".tabs > h2").textContent.trim() ===
				"All my submissions"
			) {
				const user = document
					.querySelector("#user-links > ul > li > a > span > span > b")
					.textContent.trim();
				presenceData.state = user;
				presenceData.largeImageKey = "submission_list";
				presenceData.buttons = [
					{
						label: "View Submissions",
						url: `https://dmoj.ca/submissions/user/${user}`,
					},
					{ label: "View User", url: `https://dmoj.ca/user/${user}` },
				];
			} else {
				const user = document
					.querySelector(".tabs > h2 > a")
					.textContent.trim();
				presenceData.state = user;
				presenceData.largeImageKey = "submission_list";
				presenceData.buttons = [
					{
						label: "View Submissions",
						url: `https://dmoj.ca/submissions/user/${user}`,
					},
					{ label: "View User", url: `https://dmoj.ca/user/${user}` },
				];
			}
		} else {
			presenceData.details = "Browsing submissions";
			presenceData.largeImageKey = "submission_list";
		}
	} else if (url.includes("submission")) {
		presenceData.details = "Viewing submission to problem:";
		presenceData.state = document
			.querySelector("#content > h2 > a")
			.textContent.trim();
		presenceData.largeImageKey = "submission";
		presenceData.buttons = [
			{
				label: "View Submission",
				url: `https://dmoj.ca/submission/${url[2]}`,
			},
		];
	} else if (url.includes("src")) {
		presenceData.details = "Viewing submission source to problem:";
		presenceData.state = document
			.querySelector("#content > h2 > a")
			.textContent.trim();
		presenceData.largeImageKey = "source";
	} else if (url.includes("organizations")) {
		presenceData.details = "Browsing organizations";
		presenceData.largeImageKey = "organization";
	} else if (url.includes("organization")) {
		const organizationURL = `https://dmoj.ca/organization/${url[2]}`;
		presenceData.state = document
			.querySelector("#content > h2")
			.textContent.trim()
			.replace(" Members", "");
		presenceData.buttons = [
			{ label: "View Organization", url: organizationURL },
			{ label: "View Members", url: `${organizationURL}/users` },
		];

		if (url.includes("users")) {
			presenceData.details = "Viewing members of organization:";
			presenceData.largeImageKey = "users";
		} else {
			presenceData.details = "Viewing organization:";
			presenceData.largeImageKey = "organization";
		}
	} else if (url.includes("users")) {
		presenceData.details = "Viewing leaderboard";
		presenceData.largeImageKey = "leaderboard";
	} else if (url.includes("user")) {
		const userHeader = document.querySelector(".tabs > h2").textContent.trim();

		if (url.includes("solved")) {
			const [, userRank] = document
				.querySelectorAll(".user-sidebar > div")[2]
				.textContent.trim()
				.split("#");

			presenceData.details = "Viewing problems solved by:";

			if (userHeader === "My account") {
				const user = document
						.querySelector("#user-links > ul > li > a > span > span > b")
						.textContent.trim(),
					userURL = `https://dmoj.ca/user/${user}`;

				presenceData.state = `${user} (Rank: #${userRank})`;
				presenceData.largeImageKey = "submission_list";
				presenceData.buttons = [
					{ label: "View User", url: userURL },
					{ label: "View Solved Problems", url: `${userURL}/solved` },
				];
			} else {
				const [, user] = document
						.querySelector(".tabs > h2")
						.textContent.trim()
						.split(" "),
					userURL = `https://dmoj.ca/user/${user}`;

				presenceData.state = `${user} (Rank: #${userRank})`;
				presenceData.largeImageKey = "submission_list";
				presenceData.buttons = [
					{ label: "View User", url: userURL },
					{ label: "View Solved Problems", url: `${userURL}/solved` },
				];
			}
		} else {
			const [, userRank] = document
				.querySelectorAll(".user-sidebar > div")[2]
				.textContent.trim()
				.split("#");

			presenceData.details = "Viewing user:";

			if (userHeader === "My account") {
				const user = document
					.querySelector("#user-links > ul > li > a > span > span > b")
					.textContent.trim();
				presenceData.state = `${user} (Rank: #${userRank})`;
				presenceData.largeImageKey = "user";
				presenceData.buttons = [
					{ label: "View User", url: `https://dmoj.ca/user/${user}` },
				];
			} else {
				const [, user] = document
					.querySelector(".tabs > h2")
					.textContent.trim()
					.split(" ");

				presenceData.state = `${user} (Rank: #${userRank})`;
				presenceData.largeImageKey = "user";
				presenceData.buttons = [
					{ label: "View User", url: `https://dmoj.ca/user/${user}` },
				];
			}
		}
	} else if (url.includes("edit") && url.includes("profile")) {
		presenceData.details = "Editing profile:";
		presenceData.state = document
			.querySelector("#user-links > ul > li > a > span > span > b")
			.textContent.trim();
		presenceData.largeImageKey = "edit_profile";
	} else if (url.includes("contests")) {
		presenceData.details = "Browsing contests";
		presenceData.largeImageKey = "contest";
	} else if (url.includes("contest")) {
		const contestURL = `https://dmoj.ca/contests/${url[2]}`;

		presenceData.state = document
			.querySelector(".tabs > h2")
			.textContent.trim();
		presenceData.buttons = [{ label: "View Contest", url: contestURL }];

		if (url.includes("stats")) {
			presenceData.details = "Viewing statistics of contest:";
			presenceData.largeImageKey = "statistics";
			presenceData.buttons.push({
				label: "View Statistics",
				url: `${contestURL}/stats`,
			});
		} else if (url.includes("ranking")) {
			presenceData.details = "Viewing rankings of contest:";
			presenceData.largeImageKey = "leaderboard";
			presenceData.buttons.push({
				label: "View Rankings",
				url: `${contestURL}/ranking`,
			});
		} else if (url.includes("participations")) {
			presenceData.details = "Viewing participation of contest:";
			presenceData.largeImageKey = "users";
			presenceData.buttons.push({
				label: "View Participation",
				url: `${contestURL}/participations`,
			});
		} else {
			presenceData.details = "Viewing contest:";
			presenceData.largeImageKey = "contest";
		}
	} else if (url.includes("about")) {
		presenceData.details = "Viewing about page";
		presenceData.largeImageKey = "about";
	} else if (url.includes("status")) {
		presenceData.details = "Viewing status";
		presenceData.largeImageKey = "status";
	} else if (url.includes("runtimes")) {
		if (url.includes("matrix")) {
			presenceData.details = "Viewing version matrix";
			presenceData.largeImageKey = "source";
		} else {
			presenceData.details = "Viewing runtimes";
			presenceData.largeImageKey = "source";
		}
	} else if (url.includes("tips")) {
		presenceData.details = "Viewing tips";
		presenceData.largeImageKey = "about";
	} else if (url.includes("api")) {
		presenceData.details = "Viewing API";
		presenceData.largeImageKey = "source";
	} else {
		presenceData.details = "Viewing home page";
		presenceData.largeImageKey = "home";
	}

	presence.setActivity(presenceData);
});
