const presence = new Presence({
	clientId: "1078446138966954085",
});
let browsingTimestamp = Math.floor(Date.now() / 1000),
	oldPath: string = null;

presence.on("UpdateData", async () => {
	const { pathname, hostname } = document.location;
	if (oldPath !== pathname) {
		browsingTimestamp = Math.floor(Date.now() / 1000);
		oldPath = pathname;
	}
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/Wp8c2G4.png",
			startTimestamp: browsingTimestamp,
		},
		pathList = pathname.split("/").filter(path => path !== "");

	if (hostname === "chessly.com") {
		switch (true) {
			case /\/courses\//.test(pathname): {
				const i = pathList.indexOf("courses");
				if (pathList[i + 1]) {
					const courseImage = document.querySelector<HTMLImageElement>(
						"[class*='_imageWrapper'] img"
					);
					switch (pathList[i + 2]) {
						case "gift-checkout":
						case "checkout": {
							presenceData.details = "Purchasing a course";
							presenceData.state = courseImage.alt;
							presenceData.largeImageKey = courseImage.src;
							break;
						}
						case "lessons": {
							presenceData.details = "Doing a lesson";
							presenceData.state = `${[
								...document.querySelectorAll<HTMLAnchorElement>(
									"[class*='UserViewLessonHeader'] a[class*='UserViewLessonHeader_breadcrumbItem']"
								),
							]
								.map(e => e.textContent)
								.join(", ")} - ${
								document.querySelector<HTMLDivElement>(
									"header > [class*='UserViewLessonHeader'] > [class*='UserViewLessonHeader']"
								).textContent
							}`;
							break;
						}
						default: {
							presenceData.details = "Viewing a course";
							presenceData.state = document.querySelector("h1").textContent;
							presenceData.largeImageKey = courseImage.src;
						}
					}
				} else presenceData.details = "Browsing courses";
				break;
			}
			case /\/games\//.test(pathname): {
				if (
					document.querySelector<HTMLButtonElement>(
						"[class*='PrimaryActionButton']"
					)?.textContent === "Play"
				) {
					presenceData.details = "Preparing to play a game";
					presenceData.state = document.querySelector("h1").textContent;
				} else {
					presenceData.details = "Playing a game";
					presenceData.state = document.querySelector("h1").textContent;
				}
				break;
			}
			case pathList[0] === "dashboard": {
				if (pathList[1] === "settings")
					presenceData.details = "Managing account settings";
				else presenceData.details = "Browsing the dashboard";
				break;
			}
			case pathList[0] === "faq": {
				presenceData.details = "Reading the FAQ";
				break;
			}
			case pathList[0] === "login": {
				presenceData.details = "Logging in";
				break;
			}
			default: {
				presenceData.details = "Browsing";
			}
		}
	} else if (hostname === "feedback.chessly.com") {
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
