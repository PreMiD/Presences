const presence = new Presence({
		clientId: "670047125656043536",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

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
		largeImageKey: "https://i.imgur.com/P47inut.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.pathname === "/") {
		if (document.location.href.match("/?s=")) {
			presenceData.details = "In ricerca";
			presenceData.state = `Ha cercato:${document
				.querySelector("head > title")
				.textContent.replace(
					": Risultati della ricerca | Salvatore Aranzulla",
					""
				)}`;
		} else presenceData.details = "Nella Homepage";
	} else if (
		document.location.pathname.startsWith(
			"/informazioni-generali-su-salvatore-aranzulla"
		)
	) {
		presenceData.details = "Guarda le Info su";
		presenceData.state = "Salvatore Aranzulla";
	} else if (
		document.location.pathname.startsWith("/libri-di-salvatore-aranzulla")
	) {
		presenceData.details = "Guarda i libri scritti da";
		presenceData.state = "Salvatore Aranzulla";
	} else if (document.location.pathname.startsWith("/contatti")) {
		presenceData.details = "Vuole contattare";
		presenceData.state = "Salvatore Aranzulla";
	} else if (document.location.pathname.startsWith("/pubblicita")) {
		presenceData.details = "Vuole contattare";
		presenceData.state = "Salvatore Aranzulla";
	} else if (document.location.pathname.startsWith("/lavoro-aranzulla")) {
		presenceData.details = "Cerca lavoro presso";
		presenceData.state = "Aranzulla.it";
	} else if (document.location.pathname.startsWith("/computer")) {
		presenceData.details = "Nelle guide sul Computer:";
		presenceData.state = document
			.querySelector("head > title")
			.textContent.replace(" | Salvatore Aranzulla", "");
	} else if (document.location.pathname.startsWith("/telefonia")) {
		presenceData.details = "Nelle guide sulla Telefonia:";
		presenceData.state = document
			.querySelector("head > title")
			.textContent.replace(" | Salvatore Aranzulla", "");
	} else if (document.location.pathname.startsWith("/internet")) {
		presenceData.details = "Nelle guide sull' Internet:";
		presenceData.state = document
			.querySelector("head > title")
			.textContent.replace(" | Salvatore Aranzulla", "");
	} else if (document.location.pathname.startsWith("/page")) {
		presenceData.details = "In ricerca";
		presenceData.state = `Ha cercato:${
			document
				.querySelector("head > title")
				.textContent.replace(" Risultati della ricerca (", "")
				.split("pagina")[0]
		}`;
	} else {
		presenceData.details = "Guarda la guida:";
		presenceData.state = document
			.querySelector("head > title")
			.textContent.replace(" | Salvatore Aranzulla", "");
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
