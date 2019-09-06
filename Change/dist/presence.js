var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const presence = new Presence({
    clientId: "612042450785271811",
    mediaKeys: false
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    const presenceData = {
        largeImageKey: "logo"
    };
    const titleElement = document.querySelector(".mtl.mbxxxl.xs-mts.xs-mbxs.petition-title");
    if (titleElement !== null) {
        let votesElement = document.querySelector(".mbxs span strong");
        if (votesElement === null) {
            votesElement = document.querySelector("div.xs-phs.xs-pbs > div.hidden-xs > p.type-weak");
        }
        presenceData.details = titleElement.innerText;
        presenceData.state = votesElement.innerText;
    }
    else {
        presenceData.details = "Browsing...";
    }
    presence.setActivity(presenceData);
}));
