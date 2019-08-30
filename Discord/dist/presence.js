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
    clientId: "616940877042155531",
    mediaKeys: false
});
var user, group, typing, teamfinish, freeornah, freeornah2, card, personal, personal2, profile, board2;
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "discordwhite"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/channels/@me/")) {
        user = document.querySelector("#app-mount > div.app-19_DXt.platform-web > div > div.layers-3iHuyZ.vertical-V37hAW.flex-1O1GKY.directionColumn-35P_nr.spacer-1fA9zc > div > div > div.flex-1xMQg5.flex-1O1GKY.vertical-V37hAW.flex-1O1GKY.directionColumn-35P_nr.justifyStart-2NDFzi.alignStretch-DpGPf3.noWrap-3jynv6.base-3dtUhz > div.flex-1xMQg5.flex-1O1GKY.horizontal-1ae9ci.horizontal-2EEEnY.flex-1O1GKY.directionRow-3v3tfG.justifyStart-2NDFzi.alignStretch-DpGPf3.noWrap-3jynv6.spacer-29U_x8.firefoxFixScrollFlex-cnI2ix > div.chat-3bRxxu.firefoxFixScrollFlex-cnI2ix > div.title-3qD0b-.container-1r6BKw > div.children-19S4PO > h3");
        group = document.querySelector("#app-mount > div.app-19_DXt.platform-web > div > div.layers-3iHuyZ.vertical-V37hAW.flex-1O1GKY.directionColumn-35P_nr.spacer-1fA9zc > div > div > div.flex-1xMQg5.flex-1O1GKY.vertical-V37hAW.flex-1O1GKY.directionColumn-35P_nr.justifyStart-2NDFzi.alignStretch-DpGPf3.noWrap-3jynv6.base-3dtUhz > div.flex-1xMQg5.flex-1O1GKY.horizontal-1ae9ci.horizontal-2EEEnY.flex-1O1GKY.directionRow-3v3tfG.justifyStart-2NDFzi.alignStretch-DpGPf3.noWrap-3jynv6.spacer-29U_x8.firefoxFixScrollFlex-cnI2ix > div.chat-3bRxxu.firefoxFixScrollFlex-cnI2ix > div.title-3qD0b-.container-1r6BKw > div.children-19S4PO > div.container-3FPLD3 > div > div > div");
        typing = document.querySelector("#app-mount > div.app-19_DXt.platform-web > div > div.layers-3iHuyZ.vertical-V37hAW.flex-1O1GKY.directionColumn-35P_nr.spacer-1fA9zc > div > div > div.flex-1xMQg5.flex-1O1GKY.vertical-V37hAW.flex-1O1GKY.directionColumn-35P_nr.justifyStart-2NDFzi.alignStretch-DpGPf3.noWrap-3jynv6.base-3dtUhz > div.flex-1xMQg5.flex-1O1GKY.horizontal-1ae9ci.horizontal-2EEEnY.flex-1O1GKY.directionRow-3v3tfG.justifyStart-2NDFzi.alignStretch-DpGPf3.noWrap-3jynv6.spacer-29U_x8.firefoxFixScrollFlex-cnI2ix > div.chat-3bRxxu.firefoxFixScrollFlex-cnI2ix > div.content-yTz4x3.firefoxFixScrollFlex-cnI2ix > div > form > div > div > div > textarea");
        if (user !== null) {
            if (typing.value !== null && typing.value !== "") {
                presenceData.details = "Typing in DMs to:";
                presenceData.state = user.innerText;
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
            else {
                presenceData.details = "Reading DMs with:";
                presenceData.state = user.innerText;
                presenceData.smallImageKey = "reading";
                presence.setActivity(presenceData);
            }
        }
        else if (group !== null) {
            if (typing.value !== null && typing.value !== "") {
                presenceData.details = "Typing in group DM: ";
                presenceData.state = group.innerText;
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
            else {
                presenceData.details = "Reading groups DMs of:";
                presenceData.state = group.innerText;
                presenceData.smallImageKey = "reading";
                presence.setActivity(presenceData);
            }
        }
        else {
            presence.setActivity();
            presence.setTrayTitle();
        }
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/channels/@me")) {
        presenceData.details = "Browsing through friends";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/store")) {
        presenceData.details = "Browsing through the store";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/channels/")) {
        group = document.querySelector("#app-mount > div.app-19_DXt.platform-web > div > div.layers-3iHuyZ.vertical-V37hAW.flex-1O1GKY.directionColumn-35P_nr.spacer-1fA9zc > div > div > div.flex-1xMQg5.flex-1O1GKY.vertical-V37hAW.flex-1O1GKY.directionColumn-35P_nr.justifyStart-2NDFzi.alignStretch-DpGPf3.noWrap-3jynv6.base-3dtUhz > div.flex-1xMQg5.flex-1O1GKY.horizontal-1ae9ci.horizontal-2EEEnY.flex-1O1GKY.directionRow-3v3tfG.justifyStart-2NDFzi.alignStretch-DpGPf3.noWrap-3jynv6.spacer-29U_x8.firefoxFixScrollFlex-cnI2ix > div.channels-Ie2l6A.vertical-V37hAW.flex-1O1GKY.directionColumn-35P_nr > div.container-PNkimc > div.flexChild-faoVW3 > div > header > span");
        presenceData.details = "Reading messages in server:";
        presenceData.state = group.innerText;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/activity")) {
        presenceData.details = "Browsing through activity";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/library")) {
        presenceData.details = "Browsing through their library";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/nitro")) {
        presenceData.details = "Browsing through";
        presenceData.state = "Discord Nitro";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/jobs")) {
        presenceData.details = "Browsing through";
        presenceData.state = "Discords Jobs page";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/sell-your-game")) {
        presenceData.details = "Browsing through";
        presenceData.state = "sell-your-game page";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/rich-presence")) {
        presenceData.details = "Browsing through";
        presenceData.state = "rich-presence page";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/verification")) {
        presenceData.details = "Browsing through";
        presenceData.state = "verification page";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/open-source")) {
        presenceData.details = "Browsing through";
        presenceData.state = "open-source page";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/partners")) {
        presenceData.details = "Browsing through";
        presenceData.state = "partners page";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/hypesquad")) {
        presenceData.details = "Browsing through";
        presenceData.state = "hypesquad page";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/guidelines")) {
        presenceData.details = "Browsing through";
        presenceData.state = "Discords guidelines";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/security")) {
        presenceData.details = "Browsing through";
        presenceData.state = "security page";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/download")) {
        presenceData.details = "Browsing through";
        presenceData.state = "download page";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/branding")) {
        presenceData.details = "Browsing through";
        presenceData.state = "branding page";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/terms")) {
        presenceData.details = "Browsing through";
        presenceData.state = "Terms Of Service page";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/company")) {
        presenceData.details = "Browsing through";
        presenceData.state = "about page";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/developers/applications/") && document.location.pathname.includes("/information")) {
        user = document.querySelector("#react-select-2--value-item > div > div.appDetails-28RJ80.medium-zmzTW-.size16-1__VVI.height20-13xN5Z.primary-jw0I4K.weightMedium-3xlxJi");
        presenceData.details = "Developer Portal";
        presenceData.state = "Editing app: " + user.innerText;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/developers/applications/") && document.location.pathname.includes("/oauth")) {
        user = document.querySelector("#react-select-2--value-item > div > div.appDetails-28RJ80.medium-zmzTW-.size16-1__VVI.height20-13xN5Z.primary-jw0I4K.weightMedium-3xlxJi");
        presenceData.details = "Developer Portal";
        presenceData.state = "Editing app: " + user.innerText;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/developers/applications/") && document.location.pathname.includes("/bots")) {
        user = document.querySelector("#react-select-2--value-item > div > div.appDetails-28RJ80.medium-zmzTW-.size16-1__VVI.height20-13xN5Z.primary-jw0I4K.weightMedium-3xlxJi");
        presenceData.details = "Developer Portal";
        presenceData.state = "Editing app: " + user.innerText;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/developers/applications/") && document.location.pathname.includes("/whitelist")) {
        user = document.querySelector("#react-select-2--value-item > div > div.appDetails-28RJ80.medium-zmzTW-.size16-1__VVI.height20-13xN5Z.primary-jw0I4K.weightMedium-3xlxJi");
        presenceData.details = "Developer Portal";
        presenceData.state = "Editing app: " + user.innerText;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/developers/applications/") && document.location.pathname.includes("/rich-presence")) {
        user = document.querySelector("#react-select-2--value-item > div > div.appDetails-28RJ80.medium-zmzTW-.size16-1__VVI.height20-13xN5Z.primary-jw0I4K.weightMedium-3xlxJi");
        presenceData.details = "Developer Portal";
        presenceData.state = "Editing app: " + user.innerText;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/developers/applications/") && document.location.pathname.includes("/developer-license")) {
        user = document.querySelector("#react-select-2--value-item > div > div.appDetails-28RJ80.medium-zmzTW-.size16-1__VVI.height20-13xN5Z.primary-jw0I4K.weightMedium-3xlxJi");
        presenceData.details = "Developer Portal";
        presenceData.state = "Editing app: " + user.innerText;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/developers/applications/")) {
        presenceData.details = "Developer Portal";
        presenceData.state = "Browsing through apps";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/developers/teams")) {
        presenceData.details = "Developer Portal";
        presenceData.state = "Browsing through teams";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/developers/docs/")) {
        presenceData.details = "Developer Portal";
        presenceData.state = "Reading documentation";
        presenceData.smallImageKey = "reading";
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "status.discordapp.com") {
        presenceData.details = "Discord Status";
        presenceData.state = "Reading Discords status";
        presenceData.smallImageKey = "reading";
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "support.discordapp.com" && document.location.pathname.includes("/topics/")) {
        group = document.querySelector("body > main > div.container > header > h1");
        presenceData.details = "Discord Support";
        presenceData.state = "Browsing Topic: " + group.innerText;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "support.discordapp.com" && document.location.pathname.includes("/topics")) {
        presenceData.details = "Discord Support";
        presenceData.state = "Browsing through topics";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "support.discordapp.com" && document.location.pathname.includes("/search")) {
        group = document.querySelector("body > main > div.container > header > p");
        user = group.innerText.split(" ", 5);
        presenceData.details = "Discord Support";
        presenceData.state = "Searching for: " + user[3];
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "support.discordapp.com" && document.location.pathname.includes("/articles")) {
        group = document.querySelector("#article-container > article > header > h1");
        presenceData.details = "Discord Support";
        presenceData.state = "Reading article: " + group.innerText;
        presenceData.smallImageKey = "reading";
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "blog.discordapp.com" && document.location.pathname.includes("/@")) {
        group = document.location.pathname.split("@", 2);
        presenceData.details = "Discord Blog";
        presenceData.state = "Viewing profile: " + group[1];
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "blog.discordapp.com" && document.location.pathname.includes("/tagged")) {
        group = document.location.pathname.split("/", 8);
        presenceData.details = "Discord Blog";
        presenceData.state = "Browsing tag: " + group[2];
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "blog.discordapp.com" && document.location.pathname.includes("/archive")) {
        group = document.location.pathname.split("/", 8);
        presenceData.details = "Discord Blog";
        presenceData.state = "Browsing the archive";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "blog.discordapp.com" && document.location.pathname.includes("/")) {
        group = document.querySelector("#root > div > article > div > section > div > div > div > h1");
        if (group !== null) {
            presenceData.details = "Discord Blog";
            presenceData.state = "Reading: " + group.innerText;
            presenceData.smallImageKey = "reading";
            presence.setActivity(presenceData);
        }
        else {
            presenceData.details = "Discord Blog";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.hostname == "merch.discordapp.com") {
        presenceData.details = "Discord Merch";
        presenceData.state = "Looking at merch";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "discordapp.com") {
        presenceData.details = "Home page";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else {
        presence.setActivity();
        presence.setTrayTitle();
    }
}));
