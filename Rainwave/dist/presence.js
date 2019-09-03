var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "618233809481236491",
    mediaKeys: false
});
timeElapsed = Math.floor(Date.now() / 1000);
strings = presence.getStrings({
    live: "presence.activity.live",
    pause: "presence.playback.paused"
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if (document.location.pathname.startsWith("/pages/playback_history")) {
        let presenceData = {
            details: "Looking at playback history...",
            largeImageKey: "rainwv"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/forums")) {
        let presenceData = {
            details: "Browsing the forums...",
            largeImageKey: "rainwv"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/api4")) {
        let presenceData = {
            details: "Looking at the API...",
            largeImageKey: "rainwv"
        };
        presence.setActivity(presenceData);
    }
    else {
        stationName = document.querySelector("a.station.selected_station > div.station_details > div.station_name");
        songName = document.querySelector("div.song.now_playing > div.song_content > div.title");
        artistName = document.querySelector("div.song.now_playing > div.song_content > div.artist");
        playCheck = document.querySelector("div#r4_audio_player.unselectable.playing");
        if (playCheck == null) {
            let presenceData = {
                details: "Not listening.",
                largeImageKey: "rainwv",
                smallImageKey: "pause"
            };
            presence.setActivity(presenceData);
        }
        else {
            let presenceData = {
                details: songName.innerText + " by " + artistName.innerText,
                state: "Listening on " + stationName.textContent,
                largeImageKey: "rainwv",
                smallImageKey: "live",
                startTimestamp: timeElapsed
            };
            presence.setActivity(presenceData);
        }
        ;
    }
    ;
}));
