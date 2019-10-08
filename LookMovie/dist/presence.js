var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
    clientId: "630349560501370900",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
});
presence.on("UpdateData", function () { return __awaiter(_this, void 0, void 0, function () {
    var data, video, timestamps, _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                data = {
                    largeImageKey: "lm"
                };
                video = document.querySelector("#video_player_html5_api");
                if (!(video != null && !isNaN(video.duration))) return [3 /*break*/, 5];
                timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
                if (document.location.pathname.includes("/shows/view")) {
                    data.details = document.querySelector(".watch-heading > h1 > span").previousSibling.textContent + "(" + document.querySelector(".watch-heading > h1 > span").textContent + ")";
                    data.state = document.querySelector(".seasons-switcher > span").textContent + " " + document.querySelector(".episodes-switcher > span").textContent;
                }
                else if (document.location.pathname.includes("/movies/view")) {
                    data.details = document.querySelector(".watch-heading > h1 > span").previousSibling.textContent;
                    data.state = document.querySelector(".watch-heading > h1 > span").textContent;
                }
                data.smallImageKey = video.paused ? "pause" : "play";
                _a = data;
                if (!video.paused) return [3 /*break*/, 2];
                return [4 /*yield*/, strings];
            case 1:
                _b = (_e.sent()).pause;
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, strings];
            case 3:
                _b = (_e.sent()).play;
                _e.label = 4;
            case 4:
                _a.smallImageText = _b,
                    data.startTimestamp = timestamps[0],
                    data.endTimestamp = timestamps[1];
                if (video.paused) {
                    delete data.startTimestamp;
                    delete data.endTimestamp;
                }
                presence.setActivity(data, !video.paused);
                return [3 /*break*/, 8];
            case 5:
                _c = data;
                return [4 /*yield*/, strings];
            case 6:
                _c.details = (_e.sent()).browsing;
                data.smallImageKey = "search";
                _d = data;
                return [4 /*yield*/, strings];
            case 7:
                _d.smallImageText = (_e.sent()).browsing;
                presence.setActivity(data);
                _e.label = 8;
            case 8: return [2 /*return*/];
        }
    });
}); });
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
