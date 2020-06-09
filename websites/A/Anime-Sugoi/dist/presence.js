const presence = new Presence({
    clientId: "709308577701036074"
});
const browsingStamp = Math.floor(Date.now() / 1000);
const title = document.querySelector("body > div:nth-child(3) > div > div.col-lg-9 > div > div.panel-heading > h3");
const ep = document.querySelector("body > div:nth-child(3) > div > div.col-lg-9 > div > div.panel-body > center:nth-child(2) > h3");
const title1 = title?.textContent ?? "ไม่ทราบชื่อ";
const ep1 = ep?.textContent ?? "ไม่ทราบชื่อตอน";
const path = document.location;
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "icon"
    };
    if (path.hostname == "anime-sugoi.com" || path.hostname.includes("www.")) {
        if (document.location.pathname == "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "อนิเมะอัพเดตล่าสุด";
        }
        else if (path.pathname.includes("index.html")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "อนิเมะอัพเดตล่าสุด";
        }
        else if (path.pathname.includes("catalog")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "หมวดหมู่ ";
            presenceData.state = title1;
        }
        else if (path.pathname.includes("tag")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "หมวดหมู่ ";
            presenceData.state = title1;
        }
        else if (path.search.includes("search")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "ค้นหา ";
            presenceData.state = title1;
        }
        else if (path.pathname.includes("play")) {
            let episode;
            if (title1.includes("ตอนที่")) {
                const info = title1.split("ตอนที่");
                episode = info.pop();
                if (episode.includes("ซับไทย")) {
                    episode = episode.replace("ซับไทย", "").trim();
                }
                else if (episode.includes("พากย์ไทย")) {
                    episode = episode.replace("พากย์ไทย", "").trim();
                }
                episode = "ตอนที่ " + episode;
                presenceData.state = info[0];
                presenceData.details = episode;
                presenceData.smallImageText = "กำลังรับชม";
                presenceData.smallImageKey = "playing";
            }
            else {
                let info;
                if (title1.includes("ซับไทย")) {
                    info = title1.replace("ซับไทย", "").trim();
                }
                else if (title1.includes("พากย์ไทย")) {
                    info = title1.replace("พากย์ไทย", "").trim();
                }
                episode = "Movie";
                presenceData.state = info;
                presenceData.details = episode;
                presenceData.smallImageText = "กำลังรับชม";
                presenceData.smallImageKey = "playing";
            }
            presenceData.startTimestamp = browsingStamp;
        }
        else if (path.href) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "เลือกตอน ";
            presenceData.state = ep1;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUdILE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ3BELE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ2xDLDZFQUE2RSxDQUM5RSxDQUFDO0FBQ0YsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDL0IsZ0dBQWdHLENBQ2pHLENBQUM7QUFDRixNQUFNLE1BQU0sR0FBRyxLQUFLLEVBQUUsV0FBVyxJQUFJLGFBQWEsQ0FBQztBQUNuRCxNQUFNLEdBQUcsR0FBRyxFQUFFLEVBQUUsV0FBVyxJQUFJLGdCQUFnQixDQUFDO0FBQ2hELE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7QUFFL0IsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLGFBQWEsRUFBRSxNQUFNO0tBQ3RCLENBQUM7SUFHRixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksaUJBQWlCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDeEUsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUU7WUFDckMsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7WUFDNUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQztTQUM3QzthQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFD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