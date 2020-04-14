const presence = new Presence({
    clientId: "699318388270301284"
});
let title;
const browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "v2ex-logo",
        startTimestamp: browsingStamp
    };
    const path = document.location.pathname;
    if (path === "/") {
        presenceData.state = "Home";
        presenceData.details = "Browsing Thread";
        presenceData.smallImageKey = "curious";
    }
    else if (path.includes("/t/")) {
        title = document.querySelector("#Main > div.box > div.header > h1");
        presenceData.state = title.innerText.trim();
        presenceData.smallImageKey = "famous";
        if (document.querySelector("#reply-box").classList.contains("reply-box-sticky")) {
            presenceData.details = "Replying post";
        }
        else {
            presenceData.details = "Reading post";
        }
    }
    else if (path.includes("/member/")) {
        title = document.querySelector("#Main > div.box h1");
        presenceData.state = title.innerText.trim();
        presenceData.details = "Viewing Profile";
        presenceData.smallImageKey = "happy";
    }
    else if (path.includes("/go/")) {
        title = document.querySelector("head > title");
        presenceData.state = title.innerText
            .replace("V2EX", "")
            .replace("›", "")
            .trim();
        presenceData.details = "Browsing node";
        presenceData.smallImageKey = "tongue";
    }
    else if (path === "/new") {
        presenceData.state = "Compose";
        presenceData.details = "New post";
        presenceData.smallImageKey = "famous_2";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksS0FBVSxDQUFDO0FBQ2YsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFcEQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLGFBQWEsRUFBRSxXQUFXO1FBQzFCLGNBQWMsRUFBRSxhQUFhO0tBQzlCLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUV4QyxJQUFJLElBQUksS0FBSyxHQUFHLEVBQUU7UUFDaEIsWUFBWSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7UUFDNUIsWUFBWSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztRQUN6QyxZQUFZLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztLQUN4QztTQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUMvQixLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1FBQ3BFLFlBQVksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM1QyxZQUFZLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztRQUV0QyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1lBQy9FLFlBQVksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDO1NBQ3hDO2FBQU07WUFDTCxZQUFZLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQztTQUN2QztLQUNGO1NBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ3BDLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDckQsWUFBWSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUM7UUFDekMsWUFBWSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUM7S0FDdEM7U0FBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDaEMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDL0MsWUFBWSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUzthQUNqQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQzthQUNuQixPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQzthQUNoQixJQUFJLEVBQUUsQ0FBQztRQUNWLFlBQVksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLFlBQVksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO0tBQ3ZDO1NBQU0sSUFBSSxJQUFJLEtBQUssTUFBTSxFQUFFO1FBQzFCLFlBQVksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBQy9CLFlBQVksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO1FBQ2xDLFlBQVksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDO0tBQ3pDO0lBRUQsSUFBSSxZQUFZLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtRQUNoQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3hCO1NBQU07UUFDTCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==