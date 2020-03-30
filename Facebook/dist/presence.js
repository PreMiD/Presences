var presence = new Presence({
    clientId: "631803867708915732"
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
presence.on("UpdateData", async () => {
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
            user = document.querySelector("._3oh-");
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
    else if (document.querySelector("#seo_h1_tag > a > span") !== null ||
        document.querySelector("#fb-timeline-cover-name > a") !== null) {
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
            presenceData.smallImageText = videoPaused
                ? (await strings).pause
                : (await strings).play;
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
            user = document.querySelector(".profileLink");
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
            title = document.querySelector("._1rgw");
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
            presenceData.smallImageText = videoPaused
                ? (await strings).pause
                : (await strings).play;
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
        search = document.querySelector(".inputtext");
        video = document.querySelector("body > div > div:nth-child(3) > div > div > div:nth-child(2) > div > div > div > div > div > div:nth-child(2) > div > div > div > video");
        if (video !== null) {
            user = document.querySelector("#content > div > div:nth-child(2) > div > div > div > div > div > div > div > div > div:nth-child(2) > div > div > a");
            title = document.querySelector("#content > div > div:nth-child(2) > div > div > div > div > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div");
            videoCurrentTime = video.currentTime;
            videoDuration = video.duration;
            videoPaused = video.paused;
            timestamps = getTimestamps(Math.floor(videoCurrentTime), Math.floor(videoDuration));
            presenceData.smallImageKey = videoPaused ? "pause" : "play";
            presenceData.smallImageText = videoPaused
                ? (await strings).pause
                : (await strings).play;
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
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxDQUFDO0FBRUosSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxJQUFTLENBQUM7QUFDZCxJQUFJLEtBQVUsQ0FBQztBQUNmLElBQUksTUFBVyxDQUFDO0FBQ2hCLElBQUksT0FBWSxDQUFDO0FBQ2pCLElBQUksTUFBVyxDQUFDO0FBQ2hCLElBQUksSUFBUyxDQUFDO0FBQ2QsSUFBSSxLQUFVLEVBQ2IsYUFBa0IsRUFDbEIsZ0JBQXFCLEVBQ3JCLFdBQWdCLEVBQ2hCLFVBQWUsQ0FBQztBQUVqQixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxJQUFJLFlBQVksR0FBaUI7UUFDaEMsYUFBYSxFQUFFLFVBQVU7S0FDekIsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO1FBQ3RELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ3ZELFlBQVksQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDO1lBQ3pDLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1lBQzVDLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM1QiwrTkFBK04sQ0FDL04sQ0FB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