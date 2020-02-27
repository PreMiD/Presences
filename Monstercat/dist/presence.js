var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "632013978608074764",
    mediaKeys: false
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
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "monstercat"
    };
    if (document.location.hostname == "www.monstercat.com") {
        progress = document.querySelector('.progress');
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
}));
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
