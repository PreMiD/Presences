var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var englishPresence = new Presence({
    clientId: "613417749489778689",
    mediaKeys: false
});
var germanPresence = new Presence({
    clientId: "613418400042975329",
    mediaKeys: false
});
englishPresence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if (document.location.href.includes("tora-dora.fandom.com")) {
        if (document.location.pathname.startsWith("/wiki/")) {
            let page = "N/A";
            try {
                page = document.getElementsByClassName("page-header__title")[0].textContent;
            }
            catch (err) {
                let errCode = "TWIKI_WIKIEN_GETPAGETITLE";
                console.log("An error occured in the PreMiD Presence, please send this to CRUGG#0001   :::   " + errCode + "   :::   " + err);
            }
            let presenceData = {
                details: "Viewing a page...",
                state: page,
                largeImageKey: "lg-twiki"
            };
            englishPresence.setActivity(presenceData);
        }
    }
    germanPresence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
        if (document.location.href.includes("toradora.fandom.com")) {
            if (document.location.pathname.startsWith("/de/wiki/")) {
                let page = "N/A";
                try {
                    page = document.getElementsByClassName("page-header__title")[0].textContent;
                }
                catch (err) {
                    let errCode = "TWIKI_WIKIDE_GETPAGETITLE";
                    console.log("An error occured in the PreMiD Presence, please send this to CRUGG#0001   :::   " + errCode + "   :::   " + err);
                }
                let presenceData = {
                    details: "Schaut eine Seite an...",
                    state: page,
                    largeImageKey: "lg-twiki"
                };
                germanPresence.setActivity(presenceData);
            }
        }
    }));
}));
