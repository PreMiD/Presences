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
    clientId: "620829310399545344",
    mediaKeys: false
});
var elapsed = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let data = {
        largeImageKey: "skribblio-logo"
    };
    var inGame = document.querySelector("#containerGamePlayers").textContent === "" ? false : true;
    if (inGame) {
        var round = document.querySelector("#round").textContent;
        data.details = round;
        if (elapsed == null) {
            elapsed = Math.floor(Date.now() / 1000);
        }
        data.startTimestamp = elapsed;
    }
    else {
        data.details = "Viewing the Homepage";
        elapsed = null;
    }
    presence.setActivity(data);
}));
