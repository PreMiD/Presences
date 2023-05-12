const presence = new Presence({
		clientId: "957670687278002206",
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

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/bIrOvOu.jpg",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = document.location;

	if (pathname === "/") {
		const simpleObjectionText = document.querySelector("textarea").value;
		if (simpleObjectionText !== "") {
			presenceData.details = "Creating a Simple Objection";
			presenceData.smallImageKey =
				document.querySelector<HTMLImageElement>(".selected").src;
			if (simpleObjectionText.length > 127) {
				presenceData.smallImageText = `${simpleObjectionText.substring(
					0,
					124
				)}...`;
			} else presenceData.smallImageText = simpleObjectionText;
		} else presenceData.details = "Viewing the homepage";
	} else if (pathname === "/maker")
		presenceData.details = "Creating an Objection";
	else if (pathname.startsWith("/objection/")) {
		presenceData.details = "Viewing an Objection";
		presenceData.buttons = [
			{
				label: "View Objection",
				url: href,
			},
		];
	} else if (pathname.startsWith("/case/")) {
		presenceData.details = "Viewing a Case";
		if (document.title !== "Play Case") {
			// Case has a title
			presenceData.state = document.title;
		}
		presenceData.buttons = [
			{
				label: "View Case",
				url: href,
			},
		];
	} else if (pathname.startsWith("/courtroom/")) {
		const [participants, spectators] = Array.from(
			document.querySelectorAll("header > div > div > button")
		).map(button => button.textContent);
		if (document.querySelectorAll(".v-btn__content")[2].textContent === "")
			presenceData.details = "Participating in a Courtroom";
		else presenceData.details = "Spectating a Courtroom";
		presenceData.state = `${
			document.querySelector(".v-toolbar__title").textContent || "Joining..."
		} | Participants: ${participants} | Spectators: ${spectators ?? 0}`;
		presenceData.buttons = [
			{
				label: "Join Courtroom",
				url: href,
			},
		];
	}

	presence.setActivity(presenceData);
});
