const presence = new Presence({
	clientId: "764198138495893554",
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
		largeImageKey: "https://i.imgur.com/1fqpSA1.png",
	};

	if (document.location.pathname === "/")
		presenceData.details = "Viewing home page";
	else if (document.location.pathname.startsWith("/t/")) {
		presenceData.details = "Browsing tag";
		if (document.querySelectorAll("h1").length > 0)
			presenceData.state = document.querySelectorAll("h1")[0].textContent;
	} else if (document.location.pathname === "/t")
		presenceData.details = "Browsing topics";
	else if (document.location.pathname.includes("following"))
		presenceData.details = "Browsing following";
	else if (document.location.pathname.startsWith("/@")) {
		presenceData.details = "Viewing profile";
		if (document.querySelectorAll("._3FvGs").length === 1)
			presenceData.state = document.querySelectorAll("._3FvGs")[0].textContent;
		else presenceData.state = document.location.pathname.replace("/", "");
	} else if (document.location.pathname.includes("/account"))
		presenceData.details = "Editing their profile";
	else if (document.location.pathname.includes("/awards"))
		presenceData.details = "Viewing Unsplash Awards";
	else if (document.location.pathname.startsWith("/s/")) {
		if (document.location.pathname.startsWith("/s/photos"))
			presenceData.details = "Searching for photos";
		else if (document.location.pathname.startsWith("/s/collections"))
			presenceData.details = "Searching for collections";
		else if (document.location.pathname.startsWith("/s/users"))
			presenceData.details = "Searching for users";
		else presenceData.details = "Searching";

		if (document.querySelectorAll("h1").length > 0) {
			presenceData.state = `"${
				document.querySelectorAll("h1")[0].textContent
			}"`;
		}
	} else if (document.location.pathname.startsWith("/photos")) {
		presenceData.details = "Viewing photo";
		if (
			document.querySelectorAll(
				"._3XzpS._1ByhS._4kjHg._1O9Y0._3l__V._1CBrG.xLon9"
			).length > 0
		) {
			presenceData.state = `by ${
				document.querySelectorAll(
					"._3XzpS._1ByhS._4kjHg._1O9Y0._3l__V._1CBrG.xLon9"
				)[0].textContent
			}`;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
