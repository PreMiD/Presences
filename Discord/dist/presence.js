var presence = new Presence({
    clientId: "616940877042155531"
});
var user, group, typing, typingicon, card, connected, apptitle, lastData, thisData, lastStamp;
presence.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "discordwhite"
    };
    connected = document.querySelector("#app-mount > div > div > div > div > div > div > div > div > div > div > div > div > div > a > div");
    apptitle = document.querySelector(".appDetails-28RJ80.medium-zmzTW-.size16-1__VVI.height20-13xN5Z.primary-jw0I4K.weightMedium-3xlxJi");
    typingicon = "﻿";
    if (document.location.hostname == "discordapp.com") {
        if (connected !== null && connected.textContent !== "") {
            presenceData.startTimestamp = getTimeStamp();
            presenceData.smallImageKey = "call";
            if (connected.textContent.includes("@")) {
                presenceData.details = "Voice connected with";
                presenceData.state = connected.textContent;
            }
            else {
                presenceData.details = "Voice connected to";
                presenceData.state =
                    connected.textContent.replace(" / " + connected.textContent.split(" / ").pop(), "") +
                        " (Server: " +
                        connected.textContent.split(" / ").pop() +
                        ")";
            }
        }
        else if (document.querySelector("#app-mount > div.app-1q1i1E > div > div.layers-3iHuyZ.layers-3q14ss > div:nth-child(2) > div:nth-child(3) > div > div.sidebarRegion-VFTUkN > div > div > nav > div > div:nth-child(1)") !== null) {
            presenceData.details = "Changing their settings";
            presenceData.smallImageKey = "writing";
            presenceData.startTimestamp = getTimeStamp();
        }
        else if (document.location.pathname.includes("/channels/@me/")) {
            typing =
                document.querySelector("#app-mount > div.app-1q1i1E > div > div.layers-3iHuyZ.layers-3q14ss > div > div > div > div > div.chat-3bRxxu > div.content-yTz4x3 > div > form > div > div > div > div.textArea-12jD-V.slateContainer-3Qkn2x > div.markup-2BOw-j.slateTextArea-1Mkdgw").textContent !== typingicon;
            user = document.querySelector("#app-mount > div > div > div > div > div > div > div > div > div > div > h3");
            group = document.querySelector("#app-mount > div.app-1q1i1E > div > div.layers-3iHuyZ.layers-3q14ss > div > div > div > div > div.chat-3bRxxu > div.title-3qD0b-.container-1r6BKw.themed-ANHk51 > div.children-19S4PO > div.container-3FPLD3 > div > div > div");
            if (user !== null) {
                if (typing) {
                    presenceData.details = "Typing in DMs to:";
                    presenceData.state = user.textContent;
                    presenceData.smallImageKey = "writing";
                    presenceData.startTimestamp = getTimeStamp();
                }
                else {
                    presenceData.details = "Reading DMs from:";
                    presenceData.state = user.textContent;
                    presenceData.smallImageKey = "reading";
                    presenceData.startTimestamp = getTimeStamp();
                }
            }
            else if (group !== null) {
                if (typing) {
                    presenceData.details = "Typing in group DM: ";
                    presenceData.state = group.textContent;
                    presenceData.smallImageKey = "writing";
                    presenceData.startTimestamp = getTimeStamp();
                }
                else {
                    presenceData.details = "Reading groups DMs of:";
                    presenceData.state = group.textContent;
                    presenceData.smallImageKey = "reading";
                    presenceData.startTimestamp = getTimeStamp();
                }
            }
        }
        else if (document.location.pathname.includes("/channels/@me")) {
            presenceData.details = "Browsing through friends";
            presenceData.startTimestamp = getTimeStamp();
        }
        else if (document.location.pathname.includes("/store")) {
            presenceData.details = "Browsing through the store";
            presenceData.startTimestamp = getTimeStamp();
        }
        else if (document.location.pathname.includes("/channels/")) {
            group = document.querySelector("#app-mount > div > div > div > div > div > div > div > div > div > div > header > h1");
            typing = document.querySelector("#app-mount > div.app-1q1i1E > div > div.layers-3iHuyZ.layers-3q14ss > div > div > div > div > div.chat-3bRxxu > div.content-yTz4x3 > div.chatContent-a9vAAp > form > div > div > div > div.textArea-12jD-V.slateContainer-3Qkn2x > div.markup-2BOw-j.slateTextArea-1Mkdgw");
            if (typing == null) {
                typing = false;
            }
            else {
                typing = typing.textContent !== typingicon;
            }
            card = document.querySelector("#app-mount > div > div > div > div > div > div > div > div > div > div > h3");
            if (typing) {
                presenceData.details = "Typing in channel: ";
                presenceData.state =
                    "#" + card.textContent + " (Server: " + group.textContent + ")";
                presenceData.smallImageKey = "writing";
                presenceData.startTimestamp = getTimeStamp();
            }
            else {
                presenceData.details = "Reading messages in channel:";
                presenceData.state =
                    "#" + card.textContent + " (Server: " + group.textContent + ")";
                presenceData.smallImageKey = "reading";
                presenceData.startTimestamp = getTimeStamp();
            }
        }
        else if (document.location.pathname.includes("/developers/applications/")) {
            presenceData.details = "Developer Portal";
            presenceData.state = "Editing app: " + apptitle.textContent;
            presenceData.smallImageKey = "writing";
            presenceData.startTimestamp = getTimeStamp();
        }
        else if (document.location.pathname.includes("/developers/applications")) {
            presenceData.details = "Developer Portal";
            presenceData.state = "Browsing through apps";
            presenceData.startTimestamp = getTimeStamp();
        }
        else if (document.location.pathname.includes("/developers/teams")) {
            group = document.querySelector("div.label-1RJQNH.small.weightMedium-3xlxJi");
            if (group !== null) {
                presenceData.details = "Developer Portal";
                presenceData.state = "Editing team: " + group.textContent;
                presenceData.smallImageKey = "writing";
                presenceData.startTimestamp = getTimeStamp();
            }
            else {
                presenceData.details = "Developer Portal";
                presenceData.state = "Browsing through teams";
                presenceData.startTimestamp = getTimeStamp();
            }
        }
        else if (document.location.pathname.includes("/developers/docs/")) {
            presenceData.details = "Developer Portal";
            presenceData.state = "Reading documentation";
            presenceData.smallImageKey = "reading";
            presenceData.startTimestamp = getTimeStamp();
        }
        else if (document.location.pathname.includes("/activity")) {
            presenceData.details = "Browsing through activity";
            presenceData.startTimestamp = getTimeStamp();
        }
        else if (document.location.pathname.includes("/library")) {
            presenceData.details = "Browsing through their library";
            presenceData.startTimestamp = getTimeStamp();
        }
        else if (document.location.pathname.includes("/nitro")) {
            presenceData.details = "Browsing through";
            presenceData.state = "Discord Nitro";
            presenceData.startTimestamp = getTimeStamp();
        }
        else if (document.location.pathname.includes("/jobs")) {
            presenceData.details = "Browsing through";
            presenceData.state = "Discords Jobs page";
            presenceData.startTimestamp = getTimeStamp();
        }
        else if (document.location.pathname.includes("/sell-your-game")) {
            presenceData.details = "Browsing through";
            presenceData.state = "sell-your-game page";
            presenceData.startTimestamp = getTimeStamp();
        }
        else if (document.location.pathname.includes("/rich-presence")) {
            presenceData.details = "Browsing through";
            presenceData.state = "rich-presence page";
            presenceData.startTimestamp = getTimeStamp();
        }
        else if (document.location.pathname.includes("/verification")) {
            presenceData.details = "Browsing through";
            presenceData.state = "verification page";
            presenceData.startTimestamp = getTimeStamp();
        }
        else if (document.location.pathname.includes("/open-source")) {
            presenceData.details = "Browsing through";
            presenceData.state = "open-source page";
            presenceData.startTimestamp = getTimeStamp();
        }
        else if (document.location.pathname.includes("/partners")) {
            presenceData.details = "Browsing through";
            presenceData.state = "partners page";
            presenceData.startTimestamp = getTimeStamp();
        }
        else if (document.location.pathname.includes("/hypesquad")) {
            presenceData.details = "Browsing through";
            presenceData.state = "hypesquad page";
            presenceData.startTimestamp = getTimeStamp();
        }
        else if (document.location.pathname.includes("/guidelines")) {
            presenceData.details = "Browsing through";
            presenceData.state = "Discords guidelines";
            presenceData.startTimestamp = getTimeStamp();
        }
        else if (document.location.pathname.includes("/security")) {
            presenceData.details = "Browsing through";
            presenceData.state = "security page";
            presenceData.startTimestamp = getTimeStamp();
        }
        else if (document.location.pathname.includes("/download")) {
            presenceData.details = "Browsing through";
            presenceData.state = "download page";
            presenceData.startTimestamp = getTimeStamp();
        }
        else if (document.location.pathname.includes("/branding")) {
            presenceData.details = "Browsing through";
            presenceData.state = "branding page";
            presenceData.startTimestamp = getTimeStamp();
        }
        else if (document.location.pathname.includes("/terms")) {
            presenceData.details = "Browsing through";
            presenceData.state = "Terms Of Service page";
            presenceData.startTimestamp = getTimeStamp();
        }
        else if (document.location.pathname.includes("/company")) {
            presenceData.details = "Browsing through";
            presenceData.state = "about page";
            presenceData.startTimestamp = getTimeStamp();
        }
        else if (document.location.pathname.includes("/invite")) {
            presenceData.details = "Viewing invite:";
            presenceData.startTimestamp = getTimeStamp();
            apptitle = document.URL.split("/")[4];
            if (apptitle.includes("?")) {
                presenceData.state = apptitle.split("?")[0];
            }
            else {
                presenceData.state = document.URL.split("/")[4];
            }
            presenceData.state = "COMING SOON.";
        }
    }
    else if (document.location.hostname == "status.discordapp.com") {
        presenceData.details = "Discord Status";
        presenceData.state = "Viewing Discords status";
        presenceData.smallImageKey = "reading";
        presenceData.startTimestamp = getTimeStamp();
    }
    else if (document.location.hostname == "support.discordapp.com") {
        if (document.location.pathname.includes("/topics/")) {
            group = document.querySelector("body > main > div.container > header > h1");
            presenceData.details = "Discord Support";
            presenceData.state = "Browsing Topic: " + group.textContent;
            presenceData.startTimestamp = getTimeStamp();
        }
        else if (document.location.pathname.includes("/topics")) {
            presenceData.details = "Discord Support";
            presenceData.state = "Browsing through topics";
            presenceData.startTimestamp = getTimeStamp();
        }
        else if (document.location.pathname.includes("/search")) {
            group = document.querySelector("body > main > div.container > header > p");
            user = group.textContent.split(" ", 5);
            presenceData.details = "Discord Support";
            presenceData.state = "Searching for: " + user[3];
            presenceData.startTimestamp = getTimeStamp();
        }
        else if (document.location.pathname.includes("/articles")) {
            group = document.querySelector("#article-container > article > header > h1");
            presenceData.details = "Discord Support";
            presenceData.state = "Reading article: " + group.textContent;
            presenceData.smallImageKey = "reading";
            presenceData.startTimestamp = getTimeStamp();
        }
    }
    else if (document.location.hostname == "blog.discordapp.com") {
        if (document.location.pathname.includes("/@")) {
            group = document.location.pathname.split("@", 2);
            presenceData.details = "Discord Blog";
            presenceData.state = "Viewing profile: " + group[1];
            presenceData.startTimestamp = getTimeStamp();
        }
        else if (document.location.pathname.includes("/tagged")) {
            group = document.location.pathname.split("/", 8);
            presenceData.details = "Discord Blog";
            presenceData.state = "Browsing tag: " + group[2];
            presenceData.startTimestamp = getTimeStamp();
        }
        else if (document.location.pathname.includes("/archive")) {
            group = document.location.pathname.split("/", 8);
            presenceData.details = "Discord Blog";
            presenceData.state = "Browsing the archive";
            presenceData.startTimestamp = getTimeStamp();
        }
        else if (document.location.pathname.includes("/")) {
            group = document.querySelector("#root > div > article > div > section > div > div > div > h1");
            if (group !== null) {
                presenceData.details = "Discord Blog";
                presenceData.state = "Reading: " + group.textContent;
                presenceData.smallImageKey = "reading";
                presenceData.startTimestamp = getTimeStamp();
            }
            else {
                presenceData.details = "Discord Blog";
                presenceData.startTimestamp = getTimeStamp();
            }
        }
    }
    else if (document.location.hostname == "merch.discordapp.com") {
        presenceData.details = "Discord Merch";
        presenceData.state = "Looking at merch";
        presenceData.startTimestamp = getTimeStamp();
    }
    else if (document.location.hostname == "discord.gg") {
        presenceData.details = "Viewing an invite";
        presenceData.startTimestamp = getTimeStamp();
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
        lastData = presenceData.details;
    }
    else {
        presence.setActivity(presenceData);
        lastData = null;
    }
    function getTimeStamp() {
        var browsingStamp;
        thisData = presenceData.details;
        if (lastData == thisData) {
            browsingStamp = lastStamp;
        }
        else {
            lastStamp = Math.floor(Date.now() / 1000);
            browsingStamp = Math.floor(Date.now() / 1000);
        }
        return browsingStamp;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksSUFBUyxFQUNaLEtBQVUsRUFDVixNQUFXLEVBQ1gsVUFBZSxFQUNmLElBQVMsRUFDVCxTQUFjLEVBQ2QsUUFBYSxFQUNiLFFBQWEsRUFDYixRQUFhLEVBQ2IsU0FBYyxDQUFDO0FBRWhCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksWUFBWSxHQUFpQjtRQUNoQyxhQUFhLEVBQUUsY0FBYztLQUM3QixDQUFDO0lBQ0YsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ2pDLG9HQUFvRyxDQUNwRyxDQUFDO0lBQ0YsUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ2hDLG1HQUFtRyxDQUNuRyxDQUFDO0lBQ0YsVUFBVSxHQUFHLEdBQUcsQ0FBQztJQUVqQixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGdCQUFnQixFQUFFO1FBQ25ELElBQUksU0FBUyxLQUFLLElBQUksSUFBSSxTQUFTLENBQUMsV0FBVyxLQUFLLEVBQUUsRUFBRTtZQUN2RCxZQUFZLENBQUMsY0FBYyxHQUFHLFlBQVksRUFBRSxDQUFDO1lBQzdDLFlBQVksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO1lBQ3BDLElBQUksU0FBUyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3hDLFlBQVksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7Z0JBQzlDLFlBQVksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQzthQUMzQztpQkFBTTtnQkFDTixZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFv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