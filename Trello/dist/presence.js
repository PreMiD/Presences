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
    clientId: "614583717951963137",
    mediaKeys: false
});
var board, team, team2, teamfinish, user, freeornah, freeornah2, card, personal, personal2, profile, board2;
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "trello"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.hostname == "trello.com" && document.location.pathname.includes("/b/")) {
        board = document.querySelector("#content > div > div.board-main-content > div.board-header.u-clearfix.js-board-header > div.board-header-btn.mod-board-name.inline-rename-board.js-rename-board > span");
        board2 = document.querySelector("#content > div > div.board-main-content > div.board-header.u-clearfix.js-board-header > div.board-header-btn.mod-board-name.inline-rename-board.no-edit > span");
        team = document.querySelector("#content > div > div.board-main-content > div.board-header.u-clearfix.js-board-header > a.board-header-btn.board-header-btn-org-name.js-open-org-menu.board-header-btn-without-icon > span");
        team2 = document.querySelector("#content > div > div.board-main-content > div.board-header.u-clearfix.js-board-header > a.board-header-btn.board-header-btn-org-name.js-open-org-menu > span");
        freeornah = document.querySelector("#content > div > div.board-main-content > div.board-header.u-clearfix.js-board-header > a.board-header-btn.board-header-btn-org-name.js-open-org-menu.board-header-btn-without-icon > span > span");
        freeornah2 = document.querySelector("#content > div > div.board-main-content > div.board-header.u-clearfix.js-board-header > a.board-header-btn.board-header-btn-org-name.js-open-org-menu > span > span");
        personal = document.querySelector("#content > div > div.board-main-content > div.board-header.u-clearfix.js-board-header > div:nth-child(3) > a.board-header-btn.board-header-btn-without-icon.board-header-btn-text.js-add-board-to-team.no-edit");
        personal2 = document.querySelector("#content > div > div.board-main-content > div.board-header.u-clearfix.js-board-header > div:nth-child(3) > a.board-header-btn.board-header-btn-without-icon.board-header-btn-text.js-add-board-to-team");
        user = document.querySelector("#content > div > div.board-main-content > div.board-header.u-clearfix.js-board-header > div:nth-child(5) > div > div.member.js-member.has-crown.long-initials > span.member-initials");
        if (team !== null) {
            teamfinish = team.innerText.replace(freeornah.innerText, "");
        }
        else if (team2 !== null) {
            teamfinish = team2.innerText.replace(freeornah2.innerText, "");
        }
        else if (personal !== null) {
            teamfinish = "Personal";
        }
        else if (personal2 !== null) {
            teamfinish = "Personal";
        }
        else if (user !== null) {
            teamfinish = user.title;
        }
        else {
            teamfinish = "ERROR, UNKNOWN";
        }
        if (board !== null) {
            presenceData.details = "Viewing board: " + board.innerText;
            presenceData.state = "By team: " + teamfinish;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (board2 !== null) {
            presenceData.details = "Viewing board: " + board2.innerText;
            presenceData.state = "By team: " + teamfinish;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else {
            presence.setActivity();
            presence.setTrayTitle();
        }
    }
    else if (document.location.hostname == "trello.com" && document.location.pathname.includes("/c/")) {
        board = document.querySelector("#content > div > div.board-main-content > div.board-header.u-clearfix.js-board-header > div.board-header-btn.mod-board-name.inline-rename-board.js-rename-board > span");
        team = document.querySelector("#content > div > div.board-main-content > div.board-header.u-clearfix.js-board-header > a.board-header-btn.board-header-btn-org-name.js-open-org-menu.board-header-btn-without-icon > span");
        freeornah = document.querySelector("#content > div > div.board-main-content > div.board-header.u-clearfix.js-board-header > a.board-header-btn.board-header-btn-org-name.js-open-org-menu.board-header-btn-without-icon > span > span");
        teamfinish = team.innerText.replace(freeornah.innerText, "");
        card = document.querySelector("#chrome-container > div.window-overlay > div > div > div > div.window-header > div.window-title > h2");
        presenceData.details = "Editting card: " + card.innerText;
        presenceData.state = "Board: " + board.innerText + " Team: " + teamfinish;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "trello.com" && document.location.pathname.includes("/activity")) {
        profile = document.location.pathname.split("/", 3);
        presenceData.details = "Viewing @" + profile[1] + "'s";
        presenceData.state = "recent activites";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "trello.com" && document.location.pathname.includes("/cards")) {
        profile = document.location.pathname.split("/", 3);
        presenceData.details = "Viewing @" + profile[1] + "'s";
        presenceData.state = "recent cards";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "trello.com" && document.location.pathname.includes("/boards")) {
        profile = document.location.pathname.split("/", 3);
        presenceData.details = "Viewing @" + profile[1] + "'s boards";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "trello.com" && document.location.pathname.includes("/home")) {
        profile = document.location.pathname.split("/", 3);
        presenceData.details = "Viewing Team: " + profile[1];
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "trello.com" && document.location.pathname.includes("/account")) {
        presenceData.details = "Changing account settings";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "trello.com" && document.location.pathname.includes("/billing")) {
        presenceData.details = "Changing account settings";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "trello.com" && document.location.pathname.includes("/shortcuts")) {
        presenceData.details = "Viewing shortcut settings";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "trello.com" && document.location.pathname.includes("/tour")) {
        presenceData.details = "Viewing Trello's Tour";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "trello.com" && document.location.pathname.includes("/pricing")) {
        presenceData.details = "Viewing Trello's Pricing";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "trello.com" && document.location.pathname.includes("/platforms")) {
        presenceData.details = "Viewing Trello's Platforms";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "trello.com" && document.location.pathname.includes("/about")) {
        presenceData.details = "Viewing Trello's";
        presenceData.state = "About page";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "trello.com" && document.location.pathname.includes("/")) {
        profile = document.querySelector("#content > div > div.tabbed-pane-header > div > div > div > div._2MiqoEbHZgSlXq > span._32mB-ZO8fxjtUy");
        if (profile !== null) {
            presenceData.details = "Viewing own profile page";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else {
            presenceData.details = "Viewing home page";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.hostname == "help.trello.com" && document.location.pathname.includes("/article/")) {
        board = document.querySelector("#fullArticle > h1");
        presenceData.details = "Help Center, article:";
        presenceData.state = board.innerText;
        presenceData.smallImageKey = "reading";
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "help.trello.com" && document.location.pathname.includes("/category/")) {
        board = document.querySelector("#categoryHead > h1");
        presenceData.details = "Help Center, category:";
        presenceData.state = board.innerText;
        presenceData.smallImageKey = "reading";
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "help.trello.com") {
        presenceData.details = "Viewing Trello's";
        presenceData.state = "Help Center";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "blog.trello.com" && document.location.pathname.includes("/topic/")) {
        board = document.querySelector("body > div.body-container-wrapper > div > div > div > div > div > div.row-fluid > div > div.row-fluid-wrapper.row-depth-1.row-number-3 > div > div > div > h2");
        presenceData.details = "Blog, topic:";
        presenceData.state = board.innerText;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "blog.trello.com" && document.location.pathname.includes("/author/")) {
        profile = document.querySelector("body > div.body-container-wrapper > div > div > div > div > div > div.row-fluid > div > div.row-fluid-wrapper.row-depth-1.row-number-6 > div > div > div > div > div > div:nth-child(1) > div > h2");
        presenceData.details = "Blog, viewing profile:";
        presenceData.state = profile.innerText;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "blog.trello.com" && document.location.pathname.includes("/search")) {
        profile = document.querySelector("#gsc-i-id1");
        presenceData.details = "Blog, searching for:";
        presenceData.state = profile.value;
        presenceData.smallImageKey = "search";
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "blog.trello.com" && document.location.pathname.includes("/")) {
        board = document.querySelector("#hs_cos_wrapper_name");
        if (board !== null) {
            presenceData.details = "Blog, article:";
            presenceData.state = board.innerText;
            presenceData.smallImageKey = "reading";
            presence.setActivity(presenceData);
        }
        else {
            presenceData.details = "Viewing Trello's";
            presenceData.state = "Blog page";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.hostname == "developers.trello.com" && document.location.pathname.includes("/reference")) {
        profile = document.URL.split("#", 2);
        presenceData.details = "Developers, API Docs:";
        presenceData.state = profile[1];
        presenceData.smallImageKey = "reading";
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "developers.trello.com" && document.location.pathname.includes("/docs")) {
        presenceData.details = "Developers, Reading guide";
        delete presenceData.state;
        presenceData.smallImageKey = "reading";
        presence.setActivity(presenceData);
    }
    else {
        presence.setActivity();
        presence.setTrayTitle();
    }
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUksWUFBWSxHQUFHLG1EQUFtRCxDQUFDO0FBRXZFLFNBQVMsUUFBUSxDQUFDLE9BQU87SUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FDVCxtQkFBbUIsR0FBRyxPQUFPLEVBQzdCLFlBQVksR0FBRyxvREFBb0QsRUFDbkUsWUFBWSxHQUFHLG9EQUFvRCxFQUNuRSxlQUFlLENBQ2hCLENBQUM7QUFDSixDQUFDO0FBRUQsU0FBUyxTQUFTLENBQUMsT0FBTztJQUN4QixPQUFPLENBQUMsR0FBRyxDQUNULG9CQUFvQixHQUFHLE9BQU8sRUFDOUIsWUFBWSxHQUFHLG9EQUFvRCxFQUNuRSxZQUFZLEdBQUcsb0RBQW9ELEVBQ25FLGVBQWUsQ0FDaEIsQ0FBQztBQUNKLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxPQUFPO0lBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQ1Qsc0JBQXNCLEdBQUcsT0FBTyxFQUNoQyxZQUFZLEdBQUcsb0RBQW9ELEVBQ25FLFlBQVk7UUFDVixrRUFBa0UsRUFDcEUsZUFBZSxDQUNoQixDQUFDO0FBQ0osQ0FBQztBQUVELElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzFCLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsU0FBUyxFQUFFLEtBQUs7Q0FDakIsQ0FBQyxDQUFBO0FBRUYsSUFBSSxLQUFXLEVBQUUsSUFBVSxFQUFFLEtBQVcsRUFBRSxVQUFnQixFQUFFLElBQVUsRUFBRSxTQUFlLEVBQUUsVUFBZ0IsRUFBRSxJQUFVLEVBQUUsUUFBYyxFQUFFLFNBQWUsRUFBRSxPQUFhLEVBQUUsTUFBWSxDQUFDO0FBRXBMLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFDLElBQUksQ0FBQyxDQUFDO0FBRWhELFFBQVEs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