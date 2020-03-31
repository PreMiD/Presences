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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDaEMsTUFBTSxFQUFFLDRCQUE0QjtJQUNwQyxNQUFNLEVBQUUsNkJBQTZCO0NBQ3RDLENBQUMsQ0FBQztBQUVILElBQUksTUFBTSxFQUFFLE9BQU8sQ0FBQztBQUVwQixNQUFNLE9BQU8sR0FBRztJQUNkLEdBQUcsRUFBRTtRQUNILE9BQU8sRUFBRSxVQUFVO0tBQ3BCO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsT0FBTyxFQUFFLFNBQVM7UUFDbEIsS0FBSyxFQUFFLE9BQU87S0FDZjtJQUNELE9BQU8sRUFBRTtRQUNQLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLEtBQUssRUFBRSw0QkFBNEI7S0FDcEM7SUFDRCxTQUFTLEVBQUU7UUFDVCxPQUFPLEVBQUUsU0FBUztRQUNsQixLQUFLLEVBQUUsa0JBQWtCO0tBQzFCO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsT0FBTyxFQUFFLFNBQVM7UUFDbEIsS0FBSyxFQUFFLGtCQUFrQjtLQUMxQjtJQUNELFdBQVcsRUFBRTtRQUNYLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLEtBQUssRUFBRSxTQUFTO0tBQ2pCO0lBQ0QsY0FBYyxFQUFFO1FBQ2QsT0FBTyxFQUFFLFNBQVM7UUFDbEIsS0FBSyxFQUFFLFlBQVk7S0FDcEI7SUFDRCxXQUFXLEVBQUU7UUFDWCxPQUFPLEVBQUUsU0FBUztRQUNsQixLQUFLLEVBQUUsU0FBUztLQUNqQjtDQUNGLENBQUM7QUFFRixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMs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