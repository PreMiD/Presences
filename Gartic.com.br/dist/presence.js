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
    clientId: "621894190883668010",
    mediaKeys: false
});
var elapsed = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let data = {
        largeImageKey: "gartic-logo"
    };
    var path = document.location.pathname;
    var gameLink = document.location.pathname.split("/")[1].match(/^\d/) ? true : false;
    if (gameLink) {
        var user = document.querySelector("div.user.proprio .dados span").textContent;
        var points = document.querySelector("div.user.proprio .dados pre").textContent;
        var lobby = document.querySelector("title").innerText;
        data.details = user + " - " + points.split("pontos")[0].trim() + " points";
        data.state = "Lobby: " + lobby.split("-")[0];
        data.startTimestamp = elapsed;
    }
    else {
        data.details = "Not in-game";
    }
    presence.setActivity(data);
}));
