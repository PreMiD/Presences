var presence = new Presence({
    clientId: "668173626775830529"
});
var strings = presence.getStrings({
    browsing: "presence.activity.browsing"
});
var oldUrl, elapsed;
var data = {
    details: undefined,
    state: undefined,
    largeImageKey: "sololearn",
    smallImageKey: undefined,
    smallImageText: undefined,
    startTimestamp: undefined,
    endTimestamp: undefined
};
presence.on("UpdateData", async () => {
    const static = {
        "/": {
            details: "Browsing",
            state: "Homepage"
        },
        "/User/Login": {
            details: "Logging in..."
        },
        "/User/Register": {
            details: "Registering..."
        },
        "/User/Edit": {
            details: "Editing profile..."
        },
        "/Features": {
            details: "Browsing",
            state: "Features"
        },
        "/Contact": {
            details: "Browsing",
            state: "Contact"
        },
        "/Terms-of-Use": {
            details: "Browsing",
            state: "Terms of Use"
        },
        "/faq": {
            details: "Browsing",
            state: "FAQ"
        }
    };
    const host = location.host;
    const path = location.pathname.replace(/\/$/, "");
    if (oldUrl !== host) {
        oldUrl = host;
        elapsed = Math.floor(Date.now() / 1000);
    }
    if (elapsed) {
        data.startTimestamp = elapsed;
    }
    if (path in static) {
        data = { ...data, ...static[path] };
    }
    if (path.match("/Certificate")) {
        data.details = "Viewing Certificate";
    }
    const play = path.match("/Play/(.*)");
    if (play) {
        data.details = "Learning";
        var course = play[1];
        course = course.replace(/Plus/g, "+");
        data.state = course;
    }
    if (path.match("/Profile")) {
        data.details = "Viewing Profile";
        const name = getElement(".name");
        const course = getElement("div.course .name");
        if (name) {
            if (course) {
                data.state = `${name} | ${course}`;
            }
            else {
                data.state = name;
            }
        }
    }
    if (path.match("/Course")) {
        data.details = "Viewing Course";
        const name = getElement(".courseDescription > h1");
        if (name) {
            data.state = name;
        }
    }
    if (path.match("/Courses")) {
        data.details = "Viewing Courses";
    }
    if (path.match("/Codes")) {
        data.details = "Viewing Codes";
        const tab = getElement(".tab.active");
        if (tab) {
            data.state = tab;
        }
    }
    if (host.match("code.sololearn.com")) {
        data.details = "Viewing Code";
        const name = getElement(".codeName");
        if (name) {
            data.state = name;
        }
    }
    if (path.match("/Discuss")) {
        data.details = "Viewing Discussions";
        const name = getElement(".question .header");
        if (name) {
            data.details = "Viewing Discussion";
            data.state = name;
        }
        const tab = getElement(".tab.active");
        if (tab) {
            data.state = tab;
        }
    }
    if (path.match("/Leaderboard")) {
        data.details = "Viewing Leaderboard";
        const type = getElement(".nameTitle");
        if (type) {
            data.state = type;
        }
    }
    if (path.match("/Blog")) {
        data.details = "Viewing Blog";
        const name = getElement(".articleTitle");
        if (name) {
            data.state = name;
        }
    }
    if (data !== null && data.details !== undefined) {
        if (data.details.match("(Viewing|Browsing)")) {
            data.smallImageKey = "reading";
            data.smallImageText = (await strings).browsing;
        }
        presence.setActivity(data);
    }
    else {
        presence.setActivity();
        presence.setTrayTitle();
    }
});
const getElement = (selector) => {
    const element = document.querySelector(selector);
    if (element) {
        return element.textContent;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUNILElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDakMsUUFBUSxFQUFFLDRCQUE0QjtDQUN0QyxDQUFDLENBQUM7QUFFSCxJQUFJLE1BQU0sRUFBRSxPQUFPLENBQUM7QUFFcEIsSUFBSSxJQUFJLEdBQWlCO0lBQ3hCLE9BQU8sRUFBRSxTQUFTO0lBQ2xCLEtBQUssRUFBRSxTQUFTO0lBQ2hCLGFBQWEsRUFBRSxXQUFXO0lBQzFCLGFBQWEsRUFBRSxTQUFTO0lBQ3hCLGNBQWMsRUFBRSxTQUFTO0lBQ3pCLGNBQWMsRUFBRSxTQUFTO0lBQ3pCLFlBQVksRUFBRSxTQUFTO0NBQ3ZCLENBQUM7QUFFRixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxNQUFNLE1BQU0sR0FBRztRQUNkLEdBQUcsRUFBRTtZQUNKLE9BQU8sRUFBRSxVQUFVO1lBQ25CLEtBQUssRUFBRSxVQUFVO1NBQ2pCO1FBQ0QsYUFBYSxFQUFFO1lBQ2QsT0FBTyxFQUFFLGVBQWU7U0FDeEI7UUFDRCxnQkFBZ0IsRUFBRTtZQUNqQixPQUFPLEVBQUUsZ0JBQWdCO1NBQ3pCO1FBQ0QsWUFBWSxFQUFFO1lBQ2IsT0FBTyxFQUFFLG9CQUFvQjtTQUM3QjtRQUNELFdBQVcsRUFBRTtZQUNaLE9BQU8sRUFBRSxVQUFVO1lBQ25CLEtBQUssRUFBRSxVQUFVO1NBQ2pCO1FBQ0QsVUFBVSxFQUFFO1lBQ1gsT0FBTyxFQUFFLFVBQVU7WUFDbkIsS0FBSyxFQUFFLFNBQVM7U0FDaEI7UUFDRCxlQUFlLEVBQUU7WUFDaEIsT0FBTyxFQUFFLFVBQVU7WUFDbkIsS0FBSyxF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