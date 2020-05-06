const presence = new Presence({
    clientId: '707389880505860156'
});
const strings = presence.getStrings({
    playing: 'presence.playback.playing',
    paused: 'presence.playback.paused',
    browsing: 'presence.activity.browsing',
    searching: 'presence.activity.searching',
    episode: 'presence.media.info.episode'
});
let video = null;
let lastVideoOption = 1;
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
presence.on('iFrameData', async (context) => {
    video = context;
});
presence.on('UpdateData', async () => {
    const data = {
        largeImageKey: 'logo'
    };
    const browsingData = {
        largeImageKey: 'logo',
        details: (await strings).browsing,
        smallImageKey: 'browsing',
        smallImageText: (await strings).browsing
    };
    const actions = [
        {
            id: 'episode',
            path: '/ver',
            text: (await strings).playing
        },
        {
            id: 'seasonList',
            path: '/emision',
            text: 'viendo lista de emisión',
            icon: 'season'
        },
        {
            id: 'directory',
            path: '/animes',
            text: 'viendo el directorio',
            icon: 'directory'
        },
        {
            id: 'directoryAnime',
            path: '/anime/',
            text: 'viendo lista de episodios',
            icon: 'directory'
        },
        {
            id: 'search',
            path: '/search',
            text: (await strings).searching,
            icon: 'search'
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
    else if (action.id == 'episode') {
        const detailsPattern = /^([^\d]+).* (\d+).+$/;
        const detailsMatch = document.querySelector('.Title-epi').textContent
            .match(detailsPattern);
        if (!detailsMatch) {
            return presence.setActivity(browsingData);
        }
        const [title, episode] = detailsMatch.slice(1);
        Object.assign(data, {
            details: title,
            state: (await strings).episode.replace('{0}', episode),
            smallImageKey: 'browsing',
            smallImageText: 'viendo el capitulo'
        });
        const currentOptionElement = document
            .querySelector('.TPlayerNv > .Button.Current');
        const currentOption = currentOptionElement
            ? parseInt(currentOptionElement.getAttribute('data-tplayernv')
                .match(/Opt(\d+)/i)[1])
            : -1;
        if (currentOption !== -1 && currentOption !== lastVideoOption) {
            lastVideoOption = currentOption;
            video = null;
        }
        if (!video || video && video.ended) {
            return presence.setActivity(data);
        }
        const [startTimestamp, endTimestamp] = getTimestamps.apply(null, [video.elapsed, video.duration].map(time => Math.floor(time)));
        Object.assign(data, {
            smallImageKey: (video.paused ? 'paused' : 'playing'),
            smallImageText: (await strings)[video.paused ? 'paused' : 'playing']
        });
        if (!video.paused) {
            Object.assign(data, {
                startTimestamp,
                endTimestamp
            });
        }
    }
    else {
        if (document.location.pathname.includes('/anime/')
            && document.querySelector('h1.Title')) {
            data.state = document.querySelector('h1.Title').textContent;
        }
        Object.assign(data, {
            details: action.text,
            smallImageKey: action.icon,
            smallImageText: action.text
        });
    }
    presence.setActivity(data);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFjQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDbEMsT0FBTyxFQUFFLDJCQUEyQjtJQUNwQyxNQUFNLEVBQUUsMEJBQTBCO0lBQ2xDLFFBQVEsRUFBRSw0QkFBNEI7SUFDdEMsU0FBUyxFQUFFLDZCQUE2QjtJQUN4QyxPQUFPLEVBQUUsNkJBQTZCO0NBQ3ZDLENBQUMsQ0FBQztBQUNILElBQUksS0FBSyxHQUFpQixJQUFJLENBQUM7QUFDL0IsSUFBSSxlQUFlLEdBQUcsQ0FBQyxDQUFDO0FBT3hCLFNBQVMsYUFBYSxDQUNwQixTQUFpQixFQUNqQixhQUFxQjtJQUVyQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHLGFBQWEsQ0FBQztJQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUVELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRTtJQUMxQyxLQUFLLEdBQUcsT0FBTyxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxJQUFJLEdBQWlCO1FBQ3pCLGFBQWEsRUFBRSxNQUFNO0tBQ3RCLENBQUM7SUFDRixNQUFNLFlBQVksR0FBaUI7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