const presence = new Presence({
		clientId: "1061324603022114998",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/eIpvMGf.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname } = document.location;

	switch (pathname.split("/")[1]) {
		case "":
			presenceData.details = "In the Homepage";
			break;

		case "chat":
			presenceData.details = "Chatting with";

			/*const char = document
					.querySelector("head > title")
					.textContent.replace("Character.AI - ", ""),
				img = document
					.querySelector("meta[property='og:image']")
					.getAttribute("content");*/

			presenceData.largeImageKey = `${document
				.querySelector("meta[property='og:image']")
				.getAttribute("content")
				.replace("80", "400")}`;
			presenceData.state = `${document
				.querySelector("head > title")
				.textContent.replace("Character.AI - ", "")}`;
			presenceData.buttons = [
				{
					label: `Chat ${document
						.querySelector("head > title")
						.textContent.replace("Character.AI - ", "")}`,
					url: document.location.href,
				},
			];
			break;

		case "feed":
			presenceData.details = "Browsing the feed";
			break;

		case "post":
			//const title3 = document.querySelector("head > title").textContent;

			presenceData.details = "Viewing a post";
			presenceData.state = `${
				document.querySelector("head > title").textContent
			}`;
			break;

		case "posts":
			/*const title = document.querySelector(
					".d-flex.flex-row.align-items-center"
				).textContent,
				pict = document.querySelector(".sb-avatar__image").getAttribute("src");*/

			presenceData.details = "Browsing posts";
			presenceData.state = `"${
				document.querySelector(".d-flex.flex-row.align-items-center")
					.textContent
			}"`;
			presenceData.smallImageKey = `${document
				.querySelector(".sb-avatar__image")
				.getAttribute("src")
				.replace("80", "400")}`;
			break;

		case "signup":
			presenceData.details = "Signing up";
			break;

		case "character":
			presenceData.details = "Creating a character";
			if (pathname.split("/")[2] === "create")
				presenceData.details = "Creating a character";
			break;

		case "chats":
			presenceData.details = "Browsing chats";
			break;

		case "community":
			presenceData.details = "Viewing the community tab";
			break;

		case "profile":
			presenceData.details = "Viewing my profile";
			break;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
