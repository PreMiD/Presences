const presence = new Presence({
    clientId: "631166262881550359"
});
const presenceData = {
    largeImageKey: "logo"
};
const paths = {
    "go": "Login Page",
    "account": "Account",
    "friends": "Friend Access",
    "start": "Home",
    "console": "Console",
    "log": "Log",
    "options": "Options",
    "software": "Software",
    "players": "Players",
    "players/whitelist": "Whitelisted",
    "players/ops": "OPs",
    "players/banned-players": "Banned Players",
    "players/banned-ips": "Banned IPs",
    "files": "Files",
    "addons": "Plugins",
    "worlds": "Worlds",
    "backups": "Backups"
};
presence.on("UpdateData", async () => {
    if (document.location.hostname === "aternos.org") {
        presenceData.startTimestamp = Date.now();
        const panel = document.querySelector("base[href=\"/panel/\"]");
        if (panel) {
            let path = document.location.pathname.endsWith("/") ? document.location.pathname.replace("/", "").slice(0, document.location.pathname.replace("/", "").length - 1) : document.location.pathname.replace("/", "");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILE1BQU0sWUFBWSxHQUFpQjtJQUNqQyxhQUFhLEVBQUUsTUFBTTtDQUN0QixDQUFDO0FBRUYsTUFBTSxLQUFLLEdBQUc7SUFDWixJQUFJLEVBQUUsWUFBWTtJQUNsQixTQUFTLEVBQUUsU0FBUztJQUNwQixTQUFTLEVBQUUsZUFBZTtJQUMxQixPQUFPLEVBQUUsTUFBTTtJQUNmLFNBQVMsRUFBRSxTQUFTO0lBQ3BCLEtBQUssRUFBRSxLQUFLO0lBQ1osU0FBUyxFQUFFLFNBQVM7SUFDcEIsVUFBVSxFQUFFLFVBQVU7SUFDdEIsU0FBUyxFQUFFLFNBQVM7SUFDcEIsbUJBQW1CLEVBQUUsYUFBYTtJQUNsQyxhQUFhLEVBQUUsS0FBSztJQUNwQix3QkFBd0IsRUFBRSxnQkFBZ0I7SUFDMUMsb0JBQW9CLEVBQUUsWUFBWTtJQUNsQyxPQUFPLEVBQUUsT0FBTztJQUNoQixRQUFRLEVBQUUsU0FBUztJQUNuQixRQUFRLEVBQUUsUUFBUTtJQUNsQixTQUFTLEVBQUUsU0FBUztDQUNyQixDQUFDO0FBRUYsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsS0FBSyxhQUFhLEVBQUU7UUFDaEQsWUFBWSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDekMsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQy9ELElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENB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