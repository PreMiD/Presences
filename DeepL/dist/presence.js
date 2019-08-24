var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "614903529240395782",
    mediaKeys: false
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if (document.location.pathname == "/translator") {
        let presenceData = {
            details: document.getElementsByClassName("translate_from")[0].parentNode.textContent,
            state: document.getElementsByClassName("translate_to")[0].parentNode.textContent,
            largeImageKey: "lg-deepl"
        };
        presence.setActivity(presenceData);
    }
    else {
        let presenceData = {
            largeImageKey: "lg-deepl"
        };
        presence.setActivity(presenceData);
    }
}));
