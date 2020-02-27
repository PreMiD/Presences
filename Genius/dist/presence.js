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
    clientId: "630480419598499840",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var elapsed = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let data = {
        largeImageKey: "genius-logo"
    };
    var lyricCheck = document.querySelector(".song_body-lyrics") ? true : false;
    var profileCheck = document.querySelector(".profile_identity-name_iq_and_role_icon") ? true : false;
    var path = document.location.pathname;
    if (path == "/") {
        data.details = "Viewing Homepage";
        data.startTimestamp = elapsed;
    }
    else if (path.startsWith("/a/")) {
        var article = document.querySelector("h1.article_title").textContent;
        if (article.length > 128) {
            article.substring(0, 125) + "...";
        }
        data.details = "Viewing an Article";
        data.state = article;
        data.startTimestamp = elapsed;
    }
    else if (path.startsWith("/artists/")) {
        var artist = document.querySelector("h1.profile_identity-name_iq_and_role_icon").innerHTML.split("<")[0];
        data.details = "Viewing Artist Profile";
        data.state = artist;
        data.startTimestamp = elapsed;
    }
    else if (path.startsWith("/albums/")) {
        var album = document.querySelector("h1.header_with_cover_art-primary_info-title").textContent;
        data.details = "Viewing an Album";
        data.state = album;
        data.startTimestamp = elapsed;
    }
    else if (lyricCheck) {
        var song = document.querySelector("h1.header_with_cover_art-primary_info-title").textContent;
        var artist = document.querySelector("a.header_with_cover_art-primary_info-primary_artist").textContent;
        data.details = "Viewing Lyrics";
        data.state = artist + " - " + song;
        data.startTimestamp = elapsed;
    }
    else if (profileCheck) {
        var user = document.querySelector("h1.profile_identity-name_iq_and_role_icon").innerHTML.split("<")[0];
        data.details = "Viewing a Profile";
        data.state = user;
        data.startTimestamp = elapsed;
    }
    else if (path.startsWith("/videos/")) {
        var video = document.querySelector("video.vjs-tech");
        var title = document.querySelector("h1.article_title").textContent;
        if (title.length > 128) {
            title.substring(0, 125) + "...";
        }
        data.details = "Playing a Video";
        data.state = title;
        if (video && !isNaN(video.duration)) {
            var timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
        }
        data.smallImageKey = video.paused ? "pause" : "play";
        data.smallImageText = video.paused ? (yield strings).pause : (yield strings).play;
        data.startTimestamp = timestamps[0],
            data.endTimestamp = timestamps[1];
        if (video.paused) {
            delete data.startTimestamp;
            delete data.endTimestamp;
        }
    }
    else if (path.startsWith("/search")) {
        var search = document.querySelector("h2.search_results_page-header").textContent;
        data.details = "Searching for:";
        data.state = search;
        data.smallImageKey = "search";
        data.smallImageText = "Searching";
        data.startTimestamp = elapsed;
    }
    else {
        data.details = "Somewhere on-site";
        data.startTimestamp = elapsed;
    }
    presence.setActivity(data);
}));
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ25CLENBQUMsRUFFRSxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM5QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDcEMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUMsSUFBSSxDQUFDLENBQUM7QUFFMUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO0lBRWpDLElBQUksSUFBSSxHQUFpQjtRQUNyQixhQUFhLEVBQUUsYUFBYTtLQUMvQixDQUFDO0lBRUYsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUM1RSxJQUFJLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHlDQUF5QyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ3BHLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO0lBQ3RDLElBQUksSUFBSSxJQUFJLEdBQUcsRUFBRTtRQUNiLElBQUksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUE7UUFDakMsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUE7S0FDaEM7U0FBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDL0IsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUNyRSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFO1lBQ3RCLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQTtTQUNuQztRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsb0JBQW9CLENBQUE7UUFDbkMsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7UUFDckIsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUE7S0FDaEM7U0FBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDckMsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekcsSUFBSSxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQTtRQUN2QyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztRQUNwQixJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQTtLQUNoQztTQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUNwQyxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLDZDQUE2QyxDQUFDLENBQUMsV0FBVyxDQUFDO1FBQzlGLElBQUksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUE7UUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUE7S0FDaEM7U0FBTSxJQUFJLFVBQVUsRUFBRTtRQUNuQixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLDZDQUE2QyxDQUFDLENBQUMsV0FBVyxDQUFDO1FBQzdGLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMscURBQXFELENBQUMsQ0FBQyxXQUFXLENBQUM7UUFDdkcsSUFBSSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQTtRQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ25DLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFBO0tBQ2hDO1NBQU0sSUFBSSxZQUFZLEVBQUU7UUFDckIsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkcsSUFBSSxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQTtRQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQTtLQUNoQztTQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUNwQyxJQUFJLEtBQUssR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxXQUFXLENBQUM7UUFDbkUsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTtZQUNwQixLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUE7U0FDakM7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFBO1FBQ2hDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNqQyxJQUFJLFVBQVUsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztTQUM1RjtRQUVELElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDckQsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ2xGLElBQUksQ0FBQyxjQUFjLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUVqQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDZCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7WUFDM0IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBQzVCO0tBRUo7U0FBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDbkMsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUNqRixJQUFJLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFBO1FBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1FBQzlCLElBQUksQ0FBQyxjQUFjLEdBQUcsV0FBVyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFBO0tBQ2hDO1NBQU07UUFDSCxJQUFJLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFBO1FBQ2xDLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFBO0tBQ2hDO0lBQ0QsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMvQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBRUgsU0FBUyxhQUFhLENBQUMsU0FBaUIsRUFBRSxhQUFxQjtJQUMzRCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHLGFBQWEsQ0FBQztJQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDbkQsQ0FBQyJ9