const presence = new Presence({
    clientId: "786739998011293717"
});

let item: any,
item2: any;

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
    const presenceData: PresenceData = {
        largeImageKey: "grailedlogo"
    };

    presenceData.startTimestamp = browsingStamp;

    if (document.location.hostname == "www.grailed.com") {

        if (document.location.pathname.includes("/listings/")) {
            item = document.querySelector("body > div.container > div > div.show-listing > div.listing-details-wrapper > div.-listing-details-and-likes-wrapper > div.-listing-designer-title-size > h1");
            
            presenceData.details = "Viewing a listing:";
            if (item.innerText.length > 128) {
                presenceData.state = item.innerText.substring(0, 125) + "...";
            } else {
                presenceData.state = item.innerText;
            } 
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        
        } else if (document.location.pathname.includes("mygrails")) {
            
            presenceData.details = "Browsing:";
            presenceData.state = "My Grails";
            
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);

        } else if (document.location.pathname.includes("foryou")) {
            
            presenceData.details = "Viewing:";
            presenceData.state = "For You";
            
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);

        } else if (document.location.href.includes("www.grailed.com/collections")) {
            
            if (document.location.href.includes("www.grailed.com/collections/")) {
                presenceData.details = "Browsing a Collection:";
                item = document.querySelector("#CapsulePage > div.CapsuleHeader > div.-container._has-hero > div > div.-name-container > h1");
                if (item.innerText.length > 128) {
                    presenceData.state = item.innerText.substring(0, 125) + "...";
                } else {
                    presenceData.state = item.innerText;
                } 
            } else {
                presenceData.details = "Browsing:";
                presenceData.state = "Collections";
            }
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);

        } else if (document.location.href.includes("www.grailed.com/designers")) {
        
            if (document.location.href.includes("www.grailed.com/designers/")) {

                if (document.location.pathname.lastIndexOf("/") < 11) {
                    presenceData.details = "Browsing a Designer:";

                    item = document.querySelector("#__next > div > main > div:nth-child(2) > div.ProfileWrapper > div > div.DetailPageProfile-Info > div > h1");
                    
                    if (item.innerText.length > 128) {
                        presenceData.state = item.innerText.substring(0, 125) + "...";
                    } else {
                        presenceData.state = item.innerText;
                    } 
                } else {
                    item = document.querySelector("#designer-category > div.FiltersInstantSearch > div.feed-and-filters > div.right > h2");
                    presenceData.details = "Browsing:";
                    if (item.innerText.length > 128) {
                        presenceData.state = item.innerText.substring(29, 125) + "...";
                    } else {
                        presenceData.state = item.innerText.substring(29, item.length);
                    }
                } 
            } else if (document.location.href.endsWith("www.grailed.com/designers")) {
                presenceData.details = "Browsing:";
                presenceData.state = "Designers";
            }  
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);

        } else if (document.location.href.includes("grailed.com/categories/")) {   

            presenceData.details = "Browsing:";

            item = document.querySelector("#CategoryPage > div.-pageHeader > div > div.DetailPage--Header > div.-details > h1");
            if (item.innerText.length > 128) {
                presenceData.state = item.innerText.substring(0, 125) + "...";
            } else {
                presenceData.state = item.innerText;
            } 
            delete presenceData.smallImageKey;     
            presence.setActivity(presenceData);
            
        } else if (document.location.href.includes(".com/drycleanonly/categories/")) {
            
            presenceData.details = "Reading:";

            item = document.querySelector("#blog > div.container.tagged-articles > div.filtered-articles-wrapper > h1");
            if (item.innerText.length > 128) {
                presenceData.state = item.innerText.substring(0, 125) + "...";
            } else {
                presenceData.state = item.innerText;
            } 
            delete presenceData.smallImageKey;     
            presence.setActivity(presenceData);

        } else if (document.location.href.includes("www.grailed.com/products/")) {
            
            presenceData.details = "Browsing a Product:";

            item = document.querySelector("#ProductPage > div.ProductPageHeader > div.-info > h1.-product-name");
            item2 = document.querySelector("#ProductPage > div.ProductPageHeader > div.-info > h1.-designers-names");
            if (item.innerText.length > 108) {
                presenceData.state = item2.textContent + ": " + item.textContent.substring(0, 105) + "...";
            } else {
                presenceData.state = item2.textContent + ": " + item.textContent;
            } 
            delete presenceData.smallImageKey;     
            presence.setActivity(presenceData);

        }  else if (document.location.pathname.includes("/drycleanonly")) {
            
            if (document.location.href.includes("www.grailed.com/drycleanonly/")) {
                item = document.querySelector("#blog > div.article-wrapper > div > div.article-top-section > h1 > p");
                item2 = document.querySelector("div.heatwave-app > div.Heatwave--Page > div.Editorial--CampaignPageHeroModule._Heatwave > div > div.--title");
                presenceData.details = "Reading:";

                if (item != null) {
                    if (item.innerText.length > 128) {
                        presenceData.state = item.innerText.substring(0, 125) + "...";
                    } else {
                        presenceData.state = item.innerText;
                    }
                } else if (item2 != null) {
                    if (item2.innerText.length > 128) {
                        presenceData.state = item2.innerText.substring(0, 125) + "...";
                    } else {
                        presenceData.state = item2.innerText;
                    }
                }
            } else {
                presenceData.details = "Reading:";
                presenceData.state = "Dry Clean Only";
            } 
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);

        } else if (document.location.href.includes("grailed.com/shop")) {
            
            if (document.location.href.includes("grailed.com/shop/staff-picks")) {

                presenceData.details = "Browsing:"; 
                presenceData.state = "Staff Picks";  
            } else {
                
                item = document.querySelector("#shop > div > div > div.feed-and-filters > div.right > h2");

                if (item.innerText.includes("Available listings related to")) {

                    presenceData.details = "Searching for:";
                    presenceData.state = item.innerText.substring(29, 125);

                } else {
                    presenceData.details = "Browsing:"; 
                    presenceData.state = "The Feed";  
                }
            }
            delete presenceData.smallImageKey
            presence.setActivity(presenceData);
            
        } else if (document.location.href.includes("grailed.com") && document.location.href.endsWith("grailed.com/")) {
            
            presenceData.details = "Viewing:";
            presenceData.state = "The Main Page";
        
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);

        } else if (document.location.href.includes("grailed.com/")) {
            
            item = document.querySelector("#wardrobe > div > div.UserInfo > div.--header > div.--info > div.--user-container > div.--user-info > div.--username-container > span");
            presenceData.details = "Viewing a User:";
            if (item.innerText.length > 128) {
                presenceData.state = item.innerText.substring(0, 125) + "...";
            } else {
                presenceData.state = item.innerText;
            } 
        
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        } else {
            presence.setActivity();
            presence.setTrayTitle();
            }
        } 
    });
