const presence = new Presence({
		clientId: "1310165299802411078",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://i.imgur.com/aTWK1eZ.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		[time, buttons] = await Promise.all([
			presence.getSetting<boolean>("time"),
			presence.getSetting<boolean>("buttons"),
		]),
		{ pathname, href } = document.location,
		button = {
			label: "View Page",
			url: href,
		};

	console.log(
		"0",
		pathname.split("/")[0],
		"1",
		pathname.split("/")[1],
		"2",
		pathname.split("/")[2]
	);

	switch (pathname.split("/")[1]) {
		case "": {
			presenceData.details = "Browsing Homepage";
			presenceData.buttons = [button];
			break;
		}
		case "chats": {
			const chatName= document.querySelector(
				"[class^='ChatUI_xoul_name']"
			);
			if (chatName)
				presenceData.details = `Chatting with ${chatName.textContent.trim()}`;

				const chatImage = document.querySelector(
					"[class^='ChatBubble_image']"
				) as HTMLImageElement;;
				if (chatImage)
					presenceData.largeImageKey = chatImage?.src;		

			else presenceData.details = "Chatting";

			break;
		}
		case "profile": {
			const { pathname } = document.location;
			presenceData.details = "Viewing profile";
			presenceData.state = `for ${pathname.split("/")[2]}`;
			presenceData.buttons = [button];
			break;
		}
		case "create": {
			if (pathname.split("/")[2] === "xoul")
				presenceData.details = "Creating Xoul";
			else if (pathname.split("/")[2] === "scenario")
				presenceData.details = "Creating Scenario";

			break;
		}
		case "scenario": {
			const scenarioName = document
				.querySelector("[class^='ViewScenario_name']")
				?.textContent?.trim();

			if (pathname.split("/")[3] === "edit")
				presenceData.details = `Editing ${scenarioName ?? ""} scenario`;
			else {
				presenceData.details = `Viewing ${scenarioName ?? ""} scenario`;

				const scenarioImage = document.querySelector(
					"[class^='ViewScenario_image__']"
				) as HTMLImageElement;;
				console.log(scenarioImage)
				if (scenarioImage)
					presenceData.largeImageKey = scenarioImage?.src;		


				presenceData.buttons = [button];
			}
			break;
		}
		case "xoul": {
			const xoulName = document
				.querySelector("[class^='ViewXoul_name']")
				?.textContent?.trim();

			if (pathname.split("/")[3] === "edit")
				presenceData.details = `Editing ${xoulName ?? "Xoul"}`;
			else {
				presenceData.details = `Viewing ${xoulName ?? "Xoul"}`;

				const xoulImage = document.querySelector(
					"[class^='ViewXoul_image__']"
				) as HTMLImageElement;;
				if (xoulImage)
					presenceData.largeImageKey = xoulImage?.src;		

				presenceData.buttons = [button];
			}
			break;
		}
		case "select": {
			presenceData.details = "Creating Experience";
			presenceData.buttons = [button];
			break;
		}
	}

	if (!time) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}

	if (!buttons && presenceData.buttons) delete presenceData.buttons;

	presence.setActivity(presenceData);
});
