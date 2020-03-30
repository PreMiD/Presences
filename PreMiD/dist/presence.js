var presence = new Presence({
    clientId: "688166209736409100"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing",
    reading: "presence.activity.reading"
}), host, path, timestamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    var data = {
        largeImageKey: "lg",
        startTimestamp: timestamp
    };
    (host = document.location.hostname), (path = document.location.pathname);
    if (host === "premid.app" || host === "beta.premid.app") {
        host.includes("beta") ? (data.state = "Beta") : delete data.state;
        data.smallImageKey = "search";
        data.smallImageText = (await strings).browsing;
        switch (true) {
            case pathIncludes("/downloads"):
                data.details = "Downloads";
                break;
            case pathIncludes("/contributors"):
                data.details = "Contributors";
                break;
            case pathIncludes("/beta"):
                data.details = "Beta";
                break;
            case pathIncludes("/partner"):
                data.details = "Partners";
                break;
            case pathIncludes("/cookies"):
            case pathIncludes("/privacy"):
            case pathIncludes("/tos"):
                data.details = "Policies";
                break;
            case pathIncludes("/users/"):
                data.details = document.querySelector("div.user-data p")
                    ? document
                        .querySelector("div.user-data p")
                        .textContent.replace(/[\s\n]+/gi, "")
                    : "...";
                data.state = "User page";
                break;
            case pathIncludes("/store/presences/"):
                data.details = document.querySelector("h1.presence-name")
                    ? document
                        .querySelector("h1.presence-name")
                        .textContent.replace(/[\s\n]+/gi, "")
                    : "Store";
                data.state = "Presence page";
                break;
            case pathIncludes("/store"):
                data.details = "Store";
                break;
            default:
                data.details = "Home";
        }
    }
    else if (host === "docs.premid.app") {
        data.state = "Docs";
        data.smallImageKey = "reading";
        data.smallImageText = (await strings).reading;
        switch (true) {
            case pathIncludes("/troubleshooting"):
                data.details = "Troubleshooting";
                break;
            case pathIncludes("/install/requirements"):
                data.details = "System requirements";
                break;
            case pathIncludes("/install/windows"):
                data.details = "Installing on Windows";
                break;
            case pathIncludes("/install/macos"):
                data.details = "Installing on MacOS";
                break;
            case pathIncludes("/install/linux"):
                data.details = "Installing on Linux";
                break;
            case pathIncludes("/install/firefox"):
                data.details = "Installing on Firefox";
                break;
            case pathIncludes("/install/chromium"):
                data.details = "Installing on Chromium-based browsers";
                break;
            case pathIncludes("/install"):
                data.details = "Installation";
                break;
            case pathIncludes("/dev/presence/tsconfig"):
                data.details = "Configuring TypeScript";
                break;
            case pathIncludes("/dev/presence/metadata"):
                data.details = "Configuring metadata.json";
                break;
            case pathIncludes("/dev/presence/iframe"):
                data.details = "Understanding iframe";
                break;
            case pathIncludes("/dev/presence/class"):
                data.details = "Presence class";
                break;
            case pathIncludes("/dev/presence"):
                data.details = "Presence development";
                break;
            case pathIncludes("/dev/api/v2"):
                data.details = "Understanding API v2";
                break;
            case pathIncludes("/dev/api/v1"):
                data.details = "Understanding API v1";
                break;
            case pathIncludes("/dev/api"):
                data.details = "Understanding API";
                break;
            case pathIncludes("/dev"):
                data.details = "Getting started";
                break;
            case pathIncludes("/about"):
                data.details = "About PreMiD";
                break;
            case pathIncludes("/home"):
            default:
                data.details = "Home";
        }
    }
    else if (host === "status.premid.app") {
        data.state = "Status page";
        data.smallImageKey = "search";
        data.smallImageText = (await strings).browsing;
        switch (true) {
            case pathIncludes("/incidents"):
                data.details =
                    "Viewing: " + document.title.replace("PreMiD Status - ", "");
                break;
            case pathIncludes("/history"):
                data.details = "Incident history";
                break;
            case pathIncludes("/uptime"):
                data.details = "Uptime history";
                break;
            default:
                data.details = "Home";
        }
    }
    presence.setActivity(data);
});
function pathIncludes(string) {
    return document.location.pathname.toLowerCase().includes(string);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsUUFBUSxFQUFFLDRCQUE0QjtJQUN0QyxPQUFPLEVBQUUsMkJBQTJCO0NBQ3BDLENBQUMsRUFDRixJQUFZLEVBQ1osSUFBWSxFQUNaLFNBQVMsR0FBUSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVoRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxJQUFJLElBQUksR0FBaUI7UUFDeEIsYUFBYSxFQUFFLElBQUk7UUFDbkIsY0FBYyxFQUFFLFNBQVM7S0FDekIsQ0FBQztJQUVGLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUV6RSxJQUFJLElBQUksS0FBSyxZQUFZLElBQUksSUFBSSxLQUFLLGlCQUFpQixFQUFFO1FBQ3hELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1FBQzlCLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFD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