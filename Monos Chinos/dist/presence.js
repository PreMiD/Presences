const presence = new Presence({
    clientId: "707389880505860156"
});
const strings = presence.getStrings({
    playing: "presence.playback.playing",
    paused: "presence.playback.paused",
    browsing: "presence.activity.browsing",
    searching: "presence.activity.searching",
    episode: "presence.media.info.episode"
});
let video = null;
let lastVideoOption = 1;
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
presence.on("iFrameData", async (context) => {
    video = context;
});
presence.on("UpdateData", async () => {
    const data = {
        largeImageKey: "logo"
    };
    const browsingData = {
        largeImageKey: "logo",
        details: (await strings).browsing,
        smallImageKey: "browsing",
        smallImageText: (await strings).browsing
    };
    const actions = [
        {
            id: "episode",
            path: "/ver",
            text: (await strings).playing
        },
        {
            id: "seasonList",
            path: "/emision",
            text: "viendo lista de emisión",
            icon: "season"
        },
        {
            id: "directory",
            path: "/animes",
            text: "viendo el directorio",
            icon: "directory"
        },
        {
            id: "directoryAnime",
            path: "/anime/",
            text: "viendo lista de episodios",
            icon: "directory"
        },
        {
            id: "search",
            path: "/search",
            text: (await strings).searching,
            icon: "search"
        }
    ];
    let action = null;
    for (const [i, info] of actions.entries()) {
        if (document.location.pathname.startsWith(info.path)) {
            action = actions[i];
            break;
        }
    }
    if (action === null) {
        Object.assign(data, browsingData);
    }
    else if (action.id == "episode") {
        const detailsPattern = /^([^\d]+).* (\d+).+$/;
        const detailsMatch = document
            .querySelector(".Title-epi")
            .textContent.match(detailsPattern);
        if (!detailsMatch) {
            return presence.setActivity(browsingData);
        }
        const [title, episode] = detailsMatch.slice(1);
        Object.assign(data, {
            details: title,
            state: (await strings).episode.replace("{0}", episode),
            smallImageKey: "browsing",
            smallImageText: "viendo el capitulo"
        });
        const currentOptionElement = document.querySelector(".TPlayerNv > .Button.Current");
        const currentOption = currentOptionElement
            ? parseInt(currentOptionElement
                .getAttribute("data-tplayernv")
                .match(/Opt(\d+)/i)[1])
            : -1;
        if (currentOption !== -1 && currentOption !== lastVideoOption) {
            lastVideoOption = currentOption;
            video = null;
        }
        if (!video || (video && video.ended)) {
            return presence.setActivity(data);
        }
        const [startTimestamp, endTimestamp] = getTimestamps(Math.floor(video.elapsed), Math.floor(video.duration));
        Object.assign(data, {
            smallImageKey: video.paused ? "paused" : "playing",
            smallImageText: (await strings)[video.paused ? "paused" : "playing"]
        });
        if (!video.paused) {
            Object.assign(data, {
                startTimestamp,
                endTimestamp
            });
        }
    }
    else {
        if (document.location.pathname.includes("/anime/") &&
            document.querySelector("h1.Title")) {
            data.state = document.querySelector("h1.Title").textContent;
        }
        Object.assign(data, {
            details: action.text,
            smallImageKey: action.icon,
            smallImageText: action.text
        });
    }
    presence.setActivity(data);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFjQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDbEMsT0FBTyxFQUFFLDJCQUEyQjtJQUNwQyxNQUFNLEVBQUUsMEJBQTBCO0lBQ2xDLFFBQVEsRUFBRSw0QkFBNEI7SUFDdEMsU0FBUyxFQUFFLDZCQUE2QjtJQUN4QyxPQUFPLEVBQUUsNkJBQTZCO0NBQ3ZDLENBQUMsQ0FBQztBQUNILElBQUksS0FBSyxHQUFpQixJQUFJLENBQUM7QUFDL0IsSUFBSSxlQUFlLEdBQUcsQ0FBQyxDQUFDO0FBT3hCLFNBQVMsYUFBYSxDQUNwQixTQUFpQixFQUNqQixhQUFxQjtJQUVyQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHLGFBQWEsQ0FBQztJQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUVELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRTtJQUMxQyxLQUFLLEdBQUcsT0FBTyxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxJQUFJLEdBQWlCO1FBQ3pCLGFBQWEsRUFBRSxNQUFNO0tBQ3RCLENBQUM7SUFDRixNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLE1BQU07UUFDckIsT0FBTyxFQUFFLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxRQUFRO1FBQ2pDLGFBQWEsRUFBRSxVQUFVO1FBQ3pCLGNBQWMsRUFBRSxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsUUFBUTtLQUN6QyxDQUFDO0lBQ0YsTUFBTSxPQUFPLEdBQWlCO1FBQzVCO1lBQ0UsRUFBRSxFQUFFLFNBQVM7WUFDYixJQUFJLEVBQUUsTUFBTTtZQUNaLElBQUksRUFBRSxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsT0FBTztTQUM5QjtRQUNEO1lBQ0UsRUFBRSxFQUFFLFlBQVk7WUFDaEIsSUFBSSxFQUFFLFVBQVU7WUFDaEIsSUFBSSxFQUFFLHlCQUF5QjtZQUMvQixJQUFJLEVBQUUsUUFBUTtTQUNmO1FBQ0Q7WUFDRSxFQUFFLEVBQUUsV0FBVztZQUNmLElBQUksRUFBRSxTQUFTO1lBQ2YsSUFBSSxFQUFFLHNCQUFzQjtZQUM1QixJQUFJLEVBQUUsV0FBVztTQUNsQjtRQUNEO1lBQ0UsRUFBRSxFQUFFLGdCQUFnQjtZQUNwQixJQUFJLEVBQUUsU0FBUztZQUNmLElBQUksRUFBRSwyQkFBMkI7WUFDakMsSUFBSSxFQUFFLFdBQVc7U0FDbEI7UUFDRDtZQUNFLEVBQUUsRUFBRSxRQUFRO1lBQ1osSUFBSSxFQUFFLFNBQVM7WUFDZixJQUFJLEVBQUUsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLFNBQVM7WUFDL0IsSUFBSSxFQUFFLFFBQVE7U0FDZjtLQUNGLENBQUM7SUFDRixJQUFJLE1BQU0sR0FBZSxJQUFJLENBQUM7SUFFOUIsS0FBSyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUN6QyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDcEQsTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixNQUFNO1NBQ1A7S0FDRjtJQUVELElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtRQUNuQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztLQUNuQztTQUFNLElBQUksTUFBTSxDQUFDLEVBQUUsSUFBSSxTQUFTLEVBQUU7UUFDakMsTUFBTSxjQUFjLEdBQUcsc0JBQXNCLENBQUM7UUFDOUMsTUFBTSxZQUFZLEdBQUcsUUFBUTthQUMxQixhQUFhLENBQUMsWUFBWSxDQUFDO2FBQzNCLFdBQVcsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFckMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNqQixPQUFPLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDM0M7UUFFRCxNQUFNLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFL0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDbEIsT0FBTyxFQUFFLEtBQUs7WUFDZCxLQUFLLEVBQUUsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQztZQUN0RCxhQUFhLEVBQUUsVUFBVTtZQUN6QixjQUFjLEVBQUUsb0JBQW9CO1NBQ3JDLENBQUMsQ0FBQztRQUVILE1BQU0sb0JBQW9CLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDakQsOEJBQThCLENBQy9CLENBQUM7UUFDRixNQUFNLGFBQWEsR0FBRyxvQkFBb0I7WUFDeEMsQ0FBQyxDQUFDLFFBQVEsQ0FDTixvQkFBb0I7aUJBQ2pCLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQztpQkFDOUIsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUN6QjtZQUNILENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVQLElBQUksYUFBYSxLQUFLLENBQUMsQ0FBQyxJQUFJLGFBQWEsS0FBSyxlQUFlLEVBQUU7WUFDN0QsZUFBZSxHQUFHLGFBQWEsQ0FBQztZQUNoQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1NBQ2Q7UUFFRCxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNwQyxPQUFPLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkM7UUFFRCxNQUFNLENBQUMsY0FBYyxFQUFFLFlBQVksQ0FBQyxHQUFHLGFBQWEsQ0FDbEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUMzQixDQUFDO1FBRUYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDbEIsYUFBYSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUztZQUNsRCxjQUFjLEVBQUUsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1NBQ3JELENBQUMsQ0FBQztRQUVuQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNqQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtnQkFDbEIsY0FBYztnQkFDZCxZQUFZO2FBQ2IsQ0FBQyxDQUFDO1NBQ0o7S0FDRjtTQUFNO1FBQ0wsSUFDRSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO1lBQzlDLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLEVBQ2xDO1lBQ0EsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFdBQVcsQ0FBQztTQUM3RDtRQUVELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ2xCLE9BQU8sRUFBRSxNQUFNLENBQUMsSUFBSTtZQUNwQixhQUFhLEVBQUUsTUFBTSxDQUFDLElBQUk7WUFDMUIsY0FBYyxFQUFFLE1BQU0sQ0FBQyxJQUFJO1NBQ1osQ0FBQyxDQUFDO0tBQ3BCO0lBRUQsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM3QixDQUFDLENBQUMsQ0FBQyJ9