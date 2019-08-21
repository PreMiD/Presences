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
    clientId: "613628090219757599",
    mediaKeys: false
});
timeElapsed = Math.floor(Date.now() / 1000);
strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
presence.on("UpdateData", function () { return __awaiter(_this, void 0, void 0, function () {
    var presenceData, presenceData, presenceData, presenceData, presenceData, presenceData;
    return __generator(this, function (_a) {
        if (document.location.pathname == ("/player")) {
            otherListeners = document.querySelector("html > body > #playerContent > #about > div > div.col-sm-12 > h4 > small");
            if (document.querySelector("html > body > #playerContent > #about > div.row > div.col-sm-12 > div.sm2-bar-ui.textured.full-width.playing") == null) {
                stationStatus = "Paused on PVFM One",
                    listeningCheck = "No";
            }
            else {
                stationStatus = "Listening on PVFM One with" + otherListeners.innerText + " others",
                    listeningCheck = "Yes";
            }
            ;
            onAir = document.querySelector("html > body > div#playerContent.content > div#about.container.ng-scope > div.row > div.col-sm-12 > h3#mane_onair.ng-binding");
            if (listeningCheck == "No") {
                presenceData = {
                    details: stationStatus,
                    largeImageKey: "pvfm",
                    smallImageKey: "pause"
                };
            }
            else {
                presenceData = {
                    details: stationStatus,
                    state: "On air: " + onAir.innerText,
                    largeImageKey: "pvfm",
                    smallImageKey: "play",
                    startTimestamp: timeElapsed
                };
            }
            ;
        }
        ;
        if (document.location.pathname == ("/player/two")) {
            otherListeners = document.querySelector("html > body > #playerContent > #about > div > div.col-sm-12 > h4 > small");
            if (document.querySelector("html > body > #playerContent > #about > div.row > div.col-sm-12 > div.sm2-bar-ui.textured.full-width.playing") == null) {
                stationStatus = "Paused on PVFM Two",
                    listeningCheck = "No";
            }
            else {
                stationStatus = "Listening on PVFM Two with" + otherListeners.innerText + " others",
                    listeningCheck = "Yes";
            }
            ;
            onAir = document.querySelector("html > body > div#playerContent.content > div#about.container.ng-scope > div.row > div.col-sm-12 > h3");
            if (listeningCheck == "No") {
                presenceData = {
                    details: stationStatus,
                    largeImageKey: "pvfm",
                    smallImageKey: "pause"
                };
            }
            else {
                presenceData = {
                    details: stationStatus,
                    state: "On air: " + onAir.innerText,
                    largeImageKey: "pvfm",
                    smallImageKey: "play",
                    startTimestamp: timeElapsed
                };
            }
            ;
        }
        ;
        if (document.location.pathname == ("/player/free")) {
            otherListeners = document.querySelector("html > body > #playerContent > #about > div > div.col-sm-12 > h4 > small");
            if (document.querySelector("html > body > #playerContent > #about > div.row > div.col-sm-12 > div.sm2-bar-ui.textured.full-width.playing") == null) {
                stationStatus = "Paused on PVFM Free",
                    listeningCheck = "No";
            }
            else {
                stationStatus = "Listening on PVFM Free with" + otherListeners.innerText + " others",
                    listeningCheck = "Yes";
            }
            ;
            onAir = document.querySelector("html > body > div#playerContent.content > div#about.container.ng-scope > div.row > div.col-sm-12 > h3");
            if (listeningCheck == "No") {
                presenceData = {
                    details: stationStatus,
                    largeImageKey: "pvfm",
                    smallImageKey: "pause"
                };
            }
            else {
                presenceData = {
                    details: stationStatus,
                    state: "On air: " + onAir.innerText,
                    largeImageKey: "pvfm",
                    smallImageKey: "play",
                    startTimestamp: timeElapsed
                };
            }
            ;
        }
        ;
        presence.setActivity(presenceData);
        return [2 /*return*/];
    });
}); });
