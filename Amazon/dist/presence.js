var presence = new Presence({
    clientId: "618138980273094695"
});
var item, dropdown, dropdownfinal, dropdownplus1, dropdowninnertext, split;
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "amazon"
    };
    presenceData.startTimestamp = browsingStamp;
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
    }
    else if (document.location.pathname.includes("/s") && item !== null) {
        presenceData.details = "Searching for:";
        presenceData.state = item.innerText;
        presenceData.smallImageKey = "search";
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
    }
    else if (document.location.pathname.includes("/profile")) {
        item = document.querySelector("#customer-profile-name-header > div.a-row.a-spacing-none.name-container > span");
        presenceData.details = "Viewing profile:";
        presenceData.state = item.innerText;
    }
    else if (document.location.pathname.includes("/store")) {
        item = document.title.split(":");
        presenceData.details = "Viewing store:";
        presenceData.state = item[1];
    }
    else if (document.location.pathname.includes("/history")) {
        presenceData.details = "Viewing their history";
    }
    else if (document.location.pathname.includes("/gift-cards")) {
        presenceData.details = "Viewing Giftcards";
    }
    else if (document.location.pathname.includes("/yourstore")) {
        presenceData.details = "Viewing recommended";
    }
    else if (document.location.pathname.includes("/wishlist")) {
        presenceData.details = "Viewing their wishlist";
    }
    else if (document.location.pathname.includes("/cart")) {
        presenceData.details = "Viewing their cart";
    }
    else if (document.location.pathname.includes("/order-history")) {
        presenceData.details = "Viewing their";
        presenceData.state = "order history";
    }
    else if (document.location.pathname.includes("/order-details")) {
        presenceData.details = "Viewing their";
        presenceData.state = "order details";
    }
    else if (document.location.pathname.includes("/amazonprime")) {
        presenceData.details = "Viewing Amazon Prime";
    }
    else if (document.location.pathname.includes("/site-directory")) {
        presenceData.details = "Viewing all categories";
    }
    else if (document.location.pathname.includes("/yourpets")) {
        presenceData.details = "Viewing pets";
    }
    else if (document.location.pathname.includes("/addresses")) {
        presenceData.details = "Viewing addresses";
    }
    else if (document.location.pathname.includes("/managepaymentmethods")) {
        presenceData.details = "Viewing payment methods";
    }
    else if (document.location.pathname.includes("/balance")) {
        presenceData.details = "Viewing their balance";
    }
    else if (document.location.pathname.includes("/adprefs")) {
        presenceData.details = "Viewing their adprefs";
    }
    else if (document.location.pathname.includes("/yourmembershipsandsubscriptions")) {
        presenceData.details = "Viewing subscriptions";
    }
    else if (document.location.search.includes("nav_youraccount_ya") ||
        document.location.pathname.includes("/your-account")) {
        presenceData.details = "Viewing their account";
    }
    else if (document.location.pathname.includes("/help/")) {
        presenceData.details = "Viewing Help Center";
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
            }
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksSUFBUyxFQUNYLFFBQWEsRUFDYixhQUFrQixFQUNsQixhQUFrQixFQUNsQixpQkFBc0IsRUFDdEIsS0FBVSxDQUFDO0FBRWIsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLGFBQWEsRUFBRSxRQUFRO0tBQ3hCLENBQUM7SUFFRixZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztJQUU1QyxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDM0IsaU5BQWlOLENBQ2xOLENBQUM7SUFFRixJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ3BELElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRS9DLFlBQVksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUM7UUFDMUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7WUFDL0IsWUFBWSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1NBQy9EO2FBQU07WUFDTCxZQUFZLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDckM7S0FDRjtTQUFNLElBQUksUUFBUSxDQUFD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