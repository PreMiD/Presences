const presence = new Presence({
    clientId: "701201789365518337"
});
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "overbuff"
    };
    if (window.location.pathname.includes("/players/")) {
        const nickname = document.querySelector("div.layout-header-primary-bio > h1").firstChild.textContent;
        const level = document.querySelector("div.image-with-corner > div.corner.corner-text").textContent;
        if (window.location.pathname.includes("pc")) {
            presenceData.smallImageKey = "windows";
            presenceData.smallImageText = "Playing on PC";
        }
        else if (window.location.pathname.includes("xbl")) {
            presenceData.smallImageKey = "xbox";
            presenceData.smallImageText = "Playing on Xbox";
        }
        else if (window.location.pathname.includes("psn")) {
            presenceData.smallImageKey = "ps4";
            presenceData.smallImageText = "Playing on Playstation";
        }
        presenceData.details = "Viewing a player:";
        presenceData.state = `${nickname} | Level: ${level}`;
        if (window.location.pathname.includes("/heroes")) {
            presenceData.details = `Viewing ${nickname}`;
            presenceData.state = "Browsing heroes";
            try {
                const get_hero = document.querySelector("div.name > a").textContent;
                presenceData.state += ` (${get_hero})`;
            }
            catch {
            }
        }
        else if (window.location.pathname.includes("/records")) {
            presenceData.details = `Viewing ${nickname}`;
            presenceData.state = "Browsing records";
        }
        else if (window.location.pathname.includes("/trends")) {
            presenceData.details = `Viewing ${nickname}`;
            presenceData.state = "Browsing trends";
        }
        else if (window.location.pathname.includes("/activity")) {
            presenceData.details = `Viewing ${nickname}`;
            presenceData.state = "Browsing activity";
        }
        else if (window.location.pathname.includes("/trends")) {
            presenceData.details = `Viewing ${nickname}`;
            presenceData.state = "Browsing trends";
        }
    }
    else if (window.location.pathname.includes("/heroes")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Heroes";
        try {
            const hero_name = document.querySelector("div.layout-header-primary-bio > div > h1").firstChild.textContent;
            const hero_role = document.querySelector("div.layout-header-primary-bio > div > h1 > small").textContent;
            presenceData.details = "Viewing a Hero:";
            presenceData.state = `${hero_name} (${hero_role})`;
        }
        catch {
            console.log("That's not a Hero profile.");
        }
    }
    else if (window.location.pathname.includes("/roles")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Roles";
        try {
            const role_name = document.querySelector("div.layout-header-primary-bio > div > h1").firstChild.textContent;
            presenceData.details = "Viewing a role:";
            presenceData.state = role_name;
            if (window.location.pathname.includes("/rankings")) {
                presenceData.state = `${role_name} ranking`;
            }
        }
        catch {
            console.log("That's not a Hero profile.");
        }
    }
    else if (window.location.pathname.includes("/verified")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Verified Players";
    }
    else if (window.location.pathname.includes("/rankings")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Player Rankings";
    }
    else if (window.location.pathname.includes("/esports")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Esports";
    }
    else if (window.location.pathname.includes("/live")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Live Streams";
    }
    else if (window.location.pathname.includes("/compare")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Compare players";
    }
    else if (window.location.pathname.includes("/blog")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Overbuff Blog";
        try {
            const blog_title = document.querySelector("div.post-title > h1.title")
                .textContent;
            presenceData.details = "Reading a blog:";
            presenceData.state = blog_title;
        }
        catch {
            console.log("That's not a blog post.");
        }
    }
    else if (window.location.pathname.includes("/about")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "About Overbuff";
    }
    else if (window.location.pathname.includes("/favorites")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Favorites";
    }
    else if (window.location.pathname.includes("/search")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Search Players";
    }
    else if (window.location.pathname.includes("/settings")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Settings";
    }
    else if (window.location.pathname.endsWith("/privacy")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Privacy Policy";
    }
    else {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Front page";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLFVBQVU7S0FDMUIsQ0FBQztJQUVGLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQ2xELE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3JDLG9DQUFvQyxDQUNyQyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUM7UUFDekIsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDbEMsZ0RBQWdELENBQ2pELENBQUMsV0FBVyxDQUFDO1FBQ2QsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDM0MsWUFBWSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7WUFDdkMsWUFBWSxDQUFDLGNBQWMsR0FBRyxlQUFlLENBQUM7U0FDL0M7YUFBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNuRCxZQUFZLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztZQUNwQyxZQUFZLENBQUMsY0FBYyxHQUFHLGlCQUFpQixDQUFDO1NBQ2pEO2FBQU0sSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbkQsWUFBWSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFDbkMsWUFBWSxDQUFDLGNBQWMs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