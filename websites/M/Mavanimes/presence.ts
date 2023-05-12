const presence = new Presence({
	clientId: "814986239681626143",
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
let video: {
	currentTime?: number;
	duration?: number;
	paused?: boolean;
} = {};
presence.on(
	"iFrameData",
	(videoData: { currentTime: number; duration: number; paused: boolean }) => {
		if (videoData.duration) video = videoData;
	}
);
presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/o4qNo1n.png",
		},
		params = new URLSearchParams(new URL(window.location.href).search);
	if (document.location.pathname === "/") {
		if (params.has("s") === true) {
			presenceData.details = "Cherche un animé..";
			presenceData.state = params.get("s");
		} else presenceData.details = "Page d'accueil";
	} else if (document.location.pathname.endsWith("/tous-les-animes-en-vf/"))
		presenceData.details = "Cherche un animé en VF..";
	else if (document.location.pathname.endsWith("/films/"))
		presenceData.details = "Cherche un film..";
	else if (
		document.location.pathname.endsWith("/tous-les-animes-en-vostfr-fullhd-2/")
	)
		presenceData.details = "Cherche un animé..";
	else if (
		document.location.pathname.endsWith("/regarder-animes-oav-streaming/")
	)
		presenceData.details = "Cherche un OAV..";
	else if (
		document.location.pathname.endsWith(
			"/calendrier-de-sorties-des-nouveaux-episodes/"
		)
	)
		presenceData.details = "Regarde le calendrier de sortie";
	else {
		presenceData.details = "Regarde un animé :";
		presenceData.state =
			document.querySelectorAll(".entry-title")[0].textContent;
		const timestamps = presence.getTimestamps(
			Math.floor(video.currentTime),
			Math.floor(video.duration)
		);
		if (!isNaN(timestamps[0]) && !isNaN(timestamps[1]))
			[presenceData.startTimestamp, presenceData.endTimestamp] = timestamps;
		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
			presenceData.smallImageText = "En pause";
			presenceData.smallImageKey = Assets.Pause;
		} else {
			presenceData.smallImageText = "Lecture..";
			presenceData.smallImageKey = Assets.Play;
		}
	}
	presence.setActivity(presenceData);
});
