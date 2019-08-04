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
    clientId: "607362931180699648",
    mediaKeys: true
});
var strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
});
var live, elapsed, oldUrl;
presence.on("UpdateData", function () { return __awaiter(_this, void 0, void 0, function () {
    var video, title, streamer, timestamps, data, _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                video = document.querySelector("body > b-app > div > b-channel-page-wrapper > b-channel-web-page > div > section > div > b-stage > div.arrangement-container > b-stage-arrangement > div > b-player > light-player > light-player-projector > video");
                if (video) {
                    live = true;
                }
                else {
                    video = document.querySelector("body > b-app > div > b-channel-page-wrapper > b-channel-web-page > div > section > div > b-recording-stage > b-player > light-player > light-player-projector > video");
                    live = false;
                }
                if (oldUrl !== window.location.href) {
                    oldUrl = window.location.href;
                    elapsed = Math.floor(Date.now() / 1000);
                }
                if (!(video && !isNaN(video.duration))) return [3 /*break*/, 7];
                title = document.querySelector("body > b-app > div > b-channel-page-wrapper > b-channel-web-page > div > section > b-channel-profile > div.channel-info-container > b-channel-info-bar > div > div > div.title.layout-column > b-truncated-text > div").firstChild.textContent;
                streamer = document.querySelector("body > b-app > div > b-channel-page-wrapper > b-channel-web-page > div > section > b-channel-profile > div.layout-row.layout-align-space-between-start.profile-header > div:nth-child(1) > div > div.layout-row.layout-align-start-center > h2").firstChild.textContent;
                timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
                _a = {
                    details: title,
                    state: streamer,
                    largeImageKey: "mixer",
                    smallImageKey: video.paused ? "pause" : "play"
                };
                if (!video.paused) return [3 /*break*/, 2];
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
                presence.setTrayTitle(video.paused ? "" : title);
                if (!(video.paused || live)) return [3 /*break*/, 6];
                delete data.startTimestamp;
                delete data.endTimestamp;
                if (!live) return [3 /*break*/, 6];
                data.smallImageKey = "live";
                _c = data;
                return [4 /*yield*/, strings];
            case 5:
                _c.smallImageText = (_d.sent()).live;
                data.startTimestamp = elapsed;
                _d.label = 6;
            case 6:
                if (video && title !== null && streamer !== null) {
                    presence.setActivity(data, !video.paused);
                }
                return [3 /*break*/, 8];
            case 7:
                presence.clearActivity();
                presence.setTrayTitle();
                _d.label = 8;
            case 8: return [2 /*return*/];
        }
    });
}); });
presence.on("MediaKeys", function (key) {
    switch (key) {
        case "pause":
            var video = document.querySelector("body > b-app > div > b-channel-page-wrapper > b-channel-web-page > div > section > div > b-stage > div.arrangement-container > b-stage-arrangement > div > b-player > light-player > light-player-projector > video");
            video.paused ? video.play() : video.pause();
            break;
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
