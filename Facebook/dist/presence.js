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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUwsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxJQUFTLENBQUM7QUFDZCxJQUFJLEtBQVUsQ0FBQztBQUNmLElBQUksTUFBVyxDQUFDO0FBQ2hCLElBQUksT0FBWSxDQUFDO0FBQ2pCLElBQUksTUFBVyxDQUFDO0FBQ2hCLElBQUksSUFBUyxDQUFDO0FBQ2QsSUFBSSxLQUFVLEVBQ1osYUFBa0IsRUFDbEIsZ0JBQXFCLEVBQ3JCLFdBQWdCLEVBQ2hCLFVBQWUsQ0FBQztBQUVsQixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxJQUFJLFlBQVksR0FBaUI7UUFDL0IsYUFBYSxFQUFFLFVBQVU7S0FDMUIsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO1FBQ3JELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ3RELFlBQVksQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDO1lBQ3pDLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1lBQzVDLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUMzQiwrTkFBK04sQ0FDaE8sQ0FB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