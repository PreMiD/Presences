const presence = new Presence({
		clientId: "1078446138966954085",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/Wp8c2G4.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, hostname, href } = document.location,
		pathList = pathname.split("/").filter(path => path !== "");

	if (hostname === "chessly.com") {
		switch (true) {
			case /\/courses\//.test(pathname): {
				let i = pathList.indexOf("courses");
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
							const backLink = document.querySelector<HTMLAnchorElement>(
								"[class*='CourseCheckout_link'] a"
							);
							if (backLink) {
								presenceData.buttons = [
									{
										label: "View Course",
										url: backLink.href,
									},
								];
							}
							break;
						}
						default: {
							presenceData.details = "Viewing a course";
							presenceData.state = document.querySelector("h1").textContent;
							presenceData.largeImageKey = courseImage.src;
							presenceData.buttons = [{ label: "View Course", url: href }];
						}
					}
				} else {
					presenceData.details = "Browsing courses";
				}
				break;
			}
			case pathList[0] === "dashboard": {
				if (pathList[1] === "settings") {
					presenceData.details = "Managing account settings";
				} else {
					presenceData.details = "Browsing the dashboard";
				}
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
	} else {
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
