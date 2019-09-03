var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var genericStyle = "font-weight: 800; padding: 2px 5px; color: white;";
function PMD_info(message) {
    console.log("%cPreMiD%cINFO%c " + message, genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;", genericStyle + "border-radius: 0 25px 25px 0; background: #5050ff;", "color: unset;");
}
function PMD_error(message) {
    console.log("%cPreMiD%cERROR%c " + message, genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;", genericStyle + "border-radius: 0 25px 25px 0; background: #ff5050;", "color: unset;");
}
function PMD_success(message) {
    console.log("%cPreMiD%cSUCCESS%c " + message, genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;", genericStyle +
        "border-radius: 0 25px 25px 0; background: #50ff50; color: black;", "color: unset;");
}
var presence = new Presence({
    clientId: "617500416887881748",
    mediaKeys: false
});
var group, typing, chat, user, search, card, bot, personal2, profile, board2;
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "fror_why"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.hostname == "web.skype.com") {
        user = document.querySelector("body > div.app-container > div > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div > div > div > div > button > div > div");
        typing = document.querySelector("body > div.app-container > div > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(2) > div > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div > div > div > div:nth-child(2) > div:nth-child(3) > div > div > div:nth-child(2) > div > div > div > div > div > div > span > br");
        bot = document.querySelector("body > div.app-container > div > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div > div > div > button > div > div");
        if (user !== null) {
            if (typing == null) {
                presenceData.details = "Typing in chat:";
                presenceData.state = user.innerText;
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
            else {
                presenceData.details = "Reading chat:";
                presenceData.state = user.innerText;
                presenceData.smallImageKey = "reading";
                presence.setActivity(presenceData);
            }
        }
        else if (bot !== null) {
            if (typing == null) {
                presenceData.details = "Typing in chat:";
                presenceData.state = bot.innerText;
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
            else {
                presenceData.details = "Reading chat:";
                presenceData.state = bot.innerText;
                presenceData.smallImageKey = "reading";
                presence.setActivity(presenceData);
            }
        }
        else {
            presence.setActivity();
            presence.setTrayTitle();
        }
    }
    else if (document.location.hostname == "preview.web.skype.com") {
        user = document.querySelector("body > div.app-container > div > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div > div > div > div > button > div > div");
        typing = document.querySelector("body > div.app-container > div > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(2) > div > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(1) > div > div > div > div > div:nth-child(2) > div:nth-child(3) > div > div > div:nth-child(2) > div > div > div > div > div > div > span > span");
        if (user !== null) {
            if (typing !== null) {
                presenceData.details = "Typing in chat:";
                presenceData.state = user.innerText;
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
            else {
                presenceData.details = "Reading chat:";
                presenceData.state = user.innerText;
                presenceData.smallImageKey = "reading";
                presence.setActivity(presenceData);
            }
        }
        else {
            presence.setActivity();
            presence.setTrayTitle();
        }
    }
    else if (document.location.hostname == "www.skype.com") {
        presenceData.details = "Skype";
        presenceData.state = "Browsing...";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else {
        presence.setActivity();
        presence.setTrayTitle();
    }
}));
