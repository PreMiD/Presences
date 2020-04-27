var presence = new Presence({
    clientId: "614387676467953674"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
var title, uploader, search, episode, episodefinish, rating;
var video;
var browsingStamp = Math.floor(Date.now() / 1000);
var playback;
presence.on("UpdateData", async () => {
    video = document.querySelector("video.vjs-tech");
    playback = video ? true : false;
    if (!playback) {
        const presenceData = {
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
        var timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
        const presenceData = {
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
        episode = document.querySelector("body > div.page-wrapper > div.main-container > div > div:nth-child(2) > div:nth-child(1) > div > div > div:nth-child(1) > div.video-meta.col.s8.m8.l8 > h1 > a");
        episodefinish = episode.innerText.replace(": " + title.innerText, "");
        rating = document.querySelector("body > div.page-wrapper > div.main-container > div > div:nth-child(2) > div:nth-child(1) > div > div > div:nth-child(5) > span.strong");
        presenceData.details = document.querySelector("body > div.page-wrapper > div.main-container > div > div:nth-child(2) > div:nth-child(1) > div > div > div:nth-child(4) > div.container-meta.col.s6.m8.l8 > h2 > a").textContent;
        presenceData.state =
            episodefinish + " (Rating: " + rating.innerText + "/10)";
        if (video.paused) {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
        }
        if (document.querySelector("body > div.page-wrapper > div.main-container > div > div:nth-child(2) > div:nth-child(1) > div > div > div:nth-child(4) > div.container-meta.col.s6.m8.l8 > h2 > a") !== null &&
            uploader !== null) {
            presence.setActivity(presenceData, !video.paused);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsSUFBSSxFQUFFLHdCQUF3QjtDQUMvQixDQUFDLENBQUM7QUFPTCxTQUFTLGFBQWEsQ0FDcEIsU0FBaUIsRUFDakIsYUFBcUI7SUFFckIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLFNBQVMsR0FBRyxhQUFhLENBQUM7SUFDdkUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFFRCxJQUFJLEtBQVUsRUFDWixRQUFhLEVBQ2IsTUFBVyxFQUNYLE9BQVksRUFDWixhQUFrQixFQUNsQixNQUFXLENBQUM7QUFHZCxJQUFJLEtBQXVCLENBQUM7QUFFNUIsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxRQUFpQixDQUFDO0FBRXRCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBRW5DLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDakQsUUFBUSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMs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