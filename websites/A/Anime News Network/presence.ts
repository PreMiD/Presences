const presence = new Presence({
	clientId: "631523770988888074",
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

function capitalize(string: string): string {
	return string.charAt(0).toUpperCase() + string.substring(1);
}

const browsingTimestamp = Math.floor(Date.now() / 1000);
let data;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/xA03grT.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.pathname === "/") {
		presenceData.details = "Browsing Anime News";
		presenceData.state = "at Homepage";
	} else if (
		document.location.pathname.startsWith("/news/") ||
		document.location.pathname.startsWith("/interest/") ||
		document.location.pathname.startsWith("/convention/") ||
		document.location.pathname.startsWith("/press-release/") ||
		document.location.pathname.startsWith("/feature/") ||
		document.location.pathname.startsWith("/interview/")
	) {
		data = document.location.pathname.split("/");
		presenceData.details = `Browsing ${data[1]}`;
		presenceData.state = `Title: ${capitalize(data[3].split("-").join(" "))} (${
			data[2]
		})`;
	} else if (
		document.location.pathname.startsWith("/this-week-in-anime/") ||
		document.location.pathname.startsWith("/the-list/") ||
		document.location.pathname.startsWith("/anncast/") ||
		document.location.pathname.startsWith("/the-x-button/") ||
		document.location.pathname.startsWith("/preview-guide/") ||
		document.location.pathname.startsWith("/episode-review/")
	) {
		presenceData.details = "Browsing Animes";
		presenceData.state = `in ${capitalize(
			document.location.pathname.split("/")[1].split("-").join(" ")
		)}`;
	} else if (document.location.pathname.startsWith("/review/")) {
		data = document.location.pathname.split("/");
		presenceData.details = "Browsing Reviews";
		presenceData.state = `for ${capitalize(
			data[2].split("-").join(" ")
		)} (${data[3].split("-").join(" ")})`;
	} else if (document.location.pathname.startsWith("/encyclopedia/")) {
		presenceData.details = "Browsing Encyclopedia";
		presenceData.state = `for ${
			document.querySelector("#page_header").textContent
		}`;
	} else if (document.location.pathname.startsWith("/MyAnime/")) {
		presenceData.details = "Browsing Animes";
		presenceData.state = `for ${
			document.querySelector("#page_header").textContent
		}`;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
