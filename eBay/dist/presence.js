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
    clientId: "619219701146583080"
});
var item, typing, index, categorytext, search, dropdowninnertext, split, item2, itemfinish, board2;
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "ebaylogo"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.hostname == "in.ebay.com" ||
        document.location.hostname == "ar.ebay.com" ||
        document.location.hostname == "by.ebay.com" ||
        document.location.hostname == "bo.ebay.com" ||
        document.location.hostname == "br.ebay.com" ||
        document.location.hostname == "cl.ebay.com" ||
        document.location.hostname == "co.ebay.com" ||
        document.location.hostname == "cr.ebay.com" ||
        document.location.hostname == "do.ebay.com" ||
        document.location.hostname == "ec.ebay.com" ||
        document.location.hostname == "sv.ebay.com" ||
        document.location.hostname == "gt.ebay.com" ||
        document.location.hostname == "hn.ebay.com" ||
        document.location.hostname == "il.ebay.com" ||
        document.location.hostname == "kz.ebay.com" ||
        document.location.hostname == "mx.ebay.com" ||
        document.location.hostname == "ni.ebay.com" ||
        document.location.hostname == "pa.ebay.com" ||
        document.location.hostname == "py.ebay.com" ||
        document.location.hostname == "pe.ebay.com" ||
        document.location.hostname == "pt.ebay.com" ||
        document.location.hostname == "pr.ebay.com" ||
        document.location.hostname == "ru.ebay.com" ||
        document.location.hostname == "uy.ebay.com" ||
        document.location.hostname == "ve.ebay.com") {
        presenceData.details = "Viewing the";
        presenceData.state = "main page";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "www.ebay.at" ||
        document.location.hostname == "www.ebay.be" ||
        document.location.hostname == "www.ebay.ca" ||
        document.location.hostname == "www.ebay.cn" ||
        document.location.hostname == "www.ebay.fr" ||
        document.location.hostname == "www.ebay.de" ||
        document.location.hostname == "www.ebay.ie" ||
        document.location.hostname == "www.ebay.it" ||
        document.location.hostname == "www.ebay.nl" ||
        document.location.hostname == "www.ebay.ph" ||
        document.location.hostname == "www.ebay.pl" ||
        document.location.hostname == "www.ebay.es" ||
        document.location.hostname == "www.ebay.ch" ||
        document.location.hostname == "www.ebay.vn" ||
        document.location.hostname == "www.ebay.com" ||
        document.location.hostname == "www.ebay.co.th" ||
        document.location.hostname == "www.ebay.co.uk" ||
        document.location.hostname == "www.ebay.co.jp" ||
        document.location.hostname == "www.ebay.com.au" ||
        document.location.hostname == "www.ebay.com.hk" ||
        document.location.hostname == "www.ebay.com.my" ||
        document.location.hostname == "www.ebay.com.sg" ||
        document.location.hostname == "www.ebay.com.tw" ||
        document.location.hostname == "www.benl.ebay.be" ||
        document.location.hostname == "www.befr.ebay.be") {
        if (document.location.pathname.includes("/itm/")) {
            item = document.querySelector("#itemTitle");
            item2 = document.querySelector("#itemTitle > span");
            itemfinish = item.innerText.replace(item2.innerText, "");
            presenceData.details = "Viewing product:";
            if (itemfinish.length > 128) {
                presenceData.state = itemfinish.substring(0, 125) + "...";
            }
            else {
                presenceData.state = itemfinish;
            }
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/usr/")) {
            item = document.querySelector("#user_info > div.mbg > span:nth-child(1) > a.mbg-id");
            item2 = document.querySelector("#user_info > div.mbg > span:nth-child(1) > a.mbg-id > span");
            itemfinish = item.innerText.replace(item2.innerText, "");
            presenceData.details = "Viewing user:";
            presenceData.state = itemfinish;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/m.html")) {
            item = document.querySelector("#soiBanner > div > span:nth-child(1) > a");
            presenceData.details = "Viewing listed products of:";
            presenceData.state = item.innerText;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/i.html")) {
            split = document.location.pathname.split("/");
            item = document.querySelector("#cbelm > div.clt > h1 > span.kwcat > b");
            if (split[2] == "i.html") {
                presenceData.details = "Searching for:";
                presenceData.state = item.innerText;
            }
            else {
                presenceData.details = "Searching for:";
                presenceData.state = split[2];
            }
            presenceData.smallImageKey = "search";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/myb/")) {
            item = document.querySelector("#top-nav > div.topTitle > h1 > span.page-name");
            presenceData.details = "Viewing their:";
            presenceData.state = item.innerText;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/sns") ||
            document.location.pathname.includes("/b/Stores-Hub/")) {
            presenceData.details = "Viewing stores";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/sl/")) {
            presenceData.details = "eBay Sell";
            presenceData.state = "Listing an item";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/b/")) {
            item = document.querySelector("body > div.pagecontainer.srp-main--isLarge > div.pagecontainer__top > nav > ol > li:nth-child(2) > span");
            presenceData.details = "Viewing category:";
            presenceData.state = item.innerText;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/help/")) {
            presenceData.details = "eBay Help";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/deals")) {
            presenceData.details = "Viewing the latest";
            presenceData.state = "eBay deals";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/allcategories")) {
            presenceData.details = "Viewing all categories";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/str/")) {
            item = document.querySelector("#w2 > div.str-billboard__store > div.str-billboard__store-info > div.str-billboard__title-container > h1");
            presenceData.details = "eBay Stores";
            presenceData.state = "Tag: " + item.innerText;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else {
            presence.setActivity();
            presence.setTrayTitle();
        }
    }
    else if (document.location.hostname == "mesg.ebay.at" ||
        document.location.hostname == "mesg.ebay.be" ||
        document.location.hostname == "mesg.ebay.ca" ||
        document.location.hostname == "mesg.ebay.cn" ||
        document.location.hostname == "mesg.ebay.fr" ||
        document.location.hostname == "mesg.ebay.de" ||
        document.location.hostname == "mesg.ebay.ie" ||
        document.location.hostname == "mesg.ebay.it" ||
        document.location.hostname == "mesg.ebay.nl" ||
        document.location.hostname == "mesg.ebay.ph" ||
        document.location.hostname == "mesg.ebay.pl" ||
        document.location.hostname == "mesg.ebay.es" ||
        document.location.hostname == "mesg.ebay.ch" ||
        document.location.hostname == "mesg.ebay.vn" ||
        document.location.hostname == "mesg.ebay.com" ||
        document.location.hostname == "mesg.ebay.co.th" ||
        document.location.hostname == "mesg.ebay.co.uk" ||
        document.location.hostname == "mesg.ebay.co.jp" ||
        document.location.hostname == "mesg.ebay.com.au" ||
        document.location.hostname == "mesg.ebay.com.hk" ||
        document.location.hostname == "mesg.ebay.com.my" ||
        document.location.hostname == "mesg.ebay.com.sg" ||
        document.location.hostname == "mesg.ebay.com.tw" ||
        document.location.hostname == "mesg.benl.ebay.be" ||
        document.location.hostname == "mesg.befr.ebay.be") {
        if (document.location.pathname.includes("/ViewMessageDetail/")) {
            presenceData.details = "eBay Messages";
            presenceData.state = "Viewing a message";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/ViewMessages/")) {
            presenceData.details = "Browsing through";
            presenceData.state = "eBay Messages";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else {
            presenceData.details = "eBay Messages";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.hostname == "ocsnext.ebay.at" ||
        document.location.hostname == "ocsnext.ebay.be" ||
        document.location.hostname == "ocsnext.ebay.ca" ||
        document.location.hostname == "ocsnext.ebay.cn" ||
        document.location.hostname == "ocsnext.ebay.fr" ||
        document.location.hostname == "ocsnext.ebay.de" ||
        document.location.hostname == "ocsnext.ebay.ie" ||
        document.location.hostname == "ocsnext.ebay.it" ||
        document.location.hostname == "ocsnext.ebay.nl" ||
        document.location.hostname == "ocsnext.ebay.ph" ||
        document.location.hostname == "ocsnext.ebay.pl" ||
        document.location.hostname == "ocsnext.ebay.es" ||
        document.location.hostname == "ocsnext.ebay.ch" ||
        document.location.hostname == "ocsnext.ebay.vn" ||
        document.location.hostname == "ocsnext.ebay.com" ||
        document.location.hostname == "ocsnext.ebay.co.th" ||
        document.location.hostname == "ocsnext.ebay.co.uk" ||
        document.location.hostname == "ocsnext.ebay.co.jp" ||
        document.location.hostname == "ocsnext.ebay.com.au" ||
        document.location.hostname == "ocsnext.ebay.com.hk" ||
        document.location.hostname == "ocsnext.ebay.com.my" ||
        document.location.hostname == "ocsnext.ebay.com.sg" ||
        document.location.hostname == "ocsnext.ebay.com.tw" ||
        document.location.hostname == "ocsnext.benl.ebay.be" ||
        document.location.hostname == "ocsnext.befr.ebay.be") {
        presenceData.details = "eBay Customer Support";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "developer.ebay.com" ||
        document.location.hostname == "forums.developer.ebay.com" ||
        document.location.hostname == "go.developer.ebay.com") {
        presenceData.details = "eBay Developer Program";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "resolutioncenter.ebay.at" ||
        document.location.hostname == "resolutioncenter.ebay.be" ||
        document.location.hostname == "resolutioncenter.ebay.ca" ||
        document.location.hostname == "resolutioncenter.ebay.cn" ||
        document.location.hostname == "resolutioncenter.ebay.fr" ||
        document.location.hostname == "resolutioncenter.ebay.de" ||
        document.location.hostname == "resolutioncenter.ebay.ie" ||
        document.location.hostname == "resolutioncenter.ebay.it" ||
        document.location.hostname == "resolutioncenter.ebay.nl" ||
        document.location.hostname == "resolutioncenter.ebay.ph" ||
        document.location.hostname == "resolutioncenter.ebay.pl" ||
        document.location.hostname == "resolutioncenter.ebay.es" ||
        document.location.hostname == "resolutioncenter.ebay.ch" ||
        document.location.hostname == "resolutioncenter.ebay.vn" ||
        document.location.hostname == "resolutioncenter.ebay.com" ||
        document.location.hostname == "resolutioncenter.ebay.co.th" ||
        document.location.hostname == "resolutioncenter.ebay.co.uk" ||
        document.location.hostname == "resolutioncenter.ebay.co.jp" ||
        document.location.hostname == "resolutioncenter.ebay.com.au" ||
        document.location.hostname == "resolutioncenter.ebay.com.hk" ||
        document.location.hostname == "resolutioncenter.ebay.com.my" ||
        document.location.hostname == "resolutioncenter.ebay.com.sg" ||
        document.location.hostname == "resolutioncenter.ebay.com.tw" ||
        document.location.hostname == "resolutioncenter.benl.ebay.be" ||
        document.location.hostname == "resolutioncenter.befr.ebay.be") {
        presenceData.details = "eBay Resolution Center";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "my.ebay.at" ||
        document.location.hostname == "my.ebay.be" ||
        document.location.hostname == "my.ebay.ca" ||
        document.location.hostname == "my.ebay.cn" ||
        document.location.hostname == "my.ebay.fr" ||
        document.location.hostname == "my.ebay.de" ||
        document.location.hostname == "my.ebay.ie" ||
        document.location.hostname == "my.ebay.it" ||
        document.location.hostname == "my.ebay.nl" ||
        document.location.hostname == "my.ebay.ph" ||
        document.location.hostname == "my.ebay.pl" ||
        document.location.hostname == "my.ebay.es" ||
        document.location.hostname == "my.ebay.ch" ||
        document.location.hostname == "my.ebay.vn" ||
        document.location.hostname == "my.ebay.com" ||
        document.location.hostname == "my.ebay.co.th" ||
        document.location.hostname == "my.ebay.co.uk" ||
        document.location.hostname == "my.ebay.co.jp" ||
        document.location.hostname == "my.ebay.com.au" ||
        document.location.hostname == "my.ebay.com.hk" ||
        document.location.hostname == "my.ebay.com.my" ||
        document.location.hostname == "my.ebay.com.sg" ||
        document.location.hostname == "my.ebay.com.tw" ||
        document.location.hostname == "my.benl.ebay.be" ||
        document.location.hostname == "my.befr.ebay.be") {
        presenceData.details = "Viewing their eBay";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "login.ebay.at" ||
        document.location.hostname == "login.ebay.be" ||
        document.location.hostname == "login.ebay.ca" ||
        document.location.hostname == "login.ebay.cn" ||
        document.location.hostname == "login.ebay.fr" ||
        document.location.hostname == "login.ebay.de" ||
        document.location.hostname == "login.ebay.ie" ||
        document.location.hostname == "login.ebay.it" ||
        document.location.hostname == "login.ebay.nl" ||
        document.location.hostname == "login.ebay.ph" ||
        document.location.hostname == "login.ebay.pl" ||
        document.location.hostname == "login.ebay.es" ||
        document.location.hostname == "login.ebay.ch" ||
        document.location.hostname == "login.ebay.vn" ||
        document.location.hostname == "login.ebay.com" ||
        document.location.hostname == "login.ebay.co.th" ||
        document.location.hostname == "login.ebay.co.uk" ||
        document.location.hostname == "login.ebay.co.jp" ||
        document.location.hostname == "login.ebay.com.au" ||
        document.location.hostname == "login.ebay.com.hk" ||
        document.location.hostname == "login.ebay.com.my" ||
        document.location.hostname == "login.ebay.com.sg" ||
        document.location.hostname == "login.ebay.com.tw" ||
        document.location.hostname == "login.benl.ebay.be" ||
        document.location.hostname == "login.befr.ebay.be") {
        presenceData.details = "eBay Login";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "signin.ebay.at" ||
        document.location.hostname == "signin.ebay.be" ||
        document.location.hostname == "signin.ebay.ca" ||
        document.location.hostname == "signin.ebay.cn" ||
        document.location.hostname == "signin.ebay.fr" ||
        document.location.hostname == "signin.ebay.de" ||
        document.location.hostname == "signin.ebay.ie" ||
        document.location.hostname == "signin.ebay.it" ||
        document.location.hostname == "signin.ebay.nl" ||
        document.location.hostname == "signin.ebay.ph" ||
        document.location.hostname == "signin.ebay.pl" ||
        document.location.hostname == "signin.ebay.es" ||
        document.location.hostname == "signin.ebay.ch" ||
        document.location.hostname == "signin.ebay.vn" ||
        document.location.hostname == "signin.ebay.com" ||
        document.location.hostname == "signin.ebay.co.th" ||
        document.location.hostname == "signin.ebay.co.uk" ||
        document.location.hostname == "signin.ebay.co.jp" ||
        document.location.hostname == "signin.ebay.com.au" ||
        document.location.hostname == "signin.ebay.com.hk" ||
        document.location.hostname == "signin.ebay.com.my" ||
        document.location.hostname == "signin.ebay.com.sg" ||
        document.location.hostname == "signin.ebay.com.tw" ||
        document.location.hostname == "signin.benl.ebay.be" ||
        document.location.hostname == "signin.befr.ebay.be") {
        presenceData.details = "eBay Login";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "pages.ebay.at" ||
        document.location.hostname == "pages.ebay.be" ||
        document.location.hostname == "pages.ebay.ca" ||
        document.location.hostname == "pages.ebay.cn" ||
        document.location.hostname == "pages.ebay.fr" ||
        document.location.hostname == "pages.ebay.de" ||
        document.location.hostname == "pages.ebay.ie" ||
        document.location.hostname == "pages.ebay.it" ||
        document.location.hostname == "pages.ebay.nl" ||
        document.location.hostname == "pages.ebay.ph" ||
        document.location.hostname == "pages.ebay.pl" ||
        document.location.hostname == "pages.ebay.es" ||
        document.location.hostname == "pages.ebay.ch" ||
        document.location.hostname == "pages.ebay.vn" ||
        document.location.hostname == "pages.ebay.com" ||
        document.location.hostname == "pages.ebay.co.th" ||
        document.location.hostname == "pages.ebay.co.uk" ||
        document.location.hostname == "pages.ebay.co.jp" ||
        document.location.hostname == "pages.ebay.com.au" ||
        document.location.hostname == "pages.ebay.com.hk" ||
        document.location.hostname == "pages.ebay.com.my" ||
        document.location.hostname == "pages.ebay.com.sg" ||
        document.location.hostname == "pages.ebay.com.tw" ||
        document.location.hostname == "pages.benl.ebay.be" ||
        document.location.hostname == "pages.befr.ebay.be") {
        if (document.location.hash !== "") {
            presenceData.details = "Viewing the sitemap";
            presenceData.state = document.location.hash;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("sitemap.html")) {
            presenceData.details = "Viewing the sitemap";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("seller-center")) {
            presenceData.details = "Viewing the seller center";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else {
            presence.setActivity();
            presence.setTrayTitle();
        }
    }
    else if (document.location.hostname == "community.ebay.at" ||
        document.location.hostname == "community.ebay.be" ||
        document.location.hostname == "community.ebay.ca" ||
        document.location.hostname == "community.ebay.cn" ||
        document.location.hostname == "community.ebay.fr" ||
        document.location.hostname == "community.ebay.de" ||
        document.location.hostname == "community.ebay.ie" ||
        document.location.hostname == "community.ebay.it" ||
        document.location.hostname == "community.ebay.nl" ||
        document.location.hostname == "community.ebay.ph" ||
        document.location.hostname == "community.ebay.pl" ||
        document.location.hostname == "community.ebay.es" ||
        document.location.hostname == "community.ebay.ch" ||
        document.location.hostname == "community.ebay.vn" ||
        document.location.hostname == "community.ebay.com" ||
        document.location.hostname == "community.ebay.co.th" ||
        document.location.hostname == "community.ebay.co.uk" ||
        document.location.hostname == "community.ebay.co.jp" ||
        document.location.hostname == "community.ebay.com.au" ||
        document.location.hostname == "community.ebay.com.hk" ||
        document.location.hostname == "community.ebay.com.my" ||
        document.location.hostname == "community.ebay.com.sg" ||
        document.location.hostname == "community.ebay.com.tw" ||
        document.location.hostname == "community.benl.ebay.be" ||
        document.location.hostname == "community.befr.ebay.be") {
        if (document.querySelector("#messageview") !== null) {
            item = document.querySelector("#messageview").className;
            split = item.split("message-uid-");
            split = split[1].split(" ");
            item2 =
                "#qanda-message-" +
                    split[0] +
                    " > div:nth-child(1) > div.lia-panel-message-root.lia-message-qanda.lia-panel-message.lia-js-data-messageUid-" +
                    split[0] +
                    " > div > div > div.lia-decoration-border-content > div > div > div > div.lia-quilt-row.lia-quilt-row-forum-message-main > div.lia-quilt-column.lia-quilt-column-20.lia-quilt-column-right.lia-quilt-column-main-right > div > div.lia-message-heading.lia-component-message-header > div > div.lia-quilt-column.lia-quilt-column-20.lia-quilt-column-left > div > div > h5";
            itemfinish = document.querySelector(item2);
        }
        if (document.querySelector("#lia-body > div.lia-page > center > div.MinimumWidthContainer > div > div > div > div > div.lia-quilt-row.lia-quilt-row-row_1 > div > div > div > div.lia-quilt-row.lia-quilt-row-title > div > div > h1 > span") !== null) {
            item = document.querySelector("#lia-body > div.lia-page > center > div.MinimumWidthContainer > div > div > div > div > div.lia-quilt-row.lia-quilt-row-row_1 > div > div > div > div.lia-quilt-row.lia-quilt-row-title > div > div > h1 > span");
            presenceData.details = "eBay Forum, Viewing:";
            if (item.innerText.length > 128) {
                presenceData.state = item.innerText.substring(0, 125) + "...";
            }
            else {
                presenceData.state = item.innerText;
            }
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (itemfinish !== null) {
            presenceData.details = "eBay Forum, Viewing:";
            if (itemfinish.innerText.length > 128) {
                presenceData.state = itemfinish.innerText.substring(0, 125) + "...";
            }
            else {
                presenceData.state = itemfinish.innerText;
            }
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/user/")) {
            item = document.querySelector("#lia-body > div.lia-page > center > div.MinimumWidthContainer > div > div > div > div > div.lia-quilt-row.lia-quilt-row-header > div > div > div.viewprofilepagebanner.lia-component-view-profile-banner > div > div > div.lia-user-name > div > div > span");
            presenceData.details = "Viewing profile of user:";
            if (item.innerText.length > 128) {
                presenceData.state = item.innerText.substring(0, 125) + "...";
            }
            else {
                presenceData.state = item.innerText;
            }
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.querySelector("#messageview > div:nth-child(1) > div > div > div > div > div > div.lia-decoration-border-content > div > div > div > div.lia-quilt-row.lia-quilt-row-forum-message-main > div.lia-quilt-column.lia-quilt-column-20.lia-quilt-column-right.lia-quilt-column-main-right > div > div.lia-message-heading.lia-component-message-header > div > div.lia-quilt-column.lia-quilt-column-20.lia-quilt-column-left > div > div") !== null) {
            item = document.querySelector("#messageview > div:nth-child(1) > div > div > div > div > div > div.lia-decoration-border-content > div > div > div > div.lia-quilt-row.lia-quilt-row-forum-message-main > div.lia-quilt-column.lia-quilt-column-20.lia-quilt-column-right.lia-quilt-column-main-right > div > div.lia-message-heading.lia-component-message-header > div > div.lia-quilt-column.lia-quilt-column-20.lia-quilt-column-left > div > div");
            presenceData.details = "eBay Forum, Reading:";
            if (item.innerText.length > 128) {
                presenceData.state = item.innerText.substring(0, 125) + "...";
            }
            else {
                presenceData.state = item.innerText;
            }
            presenceData.smallImageKey = "reading";
            presence.setActivity(presenceData);
        }
        else if (document.querySelector("#lia-body > div.lia-page > center > div.MinimumWidthContainer > div > div > div > div > div > div > div > div > div.lia-quilt-row.lia-quilt-row-title > div > div > h1 > span") !== null) {
            item = document.querySelector("#lia-body > div.lia-page > center > div.MinimumWidthContainer > div > div > div > div > div > div > div > div > div.lia-quilt-row.lia-quilt-row-title > div > div > h1 > span");
            presenceData.details = "eBay Forum, Reading:";
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
            presence.setActivity();
            presence.setTrayTitle();
        }
    }
    else {
        presence.setActivity();
        presence.setTrayTitle();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFlBQVksR0FBRyxtREFBbUQsQ0FBQztBQUV2RSxTQUFTLFFBQVEsQ0FBQyxPQUFPO0lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQ1QsbUJBQW1CLEdBQUcsT0FBTyxFQUM3QixZQUFZLEdBQUcsb0RBQW9ELEVBQ25FLFlBQVksR0FBRyxvREFBb0QsRUFDbkUsZUFBZSxDQUNoQixDQUFDO0FBQ0osQ0FBQztBQUVELFNBQVMsU0FBUyxDQUFDLE9BQU87SUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FDVCxvQkFBb0IsR0FBRyxPQUFPLEVBQzlCLFlBQVksR0FBRyxvREFBb0QsRUFDbkUsWUFBWSxHQUFHLG9EQUFvRCxFQUNuRSxlQUFlLENBQ2hCLENBQUM7QUFDSixDQUFDO0FBRUQsU0FBUyxXQUFXLENBQUMsT0FBTztJQUMxQixPQUFPLENBQUMsR0FBRyxDQUNULHNCQUFzQixHQUFHLE9BQU8sRUFDaEMsWUFBWSxHQUFHLG9EQUFvRCxFQUNuRSxZQUFZO1FBQ1Ysa0VBQWtFLEVBQ3BFLGVBQWUsQ0FDaEIsQ0FBQztBQUNKLENBQUM7QUFFRCxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksSUFBUyxFQUNYLE1BQVcsRUFDWCxLQUFVLEVBQ1YsWUFBaUIsRUFDakIsTUFBVyxFQUNYLGlCQUFzQixFQUN0QixLQUFVLEVBQ1YsS0FBVSxFQUNWLFVBQWUsRUFDZixNQUFXLENBQUM7QUFFZCxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVsRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxJQUFJLFlBQVksR0FBaUI7UUFDL0IsYUFBYSxFQUFFLFVBQVU7S0FDMUIsQ0FBQztJQUVGLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0lBRTVDLElBQ0UsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksYUFBYTtRQUMzQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxhQUFhO1FBQzNDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWE7UUFDM0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksYUFBYTtRQUMzQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxhQUFhO1FBQzNDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWE7UUFDM0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksYUFBYTtRQUMzQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxhQUFhO1FBQzNDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWE7UUFDM0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksYUFBYTtRQUMzQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxhQUFhO1FBQzNDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWE7UUFDM0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksYUFBYTtRQUMzQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxhQUFhO1FBQzNDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWE7UUFDM0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksYUFBYTtRQUMzQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxhQUFhO1FBQzNDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWE7UUFDM0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksYUFBYTtRQUMzQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxhQUFhO1FBQzNDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWE7UUFDM0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksYUFBYTtRQUMzQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxhQUFhO1FBQzNDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWE7UUFDM0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksYUFBYSxFQUMzQztRQUNBLFlBQVksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDO1FBQ3JDLFlBQVksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO1FBRWpDLE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQztRQUVsQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO1NBQU0sSUFDTCxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxhQUFhO1FBQzNDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWE7UUFDM0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksYUFBYTtRQUMzQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxhQUFhO1FBQzNDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWE7UUFDM0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksYUFBYTtRQUMzQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxhQUFhO1FBQzNDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWE7UUFDM0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksYUFBYTtRQUMzQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxhQUFhO1FBQzNDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWE7UUFDM0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksYUFBYTtRQUMzQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxh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