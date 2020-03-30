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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUNILElBQUksWUFBWSxHQUFpQjtJQUNoQyxhQUFhLEVBQUUsVUFBVTtDQUN6QixDQUFDO0FBRUYsSUFBSSxJQUFJLEVBQUUsSUFBWSxDQUFDO0FBQ3ZCLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDakMsUUFBUSxFQUFFLDRCQUE0QjtDQUN0QyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFFaEMsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDL0MsWUFBWSxDQUFDLE9BQU8sR0FBRyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQ2hELE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQztLQUMxQjtTQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUNuQyxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNwRSxZQUFZLENBQUMsT0FBTyxHQUFHLFdBQVcsSUFBSSxVQUFVLENBQUM7UUFFakQsUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzNCLEtBQUssU0FBUztnQkFDYixZQUFZLENBQUMsS0FBSyxHQUFHLHVCQUF1QixDQUFDO2dCQUM3QyxNQUFNO1lBQ1As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