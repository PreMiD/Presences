const presence = new Presence({
    clientId: "703697546794631209"
});
const elapsed = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const path = window.location.pathname;
    var video;
    var live;
    const presenceData = {
        largeImageKey: "roosterteeth",
        details: "Browsing Rooster Teeth",
        startTimestamp: elapsed
    };
    if (window.location.hash.includes("#search?term=")) {
        presenceData.details = "Searching For:";
        presenceData.state = document.querySelector(".search__input").value;
    }
    else if (path.includes("/live/rt-tv")) {
        video = document.querySelector(".vjs-tech");
        presenceData.details = document
            .querySelector(".livestream-card.livestream-schedule-item-fade-enter-done")
            .querySelector(".livestream-show").textContent;
        presenceData.details +=
            " " +
                document
                    .querySelector(".livestream-card.livestream-schedule-item-fade-enter-done")
                    .querySelector(".livestream-title").textContent;
        presenceData.state = "RT-TV";
        live = true;
    }
    else if (document.querySelector(".vjs-tech")) {
        live = false;
        video = document.querySelector(".vjs-tech");
        if (document.querySelector(".video-details__heading")) {
            presenceData.details = document.querySelector(".video-details__title").textContent;
            presenceData.state = document.querySelector(".video-details__show").textContent;
        }
        else {
            presenceData.details = document.querySelector(".player-title").textContent;
            presenceData.state = "Miniplayer";
        }
    }
    else if (path.includes("/watch")) {
        if (document.querySelector(".video-details__heading")) {
            presenceData.details = document.querySelector(".video-details__title").textContent;
            presenceData.state = document.querySelector(".video-details__show").textContent;
        }
        else {
            presenceData.details = document.querySelector(".player-title").textContent;
            presenceData.state = "Miniplayer";
        }
    }
    else if (path.includes("/schedule")) {
        presenceData.details = "Viewing Schedule";
        for (var scheduleDay of document.getElementsByClassName("schedule-day")) {
            var position = scheduleDay.getBoundingClientRect();
            if (position.top < window.innerHeight && position.bottom >= 0) {
                presenceData.state = scheduleDay
                    .querySelector(".schedule-day__heading")
                    .textContent.toLowerCase();
                presenceData.state =
                    presenceData.state.substr(0, 1).toUpperCase() +
                        presenceData.state.substr(1);
                break;
            }
        }
    }
    else if (path.includes("/series/")) {
        presenceData.details = "Browsing Through Videos Of:";
        presenceData.state = document.querySelector(".featured-title").textContent;
    }
    else if (path.includes("/channel/")) {
        presenceData.details = "Viewing Channel:";
        presenceData.state = document
            .querySelector(".carousel-container")
            .querySelector(".carousel-title")
            .textContent.split("RECENT EPISODES FROM ")[1];
    }
    else if (path.includes("/series")) {
        presenceData.details = "Browsing Series";
    }
    else if (path.includes("/episodes")) {
        if (urlParams.get("channel_id")) {
            presenceData.details = "Browsing Episodes Of:";
            presenceData.state = document
                .querySelector(".dropdown-label")
                .textContent.split("FILTER (")[1]
                .replace(")", "");
        }
        else {
            presenceData.details = "Browsing Episodes";
        }
    }
    else if (path.includes("/g/") && !path.includes("/g/all")) {
        presenceData.details = "Browsing Group:";
        if (path.includes("explore")) {
            presenceData.state = "Explore";
        }
        else {
            presenceData.state = document
                .querySelector(".content-sidebar")
                .querySelector(".banner-title").textContent;
        }
    }
    else if (path.includes("/g")) {
        presenceData.details =
            "Browsing " + (path.includes("/g/all") ? "All " : "") + "Groups";
    }
    if (video != undefined) {
        if (live) {
            presenceData.smallImageKey = video.paused ? "livepause" : "live";
            presenceData.smallImageText = video.paused
                ? "Live Playback paused"
                : "Live";
        }
        else {
            presenceData.smallImageKey = video.paused ? "pause" : "play";
            presenceData.smallImageText = video.paused
                ? "Playback paused"
                : "Playing back";
            if (!video.paused) {
                presenceData.endTimestamp =
                    Math.floor(Date.now() / 1000) -
                        Math.floor(video.currentTime) +
                        Math.floor(video.duration);
            }
            else {
                presenceData.startTimestamp = undefined;
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRTlDLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlELE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO0lBQ3RDLElBQUksS0FBSyxDQUFDO0lBQ1YsSUFBSSxJQUFJLENBQUM7SUFDVCxNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLGNBQWM7UUFDN0IsT0FBTyxFQUFFLHdCQUF3QjtRQUNqQyxjQUFjLEVBQUUsT0FBTztLQUN4QixDQUFDO0lBQ0YsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEVBQUU7UUFDbEQsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztRQUN4QyxZQUFZLENBQUMsS0FBSyxHQUFJLFFBQVEsQ0FBQyxhQUFhLENBQzFDLGdCQUFnQixDQUNJLENBQUMsS0FBSyxDQUFDO0tBQzlCO1NBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1FBQ3ZDLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcsUUFBUTthQUM1QixhQUFhLENBQ1osMkRBQTJELENBQzVE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