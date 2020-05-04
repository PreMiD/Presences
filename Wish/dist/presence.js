var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var presence = new Presence({
    clientId: "633005889619755038"
});
presence.on("UpdateData", function () { return __awaiter(_this, void 0, void 0, function () {
    var presenceData, itemsetting, languagesetting, itemsite;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                presenceData = {
                    largeImageKey: "logo"
                };
                return [4 /*yield*/, presence.getSetting("items")];
            case 1:
                itemsetting = _a.sent();
                return [4 /*yield*/, presence.getSetting("language")];
            case 2:
                languagesetting = _a.sent();
                itemsite = null;
                // _________________________________________________________________________________________________________________________ Product item
                if (document.querySelector("#related-products-scroll-container > div") == null) { // Ask for item-site
                    itemsite = false;
                }
                else {
                    itemsite = true;
                }
                if (itemsetting == true && itemsite == true) { // Ask for Settings
                    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    //  ⬇ Important - Wish like to change this JS path ⬇
                    itemdesc = document.querySelector("#related-products-scroll-container > div > div > div.ProductContainer__ProductMainSection-sc-1vbd28u-1.dXQSMR > div.ProductContainer__RightColumn-sc-1vbd28u-3.cgensx > div > div.PurchaseContainer__UpperWrapper-sc-1qlezk8-1.gwTXit > h1").innerText;
                    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
                // ___________________________________________________________________________________________________________________________  
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
                    nameuser = document.querySelector("#react-app > div > div.TabBarWrapper__Wrapper-sc-1p5ocnd-0.wZbPl > div.FlexScrollContainer__FlexGrandparent-o9gi86-0.jXFTEW > div > div > div.NavPanel__Wrapper-sc-1uxerbb-0.kFfmiE > div.NavPanel__Name-sc-1uxerbb-1.kHdhxC").innerText;
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
                    wishlist = document.querySelector("#react-app > div > div.TabBarWrapper__Wrapper-sc-1p5ocnd-0.fjpSHM > div.TabBarWrapper__MainRowContainer-sc-1p5ocnd-1.idAkGy > div.Feed__FeedWrapper-sc-10q7yh-0.fiGIea > div.Feed__FeedHeader-sc-10q7yh-1.gOYbXb > h1").innerText;
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
                    code = document.querySelector("#react-app > div > div.TabBarWrapper__Wrapper-sc-1p5ocnd-0.wZbPl > div.ReferralPage__MainWrapper-zs6pzr-0.bDMHGd > div.ReferralPage__ContentWrapper-zs6pzr-2.cHgkEg > div.ReferralPage__CodeSectionWrapper-zs6pzr-8.eOMTZS > div.ReferralPage__CodeBoxWrapper-zs6pzr-10.eoklod > div.ReferralPage__CodeBox-zs6pzr-14.bupEiO").innerText;
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
                    name2 = document.querySelector("#react-app > div > div.TabBarWrapper__Wrapper-sc-1p5ocnd-0.wZbPl > div.FlexScrollContainer__FlexGrandparent-o9gi86-0.jXFTEW > div > div > div.NavPanel__Wrapper-sc-1uxerbb-0.kFfmiE > div.NavPanel__Name-sc-1uxerbb-1.kHdhxC").innerText;
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
                    shop = document.querySelector("#react-app > div > div.TabBarWrapper__Wrapper-sc-1p5ocnd-0.fjpSHM > div.TabBarWrapper__MainRowContainer-sc-1p5ocnd-1.idAkGy > div.MerchantPage__Wrapper-sc-1nxlnue-0.doABiZ > div.MerchantPage__HeaderWrapper-sc-1nxlnue-1.gYkbZT > div > div > h1").innerText;
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
                    if (document.location.pathname == "/tabbed_feed_latest/" &&
                        document.location.pathname.includes("/product/")) {
                        product = document.querySelector("#react-app > div > div.modal-root.BaseModal__ModalContainer-sc-188teto-4.bFHXBY > div > div > div > div > div.ProductContainer__ProductMainSection-sc-1vbd28u-1.fYThRf > div.ProductContainer__RightColumn-sc-1vbd28u-3.ewTgOn > div > div.PurchaseContainer__UpperWrapper-sc-1qlezk8-1.jEnuPa > h1").innerText;
                        presenceData.details = "Viewing product";
                        presenceData.state = itemdesc;
                        presence.setActivity(presenceData);
                    }
                    // ----------------------------------------------------------
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
                    if (document.location.pathname == "/pickup__tab/" &&
                        document.location.pathname.includes("/product/")) {
                        presenceData.details = "Viewing product";
                        presenceData.state = itemdesc;
                        presence.setActivity(presenceData);
                    }
                    // -------------------------------------------------------------
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
                    if (document.location.pathname == "/blitz_buy__tab/" &&
                        document.location.pathname.includes("/product/")) {
                        presenceData.details = "Viewing product";
                        presenceData.state = itemdesc;
                        presence.setActivity(presenceData);
                    }
                    //---------------------------------------------------------------
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
                    if (document.location.pathname == "/express__tab/" &&
                        document.location.pathname.includes("/product/")) {
                        presenceData.details = "Viewing product";
                        presenceData.state = itemdesc;
                        presence.setActivity(presenceData);
                    }
                    //------------------------------------------------------------------
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
                    if (document.location.pathname == "/recently_viewed__tab/" &&
                        document.location.pathname.includes("/product/")) {
                        presenceData.details = "Viewing product";
                        presenceData.state = itemdesc;
                        presence.setActivity(presenceData);
                    }
                    //--------------------------------------------------------------
                }
                else if (document.location.pathname.includes("/feed/tag_")) {
                    tag = document.querySelector("#react-app > div > div.TabBarWrapper__Wrapper-sc-1p5ocnd-0.fjpSHM > div.TabBar__Wrapper-sc-1vadptt-0.bTjdiW > div > div > div > h1").innerText;
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
                        product = document.querySelector("#react-app > div > div.modal-root.BaseModal__ModalContainer-sc-188teto-4.bFHXBY > div > div > div > div > div.ProductContainer__ProductMainSection-sc-1vbd28u-1.fYThRf > div.ProductContainer__RightColumn-sc-1vbd28u-3.ewTgOn > div > div.PurchaseContainer__UpperWrapper-sc-1qlezk8-1.jEnuPa > h1").innerText;
                        presenceData.details = "Viewing product";
                        presenceData.state = itemdesc;
                        presence.setActivity(presenceData);
                    }
                }
                else {
                    presence.setActivity();
                }
                return [2 /*return*/];
        }
    });
}); });
