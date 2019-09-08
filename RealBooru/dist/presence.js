var presence = new Presence({
    clientId: "620304668710535207",
    mediaKeys: false
});
presence.on("UpdateData", () => {
    var urlParams = new URLSearchParams(window.location.search);
    if (document.location.pathname == "/") {
        var presenceData = {
            details: "Viewing the homepage...",
            largeImageKey: "lg"
        };
        presence.setActivity(presenceData);
    }
    else if (urlParams.get("page") && urlParams.get("s") && urlParams.get("page") == "post") {
        if (urlParams.get("s") == "list") {
            if (urlParams.get("tags")) {
                var presenceData = {
                    details: "Searching...",
                    state: urlParams.get("tags").replace(" ", ", "),
                    largeImageKey: "lg"
                };
                presence.setActivity(presenceData);
            }
            else {
                var presenceData = {
                    details: "Viewing Posts List...",
                    largeImageKey: "lg"
                };
                presence.setActivity(presenceData);
            }
        }
        else if (urlParams.get("s") == "view" && urlParams.get("id")) {
            var presenceData = {
                details: "Viewing a Post...",
                state: "Post " + urlParams.get("id"),
                largeImageKey: "lg"
            };
            presence.setActivity(presenceData);
        }
        else {
            var presenceData = {
                largeImageKey: "lg"
            };
            presence.setActivity(presenceData);
        }
    }
    else {
        var presenceData = {
            largeImageKey: "lg"
        };
        presence.setActivity(presenceData);
    }
});
