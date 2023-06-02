const presence = new Presence({
		clientId: "753818401541193859",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/M/MangaHost/assets/logo.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname } = document.location,
		{ hostname } = document.location;

	if (hostname === "mangahosted.com" || hostname === "www.mangahosted.com") {
		if (pathname.startsWith("/")) {
			presenceData.details = "Vendo:";
			presenceData.state = "Website MangaHost";
		}

		if (pathname.startsWith("/lancamentos")) {
			presenceData.details = "Vendo:";
			presenceData.state = "Lançamentos";
		}
		if (pathname.startsWith("/scans")) {
			if (!pathname.split("/").slice(-1)[0].includes("scans")) {
				presenceData.details = "Vendo Scan:";
				presenceData.state = document.querySelector("h1").textContent;
			} else {
				presenceData.details = "Vendo:";
				presenceData.state = "Lista de Scanlators";
			}
		}

		if (pathname.startsWith("/leituras")) {
			presenceData.details = "Vendo:";
			presenceData.state = "Leituras Pessoais";
		}

		if (pathname.startsWith("/profile")) {
			presenceData.details = "Vendo Perfil:";
			presenceData.state = document.querySelector("h1").textContent;
		}

		if (pathname.startsWith("/find")) {
			presenceData.details = "Pesquisando por:";
			presenceData.state = pathname.split("/").slice(-1)[0];
		}

		if (pathname.startsWith("/wp-admin/profile")) {
			presenceData.details = "Editando:";
			presenceData.state = "Perfil";
		}

		if (pathname.startsWith("/mangas")) {
			const [pathsplitted] = pathname.split("/").slice(-1);
			if (!pathsplitted.startsWith("mangas")) {
				presenceData.details = "Vendo Mangás:";
				presenceData.state = pathsplitted
					.replace("-", " ")
					.replace(/(\w)(\w*)/g, function (_, g1, g2) {
						return g1.toUpperCase() + g2.toLowerCase();
					});
			} else {
				presenceData.details = "Vendo:";
				presenceData.state = "Lista de Mangás";
			}
		}

		if (pathname.startsWith("/mangas/novel")) {
			presenceData.details = "Vendo:";
			presenceData.state = "Lista de Novels";
		}

		if (pathname.startsWith("/manga/") && pathname.includes("-mh")) {
			const [pathsplitted] = pathname.split("/").slice(-1);
			if (!pathsplitted.includes("-mh")) {
				const e = document.querySelector("#capitulos-3") as HTMLSelectElement;

				presenceData.details = document.querySelector("h1 a").textContent;
				presenceData.state = `Capítulo ${pathsplitted.split("#")[0]} - Pg ${
					(<HTMLOptionElement>e.options[e.selectedIndex]).text
				}`;
			} else {
				presenceData.details = "Vendo Informações:";
				presenceData.state = document.querySelector("h1.title").textContent;
			}
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
