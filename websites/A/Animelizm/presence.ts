const presence = new Presence({
    clientId: "715536733227450379"
}),
strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
});

let video = {
    current: 0,
    duration: 0,
    paused: true
};

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(
    videoTime: number,
    videoDuration: number
): Array<number> {
    const startTime = Date.now();
    const endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}

presence.on("iFrameData", (data: { current: number; duration: number; paused: boolean }) => {
    video = data;
});

presence.on("UpdateData", async () => {
    const presenceData: PresenceData = {
        largeImageKey: "logo"
    };

    if (isNaN(video.duration) || video.duration <= 0) { 
        presenceData.details = "Browsing...";

        return presence.setActivity(presenceData);
    }

    const timestamps = getTimestamps(Math.floor(video.current), Math.floor(video.duration));
    const Info = document.querySelector(".ez-detail-title").textContent;
    let episode;

    if (Info.includes('ตอนที่')) {
        let info = Info.split("ตอนที่");
        episode = info.pop();

        if (episode.includes('ซับไทย')) {
            episode = episode.replace('ซับไทย', '').trim();
        } else if (episode.includes('พากย์ไทย')) {
            episode = episode.replace('พากย์ไทย', '').trim();
        }

        episode = 'ตอนที่ ' + episode;
        presenceData.state = episode;
        presenceData.details = info[0];
    } else {
        presenceData.details = Info;
    }
    
    presenceData.smallImageKey = video.paused ? "pause" : "play";
    presenceData.smallImageText = video.paused ? (await strings).pause : (await strings).play;

    if (!video.paused) {
        presenceData.startTimestamp = timestamps[0];
        presenceData.endTimestamp = timestamps[1];
    } else {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
    }
    
    presence.setActivity(presenceData);
});