const presence = new Presence({
    clientId: "809898713996066827"
});
var tmb = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const presenceData = {
        smallImageKey: "google",
        smallImageText: "Google"
    }, path = document.location.pathname.toLowerCase(), showcon = await presence.getSetting("showContact");
    if (path === "/" || path.includes("/intl/")) {
        presenceData.largeImageKey = "icon";
        presenceData.details = "Home page";
        presenceData.startTimestamp = tmb;
    }
    else if (path === "/web/authentication") {
        presenceData.largeImageKey = "icon";
        presenceData.details = "Authentication page";
        presenceData.startTimestamp = tmb;
    }
    else if (path === "/web/conversations") {
        presenceData.details = "Browsing conversations";
        presenceData.largeImageKey = "icon";
        presenceData.startTimestamp = tmb;
    }
    else if (path.includes("/web/conversations/") && path !== "/web/conversations/new") {
        if (!showcon) {
            presenceData.state = "Hidden (adjustable in Presence settings)";
        }
        else {
            var itl = document.getElementsByClassName("title-container")[0].querySelector("h2 > span > span").textContent;
            presenceData.state = itl;
        }
        presenceData.details = "Reading messages from:";
        presenceData.largeImageKey = "icon";
        presenceData.startTimestamp = tmb;
    }
    else if (path === "/web/conversations/new") {
        presenceData.largeImageKey = "icon";
        presenceData.details = "New conversation page";
        presenceData.startTimestamp = tmb;
    }
    else if (path === "/web/settings") {
        presenceData.largeImageKey = "icon";
        presenceData.details = "Browsing settings";
        presenceData.startTimestamp = tmb;
    }
    else {
        presenceData.largeImageKey = "icon";
        presenceData.details = "Browsing on Google Messages";
        presenceData.startTimestamp = tmb;
    }
    ;
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
    ;
});
