const presence = new Presence({ clientId: "1016797607370162256" }),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	staticPages: { [name: string]: string } = {
		search: "Recherche un anime ou un scan",
		"": "Visionne la page d'accueil",
		planning: "Regarde le planning des sorties",
	};

enum Assets {
	Logo = "https://i.imgur.com/Q4kwFRA.jpg",
	Pause = "https://i.imgur.com/BtWUfrZ.png",
	Play = "https://i.imgur.com/KNneWuF.png",
	Reading = "https://i.imgur.com/53N4eY6.png",
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

	switch (pathArr[1]) {
		case "anime":
			if (pathArr.length === 3) presenceData.details = "Parcours les animés";
			else if (pathArr.length === 4) {
				presenceData.details = "Regarde la page de l'animé";
				presenceData.state = document.querySelector("h5").textContent;
				presenceData.buttons = [{ label: "Voir la Page", url: href }];
			} else {
				const [anime, season] = document
						.querySelector(".soustitreaccueil")
						.textContent.split(" - "),
					selectEps = document.querySelector<HTMLSelectElement>("#selectEps"),
					selectLecteur =
						document.querySelector<HTMLSelectElement>("#selectLecteurs");
				presenceData.details = `Regarde ${anime}`;
				presenceData.state = `${
					season ? `${season[0].toUpperCase() + season.slice(1)} - ` : ""
				}${selectEps.options[selectEps.selectedIndex].value}`;

				presenceData.buttons = [{ label: "Voir l'Anime", url: href }];
				presenceData.smallImageKey = Assets.Pause;
				presenceData.smallImageText =
					selectLecteur.options[selectLecteur.selectedIndex].value;

				if (!paused) {
					[presenceData.startTimestamp, presenceData.endTimestamp] =
						presence.getTimestamps(currentTime, duration);
					presenceData.smallImageKey = Assets.Play;
				}
			}
			break;
		case "scan":
			if (pathArr.length === 3) presenceData.details = "Parcours les scans";
			else {
				const selectEps =
						document.querySelector<HTMLSelectElement>("#selectChap"),
					selectLang =
						document.querySelector<HTMLSelectElement>("#selectLanguesScan"),
					chapter = selectEps.options[selectEps.selectedIndex].value.trim(),
					scanTitle = document.querySelector("h5").textContent;
				if (chapter === "Choisissez un chapitre") {
					presenceData.details = "Regarde la page du scan";
					presenceData.state = scanTitle;
				} else {
					presenceData.details = `Lit ${scanTitle}`;
					presenceData.state = `${chapter} - ${
						selectLang.options[selectLang.selectedIndex].value
					}`;

					const selectLecteur = document.querySelector<HTMLSelectElement>(
						"#selectLecteursScan"
					);
					presenceData.smallImageKey = Assets.Reading;
					presenceData.smallImageText =
						selectLecteur.options[selectLecteur.selectedIndex].value;
				}

				presenceData.buttons = [{ label: "Voir le Scan", url: href }];
			}
			break;
		default:
			if (Object.keys(staticPages).includes(pathArr[1]))
				presenceData.details = staticPages[pathArr[1]];
	}

	if (!showButtons) delete presenceData.buttons;
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
