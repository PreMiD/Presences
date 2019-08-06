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
    clientId: "607754656453623843",
    mediaKeys: true
});
var strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
});
var title, streamer, largeImage = "twitch", smallImageKey, smallImageText, videoTime, videoDuration, live, elapsed, oldURL, type, logging = false;
presence.on("UpdateData", function () { return __awaiter(_this, void 0, void 0, function () {
    var elements, video, squad, users, user_path, index, _a, timestamps, _b, timestamps, location, user, user_header, game, data, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                elements = {
                    squad: {
                        users: document.querySelector("div.tw-align-items-center.tw-flex.tw-flex-row.tw-mg-l-1.tw-pd-l-05 > div.tw-align-items-center.tw-flex.tw-mg-l-1"),
                        user: function (index) {
                            return document.querySelector("div:nth-child(" + index + ") > div > div.tw-absolute.tw-balloon.tw-balloon--down.tw-hide > div > div > div > div.tw-flex.tw-flex-column.tw-flex-grow-1.tw-pd-b-1.tw-pd-t-4.tw-pd-x-1 > div.tw-align-center.tw-flex.tw-flex-column.tw-justify-content-center > p > a");
                        }
                    },
                    live: {
                        title: document.querySelector("div.tw-flex.tw-justify-content-between.tw-mg-b-05 > h2"),
                        streamer: document.querySelector("div.channel-header__banner-toggle.channel-header__user.channel-header__user--selected.tw-align-items-center.tw-flex.tw-flex-nowrap.tw-flex-shrink-0.tw-pd-r-2.tw-pd-y-05 > div > h5")
                    },
                    video: {
                        title: document.querySelector("div.tw-mg-b-05 > p"),
                        streamer: document.querySelector("a.channel-header__user.tw-align-items-center.tw-flex.tw-flex-nowrap.tw-flex-shrink-0.tw-interactive.tw-link.tw-link--hover-underline-none.tw-pd-r-2.tw-pd-y-05 > div > h5"),
                        time: document.querySelector("div.player-seek__time-container > span:nth-child(1)"),
                        duration: document.querySelector("span.player-seek__time.player-seek__time--total")
                    },
                    clip: {
                        title: document.querySelector("span.tw-ellipsis.tw-font-size-5.tw-strong"),
                        streamer: document.querySelector("a.channel-header__user.tw-align-items-center.tw-flex.tw-flex-nowrap.tw-flex-shrink-0.tw-interactive.tw-link.tw-link--hover-underline-none.tw-pd-r-2.tw-pd-y-05 > div > h5")
                    }
                };
                if (window.location.href !== oldURL) {
                    oldURL = window.location.href;
                    elapsed = Math.floor(Date.now() / 1000);
                }
                video = document.querySelector("div.player-video > video");
                squad = document.querySelector("div.squad-stream-top-bar__container.tw-align-items-center.tw-c-background-base.tw-flex.tw-flex-shrink-0.tw-relative");
                if (squad) {
                    type = "squad";
                }
                else if (elements.live.title) {
                    type = "live";
                }
                else if (elements.video.title) {
                    type = "video";
                }
                else if (elements.clip.title) {
                    type = "clip";
                }
                else {
                    type = "browsing";
                }
                if (logging) {
                    console.log("Type: " + type);
                    console.log("Video Time: " + (video ? video.currentTime : 0));
                    console.log("Video Duration: " + (video ? video.duration : 0));
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 17, , 18]);
                if (!(type === "squad")) return [3 /*break*/, 3];
                users = [];
                user_path = elements.squad.users;
                for (index = 1; index <= user_path.children.length; index++) {
                    users = users.concat(elements.squad.user(index).textContent);
                }
                title = "Squad Stream";
                streamer = users.join(", ");
                smallImageKey = "live";
                return [4 /*yield*/, strings];
            case 2:
                smallImageText = (_c.sent()).live;
                videoTime = elapsed;
                videoDuration = undefined;
                return [3 /*break*/, 16];
            case 3:
                if (!(type === "live")) return [3 /*break*/, 5];
                title = elements.live.title.textContent;
                streamer = elements.live.streamer.textContent;
                smallImageKey = "live";
                return [4 /*yield*/, strings];
            case 4:
                smallImageText = (_c.sent()).live;
                videoTime = elapsed;
                videoDuration = undefined;
                return [3 /*break*/, 16];
            case 5:
                if (!(type === "video")) return [3 /*break*/, 10];
                title = elements.video.title.textContent;
                streamer = elements.video.streamer.textContent;
                smallImageKey = video.paused ? "pause" : "play";
                if (!video.paused) return [3 /*break*/, 7];
                return [4 /*yield*/, strings];
            case 6:
                _a = (_c.sent()).pause;
                return [3 /*break*/, 9];
            case 7: return [4 /*yield*/, strings];
            case 8:
                _a = (_c.sent()).play;
                _c.label = 9;
            case 9:
                smallImageText = _a;
                timestamps = getElementTimestamps(elements.video.time.textContent, elements.video.duration.textContent);
                videoTime = timestamps[0];
                videoDuration = timestamps[1];
                return [3 /*break*/, 16];
            case 10:
                if (!(type === "clip")) return [3 /*break*/, 15];
                title = elements.clip.title.textContent;
                streamer = elements.clip.streamer.textContent;
                smallImageKey = video.paused ? "pause" : "play";
                if (!video.paused) return [3 /*break*/, 12];
                return [4 /*yield*/, strings];
            case 11:
                _b = (_c.sent()).pause;
                return [3 /*break*/, 14];
            case 12: return [4 /*yield*/, strings];
            case 13:
                _b = (_c.sent()).play;
                _c.label = 14;
            case 14:
                smallImageText = _b;
                timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
                videoTime = timestamps[0];
                videoDuration = timestamps[1];
                return [3 /*break*/, 16];
            case 15:
                if (type === "browsing") {
                    location = window.location.pathname;
                    title = "Browsing";
                    streamer = "Home";
                    smallImageKey = undefined;
                    smallImageText = undefined;
                    videoTime = undefined;
                    videoDuration = undefined;
                    user = location.match("/(\\S*)/(\\S*)");
                    user_header = document.querySelector("a.channel-header__user.tw-align-items-center.tw-flex.tw-flex-nowrap.tw-flex-shrink-0.tw-interactive.tw-link.tw-link--hover-underline-none.tw-pd-r-2.tw-pd-y-05");
                    if (user && user_header) {
                        title = "Browsing";
                        streamer = user[1] + "'s " + user[2];
                    }
                    if (location.match("/directory")) {
                        title = "Browsing";
                        streamer = "All";
                    }
                    if (location.match("/directory/following")) {
                        title = "Browsing Followers";
                        streamer = "Overview";
                    }
                    if (location.match("/directory/following/live")) {
                        streamer = "Channels";
                    }
                    if (location.match("/directory/following/hosts")) {
                        streamer = "Hosts";
                    }
                    if (location.match("/directory/following/games")) {
                        streamer = "Categories";
                    }
                    if (location.match("/directory/game")) {
                        game = document.querySelector("div.tw-flex.tw-justify-content-between.tw-mg-b-1.tw-relative > h1").textContent;
                        title = "Browsing Game";
                        if (game)
                            streamer = game;
                    }
                }
                _c.label = 16;
            case 16:
                data = {
                    details: title,
                    state: streamer,
                    largeImageKey: largeImage,
                    smallImageKey: smallImageKey,
                    smallImageText: smallImageText,
                    startTimestamp: videoTime,
                    endTimestamp: videoDuration
                };
                if (video && video.paused) {
                    delete data.startTimestamp;
                    delete data.endTimestamp;
                }
                if (title !== null && streamer !== null) {
                    presence.setActivity(data, video ? !video.paused : true);
                    presence.setTrayTitle(data.title);
                }
                return [3 /*break*/, 18];
            case 17:
                error_1 = _c.sent();
                return [3 /*break*/, 18];
            case 18: return [2 /*return*/];
        }
    });
}); });
presence.on("MediaKeys", function (key) {
    switch (key) {
        case "pause":
            var pause = document.querySelector("div.player-buttons-left > button");
            if (pause)
                pause.click();
            break;
    }
});
function hub() {
    var details = "Browsing";
    var state = undefined;
    var location = window.location.pathname;
    if (location.match("/directory")) {
        details = "Browsing";
        state = "All";
    }
    if (location.match("/directory/following")) {
        details = "Browsing Followers";
        state = "Overview";
    }
    if (location.match("/directory/following/live")) {
        state = "Channels";
    }
    if (location.match("/directory/following/hosts")) {
        state = "Hosts";
    }
    if (location.match("/directory/following/games")) {
        state = "Categories";
    }
    if (location.match("/directory/game")) {
        var game = document.querySelector("div.tw-flex.tw-justify-content-between.tw-mg-b-1.tw-relative > h1").textContent;
        details = "Browsing Game";
        if (game)
            state = game;
    }
    /*
    var user = location.match("/(\\S*)/(\\S*)");
    var user_header = document.querySelector(
      "a.channel-header__user.tw-align-items-center.tw-flex.tw-flex-nowrap.tw-flex-shrink-0.tw-interactive.tw-link.tw-link--hover-underline-none.tw-pd-r-2.tw-pd-y-05"
    );
    if (user && user_header) {
      details = "Browsing";
      state = user[1] + "'s " + user[2];
    }
    */
    presence.setActivity({
        details: details,
        state: state,
        largeImageKey: "twitch"
    }, true);
}
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
function getElementTimestamps(audioTime, audioDuration) {
    var splitAudioTime = audioTime.split(":").reverse();
    var splitAudioDuration = audioDuration.split(":").reverse();
    var parsedAudioTime = getTime(splitAudioTime);
    var parsedAudioDuration = getTime(splitAudioDuration);
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - parsedAudioTime + parsedAudioDuration;
    return [Math.floor(startTime / 1000), endTime];
}
function getTime(list) {
    var ret = 0;
    for (var index = list.length - 1; index >= 0; index--) {
        ret += parseInt(list[index]) * Math.pow(60, index);
    }
    return ret;
}
