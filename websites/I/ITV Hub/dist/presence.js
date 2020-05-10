const presence = new Presence({
    clientId: "645290651604221999"
});
function getTimestamps(videoTime, videoDuration) {
    const startTime = Date.now();
    const endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "itv_logo",
        startTimestamp: new Date().getTime()
    };
    const path = document.location.pathname;
    if (path === "/") {
        presenceData.details = "Browsing ITV Hub";
        presenceData.state = "Home Page";
    }
    else if (path === "/hub/itv") {
        const show = document.getElementsByClassName("schedule__title--now")[0]
            .innerHTML;
        presenceData.details = "Watching ITV live";
        presenceData.state = show;
    }
    else if (path === "/hub/itv2") {
        const show = document.getElementsByClassName("schedule__title--now")[0]
            .innerHTML;
        presenceData.details = "Watching ITV2 live";
        presenceData.state = show;
    }
    else if (path === "/hub/itvbe") {
        const show = document.getElementsByClassName("schedule__title--now")[0]
            .innerHTML;
        presenceData.details = "Watching ITVBe live";
        presenceData.state = show;
    }
    else if (path === "/hub/itv3") {
        const show = document.getElementsByClassName("schedule__title--now")[0]
            .innerHTML;
        presenceData.details = "Watching ITV3 live";
        presenceData.state = show;
    }
    else if (path === "/hub/itv4") {
        const show = document.getElementsByClassName("schedule__title--now")[0]
            .innerHTML;
        presenceData.details = "Watching ITV4 live";
        presenceData.state = show;
    }
    else if (path === "/hub/citv") {
        const show = document.getElementsByClassName("schedule__title--now")[0]
            .innerHTML;
        presenceData.details = "Watching CITV live";
        presenceData.state = show;
    }
    else if (path === "/hub/tv-guide") {
        presenceData.details = "Browsing ITV";
        presenceData.state = "Viewing the TV-Guide";
    }
    else if (path === "/hub/shows") {
        presenceData.details = "Browsing ITV";
        presenceData.state = "Viewing shows";
    }
    else if (path === "/hub/categories") {
        presenceData.details = "Browsing ITV";
        presenceData.state = "Viewing categories";
    }
    else if (path.startsWith("/hub/categories/")) {
        const category = path.split("/")[path.split("/").length - 1];
        presenceData.details = "Browsing ITV";
        presenceData.state = `Viewing ${category} category`;
    }
    else if (/^[-+]?[0-9A-Fa-f]+\.?[0-9A-Fa-f]*?$/.test(path.split("/")[path.split("/").length - 1])) {
        delete presenceData.startTimestamp;
        const showDetails = {
            name: document.getElementById("programme-title").innerText,
            episode: document
                .getElementsByClassName("episode-info__episode-title")[0]
                .textContent.trim()
        };
        const video = document.getElementsByTagName("video")[0];
        if (!video.paused) {
            const timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
            presenceData.details = `Watching ${showDetails.name}`;
            presenceData.state = showDetails.episode;
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
            presenceData.smallImageKey = "play";
            presenceData.smallImageText = "Playing";
        }
        else {
            presenceData.details = `Watching ${showDetails.name}`;
            presenceData.state = showDetails.episode;
            presenceData.smallImageKey = "pause";
            presenceData.smallImageText = "Paused";
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFNBQVMsYUFBYSxDQUNwQixTQUFpQixFQUNqQixhQUFxQjtJQUVyQixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDN0IsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHLGFBQWEsQ0FBQztJQUN6RSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUVELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLFVBQVU7UUFDekIsY0FBYyxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFO0tBQ3JDLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUV4QyxJQUFJLElBQUksS0FBSyxHQUFHLEVBQUU7UUFDaEIsWUFBWSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztRQUMxQyxZQUFZLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztLQUNsQztTQUFNLElBQUksSUFBSSxLQUFLLFVBQVUsRUFBRTtRQUM5QixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsc0JBQXNCLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDcEUsU0FBUyxDQUFDO1FBQ2IsWUFBWSxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQztRQUMzQyxZ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