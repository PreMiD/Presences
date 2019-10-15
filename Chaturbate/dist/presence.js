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
    mediaKeys: false
}), prev, elapsed, path, strings = presence.getStrings({
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
    if (!video && !path.includes("/photo_videos/")) {
        data.details = (yield strings).browsing;
        data.smallImageKey = "search";
        data.smallImageText = (yield strings).browsing;
        if (path.includes("/p/")) {
            data.state = "Accounts";
        }
        else if (path.includes("/tag/")) {
            if (path.split("/")[3] === "" || path.split("/")[3] == null) {
                data.state = 'Tag : ' + path.split("/")[2];
            }
            else {
                var gender;
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
            data.smallImageKey = video.paused ? "pause" : "play",
                data.smallImageText = video.paused ? (yield strings).pause : (yield strings).play,
                data.startTimestamp = timestamps[0],
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
    else if (video && document.querySelector("#Iq a") && document.querySelector("#Iq a").textContent.includes("'s Cam")) {
        if (window.location.href !== prev) {
            prev = window.location.href;
            elapsed = Math.floor(Date.now() / 1000);
        }
        data.details = document.querySelector("#Iq a").textContent.replace("'s Cam", "");
        data.state = document.querySelector("#Pq > div > div:nth-child(7) > span:nth-child(2)").textContent;
        data.smallImageKey = "live";
        data.smallImageText = (yield strings).live;
        data.startTimestamp = elapsed;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ25CLENBQUMsRUFDRCxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFDaEIsT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDOUIsSUFBSSxFQUFFLDJCQUEyQjtJQUNqQyxLQUFLLEVBQUUsMEJBQTBCO0lBQ2pDLFFBQVEsRUFBRSw0QkFBNEI7SUFDdEMsSUFBSSxFQUFFLHdCQUF3QjtDQUNqQyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFTLEVBQUU7SUFDakMsSUFBSSxJQUFJLEdBQWlCO1FBQ3JCLGFBQWEsRUFBRSxJQUFJO0tBQ3RCLENBQUM7SUFFRixJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFFbEMsSUFBSSxLQUFLLEdBQXFCLFFBQVEsQ0FBQyxhQUFhLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUVoRixJQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1FBRTlDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUN4QyxJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztRQUM5QixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFFL0MsSUFBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBRXhCLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO1NBQ3hCO2FBQ0ksSUFBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBRS9CLElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUU7Z0JBQzNELElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDM0M7aUJBQ0k7Z0JBRUosSUFBSSxNQUFNLENBQUM7Z0JBRVgsUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUMzQixLQUFLLEdBQUc7d0JBQ1AsTUFBTSxHQUFHLFFBQVEsQ0FBQzt3QkFDbEIsTUFBTTtvQkFDUCxLQUFLLEdBQUc7d0JBQ1AsTUFBTSxHQUFHLE1BQU0sQ0FBQzt3QkFDaEIsTUFBTTtvQkFDUCxLQUFLLEdBQUc7d0JBQ1AsTUFBTSxHQUFHLFFBQVEsQ0FBQzt3QkFDbEIsTUFBTTtvQkFDUCxLQUFLLEdBQUc7d0JBQ1AsTUFBTSxHQUFHLE9BQU8sQ0FBQztpQkFDbEI7Z0JBRUQsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsTUFBTSxHQUFHLEdBQUcsQ0FBQzthQUNqRTtTQUNEO2FBRUk7WUFFSixRQUFRLElBQUksRUFBRTtnQkFDYixLQUFLLEdBQUc7b0JBQ1AsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUE7b0JBQzVCLE1BQU07Z0JBQ1AsS0FBSyxlQUFlO29CQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQTtvQkFDMUIsTUFBTTtnQkFDUCxLQUFLLGFBQWE7b0JBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFBO29CQUN4QixNQUFNO2dCQUNQLEtBQUssZUFBZTtvQkFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUE7b0JBQzFCLE1BQU07Z0JBQ1AsS0FBSyxjQUFjO29CQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQTtvQkFDekIsTUFBTTtnQkFDUCxLQUFLLFFBQVE7b0JBQ1osSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUE7b0JBQ25CLE1BQU07Z0JBQ1AsS0FBSyxxQkFBcUI7b0JBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFBO29CQUN6QixNQUFNO2dCQUNQLEtBQUssY0FBYztvQkFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUE7b0JBQ3pCLE1BQU07Z0JBQ1AsS0FBSyxlQUFlO29CQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQTtvQkFDMUIsTUFBTTtnQkFDUCxLQUFLLHVCQUF1QjtvQkFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxxQkFBcUIsQ0FBQTtvQkFDbEMsTUFBTTtnQkFDUCxLQUFLLHFCQUFxQjtvQkFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxtQkFBbUIsQ0FBQTtvQkFDaEMsTUFBTTtnQkFDUCxLQUFLLHFCQUFxQjtvQkFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxtQkFBbUIsQ0FBQTtvQkFDaEMsTUFBTTtnQkFDUCxLQUFLLGNBQWM7b0JBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFBO29CQUN6QixNQUFNO2dCQUNQLEtBQUssdUJBQXVCO29CQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLHFCQUFxQixDQUFBO29CQUNsQyxNQUFNO2dCQUNQLEtBQUssc0JBQXNCO29CQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLG9CQUFvQixDQUFBO29CQUNqQyxNQUFNO2dCQUNQLEtBQUssV0FBVztvQkFDZixJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQTtvQkFDdEIsTUFBTTtnQkFDUCxLQUFLLGVBQWU7b0JBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFBO29CQUMzQixNQUFNO2dCQUNQLEtBQUssWUFBWTtvQkFDaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUE7b0JBQ3ZCLE1BQU07Z0JBQ1AsS0FBSyxlQUFlO29CQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQTtvQkFDMUIsTUFBTTtnQkFDUCxLQUFLLGFBQWE7b0JBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFBO29CQUN4QixNQUFNO2dCQUNQLEtBQUssV0FBVyxDQUFDO2dCQUNqQixLQUFLLFFBQVEsQ0FBQztnQkFDZCxLQUFLLFNBQVMsQ0FBQztnQkFDZixLQUFLLG1CQUFtQixDQUFDO2dCQUN6QixLQUFLLFFBQVEsQ0FBQztnQkFDZCxLQUFLLFFBQVEsQ0FBQztnQkFDZCxLQUFLLGtCQUFrQixDQUFDO2dCQUN4QixLQUFLLFlBQVksQ0FBQztnQkFDbEIsS0FBSyxjQUFjLENBQUM7Z0JBQ3BCLEtBQUssV0FBVyxDQUFDO2dCQUNqQixLQUFLLG1CQUFtQjtvQkFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxvQkFBb0IsQ0FBQTtvQkFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7b0JBQy9CLElBQUksQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDO29CQUNoQyxNQUFNO2dCQUNQLEtBQUssUUFBUTtvQkFDWixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQTtvQkFDbkIsTUFBTTtnQkFDUCxLQUFLLG9CQUFvQjtvQkFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUE7b0JBQzNCLE1BQU07Z0JBQ1AsS0FBSywrQkFBK0I7b0JBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUcsd0JBQXdCLENBQUE7b0JBQ3JDLE1BQU07Z0JBQ1AsS0FBSyw4QkFBOEI7b0JBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcseUJBQXlCLENBQUE7b0JBQ3RDLE1BQU07Z0JBQ1AsS0FBSyx1QkFBdUI7b0JBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsb0JBQW9CLENBQUE7b0JBQ2pDLE1BQU07Z0JBQ1AsS0FBSyxxQkFBcUI7b0JBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFBO29CQUMzQixNQUFNO2dCQUNQO29CQUNDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO2FBRXJCO1NBRUo7S0FFRDtTQUNJLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1FBQ3pDLElBQUcsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO1lBRWhELElBQUksQ0FBQyxPQUFPLEdBQUcsb0JBQW9CLENBQUE7WUFDbkMsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQztZQUN0RCxJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztZQUM5QixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUM7U0FFbEQ7YUFDSSxJQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLEVBQUU7WUFFdkQsSUFBSSxVQUFVLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFFdEYsSUFBSSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQTtZQUNoQyxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDO1lBQ3pELElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNO2dCQUM5QyxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxJQUFJO2dCQUNqRixJQUFJLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBRXZDLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDUixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7Z0JBQzNCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQzthQUM1QjtTQUVQO2FBQ0k7WUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUM7WUFDeEMsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUE7WUFDeEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7WUFDOUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDO1NBRWxEO0tBQ0Q7U0FDSSxJQUFJLEtBQUssSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUVwSCxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRTtZQUNsQyxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDNUIsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQ3hDO1FBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxrREFBa0QsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUNwRyxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztRQUM1QixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDM0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUM7S0FFakM7U0FDSTtRQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUN4QyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztRQUNwQixJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztRQUM5QixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUM7S0FFbEQ7SUFFRCxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRTVCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFFSCxTQUFTLGFBQWEsQ0FBQyxTQUFpQixFQUFFLGFBQXFCO0lBQzdELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMzQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxTQUFTLEdBQUcsYUFBYSxDQUFDO0lBQ3ZFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNqRCxDQUFDIn0=