var presence = new Presence({
    clientId: "614583717951963137"
});
var board, profile;
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "trello"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.hostname == "trello.com") {
        if (document.location.pathname.includes("/b/")) {
            if (document.querySelector(".board-header-btn.board-header-btn-org-name.js-open-org-menu") !== null) {
                presenceData.details =
                    "Viewing board: " +
                        document.querySelector(".js-board-editing-target.board-header-btn-text").textContent;
                presenceData.state =
                    "By team: " +
                        document
                            .querySelector(".board-header-btn.board-header-btn-org-name.js-open-org-menu")
                            .textContent.replace(document.querySelector(".org-label").textContent, "");
            }
            else {
                presenceData.details = "Viewing board:";
                presenceData.state = document.querySelector(".js-board-editing-target.board-header-btn-text").textContent;
            }
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/c/")) {
            presenceData.details =
                "Viewing card: " + document.querySelector(".window-title").textContent;
            presenceData.state =
                "Board: " +
                    document.querySelector(".js-board-editing-target.board-header-btn-text")
                        .textContent;
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/activity")) {
            profile = document.location.pathname.split("/", 3);
            presenceData.details = "Viewing @" + profile[1] + "'s";
            presenceData.state = "recent activites";
        }
        else if (document.location.pathname.includes("/cards")) {
            profile = document.location.pathname.split("/", 3);
            presenceData.details = "Viewing @" + profile[1] + "'s";
            presenceData.state = "recent cards";
        }
        else if (document.location.pathname.includes("/boards")) {
            profile = document.location.pathname.split("/", 3);
            presenceData.details = "Viewing @" + profile[1] + "'s boards";
        }
        else if (document.location.pathname.includes("/home")) {
            profile = document.location.pathname.split("/", 3);
            presenceData.details = "Viewing Team: " + profile[1];
        }
        else if (document.location.pathname.includes("/account") ||
            document.location.pathname.includes("/billing")) {
            presenceData.details = "Changing account settings";
        }
        else if (document.location.pathname.includes("/shortcuts")) {
            presenceData.details = "Viewing shortcut settings";
        }
        else if (document.location.pathname.includes("/tour")) {
            presenceData.details = "Viewing Trello's Tour";
        }
        else if (document.location.pathname.includes("/pricing")) {
            presenceData.details = "Viewing Trello's Pricing";
        }
        else if (document.location.pathname.includes("/platforms")) {
            presenceData.details = "Viewing Trello's Platforms";
        }
        else if (document.location.pathname.includes("/about")) {
            presenceData.details = "Viewing Trello's";
            presenceData.state = "About page";
        }
        else if (document.location.pathname.includes("/")) {
            profile = document.querySelector("#content > div > div.tabbed-pane-header > div > div > div > div._2MiqoEbHZgSlXq > span._32mB-ZO8fxjtUy");
            if (profile !== null) {
                presenceData.details = "Viewing own profile page";
            }
            else {
                presenceData.details = "Viewing home page";
            }
        }
    }
    else if (document.location.hostname == "help.trello.com") {
        if (document.location.pathname.includes("/article/")) {
            board = document.querySelector("#fullArticle > h1");
            presenceData.details = "Help Center, article:";
            presenceData.state = board.textContent;
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/category/")) {
            board = document.querySelector("#categoryHead > h1");
            presenceData.details = "Help Center, category:";
            presenceData.state = board.textContent;
            presenceData.smallImageKey = "reading";
        }
        else {
            presenceData.details = "Viewing Trello's";
            presenceData.state = "Help Center";
        }
    }
    else if (document.location.hostname == "blog.trello.com") {
        if (document.location.pathname.includes("/topic/")) {
            board = document.querySelector("body > div.body-container-wrapper > div > div > div > div > div > div.row-fluid > div > div.row-fluid-wrapper.row-depth-1.row-number-3 > div > div > div > h2");
            presenceData.details = "Blog, topic:";
            presenceData.state = board.textContent;
        }
        else if (document.location.pathname.includes("/author/")) {
            profile = document.querySelector("body > div.body-container-wrapper > div > div > div > div > div > div.row-fluid > div > div.row-fluid-wrapper.row-depth-1.row-number-6 > div > div > div > div > div > div:nth-child(1) > div > h2");
            presenceData.details = "Blog, viewing profile:";
            presenceData.state = profile.textContent;
        }
        else if (document.location.pathname.includes("/search")) {
            profile = document.querySelector("#gsc-i-id1");
            presenceData.details = "Blog, searching for:";
            presenceData.state = profile.value;
            presenceData.smallImageKey = "search";
        }
        else if (document.location.pathname.includes("/")) {
            board = document.querySelector("#hs_cos_wrapper_name");
            if (board !== null) {
                presenceData.details = "Blog, article:";
                presenceData.state = board.textContent;
                presenceData.smallImageKey = "reading";
            }
            else {
                presenceData.details = "Viewing Trello's";
                presenceData.state = "Blog page";
            }
        }
    }
    else if (document.location.hostname == "developers.trello.com") {
        if (document.location.pathname.includes("/reference")) {
            profile = document.URL.split("#", 2);
            presenceData.details = "Developers, API Docs:";
            presenceData.state = profile[1];
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/docs")) {
            presenceData.details = "Developers, Reading guide";
            presenceData.smallImageKey = "reading";
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksS0FBVSxFQUFFLE9BQVksQ0FBQztBQUU3QixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVsRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxJQUFJLFlBQVksR0FBaUI7UUFDaEMsYUFBYSxFQUFFLFFBQVE7S0FDdkIsQ0FBQztJQUVGLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0lBRTVDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksWUFBWSxFQUFFO1FBQy9DLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQy9DLElBQ0MsUUFBUSxDQUFDLGFBQWEsQ0FDckIsOERBQThELENBQzlELEtBQUssSUFBSSxFQUNUO2dCQUNELFlBQVksQ0FBQyxPQUFPO29CQUNuQixpQkFBaUI7d0JBQ2pCLFFBQVEsQ0FBQyxhQUFhLENBQ3JCLGdEQUFnRCxDQUNoRCxDQUFDLFdBQVcsQ0FBQztnQkFDZixZQUFZLENBQUMsS0FBSztvQkFDakIsV0FBVzt3QkFDWCxRQUFROzZCQUNOLGFBQWEsQ0FDYiw4REFBOEQsQ0FDOUQ7NkJBQ0EsV0FBVyxDQUFDLE9BQU8sQ0FDbkIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxXQUFXLEVBQ2hELEVBQUUsQ0FDRixDQUFDO2FBQ0o7aUJBQU07Z0JBQ04sWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0Is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