const presence = new Presence({
    clientId: "699318388270301284"
});
const browsingStamp = Math.floor(Date.now() / 1000);
let title;
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "v2ex",
        details: "Browsing...",
        startTimestamp: browsingStamp
    };
    const path = document.location.pathname;
    if (!path) {
        presenceData.state = "Home";
    }
    else if (path.includes("/t/")) {
        title = document.querySelector("#Main > div.box > div.header > h1");
        presenceData.state = title.innerText.trim();
    }
    else if (path.includes("/member/")) {
        title = document.querySelector("#Main > div.box h1");
        presenceData.state = title.innerText.trim();
    }
    else if (path.includes("/go/")) {
        title = document.querySelector("head > title");
        presenceData.state = title.innerText
            .replace("V2EX", "")
            .replace("›", "")
            .trim();
    }
    else if (path == "/new") {
        presenceData.state = "Compose";
        presenceData.details = "New post";
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2Vuc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcmVzZW5zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRXBELElBQUksS0FBVSxDQUFDO0FBRWYsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLGFBQWEsRUFBRSxNQUFNO1FBQ3JCLE9BQU8sRUFBRSxhQUFhO1FBQ3RCLGNBQWMsRUFBRSxhQUFhO0tBQzlCLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUV4QyxJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ1QsWUFBWSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7S0FDN0I7U0FBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDL0IsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUNBQW1DLENBQUMsQ0FBQztRQUVwRSxZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDN0M7U0FBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDcEMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNyRCxZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDN0M7U0FBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDaEMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDL0MsWUFBWSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUzthQUNqQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQzthQUNuQixPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQzthQUNoQixJQUFJLEVBQUUsQ0FBQztLQUNYO1NBQU0sSUFBSSxJQUFJLElBQUksTUFBTSxFQUFFO1FBQ3pCLFlBQVksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBQy9CLFlBQVksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO0tBQ25DO0lBRUQsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNyQyxDQUFDLENBQUMsQ0FBQyJ9