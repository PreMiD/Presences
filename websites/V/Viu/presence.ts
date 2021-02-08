const presence = new Presence({
	clientId: "808404943311994910"
}),
strings = presence.getStrings({
	play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
});
function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
	const data: PresenceData = {
		largeImageKey: "viu-logo"
	};
	if (document.location.hostname == "www.viu.com") {
		if (document.location.pathname.includes("/all")) {
			if (document.location.pathname.includes("viu_originals")) {
				data.state = "Viu Originals";
				data.details = "Looking For";
				data.startTimestamp = browsingStamp;
			}else if (document.location.pathname.includes("japanese_drama")) {
				data.state = "Japanese Drama";
				data.details = "Looking For";
				data.startTimestamp = browsingStamp;
			}else if (document.location.pathname.includes("korean_drama")) {
				data.state = "Korean Drama";
				data.details = "Looking For";
				data.startTimestamp = browsingStamp;
			}else if (document.location.pathname.includes("asian_drama")) {
				data.state = "Asian Drama";
				data.details = "Looking For";
				data.startTimestamp = browsingStamp;
			}else if (document.location.pathname.match(/movies$/)) {
				data.state = "Movies";
				data.details = "Looking For";
				data.startTimestamp = browsingStamp;
			}else if (document.location.pathname.includes("korean_varieties")) {
				data.state = "Korean Varieties";
				data.details = "Looking For";
				data.startTimestamp = browsingStamp;
			}else if (document.location.pathname.includes("lifestyle")) {
				data.state = "Lifestyle";
				data.startTimestamp = browsingStamp;
				data.details = "Looking For";
			}else if (document.location.pathname.includes("documentary")) {
				data.state = "Documentary";
				data.details = "Looking For";
				data.startTimestamp = browsingStamp;
			}else if (document.location.pathname.includes("myAccount")) {
				data.details = "Account Page";
				data.startTimestamp = browsingStamp;
			}else if (document.location.pathname.includes("playlist-")) {
				data.details = "Viewing Page";
				data.startTimestamp = browsingStamp;
				data.state = document.querySelector("h1.headerContainer__info__title").textContent;
			}else if (document.location.pathname.includes("video-")) {
					var video: HTMLVideoElement = document.querySelector("video#bitmovinplayer-video-vplayer");
					var timestamps = getTimestamps(
						Math.floor(video.currentTime),
						Math.floor(video.duration)
					);
					data.startTimestamp = timestamps[0];
					data.endTimestamp = timestamps[1];
				if (document.location.pathname.includes("_episode_")){
					data.details = document.querySelector("h1.ep_title").textContent.split("-")[0].replace(/\s*$/,'');
					data.state = document.querySelector("h1.ep_title").textContent.split("-")[1].replace(/^\s+|\s+$/g, "");
				}else if(document.location.pathname.includes("-trailer")){
					data.details = document.querySelector("h1.ep_title").textContent.match(/'(.*?)'|"(.*?)"/)[2];
					data.state = "Trailer";
				}else{
					data.details = document.querySelector("h1.ep_title").textContent;
					data.state = "Movie";
				}
				(data.smallImageKey = video.paused ? "pause" : "play"),
					(data.smallImageText = video.paused
					  ? (await strings).pause
					  : (await strings).play),
					(data.startTimestamp = timestamps[0]),
					(data.endTimestamp = timestamps[1]);
				if (video.paused) {
					delete data.startTimestamp;
					delete data.endTimestamp;
				}
			}else{
				data.startTimestamp = browsingStamp;
				data.details = (await strings).browsing;
			}
		}
		
	}
	presence.setActivity(data);
});