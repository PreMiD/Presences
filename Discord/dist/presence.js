var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "616940877042155531",
    mediaKeys: false
});
var user, group, typing, teamfinish, freeornah, freeornah2, card, personal, personal2, profile, connected, apptitle;
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "discordwhite"
    };
    presenceData.startTimestamp = browsingStamp;
    connected = document.querySelector("#app-mount > div > div > div > div > div > div > div > div > div > div > div > div > div > a > div");
    apptitle = document.querySelector('.appDetails-28RJ80.medium-zmzTW-.size16-1__VVI.height20-13xN5Z.primary-jw0I4K.weightMedium-3xlxJi');
    if (document.location.hostname == "discordapp.com" && connected !== null) {
        if (connected.innerText.includes("@")) {
            presenceData.details = "Voice connected with";
            presenceData.state = connected.innerText;
        }
        else {
            presenceData.details = "Voice connected to";
            presenceData.state = connected.innerText.replace(" / " + connected.innerText.split(" / ").pop(), "") + " (Server: " + connected.innerText.split(" / ").pop() + ")";
        }
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/channels/@me/")) {
        user = document.querySelector("#app-mount > div > div > div > div > div > div > div > div > div > div > h3");
        group = document.querySelector("#app-mount > div > div > div > div > div > div > div > div > div > div > div > div > div > div");
        typing = document.querySelector("#app-mount > div > div > div > div > div > div > div > div > div > div > form > div > div > div > textarea");
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
        group = document.querySelector("#app-mount > div > div > div > div > div > div > div > div > div > div > header > h1");
        typing = document.querySelector("#app-mount > div > div > div > div > div > div > div > div > div > div > form > div > div > div > textarea");
        card = document.querySelector("#app-mount > div > div > div > div > div > div > div > div > div > div > h3");
        if (typing.value !== null && typing.value !== "") {
            presenceData.details = "Typing in channel: ";
            presenceData.state = "#" + card.innerText + " (Server: " + group.innerText + ")";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else {
            presenceData.details = "Reading messages in channel:";
            presenceData.state = "#" + card.innerText + " (Server: " + group.innerText + ")";
            presenceData.smallImageKey = "reading";
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/developers/applications/") && document.location.pathname.includes("/information")) {
        presenceData.details = "Developer Portal";
        presenceData.state = "Editing app: " + apptitle.innerText;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/developers/applications/") && document.location.pathname.includes("/oauth")) {
        presenceData.details = "Developer Portal";
        presenceData.state = "Editing app: " + apptitle.innerText;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/developers/applications/") && document.location.pathname.includes("/bots")) {
        presenceData.details = "Developer Portal";
        presenceData.state = "Editing app: " + apptitle.innerText;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/developers/applications/") && document.location.pathname.includes("/whitelist")) {
        presenceData.details = "Developer Portal";
        presenceData.state = "Editing app: " + apptitle.innerText;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/developers/applications/") && document.location.pathname.includes("/rich-presence")) {
        presenceData.details = "Developer Portal";
        presenceData.state = "Editing app: " + apptitle.innerText;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/developers/applications/") && document.location.pathname.includes("/developer-license")) {
        presenceData.details = "Developer Portal";
        presenceData.state = "Editing app: " + apptitle.innerText;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/developers/applications")) {
        presenceData.details = "Developer Portal";
        presenceData.state = "Browsing through apps";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/developers/teams")) {
        group = document.querySelector("div.label-1RJQNH.small.weightMedium-3xlxJi");
        if (group !== null) {
            presenceData.details = "Developer Portal";
            presenceData.state = "Editing team: " + group.innerText;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else {
            presenceData.details = "Developer Portal";
            presenceData.state = "Browsing through teams";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/developers/docs/")) {
        presenceData.details = "Developer Portal";
        presenceData.state = "Reading documentation";
        presenceData.smallImageKey = "reading";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzFCLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsU0FBUyxFQUFFLEtBQUs7Q0FDakIsQ0FBQyxDQUFBO0FBRUYsSUFBSSxJQUFVLEVBQUUsS0FBVyxFQUFFLE1BQVksRUFBRSxVQUFnQixFQUFFLFNBQWUsRUFBRSxVQUFnQixFQUFFLElBQVUsRUFBRSxRQUFjLEVBQUUsU0FBZSxFQUFFLE9BQWEsRUFBRSxTQUFlLEVBQUUsUUFBYyxDQUFDO0FBRTVMLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFDLElBQUksQ0FBQyxDQUFDO0FBRWhELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUVuQyxJQUFJLFlBQVksR0FBaUI7UUFDL0IsYUFBYSxFQUFFLGNBQWM7S0FDOUIsQ0FBQztJQUVGLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0lBRTVDLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG9HQUFvRyxDQUFDLENBQUM7SUFDekksUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUdBQW1HLENBQUMsQ0FBQztJQUV2SSxJQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGdCQUFnQixJQUFJLFNBQVMsS0FBSyxJQUFJLEVBQUU7UUFFdkUsSUFBSSxTQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNyQyxZQUFZLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO1lBQzlDLFlBQVksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQztTQUMxQzthQUFNO1lBQ0wsWUFBWSxDQUFDLE9B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