var presence = new Presence({
    clientId: "684570342085099546"
});
var strings = presence.getStrings({
    browse: "presence.activity.browsing"
});
const getElement = (query) => {
    const element = document.querySelector(query);
    if (element) {
        return element.textContent.replace(/^\s+|\s+$/g, "");
    }
    else
        return undefined;
};
const paths = {
    "/": {
        details: "Browsing"
    },
    "/forum": {
        details: "Viewing Page",
        state: "Forums"
    }
};
const queries = {
    forgot_login: {
        details: "Forgot Login"
    },
    register: {
        details: "Registering..."
    },
    newgame: {
        details: "Creating",
        state: "New Game"
    },
    joingame: {
        details: "Joining",
        state: "New Game"
    },
    shop: {
        details: "Viewing",
        state: "Shop"
    },
    donations: {
        details: "Viewing",
        state: "Donations"
    },
    info: {
        details: "Viewing",
        state: "Game Info"
    },
    recruit: {
        details: "Viewing",
        state: "Recruit a Friend"
    },
    terms: {
        details: "Viewing",
        state: "Terms of Service"
    },
    privacy: {
        details: "Viewing",
        state: "Privacy Policy"
    },
    contact: {
        details: "Viewing",
        state: "Contact"
    }
};
presence.on("UpdateData", async () => {
    let data = {
        largeImageKey: "boardgameonline"
    };
    const host = location.host;
    const path = location.pathname;
    const query = location.search;
    const queryString = query && query.split("page=")[1].split("&")[0];
    if (host === "www.boardgame-online.com") {
        if (path in paths)
            data = { ...data, ...paths[path] };
        if (queryString && queryString in queries)
            data = { ...data, ...queries[queryString] };
        const header = getElement(".page_wrapper.show > .page_content > h2");
        if (header !== undefined) {
            data.details = "Viewing";
            data.state = header;
        }
        const profile = getElement(".page_wrapper.show > .page_content > #profile_name_title > .userName");
        if (profile !== undefined) {
            data.details = "Viewing Profile";
            data.state = profile;
        }
    }
    else {
        const playerCount = document.querySelector(".rankingTable")
            .childElementCount;
        data.details = "Playing Game";
        data.state = document.title;
        if (playerCount) {
            data.state = document.title + ` (${playerCount - 1} Players)`;
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
        presence.setActivity();
        presence.setTrayTitle();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDaEMsTUFBTSxFQUFFLDRCQUE0QjtDQUNyQyxDQUFDLENBQUM7QUFFSCxNQUFNLFVBQVUsR0FBRyxDQUFDLEtBQWEsRUFBVSxFQUFFO0lBQzNDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUMsSUFBSSxPQUFPLEVBQUU7UUFDWCxPQUFPLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztLQUN0RDs7UUFBTSxPQUFPLFNBQVMsQ0FBQztBQUMxQixDQUFDLENBQUM7QUFFRixNQUFNLEtBQUssR0FBRztJQUNaLEdBQUcsRUFBRTtRQUNILE9BQU8sRUFBRSxVQUFVO0tBQ3BCO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsT0FBTyxFQUFFLGNBQWM7UUFDdkIsS0FBSyxFQUFFLFFBQVE7S0FDaEI7Q0FDRixDQUFDO0FBRUYsTUFBTSxPQUFPLEdBQUc7SUFDZCxZQUFZLEVBQUU7UUFDWixPQUFPLEVBQUUsY0FBYztLQUN4QjtJQUNELFFBQVEsRUFBRTtRQUNSLE9BQU8sRUFBRSxnQkFBZ0I7S0FDMUI7SUFDRCxPQUFPLEVBQUU7UUFDUCxPQUFPLEVBQUUsVUFBVTtRQUNuQixLQUFLLEVBQUUsVUFBVTtLQUNsQjtJQUNELFFBQVEsRUFBRTtRQUNSLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLEtBQUssRUFBRSxVQUFVO0tBQ2xCO0lBQ0QsSUFBSSxFQUFFO1FBQ0osT0FBTyxFQUFFLFNBQVM7UUFDbEIsS0FBSyxFQUFFLE1BQU07S0FD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