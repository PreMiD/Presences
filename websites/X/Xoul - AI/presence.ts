const presence = new Presence({
		clientId: "1310165299802411078",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://i.imgur.com/3gRgAsL.jpeg",
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

	switch (pathname.split("/")[1]) {
		case "": {
			presenceData.details = "Browsing Homepage";
			break;
		}
		case "chats": {
			const chatName = document.querySelector("[class^='ChatUI_xoul_name']");
			if (chatName)
				presenceData.details = `Chatting with ${chatName.textContent.trim()}`;
			else presenceData.details = "Chatting";

			presenceData.largeImageKey =
				document.querySelector<HTMLImageElement>("[class^='ChatBubble_image']")
					?.src ?? Assets.Logo;

			break;
		}
		case "profile": {
			presenceData.details = "Viewing a profile";
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
				presenceData.details = `Editing ${scenarioName ?? "a"} scenario`;
			else {
				presenceData.details = `Viewing ${scenarioName ?? "a"} scenario`;

				presenceData.largeImageKey =
					document.querySelector<HTMLImageElement>(
						"[class^='ViewScenario_image__']"
					)?.src ?? Assets.Logo;

				presenceData.buttons = [button];
			}
			break;
		}
		case "xoul": {
			const xoulName = document
				.querySelector("[class^='ViewXoul_name']")
				?.textContent?.trim();

			if (pathname.split("/")[3] === "edit")
				presenceData.details = `Editing ${xoulName ?? "a Xoul"}`;
			else {
				presenceData.details = `Viewing ${xoulName ?? "a Xoul"}`;
				presenceData.largeImageKey =
					document.querySelector<HTMLImageElement>(
						"[class^='ViewXoul_image__']"
					)?.src ?? Assets.Logo;
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
