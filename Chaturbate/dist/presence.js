var presence = new Presence({
    clientId: "633681675792023572"
}), prev, elapsed, path, gender, strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing",
    live: "presence.activity.live"
});
presence.on("UpdateData", async () => {
    let data = {
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
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixJQUFJLEVBQ0osT0FBZSxFQUNmLElBQVksRUFDWixNQUFjLEVBQ2QsT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDN0IsSUFBSSxFQUFFLDJCQUEyQjtJQUNqQyxLQUFLLEVBQUUsMEJBQTBCO0lBQ2pDLFFBQVEsRUFBRSw0QkFBNEI7SUFDdEMsSUFBSSxFQUFFLHdCQUF3QjtDQUM5QixDQUFDLENBQUM7QUFFSixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxJQUFJLElBQUksR0FBaUI7UUFDeEIsYUFBYSxFQUFFLElBQUk7S0FDbkIsQ0FBQztJQUVGLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUVsQyxJQUFJLEtBQUssR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FDbkQseUJBQXlCLENBQ3pCLENBQUM7SUFFRixJQUNDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQ3BCLFFBQVEsQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUM7UUFDM0MsUUFBUSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBaUIsQ0FBQyxLQUFLO2FBQ2pFLE9BQU8sSUFBSSxNQUFNLEVBQ2xCO1FBQ0QsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUU7WUFDbEMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQzVCLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztTQUN4QztRQUVE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