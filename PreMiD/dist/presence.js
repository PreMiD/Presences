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
    clientId: "622478766450540544",
    mediaKeys: false
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "lg-premid"
    };
    if (document.location.pathname == "/") {
        presenceData.state = "Viewing Homepage...";
    }
    else if (document.location.pathname.includes("downloads")) {
        presenceData.state = "Viewing Downloads...";
    }
    else if (document.location.pathname.includes("contributors")) {
        presenceData.state = "Viewing Contributors...";
    }
    else if (document.location.pathname.includes("store")) {
        presenceData.state = "Viewing Store...";
    }
    presence.setActivity(presenceData);
}));
