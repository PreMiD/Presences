var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "644645903973482536",
    mediaKeys: false
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
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "zalando"
    };
    language = window.navigator.language;
    if (document.location.pathname == "/" || document.location.pathname.includes("home/")) {
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
}));
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
