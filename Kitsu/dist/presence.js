let presence = new Presence({
    clientId: "629413852391669791"
});
let presenceData = {
    largeImageKey: "kitsu_lg"
};
let path, user;
let strings = presence.getStrings({
    browsing: "presence.activity.browsing"
});
presence.on("UpdateData", async () => {
    path = window.location.pathname;
    if (path == "/" || path.startsWith("/explore")) {
        presenceData.details = (await strings).browsing;
        delete presenceData.state;
    }
    else if (path.includes("/users")) {
        user = document.querySelector(".cover-username").textContent.trim();
        presenceData.details = `Viewing ${user} profile`;
        switch (path.split("/")[3]) {
            case "library":
                presenceData.state = "Viewing their library";
                break;
            case "reactions":
                presenceData.state = "Viewing their reactions";
                break;
            case "followers":
                presenceData.state = "Viewing their followers";
                break;
            case "following":
                presenceData.state = "Viewing who they follow";
                break;
            case "groups":
                presenceData.state = "Viewing their groups";
                break;
            default:
                presenceData.state = "Viewing their activity";
        }
    }
    else if (path.startsWith("/anime")) {
        presenceData.details = "Looking through anime";
        if (path.split("/")[2]) {
            presenceData.state = `Viewing ${document
                .querySelector("h3")
                .textContent.trim()}`;
        }
        else
            delete presenceData.state;
    }
    else if (path.startsWith("/manga")) {
        presenceData.details = "Looking through manga";
        if (path.split("/")[2]) {
            presenceData.state = `Viewing ${document
                .querySelector("h3")
                .textContent.trim()}`;
        }
        else
            delete presenceData.state;
    }
    else if (path.startsWith("/groups")) {
        presenceData.details = "Looking through groups";
        if (path.split("/")[2]) {
            presenceData.state = `Viewing ${document
                .querySelector(".cover-username")
                .textContent.trim()}`;
        }
        else
            delete presenceData.state;
    }
    else if (path.startsWith("/feedback")) {
        presenceData.details = "Browsing feedback section";
        switch (path.split("/")[2]) {
            case "bugs":
                presenceData.state = "Viewing bugs";
                break;
            case "feature-requests":
                presenceData.state = "Viewing feature requests";
                break;
            case "database-requests":
                presenceData.state = "Viewing database requests";
                break;
            case "mobile-bugs":
                presenceData.state = "Viewing mobile bugs";
                break;
            case "mobile-features":
                presenceData.state = "Viewing mobile features";
                break;
            default:
                presenceData.state = "some unknown place";
        }
    }
    else if (path.startsWith("/api")) {
        presenceData.details = "Messing with the kitsu API";
        delete presenceData.state;
    }
    presence.setActivity(presenceData, true);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILElBQUksWUFBWSxHQUFpQjtJQUMvQixhQUFhLEVBQUUsVUFBVTtDQUMxQixDQUFDO0FBRUYsSUFBSSxJQUFJLEVBQUUsSUFBWSxDQUFDO0FBQ3ZCLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDaEMsUUFBUSxFQUFFLDRCQUE0QjtDQUN2QyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFFaEMsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDOUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQ2hELE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQztLQUMzQjtTQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUNsQyxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNwRSxZQUFZLENBQUMsT0FBTyxHQUFHLFdBQVcsSUFBSSxVQUFVLENBQUM7UUFFakQsUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzFCLEtBQUssU0FBUztnQkFDWixZQUFZLENBQUMsS0FBSyxHQUFHLHVCQUF1QixDQUFDO2dCQUM3QyxNQUFNO1lBQ1Is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