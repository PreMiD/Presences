const presence = new Presence({
	clientId: "806984559308046336",
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

let sname: string,
	sartist: string,
	aqualisteners: string,
	aquapresenter: string;

function metadataListener(): void {
	const data = JSON.parse(this.responseText);
	sname = data.nowplaying.title;
	sartist = data.nowplaying.artist;
	aqualisteners = data.listeners.total;
	aquapresenter = data.presenter.name;
}

function updateMetaData(): void {
	const xhttp = new XMLHttpRequest();
	xhttp.addEventListener("load", metadataListener);
	xhttp.open("GET", "https://api.itsaqua.net/stats", true);
	xhttp.send();
}

setInterval(updateMetaData, 10000);
window.onload = function (): void {
	updateMetaData();
};

let lastTitle: string,
	lastTimeStart = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/dBqeZ3q.png",
		},
		[changeDetails, changeState, changeSmallText] = await Promise.all([
			presence.getSetting<string>("changedetails"),
			presence.getSetting<string>("changestate"),
			presence.getSetting<string>("changesmalltext"),
		]);

	if (lastTitle !== sname) {
		lastTitle = sname;
		lastTimeStart = Math.floor(Date.now() / 1000);
	}

	presenceData.startTimestamp = lastTimeStart;

	if (!sname) {
		lastTitle = "Loading...";
		sname = "Loading...";
	}
	sartist ??= "Loading...";
	aquapresenter ??= "Loading...";
	aqualisteners ??= "Loading...";

	if (aquapresenter !== "AutoDJ") {
		if (changeDetails) {
			presenceData.details = changeDetails
				.replace("%song%", sname)
				.replace("%artist%", sartist);
		} else presenceData.details = `🎵 | ${sartist} - ${sname}`;

		if (changeState)
			presenceData.state = changeState.replace("%presenter%", aquapresenter);
		else presenceData.state = `🎙️ | ${aquapresenter}`;
	} else {
		if (changeDetails) {
			presenceData.details = changeDetails
				.replace("%song%", sname)
				.replace("%artist%", sartist);
		} else presenceData.details = `🎵 | ${sartist} - ${sname}`;

		if (changeState)
			presenceData.state = changeState.replace("%presenter%", "AutoDJ");
		else presenceData.state = "🎙️ | " + "AutoDJ";
	}

	if (changeSmallText) {
		presenceData.smallImageText = changeSmallText.replace(
			"%listeners%",
			aqualisteners
		);
	} else presenceData.smallImageText = `Listeners: ${aqualisteners}`;

	presence.setActivity(presenceData, true);
});
