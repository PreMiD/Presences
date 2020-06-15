const presence = new Presence({
    clientId: "721784733582753813"
});
const browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "rasb",
        startTimestamp: browsingStamp,
    };
    const pathname = document.location.pathname;
    const badgeSplitter = pathname.slice(8);
    const splitter = pathname.slice(3);
    switch (pathname) {
        case "/":
            presenceData.details = "Browsing:";
            presenceData.state = "Main Page";
            break;
        case "/latest":
            presenceData.details = "Browsing:";
            presenceData.state = "Latest Posts";
            break;
        case "/top":
            presenceData.details = "Browsing:";
            presenceData.state = "Top Posts";
            break;
        case "/unread":
            presenceData.details = "Browsing:";
            presenceData.state = "Unread Posts";
            break;
        case "/categories":
            presenceData.details = "Browsing:";
            presenceData.state = "Categories";
            break;
        case "/c/" + splitter: {
            const category = document.title.slice(7, -20);
            presenceData.details = "Browsing category:";
            presenceData.state = category;
            break;
        }
        case "/t/" + splitter: {
            const postName = document.getElementsByClassName("fancy-title")[0];
            if (!postName)
                return;
            presenceData.details = "Reading:";
            presenceData.state = postName.textContent;
            break;
        }
        case "/u/" + splitter: {
            const userName = document.getElementsByClassName("full-name")[0];
            if (!userName)
                return;
            presenceData.details = "Browsing profile:";
            presenceData.state = userName.textContent;
            break;
        }
        case "/badges/" + badgeSplitter: {
            const badgeName = document.getElementsByClassName("badge-link")[0];
            if (!badgeName)
                return;
            presenceData.details = "Browsing badge:";
            presenceData.state = badgeName.textContent;
            break;
        }
        case "/search": {
            const searchedFor = document.title.slice(20, -14);
            presenceData.details = "Searching for:";
            presenceData.state = searchedFor;
            break;
        }
        case "/badges":
            presenceData.details = "Browsing:";
            presenceData.state = "Badges";
            break;
        case "/g":
            presenceData.details = "Browsing:";
            presenceData.state = "Groups";
            break;
        case "/u":
            presenceData.details = "Browsing:";
            presenceData.state = "Users";
            break;
        case "/new":
            presenceData.details = "Browsing:";
            presenceData.state = "New Posts";
            break;
        case "/about":
            presenceData.details = "Browsing:";
            presenceData.state = "About";
            break;
        default:
            presenceData.details = "Browsing:";
            presenceData.state = "Not Found";
            break;
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQ2pDLENBQUMsQ0FBQTtBQUVGLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFBO0FBRW5ELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUMzQixNQUFNLFlBQVksR0FBaUI7UUFDL0IsYUFBYSxFQUFFLE1BQU07UUFDckIsY0FBYyxFQUFFLGFBQWE7S0FDaEMsQ0FBQztJQUVGLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO0lBRzVDLE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEMsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVuQyxRQUFPLFFBQVEsRUFBQztRQUNaLEtBQUssR0FBRztZQUNKLFlBQVksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDO1lBQ25DLFlBQVksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO1lBQ2pDLE1BQU07UUFFVixLQUFLLFNBQVM7WUFDVixZQUFZLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztZQUNuQyxZQUFZLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQztZQUNwQyxNQUFNO1FBRVYsS0FBSyxNQUFNO1lBQ1AsWUFBWSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7WUFDbkMsWUFBWSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7WUFDakMsTUFBTTtRQUVWLEtBQUssU0FBUztZQUNWLFlBQVksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFD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