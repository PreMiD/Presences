const presence = new Presence({
	clientId: "685559589625659492",
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

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/myBgo2K.png",
		},
		Path = document.location.pathname;
	presenceData.startTimestamp = Math.floor(Date.now() / 1000);

	if (Path.startsWith("/learn")) {
		presenceData.details = "Learning new cool tricks :";
		presenceData.state = `${
			Path.replace("/learn/", "").length < 1
				? "Main Section"
				: `${Path.replace("/learn/", "").toUpperCase()} Section`
		}`;
	} else if (Path === "/") {
		switch (
			document.querySelector(
				"body > div[class='flexrow app'] > div:nth-child(1) > div.flexrow > div.panelblock.mainblock > div > div.panelhead"
			).children.length
		) {
			case 0:
				presenceData.details = "Viewing the home page ";
				break;
			default: {
				const name = document.querySelector("div.active > span").textContent;
				presenceData.details = `Editing a ${
					name.split(".").length > 1
						? name.split(".")[name.split(".").length - 1]
						: name.split(".")[1]
				} file :`;
				presenceData.state = name;
			}
		}
	} else if (Path.startsWith("/api")) {
		presenceData.details = "Consulting the api docs :";
		presenceData.state = `${
			Path.replace("/api/", "").length < 1
				? "Main Section"
				: `${Path.replace("/api/", "").toUpperCase()} Section`
		}`;
	} else if (Path.startsWith("/tuts")) {
		presenceData.details = "Consulting the tutorials :";
		presenceData.state = `${
			Path.replace("/tuts/", "").length < 1
				? "Main Section"
				: `${document.querySelector("#post-396 > h1").textContent}`
		}`;
	} else presenceData.details = "Browsing the site ";

	presence.setActivity(presenceData);
});
