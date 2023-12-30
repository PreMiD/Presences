const presence = new Presence({
		clientId: "1190448612778463242",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/x6NuCdk.png",
			startTimestamp: browsingTimestamp,
		},
		{ href, pathname } = document.location;

	switch (pathname.split("/")[1]) {
		case "login":
			presenceData.details = "Fazendo login";
			break;

		case "registrar":
			presenceData.details = "Fazendo registro";
			break;

		case "esqueci-senha":
			presenceData.details = "Recuperando senha";
			break;

		case "nacional":
			presenceData.details = "Na página inicial";
			presenceData.state = "Visualizando nacionais";
			break;

		case "nsfw":
			presenceData.details = "Na página inicial";
			presenceData.state = "Visualizando NSFW";
			break;

		case "biblioteca":
			presenceData.details = "Visualizando biblioteca";
			break;

		case "recentes":
			presenceData.details = "Visualizando recentes";
			break;

		case "pesquisa-obras":
			if (pathname.includes("/pesquisar")) {
				const searchValue =
					document.querySelector<HTMLInputElement>('input[type="text"]').value;
				presenceData.details = "Pesquisando mangás";
				if (searchValue) presenceData.state = `Mangá: ${searchValue}`;
			}
			break;

		case "manga": {
			presenceData.largeImageKey = document.querySelectorAll<HTMLImageElement>(
				'img[title="Imagem"]'
			)[2].src;
			presenceData.details = document.querySelector(
				"p.text-dark.dark\\:text-light.transition.duration-300.text-2xl.font-bold.font-serif"
			)?.textContent;
			presenceData.buttons = [{ label: "Ler mangá", url: href }];
			break;
		}

		case "ler": {
			const chapterInfo = document.querySelector(
					"h1.font-serif.font-bold.text-xl.text-center.sm\\:text-left.text-dark.dark\\:text-light.transition.duration-300"
				)?.textContent,
				mediaLink = document.querySelector<HTMLAnchorElement>(
					"a.hover\\:text-primary-700.dark\\:hover\\:text-primary-500.hover\\:underline.transition.duration-300.link.cursor-pointer"
				).href,
				mediaCover = document.querySelector<HTMLMetaElement>(
					'meta[property="image"]'
				)?.content;
			if (mediaCover) presenceData.largeImageKey = mediaCover;
			presenceData.details = chapterInfo?.split("/")[0].trim();
			presenceData.state = chapterInfo?.split("/")[1].trim();
			presenceData.buttons = [
				{ label: "Ler capítulo", url: href.replace(/\/[^/]*$/, "") },
				{ label: "Ler mangá", url: mediaLink },
			];
			break;
		}

		default:
			presenceData.details = "Na página inicial";
			break;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
