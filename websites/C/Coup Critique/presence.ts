const presence = new Presence({
		clientId: "1070406808113532989",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	staticPages: Record<string, PresenceData> = {
		"": { details: "Parcours la page d'accueil" },
	},
	slideshow = new Slideshow();

enum Assets {
	Logo = "https://i.imgur.com/iWiBLBu.png",
	Reading = "https://i.imgur.com/53N4eY6.png",
}

presence.on("UpdateData", async () => {
	let presenceData: PresenceData = {
		startTimestamp: browsingTimestamp,
		largeImageKey: Assets.Logo,
	};
	const { pathname, href } = document.location,
		pathArr = pathname.replace("entity/", "").split("/"),
		presenceDataSlide: PresenceData = {
			startTimestamp: browsingTimestamp,
			largeImageKey: Assets.Logo,
		},
		[showImg, showButtons] = await Promise.all([
			presence.getSetting<boolean>("image"),
			presence.getSetting<boolean>("buttons"),
		]);

	switch (pathArr[1]) {
		case "teams":
			presenceData.details = "Parcours les équipes";
			if (pathArr[2] === "create") {
				presenceData.details = presenceDataSlide.details = "Crée une équipe";
				presenceData.state = `Tier : ${
					document.querySelector<HTMLInputElement>("input[name='tier']").value
				}`;
				const name =
					document.querySelector<HTMLInputElement>("input[name='name']").value;
				presenceDataSlide.state = `Nom : ${name === "" ? "aucun nom" : name}`;
				slideshow.addSlide("nameSlide", presenceDataSlide, 5000);
				slideshow.addSlide("tierSlide", presenceData, 5000);
			} else if (pathArr.length > 2) {
				presenceData.details = "Regarde l'équipe";
				presenceData.state = document.querySelector("h1").textContent;
				presenceData.buttons = [{ label: "Voir l'Equipe", url: href }];
			}
			break;
		case "pokemons":
			presenceData.details = "Parcours la liste des pokemons";
			if (pathArr.length > 2) {
				presenceData.details = "Lit la fiche pokemon";
				presenceData.state = document
					.querySelector("h1")
					.textContent.split("de ")[1];
				presenceData.largeImageKey =
					document.querySelector<HTMLImageElement>(".art-pokemon").src;
				presenceData.smallImageKey = Assets.Reading;
				presenceData.buttons = [{ label: "Voir la Fiche", url: href }];
			}
			break;
		case "tiers":
			presenceData.details =
				pathArr.length > 2
					? `[${
							document.querySelector("h1").textContent
					  }] Parcours les pokemons`
					: "Regarde la liste des tiers";
			presenceData.state = `Génération ${
				document.querySelector("div.labeled > a").textContent
			}`;
			presenceData.buttons = [{ label: "Voir la Liste", url: href }];
			break;
		case "items":
		case "moves": {
			const caseString = pathArr[1] === "moves" ? "capacités" : "objets";
			presenceData.details = `Parcours la liste des ${caseString}`;
			if (pathArr.length > 2) {
				presenceData.details = `Lit la fiche ${caseString.substring(
					0,
					caseString.length - 1
				)}`;
				presenceData.state = document.querySelector("h1").textContent;
				presenceData.smallImageKey = Assets.Reading;
				presenceData.buttons = [{ label: "Voir la Fiche", url: href }];
			}
			break;
		}
		case "abilities":
		case "types": {
			const caseString = pathArr[1] === "types" ? "types" : "talents";
			presenceData.details = `Regarde la liste des ${caseString}`;
			if (pathArr.length > 2) {
				presenceData.details = `Parcours la liste du ${caseString.substring(
					0,
					caseString.length - 1
				)}`;
				presenceData.state = document.querySelector("h1").textContent;
			}
			break;
		}
		case "guides":
			break;
		default:
			if (Object.keys(staticPages).includes(pathArr[1]))
				presenceData = { ...presenceData, ...staticPages[pathArr[1]] };
	}

	if (!showButtons && presenceData.buttons) delete presenceData.buttons;
	if (!showImg && presenceData.largeImageKey)
		presenceData.largeImageKey = Assets.Logo;

	if (slideshow.getSlides().length > 0) presence.setActivity(slideshow);
	else if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
