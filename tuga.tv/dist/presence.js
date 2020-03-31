const presence = new Presence({
    clientId: "630125847134863371"
});
const { pathname } = window.location, startTimestamp = Math.floor(Date.now() / 1000);
let current, duration, paused, played;
const strings = presence.getStrings({
    playing: "presence.playback.playing",
    paused: "presence.playback.paused",
    browsing: "presence.activity.browsing"
});
presence.on("iFrameData", data => {
    current = data.current;
    duration = data.duration;
    paused = data.paused;
    played = data.played;
});
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "tuga_lg",
        details: (await strings).browsing,
        startTimestamp
    };
    if (pathname === `/`) {
        presenceData.state = `Home page`;
    }
    else if (pathname.startsWith(`/filmes`)) {
        presenceData.state = `Filmes`;
    }
    else if (pathname.startsWith(`/series`)) {
        presenceData.state = `Séries`;
    }
    else if (pathname.startsWith(`/favoritos`)) {
        presenceData.state = `Favoritos`;
    }
    else if (pathname.startsWith(`/filme`) || pathname.startsWith(`/serie`)) {
        presenceData.startTimestamp = undefined;
        const title = document.querySelector(`h3`).textContent;
        const episode = title.match(/((S|E)\d{1,2}){2}/);
        presenceData.details = pathname.startsWith(`/serie`)
            ? title.replace(episode[0], "")
            : title;
        presenceData.state = pathname.startsWith(`/serie`)
            ? `${episode[0]}`
            : undefined;
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
    presence.setActivity(presenceData, true);
});
function getTimestamps(curr, dura) {
    let startTime = Math.floor(Date.now() / 1000), duration = Math.floor(startTime - curr + dura);
    return [startTime, duration];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLENBQUMsUUFBUSxFQUNsQyxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDakQsSUFBSSxPQUFlLEVBQUUsUUFBZ0IsRUFBRSxNQUFlLEVBQUUsTUFBZSxDQUFDO0FBRXhFLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDbEMsT0FBTyxFQUFFLDJCQUEyQjtJQUNwQyxNQUFNLEVBQUUsMEJBQTBCO0lBQ2xDLFFBQVEsRUFBRSw0QkFBNEI7Q0FDdkMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLEVBQUU7SUFDL0IsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdkIsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDdkIsQ0FBQyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLFNBQVM7UUFDeEIsT0FBTyxFQUFFLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxRQUFRO1FBQ2pDLGNBQWM7S0FDZixDQUFDO0lBQ0YsSUFBSSxRQUFRLEtBQUssR0FBRyxFQUFFO1FBQ3BCLFlBQVksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO0tBQ2xDO1NBQU0sSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ3pDLFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO0tBQy9CO1NBQU0sSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ3pDLFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO0tBQy9CO1NBQU0sSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFO1FBQzVDLFlBQVksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO0tBQ2xDO1NBQU0sSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDekUsWUFBWSxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUM7UUFDeEMsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUM7UUFDdkQsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2pELFlBQVksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFDbEQsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUMvQixDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ1YsWUFBWSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUNoRCxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDakIsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNkLElBQUksTUFBTSxFQUFFO1lBQ1YsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDWCxNQUFNLFVBQVUsR0FBRyxhQUFhLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNwRCxZQUFZLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUMsWUFBWSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDM0M7WUFDRCxZQUFZLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDdkQsWUFBWSxDQUFDLGNBQWMsR0FBRyxNQUFNO2dCQUNsQyxDQUFDLENBQUMsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLE1BQU07Z0JBQ3hCLENBQUMsQ0FBQyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDO1NBQzdCO0tBQ0Y7SUFDRCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMzQyxDQUFDLENBQUMsQ0FBQztBQUVILFNBQVMsYUFBYSxDQUFDLElBQVksRUFBRSxJQUFZO0lBQy9DLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUMzQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ2pELE9BQU8sQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDL0IsQ0FBQyJ9