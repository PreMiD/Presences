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
    clientId: "619984959247220750",
    mediaKeys: false
});
var elapsed = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let data = {
        largeImageKey: "showdown-logo"
    };
    var path = document.location.pathname;
    if (path == ("/")) {
        data.details = "Viewing Homepage";
        elapsed = null;
    }
    else if (path.startsWith("/teambuilder")) {
        data.details = "Building a Team";
        elapsed = null;
    }
    else if (path.startsWith("/ladder")) {
        data.details = "Viewing a Ladder";
        elapsed = null;
    }
    else if (path.includes("battle")) {
        var title = document.querySelector("a.roomtab i.text").textContent;
        var users = document.querySelector("a.roomtab.button.cur span").textContent;
        data.details = title;
        data.state = users;
        if (elapsed == null) {
            elapsed = Math.floor(Date.now() / 1000);
        }
        data.startTimestamp = elapsed;
    }
    else {
        data.details = "Somewhere on-site";
        elapsed = null;
    }
    presence.setActivity(data);
}));
