var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const presence = new Presence({
    clientId: '477937036423331872',
    mediaKeys: false
}), strings = presence.getStrings({
    playing: 'presence.playback.playing',
    paused: 'presence.playback.paused',
    browsing: 'presence.activity.browsing',
    episode: 'presence.media.info.episode'
});
presence.on('UpdateData', () => __awaiter(this, void 0, void 0, function* () {
    const presenceData = {
        largeImageKey: 'drim_sonhos2',
        details: (yield strings).browsing,
        startTimestamp: Math.floor(Date.now() / 1000)
    }, path = window.location.pathname;
    if (path.startsWith('/online')) {
        delete presenceData.startTimestamp, presenceData.endTimestamp;
        const video = document.querySelector('video');
        const title = document.querySelector('a#anime_name').textContent;
        const episode = document.querySelector('b#epid').textContent;
        presenceData.details = title;
        presenceData.state = (yield strings).episode.replace('{0}', episode);
        if (!video.paused) {
            const { duration, currentTime } = video;
            const timestamps = getTimestamps(currentTime, duration);
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
            presenceData.smallImageKey = 'play';
            presenceData.smallImageText = (yield strings).playing;
        }
        else if (video.currentTime > 0) {
            presenceData.smallImageKey = 'pause';
            presenceData.smallImageText = (yield strings).paused;
        }
    }
    else if (path.startsWith('/lancamentos')) {
        presenceData.details = 'Vendo lançamentos';
    }
    else if (path.startsWith('/lista-completa')) {
        presenceData.details = 'Vendo a lista de animes';
    }
    else if (path.startsWith('/temporadas')) {
        presenceData.details = 'Vendo animes da temporada';
    }
    presence.setActivity(presenceData, true);
}));
function getTimestamps(videoTime, videoDuration) {
    var startTime = Math.floor(Date.now() / 1000);
    var endTime = Math.floor(startTime - videoTime + videoDuration);
    return [startTime, endTime];
}
