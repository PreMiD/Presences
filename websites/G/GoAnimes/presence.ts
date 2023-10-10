const presence = new Presence({
		clientId: "1161309082179883089",
	}),
	onBrowsingTimeStamp = Math.floor(Date.now() / 1000);

let currentTime: number,
	duration: number,
	paused: boolean,
	played: boolean,
	timestamps;



const searchTxt: HTMLInputElement = document.querySelector("#s"),
		pagination_Txt: HTMLElement = document.querySelector("#contenedor > div.module > div.content > div.pagination > span:nth-child(1)"),
		animeName_Txt: HTMLElement = document.querySelector("#single > div.content > div.sheader > div.data > h1"),
		airDate: HTMLElement = document.querySelector("#single > div.content > div.sheader > div.data > div.extra > span.date"),
		episodeName_Txt: HTMLElement = document.querySelector("#info > h1");

interface IFrameMetaData {
	currentTime: number
	duration: number,
	paused: boolean,
	played: boolean,
}

presence.on("iFrameData", (data: IFrameMetaData) => {
	({ currentTime, duration, paused, played } = data);
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/xdzfMcM.png",
		startTimestamp: onBrowsingTimeStamp
	};

	if(document.location.pathname === "/") {
		if(document.title.includes("Você pesquisou por ")) {
			presenceData.details = "Pesquisando por: ";
			presenceData.state = searchTxt.value;
		} else presenceData.details = "Explorando a homepage";
	} else
	if(document.location.pathname.includes("series") || document.location.pathname.includes("filme")) {
		if(document.location.pathname.split("/").length - 1 === 2 || document.location.pathname.split("/").length - 1 === 4) {
			presenceData.details = "Explorando o catálogo";
			presenceData.state = pagination_Txt.textContent;
		} else {
			presenceData.details = document.location.pathname.includes("filme") ? "Assistindo um filme" : animeName_Txt.textContent;
			presenceData.state = document.location.pathname.includes("filme") ? animeName_Txt.textContent : airDate.textContent;
		}
	} else
	if(document.location.pathname.includes("episodio")) {
		presenceData.details = episodeName_Txt.textContent;
		if(played) {
			if(!paused) {
				timestamps = presence.getTimestamps(
					Math.floor(currentTime),
					Math.floor(duration)
				),
				[presenceData.startTimestamp, presenceData.endTimestamp] = timestamps,
				presenceData.smallImageKey = "play",
				presenceData.smallImageText = "Asssitindo"
			} else {
				presenceData.smallImageKey = "pause",
				presenceData.smallImageText = "Pausado"
			}
		}
	} else
	if(document.location.pathname.includes("calendario")) {
		presenceData.details = "Vendo o calendario de lançamentos...";
	}

	presence.setActivity(presenceData);
});
