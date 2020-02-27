var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "619963616489242645",
    mediaKeys: false
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if (document.location.pathname.startsWith("/wiki/")) {
        let page = "N/A";
        try {
            page = document.getElementsByClassName("page-header__title")[0].textContent;
        }
        catch (err) {
            let errCode = "KMNNWIKI_WIKIEN_GETPAGETITLE";
            console.log("An error occured in the PreMiD Presence, please send this to CRUGG#0001   :::   " + errCode + "   :::   " + err);
        }
        let presenceData = {
            details: "Viewing a page...",
            state: page,
            largeImageKey: "lg-kmnnwwiki"
        };
        presence.setActivity(presenceData);
    }
}));
