const presence = new Presence({
    clientId: `633637979952250881`
}), { pathname } = window.location, { hostname } = window.location, startTimestamp = Math.floor(Date.now() / 1000);
let episode, current, duration, paused, played;
presence.on("iFrameData", data => {
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
function getTimestamps(curr, dura) {
    let startTime = Math.floor(Date.now() / 1000), duration = Math.floor(startTime - curr + dura);
    return [startTime, duration];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQzlCLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFDOUIsY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ2hELElBQUksT0FBTyxFQUNWLE9BQWUsRUFDZixRQUFnQixFQUNoQixNQUFlLEVBQ2YsTUFBZSxDQUFDO0FBRWpCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxFQUFFO0lBQ2hDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3ZCLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQ3RCLENBQUMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDcEMsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxDQUFDO1FBQ3pDLE9BQU8sRUFBRSwyQkFBMkI7UUFDcEMsTUFBTSxFQUFFLDBCQUEwQjtRQUNsQyxRQUFRLEVBQUUsNEJBQTRCO0tBQ3RDLENBQUMsQ0FBQztJQUVILE1BQU0sWUFBWSxHQUFpQjtRQUNsQyxhQUFhLEVBQUUsYUFBYTtLQUM1QixDQUFDO0lBQ0YsSUFBSSxRQUFRLEtBQUssbUJBQW1CLElBQUksUUFBUSxLQUFLLG1CQUFtQixFQUFFO1FBQ3pF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