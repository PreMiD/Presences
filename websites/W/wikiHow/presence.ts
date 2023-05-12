const presence = new Presence({
	clientId: "630570838084812801",
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

presence.on("UpdateData", async () => {
	const path = document.location.pathname,
		topic = document.querySelector("#section_0"),
		category = document.querySelector("#article > div.wh_block > h1");

	if (topic && topic.textContent !== "") {
		const author =
				document.querySelector("#sp_expert_name") ||
				document.querySelector("#sp_expert_team"),
			date = document.querySelector("#expert_coauthor > p");

		return presence.setActivity({
			details: topic.textContent,
			state: `by ${
				author && author.textContent !== "" ? author.textContent : "unknown"
			}${
				date && date.textContent !== ""
					? ` (${date.textContent.replace("Updated: ", "")})`
					: ""
			} `,
			largeImageKey: "https://i.imgur.com/yY2L00N.png",
			smallImageKey: "logo",
			smallImageText: decodeURIComponent(document.location.href),
			startTimestamp: Math.floor(Date.now() / 1000),
		});
	}

	if (category && category.textContent !== "") {
		return presence.setActivity({
			details: "Viewing a category:",
			state: category.textContent,
			largeImageKey: "https://i.imgur.com/yY2L00N.png",
			smallImageKey: "logo",
			smallImageText: decodeURIComponent(document.location.href),
			startTimestamp: Math.floor(Date.now() / 1000),
		});
	}

	if (path === "/index.php") {
		// Note that I (EGGSY) didn't work on this part, I don't know if it's working on the main site but I'm sure it doesn't work on Spanish version.
		const newTopic = document.querySelectorAll(".firstHeading")[0]
			? document.querySelectorAll(".firstHeading")[0].textContent
			: null;

		return presence.setActivity({
			details: "Editing/Writing How to",
			state: `Topic: ${newTopic ?? "Unknown."} `,
			largeImageKey: "https://i.imgur.com/yY2L00N.png",
			smallImageKey: "logo",
			smallImageText: decodeURIComponent(document.location.href),
			startTimestamp: Math.floor(Date.now() / 1000),
		});
	}

	if (path === "/wikiHowTo") {
		const searching = document.location.search
			.replace("?search=", "")
			.split("+")
			.join(" ");

		return presence.setActivity({
			details: "Searching for:",
			state: `${searching[0].toUpperCase() + searching.slice(1).toLowerCase()}`,
			largeImageKey: "https://i.imgur.com/yY2L00N.png",
			smallImageKey: "logo",
			smallImageText: "Searching...",
			startTimestamp: Math.floor(Date.now() / 1000),
		});
	}

	return presence.setActivity({
		details: "Viewing a page:",
		state: "Homepage",
		largeImageKey: "https://i.imgur.com/yY2L00N.png",
		smallImageKey: "logo",
		startTimestamp: Math.floor(Date.now() / 1000),
	});
});
