var presence = new Presence({
    clientId: "696341580096733185"
});
var videoInfos = {
    duration: 0,
    currentTime: 0,
    paused: true
};
presence.on("iFrameData", videoData => {
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
        state: state,
    };
    if (detail === "Watching . . ." && videoInfos != null) {
        if (videoInfos.paused || (dataUpdated && videoInfos.currentTime === oldTime)) {
            presenceData.smallImageKey = "pause";
            presenceData.smallImageText = getTimestampAsString(videoInfos.duration, videoInfos.currentTime) + " left";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILElBQUksVUFBVSxHQUFHO0lBQ2YsUUFBUSxFQUFFLENBQUM7SUFDWCxXQUFXLEVBQUUsQ0FBQztJQUNkLE1BQU0sRUFBRSxJQUFJO0NBQ2IsQ0FBQztBQUNGLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxFQUFFO0lBQ3BDLFVBQVUsR0FBRyxTQUFTLENBQUM7SUFDdkIsV0FBVyxHQUFHLElBQUksQ0FBQztBQUNyQixDQUFDLENBQUMsQ0FBQztBQUNILElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztBQUNoQixJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUM7QUFDeEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFO0lBQzdCLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO0lBQ3JDLElBQUksTUFBTSxHQUFHLGdCQUFnQixDQUFDO0lBQzlCLElBQUksS0FBSyxDQUFDO0lBQ1YsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxtREFBbUQsQ0FBQyxDQUFDO0lBQzFGLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLENBQUMsV0FBVyxLQUFLLEtBQUssRUFBRTtRQUM5QyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsS0FBSyxHQUFHLG1CQUFtQixDQUFDO0tBQy9CO1NBQ0ksSUFBSSxHQUFHLEtBQUssR0FBRyxFQUFFO1FBQ2xCLEtBQUssR0FBRyx1QkFBdUIsQ0FBQztLQUNuQztTQUNJLElBQUksR0FBRyxLQUFLLGFBQWEsRUFBRTtRQUM1QixNQUFNLEdBQUcsa0JBQWtCLENBQUM7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