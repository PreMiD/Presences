const presence = new Presence({
	clientId: "814986239681626143",
});

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
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/M/Mavanimes/assets/logo.png",
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
