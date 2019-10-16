var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }
    return new(P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }

        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }

        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const presence = new Presence({
        clientId: "633985961604415519"
    }),
    strings = presence.getStrings({
        play: "presence.playback.playing",
        pause: "presence.playback.paused"
    });


presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    const player = document.querySelector("#audio-player_html5_api"),
        playing = player ? player.paused ? false : true : false;

    let data = {
        largeImageKey: "fizy-logo"
    }

    const songName = document.querySelector("body > div.main-wrapper.ng-scope > ui-view > main > div > media-player > div > div.player > div.player__wrapper > div.player__metadata > div > div.player__media-name.radio__media-name > a"),
        artistName = document.querySelector("body > div.main-wrapper.ng-scope > ui-view > main > div > media-player > div > div.player > div.player__wrapper > div.player__metadata > div > div.player__media-artists > a"),
        timestamps = player ? getTimestamps(Math.floor(player.currentTime), Math.floor(player.duration)) : null;

    if (songName && songName.textContent != "" && artistName && artistName.textContent != "") {
        data.details = songName.textContent;
        data.state = artistName.textContent.trim();

        if (playing && timestamps && !isNaN(timestamps[0]) && !isNaN(timestamps[1])) {
            data.startTimestamp = timestamps[0];
            data.endTimestamp = timestamps[1];
        } else if (!playing) {
            delete data.startTimestamp;
            delete data.endTimestamp;
        }

        data.smallImageText = playing ? (yield strings).play : (yield strings).pause;
        playing ? data.smallImageKey = "play" : data.smallImageKey = "pause";

        presence.setTrayTitle(songName.textContent);
        presence.setActivity(data);
    }
}));

function getTimestamps(videoTime, videoDuration) {
    const startTime = Date.now(),
        endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;

    return [Math.floor(startTime / 1000), endTime];
}