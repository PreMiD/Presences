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
    clientId: "754070047193956492"
});
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", function () { return __awaiter(_this, void 0, void 0, function () {
    var presenceData;
    return __generator(this, function (_a) {
        presenceData = {
            largeImageKey: "dmoj"
        };
        if (document.location.pathname == "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing home page";
        }
        else if (document.location.pathname.includes("/problems")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing problems";
        }
        else if (document.location.pathname.includes("/problem/") &&
            document.location.pathname.includes("/submit")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Submitting to problem:";
            presenceData.state = document.querySelector("body > div > main > h2 > a").textContent;
        }
        else if (document.location.pathname.includes("/problem/") &&
            document.location.pathname.includes("/submissions")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing submissions to problem:";
            presenceData.state = document.querySelectorAll("body > div > main > div > div > h2 > a")[-1].textContent;
        }
        else if (document.location.pathname.includes("/problem/") &&
            document.location.pathname.includes("/rank")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing best submissions to problem:";
            presenceData.state = document.querySelector("body > div > main > div > div > h2 > a").textContent;
        }
        else if (document.location.pathname.includes("/problem/") &&
            document.location.pathname.includes("/tickets/new")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Reporting issue for problem:";
            presenceData.state = document.querySelector("body > div > main > h2 > a").textContent;
        }
        else if (document.location.pathname.includes("/problem/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing problem:";
            presenceData.state = document.querySelector("body > div > main > div > h2").textContent;
        }
        else if (document.location.pathname.includes("/submissions/user")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing submissions by user:";
            if (document.querySelector("body > div > main > div > div > h2")
                .textContent != "All my submissions") {
                presenceData.state = document.querySelector("body > div > main > div > div > h2 > a").textContent;
            }
            else {
                presenceData.state = document.querySelector("body > nav > div > span > ul > li > a > span > span > b").textContent;
            }
        }
        else if (document.location.pathname.includes("/submissions")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing submissions";
        }
        else if (document.location.pathname.includes("/submission/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing submission of problem: " + document.querySelector("body > div > main > h2 > a").textContent;
            presenceData.state = "By user: " + document.querySelectorAll("body > div > main > h2 > a")[1]
                .textContent;
        }
        else if (document.location.pathname.includes("/src/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing submission source of problem: " + document.querySelector("body > div > main > h2 > a").textContent;
            presenceData.state = "By user: " + document.querySelectorAll("body > div > main > h2 > a")[1]
                .textContent;
        }
        else if (document.location.pathname.includes("/users")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing leaderboard";
        }
        else if (document.location.pathname.includes("/user/") &&
            document.location.pathname.includes("/solved")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing problems solved by user:";
            if (document.querySelector(".tabs > h2").textContent != "My account") {
                presenceData.state = document
                    .querySelector(".tabs > h2")
                    .textContent.split(" ")[1];
            }
            else {
                presenceData.state = document.querySelector("body > nav > div > span > ul > li > a > span > span > b").textContent;
            }
        }
        else if (document.location.pathname.includes("/user/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing user:";
            if (document.querySelector(".tabs > h2").textContent != "My account") {
                presenceData.state = document
                    .querySelector(".tabs > h2")
                    .textContent.split(" ")[1];
            }
            else {
                presenceData.state = document.querySelector("body > nav > div > span > ul > li > a > span > span > b").textContent;
            }
        }
        else if (document.location.pathname.includes("/edit/profile")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Editing profile";
        }
        else if (document.location.pathname.includes("/organizations")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing organizations";
        }
        else if (document.location.pathname.includes("/organization/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing organization:";
            presenceData.state = document.querySelector("body > div > main > h2").textContent;
        }
        else if (document.location.pathname.includes("/contests")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing contests";
        }
        else if (document.location.pathname.includes("/contest/") &&
            document.location.pathname.includes("/stats")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing statistics of contest:";
            presenceData.state = document.querySelector(".tabs > h2").textContent;
        }
        else if (document.location.pathname.includes("/contest/") &&
            document.location.pathname.includes("/ranking")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing rankings of contest:";
            presenceData.state = document.querySelector(".tabs > h2").textContent;
        }
        else if (document.location.pathname.includes("/contest/") &&
            document.location.pathname.includes("/participations")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing participation of contest:";
            presenceData.state = document.querySelector(".tabs > h2").textContent;
        }
        else if (document.location.pathname.includes("/contest/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing contest:";
            presenceData.state = document.querySelector(".tabs > h2").textContent;
        }
        else if (document.location.pathname.includes("/about")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing about page";
        }
        else if (document.location.pathname.includes("/status")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing status";
        }
        else if (document.location.pathname.includes("/runtimes/matrix/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing version matrix";
        }
        else if (document.location.pathname.includes("/runtimes")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing runtimes";
        }
        else if (document.location.pathname.includes("/tips")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing tips";
        }
        else if (document.location.pathname.includes("/api")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing API";
        }
        if (presenceData.details == null) {
            presence.setTrayTitle();
            presence.setActivity();
        }
        else {
            presence.setActivity(presenceData);
        }
        return [2 /*return*/];
    });
}); });
