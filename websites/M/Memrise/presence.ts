const presence = new Presence({ clientId: "1095377958241304586" }),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Logo = "https://i.imgur.com/Kbhd9t6.jpg",
	Searching = "https://i.imgur.com/OIgfjTG.png",
	Reviewing = "https://i.imgur.com/53N4eY6.png",
}

presence.on("UpdateData", async () => {
	const { pathname } = document.location,
		pathArr = pathname.split("/"),
		{ details, smallImageKey, largeImageKey, state, buttons } = getPageData(
			pathArr[1],
			pathArr[2],
			pathArr[3]
		),
		presenceData: PresenceData = {
			largeImageKey: largeImageKey || Assets.Logo,
			startTimestamp: browsingTimestamp,
			details,
		};

	if (buttons) presenceData.buttons = buttons;

	if (smallImageKey) presenceData.smallImageKey = smallImageKey;
	if (state) presenceData.state = state;

	if (details) presence.setActivity(presenceData);
});

function getPageData(
	page: string,
	pageDetail: string,
	title: string
): {
	details?: string;
	smallImageKey?: string;
	largeImageKey?: string;
	state?: string;
	buttons?: [ButtonData, ButtonData?];
} {
	switch (page) {
		case "dashboard":
			return {
				details: `Viewing their ${page}...`,
				state: document.querySelector("h1").textContent,
				smallImageKey: Assets.Searching
			};
		case "course":
			return {
				details: document.querySelector(".course-name")?.textContent,
				state: document.querySelector(".progress-box-title")?.textContent,
				largeImageKey:
					document.querySelector<HTMLImageElement>(".course-photo img")?.src,
				buttons: [
					{
						label: "Go to Course",
						url: `https://app.memrise.com/course/${pageDetail}/${title}`,
					},
				],
			};
		case "aprender": {
			const translate = document.querySelector(
				"#__next > div > div > div > div > div > div > div > div > div > div > div > h2"
			),
				points = document.querySelector(
				"#__next > div > div > div > div > div > div > div > div > div > span > div"
			),
			 	completed = document.querySelector(
				"#__next > div > div > div > div > div > div > div > h2"
			);
			let state = "";
			if (translate?.textContent && points?.textContent)
				state = `translate: ${translate.textContent} | ${points.textContent} points`;
			else if (completed?.textContent)
				state = completed.textContent;
			return {
				details: document.querySelector("header > div > a").textContent,
				state,
				smallImageKey: Assets.Reviewing
			};
		}
		case "courses":
			return {
				details: "Browsing...",
				state: document.querySelector(".category-header").textContent,
				smallImageKey: Assets.Searching
			};
		case "user":
			return {
				details: "Viewing profile...",
				state: `Knows ${
					document.querySelector("li:nth-child(3) > div > strong").textContent
				} words | ${
					document.querySelector(".stat-value-xs").textContent
				} points`,
			};
		case "home":
			return getHomeDetail(pageDetail);
		case "settings":
			return getSettingsDetail(pageDetail);
		case "about":
			return { details: "Viewing About us page..."}; //record and its not in app.memrise.com so remove app?
		default:
			return { details: "Browsing...", smallImageKey: Assets.Searching };
	}
}
function getHomeDetail(pageDetail: string) {
	switch (pageDetail) {
		case "learning-statistics":
			return {
				details: "Viewing their learning stats...",
				state: `${document.querySelector(".rank").textContent} 
				[Best Streak ${document.querySelector("#attendance-grid-label2 .large").textContent} | 
				Current ${document.querySelector("#attendance-grid-label3 .large").textContent} | 
				Total ${document.querySelector("#attendance-grid-label1 .large").textContent} days the last 365 days]`
			};
		case "difficult-words":
			return { details: `Viewing their ${document.querySelector(".tabbed-main > div.left").textContent}`};
		case "leaderboard":
			return {
				details: "Viewing their group leaderboard...",
				state: `${document.querySelector("li.btn.btn-small.active").textContent}: 
				${document.querySelector(".row-points").textContent} points`
			};
		default:
			return { details: "browsing home..." };
	}
}

function getSettingsDetail(pageDetails: string) {
	switch (pageDetails) {
		case "":
			return { details: "Viewing their profile settings..." };
		case "personal_data":
			return { details: "Requesting their Personal Data..." };
		case "premium":
			return { details: "Viewing their subscription settings..." };
		case "change_password":
			return { details: "Viewing their password settings..." };
		case "deactivate":
			return { details: "Viewing their delete account settings..." };
		default:
			return { details: "Changing settings..." };
	}
}