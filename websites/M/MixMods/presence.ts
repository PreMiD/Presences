const presence = new Presence({
	clientId: "706574162331697163",
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
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/7YvTrtD.png",
	};

	if (document.location.pathname === "/") {
		presenceData.details = "Na página inicial...";

		presenceData.smallImageKey = "logo";
		presenceData.smallImageText = "www.mixmods.com.br";
	} else if (document.location.pathname.match("/search/label")) {
		presenceData.details = "Visualizando categoria:";
		presenceData.state = decodeURI(
			document.location.href
				.split("/label/")[1]
				.split("?&max")[0]
				.split("?&max")[0]
		);
	} else if (document.location.pathname.startsWith("/p")) {
		switch (document.location.pathname) {
			case "/p/about.html":
				presenceData.details = "Visualizando:";
				presenceData.state = "Sobre Nós";

				break;
			case "/p/lista-de-crash-e-solucoes.html":
				presenceData.details = "Visualizando:";
				presenceData.state = "Lista de Crash";

				break;
			case "/p/recomendados.html":
				presenceData.details = "Visualizando:";
				presenceData.state = "Recomendados";

				break;
			case "/p/disclaimer.html":
				presenceData.details = "Visualizando:";
				presenceData.state = "Disclaimer";

				break;
		}
	} else if (document.querySelectorAll(".label-info.breadcrumbs")[0]) {
		presenceData.details = "Visualizando um post:";
		presenceData.state = document.querySelectorAll(
			".post-title.entry-title"
		)[0].textContent;

		presenceData.smallImageKey = "user";
		presenceData.smallImageText = `Postado por Junior_Djjr em ${
			document.querySelector("[itemprop=datePublished]").textContent
		}`;
	} else {
		presenceData.details = "Navegando no site";

		presenceData.state = `Página ${
			document.location.href.split("#")[1].split("=")[1]
		}`;
	}

	presence.setActivity(presenceData);
});
