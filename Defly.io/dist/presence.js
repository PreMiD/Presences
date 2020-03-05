var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "685054359200858241",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "deflyicon"
    };
    if (document.location.pathname.includes("/gamemode-rules")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing the game rules";
    }
    else if (document.location.pathname.includes("/changelog")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing the change log";
    }
    else if (document.location.pathname == "/") {
        if (document.location.href.includes("#0")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Playing FFA mode";
            presenceData.state = "on server: "+document.location.href.split('#')[1];
        }
        else if (document.location.href.includes("#1")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Playing TEAM mode";
            presenceData.state = "on server: "+document.location.href.split('#')[1];
        }
        else if (document.location.href.includes("#2")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Playing DEFUSE mode";
            presenceData.state = "on server: "+document.location.href.split('#')[1];
        }
        else if (document.location.href.includes("#3")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Playing E-FFA mode";
            presenceData.state = "on server: "+document.location.href.split('#')[1];
        }
        else {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing home page";
        }
    }

    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
}));