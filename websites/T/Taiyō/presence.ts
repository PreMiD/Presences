const presence = new Presence({
		clientId: "1187606265829019689",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/HwdiE6p.png",
			startTimestamp: browsingTimestamp,
		},
		{ href, pathname } = document.location;

	if (pathname === "/") presenceData.details = "Na página inicial...";
	else if (pathname.endsWith("/sign-in"))
		presenceData.details = "Fazendo Login";
	else if (pathname.startsWith("/dashboard")) {
		if (pathname.includes("/medias/import"))
			presenceData.details = "Importando Mangá";
		else if (pathname.includes("/medias/edit")) {
			presenceData.smallImageText = "Editando";
			presenceData.smallImageKey = "https://i.imgur.com/Q9XY9Vy.png";
			presenceData.details = "Editando Mangá";
		} else if (pathname.includes("/chapters/upload")) {
			const chapterNumber = document.querySelector<HTMLInputElement>(
					'.chapter-number input[type="number"]'
				)?.value,
				chapterVolume = document.querySelector<HTMLInputElement>(
					'.chapter-volume input[type="number"]'
				)?.value,
				chapterTitle = document.querySelectorAll<HTMLInputElement>(
					'input[data-slot="input"]'
				)[1]?.value;
			if (chapterTitle) {
				presenceData.details = `Upando: ${chapterTitle}`;
				if (chapterNumber && chapterVolume)
					presenceData.state = `Cap. ${chapterNumber} - Vol. ${chapterVolume}`;
			} else presenceData.details = "Upando mangá...";
		} else if (pathname.includes("/scans/add")) {
			presenceData.smallImageText = "Adicionando";
			presenceData.smallImageKey = "https://i.imgur.com/R4iQ6QB.png";
			presenceData.details = "Adicionando Scan";
		} else presenceData.details = "Dashboard Taiyō";
	} else if (pathname.startsWith("/chapter/")) {
		presenceData.details = `Lendo: ${
			document.querySelector(".media-title")?.textContent
		}`;
		presenceData.state = "Cap. 200 - Pag. 16";
		presenceData.buttons = [
			{
				label: "Ler mangá",
				url: document.querySelector<HTMLAnchorElement>(".media-title").href,
			},
		];
	} else if (pathname.startsWith("/media/")) {
		presenceData.largeImageKey =
			document.querySelector<HTMLImageElement>(".cover-url").src;
		presenceData.details = `Visualizando: ${
			document.querySelector(".media-title")?.textContent
		}`;
		presenceData.buttons = [
			{
				label: "Ler mangá",
				url: href,
			},
		];
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
