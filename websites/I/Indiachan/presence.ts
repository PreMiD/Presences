const presence: Presence = new Presence({
	clientId: "876813345699811328",
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/I/Indiachan/assets/logo.png",
		},
		p = document.location.pathname;
	if (p === "/") {
		presenceData.details = "Home";
		presenceData.smallImageText = "Idling";
		presence.setActivity(presenceData);
		return;
	}
	if (p.startsWith("/a")) presenceData.details = "ありがとうございます";
	else if (p.startsWith("/g")) presenceData.details = "Install Gentoo";
	else if (p.startsWith("/b")) presenceData.details = "बोलो जुबाँ केसरी";
	else if (p.startsWith("/pol")) presenceData.details = "Politically Incorrect";
	else if (p.startsWith("/ent")) presenceData.details = "Entertainment";
	else if (p.startsWith("/man")) presenceData.details = "manuṣyatā";
	else if (p.startsWith("/meta")) presenceData.details = "Discussions";
	else if (p.startsWith("/yoga")) presenceData.details = "Fitness";
	else if (p.startsWith("/dhan")) presenceData.details = "Dhandho";

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
		presenceData.smallImageKey =
			"https://cdn.rcd.gg/PreMiD/websites/I/Indiachan/assets/logo.png";
	} else if (p.includes("media"))
		presenceData.smallImageText = "Looking at some media";

	presence.setActivity(presenceData);
});
