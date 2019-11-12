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
    clientId: `633637979952250881`
}), { pathname } = window.location, { hostname } = window.location, startTimestamp = Math.floor(Date.now() / 1000);
let episode, current, duration, paused, played;
presence.on("iFrameData", data => {
    current = data.current;
    duration = data.duration;
    paused = data.paused;
    played = data.played;
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    const strings = yield presence.getStrings({
        playing: "presence.playback.playing",
        paused: "presence.playback.paused",
        browsing: "presence.activity.browsing"
    });
    const presenceData = {
        largeImageKey: "animedao_lg"
    };
    if (hostname === `animedao26.stream` || hostname === `animedao28.stream`) {
        const title = document.querySelector('h2').textContent.trim();
        if ((episode = title.match(/\WEpisode\W\d{1,3}/)) != null) {
            presenceData.details = title.replace(episode[0], '');
            presenceData.state = `${episode[0]} - ${document.querySelector(`h4`).textContent}`;
        }
        else {
            presenceData.details = title;
        }
        if (played) {
            if (!paused) {
                const timestamps = getTimestamps(current, duration);
                presenceData.startTimestamp = timestamps[0];
                presenceData.endTimestamp = timestamps[1];
            }
            presenceData.smallImageKey = paused ? "pause" : "play";
            presenceData.smallImageText = paused ? (yield strings).paused : (yield strings).playing;
        }
    }
    else if (hostname === `animedao.com`) {
        presenceData.startTimestamp = startTimestamp;
        if (pathname === `/`) {
            presenceData.details = (yield strings).browsing;
        }
        else if (pathname.startsWith(`/animelist`)) {
            presenceData.details = `Viewing the Animelist`;
        }
        else if (pathname.startsWith(`/genre`)) {
            const genre = document.querySelector(`h2`).textContent.trim();
            presenceData.details = `Viewing genres`;
            if (pathname !== `/genre`) {
                presenceData.state = `${genre.replace(genre.match(/Genre\W-\W/)[0], ``)}`;
            }
        }
        else if (pathname.startsWith(`/popular-anime`)) {
            presenceData.details = `Viewing popular anime`;
        }
        else if (pathname.startsWith(`/anime`)) {
            const title = document.querySelector(`h2`);
            presenceData.details = `Viewing an anime`;
            presenceData.state = `${title ? title.textContent.trim() : undefined}`;
        }
        else if (pathname.startsWith(`/search`)) {
            presenceData.details = `Searching`;
            presenceData.smallImageKey = `search`;
            presenceData.smallImageText = `Searching`;
        }
    }
    presence.setActivity(presenceData, true);
}));
function getTimestamps(curr, dura) {
    let startTime = Math.floor(Date.now() / 1000), duration = Math.floor(startTime - curr + dura);
    return [startTime, duration];
}
