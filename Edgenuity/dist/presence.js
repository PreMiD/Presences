var presence = new Presence({
    clientId: "705454018343862362"
});
let courseName, lessonName, lessonActivity;
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "logo"
    };
    if (document.location.pathname == "/") {
        presenceData.details = "Viewing Edgenuity Home";
    }
    else if (document.location.pathname == "/Login/Login/Student") {
        presenceData.details = "Logging in...";
    }
    else if (document.location.pathname == "/Player/") {
        courseName = document.querySelector("span.course");
        lessonName = document.querySelector("[data-bind='html: Title']");
        lessonActivity = document.querySelector("[data-bind='html: ActivityName']");
        presenceData.details = courseName.innerText;
        presenceData.state = lessonName.innerText + " - " + lessonActivity.innerText;
    }
    else {
        presenceData.details = "Can't read page";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVMLElBQUksVUFBZSxFQUNqQixVQUFlLEVBQ2YsY0FBbUIsQ0FBQztBQUV0QixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLE1BQU07S0FDdEIsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO1FBQ3JDLFlBQVksQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUM7S0FDakQ7U0FBSyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLHNCQUFzQixFQUFFO1FBQzlELFlBQVksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDO0tBQ3hDO1NBQUssSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxVQUFVLEVBQUU7UUFDbEQsVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbkQsVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUNqRSxjQUFjLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1FBQzVFLFlBQVksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQztRQUM1QyxZQUFZLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxTQUFTLEdBQUcsS0FBSyxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUM7S0FDOUU7U0FBTTtRQUNMLFlBQVksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUM7S0FDMUM7SUFFRCxJQUFJLFlBQVksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO1FBQ2hDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDeEI7U0FBTTtRQUNMLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7QUFDSCxDQUFDLENBQUMsQ0FBQyJ9