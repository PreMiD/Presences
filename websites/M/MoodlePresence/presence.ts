const presence = new Presence({
    clientId: "821059536768335902"
}),
    timebrowsed = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
    const pathName = document.location.pathname,
        pages = pathName.split('/').filter(p => p),
        data: PresenceData = {
            largeImageKey: "largeimage",
            smallImageText: 'Reading . . .',
            startTimestamp: timebrowsed
        };
    let displayCourse = await presence.getSetting('displayCourse')

    if (pages[0] === 'course') {
        data.details = 'Viewing Course';
        if (displayCourse) data.state = document.querySelector(".page-header-headings").textContent;
    }
    else if (pages[0] === 'my') {
        data.details = 'Viewing Dashboard';
    }
    else if (pages.length === 0) {
        data.details = 'Viewing Landing Page';
    }
    else if (pages[0] === 'calendar') {
        data.details = 'Viewing Calender';
    }
    else if (pages[0] === 'user' && pages[1] === 'files.php') {
        data.details = 'Viewing Files';
        data.state = document.querySelector(".fp-iconview").children.length + ' Files uploaded';
    }
    else if (pages[0] === 'user' && pages[1].includes('profile.php')) {
        data.details = 'Viewing Profile';
    }
    else if (pages[0] === 'user' && pages[1].includes('preferences.php')) {
        data.details = 'Editing Profile';
    }
    else if (pages[0] === 'message') {
        data.details = 'Viewing Messages';
        data.state = (document.querySelector('.count-container').textContent || 'No') + ' unread Messages';
    }
    else if (pages[0] === 'grade' && pages[1] === 'report' && pages[2] === 'overview') {
        data.details = 'Viewing Grade Reports';
    }
    else if (pages[0] === 'mod' && pages[1] === 'assign' && pages[2].includes('view.php')) {
        data.details = 'Submitting Assignment';
        if (displayCourse) data.state = document.querySelector(".page-header-headings").textContent;
    }
    else if (pages[0] === 'login' && pages[1].includes('index.php')) {
        data.details = 'Logging In . . .';
    }

    if (data.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else {
        presence.setActivity(data);
    }
});