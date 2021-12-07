const presence = new Presence({
    clientId: '917798461997457418'
}), strings = presence.getStrings({
    play: 'presence.playback.playing',
    pause: 'presence.playback.paused'
});
const pages = {
    '/': 'Home Page',
    '/players': 'Players Page',
    '/games': 'Leaderboards Page',
    '/store/orders': 'their Orders',
    '/store/products': 'Store Page',
    '/store/checkout': 'Store Checkout Page',
    '/store/bcredits': 'BCredits Page',
    '/store': 'Store Page',
    '/general-terms': 'General Terms',
    '/privacy-policy': 'Privacy Policy',
    '/store-terms': 'Store Terms',
    '/rules': 'Rules Page',
    '/report': 'Report Page',
    '/appeal': 'Appeal Page',
    '/youtuber': 'Youtuber Page',
    '/sky-wars': 'Top SkyWars',
    '/sky-wars-solo': 'Top SkyWars Solo',
    '/bed-wars': 'Top BedWars',
    '/bed-wars-solo': 'Top BedWars Solo',
    '/egg-wars': 'Top EggWars',
    '/egg-wars-solo': 'Top EggWars Solo',
    '/top-pvp-s3': 'Top PvP S3',
    '/top-skypvp-s1': 'Top SkyPvP S1',
    '/survival-games': 'Top SurvivalGames',
    '/1vs1': 'Top 1VS1',
    '/the-bridge': 'Top TheBridge',
    '/lucky-block-wars': 'Top LuckyBlockWars',
    '/sky-giant': 'Top SkyGiant',
    '/sky-giant-mini': 'Top SkyGiantMini',
    '/murder-mystery': 'Top MurderMystery',
    '/tnt-tag': 'Top TNTTag',
    '/block-party': 'Top BlockParty',
    '/gravity': 'Top Gravity',
    '/super-jump': 'Top SuperJump',
    '/splegg': 'Top Splegg',
    '/quake-craft': 'Top QuakeCraft',
    '/uhc-run': 'Top UHCRun',
    '/top-pvp-s1': 'Top PVP S1',
    '/top-pvp-s2': 'Top PVP S2',
};
presence.on('UpdateData', async () => {
    const path = document.location.pathname;
    let presenceData;
    if (path === '/friends') {
        const elements = document.getElementsByTagName('span');
        let friends = 'Fetching...';
        for (let index = 0; index < elements.length; index++) {
            const element = elements.item(index);
            if (element.className === 'badge badge-success badge-pill')
                friends = element.innerText;
        }
        presenceData = {
            largeImageKey: 'blocksmc',
            details: 'Viewing their friends',
            state: 'Friends: ' + friends,
            startTimestamp: Date.now(),
            smallImageKey: 'blocksmc',
            smallImageText: 'Made by narwhql'
        };
    }
    else if (path.startsWith('/player/')) {
        const name = document.getElementsByClassName('profile-header').item(0)
            .getElementsByTagName('h1').item(0).innerText;
        const rank = document.getElementsByClassName('profile-header').item(0)
            .getElementsByTagName('p').item(0).innerText;
        presenceData = {
            largeImageKey: 'blocksmc',
            details: 'Viewing a Player Profile',
            state: `IGN: ${name} | Rank: ${rank}`,
            startTimestamp: Date.now(),
            smallImageKey: 'blocksmc',
            smallImageText: 'Made by narwhql'
        };
    }
    else if (path.startsWith('/guild/')) {
        const guild = document.getElementsByClassName('sub-header').item(0)
            .getElementsByTagName('h1').item(1)
            .innerText.split(' Guild')[0];
        const members = document.getElementsByClassName('table table-left').item(0)
            .getElementsByTagName('tbody').item(0)
            .children.item(3)
            .children.item(1)
            .innerHTML;
        presenceData = {
            largeImageKey: 'blocksmc',
            details: 'Viewing a Guild',
            state: `Guild: ${guild} | Members: ${members}`,
            startTimestamp: Date.now(),
            smallImageKey: 'blocksmc',
            smallImageText: 'Made by narwhql'
        };
    }
    else {
        const page = pages[document.location.pathname];
        if (!page) {
            presenceData = {
                largeImageKey: 'blocksmc',
                details: 'Browsing...',
                smallImageKey: 'blocksmc',
                smallImageText: 'Made by narwhql'
            };
        }
        else {
            presenceData = {
                largeImageKey: 'blocksmc',
                details: `Viewing ${page}`,
                startTimestamp: Date.now(),
                smallImageKey: 'blocksmc',
                smallImageText: 'Made by narwhql'
            };
        }
    }
    if (presenceData.details)
        presence.setActivity(presenceData);
    else
        presence.setActivity();
});
