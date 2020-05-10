const presence = new Presence({
    clientId: "681116862930747520"
}), strings = presence.getStrings({
    browsing: "presence.activity.browsing",
    reading: "presence.activity.reading"
});
let browsingStamp = 0;
presence.on("UpdateData", async () => {
    const host = window.location.hostname.replace("www.", "");
    const path = window.location.pathname.split("/").slice(1);
    const presenceData = {
        details: "Keep Talking and Nobody Explodes",
        largeImageKey: "logo_big"
    };
    switch (host) {
        case "keeptalkinggame.com":
            switch (path[0]) {
                case "faq":
                    browsingStamp = 0;
                    presenceData.details = "Frequently Asked Questions";
                    break;
                case "commercial-license":
                    browsingStamp = 0;
                    presenceData.details = "Commercial Licensing";
                    break;
                case "non-commercial-use":
                    browsingStamp = 0;
                    presenceData.details = "Non-Commercial Use";
                    break;
                case "community":
                    browsingStamp = 0;
                    presenceData.details = "Community";
                    break;
                case "presskit":
                    browsingStamp = 0;
                    presenceData.details = "Press Kit";
                    break;
                case "contact-us":
                    browsingStamp = 0;
                    presenceData.details = "Contact Us";
                    break;
                case "privacy-policy":
                    browsingStamp = 0;
                    presenceData.details = "Privacy Policy";
                    break;
                default:
                    presence.setTrayTitle();
                    presence.setActivity();
                    return;
            }
            break;
        case "bombmanual.com":
            switch (path[0]) {
                case "print":
                case "web":
                    if (!browsingStamp)
                        browsingStamp = Math.floor(Date.now() / 1000);
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.smallImageKey = "reading";
                    presenceData.smallImageText = (await strings).reading;
                    presenceData.details = "Bomb Defusal Manual";
                    break;
                case "how-to-play-pc.html":
                case "how-to-play-mobile.html":
                case "how-to-play-switch.html":
                case "how-to-play-xbox.html":
                case "how-to-play-playstation.html":
                case "how-to-play-vr.html":
                case "how-to-play-psvr.html":
                case "how-to-play-gear-vr.html":
                case "how-to-play-oculus-go.html":
                case "how-to-play-oculus-quest.html":
                case "how-to-play-daydream.html":
                    browsingStamp = 0;
                    presenceData.details = "How to Play";
                    var platform = null;
                    switch (path[0].replace("how-to-play-", "").replace(".html", "")) {
                        case "pc":
                            platform = "PC/Mac/Linux";
                            break;
                        case "mobile":
                            platform = "iOS/Android";
                            break;
                        case "switch":
                            platform = "Nintendo Switch™";
                            break;
                        case "xbox":
                            platform = "Xbox One";
                            break;
                        case "playstation":
                            platform = "PlayStation®4";
                            break;
                        case "vr":
                            platform = "Oculus Rift/HTC Vive";
                            break;
                        case "psvr":
                            platform = "PlayStation®VR";
                            break;
                        case "gear-vr":
                            platform = "Samsung Gear VR";
                            break;
                        case "oculus-go":
                            platform = "Oculus Go";
                            break;
                        case "oculus-quest":
                            platform = "Oculus Quest";
                            break;
                        case "daydream":
                            platform = "Daydream";
                            break;
                        default:
                            break;
                    }
                    if (platform)
                        presenceData.state = `on ${platform}`;
                    break;
                case "other-languages.html":
                    browsingStamp = 0;
                    presenceData.details = "Other Languages";
                    break;
                case "index.html":
                    presence.setTrayTitle();
                    presence.setActivity();
                    return;
                default:
                    presence.setTrayTitle();
                    presence.setActivity();
                    return;
            }
            break;
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixRQUFRLEVBQUUsNEJBQTRCO0lBQ3RDLE9BQU8sRUFBRSwyQkFBMkI7Q0FDckMsQ0FBQyxDQUFDO0FBRUwsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDO0FBRXRCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDMUQsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRCxNQUFNLFlBQVksR0FBaUI7UUFDakMsT0FBTyxFQUFFLGtDQUFrQztRQUMzQyxhQUFhLEVBQUUsVUFBVTtLQUMxQixDQUFDO0lBRUYsUUFBUSxJQUFJLEVBQUU7UUFFWixLQUFLLHFCQUFxQjtZQUN4QixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFFZixLQUFLLEtBQUs7b0JBQ1IsYUFBYSxHQUFHLENBQUMsQ0FBQztvQkFFbEIsWUFBWSxDQUFDLE9BQU8sR0FBRyw0QkFBNEIsQ0FBQztvQkFDcEQsTUFBTTtnQkFFUixLQUFLLG9CQUFvQjtvQkFDdkIsYUFBYSxHQUFHLENBQUMsQ0FBQztvQkFFbEIsWUFBWSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztvQkFDOUMsTUFBTTtnQkFFUixLQUFLLG9CQUFvQjtvQkFDdkIs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