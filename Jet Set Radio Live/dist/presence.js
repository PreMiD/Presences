var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "613786642800705569",
    mediaKeys: false
});
timeElapsed = Math.floor(Date.now() / 1000);
strings = presence.getStrings({
    pause: "presence.playback.paused",
    live: "presence.playback.live",
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    songName = document.querySelector("html > body > div#information.objectSettings.touchableOff > font#programInformationText.objectSettings.touchableOff");
    presenceState = document.querySelector("html > body > font#dateTextField.objectSettings.touchableOff");
    if (songName.innerText.length < 1) {
        let presenceData = {
            details: "Not tuned in.",
            largeImageKey: "jsrl",
            smallImageKey: "pause",
        };
        presence.setActivity(presenceData);
    }
    else {
        let presenceData = {
            details: songName.firstChild.textContent,
            state: presenceState.innerText,
            largeImageKey: "jsrl",
            smallImageKey: "live",
            startTimestamp: timeElapsed,
        };
        presence.setActivity(presenceData);
    }
    ;
}));
