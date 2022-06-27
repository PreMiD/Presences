const presence = new Presence({
    clientId: '990900646301544468'
});

const elapsed = Math.floor(Date.now() / 1000);

presence.on('UpdateData', () => {
    const presenceData: PresenceData = {
        largeImageKey: 'https://ghosteshop.com/icon.png',
        startTimestamp: elapsed
    };

    const path = window.location.hostname;
    const page = window.location.pathname.replace('/', '');
    const type = path.split('.');
    
    if (type.length === 3) {
        switch (type[0]) {
            case 'wiki':
                presenceData.details = 'Reading the wiki';
                break;
            case 'cdn':
                presenceData.details = 'Reading the CDN';
                break;
        };

        presenceData.state = `Reading ${document.title}`;
    } else {
        switch (page) {
            case '':
                presenceData.details = 'Reading the Ghost eShop website';
                presenceData.state = 'Home menu';
                break;
            case 'games':
                presenceData.details = 'Looking for a game';
                const titles = document.querySelectorAll('.v-card__title');
                if (titles.length === 2)
                    presenceData.state = titles[1].innerText;
                break;
        };
    };

    if (presenceData.details) presence.setActivity(presenceData);
    else presence.setActivity();
});990900646301544468