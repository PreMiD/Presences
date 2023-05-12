const presence = new Presence({
		clientId: "863345026498428968",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/VXAzxLk.png",
			startTimestamp: browsingTimestamp,
		},
		{ hostname, pathname } = document.location;

	if (hostname === "w2g.tv") {
		if (pathname === "/") presenceData.details = "At Homepage";
		else if (pathname.startsWith("/rooms/")) {
			const playerTime = document.querySelectorAll<HTMLSpanElement>(
					"#player-time > span"
				),
				invite = document.querySelector<HTMLInputElement>(
					"#w2g-top-inviteurl > input"
				),
				chatMessages = [
					...document.querySelectorAll<HTMLDivElement>(
						"body > div.w2g-main-container.w2g-bind-layout > div.w2g-main-lower > div.w2g-main-right > div.w2g-content-right > div.w2g-menu-tab.w2g-chat.w2g-messages.w2g-panel-bottom > div.w2g-chat-messages.w2g-messages-container.w2g-scroll-vertical > div"
					),
				].reverse();

			let title: string;

			for (const msg of chatMessages) {
				if (msg.querySelector(".w2g-chat-item-actions")) {
					const chatBubble: HTMLDivElement =
						msg.querySelector(".w2g-chat-bubble");
					title = chatBubble.textContent.substring(
						0,
						chatBubble.textContent.indexOf("\n")
					);
					break;
				}
			}

			presenceData.details = `Watching ${title}`;
			presenceData.state = `${
				document.querySelectorAll("div.w2g-user-name").length
			} users in the room`;
			if (
				playerTime.length === 2 &&
				!document.querySelector(
					"div.w2g-player-menu.w2g-player > div.ui.inverted.tiny.menu > a > i.play"
				)
			) {
				[, presenceData.endTimestamp] = presence.getTimestamps(
					presence.timestampFromFormat(playerTime[0].textContent),
					presence.timestampFromFormat(playerTime[1].textContent)
				);
			}
			if (invite) {
				presenceData.buttons = [
					{
						label: "Join Room",
						url: invite.value,
					},
				];
			}
		} else if (pathname.startsWith("/users/")) {
			if (pathname.includes("edit"))
				presenceData.details = "Editing user profile";
			else presenceData.details = "Viewing user rooms";
		} else {
			switch (pathname) {
				case "/auth/sign_in": {
					presenceData.details = "Signing In";
					break;
				}
				case "/auth/sign_up": {
					presenceData.details = "Signing Up";
					break;
				}
				case "/pages/plus": {
					presenceData.details = "Checking w2g+ plans";
					break;
				}
				case "/pages/leave":
					{
						presenceData.details = "Left room";
						// No default
					}
					break;
			}
		}
	} else if (hostname === "community.w2g.tv") {
		if (pathname === "/") presenceData.details = "At Community homepage";
		else if (pathname.startsWith("/t/")) {
			const title: HTMLAnchorElement = document.querySelector("a.fancy-title");
			if (title) {
				presenceData.details = "Looking at thread";
				presenceData.state = title.textContent;
			}
		} else if (pathname.startsWith("/u/")) {
			const username: HTMLHeadingElement =
				document.querySelector("h1.full-name");
			if (username)
				presenceData.details = `Looking at user ${username.textContent}`;
		} else {
			presenceData.details = `Looking at ${document.title.substring(
				0,
				document.title.indexOf("-")
			)}`;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
