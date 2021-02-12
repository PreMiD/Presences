const presence = new Presence({
	clientId: "808404943311994910"
}),
strings = presence.getStrings({
	play: "presence.playback.playing",
	pause: "presence.playback.paused",
	browsing: "presence.activity.browsing"
}),
video: HTMLVideoElement = document.querySelector("video#bitmovinplayer-video-vplayer"),
timestamps = presence.getTimestamps(video.currentTime, video.duration);
presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "viu-logo"
	};
	if (document.location.pathname.includes("video-")){
		presenceData.startTimestamp = timestamps[0];
		presenceData.endTimestamp = timestamps[1];
		if (document.location.pathname.includes("_episode_")){
			presenceData.details = document.querySelector("h1.ep_title").textContent.split("-")[0].replace(/\s*$/,'');
			presenceData.state = document.querySelector("h1.ep_title").textContent.split("-")[1].replace(/^\s+|\s+$/g, "");
		}else if (document.location.pathname.includes("trailer")){
			if (document.querySelector("h1.ep_title").textContent.includes('\'')){
				presenceData.details = document.querySelector("h1.ep_title").textContent.match(/'(.*?)'|"(.*?)"/)[1];
			}else{
				presenceData.details = document.querySelector("h1.ep_title").textContent.match(/'(.*?)'|"(.*?)"/)[2];
			}
			presenceData.state = "Trailer";
		}else{
			presenceData.details = document.querySelector("h1.ep_title").textContent;
			presenceData.state = "Movie";
		}
		presenceData.smallImageKey = video.paused ? "pause" : "play";
		presenceData.smallImageText = video.paused ? (await strings).pause : (await strings).play;
		presenceData.startTimestamp = timestamps[0];
		presenceData.endTimestamp = timestamps[1];
		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}
	}else{
		const browsingStamp = Math.floor(Date.now() / 1000);
		presenceData.startTimestamp = browsingStamp;
		if (document.location.pathname.endsWith("viu_originals")) {
			presenceData.state = "Viu Originals";
			presenceData.details = "Looking For";
		}else if (document.location.pathname.endsWith("japanese_drama")) {
			presenceData.state = "Japanese Drama";
			presenceData.details = "Looking For";
		}else if (document.location.pathname.endsWith("korean_drama")) {
			presenceData.state = "Korean Drama";
			presenceData.details = "Looking For";
		}else if (document.location.pathname.endsWith("asian_drama")) {
			presenceData.state = "Asian Drama";
			presenceData.details = "Looking For";
		}else if (document.location.pathname.endsWith("movies")) {
			presenceData.state = "Movies";
			presenceData.details = "Looking For";
		}else if (document.location.pathname.endsWith("korean_varieties")) {
			presenceData.state = "Korean Varieties";
			presenceData.details = "Looking For";
		}else if (document.location.pathname.endsWith("lifestyle")) {
			presenceData.state = "Lifestyle";
			presenceData.details = "Looking For";
		}else if (document.location.pathname.endsWith("documentary")) {
			presenceData.state = "Documentary";
			presenceData.details = "Looking For";
		}else if (document.location.pathname.endsWith("myAccount")) {
			presenceData.details = "Account Page";
		}else if (document.location.pathname.includes("playlist-")) {
			presenceData.details = "Viewing Page";
			presenceData.state = document.querySelector("h1.headerContainer__info__title").textContent;
		}else if (document.location.pathname.includes("collection-")) {
			presenceData.details = "Viewing Collection";
			presenceData.state = document.querySelector("h1.c-headingtitle").textContent;
		}
	}
	if (presenceData.details == null) {
		presence.setTrayTitle();
		presenceData.details = (await strings).browsing;
		presence.setActivity(presenceData);
	}else{
		presence.setActivity(presenceData);
	}
});
