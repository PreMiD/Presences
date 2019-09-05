var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const presence = new Presence({
    clientId: "612746548631044116",
    mediaKeys: false
});
const startTimestamp = Math.floor(Date.now() / 1000);
const stringsPromise = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    const presenceData = {
        largeImageKey: "lg"
    };
    const musicTitleElement = document.querySelector("#jp_container_1 > div.wrapper > footer > div.jp-controls > div.btn-music-container > div:nth-child(1) > div.song-title.overflow");
    const musicTitle = musicTitleElement.innerText;
    const currentArtistElement = document.querySelector("#jp_container_1 > div.wrapper > footer > div.jp-controls > div.btn-music-container > div:nth-child(1) > div:nth-child(2) > a.song-artist.menu-item");
    let currentArtist = currentArtistElement.innerText;
    if (currentArtist.length === 0) {
        currentArtist = "No artist";
    }
    const albumNameElement = document.querySelector("footer > div.jp-controls > div.btn-music-container > div:nth-child(1) > div:nth-child(2) > a.song-album.menu-item");
    let albumName = albumNameElement.innerText;
    if (albumName.length === 0) {
        albumName = "No album";
    }
    if (musicTitle.length > 1) {
        const play = document.querySelector("footer > div.jp-controls > div.btn-music-container > div:nth-child(2) > a.jp-play.btn.btn-music.btn-sm");
        const currentTimeElement = document.querySelector("#jp_container_1 > div.wrapper > footer > div.jp-controls > div.btn-music-container > div.hidden-xs > span.jp-current-time");
        const currentTime = getSeconds(currentTimeElement.innerText);
        const durationElement = document.querySelector("#jp_container_1 > div.wrapper > footer > div.jp-controls > div.btn-music-container > div.hidden-xs > span.jp-duration");
        const duration = getSeconds(durationElement.innerText);
        const playback = !(!play.style.display || currentTime == 0);
        const timestamps = getTimestamps(currentTime, duration);
        const strings = yield stringsPromise;
        if (!playback) {
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
        }
        presenceData.details = "Song: " + musicTitle;
        presenceData.smallImageKey = playback ? "play" : "pause";
        presenceData.smallImageText = strings[playback ? "play" : "pause"];
        presenceData.state = `${currentArtist} / ${albumName}`;
    }
    else {
        const currentUserElement = document.querySelector("#jp_container_1 > div.wrapper > aside.main-sidebar > section > div > div.pull-left.info > p");
        presenceData.details = "No music playing.";
        presenceData.state = `Logged in user: ${currentUserElement === null ? "unknown" : currentUserElement.innerText}`;
    }
    presence.setActivity(presenceData, true);
}));
function getTimestamps(videoTime, videoDuration) {
    const startTime = Date.now();
    const endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
function getSeconds(string) {
    const [minutesStr, secondsStr] = string.split(":");
    return Math.floor(Number(minutesStr) * 60) + Number(secondsStr);
}
