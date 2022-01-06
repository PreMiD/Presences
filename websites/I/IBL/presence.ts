const presence = new Presence({
    clientId: '815553000470478850'
}), timestamp = Math.floor(Date.now() / 1000);

presence.on('UpdateData', async () => {
    const showTimestamp: boolean = await presence.getSetting('timestamp'),
    showButtons: boolean = await presence.getSetting('buttons'),
    presenceData: PresenceData = {
        largeImageKey: 'logo',
        startTimestamp: timestamp
    },
        { pathname } = document.location;

        if (loc === '/') {
            presenceData.details = '👀 Viewing: Home Page';
            presenceData.state = 'Just Chilling Here!';
            presenceData.smallImageKey = 'home';
            presenceData.smallImageText = 'What do you expect?'
            presenceData.buttons = [
                {
                    label: 'Visit Infinity Bots',
                    url: document.location.href
                }
            ]

        } else if (loc.includes('/search')) {
            const [query] = document.location.href.split('q=')[1].split('&');
            presenceData.details = `👀 Viewing: Bot Search`;
            presenceData.state = `🔍 Query: ${query}`
            presenceData.smallImageKey = 'search';
            presenceData.smallImageText = 'Searching for a Bot'

        } else if (loc.endsWith('/vote')) {
            const botName = document.querySelector("body > center:nth-child(6) > h1").textContent.split('#')[0];
            presenceData.details = '👀 Viewing: Vote Page';
            presenceData.state = `🎉 Voting for: ${botName}`;
            presenceData.smallImageKey = 'vote';
            presenceData.smallImageText = `Voting for ${botName}`

        } else if (loc.includes('/list')) {
            const [query] = document.location.href.split('page=')[1].split('&');
            presenceData.details = '💻 Browsing: All Bots';
            presenceData.state = `📖 On Page: ${query}`
            presenceData.smallImageKey = 'robot';
            presenceData.smallImageText = 'Looking for Bots'

        } else if (loc.includes('/bots/')) {
            const botName = document.querySelector("body > center:nth-child(6) > div:nth-child(2) > h1").textContent.split('#')[0];
            presenceData.details = '👀 Viewing: Bot Page';
            presenceData.state = `🤖 Bot: ${botName}`;
            presenceData.smallImageKey = 'robot';
            presenceData.smallImageText = 'Checking out a Bot!'

        } else if (loc.includes('/users/')) {
            const userName = document.querySelector("body > center:nth-child(5) > h2").textContent.split('#')[0];
            presenceData.details = '👀 Viewing: User Profile';
            presenceData.state = `👤 User: ${userName}`
            presenceData.smallImageKey = 'profile';
            presenceData.smallImageText = 'Checking out a User!'
        
        } else if (loc.includes('/profile')) {
            presenceData.details = '👀 Viewing: My Profile';
            presenceData.state = '👨‍💻 Editing: Probably Nothing'
            presenceData.smallImageKey = 'profile';
            presenceData.smallImageText = 'Checking myself out ;D'

        } else if (loc.includes('/partners')) {
            presenceData.details = '💻 Browsing: Partners Page';
            presenceData.state = 'Just Showing some love!';
            presenceData.smallImageKey = 'partners';
            presenceData.smallImageText = 'You know you can apply!';
            presenceData.buttons = [
                {
                    label: 'View Partners',
                    url: document.location.href
                }
            ]

        } else if (loc === '/queue') {
            presenceData.details = '👀 Viewing: Bot Queue';
            presenceData.state = 'Just Browsing some Stuff';
            presenceData.smallImageKey = 'queue';
            presenceData.smallImageText = 'Browsing the Queue';
            presenceData.buttons = [
                {
                    label: 'View the Queue',
                    url: document.location.href
                }
            ]

        } else if (loc.includes('/about')) {
            presenceData.details = '👀 Viewing: About Us';
            presenceData.state = '📖 Reading: Boring Stuff';
            presenceData.smallImageKey = 'read';
            presenceData.smallImageText = 'Seriously its Boring!';

        } else if (loc.endsWith('/panel')) {
            presenceData.details = '👀 Viewing: Staff Panel';
            presenceData.state = 'Just Browsing some Stuff';
            presenceData.smallImageKey = 'panel';
            presenceData.smallImageText = 'Being Lazy Staff!';

        } else if (loc.endsWith('/panel/queue')) {
            presenceData.details = '👀 Viewing: Staff Panel';
            presenceData.state = '➕ Action: Approving Bots';
            presenceData.smallImageKey = 'panel';
            presenceData.smallImageText = 'Look Toxic im Working!';

        } else if (loc.includes('/panel/certification')) {
            presenceData.details = '👀 Viewing: Staff Panel'
            presenceData.state = '➰ Action: Certifying Bots'
            presenceData.smallImageKey = 'panel';
            presenceData.smallImageText = 'Look Toxic im Working!';

        } else if (loc.includes('/premium')) {
            presenceData.details = '👀 Viewing: Infinity Premium';
            presenceData.state = '💻 Browsing: Plans & Pricing';
            presenceData.smallImageKey = 'premium';
            presenceData.smallImageText = 'Buy it. You know you wanna'
            presenceData.buttons = [
                {
                    label: 'View Premium Plans',
                    url: document.location.href
                }
            ]

        } else if (loc === '/bots/certification') {
            presenceData.details = '👀 Viewing: Bot Certification';
            presenceData.state = '🔱 Action: Browsing or Applying';
            presenceData.smallImageKey = 'cert';
            presenceData.smallImageText = 'Apply for Certification'
        
        } else if (loc === '/bots/add') {
            presenceData.details = '👀 Viewing: Add Bot Page'
            presenceData.state = '➕ Action: Submitting a Bot'
            presenceData.smallImageKey = 'robot'
            presenceData.smallImageText = 'Ooo Look at me Go!'

        }

    if (!showButtons) delete presenceData.buttons;
    if (showTimestamp) presenceData.startTimestamp = timestamp;

    if (!presenceData.details) {
        presence.setTrayTitle();
        presence.setActivity();
    } else presence.setActivity(presenceData);
});
