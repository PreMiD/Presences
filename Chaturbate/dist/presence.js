var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "633681675792023572",
    
}), prev, elapsed, path, gender, strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing",
    live: "presence.activity.live"
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let data = {
        largeImageKey: "ch"
    };
    path = document.location.pathname;
    var video = document.querySelector("video[id$='_html5_api']");
    if (path.includes("/b/") && (document.querySelector("#broadcaster_intro") && document.querySelector("#broadcaster_intro").style.display == "none")) {
        if (window.location.href !== prev) {
            prev = window.location.href;
            elapsed = Math.floor(Date.now() / 1000);
        }
        data.details = "Broadcasting as";
        data.state = path.split("/")[2];
        data.smallImageKey = "live";
        data.smallImageText = (yield strings).live;
        data.startTimestamp = elapsed;
    }
    else if (!video && document.querySelector("#header div.logo-zone") != null) {
        data.details = (yield strings).browsing;
        data.smallImageKey = "search";
        data.smallImageText = (yield strings).browsing;
        if (path.includes("/p/")) {
            data.state = "Accounts";
        }
        else if (path.includes("/b/")) {
            data.state = "Broadcast page";
        }
        else if (path.includes("/tag/")) {
            if (typeof path.split("/")[3] === 'undefined' || path.split("/")[3] == null || path.split("/")[3] === ""
                || path.split("/")[3].length > 1) {
                data.state = 'Tag : ' + path.split("/")[2];
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
                data.state = 'Tag : ' + path.split("/")[2] + ' (' + gender + ")";
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
            data.smallImageText = (yield strings).browsing;
        }
        else if (video && path.includes("/photo_videos/photo/")) {
            var timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
            data.details = "Watching a clip";
            data.state = document.querySelector("h1").textContent;
            data.smallImageKey = video.paused ? "pause" : "play";
            data.smallImageText = video.paused ? (yield strings).pause : (yield strings).play;
            data.startTimestamp = timestamps[0];
            data.endTimestamp = timestamps[1];
            if (video.paused) {
                delete data.startTimestamp;
                delete data.endTimestamp;
            }
        }
        else {
            data.details = (yield strings).browsing;
            data.state = "Photosets";
            data.smallImageKey = "search";
            data.smallImageText = (yield strings).browsing;
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
            data.smallImageText = (yield strings).live;
        }
        else {
            data.smallImageKey = "search";
            data.smallImageText = (yield strings).browsing;
            data.state = (yield strings).browsing;
        }
    }
    else {
        data.details = (yield strings).browsing;
        data.state = "Cams";
        data.smallImageKey = "search";
        data.smallImageText = (yield strings).browsing;
    }
    presence.setActivity(data);
}));
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ2hCLENBQUMsRUFDRCxJQUFJLEVBQUUsT0FBZSxFQUFFLElBQVksRUFBRSxNQUFjLEVBQ25ELE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQzdCLElBQUksRUFBRSwyQkFBMkI7SUFDakMsS0FBSyxFQUFFLDBCQUEwQjtJQUNqQyxRQUFRLEVBQUUsNEJBQTRCO0lBQ3RDLElBQUksRUFBRSx3QkFBd0I7Q0FDOUIsQ0FBQyxDQUFDO0FBRUosUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO0lBQ3BDLElBQUksSUFBSSxHQUFpQjtRQUN4QixhQUFhLEVBQUUsSUFBSTtLQUNuQixDQUFDO0lBRUYsSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO0lBRWxDLElBQUksS0FBSyxHQUFxQixRQUFRLENBQUMsYUFBYSxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFFaEYsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFLLFFBQVEsQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQWlCLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUMsRUFBRTtRQUVwSyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRTtZQUNsQyxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDNUIsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFB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