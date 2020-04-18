const presence = new Presence({
    clientId: "634332519398899724"
});
const presenceData = {
    largeImageKey: "logo"
};
presence.on("UpdateData", async () => {
    const startTimestamp = Date.now();
    presenceData.startTimestamp = startTimestamp;
    switch (document.location.pathname.endsWith("/") && document.location.pathname.length > 1 ? document.location.pathname.slice(0, document.location.pathname.length - 1) : document.location.pathname) {
        case "/":
            presenceData.details = "Viewing fun through homepage";
            break;
        case "/trends":
            presenceData.details = "Looking at fun that is trending";
            break;
        case "/recent":
            presenceData.details = "Viewing recently uploaded fun";
            break;
        case "/tv":
            presenceData.details = "Viewing fun videos";
            break;
        case "/tvvote":
            presenceData.details = "Viewing fun videos";
            break;
        case "/friends":
            presenceData.details = "My friend list";
            break;
        case "rules":
            presenceData.details = "Reading the rules";
            break;
        case "/notifications":
            presenceData.details = "Viewing notifications";
            break;
        case "/upload":
            presenceData.details = "Going to upload something fun";
            break;
        case "/about":
            presenceData.details = "About 1CAK/1CUK";
            break;
        case "/terms":
            presenceData.details = "Terms of Service";
            break;
        case "/privacy":
            presenceData.details = "Privacy Policy";
            break;
        case "/disclaimer":
            presenceData.details = "Disclaimer";
            break;
        case "/advertise":
            presenceData.details = "Advertise with us";
            break;
        case "/weeklytop":
            presenceData.details = "Viewing weekly top users";
            break;
        case "/alltimetop":
            presenceData.details = "Viewing all time top users";
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
            presenceData.details = "My saved funs";
        }
    }
    else if (document.location.pathname.slice(1).startsWith("voteof")) {
        if (!document.querySelector("#content > p")) {
            presenceData.details = "My funned funs";
        }
    }
    else if (!isNaN(parseInt(document.location.pathname.slice(1)))) {
        const author = document
            .querySelector("#content > div > table > tbody > tr > td > div > .blur a > b")
            .textContent.trim();
        presenceData.details = `Viewing ${author}'s fun`;
    }
    else if (document.location.pathname.slice(1).startsWith("legendary")) {
        presenceData.details = "Viewing the most legendary fun";
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILE1BQU0sWUFBWSxHQUFpQjtJQUNqQyxhQUFhLEVBQUUsTUFBTTtDQUN0QixDQUFDO0FBRUYsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxjQUFjLEdBQVcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzFDLFlBQVksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0lBQzdDLFFBQVEsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTtRQUNuTSxLQUFLLEdBQUc7WUFDTixZQUFZLENBQUMsT0FBTyxHQUFHLDhCQUE4QixDQUFDO1lBQ3RELE1BQU07UUFDUixLQUFLLFNBQVM7WUFDWixZQUFZLENBQUMsT0FBTyxHQUFHLGlDQUFpQyxDQUFDO1lBQ3pELE1BQU07UUFDUixLQUFLLFNBQVM7WUFDWixZQUFZLENBQUMsT0FBTyxHQUFHLCtCQUErQixDQUFDO1lBQ3ZELE1BQU07UUFDUixLQUFLLEtBQUs7WUFDUixZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDO1lBQzVDLE1BQU07UUFDUixLQUFLLFNBQVM7WUFDWixZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDO1lBQzVDLE1BQU07UUFDUixLQUFLLFVBQVU7WUFDYixZQUFZLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDO1lBQ3hDLE1BQU07UUFDUixLQUFLLE9BQU87WUFDVixZQUFZLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDO1lBQzNDLE1BQU07UUFDUixLQUFLLGdCQUFnQjtZQUNuQixZQUFZLENBQUMsT0FBTyxHQUFHLHVCQUF1QixDQUFDO1lBQy9DLE1BQU07UUFDUixLQUFLLFNBQVM7WUFDWixZQUFZLENBQUMsT0FBTyxHQUFHLCtCQUErQixDQUFDO1lBQ3ZELE1BQU07UUFDUixLQUFLLFFBQVE7WUFDWCxZQUFZLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDO1lBQ3pDLE1BQU07UUFDUixLQUFLLFFBQVE7WUFDWCxZQUFZLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO1lBQzFDLE1BQU07UUFDUixLQUFLLFVBQVU7WUFDYixZQUFZLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDO1lBQ3hDLE1BQU07UUFDUixLQUFLLGFBQWE7WUFDaEIsWUFBWSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUM7WUFDcEMsTUFBTTtRQUNSLEtBQUssWUFBWTtZQUNmLFlBQVksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7WUFDM0MsTUFBTTtRQUNSLEtBQUssWUFBWTtZQUNmLFlBQVksQ0FBQyxPQUFPLEdBQUcsMEJBQTBCLENBQUM7WUFDbEQsTUFBTTtRQUNSLEtBQUssYUFBYTtZQUNoQixZQUFZLENBQUMsT0FBTyxHQUFHLDRCQUE0QixDQUFDO1lBQ3BELE1BQU07UUFDUixLQUFLLGNBQWM7WUFDakIsWUFBWSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7WUFDbEMsTUFBTTtRQUNSLEtBQUssa0JBQWtCO1lBQ3JCLFlBQVksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO1lBQ2xDLE1BQU07S0FDVDtJQUVELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN4RCxZQUFZLENBQUMsT0FBTyxHQUFHLFFBQVE7YUFDNUIsYUFBYSxDQUFDLGVBQWUsQ0FBQzthQUM5QixXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDdkI7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDbEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLEVBQUU7WUFDM0MsWUFBWSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUM7U0FDeEM7S0FDRjtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUNuRSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUMzQyxZQUFZLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDO1NBQ3pDO0tBQ0Y7U0FBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ2hFLE1BQU0sTUFBTSxHQUFHLFFBQVE7YUFDcEIsYUFBYSxDQUNaLDhEQUE4RCxDQUMvRDthQUNBLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QixZQUFZLENBQUMsT0FBTyxHQUFHLFdBQVcsTUFBTSxRQUFRLENBQUM7S0FDbEQ7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDdEUsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQ0FBZ0MsQ0FBQztLQUN6RDtJQUNELFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDckMsQ0FBQyxDQUFDLENBQUMifQ==