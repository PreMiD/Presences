var presence = new Presence({
    clientId: "668173626775830529"
});
var strings = presence.getStrings({
    browsing: "presence.activity.browsing"
});
const getElement = (selector) => {
    const element = document.querySelector(selector);
    if (element) {
        return element.textContent;
    }
};
var oldUrl, elapsed;
var data = {
    largeImageKey: "sololearn"
};
presence.on("UpdateData", async () => {
    var browsing = (await strings).browsing;
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
        data.smallImageKey = data.details.match("(Viewing|Browsing)")
            ? "reading"
            : null;
        data.smallImageText = data.details.match("(Viewing|Browsing)")
            ? browsing
            : null;
        presence.setActivity(data);
    }
    else {
        presence.setActivity();
        presence.setTrayTitle();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDaEMsUUFBUSxFQUFFLDRCQUE0QjtDQUN2QyxDQUFDLENBQUM7QUFFSCxNQUFNLFVBQVUsR0FBRyxDQUFDLFFBQWdCLEVBQVUsRUFBRTtJQUM5QyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRWpELElBQUksT0FBTyxFQUFFO1FBQ1gsT0FBTyxPQUFPLENBQUMsV0FBVyxDQUFDO0tBQzVCO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsSUFBSSxNQUFNLEVBQUUsT0FBTyxDQUFDO0FBRXBCLElBQUksSUFBSSxHQUFpQjtJQUN2QixhQUFhLEVBQUUsV0FBVztDQUMzQixDQUFDO0FBRUYsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUN4QyxNQUFNLE1BQU0sR0FBRztRQUNiLEdBQUcsRUFBRTtZQUNILE9BQU8sRUFBRSxVQUFVO1lBQ25CLEtBQUssRUFBRSxVQUFVO1NBQ2xCO1FBQ0QsYUFBYSxFQUFFO1lBQ2IsT0FBTyxFQUFFLGVBQWU7U0FDekI7UUFDRCxnQkFBZ0IsRUFBRTtZQUNoQixPQUFPLEVBQUUsZ0JBQWdCO1NBQzFCO1FBQ0QsWUFBWSxFQUFFO1lBQ1osT0FBTyxFQUFFLG9CQUFvQjtTQUM5QjtRQUNELFdBQVcsRUFBRTtZQUNYLE9BQU8sRUFBRSxVQUFVO1lBQ25CLEtBQUssRUFBRSxVQUFVO1NBQ2xCO1FBQ0QsVUFBVSxF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