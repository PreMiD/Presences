var presence = new Presence({
    clientId: "618138980273094695"
});
var item, dropdown, dropdownfinal, dropdownplus1, dropdowninnertext, split;
var browsingStamp = Math.floor(Date.now() / 1000);
var regex = RegExp("https:\\/\\/www\\.amazon\\.(.*?)\\/\\b(?:Prime-Video|Prime-Instant-Video|gp\\/video)\\b");
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "amazon"
    };
    presenceData.startTimestamp = browsingStamp;
    if (regex.test(document.location.href)) {
        presence.clearActivity();
    }
    else if (document.location.hostname == "www.amazon.com" ||
        document.location.hostname == "www.amazon.com.au" ||
        document.location.hostname == "www.amazon.de" ||
        document.location.hostname == "www.amazon.ca" ||
        document.location.hostname == "www.amazon.cn" ||
        document.location.hostname == "www.amazon.es" ||
        document.location.hostname == "www.amazon.fr" ||
        document.location.hostname == "www.amazon.nl" ||
        document.location.hostname == "www.amazon.in" ||
        document.location.hostname == "www.amazon.co.jp" ||
        document.location.hostname == "www.amazon.ae" ||
        document.location.hostname == "www.amazon.co.uk" ||
        document.location.hostname == "www.amazon.com.tr" ||
        document.location.hostname == "www.amazon.com.br" ||
        document.location.hostname == "smile.amazon.com" ||
        document.location.hostname == "smile.amazon.com.au" ||
        document.location.hostname == "smile.amazon.de" ||
        document.location.hostname == "smile.amazon.ca" ||
        document.location.hostname == "smile.amazon.cn" ||
        document.location.hostname == "smile.amazon.es" ||
        document.location.hostname == "smile.amazon.fr" ||
        document.location.hostname == "smile.amazon.nl" ||
        document.location.hostname == "smile.amazon.in" ||
        document.location.hostname == "smile.amazon.co.jp" ||
        document.location.hostname == "smile.amazon.ae" ||
        document.location.hostname == "smile.amazon.co.uk" ||
        document.location.hostname == "smile.amazon.com.tr" ||
        document.location.hostname == "smile.amazon.com.br") {
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
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/profile")) {
            item = document.querySelector("#customer-profile-name-header > div.a-row.a-spacing-none.name-container > span");
            presenceData.details = "Viewing profile:";
            presenceData.state = item.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/store")) {
            item = document.title.split(":");
            presenceData.details = "Viewing store:";
            presenceData.state = item[1];
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/history")) {
            presenceData.details = "Viewing their history";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/gift-cards")) {
            presenceData.details = "Viewing Giftcards";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/yourstore")) {
            presenceData.details = "Viewing recommended";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/wishlist")) {
            presenceData.details = "Viewing their wishlist";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/cart")) {
            presenceData.details = "Viewing their cart";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/order-history")) {
            presenceData.details = "Viewing their";
            presenceData.state = "order history";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/order-details")) {
            presenceData.details = "Viewing their";
            presenceData.state = "order details";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/amazonprime")) {
            presenceData.details = "Viewing Amazon Prime";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/site-directory")) {
            presenceData.details = "Viewing all categories";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/yourpets")) {
            presenceData.details = "Viewing pets";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/addresses")) {
            presenceData.details = "Viewing addresses";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/managepaymentmethods")) {
            presenceData.details = "Viewing payment methods";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/balance")) {
            presenceData.details = "Viewing their balance";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/adprefs")) {
            presenceData.details = "Viewing their adprefs";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/yourmembershipsandsubscriptions")) {
            presenceData.details = "Viewing subscriptions";
            presence.setActivity(presenceData);
        }
        else if (document.location.search.includes("nav_youraccount_ya") ||
            document.location.pathname.includes("/your-account")) {
            presenceData.details = "Viewing their account";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/ref=nav_logo")) {
            presence.setActivity();
            presence.setTrayTitle();
        }
        else if (document.location.pathname.includes("/help/")) {
            presenceData.details = "Viewing Help Center";
            presence.setActivity(presenceData);
        }
        else {
            if (document.querySelector("#searchDropdownBox") !== null) {
                dropdown = document
                    .querySelector("#searchDropdownBox")
                    .getAttribute("data-nav-selected");
                dropdownplus1 = +dropdown + 1;
                dropdownfinal =
                    "#searchDropdownBox > option:nth-child(" + dropdownplus1 + ")";
                dropdowninnertext = document.querySelector(dropdownfinal).innerText;
                split = document.location.pathname.split("/", 3);
                if (dropdown !== "0" || split[1] !== "") {
                    presenceData.details = "Browsing category:";
                    presenceData.state = dropdowninnertext;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksSUFBUyxFQUNYLFFBQWEsRUFDYixhQUFrQixFQUNsQixhQUFrQixFQUNsQixpQkFBc0IsRUFDdEIsS0FBVSxDQUFDO0FBRWIsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUNoQix5RkFBeUYsQ0FDMUYsQ0FBQztBQUVGLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsUUFBUTtLQUN4QixDQUFDO0lBRUYsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7SUFFNUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDdEMsUUFBUSxDQUFDLGFBQWEsRUFBRSxDQUFDO0tBQzFCO1NBQU0sSUFDTCxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxnQkFBZ0I7UUFDOUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksbUJBQW1CO1FBQ2pELFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGVBQWU7UUFDN0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksZUFBZTtRQUM3QyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxlQUFlO1FBQzdDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGVBQWU7UUFDN0MsUUFBUSxDQUFDLFFBQVEs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