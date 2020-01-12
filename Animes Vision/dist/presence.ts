const presence = new Presence({
    clientId: '666023707243839530',
    mediaKeys: false
}),
strings = presence.getStrings({
    playing: 'presence.playback.playing',
    paused: 'presence.playback.paused',
    browsing: 'presence.activity.browsing',
    episode: 'presence.media.info.episode'
});

presence.on('UpdateData', async () => {
    const presenceData: presenceData = {
        largeImageKey: 'vision_img',
        details: (await strings).browsing,
        startTimestamp: Math.floor(Date.now() / 1000)
    },
    path = window.location.pathname;
    if (path.startsWith('/animes')) {
        delete presenceData.startTimestamp, presenceData.endTimestamp;
        const video = document.querySelector('video');
        const title = document.querySelector('novisao').textContent;
        const episode = document.querySelector('novisaoep').textContent;

        presenceData.details = title;
        presenceData.state = (await strings).episode.replace('{0}', episode);
        if (!video.paused) {
            const { duration, currentTime } = video;
            const timestamps = getTimestamps(currentTime, duration);

            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
            presenceData.smallImageKey = 'play';
            presenceData.smallImageText = (await strings).playing;
        } else if (video.currentTime > 0) {
            presenceData.smallImageKey = 'pause';
            presenceData.smallImageText = (await strings).paused
        }
        
    } else if (path.startsWith('/all-series')) {
        presenceData.details = 'Vendo a Lista de Animes';
    } else if (path.startsWith('/lancamentos')) {
        presenceData.details = 'Vendo os Lançamentos';
    }
    presence.setActivity(presenceData, true);
})

function getTimestamps(videoTime, videoDuration) {
	var startTime = Math.floor(Date.now() / 1000);
	var endTime = Math.floor(startTime - videoTime + videoDuration);
	return [ startTime, endTime ];
}
