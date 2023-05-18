const presence = new Presence({
		clientId: "765545656579522572",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		browsing: "general.browsing",
	});

let video = {
	duration: 0,
	currentTime: 0,
	paused: true,
};

presence.on(
	"iFrameData",
	(data: {
		video: boolean;
		duration: number;
		currentTime: number;
		paused: boolean;
	}) => {
		video = data;
	}
);
const enum Assets {
	Logo = "https://i.imgur.com/ac0KCKY.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
	};
	if (
		document.querySelector(".infoan2") &&
		document.querySelector("#iframemain")
	) {
		// on page of a episode
		[presenceData.startTimestamp, presenceData.endTimestamp] =
			presence.getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			);

		presenceData.details = document.querySelector(".infoan2").textContent;
		[, presenceData.state] = document
			.querySelector("#main > div.now2 > div")
			.textContent.split(" - ");

		presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
		presenceData.smallImageText = video.paused
			? (await strings).pause
			: (await strings).play;

		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}
	} else if (document.querySelector(".infodes")) {
		presenceData.details = "Viewing show:";
		presenceData.state = document.querySelector(".infodes").textContent;
		presenceData.smallImageKey = Assets.Reading;
	} else if (document.location.pathname.includes("/categories/")) {
		presenceData.details = "Viewing category:";
		[, presenceData.state] = document
			.querySelector(".lisbg")
			.textContent.split(": ");
		presenceData.smallImageKey = Assets.Reading;
	} else if (document.location.pathname.includes("/categories")) {
		presenceData.details = "Browsing through";
		presenceData.state = "the categories";
		presenceData.smallImageKey = Assets.Reading;
	} else if (document.location.pathname.includes("/search")) {
		presenceData.details = "Searching for some anime...";
		presenceData.smallImageKey = Assets.Search;
	} else if (document.location.pathname.includes("/popular")) {
		presenceData.details = "Browsing through";
		presenceData.state = "popular anime";
		presenceData.smallImageKey = Assets.Reading;
	} else if (document.location.pathname.includes("/movies")) {
		presenceData.details = "Browsing through";
		presenceData.state = "anime movies";
		presenceData.smallImageKey = Assets.Reading;
	} else if (document.location.pathname.includes("/alldubbed")) {
		presenceData.details = "Browsing through";
		presenceData.state = "dubbed anime";
		presenceData.smallImageKey = Assets.Reading;
	} else if (document.location.pathname.includes("/anime")) {
		presenceData.details = "Browsing through";
		presenceData.state = "anime archives";
		presenceData.smallImageKey = Assets.Reading;
	} else if (document.location.pathname.includes("/dubbed")) {
		presenceData.details = "Browsing through";
		presenceData.state = "dubbed anime";
		presenceData.smallImageKey = Assets.Reading;
	}

	if (!presenceData.details) {
		presenceData.details = (await strings).browsing;
		presenceData.smallImageKey = Assets.Reading;
		presenceData.smallImageText = (await strings).browsing;
	}
	presence.setActivity(presenceData);
});
