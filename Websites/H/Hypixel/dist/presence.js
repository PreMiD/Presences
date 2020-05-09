var presence = new Presence({
    clientId: "629093766170411014"
});
var user, search, title;
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "hypixel"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.hostname == "hypixel.net") {
        title = document.querySelector("#headerFix > div.hypixel_titleWrapper > div > div > h1 > nav > fieldset > span > span > a > span");
        if (document.location.pathname.includes("/threads/")) {
            title = document.querySelector("#headerFix > div.hypixel_titleWrapper > div > div > h1");
            search = document.querySelector("#headerFix > div.hypixel_titleWrapper > div > div > h1 > nav");
            title = title.innerText.replace(search.innerText, "").replace("»", "");
            presenceData.details = "Forums, viewing thread:";
            if (title.length > 128) {
                presenceData.state = title.substring(0, 125) + "...";
            }
            else {
                presenceData.state = title;
            }
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/forums/")) {
            title = document.querySelector("#headerFix > div.hypixel_titleWrapper > div > div > h1");
            if (title != null) {
                title = document.querySelector("#headerFix > div.hypixel_titleWrapper > div > div > h1");
                search = document.querySelector("#headerFix > div.hypixel_titleWrapper > div > div > h1 > nav");
                title = title.innerText.replace(search.innerText, "").replace("»", "");
                presenceData.details = "Forums, viewing category:";
                presenceData.state = title;
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
            else {
                presenceData.details = "Forums, Browsing...";
                delete presenceData.state;
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
        }
        else if (document.location.pathname.includes("/find-new/") &&
            document.location.pathname.includes("/profile-posts")) {
            presenceData.details = "Forums, Viewing the list of";
            presenceData.state = "latest profile posts";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/find-new/") &&
            document.location.pathname.includes("/posts")) {
            presenceData.details = "Forums, Viewing the list of";
            presenceData.state = "latest posts";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/find-new/") &&
            document.location.pathname.includes("/media")) {
            presenceData.details = "Forums, Viewing the list of";
            presenceData.state = "latest media posts";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/search/")) {
            search = document.querySelector("#headerFix > div.hypixel_titleWrapper > div > div > h1 > a > em");
            if (search != null) {
                presenceData.details = "Forums, searching for:";
                presenceData.state = search.innerText;
                presenceData.smallImageKey = "search";
                presence.setActivity(presenceData);
            }
            else {
                presenceData.details = "Forums, about to search";
                presenceData.state = "something up";
                presenceData.smallImageKey = "search";
                presence.setActivity(presenceData);
            }
        }
        else if (document.location.pathname.includes("/members/")) {
            user = document.querySelector("#content > div > div > div.mainContainer_noSidebar > div > div.mainProfileColumn > div > div > h1");
            presenceData.details = "Forums, viewing user:";
            presenceData.state = user.innerText;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/XenStaff/")) {
            presenceData.details = "Forums, viewing staff list";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/account/")) {
            presenceData.details = "Forums, account settings";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/watched/")) {
            if (document.location.pathname.includes("/threads")) {
                presenceData.details = "Forums, Viewing their";
                presenceData.state = "watched threads";
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
            else {
                presenceData.details = "Forums, Viewing their";
                presenceData.state = "watched forums";
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
        }
        else if (document.location.pathname.includes("/media/")) {
            if (document.querySelector("#content > div > div > div.uix_contentFix > div > div > div.mediaAttribution > h1") != null) {
                title = document.querySelector("#content > div > div > div.uix_contentFix > div > div > div.mediaAttribution > h1");
                presenceData.details = "Media, Viewing post:";
                presenceData.state = title.innerText;
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
            else if (document.location.pathname.includes("/categories/")) {
                title = document.querySelector("#headerFix > div.hypixel_titleWrapper > div > div > h1");
                search = document.querySelector("#headerFix > div.hypixel_titleWrapper > div > div > h1 > nav");
                title = title.innerText.replace(search.innerText, "").replace("»", "");
                presenceData.details = "Media, Viewing category:";
                presenceData.state = title;
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
            else {
                presenceData.details = "Media, Browsing...";
                delete presenceData.state;
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
        }
        else if (document.location.pathname.includes("/conversations/")) {
            if (document.querySelector("#headerFix > div.hypixel_titleWrapper > div > div > h1") != null) {
                title = document.querySelector("#headerFix > div.hypixel_titleWrapper > div > div > h1");
                search = document.querySelector("#headerFix > div.hypixel_titleWrapper > div > div > h1 > nav");
                title = title.innerText.replace(search.innerText, "").replace("»", "");
                presenceData.details = "Forums, Reading DM:";
                if (title.length > 128) {
                    presenceData.state = title.substring(0, 125) + "...";
                }
                else {
                    presenceData.state = title;
                }
                presenceData.smallImageKey = "reading";
                presence.setActivity(presenceData);
            }
            else {
                presenceData.details = "Forums, Browsing";
                presenceData.state = "through their DMs";
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
        }
        else if (document.location.pathname.includes("/players/")) {
            presenceData.details = "Leaderboards, Browsing...";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/player/")) {
            user = document.querySelector("#headerFix > div.hypixel_titleWrapper.shiftedTitle > div > div > h1 > nav > fieldset > span > span:nth-child(2) > a > span");
            presenceData.details = "Players, Viewing:";
            presenceData.state = user.innerText;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/play/")) {
            presenceData.details = "At: Play on Hypixel";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/rules/")) {
            presenceData.details = "Viewing the rules";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/jobs/")) {
            presenceData.details = "Viewing the jobs";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/help/")) {
            presenceData.details = "Help, viewing:";
            title = document.querySelector("#headerFix > div.hypixel_titleWrapper > div > div > h1");
            search = document.querySelector("#headerFix > div.hypixel_titleWrapper > div > div > h1 > nav");
            title = title.innerText.replace(search.innerText, "").replace("»", "");
            presenceData.state = title;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/leaderboard")) {
            title = document.querySelector("#headerFix > div.hypixel_titleWrapper > div > div > h1");
            search = document.querySelector("#headerFix > div.hypixel_titleWrapper > div > div > h1 > nav");
            title = title.innerText
                .replace(search.innerText, "")
                .replace("»", "")
                .replace(" - Leaderboard", "");
            presenceData.details = "Leaderboards, Viewing:";
            presenceData.state = title;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (title !== null && title.innerText == "Games") {
            title = document.querySelector("#headerFix > div.hypixel_titleWrapper > div > div > h1");
            search = document.querySelector("#headerFix > div.hypixel_titleWrapper > div > div > h1 > nav");
            title = title.innerText.replace(search.innerText, "").replace("»", "");
            presenceData.details = "Viewing game:";
            presenceData.state = title;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else {
            presence.setActivity();
            presence.setTrayTitle();
        }
    }
    else if (document.location.hostname == "support.hypixel.net") {
        presenceData.details = "Support Center";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "store.hypixel.net") {
        title = document.querySelector("head > title");
        presenceData.details = "Store, viewing:";
        presenceData.state = title.innerText.replace("Hypixel Server Store | ", "");
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else {
        presence.setActivity();
        presence.setTrayTitle();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksSUFBUyxFQUFFLE1BQVcsRUFBRSxLQUFVLENBQUM7QUFFdkMsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLGFBQWEsRUFBRSxTQUFTO0tBQ3pCLENBQUM7SUFFRixZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztJQUM1QyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWEsRUFBRTtRQUMvQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDNUIsa0dBQWtHLENBQ25HLENBQUM7UUFDRixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUNwRCxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDNUIsd0RBQXdELENBQ3pELENBQUM7WUFDRixNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDN0IsOERBQThELENBQy9ELENBQUM7WUFDRixLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZFLFlBQVksQ0FBQyxPQUFPLEdBQUcseUJBQXlCLENBQUM7WUFDakQsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFH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