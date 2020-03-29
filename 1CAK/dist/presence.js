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
    ;
    if (document.location.pathname.slice(1).startsWith("of")) {
        presenceData.details = document.querySelector("#content > h3").textContent.trim();
    }
    else if (document.location.pathname.slice(1).startsWith("saved")) {
        if (!document.querySelector("#content > p")) {
            presenceData.details = "Saved Posts";
        }
        ;
    }
    else if (document.location.pathname.slice(1).startsWith("voteof")) {
        if (!document.querySelector("#content > p")) {
            presenceData.details = "Voted Posts";
        }
        ;
    }
    else if (!isNaN(parseInt(document.location.pathname.slice(1)))) {
        const author = document.querySelector("#content > div > table > tbody > tr > td > div > .blur a > b").textContent.trim();
        presenceData.details = `Viewing ${author}'s post`;
    }
    ;
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM3QixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUNILElBQUksWUFBWSxHQUFpQjtJQUNoQyxhQUFhLEVBQUUsTUFBTTtDQUNyQixDQUFDO0FBRUYsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDcEMsSUFBSSxjQUFjLEdBQVcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3hDLFlBQVksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0lBQzdDLFFBQVEsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7UUFDbkMsS0FBSyxHQUFHO1lBQ1AsWUFBWSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7WUFDbkMsTUFBTTtRQUNQLEtBQUssV0FBVztZQUNmLFlBQVksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDO1lBQ3ZDLE1BQU07UUFDUCxLQUFLLFNBQVM7WUFDYixZQUFZLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQztZQUNyQyxNQUFNO1FBQ1AsS0FBSyxZQUFZO1lBQ2hCLFlBQVksQ0FBQyxPQUFPLEdBQUcsZ0JBQWdCLENBQUM7WUFDeEMsTUFBTTtRQUNQLEtBQUssVUFBVTtZQUNkLFlBQVksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO1lBQ3RDLE1BQU07UUFDUCxLQUFLLE9BQU87WUFDWCxZQUFZLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDO1lBQzNDLE1BQU07UUFDUCxLQUFLLGdCQUFnQjtZQUNwQixZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDO1lBQzVDLE1BQU07UUFDUCxLQUFLLFlBQVk7WUFDaEIsWUFBWSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7WUFDbkMsTUFBTTtRQUNQLEtBQUssYUFBYTtZQUNqQixZQUFZLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztZQUNuQyxNQUFNO1FBQ1AsS0FBSyxjQUFjO1lBQ2xCLFlBQVksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO1lBQ2xDLE1BQU07UUFDUCxLQUFLLGtCQUFrQjtZQUN0QixZQUFZLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztZQUNsQyxNQUFNO0tBQ1A7SUFBQSxDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3pELFlBQVksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDbEY7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDbkUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLEVBQUU7WUFDNUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUM7U0FDckM7UUFBQSxDQUFDO0tBQ0Y7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDcEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLEVBQUU7WUFDNUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUM7U0FDckM7UUFBQSxDQUFDO0tBQ0Y7U0FBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ2pFLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsOERBQThELENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekgsWUFBWSxDQUFDLE9BQU8sR0FBRyxXQUFXLE1BQU0sU0FBUyxDQUFDO0tBQ2xEO0lBQUEsQ0FBQztJQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDcEMsQ0FBQyxDQUFDLENBQUMifQ==