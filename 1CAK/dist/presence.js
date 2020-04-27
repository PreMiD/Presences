const presence = new Presence({
    clientId: "634332519398899724"
});
const presenceData = {
    largeImageKey: "logo"
};
presence.on("UpdateData", async () => {
    const startTimestamp = Date.now();
    presenceData.startTimestamp = startTimestamp;
    switch (document.location.pathname.endsWith("/") &&
        document.location.pathname.length > 1
        ? document.location.pathname.slice(0, document.location.pathname.length - 1)
        : document.location.pathname) {
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
    else if (document.location.pathname.slice(1).startsWith("search")) {
        const query = document.location.pathname.slice(10, document.location.pathname.length);
        presenceData.details = "Searching fun:";
        presenceData.state = query;
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILE1BQU0sWUFBWSxHQUFpQjtJQUNqQyxhQUFhLEVBQUUsTUFBTTtDQUN0QixDQUFDO0FBRUYsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxjQUFjLEdBQVcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzFDLFlBQVksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0lBQzdDLFFBQ0UsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUN4QyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQztRQUNuQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUM5QixDQUFDLEVBQ0QsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FDdEM7UUFDSCxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQzlCO1FBQ0EsS0FBSyxHQUFHO1lBQ04sWUFBWSxDQUFDLE9BQU8sR0FBRyw4QkFBOEIsQ0FBQztZQUN0RCxNQUFNO1FBQ1IsS0FBSyxTQUFTO1lBQ1osWUFBWSxDQUFDLE9BQU8sR0FBRyxpQ0FBaUMsQ0FBQztZQUN6RCxNQUFNO1FBQ1IsS0FBSyxTQUFTO1lBQ1osWUFBWSxDQUFDLE9BQU8sR0FBRywrQkFBK0IsQ0FBQztZQUN2RCxNQUFNO1FBQ1IsS0FBSyxLQUFLO1lBQ1IsWUFBWSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQztZQUM1QyxNQUFNO1FBQ1IsS0FBSyxT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