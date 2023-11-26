const presence = new Presence({
		clientId: "939893082546114611",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/C/Character.AI/assets/logo.png",
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
		{ pathname, href, origin } = document.location,
		button = {
			label: "View Page",
			url: href,
		};

	switch (pathname.split("/")[1]) {
		case "": {
			presenceData.details = "Browsing Homepage";
			break;
		}
		case "chat2": {
			presenceData.details = "Chatting with";
			presenceData.state = document.querySelector(
				"div > div > div > div > div > div > div > div"
			).textContent;
			presenceData.buttons = [button];
			break;
		}
		case "chat": {
			presenceData.details = "Chatting with";
			presenceData.state =
				document.querySelector(".chattitle")?.childNodes[1]?.textContent;
			presenceData.buttons = [button];
			break;
		}
		case "feed": {
			presenceData.details = "Browsing feed";
			break;
		}
		case "post": {
			presenceData.details = "Viewing post";
			presenceData.state = document.querySelector(
				`a[href^='${href.replace(origin, "")}']`
			).textContent;
			presenceData.buttons = [button];
			break;
		}
		case "public-profile": {
			presenceData.details = "Viewing profile";
			presenceData.state =
				document.querySelector("span").childNodes[1].textContent;
			presenceData.buttons = [button];
			break;
		}
		case "chats": {
			presenceData.details = "Browsing chats";
			break;
		}
		case "community": {
			presenceData.details = "Browsing community";
			break;
		}
		case "posts": {
			presenceData.details = "Browsing posts";
			presenceData.state = document.querySelector(
				"div > div > div > div > div > div > div > div > div > div > div:last-child > div:last-child"
			).textContent;
			presenceData.buttons = [button];
			break;
		}
		case "profile": {
			presenceData.details = "Viewing their profile";
			break;
		}
		case "character": {
			presenceData.details = "Creating character";
			break;
		}
		case "editing": {
			presenceData.details = "Editing character";
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
