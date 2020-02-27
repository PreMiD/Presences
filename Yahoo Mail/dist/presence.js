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
    clientId: "620084360120369172",
    mediaKeys: false
});
var elapsed = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let data = {
        largeImageKey: "yahoomail-logo"
    };
    var path = document.location.pathname;
    if (path.includes("/folders/") || path.includes("/search/")) {
        if (path.includes("messages")) {
            data.details = "Viewing an Email";
            data.startTimestamp = elapsed;
        }
        else {
            data.details = "Viewing Mail";
            data.startTimestamp = elapsed;
        }
    }
    else if (path.includes("/compose/")) {
        data.details = "Composing a New Email";
        data.startTimestamp = elapsed;
    }
    else if (path.includes("/settings/")) {
        data.details = "Viewing Settings";
        data.startTimestamp = elapsed;
    }
    else if (path.includes("/contacts")) {
        data.details = "Viewing Contacts";
        data.startTimestamp = elapsed;
    }
    else {
        data.details = "Viewing Mail";
        data.startTimestamp = elapsed;
    }
    presence.setActivity(data);
}));
