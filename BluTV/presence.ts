let presence = new Presence({
	clientId: "664216462038401066",
	mediaKeys: false
});

let strings = presence.getStrings({
	playing: "presence.playback.playing",
	paused: "presence.playback.paused",
	browsing: "presence.activity.browsing"
});


let startTimestamp = Math.floor(Date.now() / 1000);

let data: any, video: HTMLVideoElement;


presence.on("iFrameData", async (msg) => {

	if (!msg) return;
	data = msg;
	video = msg.video;

});

presence.on("UpdateData", async () => {

	let path = document.location.pathname;

	let presenceData: presenceData = {
		largeImageKey: "blutv"
	};

	if (!path.includes('izle')) {
		video = null;
		data = null;
	}

	if (data) {

		if (data.series) {

			let name = data.series.name ? data.series.name : seriesName(path.split('/')[3].replace(/-/gi, ' '));

			presenceData.details = name;
			presenceData.state = `${data.series.season} | ${data.series.ep}`;

		}

		else {

			presenceData.details = path.startsWith('/canli-yayin') ? "Bir televizyon yayını izliyor:" : "Bir film izliyor:";
			presenceData.state = data.movie.name;

		}




		if (video) {
			presenceData.smallImageKey = video.paused ? "pause" : "play";
			presenceData.smallImageText = video.paused ? (await strings).paused : (await strings).playing;

			let timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
			if (video.duration && !video.paused && !document.location.pathname.startsWith('/canli-yayin')) {
				presenceData.startTimestamp = timestamps[0];
				presenceData.endTimestamp = timestamps[1];
			}

		}

	}

	else {

		presenceData.startTimestamp = startTimestamp;
		presenceData.details = (await strings).browsing;

	}



	presence.setActivity(presenceData);
});

function seriesName(name: string) {
	return name.replace(/([^\W_]+[^\s-]*) */g,
		function (text) {
			return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
		});
}

function getTimestamps(videoTime: number, videoDuration: number) {
	var startTime = Date.now();
	var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
	return [Math.floor(startTime / 1000), endTime];
}