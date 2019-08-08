var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var presence = new Presence({
    clientId: "607651992567021580",
    mediaKeys: true
});
var strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
});
var live, prevLive, elapsed;
presence.on("UpdateData", function () { return __awaiter(_this, void 0, void 0, function () {
    var player, player_button, player_button_aria, paused, on_air, title, author, audioTime, audioDuration, timestamps, title, author, timestamps, data, _a, _b, _c, details, state, header, playlist, album, artist, podcast;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                player = document.querySelector(".page-player");
                if (!player) return [3 /*break*/, 7];
                player_button = document.querySelector(".svg-icon-group-item:nth-child(3)");
                player_button_aria = player_button.getAttribute("aria-label");
                paused = document.querySelector(".svg-icon-group-item:nth-child(3) .svg-icon-pause") === null;
                on_air = document.querySelector(".track-label");
                if (on_air && on_air.textContent == "ON AIR") {
                    live = true;
                    if (prevLive !== live) {
                        prevLive = live;
                        elapsed = Math.floor(Date.now() / 1000);
                    }
                }
                else {
                    live = false;
                }
                if (!live) {
                    title = document.querySelector(".track-link:nth-child(1)")
                        .textContent;
                    author = document.querySelector(".track-link:nth-child(2)")
                        .textContent;
                    audioTime = document.querySelector(".slider-counter-current")
                        .textContent;
                    audioDuration = document.querySelector(".slider-counter-max")
                        .textContent;
                    timestamps = getTimestamps(audioTime, audioDuration);
                }
                else {
                    title = document.querySelector(".marquee-content").textContent;
                    author = "On Air";
                    timestamps = [elapsed, undefined];
                }
                _a = {
                    details: title,
                    state: author,
                    largeImageKey: "deezer",
                    smallImageKey: paused ? "pause" : "play"
                };
                if (!paused) return [3 /*break*/, 2];
                return [4 /*yield*/, strings];
            case 1:
                _b = (_d.sent()).pause;
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, strings];
            case 3:
                _b = (_d.sent()).play;
                _d.label = 4;
            case 4:
                data = (_a.smallImageText = _b,
                    _a.startTimestamp = timestamps[0],
                    _a.endTimestamp = timestamps[1],
                    _a);
                if (!live) return [3 /*break*/, 6];
                data.smallImageKey = "live";
                _c = data;
                return [4 /*yield*/, strings];
            case 5:
                _c.smallImageText = (_d.sent()).live;
                _d.label = 6;
            case 6:
                if (paused) {
                    delete data.startTimestamp;
                    delete data.endTimestamp;
                }
                if (timestamps[0] === timestamps[1]) {
                    details = "Browsing...";
                    state = undefined;
                    header = document.querySelector("div.header-infos.ellipsis > h1");
                    playlist = document.querySelector("#page_naboo_playlist");
                    if (playlist) {
                        details = "Viewing Playlist";
                    }
                    album = document.querySelector("#page_naboo_album");
                    if (album) {
                        details = "Viewing Album";
                    }
                    artist = document.querySelector("#page_naboo_artist");
                    if (artist) {
                        details = "Viewing Artist";
                    }
                    podcast = document.querySelector("#page_naboo_podcast");
                    if (podcast) {
                        details = "Viewing Podcast";
                    }
                    if (header) {
                        state = header.textContent;
                    }
                    presence.setActivity({
                        details: details,
                        state: state,
                        largeImageKey: "deezer"
                    }, true);
                }
                else if (title !== null && author !== null) {
                    presence.setActivity(data, !paused);
                }
                return [3 /*break*/, 8];
            case 7:
                presence.clearActivity();
                _d.label = 8;
            case 8: return [2 /*return*/];
        }
    });
}); });
presence.on("MediaKeys", function (key) {
    switch (key) {
        case "pause":
            var pause_button = document.querySelector(".svg-icon-group-item:nth-child(3)");
            pause_button.click();
            break;
        case "nextTrack":
            var next_button = document.querySelector(".svg-icon-group-item:nth-child(5)");
            next_button.click();
            break;
        case "previousTrack":
            var prev_button = document.querySelector(".svg-icon-group-item:nth-child(1)");
            prev_button.click();
            break;
    }
});
function getTimestamps(audioTime, audioDuration) {
    var splitAudioTime = audioTime.split(":");
    var splitAudioDuration = audioDuration.split(":");
    var parsedAudioTime = parseInt(splitAudioTime[0]) * 60 + parseInt(splitAudioTime[1]);
    var parsedAudioDuration = parseInt(splitAudioDuration[0]) * 60 + parseInt(splitAudioDuration[1]);
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - parsedAudioTime + parsedAudioDuration;
    return [Math.floor(startTime / 1000), endTime];
}
