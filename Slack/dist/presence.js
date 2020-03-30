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
    clientId: "617113314572369973"
});
var group, typing, chat, user, search, card, personal, personal2, profile, board2;
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    let presenceData = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFlBQVksR0FBRyxtREFBbUQsQ0FBQztBQUV2RSxTQUFTLFFBQVEsQ0FBQyxPQUFPO0lBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQ1YsbUJBQW1CLEdBQUcsT0FBTyxFQUM3QixZQUFZLEdBQUcsb0RBQW9ELEVBQ25FLFlBQVksR0FBRyxvREFBb0QsRUFDbkUsZUFBZSxDQUNmLENBQUM7QUFDSCxDQUFDO0FBRUQsU0FBUyxTQUFTLENBQUMsT0FBTztJQUN6QixPQUFPLENBQUMsR0FBRyxDQUNWLG9CQUFvQixHQUFHLE9BQU8sRUFDOUIsWUFBWSxHQUFHLG9EQUFvRCxFQUNuRSxZQUFZLEdBQUcsb0RBQW9ELEVBQ25FLGVBQWUsQ0FDZixDQUFDO0FBQ0gsQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLE9BQU87SUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FDVixzQkFBc0IsR0FBRyxPQUFPLEVBQ2hDLFlBQVksR0FBRyxvREFBb0QsRUFDbkUsWUFBWTtRQUNYLGtFQUFrRSxFQUNuRSxlQUFlLENBQ2YsQ0FBQztBQUNILENBQUM7QUFFRCxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksS0FBVSxFQUNiLE1BQVcsRUFDWCxJQUFTLEVBQ1QsSUFBUyxFQUNULE1BQVcsRUFDWCxJQUFTLEVBQ1QsUUFBYSxFQUNiLFNBQWMsRUFDZCxPQUFZLEVBQ1osTUFBVyxDQUFDO0FBRWIsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDcEMsSUFBSSxZQUFZLEdBQWlCO1FBQ2hDLGFBQWEsRUFBRSxPQUFPO0tBQ3RCLENBQUM7SUFFRixZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztJQUU1QyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGVBQWUsRUFBRTtRQUNsRCxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDN0Isd0dBQXdHLENBQ3hHLENBQUM7UUFDRixJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDNUIsMFFBQTBRLENBQzFRLENBQUM7UUFDRixJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDNUIsc1BBQXNQLENBQ3RQLENBQUM7UUFDRixNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM5QyxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7WUFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUMzQyxZQUFZLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDO2dCQUMzQyxZQUFZLENBQUMsS0FBSztvQkFDakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxlQUFlLEdBQUcsS0FBSyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7Z0JBRTFELE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQztnQkFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNuQztpQkFBTTtnQkFDTixZQUFZLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDO2dCQUMzQyxZQUFZLENBQUMsS0FBSztvQkFDakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxlQUFlLEdBQUcsS0FBSyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7Z0JBRTFELFlBQVksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO2dCQUV2QyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ25DO1NBQ0Q7YUFBTSxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7WUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUMzQyxZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDO2dCQUM1QyxZQUFZLENBQUMsS0FBSztvQkFDakIsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsZUFBZSxHQUFHLEtBQUssQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO2dCQUVoRSxPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7Z0JBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDbkM7aUJBQU07Z0JBQ04sWUFBWSxDQUFDLE9BQU8sR0FBRywyQkFBMkIsQ0FBQztnQkFDbkQsWUFBWSxDQUFDLEtBQUs7b0JBQ2pCLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLGVBQWUsR0FBRyxLQUFLLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztnQkFFaEUsWUFBWSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7Z0JBRXZDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDbkM7U0FDRDthQUFNO1lBQ04sUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3ZCLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN4QjtLQUNEO1NBQU0sSUFDTixRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxhQUFhO1FBQzNDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFDOUM7UUFDRCxNQUFNLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsRCxZQUFZLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQztRQUNwQyxZQUFZLENBQUMsS0FBSyxHQUFHLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVuRCxZQUFZLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztRQUV0QyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ25DO1NBQU0sSUFDTixRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxhQUFhO1FBQzNDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFDNUM7UUFDRCxNQUFNLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsRCxZQUFZLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQztRQUNwQyxZQUFZLENBQUMsS0FBSyxHQUFHLHVCQUF1QixHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV6RCxZQUFZLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztRQUV0QyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ25DO1NBQU0sSUFDTixRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxhQUFhO1FBQzNDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFDNUM7UUFDRCxNQUFNLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsRCxZQUFZLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQztRQUNwQyxZQUFZLENBQUMsS0FBSyxHQUFHLHNCQUFzQixHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV4RCxZQUFZLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztRQUV0QyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ25DO1NBQU0sSUFDTixRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxhQUFhO1FBQzNDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFDbEQ7UUFDRCxN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