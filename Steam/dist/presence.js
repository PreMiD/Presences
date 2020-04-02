var presence = new Presence({
    clientId: "612299892764966923"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var AppName, topicTitle, topicAuthor, broadcastTitle, broadcaster, itemName, itemPrice, workshop;
var homeURL = new URL(document.location.href);
var subsection = homeURL.searchParams.get("subsection");
presence.on("UpdateData", async () => {
    let presenceData = {
        details: "Unknown page",
        largeImageKey: "lg"
    };
    if (document.location.hostname == "steamcommunity.com") {
        presenceData.details = "Steam Community";
        if (document.location.pathname == "/" || !document.location.pathname) {
            if (subsection) {
                presenceData.state = "Browsing " + subsection + ".";
                presenceData.startTimestamp = browsingStamp;
            }
            else {
                presenceData.state = "Home";
                presenceData.startTimestamp = browsingStamp;
            }
        }
        else if (document.location.pathname.includes("/followedgames")) {
            presenceData.state = "Browsing follwing games.";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname == "/discussions/") {
            presenceData.state = "Browsing discussions.";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/discussions/forum")) {
            topicTitle = document.querySelector("div.topic");
            topicAuthor = document.querySelector("div.authorline > a");
            if (topicTitle && topicAuthor) {
                presenceData.details = "Topic: " + topicTitle.innerText;
                presenceData.state = "Author: " + topicAuthor.innerText;
                presenceData.startTimestamp = browsingStamp;
            }
            else {
                presenceData.state = "Browsing Steam Forums.";
                presenceData.startTimestamp = browsingStamp;
            }
        }
        else if (document.location.pathname.includes("/search/users")) {
            var input = document.querySelector("#search_text_box");
            presenceData.details = "Searching for a user: ";
            presenceData.state = "Username: " + input.value;
            presenceData.startTimestamp = browsingStamp;
            presenceData.smallImageKey = "search";
        }
        else if (document.location.pathname.includes("/app/")) {
            if (document.location.pathname.includes("/workshop/")) {
                AppName = document.querySelector("div.apphub_HeaderTop.workshop > div.apphub_AppName.ellipsis");
                presenceData.details = "Steam Workshop";
                presenceData.state = "Home - " + AppName.innerText;
                presenceData.startTimestamp = browsingStamp;
            }
            else if (document.location.pathname.includes("/discussions")) {
                AppName = document.querySelector("div.apphub_HomeHeaderContent > div.apphub_HeaderTop > div.apphub_AppName.ellipsis");
                presenceData.state = "Discussions - " + AppName.innerText;
                presenceData.startTimestamp = browsingStamp;
            }
            else if (document.location.pathname.includes("/screenshots")) {
                AppName = document.querySelector("div.apphub_HomeHeaderContent > div.apphub_HeaderTop > div.apphub_AppName.ellipsis");
                presenceData.state = "Screenshots - " + AppName.innerText;
                presenceData.startTimestamp = browsingStamp;
            }
            else if (document.location.pathname.includes("/images")) {
                AppName = document.querySelector("div.apphub_HomeHeaderContent > div.apphub_HeaderTop > div.apphub_AppName.ellipsis");
                presenceData.state = "Artwork - " + AppName.innerText;
                presenceData.startTimestamp = browsingStamp;
            }
            else if (document.location.pathname.includes("/broadcasts")) {
                AppName = document.querySelector("div.apphub_HomeHeaderContent > div.apphub_HeaderTop > div.apphub_AppName.ellipsis");
                presenceData.state = "Broadcasts - " + AppName.innerText;
                presenceData.startTimestamp = browsingStamp;
            }
            else if (document.location.pathname.includes("/videos")) {
                AppName = document.querySelector("div.apphub_HomeHeaderContent > div.apphub_HeaderTop > div.apphub_AppName.ellipsis");
                presenceData.state = "Videos - " + AppName.innerText;
                presenceData.startTimestamp = browsingStamp;
            }
            else if (document.location.pathname.includes("/allnews")) {
                AppName = document.querySelector("div.apphub_HomeHeaderContent > div.apphub_HeaderTop > div.apphub_AppName.ellipsis");
                presenceData.state = "News - " + AppName.innerText;
                presenceData.startTimestamp = browsingStamp;
            }
            else if (document.location.pathname.includes("/guides")) {
                AppName = document.querySelector("div.apphub_HomeHeaderContent > div.apphub_HeaderTop > div.apphub_AppName.ellipsis");
                presenceData.state = "Guides - " + AppName.innerText;
                presenceData.startTimestamp = browsingStamp;
            }
            else if (document.location.pathname.includes("/reviews")) {
                AppName = document.querySelector("div.apphub_HomeHeaderContent > div.apphub_HeaderTop > div.apphub_AppName.ellipsis");
                presenceData.state = "Reviews - " + AppName.innerText;
                presenceData.startTimestamp = browsingStamp;
            }
            else {
                AppName = document.querySelector("div.apphub_HeaderTop > div.apphub_AppName.ellipsis");
                presenceData.state = AppName.innerText;
                presenceData.startTimestamp = browsingStamp;
            }
        }
        else if (document.location.pathname.includes("/broadcast/watch/")) {
            broadcastTitle = document.querySelector("#BroadcastGame");
            broadcaster = document.querySelector("#BroadcastInfo > div.BroadcastPersonaRow > span.BroadcastProfileName > a");
            presenceData.details = "Watching a broadcast.";
            presenceData.state =
                broadcastTitle.innerText + " - " + broadcaster.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname == "/market") {
            presenceData.state = "Community Market.";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/market/listings")) {
            itemName = document.querySelector("#largeiteminfo_item_name");
            itemPrice = document.querySelector("#market_commodity_forsale > span:nth-child(2)");
            presenceData.details = "Community Market.";
            presenceData.state =
                itemName.innerText + " (" + itemPrice.innerText + ").";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname == "/workshop/") {
            presenceData.details = "Steam Workshop";
            presenceData.state = "Home";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/workshop/filedetails")) {
            workshop = document.querySelector("#mainContents > div.workshopItemDetailsHeader > div.workshopItemTitle");
            presenceData.details = "Steam Workshop";
            presenceData.state = workshop.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/workshop/discussions")) {
            AppName = document.querySelector("div.apphub_HeaderTop.workshop > div.apphub_AppName.ellipsis");
            presenceData.details = "Steam Workshop";
            presenceData.state = "Discussions - " + AppName.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/workshop/about")) {
            AppName = document.querySelector("div.apphub_HeaderTop.workshop > div.apphub_AppName.ellipsis");
            presenceData.details = "Steam Workshop";
            presenceData.state = "About - " + AppName.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
    }
    else if (document.location.hostname == "store.steampowered.com") {
        presenceData.details = "Steam Store";
        if (document.location.pathname == "/" || !document.location.pathname) {
            presenceData.state = "Home";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/app/")) {
            AppName = document.querySelector("div.page_title_area.game_title_area.page_content > div.apphub_HomeHeaderContent > div > div.apphub_AppName");
            presenceData.state = AppName.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/cart")) {
            presenceData.state = "Cart";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/checkout")) {
            presenceData.state = "Checkout";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/wishlist")) {
            presenceData.state = "Looking at a wishlist.";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/games")) {
            presenceData.state = "Browsing games...";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/genre")) {
            var parts = document.location.href.split("/");
            var result = parts[parts.length - 2].replace(/%20/g, " ");
            presenceData.state = "Genre: " + result;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/demos")) {
            presenceData.state = "Browsing demos...";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/vr")) {
            presenceData.state = "Browsing VR games...";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/pccafe")) {
            presenceData.state = "Browsing PC Cafe games...";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/tags")) {
            let parts = document.location.href.split("/");
            let result = parts[parts.length - 2]
                .replace(/%20/g, " ")
                .replace(/%26/g, "&");
            presenceData.state = result;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/macos")) {
            presenceData.state = "Browsing Mac OS X games...";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/linux")) {
            presenceData.state = "Browsing Linux + Steam OS games...";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/software")) {
            presenceData.state = "Software";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/controller")) {
            presenceData.state = "Steam Controller friendly games.";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/valveindex")) {
            presenceData.state = "Browsing Steam Controllers...";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/steamlink")) {
            presenceData.state = "Steam Link";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/news")) {
            presenceData.state = "Reading the news...";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/about")) {
            presenceData.state = "About";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/recommended")) {
            presenceData.state = "Browsing recommended games...";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/explore")) {
            presenceData.state = "Exploring games...";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/updated")) {
            presenceData.state = "Recently updated games.";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/stats")) {
            presenceData.state = "Steam & Games Stats.";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/search")) {
            var searchURL = new URL(document.location.href);
            var searchResult = searchURL.searchParams.get("term");
            presenceData.state = "Searching for " + searchResult;
            presenceData.startTimestamp = browsingStamp;
            presenceData.smallImageKey = "search";
        }
    }
    presence.setActivity(presenceData);
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUwsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxPQUFZLEVBQ2QsVUFBZSxFQUNmLFdBQWdCLEVBQ2hCLGNBQW1CLEVBQ25CLFdBQWdCLEVBQ2hCLFFBQWEsRUFDYixTQUFjLEVBQ2QsUUFBYSxDQUFDO0FBRWhCLElBQUksT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFOUMsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7QUFFeEQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsSUFBSSxZQUFZLEdBQWlCO1FBQy9CLE9BQU8sRUFBRSxjQUFjO1FBQ3ZCLGFBQWEsRUFBRSxJQUFJO0tBQ3BCLENBQUM7SUFFRixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLG9CQUFvQixFQUFFO1FBQ3RELFlBQVksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUM7UUFFekMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTtZQUNwRSxJQUFJLFVBQVUs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