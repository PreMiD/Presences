var genericStyle = "font-weight: 800; padding: 2px 5px; color: white;";
function PMD_info(message) {
    console.log("%cPreMiD%cINFO%c " + message, genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;", genericStyle + "border-radius: 0 25px 25px 0; background: #5050ff;", "color: unset;");
}
var presence = new Presence({
    clientId: "614386371532161054"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
});
PMD_info("An error might be created in console when loading a page, it means that PreMiD is trying to get information too fast. (The information isn't loaded yet.) You may ignore the error if it is created, the presence should still work fine.");
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
var title, uploader, search, livechecker;
var video;
var browsingStamp = Math.floor(Date.now() / 1000);
var playback;
presence.on("UpdateData", async () => {
    video = document.querySelector("video._hide_controls");
    playback = video ? true : false;
    if (!playback) {
        const pdata = {
            largeImageKey: "vlive2"
        };
        pdata.startTimestamp = browsingStamp;
        if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname == "/home/new") {
            pdata.details = "Browsing through the";
            pdata.smallImageKey = "reading";
            pdata.state = "new video's page";
            presence.setActivity(pdata);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname == "/home/my") {
            pdata.details = "Browsing through their";
            pdata.smallImageKey = "reading";
            pdata.state = "followers recent uploads";
            presence.setActivity(pdata);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname.includes("/home/chart")) {
            pdata.details = "Browsing through";
            pdata.smallImageKey = "reading";
            pdata.state = "the charts page";
            presence.setActivity(pdata);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname == "/upcoming") {
            pdata.details = "Browsing through";
            pdata.smallImageKey = "reading";
            pdata.state = "the upcoming page";
            presence.setActivity(pdata);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname == "/channels") {
            pdata.details = "Browsing through";
            pdata.smallImageKey = "reading";
            pdata.state = "the channels page";
            presence.setActivity(pdata);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname == "/events") {
            pdata.details = "Browsing through";
            pdata.smallImageKey = "reading";
            pdata.state = "the events page";
            presence.setActivity(pdata);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname.includes("/vstore")) {
            pdata.details = "Browsing through";
            pdata.smallImageKey = "reading";
            pdata.state = "the store page";
            presence.setActivity(pdata);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname.includes("/product/")) {
            search = document.querySelector("#content > div.title_series_home > div > div > div > div.series_info > div.series_tit > h3");
            uploader = document.querySelector("#content > div.title_series_home > div > div > div > div.series_info > div.series_tit > div > span:nth-child(2) > a");
            pdata.details = "Looking at product by " + uploader.innerText;
            pdata.smallImageKey = "reading";
            pdata.state = search.innerText;
            presence.setActivity(pdata);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname == "/my/profile") {
            pdata.details = "Editting their";
            pdata.smallImageKey = "search";
            pdata.state = "own profile";
            presence.setActivity(pdata);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname == "/my/fanship") {
            pdata.details = "Looking at their";
            pdata.smallImageKey = "reading";
            pdata.state = "fanships subscriptions";
            presence.setActivity(pdata);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname == "/my/watched") {
            pdata.details = "Looking at their";
            pdata.smallImageKey = "reading";
            pdata.state = "watched videos";
            presence.setActivity(pdata);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname.includes("/my/purchased")) {
            pdata.details = "Looking at their";
            pdata.smallImageKey = "reading";
            pdata.state = "recent purchases";
            presence.setActivity(pdata);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname == "/my/coin") {
            pdata.details = "Looking at their";
            pdata.smallImageKey = "reading";
            pdata.state = "coin balance";
            presence.setActivity(pdata);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname == "/my/devices") {
            pdata.details = "Looking at their";
            pdata.smallImageKey = "reading";
            pdata.state = "connected devices";
            presence.setActivity(pdata);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname == "/my") {
            pdata.details = "Looking at their";
            pdata.smallImageKey = "reading";
            pdata.state = "profile page";
            presence.setActivity(pdata);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname == "/my/channels") {
            pdata.details = "Looking at their";
            pdata.smallImageKey = "reading";
            pdata.state = "followed channels";
            presence.setActivity(pdata);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname.includes("/search/")) {
            search = document.querySelector("#search_txt3");
            pdata.details = "Searching for:";
            pdata.smallImageKey = "search";
            pdata.state = search.value;
            presence.setActivity(pdata);
        }
        else if (document.location.hostname == "channels.vlive.tv" &&
            document.location.pathname.includes("/home")) {
            search = document.querySelector("#container > channel > div > div > h2");
            pdata.details = "Watching the home page";
            pdata.smallImageKey = "reading";
            pdata.state = "of " + search.innerText + "'s channel";
            presence.setActivity(pdata);
        }
        else if (document.location.hostname == "channels.vlive.tv" &&
            document.location.pathname.includes("/video")) {
            search = document.querySelector("#container > channel > div > div > h2");
            pdata.details = "Watching the video page";
            pdata.smallImageKey = "reading";
            pdata.state = "of " + search.innerText + "'s channel";
            presence.setActivity(pdata);
        }
        else if (document.location.hostname == "channels.vlive.tv" &&
            document.location.pathname.includes("/celeb/")) {
            search = document.querySelector("div p span.se-fs-");
            uploader = document.querySelector("#container > smarteditor-view > div > div.header > div > smarteditor-channel-info > div > div.info > a > div.info_area > div");
            const test = uploader.innerText.replace("celeb", "");
            pdata.details = "Reading an article by " + test;
            pdata.smallImageKey = "reading";
            pdata.state = search.innerText;
            presence.setActivity(pdata);
        }
        else if (document.location.hostname == "channels.vlive.tv" &&
            document.location.pathname.includes("/celeb")) {
            search = document.querySelector("#container > channel > div > div > h2");
            pdata.details = "Watching the post page";
            pdata.smallImageKey = "reading";
            pdata.state = "of " + search.innerText + "'s channel";
            presence.setActivity(pdata);
        }
        else if (document.location.hostname == "channels.vlive.tv" &&
            document.location.pathname.includes("/fan")) {
            search = document.querySelector("#container > channel > div > div > h2");
            pdata.details = "Watching the fan page";
            pdata.smallImageKey = "reading";
            pdata.state = "of " + search.innerText + "'s channel";
            presence.setActivity(pdata);
        }
        else if (document.location.hostname == "channels.vlive.tv" &&
            document.location.pathname.includes("/about")) {
            search = document.querySelector("#container > channel > div > div > h2");
            pdata.details = "Watching the about page";
            pdata.smallImageKey = "reading";
            pdata.state = "of " + search.innerText + "'s channel";
            presence.setActivity(pdata);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname.includes("/fanship/")) {
            search = document.querySelector("#content > div.ticket_section > div > div.ticket_info_area > div > div > h4");
            const test = search.innerText.replace("+", "");
            pdata.details = "Watching the fanship page";
            pdata.smallImageKey = "reading";
            pdata.state = "of " + test;
            presence.setActivity(pdata);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname.includes("/policies/")) {
            pdata.details = "Reading the policies";
            pdata.smallImageKey = "reading";
            delete pdata.state;
            presence.setActivity(pdata);
        }
        else if (document.location.hostname == "channels.vlive.tv" &&
            document.location.pathname.includes("/vtoday/")) {
            search = document.querySelector("span.se-fs-");
            uploader = document.querySelector("#container > smarteditor-view > div > div.header > div > smarteditor-channel-info > div > div.info > a > div.info_area > div");
            const test = uploader.innerText.replace("celeb", "");
            pdata.details = "Reading an article by " + test;
            pdata.smallImageKey = "reading";
            pdata.state = search.innerText;
            presence.setActivity(pdata);
        }
        else if (document.location.hostname == "vtoday.vlive.tv" &&
            document.location.pathname == "/home") {
            pdata.details = "Browsing the home";
            pdata.smallImageKey = "reading";
            pdata.state = "page of V Today";
            presence.setActivity(pdata);
        }
        else if (document.location.hostname == "vtoday.vlive.tv" &&
            document.location.pathname == "/exclusive") {
            pdata.details = "Browsing the exclusive";
            pdata.smallImageKey = "reading";
            pdata.state = "page of V Today";
            presence.setActivity(pdata);
        }
        else if (document.location.hostname == "vtoday.vlive.tv" &&
            document.location.pathname == "/celeb") {
            pdata.details = "Browsing the celeb";
            pdata.smallImageKey = "reading";
            pdata.state = "page of V Today";
            presence.setActivity(pdata);
        }
        else if (document.location.hostname == "vtoday.vlive.tv" &&
            document.location.pathname == "/music") {
            pdata.details = "Browsing the music";
            pdata.smallImageKey = "reading";
            pdata.state = "page of V Today";
            presence.setActivity(pdata);
        }
        else if (document.location.hostname == "vtoday.vlive.tv" &&
            document.location.pathname == "/tv") {
            pdata.details = "Browsing the tv";
            pdata.smallImageKey = "reading";
            pdata.state = "page of V Today";
            presence.setActivity(pdata);
        }
        else if (document.location.hostname == "vtoday.vlive.tv" &&
            document.location.pathname == "/photo") {
            pdata.details = "Browsing the photo";
            pdata.smallImageKey = "reading";
            pdata.state = "page of V Today";
            presence.setActivity(pdata);
        }
        else if (document.location.hostname == "www.vlive.tv" &&
            document.location.pathname.includes("/video/")) {
            uploader = document.querySelector("#content > div.vlive_section > div > div.vlive_top > div.star_profile > div.info_area > a");
            search = document.querySelector("#content > div.vlive_section > div > div.vlive_cont > div.vlive_area > div.vlive_info > strong");
            livechecker = document.querySelector("#content > div.vlive_section > div > div.vlive_cont > div.vlive_area > script");
            if (livechecker.innerText.includes('"viewType" : "live"')) {
                pdata.details = uploader.innerText;
                pdata.smallImageKey = "live";
                pdata.state = search.innerText;
                delete pdata.startTimestamp;
                presence.setActivity(pdata);
            }
            else if (livechecker.innerText.includes('"viewType" : "liveComingSoon"')) {
                pdata.details = "Waiting for livestream by " + uploader.innerText;
                pdata.smallImageKey = "live";
                pdata.state = search.innerText;
                delete pdata.startTimestamp;
                presence.setActivity(pdata);
            }
            else {
                pdata.details = "Waiting for video by " + uploader.innerText;
                pdata.smallImageKey = "pause";
                pdata.state = search.innerText;
                presence.setActivity(pdata);
            }
        }
        else {
            presence.setActivity();
            presence.setTrayTitle();
        }
    }
    if (video !== null && !isNaN(video.duration)) {
        const timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration)), pdata = {
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
        pdata.details = document.querySelector("#content > div.vlive_section > div > div.vlive_cont > div.vlive_area > div.vlive_info > strong").textContent;
        pdata.state = document.querySelector("#content > div.vlive_section > div > div.vlive_top > div.star_profile > div.info_area > a").textContent;
        if (video.paused) {
            delete pdata.startTimestamp;
            delete pdata.endTimestamp;
        }
        if (title !== null && uploader !== null) {
            presence.setActivity(pdata, !video.paused);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFlBQVksR0FBRyxtREFBbUQsQ0FBQztBQUV2RSxTQUFTLFFBQVEsQ0FBQyxPQUFPO0lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQ1QsbUJBQW1CLEdBQUcsT0FBTyxFQUM3QixZQUFZLEdBQUcsb0RBQW9ELEVBQ25FLFlBQVksR0FBRyxvREFBb0QsRUFDbkUsZUFBZSxDQUNoQixDQUFDO0FBQ0osQ0FBQztBQUVELElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQ3hCLFFBQVEsRUFBRSxvQkFBb0I7Q0FDL0IsQ0FBQyxFQUNGLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQzVCLElBQUksRUFBRSwyQkFBMkI7SUFDakMsS0FBSyxFQUFFLDBCQUEwQjtJQUNqQyxJQUFJLEVBQUUsd0JBQXdCO0NBQy9CLENBQUMsQ0FBQztBQUVMLFFBQVEsQ0FDTiwyT0FBMk8sQ0FDNU8sQ0FBQztBQU9GLFNBQVMsYUFBYSxDQUNwQixTQUFpQixFQUNqQixhQUFxQjtJQUVyQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHLGFBQWEsQ0FBQztJQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUVELElBQUksS0FBVSxFQUFFLFFBQWEsRUFBRSxNQUFXLEVBQUUsV0FBZ0IsQ0FBQztBQUM3RCxJQUFJLEtBQXVCLENBQUM7QUFDNUIsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcs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