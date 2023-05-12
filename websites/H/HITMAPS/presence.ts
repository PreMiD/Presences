const presence = new Presence({
	clientId: "842704573877714974",
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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/CgaXYn2.png",
	};

	if (document.location.hostname === "roulette.hitmaps.com") {
		presenceData.details = "Playing HITMAPS™ Roulette";
		if (document.querySelector("h1")?.textContent.includes("SELECT MISSION"))
			presenceData.state = "Choosing a mission";
		if (document.querySelector("h1")?.textContent.includes("CURRENT MISSION")) {
			presenceData.state = `Mission:${
				document.querySelector("h1").textContent.split("CURRENT MISSION:")[1]
			}`;
		}
	} else {
		switch (document.location.pathname) {
			case "/": {
				presenceData.details = "Viewing home page";
				break;
			}
			case "/support-the-site": {
				presenceData.details = "Viewing donation page";
				break;
			}
			case "/brand": {
				presenceData.details = "Viewing branding page";
				break;
			}
			case "/privacy-policy": {
				presenceData.details = "Reading the privacy policy";
				break;
			}
			case "/terms-of-use":
				{
					presenceData.details = "Reading the terms of use";
					// No default
				}
				break;
		}
	}

	if (document.location.pathname.split("/games/")[1]) {
		switch (document.location.pathname.split("/games/")[1].split("/")[0]) {
			case "hitman":
				presenceData.details = "Viewing HITMAN™";
				break;
			case "hitman2":
				presenceData.details = "Viewing HITMAN™ 2";
				break;
			case "hitman3":
				presenceData.details = "Viewing HITMAN 3";
				break;
			case "sniper-assassin":
				presenceData.details = "Viewing HITMAN™ 2: Sniper Assassin";
				break;
			case "absolution":
				presenceData.details = "Viewing Hitman: Absolution";
				break;
			default:
				presenceData.details = "Viewing a game";
				break;
		}
	}

	if (
		document.location.pathname.split("/games/")[1] &&
		document.location.pathname.split("/")[3]
	) {
		presenceData.state = capitaliseEachWord(
			document.location.pathname
				.split("/")[3]
				.replace(/[0-9]/g, "")
				.replaceAll("-", " ")
		);

		if (document.title.includes(" | HITMAPS™"))
			presenceData.state += ` - ${document.title.split(" | HITMAPS™")[0]}`;
		else if (document.location.pathname.split("/")[4]) {
			presenceData.state += ` - ${capitaliseEachWord(
				document.location.pathname.split("/")[4].replaceAll("-", " ")
			)}`;
		}
		if (
			document.querySelector('meta[property="og:image"]') &&
			document
				.querySelector('meta[property="og:image"]')
				.getAttribute("content")
				.includes("elusive")
		)
			presenceData.state += " (Elusive Target)";
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});

function capitaliseEachWord(string: string) {
	const words = string.split(" ");
	for (let i = 0; i < words.length; i++)
		words[i] = words[i][0].toUpperCase() + words[i].substr(1);

	return words.join(" ");
}
