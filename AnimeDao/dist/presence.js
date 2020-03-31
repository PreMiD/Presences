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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQzlCLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFDOUIsY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ2pELElBQUksT0FBTyxFQUNULE9BQWUsRUFDZixRQUFnQixFQUNoQixNQUFlLEVBQ2YsTUFBZSxDQUFDO0FBRWxCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxFQUFFO0lBQy9CLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3ZCLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxDQUFDO1FBQ3hDLE9BQU8sRUFBRSwyQkFBMkI7UUFDcEMsTUFBTSxFQUFFLDBCQUEwQjtRQUNsQyxRQUFRLEVBQUUsNEJBQTRCO0tBQ3ZDLENBQUMsQ0FBQztJQUVILE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsYUFBYTtLQUM3QixDQUFDO0lBQ0YsSUFBSSxRQUFRLEtBQUssbUJBQW1CLElBQUksUUFBUSxLQUFLLG1CQUFtQixFQUFFO1FBQ3hF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