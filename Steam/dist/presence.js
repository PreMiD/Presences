var presence = new Presence({
    clientId: "612299892764966923"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var AppName, topicTitle, topicAuthor, broadcastTitle, broadcaster, itemName, itemPrice, workshop;
var homeURL = new URL(document.location.href);
var subsection = homeURL.searchParams.get("subsection");
presence.on("UpdateData", async () => {
    const presenceData = {
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
            const parts = document.location.href.split("/");
            const result = parts[parts.length - 2]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELElBQUksT0FBWSxFQUNkLFVBQWUsRUFDZixXQUFnQixFQUNoQixjQUFtQixFQUNuQixXQUFnQixFQUNoQixRQUFhLEVBQ2IsU0FBYyxFQUNkLFFBQWEsQ0FBQztBQUVoQixJQUFJLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRTlDLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBRXhELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxPQUFPLEVBQUUsY0FBYztRQUN2QixhQUFhLEVBQUUsSUFBSTtLQUNwQixDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxvQkFBb0IsRUFBRTtRQUN0RCxZQUFZLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDO1FBRXpDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDcEUsSUFBSSxVQUFVLEVBQUU7Z0JBQ2QsWUFBWSxDQUFDLEtBQUssR0FBRyxXQUFXLEdBQUcsVUFBVSxHQUFHLEdBQUcsQ0FBQztnQkFFcEQsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFh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