var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: '607719679011848220'
});
var strings = presence.getStrings({
    play: 'presence.playback.playing',
    pause: 'presence.playback.paused',
    live: 'presence.activity.live',
    search: 'presence.activity.searching'
});
var elapsed = undefined, oldUrl = undefined;
presence.on('UpdateData', () => __awaiter(this, void 0, void 0, function* () {
    var video = null, details = undefined, state = undefined, smallImageKey = undefined, smallImageText = undefined, startTimestamp = undefined, endTimestamp = undefined;
    var href = window.location.href;
    var path = window.location.pathname;
    if (href !== oldUrl) {
        oldUrl = href;
        elapsed = Math.floor(Date.now() / 1000);
    }
    details = 'Browsing';
    state = undefined;
    startTimestamp = elapsed;
    if (path.match('/hub')) {
        var header = document.querySelector('.Hub__title');
        var title = document.querySelector('.SimpleModalNav__title');
        details = 'Viewing Category';
        if (header) {
            state = header.textContent;
            if (title) {
                state = state + ` (${title.textContent})`;
            }
        }
    }
    else if (path.match('/genre')) {
        var header = document.querySelector('.Hub__title');
        var title = document.querySelector('.SimpleModalNav__title');
        details = 'Viewing Genre';
        if (header) {
            state = header.textContent;
            if (title) {
                state = state + ` (${title.textContent})`;
            }
        }
    }
    else if (path.match('/series')) {
        var title = document.querySelector('.Masthead__title');
        var item = document.querySelector('.Subnav__item.active');
        details = 'Viewing Series';
        if (title) {
            state = title.textContent;
            if (item) {
                state = state + `'s ${item.textContent}`;
            }
        }
    }
    else if (path.match('/movie')) {
        var title = document.querySelector('.Masthead__title');
        var item = document.querySelector('.Subnav__item.active');
        details = 'Viewing Movie';
        if (title) {
            state = title.textContent;
            if (item) {
                state = state + `'s ${item.textContent}`;
            }
        }
    }
    else if (path.match('/network')) {
        var brand = document.querySelector('.SimpleModalNav__brandImage');
        var item = document.querySelector('.Subnav__item.active');
        details = 'Viewing Network';
        if (brand) {
            state = brand.alt;
            if (item) {
                state = state + `'s ${item.textContent}`;
            }
        }
    }
    else if (path.match('/sports_episode')) {
        var title = document.querySelector('.Masthead__title');
        var item = document.querySelector('.Subnav__item.active');
        details = 'Viewing Sports Episode';
        if (title) {
            state = title.textContent;
            if (item) {
                state = state + `'s ${item.textContent}`;
            }
        }
    }
    else if (path.match('/sports_team')) {
        var title = document.querySelector('.Masthead__title');
        var item = document.querySelector('.Subnav__item.active');
        details = 'Viewing Sports Team';
        if (title) {
            state = title.textContent;
            if (item) {
                state = state + `'s ${item.textContent}`;
            }
        }
    }
    else if (path.match('/search')) {
        var input = document.querySelector('.cu-search-input');
        details = 'Searching';
        smallImageKey = 'search';
        smallImageText = (yield strings).search;
        if (input && input.value.length > 0) {
            state = input.value;
        }
    }
    else if (path.match('/live')) {
        var category = document.querySelector('.LiveGuide__filter-item--selected');
        var title = document.querySelector('.ModalHeader__showname');
        details = 'Viewing Live';
        if (category) {
            state = capitalize(category.textContent);
            if (title) {
                state = state + ` (${title.textContent})`;
            }
        }
    }
    else if (path.match('/my-stuff')) {
        details = 'Viewing My Stuff';
    }
    else if (path.match('/manage-dvr')) {
        var item = document.querySelector('.Subnav__item.active');
        details = 'Viewing My DVR';
        if (item) {
            state = capitalize(item.textContent);
        }
    }
    else if (path.match('/watch')) {
        video = document.querySelector('.video-player');
        details = 'Viewing Watch History';
        if (video) {
            var title = document.querySelector('.metadata-area__second-line');
            var content = document.querySelector('.metadata-area__third-line');
            var timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
            var live = timestamps[1] === Infinity;
            details = 'Watching';
            if (title) {
                details = `Watching ${title.textContent}`;
            }
            if (content && content.textContent.length > 0) {
                state = content.textContent;
            }
            smallImageKey = live ? 'live' : video.paused ? 'pause' : 'play';
            smallImageText = live
                ? (yield strings).live
                : video.paused
                    ? (yield strings).pause
                    : (yield strings).play;
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
        largeImageKey: 'hulu',
        smallImageKey: smallImageKey,
        smallImageText: smallImageText,
        startTimestamp: startTimestamp,
        endTimestamp: endTimestamp
    };
    if (data) {
        presence.setActivity(data, video ? !video.paused : true);
        presence.setTrayTitle(details);
    }
}));
function capitalize(text) {
    text = text.toLowerCase();
    return text.charAt(0).toUpperCase() + text.slice(1);
}
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzFCLFFBQVEsRUFBRSxvQkFBb0I7Q0FDL0IsQ0FBQyxDQUFDO0FBQ0gsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUNoQyxJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsSUFBSSxFQUFFLHdCQUF3QjtJQUM5QixNQUFNLEVBQUUsNkJBQTZCO0NBQ3RDLENBQUMsQ0FBQztBQUVILElBQUksT0FBTyxHQUFHLFNBQVMsRUFDckIsTUFBTSxHQUFHLFNBQVMsQ0FBQztBQUVyQixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFTLEVBQUU7SUFDbkMsSUFBSSxLQUFLLEdBQXFCLElBQUksRUFDaEMsT0FBTyxHQUFHLFNBQVMsRUFDbkIsS0FBSyxHQUFHLFNBQVMsRUFDakIsYUFBYSxHQUFHLFNBQVMsRUFDekIsY0FBYyxHQUFHLFNBQVMsRUFDMUIsY0FBYyxHQUFHLFNBQVMsRUFDMUIsWUFBWSxHQUFHLFNBQVMsQ0FBQztJQUUzQixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztJQUNoQyxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUVwQyxJQUFJLElBQUksS0FBSyxNQUFNLEVBQUU7UUFDbkIsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNkLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztLQUN6QztJQUVELE9BQU8sR0FBRyxVQUFVLENBQUM7SUFDckIsS0FBSyxHQUFHLFNBQVMsQ0FBQztJQUNsQixjQUFjLEdBQUcsT0FBTyxD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