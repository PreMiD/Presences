var presence = new Presence({
    clientId: "632013978608074764"
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
    const presenceData = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELElBQUksSUFBUyxDQUFDO0FBQ2QsSUFBSSxLQUFVLENBQUM7QUFDZixJQUFJLE1BQVcsQ0FBQztBQUNoQixJQUFJLE9BQWdCLENBQUM7QUFDckIsSUFBSSxNQUFlLENBQUM7QUFDcEIsSUFBSSxRQUFhLENBQUM7QUFDbEIsSUFBSSxTQUFjLENBQUM7QUFFbkIsU0FBUyxHQUFHLElBQUksQ0FBQztBQUVqQixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLFlBQVk7S0FDNUIsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksb0JBQW9CLEVBQUU7UUFDdEQsUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDL0MsUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUszRSxJQUFJLFNBQVMsSUFBSSxRQUFRLElBQUksUUFBUSxLQUFLLEdBQUcsSUFBSSxRQUFRLEtBQUssS0FBSyxFQUFFO1lBRW5FLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDZixNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQ2Y7YUFBTSxJQUFJLFFBQVEsSUFBSSxH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