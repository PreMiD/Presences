var genericStyle = "font-weight: 800; padding: 2px 5px; color: white;";

function PMD_info(message) {
  console.log(
    "%cPreMiD%cINFO%c " + message,
    genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;",
    genericStyle + "border-radius: 0 25px 25px 0; background: #5050ff;",
    "color: unset;"
  );
}

function PMD_error(message) {
  console.log(
    "%cPreMiD%cERROR%c " + message,
    genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;",
    genericStyle + "border-radius: 0 25px 25px 0; background: #ff5050;",
    "color: unset;"
  );
}

function PMD_success(message) {
  console.log(
    "%cPreMiD%cSUCCESS%c " + message,
    genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;",
    genericStyle +
      "border-radius: 0 25px 25px 0; background: #50ff50; color: black;",
    "color: unset;"
  );
}

var presence = new Presence({
  clientId: "618138980273094695", // CLIENT ID FOR YOUR PRESENCE
  mediaKeys: false
})

var item : any, dropdown : any, dropdownfinal : any, dropdownplus1 : any, search : any, dropdowninnertext : any, split : any, personal2 : any, profile : any, board2 : any;
 
var browsingStamp = Math.floor(Date.now()/1000);

presence.on("UpdateData", async () => {

  let presenceData: presenceData = {
    largeImageKey: "amazon"
  };

  presenceData.startTimestamp = browsingStamp;

  if(document.location.hostname == "www.amazon.com" || document.location.hostname == "www.amazon.com.au" || document.location.hostname == "www.amazon.de" || document.location.hostname == "www.amazon.ca" || document.location.hostname == "www.amazon.cn" || document.location.hostname == "www.amazon.es" || document.location.hostname == "www.amazon.fr" || document.location.hostname == "www.amazon.nl" || document.location.hostname == "www.amazon.in" || document.location.hostname == "www.amazon.co.jp" || document.location.hostname == "www.amazon.ae" || document.location.hostname == "www.amazon.co.uk" || document.location.hostname == "www.amazon.com.tr" || document.location.hostname == "www.amazon.com.br" || document.location.hostname == "smile.amazon.com" || document.location.hostname == "smile.amazon.com.au" || document.location.hostname == "smile.amazon.de" || document.location.hostname == "smile.amazon.ca" || document.location.hostname == "smile.amazon.cn" || document.location.hostname == "smile.amazon.es" || document.location.hostname == "smile.amazon.fr" || document.location.hostname == "smile.amazon.nl" || document.location.hostname == "smile.amazon.in" || document.location.hostname == "smile.amazon.co.jp" || document.location.hostname == "smile.amazon.ae" || document.location.hostname == "smile.amazon.co.uk" || document.location.hostname == "smile.amazon.com.tr" || document.location.hostname == "smile.amazon.com.br") {
    item = document.querySelector("#search > span > h1 > div > div.sg-col-14-of-20.sg-col-26-of-32.sg-col-18-of-24.sg-col.sg-col-22-of-28.s-breadcrumb.sg-col-10-of-16.sg-col-30-of-36.sg-col-6-of-12 > div > div > span.a-color-state.a-text-bold");

    if(document.querySelector("#productTitle") !== null) {
      item = document.querySelector("#productTitle");

      presenceData.details = "Viewing product:";
      if (item.innerText.length > 128) {
        presenceData.state = item.innerText.substring(0,125) + "...";
      } else {
        presenceData.state = item.innerText;
      }
            
      delete presenceData.smallImageKey;
      
      presence.setActivity(presenceData); 

    } else if(document.querySelector("#a-page > div.av-page-desktop.avu-retail-page > div.avu-content.avu-section > div > div > div.DVWebNode-detail-atf-wrapper.DVWebNode > div.av-detail-section > div > h1") !== null) {
      item = document.querySelector("#a-page > div.av-page-desktop.avu-retail-page > div.avu-content.avu-section > div > div > div.DVWebNode-detail-atf-wrapper.DVWebNode > div.av-detail-section > div > h1");

      presenceData.details = "Viewing Prime Video:";
      presenceData.state = item.innerText;
      
      delete presenceData.smallImageKey;
      
      presence.setActivity(presenceData); 

    } else if (document.location.pathname.includes("/s") && item !== null) {
      item = document.querySelector("#search > span > h1 > div > div.sg-col-14-of-20.sg-col-26-of-32.sg-col-18-of-24.sg-col.sg-col-22-of-28.s-breadcrumb.sg-col-10-of-16.sg-col-30-of-36.sg-col-6-of-12 > div > div > span.a-color-state.a-text-bold");
      
      presenceData.details = "Searching for:";
      presenceData.state = item.innerText;
      
      presenceData.smallImageKey = "search";
      
      presence.setActivity(presenceData); 
    } else if (document.querySelector("#gc-asin-title") !== null) {
      item = document.querySelector("#gc-asin-title");

      presenceData.details = "Viewing product:";
      if (item.innerText.length > 128) {
        presenceData.state = item.innerText.substring(0,125) + "...";
      } else {
        presenceData.state = item.innerText;
      }
      
      delete presenceData.smallImageKey;
      
      presence.setActivity(presenceData); 

    } else if (document.location.pathname.includes("/profile")) {
      item = document.querySelector("#customer-profile-name-header > div.a-row.a-spacing-none.name-container > span");
      presenceData.details = "Viewing profile:";
      presenceData.state = item.innerText;
      
      delete presenceData.smallImageKey;
      
      presence.setActivity(presenceData); 
    } else if (document.location.pathname.includes("/store")) {
      item = document.title.split(":");
      presenceData.details = "Viewing store:";
      presenceData.state = item[1];
      
      delete presenceData.smallImageKey;
      
      presence.setActivity(presenceData); 
    } else if (document.location.pathname.includes("/history")) {
      presenceData.details = "Viewing their history";
      delete presenceData.state;
      
      delete presenceData.smallImageKey;
      
      presence.setActivity(presenceData); 
    } else if (document.location.pathname.includes("/gift-cards")) {
      presenceData.details = "Viewing Giftcards";
      delete presenceData.state;
      
      delete presenceData.smallImageKey;
      
      presence.setActivity(presenceData); 
    } else if (document.location.pathname.includes("/yourstore")) {
      presenceData.details = "Viewing recommended";
      delete presenceData.state;
      
      delete presenceData.smallImageKey;
      
      presence.setActivity(presenceData); 
    } else if (document.location.pathname.includes("/wishlist")) {
      presenceData.details = "Viewing their wishlist";
      delete presenceData.state;
      
      delete presenceData.smallImageKey;
      
      presence.setActivity(presenceData); 
    } else if (document.location.pathname.includes("/cart")) {
      presenceData.details = "Viewing their cart";
      delete presenceData.state;
      
      delete presenceData.smallImageKey;
      
      presence.setActivity(presenceData); 
    } else if (document.location.pathname.includes("/order-history")) {
      presenceData.details = "Viewing their";
      presenceData.state = "order history";
      
      delete presenceData.smallImageKey;
      
      presence.setActivity(presenceData); 
    } else if (document.location.pathname.includes("/order-details")) {
      presenceData.details = "Viewing their";
      presenceData.state = "order details";
      
      delete presenceData.smallImageKey;
      
      presence.setActivity(presenceData); 
    } else if (document.location.pathname.includes("/amazonprime")) {
      presenceData.details = "Viewing Amazon Prime";
      delete presenceData.state;
      
      delete presenceData.smallImageKey;
      
      presence.setActivity(presenceData); 
    } else if (document.location.pathname.includes("/site-directory")) {
      presenceData.details = "Viewing all categories";
      delete presenceData.state;
      
      delete presenceData.smallImageKey;
      
      presence.setActivity(presenceData); 
    } else if (document.location.pathname.includes("/yourpets")) {
      presenceData.details = "Viewing pets";
      delete presenceData.state;
      
      delete presenceData.smallImageKey;
      
      presence.setActivity(presenceData); 
    } else if (document.location.pathname.includes("/addresses")) {
      presenceData.details = "Viewing addresses";
      delete presenceData.state;
      
      delete presenceData.smallImageKey;
      
      presence.setActivity(presenceData); 
    } else if (document.location.pathname.includes("/managepaymentmethods")) {
      presenceData.details = "Viewing payment methods";
      delete presenceData.state;
      
      delete presenceData.smallImageKey;
      
      presence.setActivity(presenceData); 
    } else if (document.location.pathname.includes("/balance")) {
      presenceData.details = "Viewing their balance";
      delete presenceData.state;
      
      delete presenceData.smallImageKey;
      
      presence.setActivity(presenceData); 
    } else if (document.location.pathname.includes("/adprefs")) {
      presenceData.details = "Viewing their adprefs";
      delete presenceData.state;
      
      delete presenceData.smallImageKey;
      
      presence.setActivity(presenceData); 
    } else if (document.location.pathname.includes("/yourmembershipsandsubscriptions")) {
      presenceData.details = "Viewing subscriptions";
      delete presenceData.state;
      
      delete presenceData.smallImageKey;
      
      presence.setActivity(presenceData); 
    } else if (document.location.search.includes("nav_youraccount_ya") || document.location.pathname.includes("/your-account")) {
      presenceData.details = "Viewing their account";
      delete presenceData.state;
      
      delete presenceData.smallImageKey;
      
      presence.setActivity(presenceData); 
    } else if (document.location.pathname.includes("/ref=nav_logo")) {
      presence.setActivity();
      presence.setTrayTitle(); 
    } else if (document.location.pathname.includes("/help/")) {
      presenceData.details = "Viewing Help Center";
      delete presenceData.state;
      
      delete presenceData.smallImageKey;
      
      presence.setActivity(presenceData); 
    } else { 
      if (document.querySelector("#searchDropdownBox") !== null) {
        dropdown = document.querySelector("#searchDropdownBox").getAttribute("data-nav-selected");
        dropdownplus1 = +dropdown + 1;
        dropdownfinal = "#searchDropdownBox > option:nth-child(" + dropdownplus1 + ")";
        dropdowninnertext = document.querySelector(dropdownfinal).innerText;
        split = document.location.pathname.split("/" , 3);
        if (dropdown !== "0" || split[1] !== "") {
          presenceData.details = "Browsing category:";
          presenceData.state = dropdowninnertext;
        
          delete presenceData.smallImageKey;
        
          presence.setActivity(presenceData); 
        } else {
  
          presence.setActivity();
          presence.setTrayTitle(); 
  
        }
      } else {

        presence.setActivity();
        presence.setTrayTitle(); 

      }
    }
  } else { 

    presence.setActivity();
    presence.setTrayTitle(); 
    
  }

});