var presence = new Presence({
    clientId: "633681675792023572"
}), prev, elapsed, path, gender, strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing",
    live: "presence.activity.live"
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
presence.on("UpdateData", async () => {
    const data = {
        largeImageKey: "ch"
    };
    path = document.location.pathname;
    var video = document.querySelector("video[id$='_html5_api']");
    if (path.includes("/b/") &&
        document.querySelector("#broadcaster_intro") &&
        document.querySelector("#broadcaster_intro").style
            .display == "none") {
        if (window.location.href !== prev) {
            prev = window.location.href;
            elapsed = Math.floor(Date.now() / 1000);
        }
        data.details = "Broadcasting as";
        data.state = path.split("/")[2];
        data.smallImageKey = "live";
        data.smallImageText = (await strings).live;
        data.startTimestamp = elapsed;
    }
    else if (!video &&
        document.querySelector("#header div.logo-zone") != null) {
        data.details = (await strings).browsing;
        data.smallImageKey = "search";
        data.smallImageText = (await strings).browsing;
        if (path.includes("/p/")) {
            data.state = "Accounts";
        }
        else if (path.includes("/b/")) {
            data.state = "Broadcast page";
        }
        else if (path.includes("/tag/")) {
            if (typeof path.split("/")[3] === "undefined" ||
                path.split("/")[3] == null ||
                path.split("/")[3] === "" ||
                path.split("/")[3].length > 1) {
                data.state = "Tag : " + path.split("/")[2];
            }
            else {
                switch (path.split("/")[3]) {
                    case "f":
                        gender = "female";
                        break;
                    case "m":
                        gender = "male";
                        break;
                    case "c":
                        gender = "couple";
                        break;
                    case "s":
                        gender = "trans";
                }
                data.state = "Tag : " + path.split("/")[2] + " (" + gender + ")";
            }
        }
        else {
            switch (path) {
                case "/":
                    data.state = "Featured cams";
                    break;
                case "/female-cams/":
                    data.state = "Female cams";
                    break;
                case "/male-cams/":
                    data.state = "Male cams";
                    break;
                case "/couple-cams/":
                    data.state = "Couple cams";
                    break;
                case "/trans-cams/":
                    data.state = "Trans cams";
                    break;
                case "/tags/":
                    data.state = "Tags";
                    break;
                case "/accounts/register/":
                    data.state = "Signing up";
                    break;
                case "/auth/login/":
                    data.state = "Logging in";
                    break;
                case "/auth/logout/":
                    data.state = "Logging out";
                    break;
                case "/north-american-cams/":
                    data.state = "North American cams";
                    break;
                case "/other-region-cams/":
                    data.state = "Other region cams";
                    break;
                case "/euro-russian-cams/":
                    data.state = "Euro Russian cams";
                    break;
                case "/asian-cams/":
                    data.state = "Asian cams";
                    break;
                case "/south-american-cams/":
                    data.state = "South American cams";
                    break;
                case "/exhibitionist-cams/":
                    data.state = "Exhibitionist cams";
                    break;
                case "/hd-cams/":
                    data.state = "HD cams";
                    break;
                case "/spy-on-cams/":
                    data.state = "Private cams";
                    break;
                case "/new-cams/":
                    data.state = "New cams";
                    break;
                case "/mature-cams/":
                    data.state = "Mature cams";
                    break;
                case "/teen-cams/":
                    data.state = "Teen cams";
                    break;
                case "/sitemap/":
                case "/2257/":
                case "/terms/":
                case "/contest/details/":
                case "/jobs/":
                case "/apps/":
                case "/billingsupport/":
                case "/security/":
                case "/affiliates/":
                case "/privacy/":
                case "/law_enforcement/":
                    data.details = "Reading";
                    data.state = "Law and meta pages";
                    data.smallImageKey = "reading";
                    data.smallImageText = "Reading";
                    break;
                case "/tube/":
                    data.state = "Tube";
                    break;
                case "/accounts/welcome/":
                    data.state = "Welcome page";
                    break;
                case "/my_collection/private_shows/":
                    data.state = "Recorded private shows";
                    break;
                case "/my_collection/photo_videos/":
                    data.state = "Purchased photos/videos";
                    break;
                case "/tipping/free_tokens/":
                    data.state = "Free token methods";
                    break;
                case "/supporter/upgrade/":
                    data.state = "Upgrade page";
                    break;
                default:
                    data.state = "Cams";
            }
        }
    }
    else if (path.includes("/photo_videos/")) {
        if (!video && path.includes("/photo_videos/photo/")) {
            data.details = "Looking at a photo";
            data.state = document.querySelector("h1").textContent;
            data.smallImageKey = "search";
            data.smallImageText = (await strings).browsing;
        }
        else if (video && path.includes("/photo_videos/photo/")) {
            var timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
            data.details = "Watching a clip";
            data.state = document.querySelector("h1").textContent;
            data.smallImageKey = video.paused ? "pause" : "play";
            data.smallImageText = video.paused
                ? (await strings).pause
                : (await strings).play;
            data.startTimestamp = timestamps[0];
            data.endTimestamp = timestamps[1];
            if (video.paused) {
                delete data.startTimestamp;
                delete data.endTimestamp;
            }
        }
        else {
            data.details = (await strings).browsing;
            data.state = "Photosets";
            data.smallImageKey = "search";
            data.smallImageText = (await strings).browsing;
        }
    }
    else if (path.split("/")[2] == null || path.split("/")[2].length == 0) {
        if (window.location.href !== prev) {
            prev = window.location.href;
            elapsed = Math.floor(Date.now() / 1000);
        }
        data.startTimestamp = elapsed;
        data.details = path.split("/")[1];
        if (video && !video.paused) {
            data.smallImageKey = "live";
            data.smallImageText = (await strings).live;
        }
        else {
            data.smallImageKey = "search";
            data.smallImageText = (await strings).browsing;
            data.state = (await strings).browsing;
        }
    }
    else {
        data.details = (await strings).browsing;
        data.state = "Cams";
        data.smallImageKey = "search";
        data.smallImageText = (await strings).browsing;
    }
    presence.setActivity(data);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixJQUFJLEVBQ0osT0FBZSxFQUNmLElBQVksRUFDWixNQUFjLEVBQ2QsT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDNUIsSUFBSSxFQUFFLDJCQUEyQjtJQUNqQyxLQUFLLEVBQUUsMEJBQTBCO0lBQ2pDLFFBQVEsRUFBRSw0QkFBNEI7SUFDdEMsSUFBSSxFQUFFLHdCQUF3QjtDQUMvQixDQUFDLENBQUM7QUFPTCxTQUFTLGFBQWEsQ0FDcEIsU0FBaUIsRUFDakIsYUFBcUI7SUFFckIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLFNBQVMsR0FBRyxhQUFhLENBQUM7SUFDdkUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFFRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxNQUFNLElBQUksR0FBaUI7UUFDekIsYUFBYSxFQUFFLElBQUk7S0FDcEIsQ0FBQztJQUVGLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUVsQyxJQUFJLEtBQUssR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FDbEQseUJBQXlCLENBQzFCLENBQUM7SUFFRixJQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQ3BCLFFBQVEsQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUM7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