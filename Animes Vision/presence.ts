let presence = new Presence({
    clientId: '666023707243839530',
    mediaKeys: true
}),
startedBrowsing : number = Math.floor(Date.now() / 1000),
playback : boolean,
video : HTMLVideoElement,
currentTime : number,
duration : number,
timestamps : number[],
videoTitle : string,
episode : string,
paused : boolean,
path : string = window.location.pathname,
strings = presence.getStrings({
    "browsing": "presence.activity.browsing",
    "playing": "presence.playback.playing",
    "paused": "presence.playback.paused"
}),
presenceData : presenceData = {
    largeImageKey: "vision_img",
    startTimestamp: startedBrowsing
};

presence.on("MediaKeys", (key: string) => {
    if (video) {
        if (key == "pause")
            paused ? video.play() : video.pause();
        }
    }
);

presence.on("UpdateData", async () => {
    playback = document.querySelector('div#playersd > div > div > video') || document.querySelector('div#playerhd > div > div > video') || document.querySelector('div#playerfhd > div > div > video') ? true : false;
    if (playback) {
        video = document.querySelector('div#playerhd > div > div > video');
        video = video.currentTime != 0 ? video : document.querySelector('div#playersd > div > div > video');
    }
    if (playback && Math.floor(video.currentTime) != 0) {
        duration = Math.floor(document.querySelector('video').duration);
        videoTitle = document.querySelector('.novisao').textContent.split('–')[0].trim();
        episode = document.querySelector('.novisao').textContent.split('–')[1].trim();
        paused = video.paused
        presenceData.smallImageKey = paused ? "pause" : "play";
        presenceData.smallImageText = paused ? (await strings).paused : (await strings).playing;
        if (!paused) {
            currentTime = Math.floor(document.querySelector('video').currentTime);
            timestamps = getTimestamps(currentTime, duration);
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
        } else {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
        }
        presenceData.details = 'Assistindo ' + videoTitle;
        presenceData.state = episode;

    }  else if (path.startsWith('/all-series')) {
        presenceData.details = 'Vendo Lista de Animes';
    } else if (path.startsWith('/lancamentos')) {
        presenceData.details = 'Vendo os Lançamentos';
    } else if (path.startsWith('/animes-dublado')) {
        presenceData.details = 'Vendo Animes Dublados';
    } else if (path.startsWith('/doramas')) {
        presenceData.details = 'Vendo Lista de Doramas';
    } else if (path.startsWith('/cartoons')) {
        presenceData.details = 'Vendo Lista de Cartoons';
    } else if (path.startsWith('/filmes')) {
        presenceData.details = 'Vendo Lista de Filmes';
    } else {
        presenceData.details = (await strings).browsing;
    }
    presence.setActivity(presenceData, true);
})

function getTimestamps(curr : number, dura : number) {
    let startTime = Math.floor(Date.now() / 1000),
    duration = startTime - curr + dura;
    return [startTime, duration];
}