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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksS0FBVSxFQUFFLE9BQVksQ0FBQztBQUU3QixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVsRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxJQUFJLFlBQVksR0FBaUI7UUFDL0IsYUFBYSxFQUFFLFFBQVE7S0FDeEIsQ0FBQztJQUVGLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0lBRTVDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksWUFBWSxFQUFFO1FBQzlDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzlDLElBQ0UsUUFBUSxDQUFDLGFBQWEsQ0FDcEIsOERBQThELENBQy9ELEtBQUssSUFBSSxFQUNWO2dCQUNBLFlBQVksQ0FBQyxPQUFPO29CQUNsQixpQkFBaUI7d0JBQ2pCLFFBQVEsQ0FBQyxhQUFhLENBQ3BCLGdEQUFnRCxDQUNqRCxDQUFDLFdBQVcsQ0FBQztnQkFDaEIsWUFBWSxDQUFDLEtBQUs7b0JBQ2hCLFdBQVc7d0JBQ1gsUUFBUTs2QkFDTCxhQUFhLENBQ1osOERBQThELENBQy9EOzZCQUNBLFdBQVcsQ0FBQyxPQUFPLENBQ2xCLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUMsV0FBVyxFQUNoRCxFQUFFLENBQ0gsQ0FBQzthQUNQO2lCQUFNO2dCQUNMLFlBQVksQ0FBQyxPQUFPLEdBQUcsZ0JBQWdC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