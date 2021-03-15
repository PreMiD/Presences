const presence = new Presence({
    clientId: "821059536768335902"
}),
    timebrowsed = Math.floor(Date.now() / 1000);

function query(q: string) {
    return document.querySelector(q);
}
presence.on("UpdateData", async () => {
    const pathName = document.location.pathname,
        pages = pathName.split('/').filter(p => p),
        data: PresenceData = {
            largeImageKey: "largeimage",
            smallImageText: 'reading I guess',
            details: pathName,
            startTimestamp: timebrowsed
        };

    if (pages[0] === 'course') {
        data.details = 'Viewing Course';
        data.state = query(".page-header-headings").textContent;
    }
    if (pages[0] === 'my') {
        data.details = 'Viewing Dashboard';
    }
    if (pages.length === 0) {
        data.details = 'Viewing Landing Page';
    }
    if (pages[0] === 'calendar') {
        data.details = 'Viewing Calender';
    }
    if (pages[0] === 'user' && pages[1] === 'files.php') {
        data.details = 'Viewing Files';
        data.state = query(".fp-iconview").children.length + ' Files uploaded';
    }
    if (pages[0] === 'user' && pages[1].includes('profile.php')) {
        data.details = 'Viewing Profile';
    }
    if (pages[0] === 'user' && pages[1].includes('preferences.php')) {
        data.details = 'Editing Profile';
    }
    if (pages[0] === 'message') {
        data.details = 'Viewing Messages';
        data.state = (query('.count-container').textContent || 'No') + ' unread Messages';
    }
    if (pages[0] === 'grade' && pages[1] === 'report' && pages[2] === 'overview') {
        data.details = 'Viewing Grade Reports';
    }
    if (pages[0] === 'mod' && pages[1] === 'assign' && pages[2].includes('view.php')) {
        data.details = 'Submitting Assignment';
        data.state = query(".page-header-headings").textContent;
    }
    if (pages[0] === 'login' && pages[1].includes('index.php')) {
        data.details = 'Logging In . . .';
    }

    if (data.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else {
        presence.setActivity(data);
    }
});