presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/F/Font%20Awesome/assets/logo.png",
			startTimestamp: browsingTimestamp,
			type: ActivityType.Playing,
			name: "Font Awesome",
		},
		{ pathname, search, href } = document.location,
		pathList = pathname.split("/").filter(Boolean);

	switch (pathList[0] ?? "/") {
		case "/": {
			presenceData.details = "Browsing Home Page";
			break;
		}
		case "icons": {
			if (pathList[1] === "categories") {
				if (pathList[2]) {
					const header = document.querySelector("h2");
					presenceData.details = "Viewing Icon Category";
					presenceData.state = header;
					presenceData.smallImageKey = getIconImage(header.querySelector("i"));
					presenceData.smallImageText = header;
					presenceData.buttons = [{ label: "View Category", url: href }];
				} else {
					presenceData.details = "Browsing Categories";
				}
			} else if (pathList[1]) {
				presenceData.details = "Viewing Icon";
				presenceData.state = document.querySelector(".icon-detail h1+button");
				presenceData.smallImageKey = getIconImage(
					document.querySelector(".icon-details-preview-rendering i")
				);
				presenceData.smallImageText =
					document.querySelector<HTMLSelectElement>("#icon_family").value;
				presenceData.buttons = [{ label: "View Icon", url: href }];
			} else {
				presenceData.details = "Browsing Icons";
			}
			break;
		}
		case "start": {
			presenceData.details = "Getting Started";
			break;
		}
		case "support": {
			presenceData.details = "Browsing Support";
			break;
		}
		case "plans": {
			if (pathList[1]) {
				presenceData.details = "Viewing Plan";
				presenceData.state = document.querySelector("h3");
			} else {
				presenceData.details = "Browsing Plans";
			}
			break;
		}
		case "sessions": {
			presenceData.details = "Signing In";
			break;
		}
	}

	if (!presenceData.details) presence.clearActivity();
	else presence.setActivity(presenceData);
});
