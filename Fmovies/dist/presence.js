var presence = new Presence({
    clientId: "630857591744102461"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
}), tv = false, video = {
    duration: 0,
    currentTime: 0,
    paused: true
};
presence.on("iFrameData", data => {
    video = data;
});
presence.on("UpdateData", async () => {
    var data = {
        largeImageKey: "fml"
    };
    if (video != null &&
        !isNaN(video.duration) &&
        document.location.pathname.includes("/film")) {
        tv =
            document.querySelector("#movie li:nth-child(2) span") &&
                document
                    .querySelector("#movie li:nth-child(2) span")
                    .textContent.includes("TV")
                ? true
                : false;
        var timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
        if (tv) {
            let name = document
                .querySelector("#movie li.active span")
                .textContent.trim();
            let date = document.querySelector("#info  div dl:nth-child(2) > dd:nth-child(4)").textContent;
            data.details =
                name.replace(/[_0-9]+$/, "") +
                    " (" +
                    date.slice(0, date.indexOf("-")) +
                    ")";
            data.state =
                (/\d$/.test(name)
                    ? "S" +
                        document
                            .querySelector("#movie li.active span")
                            .textContent.split(" ")
                            .pop() +
                        ":"
                    : "") +
                    "E" +
                    document.querySelector("#servers li a.active").textContent;
        }
        else {
            let date = document.querySelector("#info  div dl:nth-child(2) > dd:nth-child(4)").textContent;
            data.details = document.querySelector("#movie li.active span").textContent;
            data.state = date.slice(0, date.indexOf("-"));
        }
        (data.smallImageKey = video.paused ? "pause" : "play"),
            (data.smallImageText = video.paused
                ? (await strings).pause
                : (await strings).play),
            (data.startTimestamp = timestamps[0]),
            (data.endTimestamp = timestamps[1]);
        if (video.paused) {
            delete data.startTimestamp;
            delete data.endTimestamp;
        }
        presence.setActivity(data, !video.paused);
    }
    else {
        data.details = (await strings).browsing;
        data.smallImageKey = "search";
        data.smallImageText = (await strings).browsing;
        presence.setActivity(data);
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsUUFBUSxFQUFFLDRCQUE0QjtDQUN2QyxDQUFDLEVBQ0YsRUFBRSxHQUFZLEtBQUssRUFDbkIsS0FBSyxHQUFHO0lBQ04sUUFBUSxFQUFFLENBQUM7SUFDWCxXQUFXLEVBQUUsQ0FBQztJQUNkLE1BQU0sRUFBRSxJQUFJO0NBQ2IsQ0FBQztBQUVKLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxFQUFFO0lBQy9CLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDZixDQUFDLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksSUFBSSxHQUFpQjtRQUN2QixhQUFhLEVBQUUsS0FBSztLQUNyQixDQUFDO0lBRUYsSUFDRSxLQUFLLElBQUksSUFBSTtRQUNiLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7UUFDdEIsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUM1QztRQUNBLEVBQUU7WUFDQSxRQUFRLENBQUMsYUFBYSxDQUFDLDZCQUE2QixDQUFDO2dCQUNyRCxRQUFRO3FCQUNMLGFBQWEsQ0FBQyw2QkFBNkIsQ0FBQztxQkFDNUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7Z0JBQzNCLENBQUMsQ0FBQyxJQUFJO2dCQUNOLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFFWixJQUFJ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