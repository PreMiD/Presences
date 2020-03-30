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
    clientId: "614387676467953674"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
});
var title, uploader, search, livechecker, episode, episodefinish, rating;
var video, videoDuration, videoCurrentTime;
var browsingStamp = Math.floor(Date.now() / 1000);
var playback;
presence.on("UpdateData", async () => {
    video = document.querySelector("video.vjs-tech");
    playback = video ? true : false;
    if (!playback) {
        presenceData: presenceData = {
            largeImageKey: "viki"
        };
        presenceData.startTimestamp = browsingStamp;
        if (document.location.hostname == "www.viki.com" &&
            document.location.pathname == "/") {
            presenceData.details = "Browsing through";
            presenceData.smallImageKey = "reading";
            presenceData.state = "the main page";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" &&
            document.location.pathname.includes("/explore") &&
            document.URL.includes("genre=")) {
            title = document.querySelector("#pjaxify-container > div.container.explore-content > div.row > div > div.clearfix.section > div.explore-page-description > strong");
            presenceData.details = "Browsing through genre:";
            presenceData.smallImageKey = "reading";
            presenceData.state = title.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" &&
            document.location.pathname.includes("/explore") &&
            document.URL.includes("country=")) {
            title = document.querySelector("#pjaxify-container > div.container.explore-content > div.row > div > div.clearfix.section > div.explore-page-description > strong");
            presenceData.details = "Browsing through country:";
            presenceData.smallImageKey = "reading";
            presenceData.state = title.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" &&
            document.location.pathname.includes("/explore") &&
            document.URL.includes("program=")) {
            title = document.querySelector("#pjaxify-container > div.container.explore-content > div.row > div > div.clearfix.section > div.explore-page-description > span:nth-child(3) > strong");
            presenceData.details = "Browsing through";
            presenceData.smallImageKey = "reading";
            presenceData.state = "schedules: " + title.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" &&
            document.location.pathname.includes("/explore")) {
            presenceData.details = "Browsing through";
            presenceData.smallImageKey = "reading";
            presenceData.state = "all shows";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" &&
            document.location.pathname.includes("/collections/") &&
            document.location.pathname.includes("/fan")) {
            presenceData.details = "Browsing through";
            presenceData.smallImageKey = "reading";
            presenceData.state = "fan-made collections";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" &&
            document.location.pathname.includes("/collections/") &&
            document.location.pathname.includes("/viki")) {
            presenceData.details = "Browsing through";
            presenceData.smallImageKey = "reading";
            presenceData.state = "Viki-made collections";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" &&
            document.location.pathname.includes("/collections/")) {
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
        else if (document.location.hostname == "www.viki.com" &&
            document.location.pathname.includes("/partners")) {
            presenceData.details = "Viewing the partner page";
            presenceData.smallImageKey = "reading";
            delete presenceData.state;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" &&
            document.location.pathname.includes("/networks")) {
            presenceData.details = "Viewing the networks page";
            presenceData.smallImageKey = "reading";
            delete presenceData.state;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" &&
            document.location.pathname.includes("/advertise")) {
            presenceData.details = "Viewing the advertisers page";
            presenceData.smallImageKey = "reading";
            delete presenceData.state;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" &&
            document.location.pathname.includes("/press")) {
            presenceData.details = "Viewing the press center";
            presenceData.smallImageKey = "reading";
            delete presenceData.state;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" &&
            document.location.pathname.includes("/users/") &&
            document.location.pathname.includes("/overview")) {
            title = document.querySelector("body > div.page-wrapper > header > div > div > div.col.s12.l8.profile-header-main > div > div > div.media-body > a");
            presenceData.details = "Viewing the profile of:";
            presenceData.smallImageKey = "reading";
            presenceData.state = title.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" &&
            document.location.pathname.includes("/users/") &&
            document.location.pathname.includes("/about")) {
            title = document.querySelector("body > div.page-wrapper > header > div > div > div.col.s12.l8.profile-header-main > div > div > div.media-body > a");
            presenceData.details = "Viewing the about of:";
            presenceData.smallImageKey = "reading";
            presenceData.state = title.innerText + "'s profile";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" &&
            document.location.pathname.includes("/users/") &&
            document.location.pathname.includes("/badges")) {
            title = document.querySelector("body > div.page-wrapper > header > div > div > div > div > div.media > div.media-body > a");
            presenceData.details = "Viewing the badges of:";
            presenceData.smallImageKey = "reading";
            presenceData.state = title.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" &&
            document.location.pathname.includes("/users/") &&
            document.location.pathname.includes("contributions")) {
            title = document.querySelector("body > div.page-wrapper > header > div > div > div > div > div.media > div.media-body > a");
            presenceData.details = "Viewing the contributions";
            presenceData.smallImageKey = "reading";
            presenceData.state = "of: " + title.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" &&
            document.location.pathname.includes("/users/") &&
            document.location.pathname.includes("/reviews")) {
            title = document.querySelector("body > div.page-wrapper > header > div > div > div > div > div.media > div.media-body > a");
            presenceData.details = "Viewing the reviews by:";
            presenceData.smallImageKey = "reading";
            presenceData.state = title.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" &&
            document.location.pathname.includes("/users/") &&
            document.location.pathname.includes("/collections")) {
            title = document.querySelector("body > div.page-wrapper > header > div > div > div > div > div.media > div.media-body > a");
            presenceData.details = "Viewing the collections by:";
            presenceData.smallImageKey = "reading";
            presenceData.state = title.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" &&
            document.location.pathname.includes("/users/") &&
            document.location.pathname.includes("/connection")) {
            title = document.querySelector("body > div.page-wrapper > header > div > div > div > div > div.media > div.media-body > a");
            presenceData.details = "Viewing the connections";
            presenceData.smallImageKey = "reading";
            presenceData.state = "of: " + title.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" &&
            document.location.pathname.includes("/users/") &&
            document.location.pathname.includes("/following")) {
            title = document.querySelector("body > div.page-wrapper > header > div > div > div > div > div.media > div.media-body > a");
            presenceData.details = "Viewing all the things";
            presenceData.smallImageKey = "reading";
            presenceData.state = title.innerText + " follows";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" &&
            document.location.pathname.includes("/about")) {
            presenceData.details = "Viewing the about page";
            presenceData.smallImageKey = "reading";
            delete presenceData.state;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" &&
            document.location.pathname.includes("/tv-guide")) {
            presenceData.details = "Viewing the TV Guide";
            presenceData.smallImageKey = "reading";
            delete presenceData.state;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" &&
            document.location.pathname.includes("/celebrities/") &&
            document.URL.includes("-works")) {
            title = document.querySelector("body > div.page-wrapper > div.main-container > div > div.card.billboard > div > div.col.s12.l4.m4.billboard-meta > h1");
            presenceData.details = "Viewing the works of:";
            presenceData.smallImageKey = "reading";
            presenceData.state = title.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" &&
            document.location.pathname.includes("/celebrities/") &&
            document.URL.includes("-honor")) {
            title = document.querySelector("body > div.page-wrapper > div.main-container > div > div.card.billboard > div > div.col.s12.l4.m4.billboard-meta > h1");
            presenceData.details = "Viewing the awards of:";
            presenceData.smallImageKey = "reading";
            presenceData.state = title.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" &&
            document.location.pathname.includes("/celebrities/")) {
            title = document.querySelector("body > div.page-wrapper > div.main-container > div > div.card.billboard > div > div.col.s12.l4.m4.billboard-meta > h1");
            presenceData.details = "Viewing the celeb profile";
            presenceData.smallImageKey = "reading";
            presenceData.state = "of: " + title.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" &&
            document.location.pathname.includes("/genres/")) {
            title = document.querySelector("body > div.page-wrapper > header > div.container > div > div.col.s12.m12.l7 > h1");
            presenceData.details = "Browsing through genre:";
            presenceData.smallImageKey = "reading";
            presenceData.state = title.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" &&
            document.location.pathname.includes("/genres")) {
            presenceData.details = "Browsing through genres";
            presenceData.smallImageKey = "reading";
            delete presenceData.state;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "blog.viki.com" &&
            document.location.pathname.includes("/tagged/news")) {
            presenceData.details = "Browsing the Viki blogs";
            presenceData.smallImageKey = "reading";
            presenceData.state = "Reading latest news";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "blog.viki.com" &&
            document.location.pathname.includes("/tagged/product")) {
            presenceData.details = "Browsing the Viki blogs";
            presenceData.smallImageKey = "reading";
            presenceData.state = "Reading latest products";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "blog.viki.com" &&
            document.location.pathname.includes("/tagged/engineering")) {
            presenceData.details = "Browsing the Viki blogs";
            presenceData.smallImageKey = "reading";
            presenceData.state = "Reading latest engineering";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "blog.viki.com" &&
            document.location.pathname.includes("/tagged/qc-rewards")) {
            presenceData.details = "Browsing the Viki blogs";
            presenceData.smallImageKey = "reading";
            presenceData.state = "Reading latest qc-rewards";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "blog.viki.com" &&
            document.location.pathname.includes("/about")) {
            presenceData.details = "Viewing the about page";
            presenceData.smallImageKey = "reading";
            delete presenceData.state;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "blog.viki.com" &&
            document.location.pathname.includes("/@")) {
            title = document.querySelector("div.u-flex1 h1.ui-h2.hero-title");
            presenceData.details = "Viewing the profile page of:";
            presenceData.smallImageKey = "reading";
            presenceData.state = title.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "blog.viki.com" &&
            document.location.pathname.includes("/") &&
            document.location.pathname.includes("-")) {
            title = document.querySelector("h1 > strong");
            presenceData.details = "Reading blog post:";
            presenceData.smallImageKey = "reading";
            presenceData.state = title.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "blog.viki.com" &&
            document.location.pathname.includes("/search")) {
            title = document.querySelector("div > div.container.u-maxWidth640.u-marginTop40 > form > input");
            presenceData.details = "Searching for:";
            presenceData.smallImageKey = "search";
            presenceData.state = title.value;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "blog.viki.com" &&
            document.location.pathname.includes("/")) {
            presenceData.details = "Browsing through the";
            presenceData.smallImageKey = "reading";
            presenceData.state = "main blog page";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" &&
            document.location.pathname.includes("/apps")) {
            presenceData.details = "Viewing the";
            presenceData.smallImageKey = "reading";
            presenceData.state = "Viki applications";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.viki.com" &&
            document.location.pathname.includes("/search")) {
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
        else if (document.location.hostname == "www.viki.com" &&
            document.location.pathname.includes("/tv/")) {
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
                ? (await strings).pause
                : (await strings).play,
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
        presenceData.state =
            episodefinish + " (Rating: " + rating.innerText + "/10)";
        if (video.paused) {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
        }
        if (title !== null && uploader !== null) {
            presence.setActivity(presenceData, !video.paused);
        }
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFlBQVksR0FBRyxtREFBbUQsQ0FBQztBQUV2RSxTQUFTLFFBQVEsQ0FBQyxPQUFPO0lBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQ1YsbUJBQW1CLEdBQUcsT0FBTyxFQUM3QixZQUFZLEdBQUcsb0RBQW9ELEVBQ25FLFlBQVksR0FBRyxvREFBb0QsRUFDbkUsZUFBZSxDQUNmLENBQUM7QUFDSCxDQUFDO0FBRUQsU0FBUyxTQUFTLENBQUMsT0FBTztJQUN6QixPQUFPLENBQUMsR0FBRyxDQUNWLG9CQUFvQixHQUFHLE9BQU8sRUFDOUIsWUFBWSxHQUFHLG9EQUFvRCxFQUNuRSxZQUFZLEdBQUcsb0RBQW9ELEVBQ25FLGVBQWUsQ0FDZixDQUFDO0FBQ0gsQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLE9BQU87SUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FDVixzQkFBc0IsR0FBRyxPQUFPLEVBQ2hDLFlBQVksR0FBRyxvREFBb0QsRUFDbkUsWUFBWTtRQUNYLGtFQUFrRSxFQUNuRSxlQUFlLENBQ2YsQ0FBQztBQUNILENBQUM7QUFFRCxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsSUFBSSxFQUFFLHdCQUF3QjtDQUM5QixDQUFDLENBQUM7QUFFSixJQUFJLEtBQVUsRUFDYixRQUFhLEVBQ2IsTUFBVyxFQUNYLFdBQWdCLEVBQ2hCLE9BQVksRUFDWixhQUFrQixFQUNsQixNQUFXLENBQUM7QUFHYixJQUFJLEtBQXVCLEVBQUUsYUFBa0IsRUFBRSxnQkFBcUIsQ0FBQztBQUV2RSxJQUFJLGFB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