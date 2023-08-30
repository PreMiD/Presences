const presence = new Presence({
		clientId: "1146519848906653727",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://i.imgur.com/GnK79kd.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = document.location,
		pathList = pathname.split("/").filter(Boolean);

	switch (pathList[0] ?? "") {
		case "": {
			presenceData.details = "Browsing home page";
			break;
		}
		case "space": {
			const spaceTitle = document
				.querySelector<HTMLDivElement>(".community-title")
				.textContent.trim();
			presenceData.smallImageKey = document
				.querySelector<HTMLDivElement>(".user-image")
				.style.backgroundImage.match(/url\("(.+)"\)/)[1];
			presenceData.smallImageText = document
				.querySelector(".community-title + div > div")
				.textContent.trim();
			if (pathList[2] === "p") {
				presenceData.details = "Viewing a space post";
				presenceData.state = `${spaceTitle} - ${document
					.querySelector<HTMLDivElement>(".post-title-name")
					.textContent.trim()}`;
				presenceData.buttons = [{ label: "View Post", url: href }];
			} else {
				presenceData.details = "Browsing a space";
				presenceData.state = spaceTitle;
				presenceData.buttons = [{ label: "View Space", url: href }];
			}
			break;
		}
		case "spaces": {
			presenceData.details = "Browsing spaces";
			break;
		}
	}

	presence.setActivity(presenceData);
});
