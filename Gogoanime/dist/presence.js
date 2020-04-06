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
});
presence.on("UpdateData", () => {
    var url = document.location.pathname;
    var detail = "Browsing . . .";
    var state;
    var smallImage = "browsing";
    const is404 = document.querySelector("#wrapper_bg > section > section.content_left > h1");
    if (is404 != null && is404.textContent === "404") {
        detail = "404";
        state = "Page non existant";
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
        smallImage = videoInfos.paused ? "pause" : "play";
    }
    var presenceData = {
        largeImageKey: "logo",
        smallImageKey: smallImage,
        details: detail,
        state: state,
    };
    if (detail === "Watching . . ." && videoInfos != null) {
        if (videoInfos.paused) {
            presenceData.smallImageText = getTimestampAsString(videoInfos.duration, videoInfos.currentTime) + " left";
            delete presenceData.endTimestamp;
        }
        else {
            presenceData.endTimestamp = getEndTime(Math.floor(videoInfos.currentTime), Math.floor(videoInfos.duration));
        }
        presence.setActivity(presenceData, !videoInfos.paused);
    }
    else {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksVUFBVSxHQUFHO0lBQ2YsUUFBUSxFQUFFLENBQUM7SUFDWCxXQUFXLEVBQUUsQ0FBQztJQUNkLE1BQU0sRUFBRSxJQUFJO0NBQ2IsQ0FBQztBQUVGLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxFQUFFO0lBQ3BDLFVBQVUsR0FBRyxTQUFTLENBQUM7QUFDekIsQ0FBQyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUU7SUFDN0IsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFDckMsSUFBSSxNQUFNLEdBQUcsZ0JBQWdCLENBQUM7SUFDOUIsSUFBSSxLQUFjLENBQUM7SUFDbkIsSUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQzVCLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsbURBQW1ELENBQUMsQ0FBQztJQUMxRixJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLFdBQVcsS0FBSyxLQUFLLEVBQUM7UUFDNUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNmLEtBQUssR0FBRyxtQkFBbUIsQ0FBQztLQUNoQztTQUVJLElBQUcsR0FBRyxLQUFLLEdBQUcsRUFBQztRQUNsQixLQUFLLEdBQUcsdUJBQXVCLENBQUM7S0FDakM7U0FFSSxJQUFHLEdBQUcsS0FBSyxhQUFhLEVBQUU7UUFDN0IsTUFBTSxHQUFHLGtCQUFrQixDQUFDO0tBQzdCO1NBRUksSUFBRyxHQUFHLEtBQUssZ0JBQWdCLEVBQUU7UUFDaEMsTUFBTSxHQUFHLGtC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