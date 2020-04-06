const presence = new Presence({
    clientId: `633637979952250881`
}), { pathname } = window.location, { hostname } = window.location, startTimestamp = Math.floor(Date.now() / 1000);
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
let episode, current, duration, paused, played;
presence.on("iFrameData", (data) => {
    current = data.current;
    duration = data.duration;
    paused = data.paused;
    played = data.played;
});
presence.on("UpdateData", async () => {
    const strings = await presence.getStrings({
        playing: "presence.playback.playing",
        paused: "presence.playback.paused",
        browsing: "presence.activity.browsing"
    });
    const presenceData = {
        largeImageKey: "animedao_lg"
    };
    if (hostname === `animedao26.stream` || hostname === `animedao28.stream`) {
        const title = document.querySelector("h2").textContent.trim();
        if ((episode = title.match(/\WEpisode\W\d{1,3}/)) != null) {
            presenceData.details = title.replace(episode[0], "");
            presenceData.state = `${episode[0]} - ${document.querySelector(`h4`).textContent}`;
        }
        else {
            presenceData.details = title;
        }
        if (played) {
            if (!paused) {
                const timestamps = getTimestamps(current, duration);
                presenceData.startTimestamp = timestamps[0];
                presenceData.endTimestamp = timestamps[1];
            }
            presenceData.smallImageKey = paused ? "pause" : "play";
            presenceData.smallImageText = paused
                ? (await strings).paused
                : (await strings).playing;
        }
    }
    else if (hostname === `animedao.com`) {
        presenceData.startTimestamp = startTimestamp;
        if (pathname === `/`) {
            presenceData.details = (await strings).browsing;
        }
        else if (pathname.startsWith(`/animelist`)) {
            presenceData.details = `Viewing the Animelist`;
        }
        else if (pathname.startsWith(`/genre`)) {
            const genre = document.querySelector(`h2`).textContent.trim();
            presenceData.details = `Viewing genres`;
            if (pathname !== `/genre`) {
                presenceData.state = `${genre.replace(genre.match(/Genre\W-\W/)[0], ``)}`;
            }
        }
        else if (pathname.startsWith(`/popular-anime`)) {
            presenceData.details = `Viewing popular anime`;
        }
        else if (pathname.startsWith(`/anime`)) {
            const title = document.querySelector(`h2`);
            presenceData.details = `Viewing an anime`;
            presenceData.state = `${title ? title.textContent.trim() : undefined}`;
        }
        else if (pathname.startsWith(`/search`)) {
            presenceData.details = `Searching`;
            presenceData.smallImageKey = `search`;
            presenceData.smallImageText = `Searching`;
        }
    }
    presence.setActivity(presenceData, true);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQzlCLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFDOUIsY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBT2pELFNBQVMsYUFBYSxDQUNwQixTQUFpQixFQUNqQixhQUFxQjtJQUVyQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHLGFBQWEsQ0FBQztJQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUVELElBQUksT0FBTyxFQUNULE9BQWUsRUFDZixRQUFnQixFQUNoQixNQUFlLEVBQ2YsTUFBZSxDQUFDO0FBRWxCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7SUFDakMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdkIsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDdkIsQ0FBQyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVks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