const presence = new Presence({
    clientId: "680160273474388014"
});
const browsingStamp = Math.floor(Date.now() / 1000);
let sartist, strack, slisteners, sdj, play;
function newStats() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const data = JSON.parse(this.responseText);
            strack = data.now_playing.song.title;
            sartist = data.now_playing.song.artist;
            sdj = data.live.is_live ? "DJ " + data.live.streamer_name : "AutoDJ";
            slisteners = " • " + data.listeners.unique;
        }
    };
    xhttp.open("GET", "https://radio.itspulse.net/api/nowplaying/1", true);
    xhttp.send();
}
setInterval(newStats, 6000);
newStats();
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "logo",
        startTimestamp: browsingStamp
    };
    if (document.location.pathname.startsWith("/lite")) {
        play = document.querySelector("body > div > div > div > div > div > div > i");
        play = play.className;
        switch (play) {
            case "fa fa-play":
                presenceData.smallImageKey = "pause";
                presenceData.state = (strack || "Loading...") + (" - " + sartist);
                presenceData.details =
                    (sdj || "Loading...") + (slisteners || "Loading...") + " Listeners";
                presenceData.smallImageText = "https://itspulse.net";
                break;
            case "fa fa-pause":
                presenceData.smallImageKey = "play";
                presenceData.state = (strack || "Loading...") + (" - " + sartist);
                presenceData.details =
                    (sdj || "Loading...") + (slisteners || "Loading...") + " Listeners";
                presenceData.smallImageText = "https://itspulse.net";
        }
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ3BELElBQUksT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQztBQUUzQyxTQUFTLFFBQVE7SUFDZixNQUFNLEtBQUssR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO0lBQ25DLEtBQUssQ0FBQyxrQkFBa0IsR0FBRztRQUN6QixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksR0FBRyxFQUFFO1lBQzlDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzNDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDckMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN2QyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1lBQ3JFLFVBQVUsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7U0FDNUM7SUFDSCxDQUFDLENBQUM7SUFDRixLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSw2Q0FBNkMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN2RSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDZixDQUFDO0FBRUQsV0FBVyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM1QixRQUFRLEVBQUUsQ0FBQztBQUVYLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLE1BQU07UUFDckIsY0FBYyxFQUFFLGFBQWE7S0FDOUIsQ0FBQztJQUNGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ2xELElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUMzQiw4Q0FBOEMsQ0FDL0MsQ0FBQztRQUNGLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3RCLFFBQVEsSUFBSSxFQUFFO1lBQ1osS0FBSyxZQUFZO2dCQUVmLFlBQVksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO2dCQUNyQyxZQUFZLENBQUMsS0FBSyxHQUFHLENBQUMsTUFBTSxJQUFJLFlBQVksQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDO2dCQUNsRSxZQUFZLENBQUMsT0FBTztvQkFDbEIsQ0FBQyxHQUFHLElBQUksWUFBWSxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksWUFBWSxDQUFDLEdBQUcsWUFBWSxDQUFDO2dCQUN0RSxZQUFZLENBQUMsY0FBYyxHQUFHLHNCQUFzQixDQUFDO2dCQUNyRCxNQUFNO1lBQ1IsS0FBSyxhQUFhO2dCQUVoQixZQUFZLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztnQkFDcEMsWUFBWSxDQUFDLEtBQUssR0FBRyxDQUFDLE1BQU0sSUFBSSxZQUFZLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQztnQkFDbEUsWUFBWSxDQUFDLE9BQU87b0JBQ2xCLENBQUMsR0FBRyxJQUFJLFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLFlBQVksQ0FBQyxHQUFHLFlBQVksQ0FBQztnQkFDdEUsWUFBWSxDQUFDLGNBQWMsR0FBRyxzQkFBc0IsQ0FBQztTQUN4RDtLQUNGO0lBQ0QsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNyQyxDQUFDLENBQUMsQ0FBQyJ9