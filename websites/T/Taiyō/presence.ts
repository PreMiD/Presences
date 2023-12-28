const presence = new Presence({
		clientId: "1187606265829019689",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/T/Taiy%C5%8D/assets/logo.png",
			startTimestamp: browsingTimestamp,
		},
		{ href, pathname } = document.location;

	if (pathname === "/") presenceData.details = "Na página inicial...";
	else if (pathname.endsWith("/sign-in"))
		presenceData.details = "Fazendo login";
	else if (pathname.startsWith("/dashboard")) {
		if (pathname.includes("/medias/import"))
			presenceData.details = "Importando mangá";
		else if (pathname.includes("/medias/edit"))
			presenceData.details = "Editando mangá";
		else if (
			pathname.includes("/chapters/upload") ||
			pathname.includes("/chapters/bulk-upload")
		) {
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
		} else if (pathname.includes("/scans/add"))
			presenceData.details = "Adicionando scan";
		else presenceData.details = "No dashboard...";
	} else if (pathname.startsWith("/chapter/")) {
		presenceData.details = `${
			document.querySelector(".media-title")?.textContent
		}`;
		presenceData.state = `${
			document.querySelector(".chapter-number")?.textContent
		} - Página ${document.querySelector(".chapter-currentPage")?.textContent}`;
		presenceData.buttons = [
			{
				label: "Ler capítulo",
				url: href,
			},
		];
	} else if (pathname.startsWith("/media/")) {
		presenceData.largeImageKey =
			document.querySelector<HTMLImageElement>(".cover-url").src;
		presenceData.details = `${
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
