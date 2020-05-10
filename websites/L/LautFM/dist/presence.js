const presence = new Presence({
    clientId: "640997739689279498"
});
const browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const playing = document
        .getElementsByClassName("btn playbutton")[0]
        .getAttributeNode("data-trackingaction").value;
    const presenceData = {
        largeImageKey: "logo"
    };
    switch (playing) {
        case "stop": {
            const playingnow = document.querySelector("#app > div.fixed.fixed--top > div > a > div > div > span > b").textContent;
            presenceData.details = "Playing " + playingnow;
            const music = document.querySelector("#app > div.fixed.fixed--top > div > a > div > div > div").textContent;
            presenceData.state = music;
            break;
        }
        case "play": {
            presenceData.startTimestamp = browsingStamp;
            if (document.location.pathname == "/genres") {
                presenceData.state = "Schaut nach Genres";
            }
            else if (document.location.pathname.includes("/stations/genre/")) {
                presenceData.state = "Sucht Stationen";
            }
            else if (document.location.pathname.includes("/stations/location")) {
                presenceData.state = "Sucht lokale Stationen";
            }
            else if (document.location.pathname == "/stations/all") {
                presenceData.state = "Sucht nach Top-Sender";
            }
            else {
                const station = document.querySelector("#app > section > header > div.fm-station-header__col.fm-station-header__col--name > h1").textContent;
                presenceData.details = "Befindet sich bei Station";
                presenceData.state = station;
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRXBELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sT0FBTyxHQUFHLFFBQVE7U0FDckIsc0JBQXNCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDM0MsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFFakQsTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLGFBQWEsRUFBRSxNQUFNO0tBQ3RCLENBQUM7SUFFRixRQUFRLE9BQU8sRUFBRTtRQUNmLEtBQUssTUFBTSxDQUFDLENBQUM7WUFDWCxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUN2Qyw4REFBOEQsQ0FDL0QsQ0FBQyxXQUFXLENBQUM7WUFDZCxZQUFZLENBQUMsT0FBTyxHQUFHLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDL0MsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDbEMseURBQXlELENBQzFELENBQUMsV0FBVyxDQUFDO1lBQ2QsWUFBWSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDM0IsTUFBTTtTQUNQO1FBQ0QsS0FBSyxNQUFNLENBQUMsQ0FBQztZQUNYLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1lBQzVDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksU0FBUyxFQUFFO2dCQUMzQyxZQUFZLENBQUMsS0FBSyxHQUFHLG9CQUFvQixDQUFDO2FBQzNDO2lCQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7Z0JBQ2xFLFlBQVksQ0FBQyxLQUFLLEdBQUcsaUJBQWlCLENBQUM7YUFDeEM7aUJBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsRUFBRTtnQkFDcEUsWUFBWSxDQUFDLEtBQUssR0FBRyx3QkFBd0IsQ0FBQzthQUMvQztpQkFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGVBQWUsRUFBRTtnQkFDeEQsWUFBWSxDQUFDLEtBQUssR0FBRyx1QkFBdUIsQ0FBQzthQUM5QztpQkFBTTtnQkFDTCxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNwQyx3RkFBd0YsQ0FDekYsQ0FBQyxXQUFXLENBQUM7Z0JBQ2QsWUFBWSxDQUFDLE9BQU8sR0FBRywyQkFBMkIsQ0FBQztnQkFDbkQsWUFBWSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7YUFDOUI7U0FDRjtLQUdGO0lBRUQsSUFBSSxZQUFZLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtRQUNoQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3hCO1NBQU07UUFDTCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==