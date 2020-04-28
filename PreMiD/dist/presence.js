var presence = new Presence({
    clientId: "688166209736409100"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing",
    reading: "presence.activity.reading"
}), host, timestamp = Math.floor(Date.now() / 1000);
function pathIncludes(string) {
    return document.location.pathname.toLowerCase().includes(string);
}
presence.on("UpdateData", async () => {
    var data = {
        largeImageKey: "lg",
        startTimestamp: timestamp
    };
    host = document.location.hostname;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsUUFBUSxFQUFFLDRCQUE0QjtJQUN0QyxPQUFPLEVBQUUsMkJBQTJCO0NBQ3JDLENBQUMsRUFDRixJQUFZLEVBQ1osU0FBUyxHQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBR2pELFNBQVMsWUFBWSxDQUFDLE1BQWM7SUFDbEMsT0FBTyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbkUsQ0FBQztBQUVELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksSUFBSSxHQUFpQjtRQUN2QixhQUFhLEVBQUUsSUFBSTtRQUNuQixjQUFjLEVBQUUsU0FBUztLQUMxQixDQUFDO0lBRUYsSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO0lBRWxDLElBQUksSUFBSSxLQUFLLFlBQVksSUFBSSxJQUFJLEtBQUssaUJBQWlCLEVBQUU7UUFDdkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDbEUsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7UUFDOUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBRS9DLFFBQVEsSUFBSSxFQUFFO1lBQ1osS0FBSyxZQUFZLENBQUMsWUFBWSxDQUFDO2dCQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztnQkFDM0IsTUFBTTtZQUNSLEtBQUssWUFBWSxDQUFDLGVBQWUsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7Z0JBQzlCLE1BQU07WUFDUixLQUFLLFlBQVksQ0FBQyxPQUFPLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO2dCQUN0QixNQUFNO1lBQ1IsS0FBSyxZQUFZLENBQUMsVUFBVSxDQUFDO2dCQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztnQkFDMUIsTUFBTTtZQUNSLEtBQUssWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzlCLEtBQUssWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzlCLEtBQUssWUFBWSxDQUFDLE1BQU0sQ0FBQztnQkFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7Z0JBQzFCLE1BQU07WUFDUixLQUFLLFlBQVksQ0FBQyxTQUFTLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQztvQkFDdEQsQ0FBQyxDQUFDLFFBQVE7eUJBQ0wsYUFBYSxDQUFDLGlCQUFpQixDQUFDO3lCQUNoQyxXQUFXLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUM7b0JBQ3pDLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQ1YsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7Z0JBQ3pCLE1BQU07WUFDUixLQUFLLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDO29CQUN2RCxDQUFDLENBQUMsUUFBUTt5QkFDTCxhQUFhLENBQUMsa0JBQWtCLENBQUM7eUJBQ2pDLFdBQVcsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQztvQkFDekMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDWixJQUFJLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQztnQkFDN0IsTUFBTTtZQUNSLEtBQUssWUFBWSxDQUFDLFFBQVEsQ0FBQztnQkFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7Z0JBQ3ZCLE1BQU07WUFDUjtnQkFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztTQUN6QjtLQUNGO1NBQU0sSUFBSSxJQUFJLEtBQUssaUJBQWlCLEVBQUU7UUFDckMsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7UUFDcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7UUFDL0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBRTlDLFFBQVEsSUFBSSxFQUFFO1lBQ1osS0FBSyxZQUFZLENBQUMsa0JBQWtCLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUM7Z0JBQ2pDLE1BQU07WUFDUixLQUFLLFlBQVksQ0FBQyx1QkFBdUIsQ0FBQztnQkFDeEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztnQkFDckMsTUFBTTtZQUNSLEtBQUssWUFBWSxDQUFDLGtCQUFrQixDQUFDO2dCQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLHVCQUF1QixDQUFDO2dCQUN2QyxNQUFNO1lBQ1IsS0FBSyxZQUFZLENBQUMsZ0JBQWdCLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUM7Z0JBQ3JDLE1BQU07WUFDUixLQUFLLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztnQkFDckMsTUFBTTtZQUNSLEtBQUssWUFBWSxDQUFDLGtCQUFrQixDQUFDO2dCQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLHVCQUF1QixDQUFDO2dCQUN2QyxNQUFNO1lBQ1IsS0FBSyxZQUFZLENBQUMsbUJBQW1CLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsdUNBQXVDLENBQUM7Z0JBQ3ZELE1BQU07WUFDUixLQUFLLFlBQVksQ0FBQyxVQUFVLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO2dCQUM5QixNQUFNO1lBQ1IsS0FBSyxZQUFZLENBQUMsd0JBQXdCLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUM7Z0JBQ3hDLE1BQU07WUFDUixLQUFLLFlBQVksQ0FBQyx3QkFBd0IsQ0FBQztnQkFDekMsSUFBSSxDQUFDLE9BQU8sR0FBRywyQkFBMkIsQ0FBQztnQkFDM0MsTUFBTTtZQUNSLEtBQUssWUFBWSxDQUFDLHNCQUFzQixDQUFDO2dCQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO2dCQUN0QyxNQUFNO1lBQ1IsS0FBSyxZQUFZLENBQUMscUJBQXFCLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxPQUFPLEdBQUcsZ0JBQWdCLENBQUM7Z0JBQ2hDLE1BQU07WUFDUixLQUFLLFlBQVksQ0FBQyxlQUFlLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7Z0JBQ3RDLE1BQU07WUFDUixLQUFLLFlBQVksQ0FBQyxhQUFhLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7Z0JBQ3RDLE1BQU07WUFDUixLQUFLLFlBQVksQ0FBQyxhQUFhLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7Z0JBQ3RDLE1BQU07WUFDUixLQUFLLFlBQVksQ0FBQyxVQUFVLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7Z0JBQ25DLE1BQU07WUFDUixLQUFLLFlBQVksQ0FBQyxNQUFNLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUM7Z0JBQ2pDLE1BQU07WUFDUixLQUFLLFlBQVksQ0FBQyxRQUFRLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO2dCQUM5QixNQUFNO1lBQ1IsS0FBSyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDM0I7Z0JBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7U0FDekI7S0FDRjtTQUFNLElBQUksSUFBSSxLQUFLLG1CQUFtQixFQUFFO1FBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDO1FBQzNCLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1FBQzlCLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUUvQyxRQUFRLElBQUksRUFBRTtZQUNaLEtBQUssWUFBWSxDQUFDLFlBQVksQ0FBQztnQkFDN0IsSUFBSSxDQUFDLE9BQU87b0JBQ1YsV0FBVyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUMvRCxNQUFNO1lBQ1IsS0FBSyxZQUFZLENBQUMsVUFBVSxDQUFDO2dCQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO2dCQUNsQyxNQUFNO1lBQ1IsS0FBSyxZQUFZLENBQUMsU0FBUyxDQUFDO2dCQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDO2dCQUNoQyxNQUFNO1lBQ1I7Z0JBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7U0FDekI7S0FDRjtJQUNELFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDN0IsQ0FBQyxDQUFDLENBQUMifQ==