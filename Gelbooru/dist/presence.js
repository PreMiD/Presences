var presence = new Presence({
    clientId: "620294187878711313",
    mediaKeys: false
});
presence.on("UpdateData", () => {
    var urlParams = new URLSearchParams(window.location.search);
    if (document.location.pathname == "/") {
        var presenceData = {
            details: "Viewing the homepage...",
            largeImageKey: "lg-gb"
        };
        presence.setActivity(presenceData);
    }
    else if (urlParams.get("page") && urlParams.get("s") && urlParams.get("page") == "post") {
        if (urlParams.get("s") == "list") {
            if (urlParams.get("tags")) {
                var presenceData = {
                    details: "Searching...",
                    state: urlParams.get("tags").replace(" ", ", "),
                    largeImageKey: "lg-gb"
                };
                presence.setActivity(presenceData);
            }
            else {
                var presenceData = {
                    details: "Viewing Posts List...",
                    largeImageKey: "lg-gb"
                };
                presence.setActivity(presenceData);
            }
        }
        else if (urlParams.get("s") == "view" && urlParams.get("id")) {
            var presenceData = {
                details: "Viewing a Post...",
                state: "Post " + urlParams.get("id"),
                largeImageKey: "lg-gb"
            };
            presence.setActivity(presenceData);
        }
        else {
            var presenceData = {
                largeImageKey: "lg-gb"
            };
            presence.setActivity(presenceData);
        }
    }
    else {
        var presenceData = {
            largeImageKey: "lg-gb"
        };
        presence.setActivity(presenceData);
    }
});
