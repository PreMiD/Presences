var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "475590192464396288",
    mediaKeys: false
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if (document.getElementsByClassName("community__name")[0]) {
        let testPresenceData = {
            details: document.getElementsByClassName("community__name")[0].textContent,
            state: document.getElementsByClassName("community__song-playing")[0].textContent,
            largeImageKey: "pdjlogo"
        };
        presence.setActivity(testPresenceData);
    }
}));
