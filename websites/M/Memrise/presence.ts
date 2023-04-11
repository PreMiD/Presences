const presence = new Presence({ clientId: "1095377958241304586" }),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Logo = "https://i.imgur.com/Kbhd9t6.jpg",
	Searching = "https://i.imgur.com/OIgfjTG.png",
	Reading = "https://i.imgur.com/53N4eY6.png",
}

presence.on("UpdateData", async () => {
	const { pathname } = document.location,
		pathArr = pathname.split("/"),
		{ details, smallImageKey, largeImageKey, state, buttons } = getPageData(
			pathArr[1],
			pathArr[2],
			pathArr[3],
		),
		presenceData: PresenceData = {
			largeImageKey: largeImageKey || Assets.Logo,
			startTimestamp: browsingTimestamp,
			details,
		};

	if (buttons)
		presenceData.buttons = buttons;

	if (smallImageKey) presenceData.smallImageKey = smallImageKey;
	if (state) presenceData.state = state;

	if (details) presence.setActivity(presenceData);
});

function getPageData(page: string, pageDetail: string, title: string): {
	details?: string;
	smallImageKey?: string;
	largeImageKey?: string;
	state?: string;
	buttons?: [ButtonData, ButtonData?];
} {
	switch (page) {
		case "dashboard":
			return {
				details: `Viewing ${page}...`,
				state: document.querySelector("h1").textContent
			};
		case "course":
			return {
				details: document.querySelector(".course-name")?.textContent,
				state: document.querySelector(".progress-box-title")?.textContent,
				largeImageKey: document.querySelector<HTMLImageElement>(".course-photo img")?.src,
				buttons: [
					{
						label: "Go to Course",
						url: `https://app.memrise.com/course/${pageDetail}/${title}`,
					},
				],
			};
		case "aprender":
			return {
				details: document.querySelector("header > div > a").textContent,
				state: `${document.querySelector("#__next > div > div > div > div > div > div > div > div > div > div > div > h2").textContent}`
			};
		case "courses":
			return {
				details: "Viewing...",
				state: `Different language ${page}`,
			};
		case "user":
			return {
				details: `Viewing ${page}...`};
		default:
			return { details: "Browsing...", smallImageKey: Assets.Reading };
	}
}