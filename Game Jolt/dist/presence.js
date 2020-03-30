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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixLQUFLLEdBQUc7SUFDUCxRQUFRLEVBQUUsT0FBTztJQUNqQixRQUFRLEVBQUUsT0FBTztJQUNqQixPQUFPLEVBQUUsVUFBVTtJQUNuQixRQUFRLEVBQUUsY0FBYztJQUN4QixVQUFVLEVBQUUsZ0JBQWdCO0lBQzVCLFVBQVUsRUFBRSxlQUFlO0lBQzNCLFVBQVUsRUFBRSxrQkFBa0I7SUFDOUIsV0FBVyxFQUFFLFNBQVM7SUFDdEIsU0FBUyxFQUFFLFFBQVE7SUFDbkIsU0FBUyxFQUFFLFFBQVE7SUFDbkIsZ0JBQWdCLEVBQUUsZUFBZTtJQUNqQyxVQUFVLEVBQUUsY0FBYztJQUMxQix5QkFBeUIsRUFBRSxjQUFjO0lBQ3pDLFdBQVcsRUFBRSxVQUFVO0lBQ3ZCLHNCQUFzQixFQUFFLFlBQVk7Q0FDcEMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUN0QyxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDaEMsb0dBQW9HLENBQ3JGLEVBQ2hCLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM5Qiw2R0FBNkcsQ0FDOUYsRUFDaEIsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQy9CLGtGQUFrRixDQUNuRSxDQUFDO0lBRWxCLElBQUksSUFBSSxHQUF5QjtRQUNoQyxhQUFhLEVBQUUsU0FBUztRQUN4QixjQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO0tBQzdDLENBQUM7SUFF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