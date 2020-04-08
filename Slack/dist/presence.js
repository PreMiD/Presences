var presence = new Presence({
    clientId: "617113314572369973"
});
var group, typing, chat, user, search;
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "slack"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.hostname == "app.slack.com") {
        group = document.querySelector("#team-menu-trigger > div.p-classic_nav__team_header__team > div.p-classic_nav__team_header__team__name");
        user = document.querySelector("body > div.p-client_container > div > div > div.p-workspace__top_nav > div > div.p-classic_nav__channel_header.p-classic_nav__model_header > div.p-classic_nav__model__title > div.p-classic_nav__model__title__name.p-classic_nav__no_drag > button > span:nth-child(1)");
        chat = document.querySelector("body > div.p-client_container > div > div > div.p-workspace__top_nav > div > div.p-classic_nav__channel_header.p-classic_nav__model_header > div.p-classic_nav__model__title > div.p-classic_nav__model__title__name.p-classic_nav__no_drag > button");
        typing = document.querySelector("#undefined");
        if (user !== null) {
            if (!typing.className.includes("ql-blank")) {
                presenceData.details = "Typing in DMs to:";
                presenceData.state =
                    user.innerText + " (Workspace: " + group.innerText + ")";
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
            else {
                presenceData.details = "Reading DMs from:";
                presenceData.state =
                    user.innerText + " (Workspace: " + group.innerText + ")";
                presenceData.smallImageKey = "reading";
                presence.setActivity(presenceData);
            }
        }
        else if (chat !== null) {
            if (!typing.className.includes("ql-blank")) {
                presenceData.details = "Typing in channel:";
                presenceData.state =
                    "#" + chat.innerText + " (Workspace: " + group.innerText + ")";
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
            else {
                presenceData.details = "Reading channel messages:";
                presenceData.state =
                    "#" + chat.innerText + " (Workspace: " + group.innerText + ")";
                presenceData.smallImageKey = "reading";
                presence.setActivity(presenceData);
            }
        }
        else {
            presence.setActivity();
            presence.setTrayTitle();
        }
    }
    else if (document.location.hostname == "slackhq.com" &&
        document.location.pathname.includes("/search/")) {
        search = document.location.pathname.split("/", 7);
        presenceData.details = "Slack Blog";
        presenceData.state = "Searching for: " + search[2];
        presenceData.smallImageKey = "search";
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "slackhq.com" &&
        document.location.pathname.includes("/role/")) {
        search = document.location.pathname.split("/", 7);
        presenceData.details = "Slack Blog";
        presenceData.state = "Searching with role: " + search[2];
        presenceData.smallImageKey = "search";
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "slackhq.com" &&
        document.location.pathname.includes("/tags/")) {
        search = document.location.pathname.split("/", 7);
        presenceData.details = "Slack Blog";
        presenceData.state = "Searching with tag: " + search[2];
        presenceData.smallImageKey = "search";
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "slackhq.com" &&
        document.location.pathname.includes("/categories/")) {
        search = document.location.pathname.split("/", 7);
        presenceData.details = "Slack Blog";
        presenceData.state = "Searching with category: " + search[2];
        presenceData.smallImageKey = "search";
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "slackhq.com") {
        group = document.querySelector("#main > article > header > div > div > div > h1");
        if (group !== null) {
            presenceData.details = "Slack Blog";
            presenceData.state = "Reading article: " + group.innerText;
            presenceData.smallImageKey = "reading";
            presence.setActivity(presenceData);
        }
        else {
            presenceData.details = "Slack Blog";
            presenceData.state = "Home page";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.hostname == "get.slack.help" &&
        document.location.pathname.includes("/categories/")) {
        search = document.querySelector("body > main > section > div.banner_container > h1");
        presenceData.details = "Slack Help Center";
        presenceData.state = "Browsing through category: " + search.innerText;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "get.slack.help" &&
        document.location.pathname.includes("/articles/")) {
        search = document.querySelector("body > main > div.article_page.has_sidenav > div.article_container > div.content_col > h1");
        presenceData.details = "Slack Help Center";
        presenceData.state = "Reading article: " + search.innerText;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "get.slack.help" &&
        document.location.pathname.includes("/search")) {
        search = document.querySelector("body > main > section.banner.banner_search_results > div > h1 > span.hidden.query_val");
        presenceData.details = "Slack Help Center";
        presenceData.state = "Searching for: " + search.innerText;
        presenceData.smallImageKey = "search";
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "get.slack.help") {
        presenceData.details = "Slack Help Center";
        presenceData.state = "Home page";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "api.slack.com" &&
        document.location.pathname.includes("/apps")) {
        presenceData.details = "Slack api";
        presenceData.state = "Browsing through their apps";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "api.slack.com") {
        group = document.querySelector("#api_main_content > h1");
        if (group !== null) {
            presenceData.details = "Slack api";
            presenceData.state = "Reading article: " + group.innerText;
            presenceData.smallImageKey = "reading";
            presence.setActivity(presenceData);
        }
        else {
            presenceData.details = "Slack api";
            presenceData.state = "Home page";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.hostname == "slackdemo.com") {
        presenceData.details = "Slack Demo";
        presenceData.state = "Trying out Slack";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "slack.com" &&
        document.location.pathname.includes("/pricing")) {
        presenceData.details = "Slack";
        presenceData.state = "Checking the pricing";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "slack.com" &&
        document.location.pathname.includes("/enterprise")) {
        presenceData.details = "Slack";
        presenceData.state = "Checking the enterprise plan";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "slack.com" &&
        document.location.pathname.includes("/resources")) {
        group = document.location.pathname.split("/", 9);
        if (group[4] !== null) {
            group = document.querySelector("#main > div:nth-child(1) > h1");
            presenceData.details = "Slack";
            presenceData.state = "Reading article: " + group.innerText;
            presenceData.smallImageKey = "reading";
            presence.setActivity(presenceData);
        }
        else {
            presence.setActivity();
            presence.setTrayTitle();
        }
    }
    else if (document.location.hostname == "slack.com" &&
        document.location.pathname.includes("/slack-tips")) {
        group = document.location.pathname.split("/", 9);
        if (group[4] !== null) {
            group = document.querySelector("#main > section > div > header > h1");
            presenceData.details = "Slack";
            presenceData.state = "Reading article: " + group.innerText;
            presenceData.smallImageKey = "reading";
            presence.setActivity(presenceData);
        }
        else {
            presence.setActivity();
            presence.setTrayTitle();
        }
    }
    else if (document.location.hostname == "slack.com" &&
        document.location.pathname.includes("/solutions")) {
        group = document.location.pathname.split("/", 9);
        if (group[4] !== null) {
            group = document.querySelector("#main > section.c-billboard > div > header > h1");
            presenceData.details = "Slack";
            presenceData.state = "Reading article: " + group.innerText;
            presenceData.smallImageKey = "reading";
            presence.setActivity(presenceData);
        }
        else {
            presence.setActivity();
            presence.setTrayTitle();
        }
    }
    else if (document.location.hostname == "slack.com" &&
        document.location.pathname.includes("/features")) {
        presenceData.details = "Slack";
        presenceData.state = "Checking the features";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "slack.com" &&
        document.location.pathname.includes("/security")) {
        presenceData.details = "Slack";
        presenceData.state = "Checking the security";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "slack.com" &&
        document.location.pathname.includes("/customer-stories")) {
        presenceData.details = "Slack";
        presenceData.state = "Checking the customer stories";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "slack.com" &&
        document.location.pathname.includes("/about")) {
        presenceData.details = "Slack";
        presenceData.state = "Checking the about page";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "slack.com" &&
        document.location.pathname.includes("/partners")) {
        presenceData.details = "Slack";
        presenceData.state = "Checking the partners";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "slack.com" &&
        document.location.pathname.includes("/newsroom")) {
        presenceData.details = "Slack";
        presenceData.state = "Checking the latest news";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "slack.com" &&
        document.location.pathname.includes("/media-kit")) {
        presenceData.details = "Slack";
        presenceData.state = "Checking the media kit";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "slack.com" &&
        document.location.pathname.includes("/careers")) {
        presenceData.details = "Slack";
        presenceData.state = "Checking the careers";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "slack.com" &&
        document.location.pathname.includes("/intl")) {
        presenceData.details = "Slack";
        presenceData.state = "Home page";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.querySelector("#header_team_name > a") !== null) {
        group = document.querySelector("#header_team_name > a");
        presenceData.details = "Viewing admin pages for:";
        presenceData.state = group.innerText;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.querySelector("#apps-page-app-element > header > nav > div.menu_actions > ul > li.left_margin.float_right > div > div > div > div > div.c-menu_select__label") !== null) {
        group = document.querySelector("#apps-page-app-element > header > nav > div.menu_actions > ul > li.left_margin.float_right > div > div > div > div > div.c-menu_select__label");
        presenceData.details = "Viewing admin pages for:";
        presenceData.state = group.innerText;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.querySelector("#apps-page-app-element > header > nav > div.menu_actions > ul > li.left_margin.float_right > span") !== null) {
        group = document.querySelector("#apps-page-app-element > header > nav > div.menu_actions > ul > li.left_margin.float_right > span");
        presenceData.details = "Viewing admin pages for:";
        presenceData.state = group.innerText;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else {
        presence.setActivity();
        presence.setTrayTitle();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksS0FBVSxFQUFFLE1BQVcsRUFBRSxJQUFTLEVBQUUsSUFBUyxFQUFFLE1BQVcsQ0FBQztBQUUvRCxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVsRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLE9BQU87S0FDdkIsQ0FBQztJQUVGLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0lBRTVDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksZUFBZSxFQUFFO1FBQ2pELEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM1Qix3R0FBd0csQ0FDekcsQ0FBQztRQUNGLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUMzQiwwUUFBMFEsQ0FDM1EsQ0FBQztRQUNGLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUMzQixzUEFBc1AsQ0FDdlAsQ0FBQztRQUNGLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzlDLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtZQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQzFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7Z0JBQzNDLFlBQVksQ0FBQyxLQUFLO29CQUNoQixJQUFJLENBQUMsU0FBUyxHQUFHLGVBQWUsR0FBRyxLQUFLLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztnQkFFM0QsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO2dCQUVsQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ3BDO2lCQUFNO2dCQUNMLFlBQVksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7Z0JBQzNDLFlBQVksQ0FBQyxLQUFLO29CQUNoQixJQUFJLENBQUMsU0FBUyxHQUFHLGVBQWUsR0FBRyxLQUFLLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztnQkFFM0QsWUFBWSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7Z0JBRXZDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDcEM7U0FDRjthQUFNLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtZQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQzFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsb0JBQW9CLENBQUM7Z0JBQzVDLFlBQVksQ0FBQyxLQUFLO29CQUNoQixHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxlQUFlLEdBQUcsS0FBSyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7Z0JBRWpFLE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQztnQkFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNwQztpQkFBTTtnQkFDTCxZQUFZLENBQUMsT0FBTyxHQUFHLDJCQUEyQixDQUFDO2dCQUNuRCxZQUFZLENBQUMsS0FBSztvQkFDaEIsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsZUFBZSxHQUFHLEtBQUssQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO2dCQUVqRSxZQUFZLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztnQkFFdkMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNwQztTQUNGO2FBQU07WUFDTCxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdkIsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3pCO0tBQ0Y7U0FBTSxJQUNMLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWE7UUFDM0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUMvQztRQUNBLE1BQU0sR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xELFlBQVksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDO1FBQ3BDLFlBQVksQ0FBQyxLQUFLLEdBQUcsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRW5ELFlBQVksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1FBRXRDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTSxJQUNMLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWE7UUFDM0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUM3QztRQUNBLE1BQU0sR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xELFlBQVksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDO1FBQ3BDLFlBQVksQ0FBQyxLQUFLLEdBQUcsdUJBQXVCLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXpELFlBQVksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1FBRXRDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTSxJQUNMLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWE7UUFDM0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUM3QztRQUNBLE1BQU0sR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xELFlBQVksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDO1FBQ3BDLFlBQVksQ0FBQyxLQUFLLEdBQUcsc0JBQXNCLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXhELFlBQVksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1FBRXRDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTSxJQUNMLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWE7UUFDM0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUNuRDtRQUNBLE1BQU0sR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xELFlBQVksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDO1FBQ3BDLFlBQVksQ0FBQyxLQUFLLEdBQUcsMkJBQTJCLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTdELFlBQVksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1FBRXRDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWEsRUFBRTtRQUN0RCxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDNUIsaURBQWlELENBQ2xELENBQUM7UUFDRixJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDbEIsWUFBWSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUM7WUFDcEMsWUFBWSxDQUFDLEtBQUssR0FBRyxtQkFBbUIsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBRTNELFlBQVksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1lBRXZDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7YUFBTTtZQUNMLFlBQVksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDO1lBQ3BDLFlBQVksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO1lBRWpDLE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQztZQUVsQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BDO0tBQ0Y7U0FBTSxJQUNMLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGdCQUFnQjtRQUM5QyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQ25EO1FBQ0EsTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzdCLG1EQUFtRCxDQUNwRCxDQUFDO1FBQ0YsWUFBWSxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQztRQUMzQyxZQUFZLENBQUMsS0FBSyxHQUFHLDZCQUE2QixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFFdEUsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1FBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTSxJQUNMLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGdCQUFnQjtRQUM5QyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQ2pEO1FBQ0EsTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzdCLDJGQUEyRixDQUM1RixDQUFDO1FBQ0YsWUFBWSxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQztRQUMzQyxZQUFZLENBQUMsS0FBSyxHQUFHLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFFNUQsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1FBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTSxJQUNMLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGdCQUFnQjtRQUM5QyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQzlDO1FBQ0EsTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzdCLHVGQUF1RixDQUN4RixDQUFDO1FBQ0YsWUFBWSxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQztRQUMzQyxZQUFZLENBQUMsS0FBSyxHQUFHLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFFMUQsWUFBWSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7UUFFdEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksZ0JBQWdCLEVBQUU7UUFDekQsWUFBWSxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQztRQUMzQyxZQUFZLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztRQUVqQyxPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7UUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztTQUFNLElBQ0wsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksZUFBZTtRQUM3QyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQzVDO1FBQ0EsWUFBWSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7UUFDbkMsWUFBWSxDQUFDLEtBQUssR0FBRyw2QkFBNkIsQ0FBQztRQUVuRCxPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7UUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksZUFBZSxFQUFFO1FBQ3hELEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDekQsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQ2xCLFlBQVksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDO1lBQ25DLFlBQVksQ0FBQyxLQUFLLEdBQUcsbUJBQW1CLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztZQUUzRCxZQUFZLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztZQUV2QyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BDO2FBQU07WUFDTCxZQUFZLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztZQUNuQyxZQUFZLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztZQUVqQyxPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7WUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwQztLQUNGO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxlQUFlLEVBQUU7UUFDeEQsWUFBWSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUM7UUFDcEMsWUFBWSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQztRQUV4QyxPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7UUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztTQUFNLElBQ0wsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksV0FBVztRQUN6QyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQy9DO1FBQ0EsWUFBWSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDL0IsWUFBWSxDQUFDLEtBQUssR0FBRyxzQkFBc0IsQ0FBQztRQUU1QyxPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7UUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztTQUFNLElBQ0wsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksV0FBVztRQUN6QyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQ2xEO1FBQ0EsWUFBWSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDL0IsWUFBWSxDQUFDLEtBQUssR0FBRyw4QkFBOEIsQ0FBQztRQUVwRCxPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7UUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztTQUFNLElBQ0wsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksV0FBVztRQUN6QyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQ2pEO1FBQ0EsS0FBSyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDakQsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ3JCLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLCtCQUErQixDQUFDLENBQUM7WUFDaEUsWUFBWSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDL0IsWUFBWSxDQUFDLEtBQUssR0FBRyxtQkFBbUIsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBRTNELFlBQVksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1lBRXZDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7YUFBTTtZQUNMLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN2QixRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDekI7S0FDRjtTQUFNLElBQ0wsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksV0FBVztRQUN6QyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQ2xEO1FBQ0EsS0FBSyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDakQsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ3JCLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHFDQUFxQyxDQUFDLENBQUM7WUFDdEUsWUFBWSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDL0IsWUFBWSxDQUFDLEtBQUssR0FBRyxtQkFBbUIsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBRTNELFlBQVksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1lBRXZDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7YUFBTTtZQUNMLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN2QixRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDekI7S0FDRjtTQUFNLElBQ0wsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksV0FBVztRQUN6QyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQ2pEO1FBQ0EsS0FBSyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDakQsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ3JCLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM1QixpREFBaUQsQ0FDbEQsQ0FBQztZQUNGLFlBQVksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQy9CLFlBQVksQ0FBQyxLQUFLLEdBQUcsbUJBQW1CLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztZQUUzRCxZQUFZLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztZQUV2QyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BDO2FBQU07WUFDTCxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdkIsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3pCO0tBQ0Y7U0FBTSxJQUNMLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLFdBQVc7UUFDekMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUNoRDtRQUNBLFlBQVksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQy9CLFlBQVksQ0FBQyxLQUFLLEdBQUcsdUJBQXVCLENBQUM7UUFFN0MsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1FBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTSxJQUNMLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLFdBQVc7UUFDekMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUNoRDtRQUNBLFlBQVksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQy9CLFlBQVksQ0FBQyxLQUFLLEdBQUcsdUJBQXVCLENBQUM7UUFFN0MsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1FBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTSxJQUNMLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLFdBQVc7UUFDekMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLEVBQ3hEO1FBQ0EsWUFBWSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDL0IsWUFBWSxDQUFDLEtBQUssR0FBRywrQkFBK0IsQ0FBQztRQUVyRCxPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7UUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztTQUFNLElBQ0wsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksV0FBVztRQUN6QyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQzdDO1FBQ0EsWUFBWSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDL0IsWUFBWSxDQUFDLEtBQUssR0FBRyx5QkFBeUIsQ0FBQztRQUUvQyxPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7UUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztTQUFNLElBQ0wsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksV0FBVztRQUN6QyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQ2hEO1FBQ0EsWUFBWSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDL0IsWUFBWSxDQUFDLEtBQUssR0FBRyx1QkFBdUIsQ0FBQztRQUU3QyxPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7UUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztTQUFNLElBQ0wsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksV0FBVztRQUN6QyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQ2hEO1FBQ0EsWUFBWSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDL0IsWUFBWSxDQUFDLEtBQUssR0FBRywwQkFBMEIsQ0FBQztRQUVoRCxPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7UUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztTQUFNLElBQ0wsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksV0FBVztRQUN6QyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQ2pEO1FBQ0EsWUFBWSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDL0IsWUFBWSxDQUFDLEtBQUssR0FBRyx3QkFBd0IsQ0FBQztRQUU5QyxPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7UUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztTQUFNLElBQ0wsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksV0FBVztRQUN6QyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQy9DO1FBQ0EsWUFBWSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDL0IsWUFBWSxDQUFDLEtBQUssR0FBRyxzQkFBc0IsQ0FBQztRQUU1QyxPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7UUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztTQUFNLElBQ0wsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksV0FBVztRQUN6QyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQzVDO1FBQ0EsWUFBWSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDL0IsWUFBWSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7UUFFakMsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1FBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDbkUsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUN4RCxZQUFZLENBQUMsT0FBTyxHQUFHLDBCQUEwQixDQUFDO1FBQ2xELFlBQVksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUVyQyxPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7UUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztTQUFNLElBQ0wsUUFBUSxDQUFDLGFBQWEsQ0FDcEIsK0lBQStJLENBQ2hKLEtBQUssSUFBSSxFQUNWO1FBQ0EsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzVCLCtJQUErSSxDQUNoSixDQUFDO1FBQ0YsWUFBWSxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQztRQUNsRCxZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFFckMsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1FBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTSxJQUNMLFFBQVEsQ0FBQyxhQUFhLENBQ3BCLG1HQUFtRyxDQUNwRyxLQUFLLElBQUksRUFDVjtRQUNBLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM1QixtR0FBbUcsQ0FDcEcsQ0FBQztRQUNGLFlBQVksQ0FBQyxPQUFPLEdBQUcsMEJBQTBCLENBQUM7UUFDbEQsWUFBWSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBRXJDLE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQztRQUVsQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO1NBQU07UUFDTCxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQ3pCO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==