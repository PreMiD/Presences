var presence = new Presence({
    clientId: "607719679011848220"
});
var strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live",
    search: "presence.activity.searching"
});
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
function capitalize(text) {
    text = text.toLowerCase();
    return text.charAt(0).toUpperCase() + text.slice(1);
}
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDaEMsSUFBSSxFQUFFLDJCQUEyQjtJQUNqQyxLQUFLLEVBQUUsMEJBQTBCO0lBQ2pDLElBQUksRUFBRSx3QkFBd0I7SUFDOUIsTUFBTSxFQUFFLDZCQUE2QjtDQUN0QyxDQUFDLENBQUM7QUFFSCxJQUFJLE9BQU8sR0FBRyxTQUFTLEVBQ3JCLE1BQU0sR0FBRyxTQUFTLEVBQ2xCLE1BQU0sRUFDTixLQUFLLEVBQ0wsSUFBSSxDQUFDO0FBRVAsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsSUFBSSxLQUFLLEdBQXFCLElBQUksRUFDaEMsT0FBTyxHQUFHLFNBQVMsRUFDbkIsS0FBSyxHQUFHLFNBQVMsRUFDakIsYUFBYSxHQUFHLFNBQVMsRUFDekIsY0FBYyxHQUFHLFNBQVMsRUFDMUIsY0FBYyxHQUFHLFNBQVMsRUFDMUIsWUFBWSxHQUFHLFNBQVMsQ0FBQztJQUUzQixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztJQUNoQyxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUVwQyxJQUFJLElBQUksS0FBSyxNQUFNLEVBQUU7UUFDbkIsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNkLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztLQUN6QztJQUVELE9BQU8sR0FBRyxVQUFVLENBQUM7SUFDckIsS0FBSyxHQUFHLFNBQVMs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