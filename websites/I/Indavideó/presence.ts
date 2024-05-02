const presence = new Presence({
		clientId: "1234605936098807829",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let searchBar: string,
	videoTitle: string,
	uploader: string,
	paused: boolean,
	currentTime: number,
	duration: number;

presence.on(
	"iFrameData",
	(data: { currentTime: number; paused: boolean; duration: number }) => {
		({ currentTime, paused, duration } = data);
	}
);
presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/WXPi1xl.png",
			startTimestamp: browsingTimestamp,
		},
		strings = await presence.getStrings({
			play: "general.playing",
			pause: "general.paused",
		});
	if (
		document.location.pathname === "/" &&
		document.location.hostname === "indavideo.hu"
	)
		presenceData.details = "On the homepage";
	else if (
		document.location.pathname.includes("/search/text/") ||
		document.location.pathname.includes("/search/detailed/")
	) {
		searchBar = (<HTMLInputElement>document.querySelector("#ddl_search-what"))
			.value;
		presenceData.details = `Searching for "${searchBar}"...`;
	} else if (document.location.pathname.includes("/video/")) {
		delete presenceData.startTimestamp;
		(videoTitle = document.querySelector(".vid_header_title").textContent),
			(uploader = document.querySelector(".vid_header_username").textContent);
		presenceData.details = `Watching "${videoTitle.trim()}"`;
		presenceData.state = `Uploaded by ${uploader.trim()}`;
		presenceData.smallImageKey = paused ? Assets.Pause : Assets.Play;
		presenceData.smallImageText = paused ? strings.pause : strings.play;
		if (!paused) {
			const [startTimestamp, endTimestamp] = presence.getTimestamps(
				Math.floor(currentTime),
				Math.floor(duration)
			);
			presenceData.startTimestamp = startTimestamp;
			presenceData.endTimestamp = endTimestamp;
		}
		presenceData.buttons = [
			{
				label: "Watch video",
				url: document.location.toString(),
			},
		];
	} else if (document.location.pathname.includes("/profile/")) {
		uploader = document.querySelector("#user").textContent;
		presenceData.details = `Browsing user profile "${uploader.trim()}"...`;
	} else if (document.location.pathname.includes("/myprofile/basicdata"))
		presenceData.details = "Managing their account details...";
	else if (document.location.pathname.includes("/myprofile/customize"))
		presenceData.details = "Customizing their account...";
	else if (document.location.pathname.includes("/myprofile/myvideos"))
		presenceData.details = "Looking at their videos...";
	else if (document.location.pathname.includes("/myprofile/mylooprs"))
		presenceData.details = "Looking at their loops...";
	else if (document.location.pathname.includes("/myprofile/mywatchlater"))
		presenceData.details = "Looking at their Watch Later list...";
	else if (document.location.pathname.includes("/myprofile/mysubscribes"))
		presenceData.details = "Looking at their subscriptions...";
	else if (document.location.pathname.includes("/myprofile/stripfactory"))
		presenceData.details = "Working on a strip embed...";
	else if (document.location.hostname !== "indavideo.hu") {
		switch (document.location.hostname) {
			case "auto.indavideo.hu": {
				presenceData.details = "Browsing the Autó category...";
				break;
			}
			case "film.indavideo.hu": {
				presenceData.details = "Browsing the Film category...";
				break;
			}
			case "csimota.indavideo.hu": {
				presenceData.details = "Browsing the Csimota category...";
				break;
			}
			case "palyazat.indavideo.hu": {
				presenceData.details = "Browsing the Pályázat category...";
				break;
			}
			case "upload.indavideo.hu": {
				presenceData.details = "Uploading a video...";
				break;
			}
		}
	} else presenceData.details = "Browsing...";
	presence.setActivity(presenceData);
});
