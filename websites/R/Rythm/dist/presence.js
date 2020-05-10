const presence = new Presence({
    clientId: "683285340571566091"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    search: "presence.activity.searching",
    reading: "presence.activity.reading",
    browsing: "presence.activity.browsing"
});
presence.on("UpdateData", async () => {
    const host = window.location.hostname.replace("www.", "");
    const path = window.location.pathname.split("/").slice(1);
    const presenceData = {
        details: "Rythm",
        largeImageKey: "logo_big"
    };
    switch (host) {
        case "rythmbot.co":
            switch (path[0]) {
                case "features":
                    presenceData.details = "Features & Commands";
                    if (document.location.hash == "#list") {
                        presenceData.smallImageKey = "reading";
                        presenceData.smallImageText = (await strings).browsing;
                        presenceData.state = "Browsing Commands";
                    }
                    break;
                case "faq":
                    presenceData.details = "Frequently Asked Questions";
                    if (document.getElementById("search").value
                        .length > 0) {
                        presenceData.smallImageKey = "search";
                        presenceData.smallImageText = (await strings).search;
                        presenceData.state = `Searching for "${document.getElementById("search").value}"`;
                    }
                    else {
                        presenceData.smallImageKey = "reading";
                        presenceData.smallImageText = (await strings).reading;
                    }
                    break;
                case "troubleshooting":
                    presenceData.details = "Troubleshooting";
                    if (document.getElementById("search").value
                        .length > 0) {
                        presenceData.smallImageKey = "search";
                        presenceData.smallImageText = (await strings).search;
                        presenceData.state = `Searching for "${document.getElementById("search").value}"`;
                    }
                    else {
                        presenceData.smallImageKey = "reading";
                        presenceData.smallImageText = (await strings).reading;
                    }
                    break;
                case "contact":
                    presenceData.details = "Contact Us";
                    break;
                case "tos":
                    presenceData.details = "Terms of Service";
                    break;
                case "reviews":
                    presenceData.details = "Community Reviews";
                    break;
                case "invite":
                case "rythm":
                case "rythm2":
                case "rythmcanary":
                case "support":
                    presence.setTrayTitle();
                    presence.setActivity();
                    return;
                default:
                    presence.setTrayTitle();
                    presence.setActivity();
                    return;
            }
            break;
        case "web.rythmbot.co":
            presenceData.details = "Web Dashboard";
            break;
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsTUFBTSxFQUFFLDZCQUE2QjtJQUNyQyxPQUFPLEVBQUUsMkJBQTJCO0lBQ3BDLFFBQVEsRUFBRSw0QkFBNEI7Q0FDdkMsQ0FBQyxDQUFDO0FBRUwsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMxRCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFELE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxPQUFPLEVBQUUsT0FBTztRQUNoQixhQUFhLEVBQUUsVUFBVTtLQUMxQixDQUFDO0lBRUYsUUFBUSxJQUFJLEVBQUU7UUFFWixLQUFLLGFBQWE7WUFDaEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBRWYsS0FBSyxVQUFVO29CQUNiLFlBQVksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUM7b0JBQzdDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksT0FBTyxFQUFFO3dCQUNyQyxZQUFZLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQzt3QkFDdkMsWUFBWSxDQUFDLGNBQWMsR0FBRyxDQUFDLE1BQU0s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