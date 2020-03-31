const presence = new Presence({
    clientId: "634332519398899724"
});
let presenceData = {
    largeImageKey: "logo"
};
presence.on("UpdateData", async () => {
    let startTimestamp = Date.now();
    presenceData.startTimestamp = startTimestamp;
    switch (document.location.pathname) {
        case "/":
            presenceData.details = "Home Page";
            break;
        case "/trending":
            presenceData.details = "Trending Page";
            break;
        case "/recent":
            presenceData.details = "Recent Page";
            break;
        case "/legendary":
            presenceData.details = "Legendary Page";
            break;
        case "/friends":
            presenceData.details = "Friends Page";
            break;
        case "rules":
            presenceData.details = "Reading the rules";
            break;
        case "/notifications":
            presenceData.details = "Notifications Page";
            break;
        case "/weeklytop":
            presenceData.details = "Top Users";
            break;
        case "/alltimetop":
            presenceData.details = "Top Users";
            break;
        case "/preferences":
            presenceData.details = "Settings";
            break;
        case "/privacy_setting":
            presenceData.details = "Settings";
            break;
    }
    if (document.location.pathname.slice(1).startsWith("of")) {
        presenceData.details = document
            .querySelector("#content > h3")
            .textContent.trim();
    }
    else if (document.location.pathname.slice(1).startsWith("saved")) {
        if (!document.querySelector("#content > p")) {
            presenceData.details = "Saved Posts";
        }
    }
    else if (document.location.pathname.slice(1).startsWith("voteof")) {
        if (!document.querySelector("#content > p")) {
            presenceData.details = "Voted Posts";
        }
    }
    else if (!isNaN(parseInt(document.location.pathname.slice(1)))) {
        const author = document
            .querySelector("#content > div > table > tbody > tr > td > div > .blur a > b")
            .textContent.trim();
        presenceData.details = `Viewing ${author}'s post`;
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILElBQUksWUFBWSxHQUFpQjtJQUMvQixhQUFhLEVBQUUsTUFBTTtDQUN0QixDQUFDO0FBRUYsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsSUFBSSxjQUFjLEdBQVcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3hDLFlBQVksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0lBQzdDLFFBQVEsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7UUFDbEMsS0FBSyxHQUFHO1lBQ04sWUFBWSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7WUFDbkMsTUFBTTtRQUNSLEtBQUssV0FBVztZQUNkLFlBQVksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDO1lBQ3ZDLE1BQU07UUFDUixLQUFLLFNBQVM7WUFDWixZQUFZLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQztZQUNyQyxNQUFNO1FBQ1IsS0FBSyxZQUFZO1lBQ2YsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztZQUN4QyxNQUFNO1FBQ1IsS0FBSyxVQUFVO1lBQ2IsWUFBWSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7WUFDdEMsTUFBTTtRQUNSLEtBQUssT0FBTztZQUNWLFlBQVksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7WUFDM0MsTUFBTTtRQUNSLEtBQUssZ0JBQWdCO1lBQ25CLFlBQVksQ0FBQyxPQUFPLEdBQUcsb0JBQW9CLENBQUM7WUFDNUMsTUFBTTtRQUNSLEtBQUssWUFBWTtZQUNmLFlBQVksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDO1lBQ25DLE1BQU07UUFDUixLQUFLLGFBQWE7WUFDaEIsWUFBWSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7WUFDbkMsTUFBTTtRQUNSLEtBQUssY0FBYztZQUNqQixZQUFZLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztZQUNsQyxNQUFNO1FBQ1IsS0FBSyxrQkFBa0I7WUFDckIsWUFBWSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7WUFDbEMsTUFBTTtLQUNUO0lBRUQsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3hELFlBQVksQ0FBQyxPQUFPLEdBQUcsUUFBUTthQUM1QixhQUFhLENBQUMsZUFBZSxDQUFDO2FBQzlCLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUN2QjtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUNsRSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUMzQyxZQUFZLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQztTQUN0QztLQUNGO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ25FLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQzNDLFlBQVksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDO1NBQ3RDO0tBQ0Y7U0FBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ2hFLE1BQU0sTUFBTSxHQUFHLFFBQVE7YUFDcEIsYUFBYSxDQUNaLDhEQUE4RCxDQUMvRDthQUNBLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QixZQUFZLENBQUMsT0FBTyxHQUFHLFdBQVcsTUFBTSxTQUFTLENBQUM7S0FDbkQ7SUFDRCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3JDLENBQUMsQ0FBQyxDQUFDIn0=