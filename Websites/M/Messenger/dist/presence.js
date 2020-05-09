var presence = new Presence({
    clientId: "630896385889271819"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var typing;
presence.on("UpdateData", async () => {
    const presenceData = {};
    if (document.location.pathname.includes("/videocall/")) {
        presenceData.largeImageKey = "messenger";
        presenceData.startTimestamp = browsingStamp;
        user = document.querySelector("#u_0_0 > div.r30xiam5.m0q0jmkx.alrytcbg.hp5uecnq.g2121wdl > div > div:nth-child(5) > div > div > div > div > div.prklkq8o.t7elcel3.sd0tyowg.ocjcko58.p3f4w9ai.f5zavhip.foed1vyy > div > div > div.ocjcko58.foed1vyy > div > p");
        if (user == null || user.innerText == null) {
            user = "user not found.";
            presenceData.details = "In videocall with someone";
            presenceData.smallImageKey = "videocall";
        }
        else {
            user = user.innerText;
            presenceData.details = "In call with someone";
            presenceData.smallImageKey = "call";
        }
        presenceData.state = "(Hidden until presence settings.)";
    }
    else if (document.location.pathname.includes("/t/")) {
        presenceData.largeImageKey = "messenger";
        presenceData.startTimestamp = browsingStamp;
        user = document.querySelector("._3oh-");
        typing = document.querySelector("body > div > div > div > div:nth-child(2) > span > div._20bp > div._4_j4 > div._4rv3._7og6 > div > div._7kpk > div > div > div:nth-child(1) > div > div > div > div > div > div > span > span");
        if (typing == null) {
            presenceData.details = "Reading messages from:";
            presenceData.smallImageKey = "reading";
        }
        else {
            presenceData.details = "Writing to:";
            presenceData.smallImageKey = "writing";
        }
        presenceData.state = "(Hidden until presence settings.)";
    }
    else if (document.location.pathname.includes("/new")) {
        presenceData.largeImageKey = "messenger";
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Composing a new message";
        presenceData.smallImageKey = "writing";
    }
    else if (document.location.pathname.includes("/about")) {
        presenceData.largeImageKey = "messenger";
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing the about page";
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ2xELElBQUksSUFBUyxDQUFDO0FBQ2QsSUFBSSxNQUFXLENBQUM7QUFFaEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxZQUFZLEdBQWlCLEVBQUUsQ0FBQztJQUV0QyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTtRQUN0RCxZQUFZLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQztRQUN6QyxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUM1QyxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDM0IsK05BQStOLENBQ2hPLENBQUM7UUFDRixJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLEVBQUU7WUFFMUMsSUFBSSxHQUFHLGlCQUFpQixDQUFDO1lBQ3pCLFlBQVksQ0FBQyxPQUFPLEdBQUcsMkJBQTJCLENBQUM7WUFDbkQsWUFBWSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUM7U0FDMUM7YUFBTTtZQUVMLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ3RCLFlBQVksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7WUFDOUMsWUFBWSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7U0FDckM7UUFFRCxZQUFZLENBQUMsS0FBSyxHQUFHLG1DQUFtQyxDQUFDO0tBQzFEO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDckQsWUFBWSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUM7UUFDekMsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFDNUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzdCLCtMQUErTCxDQUNoTSxDQUFDO1FBQ0YsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO1lBQ2xCLFlBQVksQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUM7WUFDaEQsWUFBWSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7U0FDeEM7YUFBTTtZQUNMLFlBQVksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDO1lBQ3JDLFlBQVksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1NBQ3hDO1FBRUQsWUFBWSxDQUFDLEtBQUssR0FBRyxtQ0FBbUMsQ0FBQztLQUMxRDtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3RELFlBQVksQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDO1FBQ3pDLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcseUJBQXlCLENBQUM7UUFDakQsWUFBWSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7S0FDeEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUN4RCxZQUFZLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQztRQUN6QyxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLHdCQUF3QixDQUFDO0tBQ2pEO0lBRUQsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNyQyxDQUFDLENBQUMsQ0FBQyJ9