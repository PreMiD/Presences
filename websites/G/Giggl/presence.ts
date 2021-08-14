const presence: Presence = new Presence({
    clientId: "876239113307709493"
});

presence.on("UpdateData", async () => {
    const presenceData: PresenceData = {
        largeImageKey: "lg"
    };

    console.log(1);

    // Presence for Giggl's static landing page
    if (document.location.hostname === "giggl.app") {
        switch (document.location.pathname) {
            case "/":
                presenceData.details = "Viewing the home page";
                break;
            case "/jobs":
                presenceData.details = "Reading about jobs";
                break;
            case "/isp":
                presenceData.details = "Reading about Giggl Networking";
                break;
        }

    // Presence for Giggl itself
    } else if (document.location.hostname === "canary.giggl.app") {
        console.log(2);
        presenceData.details = "Browsing Giggl";

        // If in a portal, set status to that
        if (document.location.pathname.startsWith("/portal")) {
            presenceData.details = "In a Portal";
            presenceData.state = document.querySelector("title").innerText.split(" • ")[0];
        }

        // Check if in a call
        if (document.querySelector("svg.feather.feather-phone-missed")) {
            presenceData.smallImageKey = "call";
            presenceData.smallImageText = "In a call";
        }

    // Presence for status page
    } else if (document.location.hostname === "status.giggl.app") 
        presenceData.details = "Viewing the status page";
    

    presence.setActivity(presenceData);
});