var presence = new Presence({
    clientId: "632013978608074764"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var title;
var search;
var playing;
var paused;
var progress;
var lastState;
lastState = null;
presence.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "monstercat"
    };
    if (document.location.hostname == "www.monstercat.com") {
        progress = document.querySelector(".progress");
        progress = progress.style.cssText.replace("width: ", "").replace("%;", "");
        if (lastState == progress && progress !== "0" && progress !== "100") {
            playing = true;
            paused = true;
        }
        else if (progress == "0" || progress == "100") {
            playing = false;
            paused = true;
        }
        else {
            lastState = progress;
            playing = true;
            paused = false;
        }
        progress = Number(progress);
        progress = Math.round(progress);
        if (playing == true && paused == false) {
            title = document.querySelector("body > header > div.container.player > div.flex.controls.push-right.playing > a > span");
            presenceData.details = title.innerText;
            presenceData.state = progress + "% progressed";
            presenceData.smallImageKey = "play";
            presenceData.smallImageText = "Playing";
        }
        else if (playing == true && paused == true) {
            title = document.querySelector("body > header > div.container.player > div.flex.controls.push-right.playing > a > span");
            presenceData.details = title.innerText;
            presenceData.state = progress + "% progressed";
            presenceData.smallImageKey = "pause";
            presenceData.smallImageText = "Paused";
        }
        else {
            presenceData.startTimestamp = browsingStamp;
            if (document.location.pathname.includes("/release/")) {
                title = document.querySelector("body > section > div:nth-child(1) > div.container.flex > div > h1");
                user = document.querySelector("body > section > div:nth-child(1) > div.container.flex > div > h3");
                presenceData.details = "Viewing release:";
                presenceData.state = title.innerText + " by " + user.innerText;
            }
            else if (document.location.pathname.includes("/artist/")) {
                user = document.querySelector("body > section > div.top-banner > div.container.flex > div > div > h1");
                presenceData.details = "Viewing artist:";
                presenceData.state = user.innerText;
            }
            else if (document.location.pathname.includes("/music")) {
                presenceData.details = "Browsing music releases...";
            }
            else if (document.location.pathname.includes("/browse")) {
                presenceData.details = "Browsing...";
            }
            else if (document.location.pathname.includes("/catalog")) {
                presenceData.details = "Viewing catalog";
            }
            else if (document.location.pathname.includes("/artists")) {
                presenceData.details = "Viewing artists";
            }
            else if (document.location.pathname.includes("/playlist/")) {
                title = document.querySelector("body > section > div > h1");
                presenceData.details = "Viewing playlist:";
                presenceData.state = title.innerText;
            }
            else if (document.location.pathname.includes("/playlists")) {
                presenceData.details = "Viewing their playlists";
            }
            else if (document.location.pathname.includes("/events")) {
                presenceData.details = "Viewing events";
            }
            else if (document.location.pathname.includes("/event/")) {
                title = document.querySelector("body > section > div.event-page-header > div > div.container.container--event-header.flex > div > a.silent.no-hover > h1");
                presenceData.details = "Reading about event:";
                if (title.innerText.length > 128) {
                    presenceData.state = title.innerText.substring(0, 125) + "...";
                }
                else {
                    presenceData.state = title.innerText;
                }
                presenceData.smallImageKey = "reading";
            }
            else if (document.location.pathname.includes("/publishing")) {
                presenceData.details = "Viewing publishing";
            }
            else if (document.location.pathname.includes("/cotw")) {
                presenceData.details = "Viewing radio";
            }
            else if (document.location.pathname.includes("/gold")) {
                presenceData.details = "Viewing Monstercat Gold";
            }
            else if (document.location.pathname.includes("/account")) {
                presenceData.details = "Viewing their account";
            }
            else if (document.location.pathname.includes("/blog/")) {
                if (document.location.pathname.includes("/tags/")) {
                    title = document.querySelector("head > title");
                    title = title.innerText.replace(" Posts - Monstercat", "");
                    presenceData.details = "Blog - Viewing tag:";
                    presenceData.state = title;
                }
                else {
                    title = document.querySelector("body > section > div.panel.panel--article > header > h1");
                    presenceData.details = "Reading article:";
                    if (title.innerText.length > 128) {
                        presenceData.state = title.innerText.substring(0, 125) + "...";
                    }
                    else {
                        presenceData.state = title.innerText;
                    }
                    presenceData.smallImageKey = "reading";
                }
            }
            else if (document.location.pathname.includes("/blog")) {
                presenceData.details = "Viewing blog posts";
            }
            else if (document.location.pathname.includes("/search")) {
                search = document.querySelector("body > header > div.container.player > div.col-xs-hidden.col-md-visible.global-search > form > input[type=text]");
                presenceData.details = "Searching for:";
                presenceData.state = search.value;
                presenceData.smallImageKey = "searching";
            }
            else if (document.location.pathname == "/") {
                presenceData.details = "Viewing homepage";
            }
        }
    }
    else if (document.location.hostname == "shop.monstercat.com") {
        presenceData.startTimestamp = browsingStamp;
        if (document.location.pathname.includes("/products/")) {
            presenceData.details = "Shop - Viewing product:";
            title = document.querySelector("#product-description > div:nth-child(1) > h1");
            if (title.innerText.length > 128) {
                presenceData.state = title.innerText.substring(0, 125) + "...";
            }
            else {
                presenceData.state = title.innerText;
            }
        }
        else if (document.location.pathname.includes("/collections/")) {
            presenceData.details = "Shop - Viewing collection:";
            title = document.querySelector("#collection-description > h1");
            presenceData.state = title.innerText;
        }
        else if (document.location.pathname.includes("/cart")) {
            presenceData.details = "Shop - Viewing cart";
        }
        else if (document.location.pathname == "/") {
            presenceData.details = "Viewing store front";
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxDQUFDO0FBRUosSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxJQUFTLENBQUM7QUFDZCxJQUFJLEtBQVUsQ0FBQztBQUNmLElBQUksTUFBVyxDQUFDO0FBQ2hCLElBQUksT0FBZ0IsQ0FBQztBQUNyQixJQUFJLE1BQWUsQ0FBQztBQUNwQixJQUFJLFFBQWEsQ0FBQztBQUNsQixJQUFJLFNBQWMsQ0FBQztBQUVuQixTQUFTLEdBQUcsSUFBSSxDQUFDO0FBRWpCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksWUFBWSxHQUFpQjtRQUNoQyxhQUFhLEVBQUUsWUFBWTtLQUMzQixDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxvQkFBb0IsRUFBRTtRQUN2RCxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMvQyxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBSzNFLElBQUksU0FBUyxJQUFJLFFBQVEsSUFBSSxRQUFRLEtBQUssR0FBRyxJQUFJLFFBQVEs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