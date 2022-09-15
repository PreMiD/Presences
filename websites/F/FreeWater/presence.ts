const presence = new Presence({
    clientId: "1019263816070082582",
}),
browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
    const presenceData: PresenceData = {
        largeImageKey: "logo",
        smallImageKey: "reading",
        smallImageText: "Watching FreeWaters website",
        startTimestamp: browsingTimestamp,
    };
    

    switch (document.location.pathname) {
        case "/": {
            presenceData.details = "Viewing Home Page";
            break;
        }
        case "/advertise/": {
            presenceData.details = "Viewing Advertisement Page";
            console.log("advertisement page")
            break;
        }
        case "/distribute/": {
            presenceData.details = "Viewing Distribute Page";
            console.log("distribute page")
            break;
        }
        case "/faq/": {
            presenceData.details = "Viewing FAQ Page";
            console.log("faq page")
            break;
        }
        case "/media/": {
            presenceData.details = "Viewing Media Page";
            console.log("media page")
            break;
        }
        case "/careers/": {
            presenceData.details = "Viewing Careers Page";
            console.log("careers page")
            break;
        }
        case "/contact-us/": {
            presenceData.details = "Viewing Contact Page";
            console.log("contact page")
            break;
        }
        case "/newsletter-signup/": {
            presenceData.details = "Signing Up for Newsletter";
            console.log("newsletter page")
            break;
        }
        case "/shop/": {
            presenceData.details = "Viewing Shop Page";
            console.log("shop page")
            break;
        }
    }
if (presenceData.details) presence.setActivity(presenceData);
else presence.setActivity();
});
