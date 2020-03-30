var presence = new Presence({
    clientId: "607719679011848220"
});
var strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live",
    search: "presence.activity.searching"
});
var elapsed = undefined, oldUrl = undefined;
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
        var header = document.querySelector(".Hub__title");
        var title = document.querySelector(".SimpleModalNav__title");
        details = "Viewing Category";
        if (header) {
            state = header.textContent;
            if (title) {
                state = state + ` (${title.textContent})`;
            }
        }
    }
    else if (path.match("/genre")) {
        var header = document.querySelector(".Hub__title");
        var title = document.querySelector(".SimpleModalNav__title");
        details = "Viewing Genre";
        if (header) {
            state = header.textContent;
            if (title) {
                state = state + ` (${title.textContent})`;
            }
        }
    }
    else if (path.match("/series")) {
        var title = document.querySelector(".Masthead__title");
        var item = document.querySelector(".Subnav__item.active");
        details = "Viewing Series";
        if (title) {
            state = title.textContent;
            if (item) {
                state = state + `'s ${item.textContent}`;
            }
        }
    }
    else if (path.match("/movie")) {
        var title = document.querySelector(".Masthead__title");
        var item = document.querySelector(".Subnav__item.active");
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
        var item = document.querySelector(".Subnav__item.active");
        details = "Viewing Network";
        if (brand) {
            state = brand.alt;
            if (item) {
                state = state + `'s ${item.textContent}`;
            }
        }
    }
    else if (path.match("/sports_episode")) {
        var title = document.querySelector(".Masthead__title");
        var item = document.querySelector(".Subnav__item.active");
        details = "Viewing Sports Episode";
        if (title) {
            state = title.textContent;
            if (item) {
                state = state + `'s ${item.textContent}`;
            }
        }
    }
    else if (path.match("/sports_team")) {
        var title = document.querySelector(".Masthead__title");
        var item = document.querySelector(".Subnav__item.active");
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
        var title = document.querySelector(".ModalHeader__showname");
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
        var item = document.querySelector(".Subnav__item.active");
        details = "Viewing My DVR";
        if (item) {
            state = capitalize(item.textContent);
        }
    }
    else if (path.match("/watch")) {
        video = document.querySelector(".video-player");
        details = "Viewing Watch History";
        if (video) {
            var title = document.querySelector(".metadata-area__second-line");
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
    if (data) {
        presence.setActivity(data, video ? !video.paused : true);
        presence.setTrayTitle(details);
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUNILElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDakMsSUFBSSxFQUFFLDJCQUEyQjtJQUNqQyxLQUFLLEVBQUUsMEJBQTBCO0lBQ2pDLElBQUksRUFBRSx3QkFBd0I7SUFDOUIsTUFBTSxFQUFFLDZCQUE2QjtDQUNyQyxDQUFDLENBQUM7QUFFSCxJQUFJLE9BQU8sR0FBRyxTQUFTLEVBQ3RCLE1BQU0sR0FBRyxTQUFTLENBQUM7QUFFcEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDcEMsSUFBSSxLQUFLLEdBQXFCLElBQUksRUFDakMsT0FBTyxHQUFHLFNBQVMsRUFDbkIsS0FBSyxHQUFHLFNBQVMsRUFDakIsYUFBYSxHQUFHLFNBQVMsRUFDekIsY0FBYyxHQUFHLFNBQVMsRUFDMUIsY0FBYyxHQUFHLFNBQVMsRUFDMUIsWUFBWSxHQUFHLFNBQVMsQ0FBQztJQUUxQixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztJQUNoQyxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUVwQyxJQUFJLElBQUksS0FBSyxNQUFNLEVBQUU7UUFDcEIsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNkLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztLQUN4QztJQUVELE9BQU8sR0FBRyxVQUFVLENBQUM7SUFDckIsS0FBSyxHQUFHLFNBQVMsQ0FBQztJQUNsQixjQUFjLEdBQUcsT0FBTyxDQUFD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