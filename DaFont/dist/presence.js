const presence = new Presence({
    clientId: "685827254256795677",
    mediaKeys: false
});

presence.on('UpdateData', () => {
    const presenceData = {
            largeImageKey: "dafont"
        },
        Path = document.location.pathname,
        Details = {};
    presenceData.startTimestamp = Math.floor(Date.now() / 1000)
    if (Path.startsWith('/')) {
        if (Path.length > 1) {
            presenceData.details = `Viewing a font's page :`
            presenceData.state = `${document.querySelector('#width > div > div > div > div:nth-child(9) > h1').textContent} ( ${document.querySelector('#width > div > div > div > div:nth-child(9) > div.lv2right > span').textContent} )`
        } else {
            Details.Fonts = {
                total: document.querySelector('#width > div.minwidth > div > div > div:nth-child(9) > div:nth-child(3) > div.dfsmall > strong').textContent
            }
            presenceData.details = `Browsing the main page :`
            presenceData.state = `${Details.Fonts.total}`
        }
    } else if (Path.startsWith('/themes.php')) {
        Details.Themes = {
            total: document.querySelector('#menuthemespp > table > tbody > tr').children.length
        }
        presenceData.details = `Browsing the theme's page :`
        presenceData.state = `${Details.Themes.total} total themes`
    } else if (Path.startsWith('/theme.php')) {
        Details.SubTheme = {
            path: document.querySelector('#width > div > div > div > div:nth-child(9) > div:nth-child(3) > div.dffont2').innerHTML.replace('&gt;', '>')
        }
        presenceData.details = `Browsing a sub-theme's page :`
        presenceData.state = `${Details.SubTheme.path}`
    } else if (Path.startsWith('/mtheme.php')) {
        Details.MainTheme = {
            path: document.querySelector('#width > div > div > div > div:nth-child(9) > div:nth-child(5) > div.dffont2').innerHTML
        }
        presenceData.details = `Browsing a main-theme's page :`
        presenceData.state = `${Details.MainTheme.path}`
    } else if (Path.startsWith('/new.php')) {
        Details.NewFonts = {
            total: document.querySelector('#width > div > div > div > div:nth-child(9) > div:nth-child(5) > span > span').textContent
        }
        presenceData.details = `Browsing the new fonts :`
        presenceData.state = `${Details.NewFonts.total}`
    } else if (Path.startsWith('/top.php')) {
        Details.TopFonts = {
            timePeriod: document.location.search.length > 1 ? 'All Time' : 'Yesterda'
        }
        presenceData.details = `Browsing the top fonts :`
        presenceData.state = `${Details.TopFonts.timePeriod}`
    } else if (Path.startsWith('/authors.php')) {
        presenceData.details = `Browsing the authors :`
        if (document.location.search.startsWith('?letter')) {
            presenceData.state = `Sorted by letter : ${document.location.search.replace('?letter=','').toUpperCase()}`
        } else if (document.location.search.startsWith('?cc')) {
            presenceData.state = `Sorted by country : ${document.querySelector('#width > div > div.layout > div > div:nth-child(9) > div > div:nth-child(2) > div:nth-child(11) > div:nth-child(1)').innerHTML}`
        } else {
            presenceData.state = `All authors`
        }
    } else if (Path.startsWith('/forum')) {
        presenceData.details = `On the forum`
    } else if (Path.startsWith('/faq.php')) {
        presenceData.details = `Reading the FAQ `
    } else if (Path.startsWith('/soft.php')) {
        presenceData.details = `Viewing the tools `
    } else if (Path.startsWith('/login.php')) {
        presenceData.details = `Logging into their account `
    } else if (Path.startsWith('/register.php')) {
        presenceData.details = `Registering a new account  `
    }
    presence.setActivity(presenceData);
});
