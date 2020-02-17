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
var board, team, team2, teamfinish, user, user2, freeornah, freeornah2, freeornah3, card, personal, personal2, profile, board2;
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
        user2 = document.querySelector("#content > div > div > div > div:nth-child(3) > a > span");
        freeornah3 = document.querySelector("#content > div > div > div > div:nth-child(3) > a > span > span");
        if (team !== null) {
            teamfinish = team.innerText.replace(freeornah.innerText, "");
        }
        else if (team2 !== null) {
            teamfinish = team2.innerText.replace(freeornah2.innerText, "");
        }
        else if (user2 !== null) {
            teamfinish = user2.innerText.replace(freeornah3.innerText, "");
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
            teamfinish = "ERROR, SEE CONSOLE";
            PMD_error("Error in catching the board leader/team name, please contact Bas950#0950 on the PreMiD discord. discord.gg/premid");
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
