const presence = new Presence({
		clientId: "828278673680498699",
	}),
	strings = presence.getStrings({
		play: "general.playing",
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
let artist: string, title: string, artwork: string, playing: boolean;

presence.on(
	"iFrameData",
	(data: {
		playing: boolean;
		artist: string;
		title: string;
		artwork: string;
	}) => {
		({ playing } = data);
		if (playing) ({ artist, title, artwork } = data);
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/SHAH0WR.png",
		startTimestamp: browsingTimestamp,
	};

	if (playing) {
		presenceData.details = artist;
		presenceData.state = title;
		presenceData.smallImageKey = Assets.Play;
		presenceData.smallImageText = (await strings).play;
		presenceData.largeImageKey = artwork;
	} else if (document.location.pathname.includes("/grade/")) {
		presenceData.details = "Grade de Programação";
		presenceData.smallImageKey = Assets.Reading;
	} else if (document.location.pathname.includes("/pedidos/")) {
		presenceData.details = "Pedidos";
		presenceData.smallImageKey = Assets.Reading;
	} else if (document.location.pathname.includes("/equipe/")) {
		presenceData.details = "Equipe";
		presenceData.smallImageKey = Assets.Reading;
	} else if (document.location.pathname.includes("/sobre/")) {
		presenceData.details = "Sobre";
		presenceData.smallImageKey = Assets.Reading;
	} else if (document.location.pathname.includes("/fazerparte/")) {
		presenceData.details = "Faça Parte da Equipe";
		presenceData.smallImageKey = Assets.Reading;
	} else if (document.location.pathname.includes("/parceria/")) {
		presenceData.details = "Parceria";
		presenceData.smallImageKey = Assets.Reading;
	} else if (document.location.pathname.includes("/suafansingaqui/")) {
		presenceData.details = "Sua Fansing Aqui";
		presenceData.smallImageKey = Assets.Reading;
	} else if (document.location.pathname === "/historia/") {
		presenceData.details = "História";
		presenceData.smallImageKey = Assets.Reading;
	} else if (document.location.pathname === "/") {
		presenceData.details = "Página inicial";
		presenceData.smallImageKey = Assets.Reading;
	}

	if (!presenceData.details) presence.setActivity();
	else presence.setActivity(presenceData);
});
