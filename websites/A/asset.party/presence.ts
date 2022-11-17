const presence = new Presence({
	clientId: "1042537481058394164",
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/o5viesK.png",
		},
		{ pathname, href } = document.location,
		pathSplit = pathname.split(/^.(.*)\/([^/]*)$/).filter(String);
	switch (pathname) {
		case "/": {
			presenceData.details = "Exploring asset.party";
			break;
		}
		case "/get/developer/preview": {
			const keyDetails = document.querySelectorAll(".tag");
			presenceData.details = "Trying to find the key...";
			presenceData.state = `🔑${keyDetails[0].innerHTML.match(/\d+/)[0]} 🧍 ${
				keyDetails[2].innerHTML.match(/\d+/)[0]
			} 👀 ${keyDetails[3].innerHTML.match(/\d+/)[0]} `;
			presenceData.smallImageKey = "https://i.imgur.com/mflNxaO.png";
			presenceData.smallImageText = "You found the key!";

			break;
		}
		case "/api-history/": {
			presenceData.details = "Viewing API History";
			break;
		}
		default:
			if (
				document.querySelectorAll(".nav-thumb").length !== 0 &&
				document.querySelectorAll(".page-header-block").length !== 0
			) {
				const Details = document.querySelectorAll(".page-header-block");
				if (
					Details.length !== 0 &&
					document.querySelectorAll(".nav-thumb").length !== 0
				) {
					presenceData.details = `Viewing ${Details[2].innerHTML} `;
					presenceData.state = `Developed by ${Details[1].innerHTML}`;
					presenceData.buttons = [
						{
							label: "Open Project",
							url: href,
						},
					];
				}
			} else if (pathSplit.length !== 0 && pathSplit[0] === "api") {
				presenceData.details = "Viewing API documentation";
				if (pathSplit[1]) {
					presenceData.state = `Learning ${pathSplit[1]}`;
					presenceData.buttons = [
						{
							label: "View documentation",
							url: href,
						},
					];
				}
			}
	}

	presence.setActivity(presenceData);
});
