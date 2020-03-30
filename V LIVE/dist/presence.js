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
    clientId: "614386371532161054"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
});
PMD_info("An error might be created in console when loading a page, it means that PreMiD is trying to get information too fast. (The information isn't loaded yet.) You may ignore the error if it is created, the presence should still work fine.");
var title, uploader, search, livechecker;
var video, videoDuration, videoCurrentTime;
var browsingStamp = Math.floor(Date.now() / 1000);
var playback;
presence.on("UpdateData", async () => {
    video = document.querySelector("video._hide_controls");
    playback = video ? true : false;
    if (!playback) {
        presenceData: presenceData = {
            largeImageKey: "vlive2"
        };
        presenceData.startTimestamp = browsingStamp;
        if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname == "/home/new") {
            presenceData.details = "Browsing through the";
            presenceData.smallImageKey = "reading";
            presenceData.state = "new video's page";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname == "/home/my") {
            presenceData.details = "Browsing through their";
            presenceData.smallImageKey = "reading";
            presenceData.state = "followers recent uploads";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname.includes("/home/chart")) {
            presenceData.details = "Browsing through";
            presenceData.smallImageKey = "reading";
            presenceData.state = "the charts page";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname == "/upcoming") {
            presenceData.details = "Browsing through";
            presenceData.smallImageKey = "reading";
            presenceData.state = "the upcoming page";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname == "/channels") {
            presenceData.details = "Browsing through";
            presenceData.smallImageKey = "reading";
            presenceData.state = "the channels page";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname == "/events") {
            presenceData.details = "Browsing through";
            presenceData.smallImageKey = "reading";
            presenceData.state = "the events page";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname.includes("/vstore")) {
            presenceData.details = "Browsing through";
            presenceData.smallImageKey = "reading";
            presenceData.state = "the store page";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname.includes("/product/")) {
            search = document.querySelector("#content > div.title_series_home > div > div > div > div.series_info > div.series_tit > h3");
            uploader = document.querySelector("#content > div.title_series_home > div > div > div > div.series_info > div.series_tit > div > span:nth-child(2) > a");
            presenceData.details = "Looking at product by " + uploader.innerText;
            presenceData.smallImageKey = "reading";
            presenceData.state = search.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname == "/my/profile") {
            presenceData.details = "Editting their";
            presenceData.smallImageKey = "search";
            presenceData.state = "own profile";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname == "/my/fanship") {
            presenceData.details = "Looking at their";
            presenceData.smallImageKey = "reading";
            presenceData.state = "fanships subscriptions";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname == "/my/watched") {
            presenceData.details = "Looking at their";
            presenceData.smallImageKey = "reading";
            presenceData.state = "watched videos";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname.includes("/my/purchased")) {
            presenceData.details = "Looking at their";
            presenceData.smallImageKey = "reading";
            presenceData.state = "recent purchases";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname == "/my/coin") {
            presenceData.details = "Looking at their";
            presenceData.smallImageKey = "reading";
            presenceData.state = "coin balance";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname == "/my/devices") {
            presenceData.details = "Looking at their";
            presenceData.smallImageKey = "reading";
            presenceData.state = "connected devices";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname == "/my") {
            presenceData.details = "Looking at their";
            presenceData.smallImageKey = "reading";
            presenceData.state = "profile page";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname == "/my/channels") {
            presenceData.details = "Looking at their";
            presenceData.smallImageKey = "reading";
            presenceData.state = "followed channels";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname.includes("/search/")) {
            search = document.querySelector("#search_txt3");
            presenceData.details = "Searching for:";
            presenceData.smallImageKey = "search";
            presenceData.state = search.value;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "channels.vlive.tv" &&
            document.location.pathname.includes("/home")) {
            search = document.querySelector("#container > channel > div > div > h2");
            presenceData.details = "Watching the home page";
            presenceData.smallImageKey = "reading";
            presenceData.state = "of " + search.innerText + "'s channel";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "channels.vlive.tv" &&
            document.location.pathname.includes("/video")) {
            search = document.querySelector("#container > channel > div > div > h2");
            presenceData.details = "Watching the video page";
            presenceData.smallImageKey = "reading";
            presenceData.state = "of " + search.innerText + "'s channel";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "channels.vlive.tv" &&
            document.location.pathname.includes("/celeb/")) {
            search = document.querySelector("div p span.se-fs-");
            uploader = document.querySelector("#container > smarteditor-view > div > div.header > div > smarteditor-channel-info > div > div.info > a > div.info_area > div");
            var test = uploader.innerText.replace("celeb", "");
            presenceData.details = "Reading an article by " + test;
            presenceData.smallImageKey = "reading";
            presenceData.state = search.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "channels.vlive.tv" &&
            document.location.pathname.includes("/celeb")) {
            search = document.querySelector("#container > channel > div > div > h2");
            presenceData.details = "Watching the post page";
            presenceData.smallImageKey = "reading";
            presenceData.state = "of " + search.innerText + "'s channel";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "channels.vlive.tv" &&
            document.location.pathname.includes("/fan")) {
            search = document.querySelector("#container > channel > div > div > h2");
            presenceData.details = "Watching the fan page";
            presenceData.smallImageKey = "reading";
            presenceData.state = "of " + search.innerText + "'s channel";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "channels.vlive.tv" &&
            document.location.pathname.includes("/about")) {
            search = document.querySelector("#container > channel > div > div > h2");
            presenceData.details = "Watching the about page";
            presenceData.smallImageKey = "reading";
            presenceData.state = "of " + search.innerText + "'s channel";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname.includes("/fanship/")) {
            search = document.querySelector("#content > div.ticket_section > div > div.ticket_info_area > div > div > h4");
            var test = search.innerText.replace("+", "");
            presenceData.details = "Watching the fanship page";
            presenceData.smallImageKey = "reading";
            presenceData.state = "of " + test;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname.includes("/policies/")) {
            presenceData.details = "Reading the policies";
            presenceData.smallImageKey = "reading";
            delete presenceData.state;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "channels.vlive.tv" &&
            document.location.pathname.includes("/vtoday/")) {
            search = document.querySelector("span.se-fs-");
            uploader = document.querySelector("#container > smarteditor-view > div > div.header > div > smarteditor-channel-info > div > div.info > a > div.info_area > div");
            var test = uploader.innerText.replace("celeb", "");
            presenceData.details = "Reading an article by " + test;
            presenceData.smallImageKey = "reading";
            presenceData.state = search.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "vtoday.vlive.tv" &&
            document.location.pathname == "/home") {
            presenceData.details = "Browsing the home";
            presenceData.smallImageKey = "reading";
            presenceData.state = "page of V Today";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "vtoday.vlive.tv" &&
            document.location.pathname == "/exclusive") {
            presenceData.details = "Browsing the exclusive";
            presenceData.smallImageKey = "reading";
            presenceData.state = "page of V Today";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "vtoday.vlive.tv" &&
            document.location.pathname == "/celeb") {
            presenceData.details = "Browsing the celeb";
            presenceData.smallImageKey = "reading";
            presenceData.state = "page of V Today";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "vtoday.vlive.tv" &&
            document.location.pathname == "/music") {
            presenceData.details = "Browsing the music";
            presenceData.smallImageKey = "reading";
            presenceData.state = "page of V Today";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "vtoday.vlive.tv" &&
            document.location.pathname == "/tv") {
            presenceData.details = "Browsing the tv";
            presenceData.smallImageKey = "reading";
            presenceData.state = "page of V Today";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "vtoday.vlive.tv" &&
            document.location.pathname == "/photo") {
            presenceData.details = "Browsing the photo";
            presenceData.smallImageKey = "reading";
            presenceData.state = "page of V Today";
            presence.setActivity(presenceData);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname.includes("/video/")) {
            uploader = document.querySelector("#content > div.vlive_section > div > div.vlive_top > div.star_profile > div.info_area > a");
            search = document.querySelector("#content > div.vlive_section > div > div.vlive_cont > div.vlive_area > div.vlive_info > strong");
            livechecker = document.querySelector("#content > div.vlive_section > div > div.vlive_cont > div.vlive_area > script");
            if (livechecker.innerText.includes('"viewType" : "live"')) {
                presenceData.details = uploader.innerText;
                presenceData.smallImageKey = "live";
                presenceData.state = search.innerText;
                delete presenceData.startTimestamp;
                presence.setActivity(presenceData);
            }
            else if (livechecker.innerText.includes('"viewType" : "liveComingSoon"')) {
                presenceData.details =
                    "Waiting for livestream by " + uploader.innerText;
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
                ? (await strings).pause
                : (await strings).play,
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
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFlBQVksR0FBRyxtREFBbUQsQ0FBQztBQUV2RSxTQUFTLFFBQVEsQ0FBQyxPQUFPO0lBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQ1YsbUJBQW1CLEdBQUcsT0FBTyxFQUM3QixZQUFZLEdBQUcsb0RBQW9ELEVBQ25FLFlBQVksR0FBRyxvREFBb0QsRUFDbkUsZUFBZSxDQUNmLENBQUM7QUFDSCxDQUFDO0FBRUQsU0FBUyxTQUFTLENBQUMsT0FBTztJQUN6QixPQUFPLENBQUMsR0FBRyxDQUNWLG9CQUFvQixHQUFHLE9BQU8sRUFDOUIsWUFBWSxHQUFHLG9EQUFvRCxFQUNuRSxZQUFZLEdBQUcsb0RBQW9ELEVBQ25FLGVBQWUsQ0FDZixDQUFDO0FBQ0gsQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLE9BQU87SUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FDVixzQkFBc0IsR0FBRyxPQUFPLEVBQ2hDLFlBQVksR0FBRyxvREFBb0QsRUFDbkUsWUFBWTtRQUNYLGtFQUFrRSxFQUNuRSxlQUFlLENBQ2YsQ0FBQztBQUNILENBQUM7QUFFRCxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsSUFBSSxFQUFFLHdCQUF3QjtDQUM5QixDQUFDLENBQUM7QUFFSixRQUFRLENBQ1AsMk9BQTJPLENBQzNPLENBQUM7QUFFRixJQUFJLEtBQVUsRUFBRSxRQUFhLEVBQUUsTUFBVyxFQUFFLFdBQWdCLENBQUM7QUFHN0QsSUFBSSxLQUF1QixFQUFFLGFBQWtCLEVBQUUsZ0JBQXFCLENBQUM7QUFFdkUsSUFBSSxh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