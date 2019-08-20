var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "613393646330576931",
    mediaKeys: false
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if (document.location.pathname == "/") {
        let presenceData = {
            details: "Viewing the homepage",
            largeImageKey: "lg-npm"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/search")) {
        let presenceData = {
            details: "Searching...",
            state: document.location.search.substr(3),
            largeImageKey: "lg-npm"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/package/")) {
        let presenceData = {
            details: "Viewing a package",
            state: document.location.pathname.split("/")[2],
            largeImageKey: "lg-npm"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/~")) {
        let presenceData = {
            details: "Viewing a profile",
            state: document.location.pathname.substr(3),
            largeImageKey: "lg-npm"
        };
        presence.setActivity(presenceData);
    }
    else {
        let presenceData = {
            largeImageKey: "lg-npm"
        };
        presence.setActivity(presenceData);
    }
}));
