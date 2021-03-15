const presence = new Presence({
    clientId: "821059536768335902"
}),
    timebrowsed = Math.floor(Date.now() / 1000);


function query(q: string) {
    return document.querySelector(q);
}

presence.on("UpdateData", async () => {
    const pathName = document.location.pathname,
        pages = pathName.split('/').filter(p => p);

    const presenceData: PresenceData = {
        largeImageKey: "largeimage",
        // smallImageKey:    "smallimage",
        smallImageText: 'reading I guess',
        details: pathName,
        //  state: "Reading something . . .",
        startTimestamp: timebrowsed,
    };

    if (pages[0] === 'course') {
        presenceData.details = 'Viewing Course'
        presenceData.state = query(".page-header-headings").textContent;
    }
    if (pages[0] === 'my') {
        presenceData.details = 'Viewing Dashboard'
    }
    if (pages.length === 0) {
        presenceData.details = 'Viewing Landing Page'
    }
    if (pages[0] === 'calendar') {
        presenceData.details = 'Viewing Calender'
    }
    if (pages[0] === 'user' && pages[1] === 'files.php') {
        presenceData.details = 'Viewing Files'
        presenceData.state = query(".fp-iconview").children.length + ' Files uploaded'
    }
    if (pages[0] === 'user' && pages[1].includes('profile.php')) {
        presenceData.details = 'Viewing Profile'
    }
    if (pages[0] === 'user' && pages[1].includes('preferences.php')) {
        presenceData.details = 'Editing Profile'
    }
    if (pages[0] === 'message') {
        presenceData.details = 'Viewing Messages'
        presenceData.state = (query('.count-container').textContent || 'No') + ' unread Messages'
    }
    if (pages[0] === 'grade' && pages[1] === 'report' && pages[2] === 'overview') {
        presenceData.details = 'Viewing Grade Reports'
    }
    if (pages[0] === 'mod' && pages[1] === 'assign' && pages[2].includes('view.php')) {
        presenceData.details = 'Submitting Assignment'
        presenceData.state = query(".page-header-headings").textContent;
    }
    if (pages[0] === 'login' && pages[1].includes('index.php')) {
        presenceData.details = 'Logging In . . .'
    }


    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else {
        presence.setActivity(presenceData);
    }
});