var presence = new Presence({
    clientId: "684570342085099546"
});
var strings = presence.getStrings({
    browse: "presence.activity.browsing"
});
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
        details: undefined,
        state: undefined,
        largeImageKey: "boardgameonline",
        smallImageKey: undefined,
        smallImageText: undefined,
        startTimestamp: undefined,
        endTimestamp: undefined
    };
    const host = location.host;
    const path = location.pathname;
    const query = location.search;
    const queryString = query && query.split("page=")[1]?.split("&")[0];
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
            ?.childElementCount;
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
const getElement = (query) => {
    const element = document.querySelector(query);
    if (element) {
        return element.textContent.replace(/^\s+|\s+$/g, "");
    }
    else
        return undefined;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUNILElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDakMsTUFBTSxFQUFFLDRCQUE0QjtDQUNwQyxDQUFDLENBQUM7QUFFSCxNQUFNLEtBQUssR0FBRztJQUNiLEdBQUcsRUFBRTtRQUNKLE9BQU8sRUFBRSxVQUFVO0tBQ25CO0lBQ0QsUUFBUSxFQUFFO1FBQ1QsT0FBTyxFQUFFLGNBQWM7UUFDdkIsS0FBSyxFQUFFLFFBQVE7S0FDZjtDQUNELENBQUM7QUFFRixNQUFNLE9BQU8sR0FBRztJQUNmLFlBQVksRUFBRTtRQUNiLE9BQU8sRUFBRSxjQUFjO0tBQ3ZCO0lBQ0QsUUFBUSxFQUFFO1FBQ1QsT0FBTyxFQUFFLGdCQUFnQjtLQUN6QjtJQUNELE9BQU8sRUFBRTtRQUNSLE9BQU8sRUFBRSxVQUFVO1FBQ25CLEtBQUssRUFBRSxVQUFVO0tBQ2pCO0lBQ0QsUUFBUSxFQUFFO1FBQ1QsT0FBTyxFQUFFLFNBQVM7UUFDbEIsS0FBSyxFQUFFLFVBQVU7S0FDakI7SUFDRCxJQUFJLEVBQUU7UUFDTCxPQUFPLEVBQUUsU0FBUztRQUNsQixLQUFLLEVBQUUsTUFBTTtLQUNiO0lBQ0QsU0FBUyxFQUFFO1FBQ1YsT0FBTyxFQUFFLFNBQVM7UUFDbEIsS0FBSyxFQUFFLFdBQVc7S0FDbEI7SUFDRCxJQUFJLEVBQUU7UUFDTCxPQUFPLEVBQUUsU0FBUztRQUNsQixLQUFLLEVBQUUsV0FBVztLQUNsQjtJQUNELE9BQU8sRUFBRTtRQUNSLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLEtBQUssRUFBRSxrQkFBa0I7S0FDekI7SUFDRCxLQUFLLEVBQUU7UUFDTixPQUFPLEVBQUUsU0FBUztRQUNsQixLQUFLLEVBQUUsa0JBQWtCO0tBQ3pCO0lBQ0QsT0FBTyxFQUFFO1FBQ1IsT0FBTyxFQUFFLFNBQVM7UUFDbEIsS0FBSyxFQUFFLGdCQUFnQjtLQUN2QjtJQUNELE9BQU8sRUFBRTtRQUNSLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLEtBQUssRUFBRSxTQUFTO0tBQ2hCO0NBQ0QsQ0FBQztBQUVGLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksSUFBSSxHQUFpQjtRQUN4QixPQUFPLEVBQUUsU0FBUztRQUNsQixLQUFLLEVBQUUsU0FBUztRQUNoQixhQUFhLEVBQUUsaUJBQWlCO1FBQ2hDLGFBQWEsRUFBRSxTQUFTO1FBQ3hCLGNBQWMsRUFBRSxTQUFTO1FBQ3pCLGNBQWMsRUFBRSxTQUFTO1FBQ3pCLFlBQVksRUFBRSxTQUFTO0tBQ3ZCLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO0lBQzNCLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFDL0IsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztJQUM5QixNQUFNLFdBQVcsR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFcEUsSUFBSSxJQUFJLEtBQUssMEJBQTBCLEVBQUU7UUFDeEMsSUFBSSxJQUFJLElBQUksS0FBSztZQUFFLElBQUksR0FBRyxFQUFFLEdBQUcsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDdEQsSUFBSSxXQUFXLElBQUksV0FBVyxJQUFJLE9BQU87WUFDeEMsSUFBSSxHQUFHLEVBQUUsR0FBRyxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQztRQUU3QyxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMseUNBQXlDLENBQUMsQ0FBQztRQUNyRSxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7WUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7U0FDcEI7UUFFRCxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQ3pCLHNFQUFzRSxDQUN0RSxDQUFDO1FBQ0YsSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUM7WUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7U0FDckI7S0FDRDtTQUFNO1FBQ04sTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUM7Y0FDeEQsaUJBQWlCLENBQUM7UUFFckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7UUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBRTVCLElBQUksV0FBVyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssR0FBRyxLQUFLLFdBQVcsR0FBRyxDQUFDLFdBQVcsQ0FBQztTQUM5RDtLQUNEO0lBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRTtRQUMvQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLEVBQUU7WUFDN0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7WUFDL0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDO1NBQzdDO1FBQ0QsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMzQjtTQUFNO1FBQ04sUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZCLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUN4QjtBQUNGLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxVQUFVLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtJQUNwQyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlDLElBQUksT0FBTyxFQUFFO1FBQ1osT0FBTyxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDckQ7O1FBQU0sT0FBTyxTQUFTLENBQUM7QUFDekIsQ0FBQyxDQUFDIn0=