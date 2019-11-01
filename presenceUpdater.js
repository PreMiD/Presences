"use strict";
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
exports.__esModule = true;
var Octokit = require("@octokit/rest");
var axios_1 = require("axios");
var mongodb_1 = require("mongodb");
var octokit = new Octokit({
    auth: process.env.GHTOKEN
}), base = axios_1["default"].create({
    baseURL: "https://raw.githubusercontent.com/PreMiD/Presences/master/"
});
mongodb_1.connect("mongodb://" + process.env.MONGO_USERNAME + ":" + process.env.MONGO_PASSWORD + "@" + process.env.MONGO_IP + ":27017", {
    appname: "PreMiD-PresenceUpdater",
    useUnifiedTopology: true
}).then(run);
function run(MongoClient) {
    return __awaiter(this, void 0, void 0, function () {
        var dbPresences, repoPresences, newPresences, deletedPresences, outdatedPresences, aPP, dPP, uPP;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, MongoClient.db("PreMiD")
                        .collection("presences")
                        .find({}, { projection: { _id: false, metadata: true } })
                        .toArray()];
                case 1:
                    dbPresences = (_a.sent()).map(function (p) {
                        return { service: p.metadata.service, version: p.metadata.version };
                    });
                    return [4 /*yield*/, octokit.repos
                            .getContents({ owner: "PreMiD", repo: "Presences", path: "/" })
                            .then(function (res) {
                            var presences = res.data.filter(function (f) {
                                return f.type === "dir" && !f.name.startsWith(".") && f.name !== "@types";
                            });
                            return Promise.all(presences.map(function (f) { return __awaiter(_this, void 0, void 0, function () {
                                var json, res;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, base(encodeURI(f.name) + "/dist/metadata.json")];
                                        case 1:
                                            json = (_a.sent())
                                                .data;
                                            res = {
                                                path: encodeURI(f.name),
                                                service: json.service,
                                                version: json.version,
                                                metadata: json
                                            };
                                            return [2 /*return*/, res];
                                    }
                                });
                            }); }));
                        })];
                case 2:
                    repoPresences = _a.sent();
                    newPresences = repoPresences.filter(function (p) { return !dbPresences.some(function (dP) { return dP.service === p.service; }); }), deletedPresences = dbPresences.filter(function (dP) { return !repoPresences.some(function (p) { return p.service === dP.service; }); }), outdatedPresences = dbPresences
                        .filter(function (p) {
                        return repoPresences.find(function (dp) { return p.service === dp.service && dp.version !== p.version; });
                    })
                        .map(function (dP) { return repoPresences.find(function (p) { return p.service === dP.service; }); });
                    aPP = Promise.all(newPresences.map(function (p) { return __awaiter(_this, void 0, void 0, function () {
                        var iframeJs, presenceJs, res, e_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    iframeJs = null;
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 5, , 6]);
                                    return [4 /*yield*/, base(p.path + "/dist/presence.js")];
                                case 2:
                                    presenceJs = (_a.sent()).data;
                                    if (!p.metadata.iframe) return [3 /*break*/, 4];
                                    return [4 /*yield*/, base(p.path + "/dist/iframe.js")];
                                case 3:
                                    iframeJs = (_a.sent()).data;
                                    _a.label = 4;
                                case 4:
                                    res = {
                                        metadata: p.metadata,
                                        name: p.metadata.service,
                                        presenceJs: presenceJs,
                                        url: "https://api.premid.app/v2/presences/" + p.metadata.service + "/"
                                    };
                                    if (p.metadata.iframe)
                                        res.iframeJs = iframeJs;
                                    return [2 /*return*/, res];
                                case 5:
                                    e_1 = _a.sent();
                                    //TODO SEND MESSAGE TO DISCORD
                                    return [2 /*return*/, false];
                                case 6: return [2 /*return*/];
                            }
                        });
                    }); })).then(function (pTA) {
                        if (pTA.length > 0)
                            return MongoClient.db("PreMiD")
                                .collection("presences")
                                .insertMany(pTA.filter(function (p) { return p; }));
                    });
                    dPP = Promise.all(deletedPresences.map(function (p) {
                        MongoClient.db("PreMiD")
                            .collection("presences")
                            .deleteOne({ name: p.service });
                    }));
                    uPP = Promise.all(outdatedPresences.map(function (p) { return __awaiter(_this, void 0, void 0, function () {
                        var iframeJs, presenceJs, res, e_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    iframeJs = null;
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 6, , 7]);
                                    return [4 /*yield*/, base(p.path + "/dist/presence.js")];
                                case 2:
                                    presenceJs = (_a.sent()).data;
                                    if (!p.metadata.iframe) return [3 /*break*/, 4];
                                    return [4 /*yield*/, base(p.path + "/dist/iframe.js")];
                                case 3:
                                    iframeJs = (_a.sent()).data;
                                    _a.label = 4;
                                case 4:
                                    res = {
                                        metadata: p.metadata,
                                        name: p.metadata.service,
                                        presenceJs: presenceJs,
                                        url: "https://api.premid.app/v2/presences/" + p.metadata.service + "/"
                                    };
                                    if (p.metadata.iframe)
                                        res.iframeJs = iframeJs;
                                    return [4 /*yield*/, MongoClient.db("PreMiD")
                                            .collection("presences")
                                            .findOneAndReplace({ name: p.metadata.service }, res)];
                                case 5:
                                    _a.sent();
                                    return [3 /*break*/, 7];
                                case 6:
                                    e_2 = _a.sent();
                                    return [3 /*break*/, 7];
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); }));
                    Promise.all([aPP, uPP, dPP]).then(function () { return MongoClient.close(); });
                    return [2 /*return*/];
            }
        });
    });
}
