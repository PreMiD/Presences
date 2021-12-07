// typescript: interface
interface SiteData {
    animeTitle?: string | null,
    episode?: number,
    status: string,
    page: string
}
interface PlayerData {
    time: {
        progress: number,
        duration: number,
        snowflake: number[]
    },
    title: string,
    episode: number,
    episodeName: string,
    playbackState: string
}

// create new presence
const presence = new Presence({
    clientId: '826806766033174568',
    appMode: true
});

// get basic information
// such as current page
const { pathname } = window.location, page = pathname.split('/')[1];

// shorthand for querySelectorAll
const $ = (selectors: any) => document.querySelectorAll(selectors);

// declare global variables
const initEpoch = Date.now();
const rpaImage = {
    general: {
        account: 'icon-g-account',
        browse: 'icon-g-browse',
        read: 'icon-g-read',
        search: 'icon-g-search'
    },
    player: {
        play: 'icon-p-play',
        pause: 'icon-p-pause'
    }
}
var playerData: PlayerData;
var pageLoaded = false;

// log to console
presence.info('PreMiD extension has loaded');

// buff function
const updateData = () => {
    if (page == 'watch') {
        // get video player element
        const player: any = $('video#ao-video')[0];

        // get player metadata
        const title = $('meta[name="ao-api-malsync-title"]')[0].getAttribute('value');
        const episode = Number($('meta[name="ao-api-malsync-episode"]')[0].getAttribute('value'));

        // get video player element metadata
        const { paused, currentTime: progress, duration } = player;
        const snowflake = presence.getTimestamps(progress, duration);

        // update global variables
        playerData = {
            time: {
                progress,
                duration,
                snowflake
            },
            title,
            episode,
            episodeName: '',
            playbackState: paused ? 'paused' : 'playing'
        }

        // update this global variable
        // if the page has fully loaded
        // with video player element
        if (document.body.contains(player) && !pageLoaded) pageLoaded = true;
    }
    else pageLoaded = true;
}
// update data every 1s
setInterval(updateData, 1e3);

// update presence information
presence.on('UpdateData', () => {
    // return empty presence object
    // if page hasn't loaded yet
    if (pageLoaded == false) return;

    // declare presence data object
    var presenceData: PresenceData = {
        largeImageKey: 'main-logo',
        smallImageKey: rpaImage.general.browse,
        smallImageText: 'Browsing',
        details: 'Browsing',
        startTimestamp: initEpoch
    }

    switch (page) {
        case 'watch': {
            // deconstruct playerData object
            const { title, episode, episodeName, playbackState, time } = playerData;

            // filter out watch url
            const currentUrl = new URL(window.location.href);
            const episodeUrl = new URL('https://animeonsen.xyz/watch');
            episodeUrl.searchParams.append('v', currentUrl.searchParams.get('v'));
            episodeUrl.searchParams.append('ep', episode.toString());

            // update presence data
            presenceData = {
                ...presenceData,
                smallImageKey: rpaImage.player[playbackState == 'paused' ? 'pause' : 'play'],
                smallImageText: `Watching - ${playbackState[0].toUpperCase() + playbackState.substring(1)}`,
                details: title,
                state: `Episode ${episode}${episodeName ? ' - ' + episodeName : ''}`,
                startTimestamp: time.snowflake[0],
                endTimestamp: time.snowflake[1],
                buttons: [{ label: 'Watch', url: episodeUrl.href }]
            }
            break;
        }
        case 'search': {
            presenceData.details = 'Searching';
            presenceData.smallImageKey = rpaImage.general.search;
            presenceData.smallImageText = 'Search Page';
            break;
        }
        case 'account': {
            presenceData.details = 'Managing account';
            presenceData.smallImageKey = rpaImage.general.account;
            presenceData.smallImageText = 'Account Page';
            break;
        }

        // static pages
        case 'about': {
            presenceData.details = 'Reading';
            presenceData.smallImageKey = rpaImage.general.read;
            presenceData.smallImageText = 'About Page';
            break;
        }
        case 'cookies': {
            presenceData.details = 'Reading';
            presenceData.smallImageKey = rpaImage.general.read;
            presenceData.smallImageText = 'Cookies Page';
            break;
        }

        default: break;
    }

    // update presence activity
    presence.setActivity(presenceData, true);
});
