//import { write } from "fs";

console.log("Starting Wish-Presence");
console.log(document);

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "633005889619755038",
    
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var title, views, air, air2, title2;
var iFrameVideo, currentTime, duration, paused;
var video, videoDuration, videoCurrentTime;
var lastPlaybackState = null;
var playback;
var browsingStamp = Math.floor(Date.now() / 1000);
if (lastPlaybackState != playback) {
    lastPlaybackState = playback;
    browsingStamp = Math.floor(Date.now() / 1000);
}

presence.on("iFrameData", data => {
    playback =
        data.iframe_video.duration !== null
            ? true : false;
    if (playback) {
        iFrameVideo = data.iframe_video.iFrameVideo;
        currentTime = data.iframe_video.currTime;
        duration = data.iframe_video.dur;
        paused = data.iframe_video.paused;
    }
});

presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    var a = presenceData = '', presenceData = {
        largeImageKey: "logo"            
    };

   if (document.location.pathname == "/"){
      presenceData.details = "Browsing in mainpage...";
      presence.setActivity(presenceData);

   } else if (document.location.pathname =="/wishlist"){
    nameuser = document.querySelector("#react-app > div > div.TabBarWrapper__Wrapper-sc-1p5ocnd-0.wZbPl > div.FlexScrollContainer__FlexGrandparent-o9gi86-0.jXFTEW > div > div > div.NavPanel__Wrapper-sc-1uxerbb-0.kFfmiE > div.NavPanel__Name-sc-1uxerbb-1.kHdhxC").innerText;    
    presenceData.details = "Browsing thought Wishlist";
    presenceData.state = nameuser + "'s Wishlist";
    presence.setActivity(presenceData);
  
   } else if (document.location.pathname.includes ("/wishlist/")){
    wishlist =document.querySelector("#react-app > div > div.TabBarWrapper__Wrapper-sc-1p5ocnd-0.wZbPl > div.TabBarWrapper__MainRowContainer-sc-1p5ocnd-1.eKttIh > div > div.Feed__FeedHeader-sc-10q7yh-1.gOYbXb > h1").innerText;    
    presenceData.details = "Browsing thought Wishlist";
    presenceData.state = wishlist;
    presence.setActivity(presenceData);

   } else if (document.location.pathname.includes("/product/")){
    product = document.querySelector("#react-app > div > div.modal-root.BaseModal__ModalContainer-sc-188teto-4.bFHXBY > div > div > div > div > div.ProductContainer__ProductMainSection-sc-1vbd28u-1.fYThRf > div.ProductContainer__RightColumn-sc-1vbd28u-3.ewTgOn > div > div.PurchaseContainer__UpperWrapper-sc-1qlezk8-1.jEnuPa > h1").innerText;    
    presenceData.details = "Viewing product";
    presenceData.state = product;
    presence.setActivity(presenceData);

   } else if (document.location.pathname == "/cart"){
    presenceData.details = "Viewing cart...";
    presenceData.state = "Someone have Promocodes?";
    presence.setActivity(presenceData);

   } else if (document.location.pathname == "/notifications"){
    presenceData.details = "Looking for Notifications";
    presenceData.state = "Many deals today owo";
    presence.setActivity(presenceData);

   }else if (document.location.pathname == "/refer"){
    presenceData.details = "Looking for new Customers";
    code = document.querySelector("#react-app > div > div.TabBarWrapper__Wrapper-sc-1p5ocnd-0.wZbPl > div.ReferralPage__MainWrapper-zs6pzr-0.bDMHGd > div.ReferralPage__ContentWrapper-zs6pzr-2.cHgkEg > div.ReferralPage__CodeSectionWrapper-zs6pzr-8.ebqrAL > div.ReferralPage__CodeBoxWrapper-zs6pzr-10.eoklod > div.ReferralPage__CodeBox-zs6pzr-14.bupEiO").innerText;
    presenceData.state = "50% discount > Code: " + code;
    presence.setActivity(presenceData);

   }else if (document.location.pathname.includes("/transaction/")){
    presenceData.details = "Viewing transactions...";
    presenceData.state = "Waiting for a product";
    presence.setActivity(presenceData);

   }else if (document.location.pathname == "/profile"){
    name2 = document.querySelector("#react-app > div > div.TabBarWrapper__Wrapper-sc-1p5ocnd-0.wZbPl > div.FlexScrollContainer__FlexGrandparent-o9gi86-0.jXFTEW > div > div > div.NavPanel__Wrapper-sc-1uxerbb-0.kFfmiE > div.NavPanel__Name-sc-1uxerbb-1.kHdhxC").innerText;
    presenceData.details = "Viewing profile";
    presenceData.state = name2;
    presence.setActivity(presenceData);

   }else if (document.location.pathname.includes("/merchant/")){
    shop = document.querySelector("#react-app > div > div.TabBarWrapper__Wrapper-sc-1p5ocnd-0.fjpSHM > div.TabBarWrapper__MainRowContainer-sc-1p5ocnd-1.eKttIh > div.MerchantPage__Wrapper-sc-1nxlnue-0.bpUbAm > div.MerchantPage__HeaderWrapper-sc-1nxlnue-1.gYkbZT > div > div > h1").innerText;
    presenceData.details = "Viewing shop";
    presenceData.state = shop;
    presence.setActivity(presenceData);

   } else if (document.location.pathname == "/feed/tabbed_feed_latest"){
    presenceData.details = "Viewing popular Feed...";
    presence.setActivity(presenceData);
    if (document.location.pathname == "/tabbed_feed_latest/" && document.location.pathname.includes("/product/")){
        product = document.querySelector("#react-app > div > div.modal-root.BaseModal__ModalContainer-sc-188teto-4.bFHXBY > div > div > div > div > div.ProductContainer__ProductMainSection-sc-1vbd28u-1.fYThRf > div.ProductContainer__RightColumn-sc-1vbd28u-3.ewTgOn > div > div.PurchaseContainer__UpperWrapper-sc-1qlezk8-1.jEnuPa > h1").innerText;    
        presenceData.details = "Viewing product";
        presenceData.state = product;
        presence.setActivity(presenceData);
    
       }
 
   }else if (document.location.pathname == "/feed/pickup__tab"){
    presenceData.details = "Viewing local Feed...";
    presence.setActivity(presenceData);
    if (document.location.pathname == "/pickup__tab/" && document.location.pathname.includes("/product/")){
        product = document.querySelector("#react-app > div > div.modal-root.BaseModal__ModalContainer-sc-188teto-4.bFHXBY > div > div > div > div > div.ProductContainer__ProductMainSection-sc-1vbd28u-1.fYThRf > div.ProductContainer__RightColumn-sc-1vbd28u-3.ewTgOn > div > div.PurchaseContainer__UpperWrapper-sc-1qlezk8-1.jEnuPa > h1").innerText;    
        presenceData.details = "Viewing product";
        presenceData.state = product;
        presence.setActivity(presenceData);
    
       }
 
   }else if (document.location.pathname == "/feed/blitz_buy__tab"){
    presenceData.details = "Wheel of Fortune";
    presenceData.state = "Try your Luck!"
    presence.setActivity(presenceData);
    if (document.location.pathname == "/blitz_buy__tab/" && document.location.pathname.includes("/product/")){
        product = document.querySelector("#react-app > div > div.modal-root.BaseModal__ModalContainer-sc-188teto-4.bFHXBY > div > div > div > div > div.ProductContainer__ProductMainSection-sc-1vbd28u-1.fYThRf > div.ProductContainer__RightColumn-sc-1vbd28u-3.ewTgOn > div > div.PurchaseContainer__UpperWrapper-sc-1qlezk8-1.jEnuPa > h1").innerText;    
        presenceData.details = "Viewing product";
        presenceData.state = product;
        presence.setActivity(presenceData);
    
       }
 
   }else if (document.location.pathname == "/feed/express__tab"){
    presenceData.details = "Viewing express Feed...";
    presence.setActivity(presenceData);
    if (document.location.pathname == "/express__tab/" && document.location.pathname.includes("/product/")){
        product = document.querySelector("#react-app > div > div.modal-root.BaseModal__ModalContainer-sc-188teto-4.bFHXBY > div > div > div > div > div.ProductContainer__ProductMainSection-sc-1vbd28u-1.fYThRf > div.ProductContainer__RightColumn-sc-1vbd28u-3.ewTgOn > div > div.PurchaseContainer__UpperWrapper-sc-1qlezk8-1.jEnuPa > h1").innerText;    
        presenceData.details = "Viewing product";
        presenceData.state = product;
        presence.setActivity(presenceData);
    
       }
 
   }else if (document.location.pathname == "/feed/recently_viewed__tab"){
    presenceData.details = "Look at";
    presenceData.state = "recently seen products"
    presence.setActivity(presenceData);
    if (document.location.pathname == "/recently_viewed__tab/" && document.location.pathname.includes("/product/")){
        product = document.querySelector("#react-app > div > div.modal-root.BaseModal__ModalContainer-sc-188teto-4.bFHXBY > div > div > div > div > div.ProductContainer__ProductMainSection-sc-1vbd28u-1.fYThRf > div.ProductContainer__RightColumn-sc-1vbd28u-3.ewTgOn > div > div.PurchaseContainer__UpperWrapper-sc-1qlezk8-1.jEnuPa > h1").innerText;    
        presenceData.details = "Viewing product";
        presenceData.state = product;
        presence.setActivity(presenceData);
    
       }
 
   }else if (document.location.pathname.includes ("/feed/tag")){
    tag = document.querySelector("#react-app > div > div.TabBarWrapper__Wrapper-sc-1p5ocnd-0.wZbPl > div.TabBar__Wrapper-sc-1vadptt-0.bTjdiW > div.TabBar__MainWrapper-sc-1vadptt-1.prcJ > div > div > h1").innerText;
    presenceData.details = "Viewing for";
    presenceData.state = tag;
    presence.setActivity(presenceData);
    if (document.location.pathname.includes("/product/")){
        product = document.querySelector("#react-app > div > div.modal-root.BaseModal__ModalContainer-sc-188teto-4.bFHXBY > div > div > div > div > div.ProductContainer__ProductMainSection-sc-1vbd28u-1.fYThRf > div.ProductContainer__RightColumn-sc-1vbd28u-3.ewTgOn > div > div.PurchaseContainer__UpperWrapper-sc-1qlezk8-1.jEnuPa > h1").innerText;    
        presenceData.details = "Viewing product";
        presenceData.state = product;
        presence.setActivity(presenceData);
    
       }
 
   }
        //presenceData.state = "Lurking on LautFM"; break;
        //default : presenceData.state = "ZZzzzZZ"; 
        ////
        //playingnow = document.querySelector("#app > div.fixed.fixed--top > div > a > div > div > span > b").innerText;
        //presenceData.details = "Playing " + playingnow;
        //music = document.querySelector("#app > div.fixed.fixed--top > div > a > div > div > div").innerText;
        //presenceData.state = music;
       // break; 
        ////  

    presence.setActivity(presenceData);
}));

