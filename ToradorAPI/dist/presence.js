var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "518193753433833499",
    mediaKeys: false
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let urlParams = new URLSearchParams(window.location.search);
    let typeParam = urlParams.get('type');
    let charParam = urlParams.get('char');
    if (typeParam == "original") {
        if (charParam.toLowerCase() == "taiga") {
            let presenceData = {
                details: "Looking at screenshots",
                state: "Taiga Aisaka",
                largeImageKey: "lg-tapi"
            };
            presence.setActivity(presenceData);
        }
        else {
            let presenceData = {
                details: "Looking at screenshots",
                largeImageKey: "lg-tapi"
            };
            presence.setActivity(presenceData);
        }
    }
    else if (typeParam == "fanart") {
        if (charParam.toLowerCase() == "taiga") {
            let presenceData = {
                details: "Looking at fanart",
                state: "Taiga Aisaka",
                largeImageKey: "lg-tapi"
            };
            presence.setActivity(presenceData);
        }
        else {
            let presenceData = {
                details: "Looking at fanart",
                largeImageKey: "lg-tapi"
            };
            presence.setActivity(presenceData);
        }
    }
    else {
        let presenceData = {
            largeImageKey: "lg-tapi"
        };
        presence.setActivity(presenceData);
    }
}));
