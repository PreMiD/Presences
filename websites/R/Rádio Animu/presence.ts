const presence = new Presence({
		clientId: "828278673680498699",
	}),
	strings = presence.getStrings({
		play: "general.playing",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
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
		presenceData.smallImageKey = "play";
		presenceData.smallImageText = (await strings).play;
		presenceData.largeImageKey = artwork;
	} else if (document.location.pathname.includes("/grade/")) {
		presenceData.details = "Grade de Programação";
		presenceData.smallImageKey = "reading";
	} else if (document.location.pathname.includes("/pedidos/")) {
		presenceData.details = "Pedidos";
		presenceData.smallImageKey = "reading";
	} else if (document.location.pathname.includes("/equipe/")) {
		presenceData.details = "Equipe";
		presenceData.smallImageKey = "reading";
	} else if (document.location.pathname.includes("/sobre/")) {
		presenceData.details = "Sobre";
		presenceData.smallImageKey = "reading";
	} else if (document.location.pathname.includes("/fazerparte/")) {
		presenceData.details = "Faça Parte da Equipe";
		presenceData.smallImageKey = "reading";
	} else if (document.location.pathname.includes("/parceria/")) {
		presenceData.details = "Parceria";
		presenceData.smallImageKey = "reading";
	} else if (document.location.pathname.includes("/suafansingaqui/")) {
		presenceData.details = "Sua Fansing Aqui";
		presenceData.smallImageKey = "reading";
	} else if (document.location.pathname === "/historia/") {
		presenceData.details = "História";
		presenceData.smallImageKey = "reading";
	} else if (document.location.pathname === "/") {
		presenceData.details = "Página inicial";
		presenceData.smallImageKey = "reading";
	}

	if (!presenceData.details) presence.setActivity();
	else presence.setActivity(presenceData);
});
