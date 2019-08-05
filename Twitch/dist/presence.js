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
var live, elapsed, oldURL;
presence.on("UpdateData", function () { return __awaiter(_this, void 0, void 0, function () {
    var video, live_indicator, title, streamer, timestamps, title, streamer, timestamps, data, _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                video = document.querySelector("#root > div > div.tw-flex.tw-flex-column.tw-flex-nowrap.tw-full-height > div > main > div.root-scrollable.scrollable-area.scrollable-area--suppress-scroll-x > div.simplebar-scroll-content > div > div > div.persistent-player.tw-border-radius-none > div > div.video-player.video-player--logged-in > div > div.player-video > video");
                live_indicator = document.querySelector("#root > div > div.tw-flex.tw-flex-column.tw-flex-nowrap.tw-full-height > div > main > div:nth-child(1) > div > div.tw-flex.tw-flex-nowrap.tw-full-height.tw-justify-content-between.tw-mg-x-3 > div.tw-align-items-stretch.tw-flex.tw-flex-nowrap.tw-flex-shrink-0 > div.channel-header__banner-toggle.channel-header__user.channel-header__user--selected.tw-align-items-center.tw-flex.tw-flex-nowrap.tw-flex-shrink-0.tw-pd-r-2.tw-pd-y-05 > div > div.tw-mg-l-1 > div > div.tw-align-center.tw-border-radius-small.tw-c-text-overlay.tw-channel-status-text-indicator.tw-font-size-6.tw-inline-block.tw-pd-x-05 > p");
                if (live_indicator) {
                    live = true;
                }
                else {
                    live = false;
                }
                if (window.location.href !== oldURL) {
                    oldURL = window.location.href;
                    elapsed = Math.floor(Date.now() / 1000);
                }
                if (!(video && !isNaN(video.duration))) return [3 /*break*/, 8];
                if (!live) {
                    title = document.querySelector("#root > div > div.tw-flex.tw-flex-column.tw-flex-nowrap.tw-full-height > div > main > div.root-scrollable.scrollable-area.scrollable-area--suppress-scroll-x > div.simplebar-scroll-content > div > div > div.channel-root.tw-full-height > div.channel-root__player-container.tw-pd-b-2 > div > div.tw-c-background-base.tw-elevation-1 > div > div.tw-flex-grow-1.tw-full-height.tw-pd-x-1.tw-pd-y-1.video-description__info-container > div > div > div.video-info__container > div.tw-mg-b-05 > p");
                    streamer = document.querySelector("#root > div > div.tw-flex.tw-flex-column.tw-flex-nowrap.tw-full-height > div > main > div:nth-child(1) > div > div.tw-flex.tw-flex-nowrap.tw-full-height.tw-justify-content-between.tw-mg-x-3 > div.tw-align-items-stretch.tw-flex.tw-flex-nowrap.tw-flex-shrink-0 > a.channel-header__user.tw-align-items-center.tw-flex.tw-flex-nowrap.tw-flex-shrink-0.tw-interactive.tw-link.tw-link--hover-underline-none.tw-pd-r-2.tw-pd-y-05 > div > h5");
                    timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
                }
                else {
                    title = document.querySelector("#root > div > div.tw-flex.tw-flex-column.tw-flex-nowrap.tw-full-height > div > main > div.root-scrollable.scrollable-area.scrollable-area--suppress-scroll-x > div.simplebar-scroll-content > div > div > div.channel-root.tw-full-height > div.channel-root__player-container.tw-pd-b-2 > div > div.channel-info-bar.tw-border-b.tw-border-bottom-left-radius-large.tw-border-bottom-right-radius-large.tw-border-l.tw-border-r.tw-border-t.tw-flex.tw-flex-wrap.tw-justify-content-between.tw-lg-pd-b-0.tw-lg-pd-t-1.tw-lg-pd-x-1.tw-pd-1 > div > div > div > div.channel-info-bar__content-right.tw-full-width > div.tw-flex.tw-justify-content-between.tw-mg-b-05 > h2");
                    streamer = document.querySelector("#root > div > div.tw-flex.tw-flex-column.tw-flex-nowrap.tw-full-height > div > main > div:nth-child(1) > div > div.tw-flex.tw-flex-nowrap.tw-full-height.tw-justify-content-between.tw-mg-x-3 > div.tw-align-items-stretch.tw-flex.tw-flex-nowrap.tw-flex-shrink-0 > div.channel-header__banner-toggle.channel-header__user.channel-header__user--selected.tw-align-items-center.tw-flex.tw-flex-nowrap.tw-flex-shrink-0.tw-pd-r-2.tw-pd-y-05 > div > h5");
                    timestamps = [elapsed, undefined];
                }
                _a = {
                    details: title.textContent,
                    state: streamer.textContent,
                    largeImageKey: "twitch",
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
                if (!live) return [3 /*break*/, 6];
                data.smallImageKey = "live";
                _c = data;
                return [4 /*yield*/, strings];
            case 5:
                _c.smallImageText = (_d.sent()).live;
                return [3 /*break*/, 7];
            case 6:
                if (video.paused) {
                    delete data.startTimestamp;
                    delete data.endTimestamp;
                }
                _d.label = 7;
            case 7:
                if (title !== null && streamer !== null) {
                    presence.setActivity(data, !video.paused);
                    presence.setTrayTitle(data.title);
                }
                return [3 /*break*/, 9];
            case 8:
                hub();
                _d.label = 9;
            case 9: return [2 /*return*/];
        }
    });
}); });
presence.on("MediaKeys", function (key) {
    switch (key) {
        case "pause":
            var pause = document.querySelector("#default-player > div > div.hover-display.pl-hover-transition-in > div > div.pl-controls-bottom.pl-flex.qa-controls-bottom > div.player-buttons-left > button");
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
        var game = document.querySelector("#root > div > div.tw-flex.tw-flex-column.tw-flex-nowrap.tw-full-height > div > main > div.root-scrollable.scrollable-area.scrollable-area--suppress-scroll-x > div.simplebar-scroll-content > div > div > div > div.directory-header-new__banner-cover.tw-overflow-hidden.tw-relative > div.tw-bottom-0.tw-left-0.tw-mg-b-2.tw-mg-t-3.tw-mg-x-3.tw-right-0 > div > div.tw-flex.tw-flex-column.tw-full-width.tw-justify-content-center > div.tw-flex.tw-justify-content-between.tw-mg-b-1.tw-relative > h1").textContent;
        details = "Browsing Game";
        if (game)
            state = game;
    }
    var user = location.match("/(\\S*)/(\\S*)");
    if (user) {
        details = "Browsing";
        state = user[1] + "'s " + user[2];
    }
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
