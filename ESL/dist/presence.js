var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "623229289864626195",
    mediaKeys: false
});
var item, typing, index, categorytext, search, dropdowninnertext, split, item2, itemfinish, board2;
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "esl"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.hostname == "fantasy.eslgaming.com") {
        presenceData.details = "ESL Fantasy";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "pro.eslgaming.com") {
        if (document.location.pathname.includes("/standings/")) {
            item = document.querySelector("#site-navigation-wrap > nav > ul > li > a > span > span");
            item2 = document.querySelector("#networkbar > esl-div > esl-div > esl-span");
            presenceData.details = "ESL Pros, viewing:";
            presenceData.state = item.innerText + " standings, " + item2.innerText;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/scores-schedule/") || document.location.pathname.includes("/matches/")) {
            item = document.querySelector("#site-navigation-wrap > nav > ul > li > a > span > span");
            item2 = document.querySelector("#networkbar > esl-div > esl-div > esl-span");
            presenceData.details = "ESL Pros, viewing:";
            presenceData.state = item.innerText + " scores & schedule, " + item2.innerText;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/top-player-stats/")) {
            item = document.querySelector("#site-navigation-wrap > nav > ul > li > a > span > span");
            item2 = document.querySelector("#networkbar > esl-div > esl-div > esl-span");
            presenceData.details = "ESL Pros, viewing:";
            presenceData.state = item.innerText + " statistics, " + item2.innerText;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/teams/")) {
            item = document.querySelector("#site-navigation-wrap > nav > ul > li > a > span > span");
            item2 = document.querySelector("#networkbar > esl-div > esl-div > esl-span");
            presenceData.details = "ESL Pros, viewing:";
            presenceData.state = item.innerText + " teams, " + item2.innerText;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/brackets/")) {
            item = document.querySelector("#site-navigation-wrap > nav > ul > li > a > span > span");
            item2 = document.querySelector("#networkbar > esl-div > esl-div > esl-span");
            presenceData.details = "ESL Pros, viewing:";
            presenceData.state = item.innerText + " brackets, " + item2.innerText;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/partners/")) {
            item = document.querySelector("#site-navigation-wrap > nav > ul > li > a > span > span");
            item2 = document.querySelector("#networkbar > esl-div > esl-div > esl-span");
            presenceData.details = "ESL Pros, viewing:";
            presenceData.state = item.innerText + " partners, " + item2.innerText;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/sponsors/")) {
            item = document.querySelector("#site-navigation-wrap > nav > ul > li > a > span > span");
            item2 = document.querySelector("#networkbar > esl-div > esl-div > esl-span");
            presenceData.details = "ESL Pros, viewing:";
            presenceData.state = item.innerText + " sponsors, " + item2.innerText;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/rules/")) {
            item = document.querySelector("#site-navigation-wrap > nav > ul > li > a > span > span");
            item2 = document.querySelector("#networkbar > esl-div > esl-div > esl-span");
            presenceData.details = "ESL Pros, viewing:";
            presenceData.state = item.innerText + " rules, " + item2.innerText;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/contact/")) {
            item = document.querySelector("#site-navigation-wrap > nav > ul > li > a > span > span");
            item2 = document.querySelector("#networkbar > esl-div > esl-div > esl-span");
            presenceData.details = "ESL Pros, viewing:";
            presenceData.state = item.innerText + " contact, " + item2.innerText;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/videos/")) {
            item = document.querySelector("#site-navigation-wrap > nav > ul > li > a > span > span");
            item2 = document.querySelector("#networkbar > esl-div > esl-div > esl-span");
            presenceData.details = "ESL Pros, viewing:";
            presenceData.state = item.innerText + " videos, " + item2.innerText;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/players/")) {
            item = document.querySelector("#site-navigation-wrap > nav > ul > li > a > span > span");
            item2 = document.querySelector("#networkbar > esl-div > esl-div > esl-span");
            presenceData.details = "ESL Pros, viewing:";
            presenceData.state = item.innerText + " players, " + item2.innerText;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/news/") || document.location.pathname.includes("/news-2/")) {
            item = document.querySelector("#site-navigation-wrap > nav > ul > li > a > span > span");
            item2 = document.querySelector("#networkbar > esl-div > esl-div > esl-span");
            presenceData.details = "ESL Pros, reading:";
            presenceData.state = item.innerText + " news, " + item2.innerText;
            presenceData.smallImageKey = "reading";
            presence.setActivity(presenceData);
        }
        else if (document.querySelector("#content > article > header > h2") !== null) {
            item = document.querySelector("#content > article > header > h2");
            presenceData.details = "ESL Pros, reading:";
            if (item.innerText.length > 128) {
                presenceData.state = item.innerText.substring(0, 125) + "...";
            }
            else {
                presenceData.state = item.innerText;
            }
            presenceData.smallImageKey = "reading";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/tour/")) {
            presenceData.details = "ESL Pros, viewing:";
            presenceData.state = "ESL Pro Tour";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else {
            presenceData.details = "ESL Pros, viewing:";
            presenceData.state = "Pro Tournament Overview";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.hostname == "intelgrandslam.eslgaming.com") {
        if (document.location.pathname.includes("/rules/")) {
            presenceData.details = "ESL Intel Grand Slam";
            presenceData.state = "Reading the rules";
            presenceData.smallImageKey = "reading";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/history/")) {
            presenceData.details = "ESL Intel Grand Slam";
            presenceData.state = "Viewing the history";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.querySelector("#content > div > div > div > section > div > div > div > div > div > div > div > h1") !== null) {
            item = document.querySelector("#content > div > div > div > section > div > div > div > div > div > div > div > h1");
            presenceData.details = "ESL Intel Grand Slam, reading:";
            if (item.innerText.length > 128) {
                presenceData.state = item.innerText.substring(0, 125) + "...";
            }
            else {
                presenceData.state = item.innerText;
            }
            presenceData.smallImageKey = "reading";
            presence.setActivity(presenceData);
        }
        else {
            presenceData.details = "ESL Intel Grand Slam";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.hostname == "www.intelextrememasters.com") {
        if (document.location.pathname.includes("/season-")) {
            item = document.querySelector("#site-logo-inner > a > img");
            if (item !== null) {
                presenceData.details = "ESL Intel Extreme Masters";
                presenceData.state = "Viewing: " + item.alt;
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
            else {
                presenceData.details = "ESL Intel Extreme Masters";
                delete presenceData.state;
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
        }
        else if (document.location.pathname.includes("/tickets/")) {
            presenceData.details = "ESL Intel Extreme Masters";
            presenceData.state = "Viewing ticket sale";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/iempc/")) {
            presenceData.details = "ESL Intel Extreme Masters";
            presenceData.state = "Viewing IEM PC";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/news/")) {
            presenceData.details = "ESL Intel Extreme Masters";
            presenceData.state = "Viewing the latest news";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/video/")) {
            presenceData.details = "ESL Intel Extreme Masters";
            presenceData.state = "Browsing through video's";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/legacy/")) {
            presenceData.details = "ESL Intel Extreme Masters";
            presenceData.state = "Viewing the legacy";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/about/")) {
            presenceData.details = "ESL Intel Extreme Masters";
            presenceData.state = "Viewing the about page";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/sponsors/")) {
            presenceData.details = "ESL Intel Extreme Masters";
            presenceData.state = "Viewing the sponsors";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/contact/")) {
            presenceData.details = "ESL Intel Extreme Masters";
            presenceData.state = "Viewing the contact form";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.querySelector("#content > article > header > h2") !== null) {
            item = document.querySelector("#content > article > header > h2");
            presenceData.details = "ESL Intel Extreme Masters, reading:";
            if (item.innerText.length > 128) {
                presenceData.state = item.innerText.substring(0, 125) + "...";
            }
            else {
                presenceData.state = item.innerText;
            }
            presenceData.smallImageKey = "reading";
            presence.setActivity(presenceData);
        }
        else {
            presenceData.details = "ESL Intel Extreme Masters";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.hostname == "www.esl-one.com") {
        item2 = document.querySelector("head > title");
        console.log(item2.innerText);
        if (document.location.pathname.includes("/legal/")) {
            presenceData.details = "ESL ONE";
            presenceData.state = "Reading legal stuff";
            presenceData.smallImageKey = "reading";
            presence.setActivity(presenceData);
        }
        else if (document.querySelector("#content > article > header > h2") !== null) {
            item = document.querySelector("#content > article > header > h2");
            presenceData.details = "ESL ONE, reading:";
            if (item.innerText.length > 128) {
                presenceData.state = item.innerText.substring(0, 125) + "...";
            }
            else {
                presenceData.state = item.innerText;
            }
            presenceData.smallImageKey = "reading";
            presence.setActivity(presenceData);
        }
        else if (item2.innerText.includes(" - ")) {
            if (item2.innerText.split(" - ")[0].includes("ESL")) {
                presenceData.details = "ESL ONE viewing: ";
                presenceData.state = item2.innerText.split(" - ")[0];
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
            else if (item2.innerText.split(" - ")[1].includes("ESL")) {
                presenceData.details = "ESL ONE viewing: ";
                presenceData.state = item2.innerText.split(" - ")[1];
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
        }
        else {
            presence.setActivity();
            presence.setTrayTitle();
        }
    }
    else if (document.location.hostname == "photos.eslgaming.com") {
        presenceData.details = "ESL Photos";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "brand.eslgaming.com") {
        presenceData.details = "ESL Brand";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "about.eslgaming.com") {
        presenceData.details = "ESL About";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "shop.eslgaming.com") {
        presenceData.details = "ESL Shop";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "tv.eslgaming.com") {
        if (document.querySelector("#videoplayer_embed_container > div.videoplayer_embed_inner.ng-scope > h3") !== null) {
            item = document.querySelector("#videoplayer_embed_container > div.videoplayer_embed_inner.ng-scope > h3");
            presenceData.details = "ESL TV, watching:";
            presenceData.state = item.innerText;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else {
            presenceData.details = "ESL TV";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.hostname == "play.eslgaming.com") {
        item2 = document.querySelector("head > title");
        if (document.location.pathname.includes("/games")) {
            presenceData.details = "Browsing through games";
            delete presenceData.state;
            presenceData.smallImageKey = "reading";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/help")) {
            presenceData.details = "Viewing customer support";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/search/")) {
            item = document.querySelector("body > div.l-page > div.l-main > div > div.l-content > article > div > div > div > div > div > div:nth-child(1) > div:nth-child(1) > form > input[type=text]:nth-child(6)");
            presenceData.details = "ESL Play, searching for:";
            presenceData.state = item.value;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/search")) {
            presenceData.details = "ESL Play - Search";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (item2.innerText.includes(" | ESL Play")) {
            presenceData.details = "ESL Play, viewing:";
            presenceData.state = item2.innerText.split(" | ESL Play")[0];
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else {
            presence.setActivity();
            presence.setTrayTitle();
        }
    }
    else if (document.location.hostname == "www.eslgaming.com") {
        if (document.location.pathname.includes("/article/")) {
            item = document.querySelector("#content > article > header > h2");
            presenceData.details = "ESL Pros, reading:";
            if (item.innerText.length > 128) {
                presenceData.state = item.innerText.substring(0, 125) + "...";
            }
            else {
                presenceData.state = item.innerText;
            }
            presenceData.smallImageKey = "reading";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/category/")) {
            presenceData.details = "Browsing category:";
            presenceData.state = document.location.pathname.split("category/")[1];
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else {
            presence.setActivity();
            presence.setTrayTitle();
        }
    }
    else {
        presence.setActivity();
        presence.setTrayTitle();
    }
}));
