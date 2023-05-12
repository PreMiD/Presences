const presence = new Presence({
		clientId: "640538683392655370",
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
let title: HTMLElement,
	player: HTMLAudioElement,
	dj: HTMLElement,
	listeners: HTMLElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/X7rXtq7.png",
	};
	//presenceData.startTimestamp = browsingTimestamp;
	player = document.querySelector("#player");
	if (!player.paused) {
		title = document.querySelector("#song");
		dj = document.querySelector("#djname");
		listeners = document.querySelector("#listeners");
		presenceData.details = title.textContent;
		presenceData.state = `DJ: ${
			dj.textContent
		} Listeners: ${listeners.textContent.replace(" Listeners", "")}`;
		presenceData.smallImageKey = Assets.Play;
	} else if (document.location.pathname.includes("/recent")) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Viewing the recently";
		presenceData.state = "played songs";
		presenceData.smallImageKey = Assets.Reading;
	} else if (document.location.pathname.includes("/team")) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Viewing the staff team";
	} else if (document.location.pathname.includes("/request")) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Requesting a song";
	} else if (document.location.pathname.includes("/applications")) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Applying for staff";
	} else if (document.location.pathname.includes("/about")) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Reading about TSFM";
		presenceData.smallImageKey = Assets.Reading;
	} else if (document.location.pathname.includes("/schedule")) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Viewing the schedule";
	} else if (document.location.pathname.includes("/convoys")) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Viewing the convoys";
	} else if (document.location.pathname.includes("/streamers")) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Viewing the streamers";
	} else if (document.location.pathname.includes("/partner")) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Viewing the partners";
	} else if (document.location.pathname.includes("/vtc")) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Viewing the VTC";
	} else if (document.location.pathname.includes("/weekly")) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Viewing the weekly";
		presenceData.state = "shows on TSFM";
	} else if (document.location.pathname.includes("/tuneoftheweek")) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Viewing the tune";
		presenceData.state = "of the week";
	} else if (document.location.pathname.includes("/contact")) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Contacting TSR";
		presenceData.smallImageKey = Assets.Writing;
	} else if (document.location.pathname.includes("/modifications")) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Viewing the offical";
		presenceData.state = "modifications list";
	} else if (document.location.pathname.includes("/advertisements")) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Viewing the";
		presenceData.state = "advertisements packages";
	} else if (document.location.pathname === "/") {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Browsing...";
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
