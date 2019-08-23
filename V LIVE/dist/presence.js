var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    clientId: "614386371532161054",
    mediaKeys: true
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
});
PMD_info("An error might be created in console when loading a page, it means that PreMiD is trying to get information too fast. \(The information isn't loaded yet.\) You may ignore the error if it is created, the presence should still work fine.");
var title, uploader, search, livechecker;
var video, videoDuration, videoCurrentTime;
var browsingStamp = Math.floor(Date.now() / 1000);
var playback;
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    video = document.querySelector("video._hide_controls");
    playback = video ? true : false;
    if (!playback) {
        presenceData: presenceData = {
            largeImageKey: "vlive2"
        };
        presenceData.startTimestamp = browsingStamp;
        if (document.location.hostname == "www.vlive.tv" && document.location.pathname == "/home/new") {
            presenceData.details = "Browsing through the";
            presenceData.smallImageKey = "reading";
            presenceData.state = "new video's page";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" && document.location.pathname == "/home/my") {
            presenceData.details = "Browsing through their";
            presenceData.smallImageKey = "reading";
            presenceData.state = "followers recent uploads";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" && document.location.pathname.includes("/home/chart")) {
            presenceData.details = "Browsing through";
            presenceData.smallImageKey = "reading";
            presenceData.state = "the charts page";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" && document.location.pathname == "/upcoming") {
            presenceData.details = "Browsing through";
            presenceData.smallImageKey = "reading";
            presenceData.state = "the upcoming page";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" && document.location.pathname == "/channels") {
            presenceData.details = "Browsing through";
            presenceData.smallImageKey = "reading";
            presenceData.state = "the channels page";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" && document.location.pathname == "/events") {
            presenceData.details = "Browsing through";
            presenceData.smallImageKey = "reading";
            presenceData.state = "the events page";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" && document.location.pathname.includes("/vstore")) {
            presenceData.details = "Browsing through";
            presenceData.smallImageKey = "reading";
            presenceData.state = "the store page";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" && document.location.pathname.includes("/product/")) {
            search = document.querySelector("#content > div.title_series_home > div > div > div > div.series_info > div.series_tit > h3");
            uploader = document.querySelector("#content > div.title_series_home > div > div > div > div.series_info > div.series_tit > div > span:nth-child(2) > a");
            presenceData.details = "Looking at product by " + uploader.innerText;
            presenceData.smallImageKey = "reading";
            presenceData.state = search.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" && document.location.pathname == "/my/profile") {
            presenceData.details = "Editting their";
            presenceData.smallImageKey = "search";
            presenceData.state = "own profile";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" && document.location.pathname == "/my/fanship") {
            presenceData.details = "Looking at their";
            presenceData.smallImageKey = "reading";
            presenceData.state = "fanships subscriptions";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" && document.location.pathname == "/my/watched") {
            presenceData.details = "Looking at their";
            presenceData.smallImageKey = "reading";
            presenceData.state = "watched videos";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" && document.location.pathname.includes("/my/purchased")) {
            presenceData.details = "Looking at their";
            presenceData.smallImageKey = "reading";
            presenceData.state = "recent purchases";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" && document.location.pathname == "/my/coin") {
            presenceData.details = "Looking at their";
            presenceData.smallImageKey = "reading";
            presenceData.state = "coin balance";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" && document.location.pathname == "/my/devices") {
            presenceData.details = "Looking at their";
            presenceData.smallImageKey = "reading";
            presenceData.state = "connected devices";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" && document.location.pathname == "/my") {
            presenceData.details = "Looking at their";
            presenceData.smallImageKey = "reading";
            presenceData.state = "profile page";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" && document.location.pathname == "/my/channels") {
            presenceData.details = "Looking at their";
            presenceData.smallImageKey = "reading";
            presenceData.state = "followed channels";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" && document.location.pathname.includes("/search/")) {
            search = document.querySelector("#search_txt3");
            presenceData.details = "Searching for:";
            presenceData.smallImageKey = "search";
            presenceData.state = search.value;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "channels.vlive.tv" && document.location.pathname.includes("/home")) {
            search = document.querySelector("#container > channel > div > div > h2");
            presenceData.details = "Watching the home page";
            presenceData.smallImageKey = "reading";
            presenceData.state = "of " + search.innerText + "'s channel";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "channels.vlive.tv" && document.location.pathname.includes("/video")) {
            search = document.querySelector("#container > channel > div > div > h2");
            presenceData.details = "Watching the video page";
            presenceData.smallImageKey = "reading";
            presenceData.state = "of " + search.innerText + "'s channel";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "channels.vlive.tv" && document.location.pathname.includes("/celeb/")) {
            search = document.querySelector("div p span.se-fs-");
            uploader = document.querySelector("#container > smarteditor-view > div > div.header > div > smarteditor-channel-info > div > div.info > a > div.info_area > div");
            var test = uploader.innerText.replace("celeb", "");
            presenceData.details = "Reading an article by " + test;
            presenceData.smallImageKey = "reading";
            presenceData.state = search.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "channels.vlive.tv" && document.location.pathname.includes("/celeb")) {
            search = document.querySelector("#container > channel > div > div > h2");
            presenceData.details = "Watching the post page";
            presenceData.smallImageKey = "reading";
            presenceData.state = "of " + search.innerText + "'s channel";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "channels.vlive.tv" && document.location.pathname.includes("/fan")) {
            search = document.querySelector("#container > channel > div > div > h2");
            presenceData.details = "Watching the fan page";
            presenceData.smallImageKey = "reading";
            presenceData.state = "of " + search.innerText + "'s channel";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "channels.vlive.tv" && document.location.pathname.includes("/about")) {
            search = document.querySelector("#container > channel > div > div > h2");
            presenceData.details = "Watching the about page";
            presenceData.smallImageKey = "reading";
            presenceData.state = "of " + search.innerText + "'s channel";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" && document.location.pathname.includes("/fanship/")) {
            search = document.querySelector("#content > div.ticket_section > div > div.ticket_info_area > div > div > h4");
            var test = search.innerText.replace("+", "");
            presenceData.details = "Watching the fanship page";
            presenceData.smallImageKey = "reading";
            presenceData.state = "of " + test;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" && document.location.pathname.includes("/policies/")) {
            presenceData.details = "Reading the policies";
            presenceData.smallImageKey = "reading";
            delete presenceData.state;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "channels.vlive.tv" && document.location.pathname.includes("/vtoday/")) {
            search = document.querySelector("span.se-fs-");
            uploader = document.querySelector("#container > smarteditor-view > div > div.header > div > smarteditor-channel-info > div > div.info > a > div.info_area > div");
            var test = uploader.innerText.replace("celeb", "");
            presenceData.details = "Reading an article by " + test;
            presenceData.smallImageKey = "reading";
            presenceData.state = search.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "vtoday.vlive.tv" && document.location.pathname == "/home") {
            presenceData.details = "Browsing the home";
            presenceData.smallImageKey = "reading";
            presenceData.state = "page of V Today";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "vtoday.vlive.tv" && document.location.pathname == "/exclusive") {
            presenceData.details = "Browsing the exclusive";
            presenceData.smallImageKey = "reading";
            presenceData.state = "page of V Today";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "vtoday.vlive.tv" && document.location.pathname == "/celeb") {
            presenceData.details = "Browsing the celeb";
            presenceData.smallImageKey = "reading";
            presenceData.state = "page of V Today";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "vtoday.vlive.tv" && document.location.pathname == "/music") {
            presenceData.details = "Browsing the music";
            presenceData.smallImageKey = "reading";
            presenceData.state = "page of V Today";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "vtoday.vlive.tv" && document.location.pathname == "/tv") {
            presenceData.details = "Browsing the tv";
            presenceData.smallImageKey = "reading";
            presenceData.state = "page of V Today";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "vtoday.vlive.tv" && document.location.pathname == "/photo") {
            presenceData.details = "Browsing the photo";
            presenceData.smallImageKey = "reading";
            presenceData.state = "page of V Today";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" && document.location.pathname.includes("/video/")) {
            uploader = document.querySelector("#content > div.vlive_section > div > div.vlive_top > div.star_profile > div.info_area > a");
            search = document.querySelector("#content > div.vlive_section > div > div.vlive_cont > div.vlive_area > div.vlive_info > strong");
            livechecker = document.querySelector("#content > div.vlive_section > div > div.vlive_cont > div.vlive_area > script");
            if (livechecker.innerText.includes("\"viewType\" : \"live\"")) {
                presenceData.details = uploader.innerText;
                presenceData.smallImageKey = "live";
                presenceData.state = search.innerText;
                delete presenceData.startTimestamp;
                presence.setActivity(presenceData);
            }
            else if (livechecker.innerText.includes("\"viewType\" : \"liveComingSoon\"")) {
                presenceData.details = "Waiting for livestream by " + uploader.innerText;
                presenceData.smallImageKey = "live";
                presenceData.state = search.innerText;
                delete presenceData.startTimestamp;
                presence.setActivity(presenceData);
            }
            else {
                presenceData.details = "Waiting for video by " + uploader.innerText;
                presenceData.smallImageKey = "pause";
                presenceData.state = search.innerText;
                presence.setActivity(presenceData);
            }
        }
        else {
            presence.setActivity();
            presence.setTrayTitle();
        }
    }
    if (video !== null && !isNaN(video.duration)) {
        var timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration)), presenceData = {
            details: "",
            state: "",
            largeImageKey: "vlive2",
            smallImageKey: video.paused ? "pause" : "play",
            smallImageText: video.paused
                ? (yield strings).pause
                : (yield strings).play,
            startTimestamp: timestamps[0],
            endTimestamp: timestamps[1]
        };
        videoDuration = video.duration;
        videoCurrentTime = video.currentTime;
        title = document.querySelector("#content > div.vlive_section > div > div.vlive_cont > div.vlive_area > div.vlive_info > strong");
        uploader = document.querySelector("#content > div.vlive_section > div > div.vlive_top > div.star_profile > div.info_area > a");
        presenceData.details = title.innerText;
        presenceData.state = uploader.innerText;
        if (video.paused) {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
        }
        if (title !== null && uploader !== null) {
            presence.setActivity(presenceData, !video.paused);
        }
    }
}));
presence.on("MediaKeys", (key) => {
    switch (key) {
        case "pause":
            var video = document.querySelector(".jw-video video");
            video.paused ? video.play() : video.pause();
            break;
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
