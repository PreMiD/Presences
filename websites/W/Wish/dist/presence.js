const presence = new Presence({
    clientId: "633005889619755038"
});
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "logo"
    };
    const itemsetting = await presence.getSetting("items");
    const languagesetting = await presence.getSetting("language");
    var itemsite = null;
    let itemdesc;
    if (document.querySelector("#related-products-scroll-container > div") == null) {
        itemsite = false;
    }
    else {
        itemsite = true;
    }
    if (itemsetting == true && itemsite == true) {
        itemdesc = document.querySelector("#related-products-scroll-container > div > div > div.ProductContainer__ProductMainSection-sc-1vbd28u-1.eUuuzm > div.ProductContainer__RightColumn-sc-1vbd28u-3.hivhfu > div > div.PurchaseContainer__UpperWrapper-sc-1qlezk8-1.jEnuPa > h1").textContent;
        itemdesc = itemdesc.substring(0, itemdesc.length / 2) + "...";
    }
    else {
        if (languagesetting == "0") {
            itemdesc = "Watching an item...";
        }
        else if (languagesetting == "1") {
            itemdesc = "Beobachtet ein Produkt...";
        }
    }
    if (document.location.pathname == "/") {
        if (languagesetting == "0") {
            presenceData.details = "Browsing in mainpage...";
            presence.setActivity(presenceData);
        }
        else if (languagesetting == "1") {
            presenceData.details = "Stöbert durch";
            presenceData.state = "die Startseite...";
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.pathname == "/wishlist") {
        const nameuser = document.querySelector("#react-app > div > div.TabBarWrapper__Wrapper-sc-1p5ocnd-0.wZbPl > div.FlexScrollContainer__FlexGrandparent-o9gi86-0.jXFTEW > div > div > div.NavPanel__Wrapper-sc-1uxerbb-0.kFfmiE > div.NavPanel__Name-sc-1uxerbb-1.kHdhxC").textContent;
        if (languagesetting == "0") {
            presenceData.details = "Browsing thought Wishlist";
            presenceData.state = nameuser + "'s Wishlist";
            presence.setActivity(presenceData);
        }
        else if (languagesetting == "1") {
            presenceData.details = "Störbert durch Wunschliste";
            presenceData.state = nameuser + "'s Wunschliste";
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.pathname.includes("/wishlist/")) {
        const wishlist = document.querySelector("#react-app > div > div.TabBarWrapper__Wrapper-sc-1p5ocnd-0.fjpSHM > div.TabBarWrapper__MainRowContainer-sc-1p5ocnd-1.idAkGy > div.Feed__FeedWrapper-sc-10q7yh-0.fiGIea > div.Feed__FeedHeader-sc-10q7yh-1.gOYbXb > h1").textContent;
        if (languagesetting == "0") {
            presenceData.details = "Browsing thought Wishlist";
            presenceData.state = wishlist;
            presence.setActivity(presenceData);
        }
        else if (languagesetting == "1") {
            presenceData.details = "Stöbert durch Wunschliste";
            presenceData.state = wishlist;
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.pathname.includes("/product/")) {
        if (languagesetting == "0") {
            presenceData.details = "Viewing product";
            presenceData.state = itemdesc;
            presence.setActivity(presenceData);
        }
        else if (languagesetting == "1") {
            presenceData.details = "Schaut auf ein Produkt";
            presenceData.state = itemdesc;
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.pathname == "/cart") {
        if (languagesetting == "0") {
            presenceData.details = "Viewing cart...";
            presenceData.state = "Someone have Promocodes?";
            presence.setActivity(presenceData);
        }
        else if (languagesetting == "1") {
            presenceData.details = "Schaut in Warenkorb";
            presenceData.state = "Hat jemand Promocodes?";
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.pathname == "/notifications") {
        if (languagesetting == "0") {
            presenceData.details = "Looking for Notifications";
            presenceData.state = "Many deals today owo";
            presence.setActivity(presenceData);
        }
        else if (languagesetting == "1") {
            presenceData.details = "Schaut nach Nachrichten";
            presenceData.state = "So viele Deals owo";
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.pathname == "/refer") {
        const code = document.querySelector("#react-app > div > div.TabBarWrapper__Wrapper-sc-1p5ocnd-0.wZbPl > div.ReferralPage__MainWrapper-zs6pzr-0.bDMHGd > div.ReferralPage__ContentWrapper-zs6pzr-2.cHgkEg > div.ReferralPage__CodeSectionWrapper-zs6pzr-8.eOMTZS > div.ReferralPage__CodeBoxWrapper-zs6pzr-10.eoklod > div.ReferralPage__CodeBox-zs6pzr-14.bupEiO").textContent;
        if (languagesetting == "0") {
            presenceData.details = "Looking for new Customers";
            presenceData.state = "50% discount > Code: " + code;
            presence.setActivity(presenceData);
        }
        else if (languagesetting == "1") {
            presenceData.details = "Sucht neue Kunden";
            presenceData.state = "50% Rabatt > Code: " + code;
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.pathname.includes("/transaction/")) {
        if (languagesetting == "0") {
            presenceData.details = "Viewing transactions...";
            presenceData.state = "Waiting for a product";
            presence.setActivity(presenceData);
        }
        else if (languagesetting == "1") {
            presenceData.details = "Schaut auf Bestellungen";
            presenceData.state = "Wartet auf ein Produkt";
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.pathname == "/profile") {
        const name2 = document.querySelector("#react-app > div > div.TabBarWrapper__Wrapper-sc-1p5ocnd-0.wZbPl > div.FlexScrollContainer__FlexGrandparent-o9gi86-0.jXFTEW > div > div > div.NavPanel__Wrapper-sc-1uxerbb-0.kFfmiE > div.NavPanel__Name-sc-1uxerbb-1.kHdhxC").textContent;
        if (languagesetting == "0") {
            presenceData.details = "Viewing profile";
            presenceData.state = name2;
            presence.setActivity(presenceData);
        }
        else if (languagesetting == "1") {
            presenceData.details = "Schaut auf ein Profil";
            presenceData.state = name2;
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.pathname.includes("/merchant/")) {
        const shop = document.querySelector("#react-app > div > div.TabBarWrapper__Wrapper-sc-1p5ocnd-0.fjpSHM > div.TabBarWrapper__MainRowContainer-sc-1p5ocnd-1.idAkGy > div.MerchantPage__Wrapper-sc-1nxlnue-0.doABiZ > div.MerchantPage__HeaderWrapper-sc-1nxlnue-1.gYkbZT > div > div > h1").textContent;
        if (languagesetting == "0") {
            presenceData.details = "Viewing shop";
            presenceData.state = shop;
            presence.setActivity(presenceData);
        }
        else if (languagesetting == "1") {
            presenceData.details = "Stöbert durch Shop";
            presenceData.state = shop;
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.pathname == "/feed/tabbed_feed_latest") {
        if (languagesetting == "0") {
            presenceData.details = "Viewing popular Feed...";
            presence.setActivity(presenceData);
        }
        else if (languagesetting == "1") {
            presenceData.details = "Stöbert durch";
            presenceData.state = "Populär Feed";
            presence.setActivity(presenceData);
        }
        if (document.location.pathname.includes("/product/")) {
            const product = document.querySelector("#react-app > div > div.modal-root.BaseModal__ModalContainer-sc-188teto-4.bFHXBY > div > div > div > div > div.ProductContainer__ProductMainSection-sc-1vbd28u-1.fYThRf > div.ProductContainer__RightColumn-sc-1vbd28u-3.ewTgOn > div > div.PurchaseContainer__UpperWrapper-sc-1qlezk8-1.jEnuPa > h1").textContent;
            presenceData.details = "Viewing product";
            presenceData.state = product;
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.pathname == "/feed/pickup__tab") {
        if (languagesetting == "0") {
            presenceData.details = "Viewing local Feed...";
            presence.setActivity(presenceData);
        }
        else if (languagesetting == "1") {
            presenceData.details = "Stöbert durch";
            presenceData.details = "Lokal Feed";
            presence.setActivity(presenceData);
        }
        if (document.location.pathname.includes("/product/")) {
            presenceData.details = "Viewing product";
            presenceData.state = itemdesc;
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.pathname == "/feed/blitz_buy__tab") {
        if (languagesetting == "0") {
            presenceData.details = "Wheel of Fortune";
            presenceData.state = "Try your Luck!";
            presence.setActivity(presenceData);
        }
        else if (languagesetting == "1") {
            presenceData.details = "Glücksrat";
            presenceData.state = "Versuche dein Glück";
            presence.setActivity(presenceData);
        }
        if (document.location.pathname.includes("/product/")) {
            presenceData.details = "Viewing product";
            presenceData.state = itemdesc;
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.pathname == "/feed/express__tab") {
        if (languagesetting == "0") {
            presenceData.details = "Viewing express Feed...";
            presence.setActivity(presenceData);
        }
        else if (languagesetting == "1") {
            presenceData.details = "Stöbert durch";
            presenceData.state = "Express Feed";
            presence.setActivity(presenceData);
        }
        if (document.location.pathname.includes("/product/")) {
            presenceData.details = "Viewing product";
            presenceData.state = itemdesc;
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.pathname == "/feed/recently_viewed__tab") {
        if (languagesetting == "0") {
            presenceData.details = "Look at";
            presenceData.state = "recently seen products";
            presence.setActivity(presenceData);
        }
        else if (languagesetting == "1") {
            presenceData.details = "Schaut auf";
            presenceData.state = "kürzlich gesehene Produkte";
            presence.setActivity(presenceData);
        }
        if (document.location.pathname.includes("/product/")) {
            presenceData.details = "Viewing product";
            presenceData.state = itemdesc;
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.pathname.includes("/feed/tag_")) {
        const tag = document.querySelector("#react-app > div > div.TabBarWrapper__Wrapper-sc-1p5ocnd-0.fjpSHM > div.TabBar__Wrapper-sc-1vadptt-0.bTjdiW > div > div > div > h1").textContent;
        if (languagesetting == "0") {
            presenceData.details = "Viewing for";
            presenceData.state = tag;
            presence.setActivity(presenceData);
        }
        else if (languagesetting == "1") {
            presenceData.details = "Stöbert durch";
            presenceData.state = tag;
            presence.setActivity(presenceData);
        }
        if (document.location.pathname.includes("/product/")) {
            const product = document.querySelector("#react-app > div > div.modal-root.BaseModal__ModalContainer-sc-188teto-4.bFHXBY > div > div > div > div > div.ProductContainer__ProductMainSection-sc-1vbd28u-1.fYThRf > div.ProductContainer__RightColumn-sc-1vbd28u-3.ewTgOn > div > div.PurchaseContainer__UpperWrapper-sc-1qlezk8-1.jEnuPa > h1").textContent;
            presenceData.details = "Viewing product";
            presenceData.state = product;
            presence.setActivity(presenceData);
        }
    }
    else {
        presence.setActivity();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsTUFBTTtLQUN0QixDQUFDO0lBRUYsTUFBTSxXQUFXLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZELE1BQU0sZUFBZSxHQUFHLE1BQU0sUUFBUSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM5RCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDcEIsSUFBSSxRQUFRLENBQUM7SUFHYixJQUNFLFFBQVEsQ0FBQyxhQUFhLENBQUMsMENBQTBDLENBQUMsSUFBSSxJQUFJLEVBQzFFO1FBRUEsUUFBUSxHQUFHLEtBQUssQ0FBQztLQUNsQjtTQUFNO1FBQ0wsUUFBUSxHQUFHLElBQUksQ0FBQztLQUNqQjtJQUVELElBQUksV0FBVyxJQUFJLElBQUksSUFBSSxRQUFRLElBQUksSUFBSSxFQUFFO1FBRTNDLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUMvQiw0T0FBNE8sQ0FDN08sQ0FBQyxXQUFXLENBQUM7UUFDZCxRQUFRLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7S0FDL0Q7U0FBTTtRQUNMLElBQUksZUFBZSxJQUFJLEdBQUcsRUFBRTtZQUMxQixRQUFRLEdBQUcscUJBQXFCLENBQUM7U0FDbEM7YUFBTSxJQUFJLGVBQWUsSUFBSSxHQUFHLEVBQUU7WUFDakMsUUFBUSxH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