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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksSUFBUyxFQUNYLEtBQVUsRUFDVixNQUFXLEVBQ1gsVUFBZSxFQUNmLElBQVMsRUFDVCxTQUFjLEVBQ2QsUUFBYSxFQUNiLFFBQWEsRUFDYixRQUFhLEVBQ2IsU0FBYyxDQUFDO0FBRWpCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksWUFBWSxHQUFpQjtRQUMvQixhQUFhLEVBQUUsY0FBYztLQUM5QixDQUFDO0lBQ0YsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ2hDLG9HQUFvRyxDQUNyRyxDQUFDO0lBQ0YsUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQy9CLG1HQUFtRyxDQUNwRyxDQUFDO0lBQ0YsVUFBVSxHQUFHLEdBQUcsQ0FBQztJQUVqQixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGdCQUFnQixFQUFFO1FBQ2xELElBQUksU0FBUyxLQUFLLElBQUksSUFBSSxTQUFTLENBQUMsV0FBVyxLQUFLLEVBQUUsRUFBRTtZQUN0RCxZQUFZLENBQUMsY0FBYyxHQUFHLFlBQVksRUFBRSxDQUFDO1lBQzdDLFlBQVksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO1lBQ3BDLElBQUksU0FBUyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3ZDLFlBQVksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7Z0JBQzlDLFlBQVksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQzthQUM1QztpQkFBTTtnQkFDTCxZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFv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