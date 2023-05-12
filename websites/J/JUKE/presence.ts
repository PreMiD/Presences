const presence = new Presence({
	clientId: "811305223783448627",
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
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/axm6M00.png",
		buttons: [{ label: "Radio luisteren", url: document.location.href }],
	};

	if (document.querySelector("span[class*=eC-title]")) {
		presenceData.details = document
			.querySelector("span[class*=eC-title]")
			.textContent.replace("De ", "de ")
			.replace("Het ", "het ")
			.replace("&amp;", "&");
		if (document.querySelector("span[class*=eC-subtitle]")) {
			presenceData.state = document
				.querySelector("span[class*=eC-subtitle]")
				.textContent.replace("De ", "de ")
				.replace("Het ", "het ")
				.replace("&amp;", "&");
		}
	}

	if (!presenceData.details) {
		presenceData.details = "Bladert op JUKE.nl";
		presenceData.state = `Pagina '${document.title
			.replace(" |", "|")
			.split("|")[0]
			.replace(
				"JUKE - Luister nu jouw favoriete radiozenders, non-stop muziek en podcasts!",
				"Home"
			)}'`;
	}

	if (document.querySelector("rect")) {
		presenceData.smallImageKey = Assets.Play;
		presenceData.smallImageText = "Wordt afgespeeld";
		presenceData.buttons = [
			{ label: "Ook radio luisteren", url: document.location.href },
		];
	} else if (document.querySelector("[class*=spinner]")) {
		presenceData.smallImageKey = "waiting";
		presenceData.smallImageText = "Wordt geladen";
	} else if (document.querySelector("polygon")) {
		presenceData.smallImageKey = Assets.Pause;
		presenceData.smallImageText = "Gepauzeerd";
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
