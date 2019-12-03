var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "651406405093425152",
    mediaKeys: false
}), presenceData = {
    largeImageKey: "logo"
};
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if (document.location.pathname == "/" || document.location.pathname == "/home") {
        presenceData.details = "Viewing the homepage";
    }
    else if (document.location.pathname.startsWith("/team")) {
        presenceData.details = "Looking at the team";
    }
    else if (document.location.pathname.startsWith("/faq")) {
        presenceData.details = "Reading the FAQ";
    }
    else if (document.location.pathname.startsWith("/rules")) {
        presenceData.details = "Reading their rules";
    }
    else if (document.location.pathname.startsWith("/contact")) {
        presenceData.details = "Reading the contact informations";
    }
    else if (document.location.pathname.startsWith("/downloads")) {
        presenceData.details = "Looking at the download page";
    }
    else {
        presenceData = {
            largeImageKey: "logo"
        };
    }
    presence.setActivity(presenceData);
}));
