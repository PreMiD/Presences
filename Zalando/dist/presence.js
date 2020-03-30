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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxDQUFDO0FBRUosSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxZQUFZLEdBQUcsbURBQW1ELENBQUM7QUFFdkUsSUFBSSxJQUFTLENBQUM7QUFDZCxJQUFJLEtBQVUsQ0FBQztBQUNmLElBQUksT0FBWSxDQUFDO0FBQ2pCLElBQUksTUFBVyxDQUFDO0FBQ2hCLElBQUksUUFBYSxDQUFDO0FBRWxCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksWUFBWSxHQUFpQjtRQUNoQyxhQUFhLEVBQUUsU0FBUztLQUN4QixDQUFDO0lBRUYsUUFBUSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO0lBS3JDLElBQ0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRztRQUNqQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQzNDO1FBQ0QsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFDNUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDbEQ7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtR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