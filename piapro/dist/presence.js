var presence = new Presence({
    clientId: "641416608790609942"
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
var browsingStamp = Math.floor(Date.now() / 1000);
var search;
var min, sec, time;
var min2, sec2, time2;
var paused, timestamps;
presence.on("UpdateData", async () => {
    const presenceData = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQU9ILFNBQVMsYUFBYSxDQUNwQixTQUFpQixFQUNqQixhQUFxQjtJQUVyQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHLGFBQWEsQ0FBQztJQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUVELElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELElBQUksTUFBVyxDQUFDO0FBQ2hCLElBQUksR0FBVyxFQUFFLEdBQVcsRUFBRSxJQUFZLENBQUM7QUFDM0MsSUFBSSxJQUFZLEVBQUUsSUFBWSxFQUFFLEtBQWEsQ0FBQztBQUM5QyxJQUFJLE1BQVcsRUFBRSxVQUFlLENBQUM7QUFFakMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLGFBQWEsRUFBRSxLQUFLO0tBQ3JCLENBQUM7SUFFRixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLFdBQVcsRUFBRTtRQUM3QyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsRUFBRTtZQUNyQyxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztZQUM1QyxZQUFZ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