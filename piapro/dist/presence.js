var presence = new Presence({
    clientId: "641416608790609942"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var title;
var replace;
var search;
var hour, min, sec, time;
var hour2, min2, sec2, time2;
var paused, timestamps;
presence.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "pia"
    };
    if (document.location.hostname == "piapro.jp") {
        if (document.location.pathname == "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing home page";
        }
        else if (document.location.pathname.includes("/html5_player_popup/")) {
            min = parseInt(document
                .querySelector("#jp_container_1 > div > div.jp-gui > div.jp-interface > div.jp-current-time")
                .textContent.split(":")[0]);
            sec = parseInt(document
                .querySelector("#jp_container_1 > div > div.jp-gui > div.jp-interface > div.jp-current-time")
                .textContent.split(":")[1]);
            min = min * 60;
            time = min + sec;
            min2 = parseInt(document
                .querySelector("#jp_container_1 > div > div.jp-gui > div.jp-interface > div.jp-duration")
                .textContent.split(":")[0]);
            sec2 = parseInt(document
                .querySelector("#jp_container_1 > div > div.jp-gui > div.jp-interface > div.jp-duration")
                .textContent.split(":")[1]);
            min2 = min2 * 60;
            time2 = min2 + sec2;
            if (!document
                .querySelector("#jp_container_1")
                .className.includes("jp-state-playing")) {
                paused = true;
            }
            else {
                paused = false;
            }
            timestamps = getTimestamps(time, time2);
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
            presenceData.smallImageKey = "play";
            presenceData.smallImageText = "Playing";
            presenceData.details = document.querySelector("body > header > h1").textContent;
            presenceData.state = document.querySelector("body > header > div > p.artist").textContent;
            if (paused) {
                delete presenceData.startTimestamp;
                delete presenceData.endTimestamp;
                presenceData.smallImageKey = "pause";
                presenceData.smallImageText = "Paused";
            }
        }
        else if (document.location.pathname.includes("/t/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details =
                "Viewing " +
                    document
                        .querySelector("head > title")
                        .textContent.split("|")[1]
                        .split("「")[0] +
                    ":";
            presenceData.state = document.querySelector("#main > div.cd_works-whole.illust > div.cd_works-mainclm > h1").textContent;
        }
        else if (document.location.pathname.includes("/music")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing the";
            presenceData.state = "music category";
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/illust")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing the";
            presenceData.state = "illustrations category";
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/text")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing the";
            presenceData.state = "text category";
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/search/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Searching for:";
            search = document.querySelector("#keyword");
            presenceData.state = search.value;
            presenceData.smallImageKey = "search";
        }
        else if (document.querySelector("#user_prof > p:nth-child(2)") !== null) {
            presenceData.details = "Viewing user:";
            presenceData.state = document.querySelector("#user_prof > p:nth-child(2)").textContent;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/collabo/")) {
            presenceData.details = "Viewing collab:";
            presenceData.state = document.querySelector("#main_name > h2").textContent;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/collabo_list/")) {
            presenceData.details = "Viewing collab list";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/pages/official_collabo/")) {
            presenceData.details = "Viewing official collab:";
            presenceData.state = document.querySelector("#main > div.static_path > span").textContent;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/official_collabo/")) {
            presenceData.details = "Viewing official collab list";
            presenceData.startTimestamp = browsingStamp;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxDQUFDO0FBRUosSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxJQUFTLENBQUM7QUFDZCxJQUFJLEtBQVUsQ0FBQztBQUNmLElBQUksT0FBWSxDQUFDO0FBQ2pCLElBQUksTUFBVyxDQUFDO0FBQ2hCLElBQUksSUFBWSxFQUFFLEdBQVcsRUFBRSxHQUFXLEVBQUUsSUFBWSxDQUFDO0FBQ3pELElBQUksS0FBYSxFQUFFLElBQVksRUFBRSxJQUFZLEVBQUUsS0FBYSxDQUFDO0FBQzdELElBQUksTUFBVyxFQUFFLFVBQWUsQ0FBQztBQUVqQyxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxJQUFJLFlBQVksR0FBaUI7UUFDaEMsYUFBYSxFQUFFLEtBQUs7S0FDcEIsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksV0FBVyxFQUFFO1FBQzlDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO1lBQ3RDLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1lBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7U0FDM0M7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxz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