var presence = new Presence({
    clientId: "829634899748716546"
});

presence.on("UpdateData", async () => {
    const presenceData: PresenceData = {
        largeImageKey: "logo",
    };

    const stamps = Math.floor(Date.now() / 1000)

    if (document.location.hostname == "cordx.wtf") {
        presenceData.details = "Viewing the Home Page!"
        presenceData.smallImageKey = "eyes"
        presenceData.smallImageText = "Home"
        presenceData.startTimestamp = stamps;
        if (document.location.pathname.includes('/dashboard')) {
            presenceData.details = "Viewing the Dashboard!";
            presenceData.smallImageKey = "eyes"
            presenceData.smallImageText = "Dashboard"
        } else if (document.location.pathname.includes("/login")) {
            presenceData.smallImageKey = "link"
            presenceData.smallImageText = "OAuth Login"
            presenceData.details = "Generating a Short Link"
        } else if (document.location.pathname.includes("/short")) {
            presenceData.smallImageKey = "link"
            presenceData.smallImageText = "Generating"
            presenceData.details = "Generating a Short Link"
        } else if (document.location.pathname.includes(".png")) {
            presenceData.details = "Viewing a PNG Image"
            presenceData.smallImageKey = "png"
        } else if (document.location.pathname.includes(".gif")) {
            presenceData.details = "Viewing a GIF Image"
            presenceData.smallImageKey = "gif"
        } else if (document.location.pathname.includes(".jpg")) {
            presenceData.details = "Viewing a JPG Image"
            presenceData.smallImageKey = "jpg"
        } else if (document.location.pathname.includes("/u/")) {
            presenceData.details = "Viewing a Short Link"
            presenceData.smallImageKey = "viewing"
            presenceData.smallImageText = "Short Links"
        } else if (document.location.pathname.includes(".css")) {
            presenceData.details = "Viewing a CSS File"
            presenceData.smallImageKey = "css"
            presenceData.smallImageText = "Cascading Style"
        } else if  (document.location.pathname.includes(".scss")) {
            presenceData.smallImageKey = "scss"
            presenceData.details = "Viewing a SASS File"
            presenceData.smallImageText = "Syntactically Awesome"
        } else if (document.location.pathname.includes(".md")) {
            presenceData.smallImageKey = "md"
            presenceData.details = "Viewing a MD File"
            presenceData.smallImageText = "MarkDown"
        } else if (document.location.hostname.includes('.js')) {
            presenceData.smallImageKey = "js"
            presenceData.details = "Viewing a JS File"
            presenceData.smallImageText = "JavaScript"
        } else if (document.location.pathname.includes(".py")) {
            presenceData.smallImageKey = "py"
            presenceData.details = "Viewing a PY File"
            presenceData.smallImageText = "Python"
        } else if (document.location.pathname.includes(".ts")) {
            presenceData.smallImageKey = "ts"
            presenceData.details = "Viewing a TS File"
            presenceData.smallImageText = "TypeScript"
        }
    }

    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else {
        presence.setActivity(presenceData);
    }
});
