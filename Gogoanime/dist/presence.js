var presence = new Presence({
    clientId: "696341580096733185"
});
var videoInfos = {
    duration: 0,
    currentTime: 0,
    paused: true
};
presence.on("iFrameData", (videoData) => {
    videoInfos = videoData;
    dataUpdated = true;
});
var oldTime = 0;
var dataUpdated = false;
presence.on("UpdateData", () => {
    var url = document.location.pathname;
    var detail = "Browsing . . .";
    var state;
    const is404 = document.querySelector("#wrapper_bg > section > section.content_left > h1");
    if (is404 != null && is404.textContent === "404") {
        detail = "404";
        state = "Non-existent page";
    }
    else if (url === "/") {
        state = "Recent animes release";
    }
    else if (url === "/login.html") {
        detail = "Logging in . . .";
    }
    else if (url === "/register.html") {
        detail = "Signing up . . .";
    }
    else if (url === "/user/bookmark") {
        detail = "Managing bookmarks";
    }
    else if (url === "/anime-list.html") {
        state = "Animes list";
    }
    else if (url === "//search.html") {
        detail = "Searching . . .";
        let anime = decodeURI(document.location.href).split("=")[1].split(" ");
        state = "Anime: " + formatAnime(anime);
    }
    else if (url === "/new-season.html") {
        state = "Newest animes";
    }
    else if (url === "/anime-movies.html") {
        state = "Animes' movies";
    }
    else if (url === "/popular.html") {
        state = "Popular animes";
    }
    else if (url.includes("/genre/")) {
        let genre = url.split("/").pop();
        state = "Anime genre: " + upperCaseFirstChar(genre);
    }
    else if (url.includes("/category/")) {
        let anime = url.split("/").pop().split("-");
        state = "Anime: " + formatAnime(anime);
    }
    else {
        detail = "Watching . . .";
        let anime = url.split("/").pop().split("-");
        let episode = anime[anime.length - 2] + " " + anime[anime.length - 1];
        anime = anime.slice(0, anime.length - 2);
        state = formatAnime(anime) + ": " + upperCaseFirstChar(episode);
    }
    var presenceData = {
        largeImageKey: "logo",
        details: detail,
        state: state
    };
    if (detail === "Watching . . ." && videoInfos != null) {
        if (videoInfos.paused ||
            (dataUpdated && videoInfos.currentTime === oldTime)) {
            presenceData.smallImageKey = "pause";
            presenceData.smallImageText =
                getTimestampAsString(videoInfos.duration, videoInfos.currentTime) +
                    " left";
            delete presenceData.endTimestamp;
        }
        else {
            presenceData.smallImageKey = "play";
            presenceData.endTimestamp = getEndTime(Math.floor(videoInfos.currentTime), Math.floor(videoInfos.duration));
            oldTime = videoInfos.currentTime;
            dataUpdated = false;
        }
        presence.setActivity(presenceData, !videoInfos.paused);
    }
    else {
        presenceData.smallImageKey = "browsing";
        presenceData.startTimestamp = new Date().getTime();
        presence.setActivity(presenceData);
    }
});
function formatAnime(anime) {
    let format = "";
    for (var i = 0; i < anime.length; i++) {
        let part = anime[i];
        format += upperCaseFirstChar(part) + " ";
    }
    return format.replace("Dub", "(Dub)");
}
function upperCaseFirstChar(word) {
    return word[0].toUpperCase() + word.slice(1, word.length);
}
function getEndTime(current, duration) {
    let startTime = Date.now();
    let endTime = Math.floor(startTime / 1000) - current + duration;
    return endTime;
}
function getTimestampAsString(duration, current) {
    return new Date((duration - current) * 1000).toISOString().substr(11, 8);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILElBQUksVUFBVSxHQUFHO0lBQ2YsUUFBUSxFQUFFLENBQUM7SUFDWCxXQUFXLEVBQUUsQ0FBQztJQUNkLE1BQU0sRUFBRSxJQUFJO0NBQ2IsQ0FBQztBQUNGLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsU0FBUyxFQUFFLEVBQUU7SUFDdEMsVUFBVSxHQUFHLFNBQVMsQ0FBQztJQUN2QixXQUFXLEdBQUcsSUFBSSxDQUFDO0FBQ3JCLENBQUMsQ0FBQyxDQUFDO0FBQ0gsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBQ2hCLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztBQUN4QixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUU7SUFDN0IsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFDckMsSUFBSSxNQUFNLEdBQUcsZ0JBQWdCLENBQUM7SUFDOUIsSUFBSSxLQUFhLENBQUM7SUFDbEIsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDbEMsbURBQW1ELENBQ3BELENBQUM7SUFDRixJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLFdBQVcsS0FBSyxLQUFLLEVBQUU7UUFDaEQsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNmLEtBQUssR0FBRyxtQkFBbUIsQ0FBQztLQUM3QjtTQUFNLElBQUksR0FBRyxLQUFLLEdBQUcsRUFBRTtRQUN0QixLQUFLLEdBQUcsdUJBQXVCLENBQUM7S0FDakM7U0FBTSxJQUFJLEdBQUcsS0FBSyxhQUFhLEVBQUU7UUFDaEMsTUFBTSxHQUFHLGtCQUFr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