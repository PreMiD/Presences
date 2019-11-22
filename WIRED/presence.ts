const presence = new Presence({
    clientId: '645051733961211934',
    mediaKeys: false
});

var elapsed, oldURL;

presence.on("UpdateData", async() => {
    let details, state;
    let title = document.title;

    if (window.location.href !== oldURL) {
        oldURL = window.location.href;
        elapsed = Math.floor(Date.now() / 1000);
    }

    if(document.location.pathname.includes("/gallery/") || document.location.pathname.includes("/story/")) {
        details = "Reading: ";
        state = title.replace(" | WIRED", "");
    } else if(document.location.pathname === "/video") {
        details = "Browsing: ";
        state = title.replace(" | WIRED", "");
    } else if(document.location.pathname.includes("/video/watch/")) {
        details = "Watching: ";
        state = title.replace(" | WIRED Video | CNE", "");
    } else if(document.location.pathname.includes("/author/") || document.location.pathname.includes("/category/") || document.location.pathname.includes("/coupons") || document.location.pathname.includes("/subscribe/") || document.location.pathname.includes("/wired-advertising/") || document.location.pathname.includes("/sitemap/") || document.location.pathname.includes("/about/") || document.location.pathname.includes("/securedrop/") || document.location.pathname.includes("/newsletter")) {
        details = "Browsing: ";
        state = title.replace(" | WIRED", "");
    } else {
        details = "Browsing: ";
        state = title;
    }
    
    var data: presenceData = {
        details: details,
        state: state,
        largeImageKey: "wired",
        startTimestamp: elapsed,
    };

    presence.setActivity(data);
});