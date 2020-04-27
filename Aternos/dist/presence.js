const presence = new Presence({
    clientId: "631166262881550359"
});
const presenceData = {
    largeImageKey: "logo"
};
const paths = {
    go: "Login Page",
    account: "Account",
    friends: "Friend Access",
    start: "Home",
    console: "Console",
    log: "Log",
    options: "Options",
    software: "Software",
    players: "Players",
    "players/whitelist": "Whitelisted",
    "players/ops": "OPs",
    "players/banned-players": "Banned Players",
    "players/banned-ips": "Banned IPs",
    files: "Files",
    addons: "Plugins",
    worlds: "Worlds",
    backups: "Backups"
};
presence.on("UpdateData", async () => {
    if (document.location.hostname === "aternos.org") {
        presenceData.startTimestamp = Date.now();
        const panel = document.querySelector('base[href="/panel/"]');
        if (panel) {
            let path = document.location.pathname.endsWith("/")
                ? document.location.pathname
                    .replace("/", "")
                    .slice(0, document.location.pathname.replace("/", "").length - 1)
                : document.location.pathname.replace("/", "");
            if (path.startsWith("software"))
                path = "software";
            if (path.startsWith("files"))
                path = "files";
            if (path.startsWith("addons"))
                path = "addons";
            path = paths[path];
            if (path) {
                presenceData.details = `Panel - ${path}`;
            }
            else {
                presenceData.details = "404 Not Found";
                presenceData.startTimestamp = null;
            }
        }
        else {
            if (document.location.pathname === "/server/") {
                presenceData.details = "Panel - Server";
            }
            else {
                presenceData.details = "Home Page";
            }
        }
    }
    else {
        const page = document.location.hostname.split(".")[0];
        presenceData.startTimestamp = Date.now();
        switch (page) {
            case "support":
                if (document.location.pathname.includes("categories")) {
                    const category = document.querySelector(".page-header h1");
                    if (category) {
                        presenceData.details = "Help Center - Viewing category:";
                        presenceData.state = category.textContent.trim();
                    }
                }
                else if (document.location.pathname.includes("sections")) {
                    const section = document.querySelector(".page-header h1");
                    if (section) {
                        presenceData.details = "Help Center - Viewing section:";
                        presenceData.state = section.textContent.trim();
                    }
                }
                else if (document.location.pathname.includes("articles")) {
                    const article = document.querySelector(".article-title");
                    if (article) {
                        presenceData.details = "Help Center - Viewing article:";
                        presenceData.state = article.textContent.trim();
                    }
                }
                else if (document.location.pathname.includes("search")) {
                    const article = document.querySelector("#query");
                    presenceData.details = "Help Center - Searching:";
                    presenceData.state = article.value;
                }
                else {
                    presenceData.details = "Help Center";
                }
                break;
            case "board":
                presenceData.startTimestamp = Date.now();
                presenceData.details = "Community Forums";
                break;
        }
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILE1BQU0sWUFBWSxHQUFpQjtJQUNqQyxhQUFhLEVBQUUsTUFBTTtDQUN0QixDQUFDO0FBRUYsTUFBTSxLQUFLLEdBQUc7SUFDWixFQUFFLEVBQUUsWUFBWTtJQUNoQixPQUFPLEVBQUUsU0FBUztJQUNsQixPQUFPLEVBQUUsZUFBZTtJQUN4QixLQUFLLEVBQUUsTUFBTTtJQUNiLE9BQU8sRUFBRSxTQUFTO0lBQ2xCLEdBQUcsRUFBRSxLQUFLO0lBQ1YsT0FBTyxFQUFFLFNBQVM7SUFDbEIsUUFBUSxFQUFFLFVBQVU7SUFDcEIsT0FBTyxFQUFFLFNBQVM7SUFDbEIsbUJBQW1CLEVBQUUsYUFBYTtJQUNsQyxhQUFhLEVBQUUsS0FBSztJQUNwQix3QkFBd0IsRUFBRSxnQkFBZ0I7SUFDMUMsb0JBQW9CLEVBQUUsWUFBWTtJQUNsQyxLQUFLLEVBQUUsT0FBTztJQUNkLE1BQU0sRUFBRSxTQUFTO0lBQ2pCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE9BQU8sRUFBRSxTQUFTO0NBQ25CLENBQUM7QUFFRixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxLQUFLLGFBQWEsRUFBRTtRQUNoRCxZQUFZLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN6QyxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDN0QsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FB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