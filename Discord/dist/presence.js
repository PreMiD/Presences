var presence = new Presence({
    clientId: "616940877042155531"
});
var user, group, typing, typingicon, card, connected, apptitle, lastData, thisData, lastStamp;
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "discordwhite"
    };
    connected = document.querySelector("#app-mount > div > div > div > div > div > div > div > div > div > div > div > div > div > a > div");
    apptitle = document.querySelector(".appDetails-28RJ80.medium-zmzTW-.size16-1__VVI.height20-13xN5Z.primary-jw0I4K.weightMedium-3xlxJi");
    typingicon = "﻿";
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
    if (document.location.hostname == "discordapp.com" ||
        document.location.hostname == "discord.com") {
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
            group = document.querySelector("#app-mount > div > div > div:nth-child(2) > div > div > div > div:nth-child(2) > div > nav > div > header > h1");
            typing = document.querySelector("#app-mount > div > div > div:nth-child(2) > div > div > div > div:nth-child(2) > div:nth-child(2) > div > main > form > div > div > div > div > div:nth-child(3) > div");
            if (typing.className.toLowerCase().includes("placeholder")) {
                typing = false;
            }
            else {
                typing = typing.textContent !== typingicon;
            }
            card = document.querySelector("#app-mount > div > div > div:nth-child(2) > div > div > div > div:nth-child(2) > div > section > div > h3");
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
    else if (document.location.hostname == "status.discordapp.com" ||
        document.location.hostname == "status.discord.com") {
        presenceData.details = "Discord Status";
        presenceData.state = "Viewing Discords status";
        presenceData.smallImageKey = "reading";
        presenceData.startTimestamp = getTimeStamp();
    }
    else if (document.location.hostname == "support.discordapp.com" ||
        document.location.hostname == "support.discord.com") {
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
    else if (document.location.hostname == "blog.discordapp.com" ||
        document.location.hostname == "blog.discord.com") {
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
    else if (document.location.hostname == "merch.discordapp.com" ||
        document.location.hostname == "merch.discord.com") {
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksSUFBUyxFQUNYLEtBQVUsRUFDVixNQUFXLEVBQ1gsVUFBZSxFQUNmLElBQVMsRUFDVCxTQUFjLEVBQ2QsUUFBYSxFQUNiLFFBQWEsRUFDYixRQUFhLEVBQ2IsU0FBYyxDQUFDO0FBRWpCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsY0FBYztLQUM5QixDQUFDO0lBQ0YsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ2hDLG9HQUFvRyxDQUNyRyxDQUFDO0lBQ0YsUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQy9CLG1HQUFtRyxDQUNwRyxDQUFDO0lBQ0YsVUFBVSxHQUFHLEdBQUcsQ0FBQztJQUVqQixTQUFTLFlBQVk7UUFDbkIsSUFBSSxhQUFrQixDQUFDO1FBQ3ZCLFFBQVEsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDO1FBQ2hDLElBQUksUUFBUSxJQUFJLFFBQVEsRUFBRTtZQUN4QixhQUFhLEdBQUcsU0FBUyxDQUFDO1NBQzNCO2FBQU07WUFDTCxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDMUMsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQy9DO1FBQ0QsT0FBTyxhQUFhLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQ0UsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksZ0JBQWdC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