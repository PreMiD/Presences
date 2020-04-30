var presence = new Presence({
    clientId: "705454018343862362"
});
let courseName, lessonName, lessonActivity;
presence.on("UpdateData", async () => {
    const info = await presence.getSetting("eSI");
    const classInfo = await presence.getSetting("eCI");
    const presenceData = {
        largeImageKey: "logo"
    };
    if (info) {
        if (document.location.pathname == "/") {
            presenceData.details = "Viewing Edgenuity Home";
        }
        else if (document.location.pathname == "/Login/Login/Student") {
            presenceData.details = "Logging in...";
        }
        if (classInfo) {
            if (document.location.pathname == "/Player/") {
                courseName = document.querySelector("span.course");
                lessonName = document.querySelector("[data-bind='html: Title']");
                lessonActivity = document.querySelector("[data-bind='html: ActivityName']");
                presenceData.details = courseName.innerText;
                presenceData.state =
                    lessonName.innerText + " - " + lessonActivity.innerText;
            }
        }
        else if (document.location.pathname == "/Player/") {
            presenceData.details = "Working on Classwork";
        }
        else {
            presenceData.details = "Can't read page";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksVUFBZSxFQUFFLFVBQWUsRUFBRSxjQUFtQixDQUFDO0FBRTFELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sSUFBSSxHQUFHLE1BQU0sUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QyxNQUFNLFNBQVMsR0FBRyxNQUFNLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFbkQsTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLGFBQWEsRUFBRSxNQUFNO0tBQ3RCLENBQUM7SUFDRixJQUFJLElBQUksRUFBRTtRQUNSLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO1lBQ3JDLFlBQVksQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUM7U0FDakQ7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLHNCQUFzQixFQUFFO1lBQy9ELFlBQVksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDO1NBQ3hDO1FBQ0QsSUFBSSxTQUFTLEVBQUU7WUFDYixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLFVBQVUsRUFBRTtnQkFDNUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ25ELFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLDJCQUEyQixDQUFDLENBQUM7Z0JBQ2pFLGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNyQyxrQ0FBa0MsQ0FDbkMsQ0FBQztnQkFDRixZQUFZLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUM7Z0JBQzVDLFlBQVksQ0FBQyxLQUFLO29CQUNoQixVQUFVLENBQUMsU0FBUyxHQUFHLEtBQUssR0FBRyxjQUFjLENBQUMsU0FBUyxDQUFDO2FBQzNEO1NBQ0Y7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLFVBQVUsRUFBRTtZQUNuRCxZQUFZLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO1NBQy9DO2FBQU07WUFDTCxZQUFZLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDO1NBQzFDO0tBQ0Y7SUFFRCxJQUFJLFlBQVksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO1FBQ2hDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDeEI7U0FBTTtRQUNMLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7QUFDSCxDQUFDLENBQUMsQ0FBQyJ9