var presence = new Presence({
    clientId: "639616115873546261"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var title;
var replace;
var playing;
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "rock"
    };
    if (document.location.hostname == "www.rockradio.com") {
        if (document.location.pathname == "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing...";
        }
        else if (document.querySelector("#now-playing > div.info-container > div.progress-container > div > span > span > span.total") !== null) {
            user = document.querySelector("#now-playing > div.info-container > div.progress-container > div > span > span > span.remain");
            title = document.querySelector("#now-playing > div.info-container > div.title-container > div > span > span.artist-name");
            replace = document.querySelector("#now-playing > div.info-container > div.title-container > div > span > span.track-name");
            presenceData.details = title.innerText + replace.innerText;
            presenceData.state = user.innerText.replace("-", "") + " left";
            playing =
                document.querySelector("#play-button > div > a").className ==
                    "ico icon-pause"
                    ? "play"
                    : "pause";
            presenceData.smallImageKey = playing;
        }
        else if (document.querySelector("#channel-title") !== null) {
            title = document.querySelector("#channel-title");
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing channel:";
            presenceData.state = title.innerText;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ2xELElBQUksSUFBUyxDQUFDO0FBQ2QsSUFBSSxLQUFVLENBQUM7QUFDZixJQUFJLE9BQVksQ0FBQztBQUNqQixJQUFJLE9BQVksQ0FBQztBQUVqQixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLE1BQU07S0FDdEIsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksbUJBQW1CLEVBQUU7UUFDckQsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUU7WUFDckMsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7WUFDNUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUM7U0FDdEM7YUFBTSxJQUNMLFFBQVEsQ0FBQyxhQUFhLENBQ3BCLDZGQUE2RixDQUM5RixLQUFLLElBQUksRUFDVjtZQUNBLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUMzQiw4RkFBOEYsQ0FDL0YsQ0FBQztZQUNGLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM1Qix5RkFBeUYsQ0FDMUYsQ0FBQztZQUNGLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM5Qix3RkFBd0YsQ0FDekYsQ0FBQztZQUNGLFlBQVksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO1lBQzNELFlBQVksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQztZQUMvRCxPQUFPO2dCQUNMLFFBQVEsQ0FBQyxhQUFhLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxTQUFTO29CQUMxRCxnQkFBZ0I7b0JBQ2QsQ0FBQyxDQUFDLE1BQU07b0JBQ1IsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNkLFlBQVksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO1NBQ3RDO2FBQU0sSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLEtBQUssSUFBSSxFQUFFO1lBQzVELEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDakQsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7WUFDNUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztZQUMxQyxZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7U0FDdEM7S0FDRjtJQUVELElBQUksWUFBWSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7UUFDaEMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUN4QjtTQUFNO1FBQ0wsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztBQUNILENBQUMsQ0FBQyxDQUFDIn0=