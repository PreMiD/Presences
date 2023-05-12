const presence = new Presence({
		clientId: "732586216272429126",
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
		largeImageKey: "https://i.imgur.com/kN9Y2bv.png",
		startTimestamp: browsingTimestamp,
	};

	switch (document.location.hostname) {
		case "erisly.com": {
			if (document.location.pathname.includes("/partners"))
				presenceData.details = "Viewing Erisly's Partners";
			else if (document.location.pathname.includes("/commands")) {
				presenceData.details = `Viewing ${document
					.querySelector(".category-item.active")
					.textContent.replace("- ", "")}`;
			} else if (document.location.pathname.includes("/changelog")) {
				presenceData.details = "Reading the latest changelog";
				presenceData.smallImageKey = Assets.Reading;
			} else if (document.location.pathname.includes("/premium"))
				presenceData.details = "Viewing Premium perks";
			else if (document.location.pathname.includes("/about")) {
				presenceData.details = "Reading about Erisly";
				presenceData.smallImageKey = Assets.Reading;
			} else if (document.location.pathname.includes("/fanart"))
				presenceData.details = "Viewing Erisly's Fan Art Collection";
			else if (document.location.pathname.includes("/team"))
				presenceData.details = "Meeting Erisly's Team";
			else if (document.location.pathname === "/")
				presenceData.details = "Viewing the home page";

			break;
		}
		case "giveaways.erisly.com": {
			presenceData.details = "Entering a Giveaway";
			break;
		}
		case "translate.erisly.com": {
			presenceData.details = "Helping Erisly";
			presenceData.state = "learn a language";

			break;
		}
		case "wiki.erisly.com": {
			let firstHeading =
				document.querySelector("#firstHeading") !== null
					? document.querySelector("#firstHeading").textContent
					: document.querySelector(".page-heading").textContent;
			const firstHeadingSplit = firstHeading.split(" "),
				firstHeadingVerb = firstHeadingSplit.shift();

			if (
				document.location.pathname === "/w/index.php" &&
				firstHeadingVerb.endsWith("ing")
			) {
				firstHeading = firstHeadingSplit.join(" ");
				presenceData.details = `Wiki - ${firstHeadingVerb}:`;
			} else presenceData.details = "Wiki - Viewing page:";

			presenceData.state = firstHeading;

			break;
		}
		// No default
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
