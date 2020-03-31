const presence = new Presence({
    clientId: "633419305836347393"
}), pages = {
    "/games": "Games",
    "/login": "Login",
    "/join": "Register",
    "/terms": "Terms of Use",
    "/privacy": "Privacy Policy",
    "/cookies": "Cookie Policy",
    "/welcome": "Just Registered!",
    "/discover": "Explore",
    "/client": "Client",
    "/forums": "Forums",
    "/notifications": "Notifications",
    "/library": "Game Library",
    "/dashboard/profile/edit": "Edit Profile",
    "/settings": "Settings",
    "/dashboard/games/add": "Add a Game"
};
presence.on("UpdateData", async () => {
    const page = document.location.pathname, gameName = document.querySelector("#content > div > div > div > div > header > section > div.container > div.row > div > div > h1 > a"), author = document.querySelector("#content > div > div > div > div > header > section > div.container > div.row > div > div > div > a > small"), profile = document.querySelector("#content > div > div > header > section > div > div.row > div > div > h1 > small");
    let data = {
        largeImageKey: "gj-logo",
        startTimestamp: Math.floor(Date.now() / 1000)
    };
    if (page.includes("/games/tag-")) {
        const tagName = page.replace("/games/tag-", "");
        data.details = "Browsing games by tag:";
        data.state = tagName[0].toUpperCase() + tagName.slice(1);
    }
    else if (page.includes("/games/") &&
        gameName &&
        gameName.textContent !== "") {
        data.details = `Viewing a game${author && author.textContent !== "" ? " by " + author.textContent : ""}:`;
        data.state = gameName.textContent.trim();
    }
    else if (pages[page] || pages[page.slice(0, -1)]) {
        data.details = "Viewing a page:";
        data.state = pages[page] || pages[page.slice(0, -1)];
    }
    else if (page.includes("/search")) {
        const fixedSearchName = document.title
            .replace(" - Game Jolt", "")
            .replace("Search results for ", "");
        data.details = `Searching for${page.includes("/search/users")
            ? " a user"
            : `${page.includes("/search/games") ? " a game" : ""}`}:`;
        data.state = fixedSearchName[0].toUpperCase() + fixedSearchName.slice(1);
        data.smallImageKey = "search";
    }
    else if (profile && profile.textContent != "") {
        data.details = `Viewing a user:`;
        data.state = profile.textContent;
    }
    else {
        data.details = "Viewing a page:";
        data.state = "Home";
    }
    if (data.details && data.state && data.details != "" && data.state != "")
        presence.setActivity(data);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixLQUFLLEdBQUc7SUFDTixRQUFRLEVBQUUsT0FBTztJQUNqQixRQUFRLEVBQUUsT0FBTztJQUNqQixPQUFPLEVBQUUsVUFBVTtJQUNuQixRQUFRLEVBQUUsY0FBYztJQUN4QixVQUFVLEVBQUUsZ0JBQWdCO0lBQzVCLFVBQVUsRUFBRSxlQUFlO0lBQzNCLFVBQVUsRUFBRSxrQkFBa0I7SUFDOUIsV0FBVyxFQUFFLFNBQVM7SUFDdEIsU0FBUyxFQUFFLFFBQVE7SUFDbkIsU0FBUyxFQUFFLFFBQVE7SUFDbkIsZ0JBQWdCLEVBQUUsZUFBZTtJQUNqQyxVQUFVLEVBQUUsY0FBYztJQUMxQix5QkFBeUIsRUFBRSxjQUFjO0lBQ3pDLFdBQVcsRUFBRSxVQUFVO0lBQ3ZCLHNCQUFzQixFQUFFLFlBQVk7Q0FDckMsQ0FBQztBQUVKLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUNyQyxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDL0Isb0dBQW9HLENBQ3RGLEVBQ2hCLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM3Qiw2R0FBNkcsQ0FDL0YsRUFDaEIsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzlCLGtGQUFrRixDQUNwRSxDQUFDO0lBRW5CLElBQUksSUFBSSxHQUF5QjtRQUMvQixhQUFhLEVBQUUsU0FBUztRQUN4QixjQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO0tBQzlDLENBQUM7SUFFRixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUU7UUFDaEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFaEQsSUFBSSxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQztRQUN4QyxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzFEO1NBQU0sSUFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztRQUN4QixRQUFRO1FBQ1IsUUFBUSxDQUFDLFdBQVcsS0FBSyxFQUFFLEVBQzNCO1FBQ0EsSUFBSSxDQUFDLE9BQU8sR0FBRyxpQkFDYixNQUFNLElBQUksTUFBTSxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUN0RSxHQUFHLENBQUM7UUFDSixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDMUM7U0FBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ2xELElBQUksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUM7UUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN0RDtTQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUNuQyxNQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsS0FBSzthQUNuQyxPQUFPLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQzthQUMzQixPQUFPLENBQUMscUJBQXFCLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxnQkFDYixJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQztZQUM1QixDQUFDLENBQUMsU0FBUztZQUNYLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUN4RCxHQUFHLENBQUM7UUFDSixJQUFJLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO0tBQy9CO1NBQU0sSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUU7UUFDL0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUM7S0FDbEM7U0FBTTtRQUNMLElBQUksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUM7UUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7S0FDckI7SUFFRCxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDdEUsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMvQixDQUFDLENBQUMsQ0FBQyJ9