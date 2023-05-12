const presence = new Presence({
	clientId: "769568486263095327",
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

let video = {
	duration: 0,
	currentTime: 0,
	paused: true,
};

presence.on(
	"iFrameData",
	(data: { duration: number; currentTime: number; paused: boolean }) => {
		video = data;
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/PfvR7jD.png",
		startTimestamp: Math.floor(Date.now() / 1000),
	};

	if (location.pathname.startsWith("/watch")) {
		const [startTimestamp, endTimestamp] = presence.getTimestamps(
			Math.floor(video.currentTime),
			Math.floor(video.duration)
		);

		presenceData.details = document
			.querySelector(".anime-name")
			.textContent.trim();

		presenceData.state = `Episode: ${
			document.querySelector(".episode-number").lastChild.textContent
		}`;

		presenceData.smallImageKey = video.paused ? "pause" : "play";
		presenceData.smallImageText = video.paused ? "Paused" : "Played";
		presenceData.startTimestamp = startTimestamp;
		presenceData.endTimestamp = endTimestamp;
		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		presence.setActivity(presenceData, !video.paused);
	} else if (location.pathname.startsWith("/search")) {
		presenceData.smallImageKey = Assets.Search;
		presenceData.smallImageText = "Searching";
		presenceData.details = `Searching: ${document
			.querySelector(".heading")
			.textContent.slice(18, -2)}`;
		if (
			document.querySelectorAll(".content").length &&
			document.querySelectorAll(".page-item").length
		) {
			presenceData.state = `Results: ${
				document.querySelectorAll(".content").length *
				(document.querySelectorAll(".page-item").length - 3)
			} and More..`;
		} else if (document.querySelectorAll(".content").length) {
			presenceData.state = `Results: ${
				document.querySelectorAll(".content").length
			}`;
		} else presenceData.state = "Results: Nothing";
	} else if (location.pathname.includes("/download")) {
		presenceData.smallImageKey = Assets.Downloading;
		presenceData.smallImageText = "Downloading";
		presenceData.details = document.querySelector(".heading > a").textContent;
		presenceData.state = "Downloading Anime";
	} else if (location.pathname.startsWith("/anime/")) {
		presenceData.smallImageKey = "location";
		presenceData.smallImageText = "Viewing";
		presenceData.details = document
			.querySelector(".name")
			.textContent.trim()
			.slice(0, -5);
		presenceData.state = "Viewing an Anime";
	} else if (location.pathname.startsWith("/anime-list")) {
		presenceData.smallImageKey = "discovery";
		presenceData.smallImageText = "Browsing";
		presenceData.details = "Browsing for Anime";
	} else if (location.pathname.startsWith("/series-list")) {
		presenceData.smallImageKey = "discovery";
		presenceData.smallImageText = "Browsing";
		presenceData.details = "Browsing for Series";
	} else if (location.pathname.startsWith("/movie-list")) {
		presenceData.smallImageKey = "discovery";
		presenceData.smallImageText = "Browsing";
		presenceData.details = "Browsing for Movie";
	} else if (location.pathname.startsWith("/ova-list")) {
		presenceData.smallImageKey = "discovery";
		presenceData.smallImageText = "Browsing";
		presenceData.details = "Browsing for Ova";
	} else if (location.pathname.startsWith("/ona-list")) {
		presenceData.smallImageKey = "discovery";
		presenceData.smallImageText = "Browsing";
		presenceData.details = "Browsing for Ona";
	} else if (location.pathname.startsWith("/special-list")) {
		presenceData.smallImageKey = "discovery";
		presenceData.smallImageText = "Browsing";
		presenceData.details = "Browsing for Special";
	} else if (location.pathname.startsWith("/premium")) {
		presenceData.smallImageKey = "discovery";
		presenceData.smallImageText = "Discovering";
		presenceData.details = "Discovering Premium";
	} else if (location.pathname === "/blog") {
		presenceData.smallImageKey = "discovery";
		presenceData.smallImageText = "Discovering";
		presenceData.details = "Discovering Blog";
	} else if (location.pathname.startsWith("/post")) {
		presenceData.smallImageKey = "blog";
		presenceData.smallImageText = "Reading";
		presenceData.details = document
			.querySelector(".post-title")
			.textContent.trim();
		presenceData.state = `Viewing ${document
			.querySelector(".publisher")
			.textContent.trim()}'s Post`;
	} else if (location.pathname.startsWith("/timeline")) {
		presenceData.smallImageKey = "discovery";
		presenceData.smallImageText = "Discovering";
		presenceData.details = "Discovering Timeline";
	} else if (
		location.pathname.startsWith("/user") &&
		location.pathname.includes("/ratings")
	) {
		presenceData.smallImageKey = "profile";
		presenceData.smallImageText = "Viewing";
		presenceData.details = "Ratings List";
		presenceData.state = `Viewing ${document
			.querySelector(".profile-usertitle-name")
			.textContent.trim()}'s Profile`;
	} else if (
		location.pathname.startsWith("/user") &&
		location.pathname.includes("/watching")
	) {
		presenceData.smallImageKey = "profile";
		presenceData.smallImageText = "Viewing";
		presenceData.details = "Watching List";
		presenceData.state = `Viewing ${document
			.querySelector(".profile-usertitle-name")
			.textContent.trim()}'s Profile`;
	} else if (
		location.pathname.startsWith("/user") &&
		location.pathname.includes("/completed")
	) {
		presenceData.smallImageKey = "profile";
		presenceData.smallImageText = "Viewing";
		presenceData.details = "Completed List";
		presenceData.state = `Viewing ${document
			.querySelector(".profile-usertitle-name")
			.textContent.trim()}'s Profile`;
	} else if (
		location.pathname.startsWith("/user") &&
		location.pathname.includes("/on-hold")
	) {
		presenceData.smallImageKey = "profile";
		presenceData.smallImageText = "Viewing";
		presenceData.details = "On-Hold List";
		presenceData.state = `Viewing ${document
			.querySelector(".profile-usertitle-name")
			.textContent.trim()}'s Profile`;
	} else if (
		location.pathname.startsWith("/user") &&
		location.pathname.includes("/dropped")
	) {
		presenceData.smallImageKey = "profile";
		presenceData.smallImageText = "Viewing";
		presenceData.details = "Dropped List";
		presenceData.state = `Viewing ${document
			.querySelector(".profile-usertitle-name")
			.textContent.trim()}'s Profile`;
	} else if (
		location.pathname.startsWith("/user") &&
		location.pathname.includes("/plan-to-watch")
	) {
		presenceData.smallImageKey = "profile";
		presenceData.smallImageText = "Viewing";
		presenceData.details = "Planned List";
		presenceData.state = `Viewing ${document
			.querySelector(".profile-usertitle-name")
			.textContent.trim()}'s Profile`;
	} else if (location.pathname.startsWith("/user")) {
		presenceData.smallImageKey = "profile";
		presenceData.smallImageText = "Viewing";
		presenceData.details = "Main Page";
		presenceData.state = `Viewing ${document
			.querySelector(".profile-usertitle-name")
			.textContent.trim()}'s Profile`;
	} else if (location.pathname === "/") presenceData.details = "On Homepage";

	presence.setActivity(presenceData);
});
