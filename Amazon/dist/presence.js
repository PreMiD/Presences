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
    clientId: "618138980273094695"
});
var item, dropdown, dropdownfinal, dropdownplus1, search, dropdowninnertext, split, personal2, profile, board2;
var browsingStamp = Math.floor(Date.now() / 1000);
var regex = RegExp("https:\\/\\/www\\.amazon\\.(.*?)\\/\\b(?:Prime-Video|Prime-Instant-Video|gp\\/video)\\b");
presence.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "amazon"
    };
    presenceData.startTimestamp = browsingStamp;
    if (regex.test(document.location.href)) {
        presence.clearActivity();
    }
    else if (document.location.hostname == "www.amazon.com" || document.location.hostname == "www.amazon.com.au" || document.location.hostname == "www.amazon.de" || document.location.hostname == "www.amazon.ca" || document.location.hostname == "www.amazon.cn" || document.location.hostname == "www.amazon.es" || document.location.hostname == "www.amazon.fr" || document.location.hostname == "www.amazon.nl" || document.location.hostname == "www.amazon.in" || document.location.hostname == "www.amazon.co.jp" || document.location.hostname == "www.amazon.ae" || document.location.hostname == "www.amazon.co.uk" || document.location.hostname == "www.amazon.com.tr" || document.location.hostname == "www.amazon.com.br" || document.location.hostname == "smile.amazon.com" || document.location.hostname == "smile.amazon.com.au" || document.location.hostname == "smile.amazon.de" || document.location.hostname == "smile.amazon.ca" || document.location.hostname == "smile.amazon.cn" || document.location.hostname == "smile.amazon.es" || document.location.hostname == "smile.amazon.fr" || document.location.hostname == "smile.amazon.nl" || document.location.hostname == "smile.amazon.in" || document.location.hostname == "smile.amazon.co.jp" || document.location.hostname == "smile.amazon.ae" || document.location.hostname == "smile.amazon.co.uk" || document.location.hostname == "smile.amazon.com.tr" || document.location.hostname == "smile.amazon.com.br") {
        item = document.querySelector("#search > span > h1 > div > div.sg-col-14-of-20.sg-col-26-of-32.sg-col-18-of-24.sg-col.sg-col-22-of-28.s-breadcrumb.sg-col-10-of-16.sg-col-30-of-36.sg-col-6-of-12 > div > div > span.a-color-state.a-text-bold");
        if (document.querySelector("#productTitle") !== null) {
            item = document.querySelector("#productTitle");
            presenceData.details = "Viewing product:";
            if (item.innerText.length > 128) {
                presenceData.state = item.innerText.substring(0, 125) + "...";
            }
            else {
                presenceData.state = item.innerText;
            }
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/s") && item !== null) {
            item = document.querySelector("#search > span > h1 > div > div.sg-col-14-of-20.sg-col-26-of-32.sg-col-18-of-24.sg-col.sg-col-22-of-28.s-breadcrumb.sg-col-10-of-16.sg-col-30-of-36.sg-col-6-of-12 > div > div > span.a-color-state.a-text-bold");
            presenceData.details = "Searching for:";
            presenceData.state = item.innerText;
            presenceData.smallImageKey = "search";
            presence.setActivity(presenceData);
        }
        else if (document.querySelector("#gc-asin-title") !== null) {
            item = document.querySelector("#gc-asin-title");
            presenceData.details = "Viewing product:";
            if (item.innerText.length > 128) {
                presenceData.state = item.innerText.substring(0, 125) + "...";
            }
            else {
                presenceData.state = item.innerText;
            }
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/profile")) {
            item = document.querySelector("#customer-profile-name-header > div.a-row.a-spacing-none.name-container > span");
            presenceData.details = "Viewing profile:";
            presenceData.state = item.innerText;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/store")) {
            item = document.title.split(":");
            presenceData.details = "Viewing store:";
            presenceData.state = item[1];
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/history")) {
            presenceData.details = "Viewing their history";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/gift-cards")) {
            presenceData.details = "Viewing Giftcards";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/yourstore")) {
            presenceData.details = "Viewing recommended";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/wishlist")) {
            presenceData.details = "Viewing their wishlist";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/cart")) {
            presenceData.details = "Viewing their cart";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/order-history")) {
            presenceData.details = "Viewing their";
            presenceData.state = "order history";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/order-details")) {
            presenceData.details = "Viewing their";
            presenceData.state = "order details";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/amazonprime")) {
            presenceData.details = "Viewing Amazon Prime";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/site-directory")) {
            presenceData.details = "Viewing all categories";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/yourpets")) {
            presenceData.details = "Viewing pets";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/addresses")) {
            presenceData.details = "Viewing addresses";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/managepaymentmethods")) {
            presenceData.details = "Viewing payment methods";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/balance")) {
            presenceData.details = "Viewing their balance";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/adprefs")) {
            presenceData.details = "Viewing their adprefs";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/yourmembershipsandsubscriptions")) {
            presenceData.details = "Viewing subscriptions";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.search.includes("nav_youraccount_ya") || document.location.pathname.includes("/your-account")) {
            presenceData.details = "Viewing their account";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/ref=nav_logo")) {
            presence.setActivity();
            presence.setTrayTitle();
        }
        else if (document.location.pathname.includes("/help/")) {
            presenceData.details = "Viewing Help Center";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else {
            if (document.querySelector("#searchDropdownBox") !== null) {
                dropdown = document.querySelector("#searchDropdownBox").getAttribute("data-nav-selected");
                dropdownplus1 = +dropdown + 1;
                dropdownfinal = "#searchDropdownBox > option:nth-child(" + dropdownplus1 + ")";
                dropdowninnertext = document.querySelector(dropdownfinal).innerText;
                split = document.location.pathname.split("/", 3);
                if (dropdown !== "0" || split[1] !== "") {
                    presenceData.details = "Browsing category:";
                    presenceData.state = dropdowninnertext;
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
        }
    }
    else {
        presence.setActivity();
        presence.setTrayTitle();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFlBQVksR0FBRyxtREFBbUQsQ0FBQztBQUV2RSxTQUFTLFFBQVEsQ0FBQyxPQUFPO0lBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQ1YsbUJBQW1CLEdBQUcsT0FBTyxFQUM3QixZQUFZLEdBQUcsb0RBQW9ELEVBQ25FLFlBQVksR0FBRyxvREFBb0QsRUFDbkUsZUFBZSxDQUNmLENBQUM7QUFDSCxDQUFDO0FBRUQsU0FBUyxTQUFTLENBQUMsT0FBTztJQUN6QixPQUFPLENBQUMsR0FBRyxDQUNWLG9CQUFvQixHQUFHLE9BQU8sRUFDOUIsWUFBWSxHQUFHLG9EQUFvRCxFQUNuRSxZQUFZLEdBQUcsb0RBQW9ELEVBQ25FLGVBQWUsQ0FDZixDQUFDO0FBQ0gsQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLE9BQU87SUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FDVixzQkFBc0IsR0FBRyxPQUFPLEVBQ2hDLFlBQVksR0FBRyxvREFBb0QsRUFDbkUsWUFBWTtRQUNaLGtFQUFrRSxFQUNsRSxlQUFlLENBQ2YsQ0FBQztBQUNILENBQUM7QUFFRCxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQTtBQUVGLElBQUksSUFBUyxFQUFFLFFBQWEsRUFBRSxhQUFrQixFQUFFLGFBQWtCLEVBQUUsTUFBVyxFQUFFLGlCQUFzQixFQUFFLEtBQVUsRUFBRSxTQUFjLEVBQUUsT0FBWSxFQUFFLE1BQVcsQ0FBQztBQUVqSyxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVsRCxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMseUZBQXlGLENBQUMsQ0FBQztBQUU5RyxRQUFRLENB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