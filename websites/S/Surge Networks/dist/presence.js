const presence = new Presence({
    clientId: "855897042010243112"
});
presence.on("UpdateData", async () => {
    const data = {
        largeImageKey: "vector"
    };
    if (window.location.hostname == "surge-networks.co.uk") {
        data.details = "Viewing Landing Page";
    }
    if (window.location.hostname == "cdn.surge-networks.co.uk") {
        data.details = "Viewing CDN";
    }
    if (window.location.hostname == "support.surge-networks.co.uk") {
        data.details = "Viewing Support Page";
    }
    if (window.location.hostname == "webmail.surge-networks.co.uk") {
        data.details = "Viewing Emails";
    }
    if (window.location.hostname == "status.surge-networks.co.uk") {
        data.details = "Viewing Status Page";
    }
    if (window.location.hostname == "forums.surge-networks.co.uk") {
        data.details = "Browsing Forums";
    }
    presence.setActivity(data);
});
