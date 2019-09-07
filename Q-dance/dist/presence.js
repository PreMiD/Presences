var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "619768959717343242",
    mediaKeys: false
}), strings = presence.getStrings({
    live: 'presence.activity.live'
});
var elapsed = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let data = {
        largeImageKey: "qdance-logo",
    };
    var radioCheck = document.querySelector("svg.audioplayer-controls__icon--play") ? false : true;
    if (radioCheck) {
        var song = document.querySelector(".audioplayer-nowplaying__track").textContent;
        var artist = document.querySelector(".audioplayer-nowplaying__artist").textContent;
        data.details = song,
            data.state = artist,
            data.smallImageKey = "live",
            data.smallImageText = (yield strings).live;
        if (elapsed === null) {
            elapsed = Math.floor(Date.now() / 1000);
        }
        data.startTimestamp = elapsed;
        presence.setActivity(data);
    }
    else {
        elapsed = null;
        presence.clearActivity();
    }
}));
