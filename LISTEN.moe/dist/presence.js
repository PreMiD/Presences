var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let presence = new Presence({
    clientId: "615652705565933581"
}), path, startTimestamp, audio = document.querySelector('audio'), playback, elemt, artists = [], user, track, artist, strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
}), presenceData = {
    largeImageKey: "listen_moe_lg"
};
function resetTimestamp() {
    startTimestamp = Math.floor(Date.now() / 1000);
}
function getArtists() {
    artists = [];
    elemt = document.querySelector('span.ja.player-song-artist-container') ? document.querySelector('span.ja.player-song-artist-container').childNodes : undefined;
    if (elemt != undefined) {
        for (let i = 0; i < elemt.length; i++) {
            artists.push(elemt[i].textContent.replace(/\s+/g, ' ').trim());
        }
        ;
        artist = artists.join(' ');
    }
    return artist;
}
function getTrack() {
    track = document.querySelector('span.ja.player-song-title') ? document.querySelector('span.ja.player-song-title').textContent.replace(/\s+/g, ' ').trim().split('[')[0].trim() : "Loading...";
    return track;
}
audio.onplay = resetTimestamp();
audio.onpause = resetTimestamp();
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    path = window.location.pathname;
    playback = !audio.paused;
    if (playback) {
        presenceData.details = getTrack();
        presenceData.state = getArtists();
        presenceData.smallImageKey = "live";
        presenceData.smallImageText = (yield strings).live;
        presenceData.startTimestamp = startTimestamp;
    }
    else if (path.includes('music')) {
        track = document.querySelectorAll('input.search')[1].value;
        track = track == "" ? undefined : track;
        presenceData.details = "Searching for a music";
        presenceData.state = track;
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "Searching";
        presenceData.startTimestamp = startTimestamp;
    }
    else if (path.includes('u')) {
        user = document.querySelector('div.profileName > span').textContent;
        presenceData.details = "Viewing " + user + "'s profile";
        if (path.includes('favorites')) {
            presenceData.state = "Favorites";
        }
        else if (path.includes('uploads')) {
            presenceData.state = "Uploads";
        }
        else {
            delete presenceData.state;
        }
        presenceData.startTimestamp;
        delete presenceData.smallImageKey, presenceData.smallImageText;
    }
    else {
        presenceData.details = "Not playing";
        presenceData.state = "Home";
        delete presenceData.smallImageKey, presenceData.smallImageText;
    }
    presence.setActivity(presenceData, true);
}));
