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
    const page = window.location.pathname.replace(/\//g, '');
    const type = path.split('.');
    
    if (type.length === 3) {
        presenceData.details = `Reading the ${type[0].toUpperCase()}`;
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
                if (titles.length === 2 && titles[1].innerHTML !== titles[1].innerText)
                    presenceData.state = titles[1].innerText;
                else
                    presenceData.state = 'Viewing all games';
                break;
        };
    };

    if (presenceData.details) presence.setActivity(presenceData);
    else presence.setActivity();
});