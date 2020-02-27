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
    clientId: "614387676467953674",
    mediaKeys: true
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
});
var title, uploader, search, livechecker, episode, episodefinish, rating;
var video, videoDuration, videoCurrentTime;
var browsingStamp = Math.floor(Date.now() / 1000);
var playback;
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    video = document.querySelector("video.vjs-tech");
    playback = video ? true : false;
    if (!playback) {
        presenceData: presenceData = {
            largeImageKey: "viki"
        };
        presenceData.startTimestamp = browsingStamp;
        if (document.location.hostname == "www.viki.com" && document.location.pathname == "/") {
            presenceData.details = "Browsing through";
            presenceData.smallImageKey = "reading";
            presenceData.state = "the main page";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/explore") && document.URL.includes("genre=")) {
            title = document.querySelector("#pjaxify-container > div.container.explore-content > div.row > div > div.clearfix.section > div.explore-page-description > strong");
            presenceData.details = "Browsing through genre:";
            presenceData.smallImageKey = "reading";
            presenceData.state = title.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/explore") && document.URL.includes("country=")) {
            title = document.querySelector("#pjaxify-container > div.container.explore-content > div.row > div > div.clearfix.section > div.explore-page-description > strong");
            presenceData.details = "Browsing through country:";
            presenceData.smallImageKey = "reading";
            presenceData.state = title.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/explore") && document.URL.includes("program=")) {
            title = document.querySelector("#pjaxify-container > div.container.explore-content > div.row > div > div.clearfix.section > div.explore-page-description > span:nth-child(3) > strong");
            presenceData.details = "Browsing through";
            presenceData.smallImageKey = "reading";
            presenceData.state = "schedules: " + title.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/explore")) {
            presenceData.details = "Browsing through";
            presenceData.smallImageKey = "reading";
            presenceData.state = "all shows";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/collections/") && document.location.pathname.includes("/fan")) {
            presenceData.details = "Browsing through";
            presenceData.smallImageKey = "reading";
            presenceData.state = "fan-made collections";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/collections/") && document.location.pathname.includes("/viki")) {
            presenceData.details = "Browsing through";
            presenceData.smallImageKey = "reading";
            presenceData.state = "Viki-made collections";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/collections/")) {
            title = document.querySelector("body > div.page-wrapper > div.main-container > div > div.row > div.col.s12.m12.l8 > div.card.card-highlight > div > h2");
            search = document.querySelector("body > div.page-wrapper > div.main-container > div > div.card.billboard > div > div.col.s12.l4.m4.billboard-meta > h1");
            presenceData.details = "Browsing the collection:";
            presenceData.smallImageKey = "reading";
            if (title !== null) {
                presenceData.state = title.innerText;
            }
            else {
                presenceData.state = search.innerText;
            }
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/partners")) {
            presenceData.details = "Viewing the partner page";
            presenceData.smallImageKey = "reading";
            delete presenceData.state;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/networks")) {
            presenceData.details = "Viewing the networks page";
            presenceData.smallImageKey = "reading";
            delete presenceData.state;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/advertise")) {
            presenceData.details = "Viewing the advertisers page";
            presenceData.smallImageKey = "reading";
            delete presenceData.state;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/press")) {
            presenceData.details = "Viewing the press center";
            presenceData.smallImageKey = "reading";
            delete presenceData.state;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/users/") && document.location.pathname.includes("/overview")) {
            title = document.querySelector("body > div.page-wrapper > header > div > div > div.col.s12.l8.profile-header-main > div > div > div.media-body > a");
            presenceData.details = "Viewing the profile of:";
            presenceData.smallImageKey = "reading";
            presenceData.state = title.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/users/") && document.location.pathname.includes("/about")) {
            title = document.querySelector("body > div.page-wrapper > header > div > div > div.col.s12.l8.profile-header-main > div > div > div.media-body > a");
            presenceData.details = "Viewing the about of:";
            presenceData.smallImageKey = "reading";
            presenceData.state = title.innerText + "'s profile";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/users/") && document.location.pathname.includes("/badges")) {
            title = document.querySelector("body > div.page-wrapper > header > div > div > div > div > div.media > div.media-body > a");
            presenceData.details = "Viewing the badges of:";
            presenceData.smallImageKey = "reading";
            presenceData.state = title.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/users/") && document.location.pathname.includes("contributions")) {
            title = document.querySelector("body > div.page-wrapper > header > div > div > div > div > div.media > div.media-body > a");
            presenceData.details = "Viewing the contributions";
            presenceData.smallImageKey = "reading";
            presenceData.state = "of: " + title.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/users/") && document.location.pathname.includes("/reviews")) {
            title = document.querySelector("body > div.page-wrapper > header > div > div > div > div > div.media > div.media-body > a");
            presenceData.details = "Viewing the reviews by:";
            presenceData.smallImageKey = "reading";
            presenceData.state = title.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/users/") && document.location.pathname.includes("/collections")) {
            title = document.querySelector("body > div.page-wrapper > header > div > div > div > div > div.media > div.media-body > a");
            presenceData.details = "Viewing the collections by:";
            presenceData.smallImageKey = "reading";
            presenceData.state = title.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/users/") && document.location.pathname.includes("/connection")) {
            title = document.querySelector("body > div.page-wrapper > header > div > div > div > div > div.media > div.media-body > a");
            presenceData.details = "Viewing the connections";
            presenceData.smallImageKey = "reading";
            presenceData.state = "of: " + title.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/users/") && document.location.pathname.includes("/following")) {
            title = document.querySelector("body > div.page-wrapper > header > div > div > div > div > div.media > div.media-body > a");
            presenceData.details = "Viewing all the things";
            presenceData.smallImageKey = "reading";
            presenceData.state = title.innerText + " follows";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/about")) {
            presenceData.details = "Viewing the about page";
            presenceData.smallImageKey = "reading";
            delete presenceData.state;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/tv-guide")) {
            presenceData.details = "Viewing the TV Guide";
            presenceData.smallImageKey = "reading";
            delete presenceData.state;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/celebrities/") && document.URL.includes("-works")) {
            title = document.querySelector("body > div.page-wrapper > div.main-container > div > div.card.billboard > div > div.col.s12.l4.m4.billboard-meta > h1");
            presenceData.details = "Viewing the works of:";
            presenceData.smallImageKey = "reading";
            presenceData.state = title.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/celebrities/") && document.URL.includes("-honor")) {
            title = document.querySelector("body > div.page-wrapper > div.main-container > div > div.card.billboard > div > div.col.s12.l4.m4.billboard-meta > h1");
            presenceData.details = "Viewing the awards of:";
            presenceData.smallImageKey = "reading";
            presenceData.state = title.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/celebrities/")) {
            title = document.querySelector("body > div.page-wrapper > div.main-container > div > div.card.billboard > div > div.col.s12.l4.m4.billboard-meta > h1");
            presenceData.details = "Viewing the celeb profile";
            presenceData.smallImageKey = "reading";
            presenceData.state = "of: " + title.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/genres/")) {
            title = document.querySelector("body > div.page-wrapper > header > div.container > div > div.col.s12.m12.l7 > h1");
            presenceData.details = "Browsing through genre:";
            presenceData.smallImageKey = "reading";
            presenceData.state = title.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/genres")) {
            presenceData.details = "Browsing through genres";
            presenceData.smallImageKey = "reading";
            delete presenceData.state;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "blog.viki.com" && document.location.pathname.includes("/tagged/news")) {
            presenceData.details = "Browsing the Viki blogs";
            presenceData.smallImageKey = "reading";
            presenceData.state = "Reading latest news";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "blog.viki.com" && document.location.pathname.includes("/tagged/product")) {
            presenceData.details = "Browsing the Viki blogs";
            presenceData.smallImageKey = "reading";
            presenceData.state = "Reading latest products";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "blog.viki.com" && document.location.pathname.includes("/tagged/engineering")) {
            presenceData.details = "Browsing the Viki blogs";
            presenceData.smallImageKey = "reading";
            presenceData.state = "Reading latest engineering";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "blog.viki.com" && document.location.pathname.includes("/tagged/qc-rewards")) {
            presenceData.details = "Browsing the Viki blogs";
            presenceData.smallImageKey = "reading";
            presenceData.state = "Reading latest qc-rewards";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "blog.viki.com" && document.location.pathname.includes("/about")) {
            presenceData.details = "Viewing the about page";
            presenceData.smallImageKey = "reading";
            delete presenceData.state;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "blog.viki.com" && document.location.pathname.includes("/@")) {
            title = document.querySelector("div.u-flex1 h1.ui-h2.hero-title");
            presenceData.details = "Viewing the profile page of:";
            presenceData.smallImageKey = "reading";
            presenceData.state = title.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "blog.viki.com" && document.location.pathname.includes("/") && document.location.pathname.includes("-")) {
            title = document.querySelector("h1 > strong");
            presenceData.details = "Reading blog post:";
            presenceData.smallImageKey = "reading";
            presenceData.state = title.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "blog.viki.com" && document.location.pathname.includes("/search")) {
            title = document.querySelector("div > div.container.u-maxWidth640.u-marginTop40 > form > input");
            presenceData.details = "Searching for:";
            presenceData.smallImageKey = "search";
            presenceData.state = title.value;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "blog.viki.com" && document.location.pathname.includes("/")) {
            presenceData.details = "Browsing through the";
            presenceData.smallImageKey = "reading";
            presenceData.state = "main blog page";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/apps")) {
            presenceData.details = "Viewing the";
            presenceData.smallImageKey = "reading";
            presenceData.state = "Viki applications";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/search")) {
            title = document.querySelector("body > div.page-wrapper > header > div > h1 > q");
            presenceData.details = "Searching for:";
            presenceData.smallImageKey = "search";
            presenceData.state = title.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "support.viki.com") {
            presenceData.details = "Viki Support page";
            delete presenceData.smallImageKey;
            delete presenceData.state;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "contribute.viki.com") {
            presenceData.details = "Viki Contribution page";
            delete presenceData.smallImageKey;
            delete presenceData.state;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/tv/")) {
            title = document.querySelector("body > div.page-wrapper > div.main-container > div.container > div:nth-child(2) > div > div.card.billboard > div > div.col.s12.l4.m4.billboard-meta > h1");
            presenceData.details = "Browsing for episodes of:";
            presenceData.smallImageKey = "reading";
            presenceData.state = title.innerText;
            presence.setActivity(presenceData);
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
            largeImageKey: "viki",
            smallImageKey: video.paused ? "pause" : "play",
            smallImageText: video.paused
                ? (yield strings).pause
                : (yield strings).play,
            startTimestamp: timestamps[0],
            endTimestamp: timestamps[1]
        };
        videoDuration = video.duration;
        videoCurrentTime = video.currentTime;
        title = document.querySelector("body > div.page-wrapper > div.main-container > div > div:nth-child(2) > div:nth-child(1) > div > div > div:nth-child(4) > div.container-meta.col.s6.m8.l8 > h2 > a");
        episode = document.querySelector("body > div.page-wrapper > div.main-container > div > div:nth-child(2) > div:nth-child(1) > div > div > div:nth-child(1) > div.video-meta.col.s8.m8.l8 > h1 > a");
        episodefinish = episode.innerText.replace(": " + title.innerText, "");
        rating = document.querySelector("body > div.page-wrapper > div.main-container > div > div:nth-child(2) > div:nth-child(1) > div > div > div:nth-child(5) > span.strong");
        presenceData.details = title.innerText;
        presenceData.state = episodefinish + " \(Rating: " + rating.innerText + "\/10\)";
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
