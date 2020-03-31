var presence = new Presence({
    clientId: "644645903973482536"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var genericStyle = "font-weight: 800; padding: 2px 5px; color: white;";
var user;
var title;
var replace;
var search;
var language;
presence.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "zalando"
    };
    language = window.navigator.language;
    if (document.location.pathname == "/" ||
        document.location.pathname.includes("home/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = getTranslation("HomePage");
    }
    else if (document.location.pathname.includes(".html")) {
        presenceData.startTimestamp = browsingStamp;
        user = document.querySelector(".h-container.h-product-title.topSection.h-align-left > div:nth-child(2) > h1");
        title = document.querySelector(".h-container.h-product-title.topSection.h-align-left > div:nth-child(1) > a > h2");
        presenceData.details = getTranslation("ProductView");
        presenceData.state = user.textContent + " > " + title.textContent;
    }
    else if (document.querySelector("#z-nvg-cognac-root > div > z-grid > z-grid-item:nth-child(2) > div > div > div > div > h1 > span > a") !== null) {
        presenceData.startTimestamp = browsingStamp;
        user = document.querySelector("#z-nvg-cognac-root > div > z-grid > z-grid-item:nth-child(2) > div > div > div > div > h1 > span > a");
        presenceData.details = getTranslation("BrandView");
        presenceData.state = user.textContent;
    }
    else if (document.querySelector("#z-nvg-cognac-root > div > z-grid > z-grid-item:nth-child(2) > div > div > nav > ul") !== null) {
        presenceData.startTimestamp = browsingStamp;
        user = document.querySelector("#z-nvg-cognac-root > div > z-grid > z-grid-item:nth-child(2) > div > div > nav > ul");
        presenceData.details = getTranslation("CategoryView");
        presenceData.state = user.textContent;
    }
    else if (document.location.pathname.includes("/cart/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = getTranslation("Cart");
    }
    else if (document.location.pathname.includes("/wishlist/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = getTranslation("Wishlist");
    }
    else if (document.location.pathname.includes("/myaccount/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = getTranslation("AccountSettings");
    }
    else if (document.location.pathname.includes("/faq/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = getTranslation("FAQ");
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
function PMD_error(message) {
    console.log("%cPreMiD%cERROR%c " + message, genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;", genericStyle + "border-radius: 0 25px 25px 0; background: #ff5050;", "color: unset;");
}
function getTranslation(stringName) {
    switch (stringName) {
        case "HomePage":
            switch (language) {
                case "nl":
                    return "Bekijkt de startpagina";
                    break;
                default:
                    return "Viewing home page";
                    break;
            }
            break;
        case "ProductView":
            switch (language) {
                case "nl":
                    return "Bekijkt product:";
                    break;
                default:
                    return "Viewing product:";
                    break;
            }
            break;
        case "BrandView":
            switch (language) {
                case "nl":
                    return "Bekijkt merk:";
                    break;
                default:
                    return "Viewing brand:";
                    break;
            }
            break;
        case "CategoryView":
            switch (language) {
                case "nl":
                    return "Bekijkt categorie:";
                    break;
                default:
                    return "Viewing category:";
                    break;
            }
            break;
        case "Cart":
            switch (language) {
                case "nl":
                    return "Bekijkt zijn winkelwagen";
                    break;
                default:
                    return "Viewing their cart";
                    break;
            }
            break;
        case "Wishlist":
            switch (language) {
                case "nl":
                    return "Bekijkt zijn verlanglijstje";
                    break;
                default:
                    return "Viewing their wishlist";
                    break;
            }
            break;
        case "AccountSettings":
            switch (language) {
                case "nl":
                    return "Bekijkt zijn account";
                    break;
                default:
                    return "Viewing their account";
                    break;
            }
            break;
        case "FAQ":
            switch (language) {
                case "nl":
                    return "Bekijkt de veel gestelde vragen";
                    break;
                default:
                    return "Viewing the FAQ";
                    break;
            }
            break;
        default:
            PMD_error("Unknown StringName please contact the Developer of this presence!\nYou can contact him/her in the PreMiD Discord (discord.gg/premid)");
            return "Unknown stringName";
            break;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUwsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxZQUFZLEdBQUcsbURBQW1ELENBQUM7QUFFdkUsSUFBSSxJQUFTLENBQUM7QUFDZCxJQUFJLEtBQVUsQ0FBQztBQUNmLElBQUksT0FBWSxDQUFDO0FBQ2pCLElBQUksTUFBVyxDQUFDO0FBQ2hCLElBQUksUUFBYSxDQUFDO0FBRWxCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksWUFBWSxHQUFpQjtRQUMvQixhQUFhLEVBQUUsU0FBUztLQUN6QixDQUFDO0lBRUYsUUFBUSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO0lBS3JDLElBQ0UsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRztRQUNqQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQzVDO1FBQ0EsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFDNUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDbkQ7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtR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