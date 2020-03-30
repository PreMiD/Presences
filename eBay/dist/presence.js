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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFlBQVksR0FBRyxtREFBbUQsQ0FBQztBQUV2RSxTQUFTLFFBQVEsQ0FBQyxPQUFPO0lBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQ1YsbUJBQW1CLEdBQUcsT0FBTyxFQUM3QixZQUFZLEdBQUcsb0RBQW9ELEVBQ25FLFlBQVksR0FBRyxvREFBb0QsRUFDbkUsZUFBZSxDQUNmLENBQUM7QUFDSCxDQUFDO0FBRUQsU0FBUyxTQUFTLENBQUMsT0FBTztJQUN6QixPQUFPLENBQUMsR0FBRyxDQUNWLG9CQUFvQixHQUFHLE9BQU8sRUFDOUIsWUFBWSxHQUFHLG9EQUFvRCxFQUNuRSxZQUFZLEdBQUcsb0RBQW9ELEVBQ25FLGVBQWUsQ0FDZixDQUFDO0FBQ0gsQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLE9BQU87SUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FDVixzQkFBc0IsR0FBRyxPQUFPLEVBQ2hDLFlBQVksR0FBRyxvREFBb0QsRUFDbkUsWUFBWTtRQUNYLGtFQUFrRSxFQUNuRSxlQUFlLENBQ2YsQ0FBQztBQUNILENBQUM7QUFFRCxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksSUFBUyxFQUNaLE1BQVcsRUFDWCxLQUFVLEVBQ1YsWUFBaUIsRUFDakIsTUFBVyxFQUNYLGlCQUFzQixFQUN0QixLQUFVLEVBQ1YsS0FBVSxFQUNWLFVBQWUsRUFDZixNQUFXLENBQUM7QUFFYixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVsRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxJQUFJLFlBQVksR0FBaUI7UUFDaEMsYUFBYSxFQUFFLFVBQVU7S0FDekIsQ0FBQztJQUVGLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0lBRTVDLElBQ0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksYUFBYTtRQUMzQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxhQUFhO1FBQzNDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWE7UUFDM0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksYUFBYTtRQUMzQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxhQUFhO1FBQzNDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWE7UUFDM0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksYUFBYTtRQUMzQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxhQUFhO1FBQzNDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWE7UUFDM0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksYUFBYTtRQUMzQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxhQUFhO1FBQzNDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWE7UUFDM0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksYUFBYTtRQUMzQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxhQUFhO1FBQzNDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWE7UUFDM0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksYUFBYTtRQUMzQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxhQUFhO1FBQzNDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWE7UUFDM0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksYUFBYTtRQUMzQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxhQUFhO1FBQzNDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWE7UUFDM0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksYUFBYTtRQUMzQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxhQUFhO1FBQzNDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWE7UUFDM0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksYUFBYSxFQUMxQztRQUNELFlBQVksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDO1FBQ3JDLFlBQVksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO1FBRWpDLE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQztRQUVsQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ25DO1NBQU0sSUFDTixRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxhQUFhO1FBQzNDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWE7UUFDM0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksYUFBYTtRQUMzQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxhQUFhO1FBQzNDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWE7UUFDM0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksYUFBYTtRQUMzQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxhQUFhO1FBQzNDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWE7UUFDM0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksYUFBYTtRQUMzQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxhQUFhO1FBQzNDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWE7UUFDM0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksYUFBYTtRQUMzQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxhQUFh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