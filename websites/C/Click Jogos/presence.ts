const presence = new Presence({
		clientId: "692436770775760927",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		search: "general.searching",
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
presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/UraU4Hh.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.pathname === "/")
		presenceData.details = "Página Inicial";
	else if (document.location.pathname.includes("/categorias"))
		presenceData.details = "Categorias";
	else if (document.location.pathname.includes("/busca/")) {
		presenceData.details = "Pesquisando por:";
		presenceData.state = document.querySelector("input").value;
		presenceData.smallImageKey = Assets.Search;
		presenceData.smallImageText = (await strings).search;
	} else if (document.location.pathname.includes("/jogos/")) {
		if (
			document.querySelector(
				"#game_src > div.fullscreen-header > div:nth-child(1) > div > div > div:nth-child(2) > a > h1"
			)
		) {
			presenceData.details = "Jogando:";
			presenceData.state = document.querySelector(
				"#game_src > div.fullscreen-header > div:nth-child(1) > div > div > div:nth-child(2) > a > h1"
			).textContent;
		} else {
			presenceData.details = "Jogando:";
			presenceData.state =
				document.querySelectorAll(".game-header-title")[0].textContent;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
