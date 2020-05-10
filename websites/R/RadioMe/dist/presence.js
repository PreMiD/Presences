const presence = new Presence({
    clientId: "660519861742731264"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browse: "presence.activity.browsing",
    search: "presence.activity.searching"
});
let language = navigator.language;
var lastRadio = "";
var browsingStamp = 0;
switch (language) {
    case "de":
    case "de-CH":
    case "de-AT":
    case "de-LU":
    case "de-LI":
        language = "de";
        break;
    case "fr":
    case "fr-BE":
    case "fr-CA":
    case "fr-CH":
    case "fr-LU":
        language = "fr";
        break;
    case "en":
    case "en-US":
    case "en-EG":
    case "en-AU":
    case "en-GB":
    case "en-CA":
    case "en-NZ":
    case "en-IE":
    case "en-ZA":
    case "en-JM":
    case "en-BZ":
    case "en-TT":
    default:
        language = "en";
        break;
}
presence.on("UpdateData", async () => {
    const host = window.location.hostname.replace("www.", "");
    const path = window.location.pathname.split("/").slice(1);
    const presenceData = {
        details: "RadioMe",
        largeImageKey: "logo_big"
    };
    switch (path[0]) {
        case "search":
            browsingStamp = 0;
            presenceData.smallImageKey = "search";
            presenceData.smallImageText = (await strings).search;
            switch (language) {
                case "de":
                    presenceData.details = `Sucht nach "${new URLSearchParams(window.location.search).get("term")}"`;
                    presenceData.state = `auf ${host}`;
                    break;
                case "fr":
                    presenceData.details = `Recherche "${new URLSearchParams(window.location.search).get("term")}"`;
                    presenceData.state = `sur ${host}`;
                    break;
                case "en":
                    presenceData.details = `Searching for "${new URLSearchParams(window.location.search).get("term")}"`;
                    presenceData.state = `on ${host}`;
                    break;
            }
            break;
        default:
            if (path[0]) {
                if (document.getElementById("station-website")) {
                    if (document.getElementsByClassName("song-name")[0].textContent.length >
                        0) {
                        if (document.getElementsByClassName("playbutton-global playbutton-global-playing").length > 0) {
                            if (!browsingStamp ||
                                lastRadio !=
                                    document.getElementsByClassName("song-name")[0].textContent)
                                browsingStamp = Math.floor(Date.now() / 1000);
                            presenceData.startTimestamp = browsingStamp;
                            lastRadio = document.getElementsByClassName("song-name")[0]
                                .textContent;
                            presenceData.smallImageKey = "play";
                            presenceData.smallImageText = (await strings).play;
                            presenceData.details = document.getElementsByClassName("song-name")[0].textContent;
                        }
                        else {
                            browsingStamp = 0;
                            presenceData.smallImageKey = "pause";
                            presenceData.smallImageText = (await strings).pause;
                            presenceData.details = document.getElementsByClassName("song-name")[0].textContent;
                        }
                    }
                    else {
                        browsingStamp = 0;
                        presenceData.details = document.querySelector("h1").innerText;
                        switch (language) {
                            case "de":
                                presenceData.state = `${document.getElementById("bar-ratingValue").innerText} von 5 Sternen (${document.getElementById("bar-ratingCount").innerText} Bewertungen)`;
                                break;
                            case "fr":
                                presenceData.state = `${document.getElementById("bar-ratingValue").innerText} sur 5 étoiles (${document.getElementById("bar-ratingCount").innerText} notes)`;
                                break;
                            case "en":
                                presenceData.state = `${document.getElementById("bar-ratingValue").innerText} of 5 stars (${document.getElementById("bar-ratingCount").innerText} Ratings)`;
                                break;
                        }
                    }
                }
                else {
                    presenceData.smallImageKey = "reading";
                    presenceData.smallImageText = (await strings).browse;
                    switch (language) {
                        case "de":
                            presenceData.details = document.querySelector("h1").innerText;
                            presenceData.state = `auf ${host}`;
                            break;
                        case "fr":
                            presenceData.details = document.querySelector("h1").innerText;
                            presenceData.state = `sur ${host}`;
                            break;
                        case "en":
                            presenceData.details = document.querySelector("h1").innerText;
                            presenceData.state = `on ${host}`;
                            break;
                    }
                }
            }
            else {
                if (document.getElementsByClassName("song-name")[0].textContent.length > 0) {
                    if (document.getElementsByClassName("playbutton-global playbutton-global-playing").length > 0) {
                        if (!browsingStamp ||
                            lastRadio !=
                                document.getElementsByClassName("song-name")[0].textContent)
                            browsingStamp = Math.floor(Date.now() / 1000);
                        presenceData.startTimestamp = browsingStamp;
                        lastRadio = document.getElementsByClassName("song-name")[0]
                            .textContent;
                        presenceData.smallImageKey = "play";
                        presenceData.smallImageText = (await strings).play;
                        presenceData.details = document.getElementsByClassName("song-name")[0].textContent;
                    }
                    else {
                        browsingStamp = 0;
                        presenceData.smallImageKey = "pause";
                        presenceData.smallImageText = (await strings).pause;
                        presenceData.details = document.getElementsByClassName("song-name")[0].textContent;
                    }
                }
                else {
                    presence.setTrayTitle();
                    presence.setActivity();
                    return;
                }
            }
            break;
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsTUFBTSxFQUFFLDRCQUE0QjtJQUNwQyxNQUFNLEVBQUUsNkJBQTZCO0NBQ3RDLENBQUMsQ0FBQztBQUVMLElBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUM7QUFDbEMsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBQ25CLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQztBQUV0QixRQUFRLFFBQVEsRUFBRTtJQUVoQixLQUFLLElBQUksQ0FBQztJQUNWLEtBQUssT0FBTyxDQUFDO0lBQ2IsS0FBSyxPQUFPLENBQUM7SUFDYixLQUFLLE9BQU8sQ0FBQztJQUNiLEtBQUssT0FBTztRQUNWLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsTUFBTTtJQUVSLEtBQUssSUFBSSxDQUFDO0lBQ1YsS0FBSyxPQUFPLENBQUM7SUFDYixLQUFLLE9BQU8sQ0FBQztJQUNiLEtBQUssT0FBTyxDQUFDO0lBQ2IsS0FBSyxPQUFPO1FBQ1YsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQixNQUFNO0lBRVIsS0FBSyxJQUFJLENBQUM7SUFDVixLQUFLLE9BQU8sQ0FBQztJQUNiLEtBQUssT0FBTyxDQUFDO0lBQ2IsS0FBSyxPQUFPLENBQUM7SUFDYixLQUFLLE9BQU8sQ0FBQztJQUNiLEtBQUssT0FBTyxDQUFDO0lBQ2IsS0FBSyxPQUFPLENBQUM7SUFDYixLQUFLLE9BQU8sQ0FBQztJQUNiLEtBQUssT0FBTyxDQUFDO0lBQ2IsS0FBSyxPQUFPLENBQUM7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