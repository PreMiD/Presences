var presence = new Presence({
    clientId: "625795936286932993"
});
var user, search, title;
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "spigot"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.hostname == "www.spigotmc.org") {
        if (document.location.pathname.includes("/threads/")) {
            title = document.querySelector("#content > div > div > div.mainContainer_noSidebar > div > div.titleBar > h1");
            if (title == null) {
                title = document.querySelector("#content > div > div > div.mainContainer_noSidebar > div > div.resourceInfo > h1");
                presenceData.details = "Forums, viewing thread:";
                if (title.innerText.length > 128) {
                    presenceData.state = title.innerText.substring(0, 125) + "...";
                }
                else {
                    presenceData.state = title.innerText;
                }
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
            else {
                presenceData.details = "Forums, viewing thread:";
                if (title.innerText.length > 128) {
                    presenceData.state = title.innerText.substring(0, 125) + "...";
                }
                else {
                    presenceData.state = title.innerText;
                }
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
        }
        else if (document.location.pathname.includes("/forums/")) {
            title = document.querySelector("#content > div > div > div.mainContainer_noSidebar > div > div.titleBar > h1");
            if (title != null) {
                presenceData.details = "Forums, viewing category:";
                presenceData.state = title.innerText;
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
        else if (document.location.pathname.includes("/search/")) {
            search = document.querySelector("#content > div > div > div.uix_contentFix > div > div > div.titleBar > h1 > a > em");
            presenceData.details = "Forums, searching for:";
            presenceData.state = search.innerText;
            presenceData.smallImageKey = "search";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/members/")) {
            user = document.querySelector("#content > div > div > div.mainContainer_noSidebar > div > div > div.mainProfileColumn > div > div > h1");
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
        else if (document.location.pathname.includes("/wiki/")) {
            title = document.querySelector("#content > div > div > div.uix_contentFix > div > div > div.titleBar > h1");
            presenceData.details = "Wiki, viewing:";
            presenceData.state = title.innerText;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/irc/")) {
            presenceData.details = "Spigot IRC";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/resources/")) {
            if (document.querySelector("#divResourcesFround") != null) {
                search = document.querySelector("#divResourcesFround");
                if (search.innerText != "Resources Found: 0") {
                    presenceData.details = "Using SpigotSearchEngine:";
                    presenceData.state = search.innerText;
                    presenceData.smallImageKey = "search";
                    presence.setActivity(presenceData);
                }
                else {
                    presenceData.details = "Resources, Browsing...";
                    delete presenceData.state;
                    delete presenceData.smallImageKey;
                    presence.setActivity(presenceData);
                }
            }
            else if (document.location.pathname.includes("/authors/")) {
                title = document.querySelector("#authorStats > div > dl.authorName > dd > a");
                presenceData.details = "Resources, Viewing author:";
                presenceData.state = title.innerText;
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
            else if (document.location.pathname.includes("/categories/")) {
                title = document.querySelector("#content > div > div > div.mainContainer_noSidebar > div > div.titleBar > h1");
                presenceData.details = "Resources, Viewing category:";
                presenceData.state = title.innerText;
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
            else if (document.querySelector("#content > div > div > div.uix_contentFix > div > div > div.resourceInfo > h1") != null) {
                title = document.querySelector("#content > div > div > div.uix_contentFix > div > div > div.resourceInfo > h1");
                presenceData.details = "Resources, Viewing:";
                if (title.innerText.length > 128) {
                    presenceData.state = title.innerText.substring(0, 125) + "...";
                }
                else {
                    presenceData.state = title.innerText;
                }
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
            else if (document.location.pathname.includes("/edit")) {
                presenceData.details = "Resources, Doing an edit...";
                delete presenceData.state;
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
            else {
                presenceData.details = "Resources, Browsing...";
                delete presenceData.state;
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
        }
        else if (document.location.pathname.includes("/conversations/")) {
            if (document.querySelector("#content > div > div > div.uix_contentFix > div > div > div.titleBar > h1") != null) {
                title = document.querySelector("#content > div > div > div.uix_contentFix > div > div > div.titleBar > h1");
                presenceData.details = "Forums, Reading DM:";
                if (title.innerText.length > 128) {
                    presenceData.state = title.innerText.substring(0, 125) + "...";
                }
                else {
                    presenceData.state = title.innerText;
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
        else {
            presence.setActivity();
            presence.setTrayTitle();
        }
    }
    else if (document.location.hostname == "irc.spi.gt") {
        presenceData.details = "Spigot IRC";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "hub.spigotmc.org") {
        if (document.location.pathname == "/") {
            title = document.querySelector("head > title");
            presenceData.details = "Spigot Developer Hub";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else {
            title = document.querySelector("head > title");
            presenceData.details = "Spigot Developer Hub";
            presenceData.state = title.innerText.replace(" · hub.spigotmc.org", "");
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
    }
    else {
        presence.setActivity();
        presence.setTrayTitle();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksSUFBUyxFQUFFLE1BQVcsRUFBRSxLQUFVLENBQUM7QUFFdkMsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLGFBQWEsRUFBRSxRQUFRO0tBQ3hCLENBQUM7SUFFRixZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztJQUM1QyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGtCQUFrQixFQUFFO1FBQ3BELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3BELEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM1Qiw4RUFBOEUsQ0FDL0UsQ0FBQztZQUNGLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtnQkFDakIsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzVCLGtGQUFrRixDQUNuRixDQUFDO2dCQUNGLFlBQVksQ0FBQyxPQUFPLEdBQUcseUJBQXlCLENBQUM7Z0JBQ2pELElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFO29CQUNoQyxZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7aUJBQ2hFO3FCQUFNO29CQUNMLFlB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