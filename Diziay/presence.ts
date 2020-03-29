let presence = new Presence({
	clientId: "664350968585912350",
	mediaKeys: false
});

let strings = presence.getStrings({
	playing: "presence.playback.playing",
	paused: "presence.playback.paused",
	browsing: "presence.activity.browsing"
});


let startTimestamp = Math.floor(Date.now() / 1000);

let video: HTMLVideoElement;


presence.on("iFrameData", async (msg) => {

	if (!msg) return;
	video = msg;

});

presence.on("UpdateData", async () => {

	let presenceData: presenceData = {
		largeImageKey: "diziay"
	};

	let seriesBool = document.querySelector('body > section > div > div > div.content__inner.movie__page.d-flex.justify-content-between > div.content__sidebar > div.card.card__bg1.mb-4.mb-hidden > div.card__title.title__no-icon.d-flex.justify-content-between > h2') ? true : false;
	let movieBool = document.querySelector('body > section > div > div.content > div > div.content__sidebar > div.card.card__bg1.mb-4 > div.card__title.title__1 > h2 > strong') ? true : false;

	if (!seriesBool && !movieBool) {

		video = null;

	}


	// Series

	if (seriesBool) {

		let seriesTitle = document.querySelector('body > section > div > div > div.content__inner.movie__page.d-flex.justify-content-between > div.content__container > div > div.card__content.pb-md-1.pb-0 > div > div.watch__title > div.watch__title__name > div > h2').textContent;

		presenceData.details = seriesTitle.split('-')[0];
		presenceData.state = seriesTitle.split('-')[1].replace('n', 'n |');


	}

	// Movies

	else if (movieBool) {

		let movieTitle = document.querySelector('body > section > div > div.content > div > div.content__container > div:nth-child(1) > div > div > div.watch__title > div.watch__title__name > div > h2').textContent;
		let movieTitle2 = document.querySelector('body > section > div > div.content > div > div.content__container > div:nth-child(1) > div > div > div.watch__title > div.watch__title__name > div > span').textContent;

		presenceData.details = movieTitle;
		presenceData.state = movieTitle2;



	}

	// Browsing

	else {

		presenceData.details = (await strings).browsing;
		presenceData.startTimestamp = startTimestamp;

	}


	if (video) {

		presenceData.smallImageKey = video.paused ? "pause" : "play";
		presenceData.smallImageText = video.paused ? (await strings).paused : (await strings).playing;

		if (!video.paused && video.duration) {

			let timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
			presenceData.startTimestamp = timestamps[0];
			presenceData.endTimestamp = timestamps[1];

		}


	}

	presence.setActivity(presenceData);

});



function getTimestamps(videoTime: number, videoDuration: number) {
	var startTime = Date.now();
	var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
	return [Math.floor(startTime / 1000), endTime];
}