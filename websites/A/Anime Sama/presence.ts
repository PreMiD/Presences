const presence = new Presence({ clientId: "1016797607370162256" }),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	staticPages: { [name: string]: string } = {
		"": "Visionne la page d'accueil",
		planning: "Regarde le planning des sorties",
		aide: "Lit la page d'aide",
		profil: "visionne son profil",
		catalogue: "Parcourir le catalogue",
	};

enum Assets {
	Logo = "https://i.imgur.com/BRpmbpT.png",
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

interface IFrameData {
	duration: number;
	currentTime: number;
	paused: boolean;
}

let duration: number,
	currentTime: number,
	paused = true;

presence.on("iFrameData", (data: IFrameData) => {
	({ duration, currentTime, paused } = data);
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = document.location,
		pathArr = pathname.split("/"),
		showButtons = await presence.getSetting<boolean>("buttons");

	if (Object.keys(staticPages).includes(pathArr[1]) && pathArr.length <= 3)
		presenceData.details = staticPages[pathArr[1]];
	else if (pathArr.length === 4) {
		presenceData.details =
			document.querySelector("h2.border-slate-500")?.textContent === "Anime"
				? "Regarde la page de l'anime"
				: "Regarde la page du manga";
		presenceData.state = document
			.querySelector("#titreOeuvre")
			.textContent.trim();
		presenceData.buttons = [{ label: "Voir la Page", url: href }];
	} else if (document.querySelector<HTMLSelectElement>("#selectEpisodes")) {
		const season = document.querySelector("#avOeuvre").textContent,
			selectEps = document.querySelector<HTMLSelectElement>("#selectEpisodes"),
			selectLecteur =
				document.querySelector<HTMLSelectElement>("#selectLecteurs");
		presenceData.details = `Regarde ${
			document.querySelector("#titreOeuvre").textContent
		}`;
		presenceData.state = `${season ? `${season} - ` : ""}${
			selectEps.options[selectEps.selectedIndex].value
		}`;

		presenceData.buttons = [{ label: "Voir l'Anime", url: href }];
		presenceData.smallImageKey = Assets.Pause;
		presenceData.smallImageText =
			selectLecteur.options[selectLecteur.selectedIndex].value;

		if (!paused) {
			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(currentTime, duration);
			presenceData.smallImageKey = Assets.Play;
		}
	} else {
		const selectChapitres =
			document.querySelector<HTMLSelectElement>("#selectChapitres");
		presenceData.details = `Lit ${
			document.querySelector("#titreOeuvre").textContent
		}`;
		presenceData.state =
			selectChapitres.options[selectChapitres.selectedIndex].value.trim();
		const selectLecteur =
			document.querySelector<HTMLSelectElement>("#selectLecteurs");
		presenceData.smallImageKey = Assets.Reading;
		presenceData.smallImageText =
			selectLecteur.options[selectLecteur.selectedIndex].value;
		presenceData.buttons = [{ label: "Voir le Scan", url: href }];
	}

	if (!showButtons) delete presenceData.buttons;
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
