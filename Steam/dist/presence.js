var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "612299892764966923",
    
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var AppName, topicTitle, topicAuthor, broadcastTitle, broadcaster, itemName, itemPrice, workshop;
var homeURL = new URL(document.location.href);
var subsection = homeURL.searchParams.get("subsection");
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
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
            presenceData.state = broadcastTitle.innerText + " - " + broadcaster.innerText;
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
            presenceData.state = itemName.innerText + " (" + itemPrice.innerText + ").";
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
            let result = parts[parts.length - 2].replace(/%20/g, " ").replace(/%26/g, "&");
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
}));
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzFCLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsU0FBUyxFQUFFLEtBQUs7Q0FDaEIsQ0FBQyxFQUNGLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQzdCLElBQUksRUFBRSwyQkFBMkI7SUFDakMsS0FBSyxFQUFFLDBCQUEwQjtDQUNqQyxDQUFDLENBQUM7QUFFSixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVsRCxJQUFJLE9BQVksRUFDZixVQUFlLEVBQ2YsV0FBZ0IsRUFDaEIsY0FBbUIsRUFDbkIsV0FBZ0IsRUFDaEIsUUFBYSxFQUNiLFNBQWMsRUFDZCxRQUFhLENBQUM7QUFFZixJQUFJLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRTlDLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBRXhELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUNwQyxJQUFJLFlBQVksR0FBaUI7UUFDaEMsT0FBTyxFQUFFLGNBQWM7UUFDdkIsYUFBYSxFQUFFLElBQUk7S0FDbkIsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksb0JBQW9CLEVBQUU7UUFDdkQsWUFBWSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztRQUV6QyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFB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