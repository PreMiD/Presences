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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsUUFBUSxFQUFFLDRCQUE0QjtDQUN0QyxDQUFDLEVBQ0YsRUFBRSxHQUFZLEtBQUssRUFDbkIsS0FBSyxHQUFHO0lBQ1AsUUFBUSxFQUFFLENBQUM7SUFDWCxXQUFXLEVBQUUsQ0FBQztJQUNkLE1BQU0sRUFBRSxJQUFJO0NBQ1osQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxFQUFFO0lBQ2hDLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDZCxDQUFDLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksSUFBSSxHQUFpQjtRQUN4QixhQUFhLEVBQUUsS0FBSztLQUNwQixDQUFDO0lBRUYsSUFDQyxLQUFLLElBQUksSUFBSTtRQUNiLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7UUFDdEIsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUMzQztRQUNELEVBQUU7WUFDRCxRQUFRLENBQUMsYUFBYSxDQUFDLDZCQUE2QixDQUFDO2dCQUNyRCxRQUFRO3FCQUNOLGFBQWEsQ0FBQyw2QkFBNkIsQ0FBQztxQkFDNUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7Z0JBQzNCLENBQUMsQ0FBQyxJQUFJO2dCQUNOLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFFVixJQUFJ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