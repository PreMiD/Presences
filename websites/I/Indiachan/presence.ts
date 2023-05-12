const presence: Presence = new Presence({
	clientId: "876813345699811328",
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
			largeImageKey: "https://i.imgur.com/caelFBx.png",
		},
		p = document.location.pathname;
	if (p === "/") {
		presenceData.details = "Home";
		presenceData.smallImageText = "Idling";
		presenceData.smallImageKey = "dindu";
		presence.setActivity(presenceData);
		return;
	}
	if (p.startsWith("/a")) {
		presenceData.details = "ありがとうございます";
		presenceData.smallImageKey = "a";
	} else if (p.startsWith("/g")) {
		presenceData.details = "Install Gentoo";
		presenceData.smallImageKey = "g";
	} else if (p.startsWith("/b")) {
		presenceData.details = "बोलो जुबाँ केसरी";
		presenceData.smallImageKey = "b";
	} else if (p.startsWith("/pol")) {
		presenceData.details = "Politically Incorrect";
		presenceData.smallImageKey = "pol";
	} else if (p.startsWith("/ent")) {
		presenceData.details = "Entertainment";
		presenceData.smallImageKey = "ent";
	} else if (p.startsWith("/man")) {
		presenceData.details = "manuṣyatā";
		presenceData.smallImageKey = "man";
	} else if (p.startsWith("/meta")) {
		presenceData.details = "Discussions";
		presenceData.smallImageKey = "dindu";
	} else if (p.startsWith("/yoga")) {
		presenceData.details = "Fitness";
		presenceData.smallImageKey = "yoga";
	} else if (p.startsWith("/dhan")) {
		presenceData.details = "Dhandho";
		presenceData.smallImageKey = "dhan";
	}

	const parts = p.split("/");
	presenceData.smallImageText = `Browsing /${parts[1].split(".")[0]}/ - ${
		parts[2] === "" ? "1" : parts[2].split(".")[0]
	}`;

	if (p.endsWith("catalog.html"))
		presenceData.smallImageText = "Browsing catalog";
	else if (
		(<HTMLInputElement>document.querySelector('textarea[name="message"]'))
			.value !== ""
	)
		presenceData.smallImageText = "Writing a post";
	else if (p.includes("res")) {
		presenceData.smallImageText = `Reading thread #${
			p.split("/")[3].split(".")[0]
		}`;
	} else if (p.endsWith("Rules.html") || p.endsWith("rules.html")) {
		presenceData.smallImageText = "Reading rules";
		presenceData.smallImageKey = "logo";
	} else if (p.includes("media"))
		presenceData.smallImageText = "Looking at some media";

	presence.setActivity(presenceData);
});
