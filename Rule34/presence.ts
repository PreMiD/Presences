var presence = new Presence({
  clientId: "619967690056007699",
  mediaKeys: false
});

presence.on("UpdateData", async () => {
  var urlParams = new URLSearchParams(window.location.search);
  if (document.location.href.includes("rule34.xxx")) {
    if(document.location.pathname == "/") {
        var presenceData: presenceData = {
            details: "Viewing the homepage...",
            largeImageKey: "lg-r34"
        };
        presence.setActivity(presenceData);
    } else if(urlParams.get("page") && urlParams.get("s") && urlParams.get("page") == "post") {
        if(urlParams.get("s") == "list") {
            if(urlParams.get("tags")) {
                var presenceData: presenceData = {
                    details: "Searching...",
                    state: urlParams.get("tags").replace(" ", ", "),
                    largeImageKey: "lg-r34"
                };
                presence.setActivity(presenceData);
            } else {
                var presenceData: presenceData = {
                    details: "Viewing Posts List...",
                    largeImageKey: "lg-r34"
                };
                presence.setActivity(presenceData);
            }
        } else if(urlParams.get("s") == "view" && urlParams.get("id")) {
            var presenceData: presenceData = {
                details: "Viewing a Post...",
                state: "Post " + urlParams.get("id"),
                largeImageKey: "lg-r34"
            };
            presence.setActivity(presenceData);
        } else {
            var presenceData: presenceData = {
                largeImageKey: "lg-r34"
            };
            presence.setActivity(presenceData);
        }
    } else {
        var presenceData: presenceData = {
            largeImageKey: "lg-r34"
        };
        presence.setActivity(presenceData);
    }
}
else if (document.location.href.includes("rule34.paheal.net")) {
    var path = document.location.pathname.split("/");
    if(document.location.pathname == "/") {
        var presenceData: presenceData = {
            details: "Viewing the homepage...",
            largeImageKey: "lg-r34"
        };
        presence.setActivity(presenceData);
    } else if(path[1] == "post") {
        if(path[2] == "list" && path.length == 3) {
            var presenceData: presenceData = {
                details: "Viewing Posts List...",
                largeImageKey: "lg-r34"
            };
            presence.setActivity(presenceData);
        } else if(path[2] == "list" && path.length > 3) {
            var presenceData: presenceData = {
                details: "Searching...",
                state: path[3].replace("%20", ", ").replace("%21", "!"),
                largeImageKey: "lg-r34"
            };
            presence.setActivity(presenceData);
        } else if(path[2] == "view") {
            var presenceData: presenceData = {
                details: "Viewing a post...",
                state: "Post " + path[3],
                largeImageKey: "lg-r34"
            };
            presence.setActivity(presenceData);
        } else {
            var presenceData: presenceData = {
                largeImageKey: "lg-r34"
            };
            presence.setActivity(presenceData);
        }
    } else {
        var presenceData: presenceData = {
            largeImageKey: "lg-r34"
        };
        presence.setActivity(presenceData);
    }
}
});