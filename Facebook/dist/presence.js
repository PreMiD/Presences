var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "631803867708915732",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var title;
var typing;
var replace;
var search;
var live;
var video, videoDuration, videoCurrentTime, videoPaused, timestamps;
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "facebook"
    };
    if (document.location.pathname.includes("/messages/")) {
        if (document.location.pathname.includes("/videocall/")) {
            presenceData.largeImageKey = "messenger";
            presenceData.startTimestamp = browsingStamp;
            user = document.querySelector("#u_0_0 > div.r30xiam5.m0q0jmkx.alrytcbg.hp5uecnq.g2121wdl > div > div:nth-child(5) > div > div > div > div > div.prklkq8o.t7elcel3.sd0tyowg.ocjcko58.p3f4w9ai.f5zavhip.foed1vyy > div > div > div.ocjcko58.foed1vyy > div > p");
            if (user == null || user.innerText == null) {
                user = "user not found.";
                presenceData.details = "In videocall with someone";
                presenceData.smallImageKey = "videocall";
            }
            else {
                user = user.innerText;
                presenceData.details = "In call with someone";
                presenceData.smallImageKey = "call";
            }
            presenceData.state = "(Hidden until presence settings.)";
        }
        else if (document.location.pathname.includes("/t/")) {
            presenceData.largeImageKey = "messenger";
            presenceData.startTimestamp = browsingStamp;
            user = document.querySelector('._3oh-');
            typing = document.querySelector("body > div > div > div > div:nth-child(2) > span > div._20bp > div._4_j4 > div._4rv3._7og6 > div > div._7kpk > div > div > div:nth-child(1) > div > div > div > div > div > div > span > span");
            if (typing == null) {
                presenceData.details = "Reading messages from:";
                presenceData.smallImageKey = "reading";
            }
            else {
                presenceData.details = "Writing to:";
                presenceData.smallImageKey = "writing";
            }
            presenceData.state = "(Hidden until presence settings.)";
        }
        else if (document.location.pathname.includes("/new")) {
            presenceData.largeImageKey = "messenger";
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Composing a new message";
            presenceData.smallImageKey = "writing";
        }
        else if (document.location.pathname.includes("/about")) {
            presenceData.largeImageKey = "messenger";
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing the about page";
        }
    }
    else if (document.querySelector("#seo_h1_tag > a > span") !== null || document.querySelector("#fb-timeline-cover-name > a") !== null) {
        user = document.querySelector("#seo_h1_tag > a > span");
        if (user == null) {
            user = document.querySelector("#fb-timeline-cover-name > a");
        }
        video = document.querySelector("body > div > div:nth-child(8) > div:nth-child(2) > div > div > div > div > div > div > div > div > div > video");
        if (document.querySelector("#fbPhotoSnowliftAuthorName > a") !== null) {
            title = document.querySelector("#fbPhotoSnowliftAuthorName > a");
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing photo by user:";
            presenceData.state = user.innerText;
        }
        else if (video !== null) {
            title = document.querySelector("body > div:nth-child(2) > div:nth-child(8) > div:nth-child(2) > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div > div > span > span");
            if (title == null) {
                title = document.querySelector("body > div:nth-child(2) > div:nth-child(8) > div:nth-child(2) > div > div > div > div > div:nth-child(3) > div:nth-child(2) > div > div > div > div > div > span > span");
            }
            videoCurrentTime = video.currentTime;
            videoDuration = video.duration;
            videoPaused = video.paused;
            timestamps = getTimestamps(Math.floor(videoCurrentTime), Math.floor(videoDuration));
            presenceData.smallImageKey = videoPaused ? "pause" : "play";
            presenceData.smallImageText = videoPaused ? (yield strings).pause : (yield strings).play;
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
            if (title.innerText.length > 128) {
                presenceData.state = title.innerText.substring(0, 125) + "...";
            }
            else {
                presenceData.state = title.innerText;
            }
            presenceData.state = user.innerText;
            if (videoPaused) {
                delete presenceData.startTimestamp;
                delete presenceData.endTimestamp;
            }
        }
        else if (document.location.pathname.includes("/videos")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing video's by user:";
            presenceData.state = user.innerText;
        }
        else if (document.location.pathname.includes("/friends")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing friends of user:";
            presenceData.state = user.innerText;
        }
        else if (document.location.pathname.includes("/shop")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing shop by user:";
            presenceData.state = user.innerText;
        }
        else if (document.location.pathname.includes("/posts")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing posts by user:";
            presenceData.state = user.innerText;
        }
        else if (document.location.pathname.includes("/photos")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing photos by user:";
            presenceData.state = user.innerText;
        }
        else if (document.location.pathname.includes("/community")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing community of:";
            presenceData.state = user.innerText;
        }
        else if (document.location.pathname.includes("/about")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Reading about user:";
            presenceData.state = user.innerText;
            presenceData.smallImageKey = "reading";
        }
        else {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing user:";
            presenceData.state = user.innerText;
        }
    }
    else if (document.location.pathname.includes("/videos/")) {
        video = document.querySelector("body > div > div:nth-child(8) > div:nth-child(2) > div > div > div > div > div > div > div > video");
        user = document.querySelector("body > div:nth-child(2) > div:nth-child(8) > div:nth-child(2) > div > div > div > div > div:nth-child(3) > div:nth-child(2) > div > div > div:nth-child(2) > span > a");
        if (user == null) {
            user = document.querySelector("body > div:nth-child(2) > div:nth-child(8) > div:nth-child(2) > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(2) > span > a");
        }
        if (user == null) {
            user = document.querySelector("body > div:nth-child(2) > div:nth-child(6) > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div:nth-child(4) > form > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div:nth-child(2) > h5 > span > span > span > a");
        }
        if (user == null) {
            user = document.querySelector("body > div:nth-child(2) > div:nth-child(6) > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div:nth-child(4) > form > div > div > div > div > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div:nth-child(2) > h5 > span > span > span > a");
        }
        if (user == null) {
            user = document.querySelector('.profileLink');
        }
        title = document.querySelector("body > div:nth-child(2) > div:nth-child(8) > div:nth-child(2) > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div > div > span > span");
        if (title == null) {
            title = document.querySelector("body > div:nth-child(2) > div:nth-child(8) > div:nth-child(2) > div > div > div > div > div:nth-child(3) > div:nth-child(2) > div > div > div > div > div > span > span");
        }
        if (title == null) {
            title = document.querySelector("body > div:nth-child(2) > div:nth-child(6) > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div:nth-child(4) > form > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div");
        }
        if (title == null) {
            title = document.querySelector("body > div:nth-child(2) > div:nth-child(6) > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div:nth-child(4) > form > div > div > div > div > div");
        }
        if (title == null) {
            title = document.querySelector("#u_2_d > div._1rgv > div._1rgw");
        }
        if (title == null) {
            title = document.querySelector('._1rgw');
        }
        if (video == null) {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
            presenceData.smallImageKey = "live";
            presenceData.smallImageText = "live";
            if (title.innerText.length > 128) {
                presenceData.details = title.innerText.substring(0, 125) + "...";
            }
            else {
                presenceData.details = title.innerText;
            }
            presenceData.state = user.innerText;
        }
        else {
            videoCurrentTime = video.currentTime;
            videoDuration = video.duration;
            videoPaused = video.paused;
            timestamps = getTimestamps(Math.floor(videoCurrentTime), Math.floor(videoDuration));
            presenceData.smallImageKey = videoPaused ? "pause" : "play";
            presenceData.smallImageText = videoPaused ? (yield strings).pause : (yield strings).play;
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
            if (title.innerText.length > 128) {
                presenceData.details = title.innerText.substring(0, 125) + "...";
            }
            else {
                presenceData.details = title.innerText;
            }
            presenceData.state = user.innerText;
            if (videoPaused) {
                delete presenceData.startTimestamp;
                delete presenceData.endTimestamp;
            }
        }
    }
    else if (document.location.pathname.includes("/watch/")) {
        search = document.querySelector('.inputtext');
        video = document.querySelector("body > div > div:nth-child(3) > div > div > div:nth-child(2) > div > div > div > div > div > div:nth-child(2) > div > div > div > video");
        if (video !== null) {
            user = document.querySelector("#content > div > div:nth-child(2) > div > div > div > div > div > div > div > div > div:nth-child(2) > div > div > a");
            title = document.querySelector("#content > div > div:nth-child(2) > div > div > div > div > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div");
            videoCurrentTime = video.currentTime;
            videoDuration = video.duration;
            videoPaused = video.paused;
            timestamps = getTimestamps(Math.floor(videoCurrentTime), Math.floor(videoDuration));
            presenceData.smallImageKey = videoPaused ? "pause" : "play";
            presenceData.smallImageText = videoPaused ? (yield strings).pause : (yield strings).play;
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
            if (title.innerText.length > 128) {
                presenceData.details = title.innerText.substring(0, 125) + "...";
            }
            else {
                presenceData.details = title.innerText;
            }
            presenceData.state = user.innerText;
            if (videoPaused) {
                delete presenceData.startTimestamp;
                delete presenceData.endTimestamp;
                delete presenceData.smallImageKey;
                delete presenceData.smallImageText;
                presenceData.details = "Browsing through";
                presenceData.state = "Facebook Watch";
                presenceData.startTimestamp = browsingStamp;
            }
        }
        else if (search.value !== null && search.value.length >= 2) {
            presenceData.smallImageKey = "search";
            presenceData.details = "Watch - Searching for:";
            presenceData.state = search.value;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/latest")) {
            presenceData.details = "Watch - Viewing:";
            presenceData.state = "Recently added";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/saved")) {
            presenceData.details = "Watch - Viewing:";
            presenceData.state = "Saved videos";
            presenceData.startTimestamp = browsingStamp;
        }
        else {
            presenceData.details = "Browsing through";
            presenceData.state = "Facebook Watch";
            presenceData.startTimestamp = browsingStamp;
        }
    }
    else if (document.location.pathname.includes("/marketplace/")) {
        presenceData.startTimestamp = browsingStamp;
        if (document.location.pathname.includes("/search/")) {
            search = document.querySelector("#content > div > div > div:nth-child(2) > div > div > div:nth-child(4) > div > div > span > span > label > input");
            presenceData.smallImageKey = "search";
            if (search.value.length >= 2) {
                presenceData.details = "Marketplace - Searching for:";
                presenceData.state = search.value;
            }
            else {
                presenceData.details = "Marketplace - Going to";
                presenceData.state = "search something up";
            }
        }
        else if (document.location.pathname.includes("/item/")) {
            presenceData.details = "Marketplace - Viewing item:";
            title = document.querySelector("#marketplace-modal-dialog-title > span");
            if (title.innerText.length > 128) {
                presenceData.state = title.innerText.substring(0, 125) + "...";
            }
            else {
                presenceData.state = title.innerText;
            }
        }
        else if (document.location.pathname.includes("/groups/")) {
            presenceData.details = "Marketplace - Viewing groups";
        }
        else if (document.location.pathname.includes("/stores/")) {
            presenceData.details = "Marketplace - Viewing stores";
        }
        else if (document.location.pathname.includes("/buying/")) {
            presenceData.details = "Marketplace - Viewing buying";
        }
        else if (document.location.pathname.includes("/selling/")) {
            presenceData.details = "Marketplace - Viewing selling";
        }
        else if (document.location.pathname.includes("/saved/")) {
            presenceData.details = "Marketplace - Viewing saved";
        }
        else {
            presenceData.details = "Marketplace - Browsing...";
        }
    }
    else if (document.location.pathname.includes("/groups/")) {
        presenceData.startTimestamp = browsingStamp;
        replace = document.location.pathname.split("/");
        if (replace[2] !== undefined && replace[2] !== "") {
            title = document.querySelector("#seo_h1_tag > a");
            presenceData.details = "Groups - Viewing:";
            if (title.innerText.length > 128) {
                presenceData.state = title.innerText.substring(0, 125) + "...";
            }
            else {
                presenceData.state = title.innerText;
            }
        }
        else {
            presenceData.details = "Groups - Browsing...";
        }
    }
    else if (document.location.pathname.includes("/groups_browse/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Groups - Browsing category:";
        title = document.querySelector("#content > div > div > div:nth-child(3) > div > div:nth-child(3) > span");
        if (title.innerText.length > 128) {
            presenceData.state = title.innerText.substring(0, 125) + "...";
        }
        else {
            presenceData.state = title.innerText;
        }
    }
    else if (document.location.pathname.includes("/pages/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Pages - Browsing...";
    }
    else if (document.location.pathname.includes("/oculus/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "oculus - Browsing...";
    }
    else if (document.location.pathname.includes("/events/")) {
        presenceData.startTimestamp = browsingStamp;
        replace = document.location.pathname.split("/");
        if (replace[2] !== undefined && replace[2] !== "") {
            title = document.querySelector("#seo_h1_tag");
            presenceData.details = "Events - Viewing:";
            if (title.innerText.length > 128) {
                presenceData.state = title.innerText.substring(0, 125) + "...";
            }
            else {
                presenceData.state = title.innerText;
            }
        }
        else if (document.location.pathname.includes("/calendar/")) {
            presenceData.details = "Events - Viewing calendar";
        }
        else if (document.location.pathname.includes("/birthdays/")) {
            presenceData.details = "Events - Viewing birthdays";
        }
        else if (document.location.pathname.includes("/discovery/")) {
            presenceData.details = "Events - Viewing discovery";
        }
        else if (document.location.pathname.includes("/hosting/")) {
            presenceData.details = "Events - Viewing hosting";
        }
        else {
            presenceData.details = "Events - Browsing...";
        }
    }
    else if (document.location.pathname.includes("/fundraisers/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Fundraisers - Browsing...";
    }
    else if (document.location.pathname.includes("/donate/")) {
        presenceData.startTimestamp = browsingStamp;
        title = document.querySelector("#info_section > div.clearfix > div > div > div:nth-child(2) > div > h1");
        presenceData.details = "Fundraisers - Viewing:";
        if (title.innerText.length > 128) {
            presenceData.state = title.innerText.substring(0, 125) + "...";
        }
        else {
            presenceData.state = title.innerText;
        }
    }
    else if (document.location.pathname.includes("/games/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Games - Browsing...";
    }
    else if (document.location.pathname.includes("/gaming/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Gaming - Browsing...";
    }
    else if (document.location.pathname.includes("/salegroups/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "SaleGroups - Browsing...";
    }
    else if (document.location.pathname.includes("/jobs/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Jobs - Browsing...";
    }
    else if (document.location.pathname.includes("/ads/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Ads - Browsing...";
    }
    else if (document.location.pathname.includes("/weather/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing todays weather";
    }
    else if (document.location.pathname.includes("/saved/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Saved - Browsing...";
    }
    else if (document.location.pathname.includes("/offers/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Offers - Browsing...";
    }
    else if (document.location.pathname.includes("/recommendations/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Recommendations - Browsing...";
    }
    else if (document.location.pathname.includes("/saved/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Saved - Browsing...";
    }
    else if (document.location.pathname.includes("/crisisresponse/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "CrisisResponse - Browsing...";
    }
    else if (document.location.pathname == "/") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing home page";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
}));
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzFCLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsU0FBUyxFQUFFLEtBQUs7Q0FDakIsQ0FBQyxFQUNGLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQzVCLElBQUksRUFBRSwyQkFBMkI7SUFDakMsS0FBSyxFQUFFLDBCQUEwQjtDQUNsQyxDQUFDLENBQUM7QUFFSCxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBQyxJQUFJLENBQUMsQ0FBQztBQUVoRCxJQUFJLElBQVUsQ0FBQztBQUNmLElBQUksS0FBVyxDQUFDO0FBQ2hCLElBQUksTUFBWSxDQUFDO0FBQ2pCLElBQUksT0FBYSxDQUFDO0FBQ2xCLElBQUksTUFBWSxDQUFDO0FBQ2pCLElBQUksSUFBVSxDQUFDO0FBQ2YsSUFBSSxLQUFXLEVBQUUsYUFBbUIsRUFBRSxnQkFBc0IsRUFBRSxXQUFpQixFQUFFLFVBQWdCLENBQUM7QUFFbEcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO0lBR25DLElBQUksWUFBWSxHQUFpQjtRQUMvQixhQUFhLEVBQUUsVUFBVTtLQUMxQixDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDckQsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDdEQsWUFBWSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUM7WUFDekMsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7WUFDNUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFh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