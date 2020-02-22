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
var mongodb_1 = require("mongodb");
var fs_1 = require("fs");
mongodb_1.connect("mongodb://" + process.env.MONGO_USERNAME + ":" + process.env.MONGO_PASSWORD + "@" + process.env.MONGO_IP + ":27017", {
    appname: "PreMiD-PresenceUpdater",
    useUnifiedTopology: true
}).then(run);
function run(MongoClient) {
    return __awaiter(this, void 0, void 0, function () {
        var dbPresences, presenceFolders, presences, newPresences, deletedPresences, outdatedPresences;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, MongoClient.db("PreMiD")
                        .collection("presences")
                        .find()
                        .toArray()];
                case 1:
                    dbPresences = _a.sent();
                    presenceFolders = fs_1.readdirSync("./").filter(function (pF) {
                        return !pF.startsWith("@") &&
                            !pF.startsWith(".") &&
                            !pF.startsWith("node_modules") &&
                            fs_1.statSync(pF).isDirectory();
                    });
                    presences = presenceFolders.map(function (pF) {
                        var metadata = JSON.parse(fs_1.readFileSync(pF + "/dist/metadata.json", "utf-8")), presenceJs = fs_1.readFileSync(pF + "/dist/presence.js", "utf-8");
                        var resJson = {
                            name: metadata.service,
                            url: "https://api.premid.app/v2/presences/" + encodeURI(metadata.service),
                            metadata: metadata,
                            presenceJs: presenceJs
                        };
                        if (metadata.iframe)
                            resJson.iframeJs = fs_1.readFileSync(pF + "/dist/iframe.js", "utf-8");
                        return resJson;
                    });
                    newPresences = presences.filter(function (p) { return !dbPresences.some(function (dP) { return dP.name === p.name; }); }), deletedPresences = dbPresences.filter(function (dP) { return !presences.some(function (p) { return p.name === dP.name; }); }), outdatedPresences = dbPresences
                        .filter(function (p) {
                        return presences.find(function (dp) { return p.name === dp.name && dp.metadata.version !== p.metadata.version; });
                    })
                        .map(function (dP) { return presences.find(function (p) { return p.name === dP.name; }); });
                    console.log(newPresences.length, deletedPresences.length, outdatedPresences.length);
                    if (newPresences.length > 0)
                        MongoClient.db("PreMiD")
                            .collection("presences")
                            .insertMany(newPresences);
                    if (deletedPresences.length > 0)
                        deletedPresences.map(function (p) {
                            MongoClient.db("PreMiD")
                                .collection("presences")
                                .deleteOne({ name: p.name });
                        });
                    if (outdatedPresences.length > 0)
                        outdatedPresences.map(function (p) {
                            MongoClient.db("PreMiD")
                                .collection("presences")
                                .findOneAndUpdate({ name: p.metadata.service }, { $set: p });
                        });
                    return [2 /*return*/];
            }
        });
    });
}
