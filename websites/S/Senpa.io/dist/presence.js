const presence = new Presence({
    clientId: "691669470057594940"
});
const browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "logo"
    };
    if (document.location.host.split(".")[0] !== "forum") {
        if (document.location.pathname === "/") {
            presenceData.details = "Home";
        }
        else if (document.location.pathname.includes("/web/")) {
            const profile = JSON.parse(localStorage.getItem("senpaio:profiles"));
            presenceData.details = `Playing on server : ${localStorage.getItem("senpaio:region")} ${localStorage.getItem("senpaio:server")} | ${document.querySelector("#room-stats-hud").textContent}`;
            presenceData.state =
                `Player : ${profile.tag == ""
                    ? ""
                    : `[${profile.tag}]`} ${profile.list[profile.selected].nick == ""
                    ? "no nick"
                    : profile.list[profile.selected].nick}` + ` | ${document.querySelector("#stats-hud").textContent}`;
            presenceData.startTimestamp = browsingStamp;
        }
        else {
            presenceData.details = document.querySelector("title").textContent.split("-")[1];
            presenceData.smallImageKey = "reading";
        }
        if (presenceData.details == null) {
            presence.setTrayTitle();
            presence.setActivity();
        }
        else {
            if (presenceData.state == null)
                presenceData.state = "Navigating...";
            presence.setActivity(presenceData);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRXBELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsTUFBTTtLQUN0QixDQUFDO0lBRUYsSUFBRyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssT0FBTyxFQUFFO1FBQ25ELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssR0FBRyxFQUFFO1lBQ3RDLFlBQVksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1NBQy9CO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDdkQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUNyRSxZQUFZLENBQUMsT0FBTyxHQUFHLHVCQUNyQixZQUFZLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUN2QyxJQUNFLFlBQVksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQ3ZDLE1BQ0UsUUFBUSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFdBQzVDLEVBQUUsQ0FBQztZQUNILFlBQVksQ0FBQyxLQUFLO2dCQUNoQixZQUNFLE9BQU8sQ0FBQyxHQUFHLElBQUksRUFBRTtvQkFDaEIsQ0FBQyxDQUFDLEVBQUU7b0JBQ0osQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLEdBQUcsR0FFcEIsSUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRTtvQkFDdkMsQ0FBQyxDQUFDLFNBQVM7b0JBQ1gsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQ3JDLEVBQUUsR0FBRyxNQUFNLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDaEUsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7U0FDN0M7YUFBTTtZQUNMLFlBQVksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pGLFlBQVksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1NBQ3hDO1FBRUQsSUFBSSxZQUFZLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtZQUNoQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDeEIsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3hCO2FBQU07WUFDTCxJQUFJLFlBQVksQ0FBQyxLQUFLLElBQUksSUFBSTtnQkFBRSxZQUFZLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQztZQUNyRSxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BDO0tBQ0Y7QUFDSCxDQUFDLENBQUMsQ0FBQyJ9