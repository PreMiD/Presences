var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "642714892201230336",
    
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "time"
    };
    var clock = document.querySelector("#clock0_bg") || document.querySelector("#time_section > div:nth-child(2) > div");
    if (document.location.hostname == "time.is") {
        if (document.location.pathname == "/") {
            presenceData.details = "My time is:";
            presenceData.state = clock.textContent;
        }
        else if (clock !== null) {
            presenceData.details = document.querySelector("#msgdiv > h1").textContent;
            presenceData.state = clock.textContent;
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
}));