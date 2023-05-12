const presence = new Presence({
	clientId: "768028596035649536",
});

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

let roomName: string,
	inCall: boolean,
	userCount: number,
	userState: string,
	joinedRoomName: string,
	joinedRoomTimestamp: number;

async function getData() {
	if (document.location.pathname.search("client/guest-wait.html") >= 0) {
		roomName = "Guest Lobby";
		userCount = 0;
		inCall = false;
		userState = "Waiting in the Guest Lobby...";
		return;
	}

	if (document.querySelectorAll("h1")[0]) {
		roomName = document.querySelectorAll("h1")[0].textContent;

		userCount = null;

		for (const el of document.querySelectorAll("div")) {
			if (el.className.startsWith("userListColumn")) {
				userCount = parseInt(
					el.querySelector("h2").textContent.split("(")[1].split(")")[0]
				);
			}
		}

		inCall = userCount !== null;

		if (roomName && joinedRoomName !== roomName) {
			joinedRoomName = roomName;
			joinedRoomTimestamp = Date.now();
		}
	} else {
		roomName = null;
		userCount = 0;
		inCall = false;
	}

	if (inCall) {
		if (await presence.getSetting<boolean>("readNotificationBar")) {
			for (const el of document.querySelectorAll("div")) {
				if (el.className.startsWith("notificationsBar")) {
					userState = el.textContent;
					inCall = false;
					continue;
				}
			}
		}

		for (const el of document.querySelectorAll("section")) {
			if (el.className.startsWith("actionsbar")) {
				userState = el.querySelector("i.icon-bbb-desktop")
					? "screen"
					: el.querySelector("i.icon-bbb-video")
					? "video"
					: el.querySelector("i.icon-bbb-desktop_off")
					? "presentation"
					: el.querySelector("i.icon-bbb-unmute")
					? "microphone"
					: el.querySelector("i.icon-bbb-mute")
					? "muted"
					: el.querySelector("i.icon-bbb-audio_on")
					? "headphones"
					: el.querySelector("i.icon-bbb-listen")
					? "headphones"
					: "disconnected";
			}
		}
	} else {
		for (const el of document.querySelectorAll("div")) {
			if (el.className.startsWith("spinner")) {
				userState = "Joining session...";
				continue;
			}
		}
		if (document.querySelector("#room_access_code"))
			userState = "Entering the room passcode";
		else if (document.querySelector(".form-control.join-form"))
			userState = "Entering the name";
		else if (document.querySelector(".col-3 .loader"))
			userState = "Waiting for the session to start...";
	}
}

setInterval(getData, 1000);

presence.on("UpdateData", async () => {
	const presenceData = {
		largeImageKey: "https://i.imgur.com/qjmxCvj.png",
		smallImageKey: inCall ? userState : "logo",
		smallImageText: inCall
			? userState === "screen"
				? "Sharing screen..."
				: userState === "presentation"
				? "Presenting..."
				: userState === "video"
				? "Video call"
				: userState === "microphone"
				? "Speaking..."
				: userState === "muted"
				? "Muted"
				: userState === "headphones"
				? "Listening..."
				: "Disconnected"
			: userState,
		details: roomName ?? userState,
		state: inCall ? `${userCount} users` : roomName ? userState : null,
		startTimestamp: joinedRoomTimestamp ?? Date.now(),
	};

	if (!presenceData.details) delete presenceData.details;
	if (!presenceData.state) delete presenceData.state;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
