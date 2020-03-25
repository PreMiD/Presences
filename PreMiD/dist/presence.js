var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "688166209736409100",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing",
    reading: "presence.activity.reading"
}), host, path, timestamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    var data = {
        largeImageKey: "lg",
        startTimestamp: timestamp
    };
    (host = document.location.hostname), (path = document.location.pathname);
    if (host === "premid.app" || host === "beta.premid.app") {
        host.includes("beta") ? (data.state = "Beta") : delete data.state;
        data.smallImageKey = "search";
        data.smallImageText = (yield strings).browsing;
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
        data.smallImageText = (yield strings).reading;
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
        data.smallImageText = (yield strings).browsing;
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
}));
function pathIncludes(string) {
    return document.location.pathname.toLowerCase().includes(string);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ2pCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsUUFBUSxFQUFFLDRCQUE0QjtJQUN0QyxPQUFPLEVBQUUsMkJBQTJCO0NBQ3JDLENBQUMsRUFDRixJQUFZLEVBQ1osSUFBWSxFQUNaLFNBQVMsR0FBUSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVqRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFTLEVBQUU7SUFDbkMsSUFBSSxJQUFJLEdBQWlCO1FBQ3ZCLGFBQWEsRUFBRSxJQUFJO1FBQ25CLGNBQWMsRUFBRSxTQUFTO0tBQzFCLENBQUM7SUFFRixDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFekUsSUFBSSxJQUFJLEtBQUssWUFBWSxJQUFJLElBQUksS0FBSyxpQkFBaUIsRUFBRTtRQUN2RCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNsRSxJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztRQUM5QixJQUFJLENBQUMsY0FBYyxHQUFH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