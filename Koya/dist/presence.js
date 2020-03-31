const presence = new Presence({
    clientId: "691325899307483197"
});
var user;
var title;
var replace;
var search;
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "logo"
    };
    var route = document.location.pathname.split("/");
    if (document.location.pathname === "/") {
        presenceData.details = "Home";
    }
    else if (document.location.pathname.includes("/dashboard")) {
        presenceData.details = "Dashboard";
        presenceData.state = "Choosing a server...";
    }
    else if (document.location.pathname.includes("/server/")) {
        presenceData.details =
            "Edit a server : " + document.querySelector(".title").textContent;
        if (!route[3]) {
            presenceData.state = "Main";
        }
        else {
            presenceData.state = document.querySelector("a.is-active").textContent;
        }
    }
    else if (document.location.pathname.includes("/status")) {
        presenceData.details = "Status";
        presenceData.state = "Watching current status of Koya";
    }
    else if (document.location.pathname.includes("/commands")) {
        presenceData.details = "Commands";
        presenceData.state = document.querySelector("a.cat-toggle.is-active").textContent;
    }
    else if (document.location.pathname.includes("/premium")) {
        presenceData.details = "Premium";
        presenceData.state = "Watching premium page";
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksSUFBUyxDQUFDO0FBQ2QsSUFBSSxLQUFVLENBQUM7QUFDZixJQUFJLE9BQVksQ0FBQztBQUNqQixJQUFJLE1BQVcsQ0FBQztBQUVoQixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVsRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxJQUFJLFlBQVksR0FBaUI7UUFDL0IsYUFBYSxFQUFFLE1BQU07S0FDdEIsQ0FBQztJQUVGLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVsRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxLQUFLLEdBQUcsRUFBRTtRQUN0QyxZQUFZLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztLQUMvQjtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO1FBQzVELFlBQVksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDO1FBQ25DLFlBQVksQ0FBQyxLQUFLLEdBQUcsc0JBQXNCLENBQUM7S0FDN0M7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUMxRCxZQUFZLENBQUMsT0FBTztZQUNsQixrQkFBa0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUNwRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2IsWUFBWSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7U0FDN0I7YUFBTTtZQUNMLFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxXQUFXLENBQUM7U0FDeEU7S0FDRjtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ3pELFlBQVksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDO1FBQ2hDLFlBQVksQ0FBQyxLQUFLLEdBQUcsaUNBQWlDLENBQUM7S0FDeEQ7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUMzRCxZQUFZLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztRQUNsQyxZQUFZLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3pDLHdCQUF3QixDQUN6QixDQUFDLFdBQVcsQ0FBQztLQUNmO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDMUQsWUFBWSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDakMsWUFBWSxDQUFDLEtBQUssR0FBRyx1QkFBdUIsQ0FBQztLQUM5QztJQUVELElBQUksWUFBWSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7UUFDaEMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUN4QjtTQUFNO1FBQ0wsSUFBSSxZQUFZLENBQUMsS0FBSyxJQUFJLElBQUk7WUFBRSxZQUFZLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQztRQUNyRSxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==