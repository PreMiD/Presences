var presence = new Presence({
    clientId: "607719679011848220"
});
var strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live",
    search: "presence.activity.searching"
});
function capitalize(text) {
    text = text.toLowerCase();
    return text.charAt(0).toUpperCase() + text.slice(1);
}
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
var elapsed = undefined, oldUrl = undefined, header, title, item;
presence.on("UpdateData", async () => {
    var video = null, details = undefined, state = undefined, smallImageKey = undefined, smallImageText = undefined, startTimestamp = undefined, endTimestamp = undefined;
    var href = window.location.href;
    var path = window.location.pathname;
    if (href !== oldUrl) {
        oldUrl = href;
        elapsed = Math.floor(Date.now() / 1000);
    }
    details = "Browsing";
    state = undefined;
    startTimestamp = elapsed;
    if (path.match("/hub")) {
        header = document.querySelector(".Hub__title");
        title = document.querySelector(".SimpleModalNav__title");
        details = "Viewing Category";
        if (header) {
            state = header.textContent;
            if (title) {
                state = state + ` (${title.textContent})`;
            }
        }
    }
    else if (path.match("/genre")) {
        header = document.querySelector(".Hub__title");
        title = document.querySelector(".SimpleModalNav__title");
        details = "Viewing Genre";
        if (header) {
            state = header.textContent;
            if (title) {
                state = state + ` (${title.textContent})`;
            }
        }
    }
    else if (path.match("/series")) {
        title = document.querySelector(".Masthead__title");
        item = document.querySelector(".Subnav__item.active");
        details = "Viewing Series";
        if (title) {
            state = title.textContent;
            if (item) {
                state = state + `'s ${item.textContent}`;
            }
        }
    }
    else if (path.match("/movie")) {
        title = document.querySelector(".Masthead__title");
        item = document.querySelector(".Subnav__item.active");
        details = "Viewing Movie";
        if (title) {
            state = title.textContent;
            if (item) {
                state = state + `'s ${item.textContent}`;
            }
        }
    }
    else if (path.match("/network")) {
        var brand = document.querySelector(".SimpleModalNav__brandImage");
        item = document.querySelector(".Subnav__item.active");
        details = "Viewing Network";
        if (brand) {
            state = brand.alt;
            if (item) {
                state = state + `'s ${item.textContent}`;
            }
        }
    }
    else if (path.match("/sports_episode")) {
        title = document.querySelector(".Masthead__title");
        item = document.querySelector(".Subnav__item.active");
        details = "Viewing Sports Episode";
        if (title) {
            state = title.textContent;
            if (item) {
                state = state + `'s ${item.textContent}`;
            }
        }
    }
    else if (path.match("/sports_team")) {
        title = document.querySelector(".Masthead__title");
        item = document.querySelector(".Subnav__item.active");
        details = "Viewing Sports Team";
        if (title) {
            state = title.textContent;
            if (item) {
                state = state + `'s ${item.textContent}`;
            }
        }
    }
    else if (path.match("/search")) {
        var input = document.querySelector(".cu-search-input");
        details = "Searching";
        smallImageKey = "search";
        smallImageText = (await strings).search;
        if (input && input.value.length > 0) {
            state = input.value;
        }
    }
    else if (path.match("/live")) {
        var category = document.querySelector(".LiveGuide__filter-item--selected");
        title = document.querySelector(".ModalHeader__showname");
        details = "Viewing Live";
        if (category) {
            state = capitalize(category.textContent);
            if (title) {
                state = state + ` (${title.textContent})`;
            }
        }
    }
    else if (path.match("/my-stuff")) {
        details = "Viewing My Stuff";
    }
    else if (path.match("/manage-dvr")) {
        item = document.querySelector(".Subnav__item.active");
        details = "Viewing My DVR";
        if (item) {
            state = capitalize(item.textContent);
        }
    }
    else if (path.match("/watch")) {
        video = document.querySelector(".video-player");
        details = "Viewing Watch History";
        if (video) {
            title = document.querySelector(".metadata-area__second-line");
            var content = document.querySelector(".metadata-area__third-line");
            var timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
            var live = timestamps[1] === Infinity;
            details = "Watching";
            if (title) {
                details = `Watching ${title.textContent}`;
            }
            if (content && content.textContent.length > 0) {
                state = content.textContent;
            }
            smallImageKey = live ? "live" : video.paused ? "pause" : "play";
            smallImageText = live
                ? (await strings).live
                : video.paused
                    ? (await strings).pause
                    : (await strings).play;
            startTimestamp = live ? elapsed : timestamps[0];
            endTimestamp = live ? undefined : timestamps[1];
            if (video.paused) {
                startTimestamp = undefined;
                endTimestamp = undefined;
            }
        }
    }
    var data = {
        details: details,
        state: state,
        largeImageKey: "hulu",
        smallImageKey: smallImageKey,
        smallImageText: smallImageText,
        startTimestamp: startTimestamp,
        endTimestamp: endTimestamp
    };
    presence.setActivity(data, video ? !video.paused : true);
    presence.setTrayTitle(details);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDaEMsSUFBSSxFQUFFLDJCQUEyQjtJQUNqQyxLQUFLLEVBQUUsMEJBQTBCO0lBQ2pDLElBQUksRUFBRSx3QkFBd0I7SUFDOUIsTUFBTSxFQUFFLDZCQUE2QjtDQUN0QyxDQUFDLENBQUM7QUFFSCxTQUFTLFVBQVUsQ0FBQyxJQUFZO0lBQzlCLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDMUIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEQsQ0FBQztBQU9ELFNBQVMsYUFBYSxDQUNwQixTQUFpQixFQUNqQixhQUFxQjtJQUVyQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHLGFBQWEsQ0FBQztJQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUVELElBQUksT0FBTyxHQUFHLFNBQVMsRUFDckIsTUFBTSxHQUFHLFNBQVMsRUFDbEIsTUFBTSxFQUNOLEtBQUssRUFDTCxJQUFJLENBQUM7QUFFUCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxJQUFJLEtB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