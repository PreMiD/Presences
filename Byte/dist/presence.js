var presence = new Presence({
    clientId: "671199009674756146"
});
var strings = presence.getStrings({
    browse: "presence.activity.browsing",
    search: "presence.activity.searching"
});
var oldUrl, elapsed;
const statics = {
    "/": {
        details: "Browsing"
    },
    "/about/": {
        details: "Viewing",
        state: "About"
    },
    "/faq/": {
        details: "Viewing",
        state: "Frequently Asked Questions"
    },
    "/terms/": {
        details: "Viewing",
        state: "Terms of Service"
    },
    "/tos/": {
        details: "Viewing",
        state: "Terms of Service"
    },
    "/privacy/": {
        details: "Viewing",
        state: "Privacy"
    },
    "/guidelines/": {
        details: "Viewing",
        state: "Guidelines"
    },
    "/contact/": {
        details: "Viewing",
        state: "Contact"
    }
};
presence.on("UpdateData", async () => {
    const host = location.host;
    const path = location.pathname.replace(/\/?$/, "/");
    var data = {
        details: undefined,
        state: undefined,
        largeImageKey: "byte",
        smallImageKey: undefined,
        smallImageText: undefined,
        startTimestamp: undefined,
        endTimestamp: undefined
    };
    if (oldUrl !== path) {
        oldUrl = path;
        elapsed = Math.floor(Date.now() / 1000);
    }
    if (path in statics) {
        data = { ...data, ...statics[path] };
    }
    if (elapsed) {
        data.startTimestamp = elapsed;
    }
    if (host === "community.byte.co") {
        data.details = "Browsing Community";
        data.largeImageKey = "bytecom";
        if (path.match("/categories/") ||
            path.match("/latest/") ||
            path.match("/top/") ||
            path.match("/unread/"))
            data.state = getElement(".active");
        if (path.match("/new/")) {
            data.state = "Newest";
        }
        if (path.match("/badges/")) {
            data.details = "Viewing Badges";
            data.state = getElement(".show-badge-details .badge-link");
        }
        if (path.match("/tags/")) {
            data.state = "Tags";
        }
        if (path.match("/tag/")) {
            data.details = "Viewing Tag";
            data.state = getElement(".discourse-tag");
        }
        if (path.match("/cakeday/")) {
            data.details = "Viewing Cakedays";
            data.state = `${getElement(".nav-pills .active")} (${getElement(".anniversaries .nav-pills .active")})`;
        }
        if (path.match("/c/")) {
            data.details = "Viewing Category";
            data.state = getElement(".selected-name .category-name");
            const tag = getElement(".active");
            if (tag) {
                data.details += `'s ${tag}`;
            }
        }
        if (path.match("/t/")) {
            data.details = "Viewing Thread";
            data.state = getElement(".fancy-title");
        }
        if (path.match("/u/")) {
            data.details = "Viewing Users";
            if (document.querySelector(".details")) {
                data.details = "Viewing User";
                data.state = `${getElement(".username")} (${getElement(".full-name")})`;
                const tag = getElement(".active");
                if (tag) {
                    data.details += `'s ${tag}`;
                }
            }
        }
        if (path.match("/g/")) {
            data.details = "Viewing Group";
            data.state = `${getElement(".group-info-name")} (${getElement(".group-info-full-name")})`;
            const tag = getElement(".active");
            if (tag) {
                data.details += `'s ${tag}`;
            }
        }
        if (path.match("/search/")) {
            data.details = "Searching";
            data.smallImageKey = "search";
            data.smallImageText = (await strings).search;
            const search = document.querySelector("input");
            data.state = search.value !== "" ? search.value : undefined;
        }
    }
    if (host === "help.byte.co") {
        data.details = "Browsing Help";
        data.largeImageKey = "bytehelp";
        if (path.match("/sections/")) {
            data.details = "Viewing Section";
            data.state = getElement("h1");
        }
        if (path.match("/articles/")) {
            data.details = "Viewing Article";
            data.state = getElement(".article-title");
        }
        if (path.match("/requests/new/")) {
            data.details = "Creating";
            data.state = "New Request";
        }
    }
    if (data.details !== undefined) {
        if (data.details.match("(Browsing|Viewing)")) {
            data.smallImageKey = "reading";
            data.smallImageText = (await strings).browse;
        }
        presence.setActivity(data);
    }
    else {
        presence.setTrayTitle();
        presence.setActivity();
    }
});
const getElement = (query) => {
    const element = document.querySelector(query);
    if (element) {
        return element.textContent.replace(/^\s+|\s+$/g, "");
    }
    else
        return undefined;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUNILElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDakMsTUFBTSxFQUFFLDRCQUE0QjtJQUNwQyxNQUFNLEVBQUUsNkJBQTZCO0NBQ3JDLENBQUMsQ0FBQztBQUVILElBQUksTUFBTSxFQUFFLE9BQU8sQ0FBQztBQUVwQixNQUFNLE9BQU8sR0FBRztJQUNmLEdBQUcsRUFBRTtRQUNKLE9BQU8sRUFBRSxVQUFVO0tBQ25CO0lBQ0QsU0FBUyxFQUFFO1FBQ1YsT0FBTyxFQUFFLFNBQVM7UUFDbEIsS0FBSyxFQUFFLE9BQU87S0FDZDtJQUNELE9BQU8sRUFBRTtRQUNSLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLEtBQUssRUFBRSw0QkFBNEI7S0FDbkM7SUFDRCxTQUFTLEVBQUU7UUFDVixPQUFPLEVBQUUsU0FBUztRQUNsQixLQUFLLEVBQUUsa0JBQWtCO0tBQ3pCO0lBQ0QsT0FBTyxFQUFFO1FBQ1IsT0FBTyxFQUFFLFNBQVM7UUFDbEIsS0FBSyxFQUFFLGtCQUFrQjtLQUN6QjtJQUNELFdBQVcsRUFBRTtRQUNaLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLEtBQUssRUFBRSxTQUFTO0tBQ2hCO0lBQ0QsY0FBYyxFQUFFO1FBQ2YsT0FBTyxFQUFFLFNBQVM7UUFDbEIsS0FBSyxFQUFFLFlBQVk7S0FDbkI7SUFDRCxXQUFXLEVBQUU7UUFDWixPQUFPLEVBQUUsU0FBUztRQUNsQixLQUFLLEVBQUUsU0FBUztLQUNoQjtDQUNELENBQUM7QUFFRixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMs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