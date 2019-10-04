let presence = new Presence({
    clientId: '629413852391669791'
});
let presenceData: presenceData = {
    largeImageKey: 'kitsu_lg'
}

let path, user: string;
let strings = presence.getStrings({
    "browsing": "presence.activity.browsing"
})

presence.on('UpdateData', async () => {
    path = window.location.pathname;

    if (path == '/' || path.startsWith('/explore')) {
        presenceData.details = (await strings).browsing;
        delete presenceData.state;
    } else if (path.includes('/users') && !path.includes('/library')) {
        user = document.querySelector(".cover-username").textContent.trim();
        presenceData.details = `Viewing ${user} profile`;

        delete presenceData.state, presenceData.startTimestamp;
    } else if (path.includes('/library')) {
        user = document.querySelector(".cover-username").textContent.trim();
        presenceData.details = `Viewing ${user} profile`;
        presenceData.state = 'Viewing their library';
    } else if (path.startsWith('/anime/')) {
        presenceData.details = 'Looking through anime'
        presenceData.state = `Viewing ${document.querySelector('h3').textContent.trim()}`;
    } else if (path.startsWith('/anime') && !path.startsWith('/anime/')) {
        presenceData.details = 'Browsing for anime'

        delete presenceData.state
    } else if (path.startsWith('/manga/')) {
        presenceData.details = 'Looking through manga'
        presenceData.state = `Viewing ${document.querySelector('h3').textContent.trim()}`;
    } else if (path.startsWith('/manga') && !path.startsWith('/manga/')) {
        presenceData.details = 'Browsing for manga'

        delete presenceData.state
    } else if (path.startsWith('/groups/')) {
        presenceData.details = 'Looking through groups'
        presenceData.state = `Viewing ${document.querySelector('.cover-username').textContent.trim()}`;
    } else if (path.startsWith('/groups') && !path.startsWith('/groups/')) {
        presenceData.details = 'Browsing for groups'

        delete presenceData.state
    } else if (path.startsWith('/feedback')) {
        presenceData.details = 'Browsing feedback section'
        switch (path.split('/')[2]) {
            case 'bugs':
                presenceData.state = 'Viewing bugs'
            
                break;

            case 'feature-requests':
                presenceData.state = 'Viewing feature requests'

                break;

            case 'database-requests':
                presenceData.state = 'Viewing database requests'

                break;

            case 'mobile-bugs':
                presenceData.state = 'Viewing mobile bugs'

                break;

            case 'mobile-features':
                presenceData.state = 'Viewing mobile features'

                break;

            default:
                presenceData.state = 'some unknown place'
        }
    }

    presence.setActivity(presenceData, true);
})