/**
 
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    console.log("starting lautfm");
    var a = '', presenceData = {
        largeImageKey: "logo"
        //  if (document.querySelector("#app > div.fixed.fixed--top > div > div.fm-player__btn-container > button:nth-child(2)").className !== "btn playbutton fm-player__btnfm-player__btn--stop playbutton--play)") {
            
    };
    presenceData.startTimestamp = browsingStamp;
    video = document.querySelector("#app > div.fixed.fixed--top > div > div.fm-player__btn-container > button.btn.playbutton.fm-player__btn.fm-player__btn--stop.playbutton--playing");
    if (document.querySelector("#app > div.fixed.fixed--top > div > div.fm-player__btn-container > button.btn.playbutton.fm-player__btn.fm-player__btn--stop.playbutton--playing").className == "btn playbutton fm-player__btn fm-player__btn--stop playbutton--play") {
        
        presence.details = "Its a Test toast";
        presence.setActivity(presenceData);
        
    }
    else if (document.location.pathname == "/") {
        playingnow = document.querySelector("#app > div.fixed.fixed--top > div > a > div > div > span > b").innerText;
        presenceData.details = "Hört " + playingnow;
        music = document.querySelector("#app > div.fixed.fixed--top > div > a > div > div > div > span.player-display__meta.player-display__meta--title").innerText
        presenceData.state = music;
         presence.setActivity(presenceData);
           
    } 
    else if (document.location.pathname.includes("/dashboard")) {
        presenceData.details = "Reading something in";
        presenceData.state = "Dashboard";
        presence.setActivity(presenceData);
       
    } 
    else if (document.location.pathname.includes("/premium")) {
    presenceData.details = "Think about";
    presenceData.state = "Premium";
    presence.setActivity(presenceData);
   
    } 
    else if (document.location.pathname.includes("/login")) {
        username1 = document.querySelector("#username");
    presenceData.details = "Log In";
    presenceData.state = username1.value;
    presence.setActivity(presenceData);
   
    } 
    else if (document.location.pathname.includes("/register")) {
        username2 = document.querySelector("#username");
    presenceData.details = "Sign Up";
    presenceData.state = "Maybe as " + username2.value;
    presence.setActivity(presenceData);
   
    } 

    else if (document.location.pathname.includes ("/servers/")) {
        tab1 = document.querySelector("#search");
            presenceData.details = "Search a Server";
            presenceData.state = tab1.value;
            presence.setActivity(presenceData);
         
    } 
    else if (document.location.pathname.includes("/server/")) {
        tab1SN = document.querySelector("#main > div.mb-4.mt-5.row > div:nth-child(1) > a > span");
            presenceData.details = "Watching a Server";
            presenceData.state = tab1SN.innerText;
            presence.setActivity(presenceData);
         
    }
    
        
     
));


 */

function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
function refresh(presence) {
    refresh.refresh;
}