const presence = new Presence({
    clientId: "631166262881550359"
});
let presenceData = {
    largeImageKey: "logo"
};
let startTimestamp;
presence.on("UpdateData", async () => {
    if (document.location.hostname === "aternos.org") {
        const panel = document.querySelector('base[href="/panel/"]');
        if (panel) {
            let path = document.location.pathname;
            if (path === "/go/") {
                startTimestamp = null;
                delete presenceData.startTimestamp;
                presenceData.details = "Login Page";
            }
            else {
                if (!startTimestamp)
                    startTimestamp = Date.now();
                path = toTitleCase(document.location.pathname.split("/")[1]);
                presenceData.details = `Configuring Server - ${path}`;
                presenceData.startTimestamp = startTimestamp;
            }
        }
        else {
            presenceData.details = "Home Page";
        }
    }
    else {
        const page = document.location.hostname.split(".")[0];
        presenceData.startTimestamp = Date.now();
        switch (page) {
            case "support":
                if (document.location.pathname.includes("categories")) {
                    let category = document.querySelector(".page-header h1");
                    if (category) {
                        presenceData.details = `Help Center - Viewing category:`;
                        presenceData.state = category.textContent;
                    }
                }
                else if (document.location.pathname.includes("sections")) {
                    let section = document.querySelector(".page-header h1");
                    if (section) {
                        presenceData.details = `Help Center - Viewing section:`;
                        presenceData.state = section.textContent.trim();
                    }
                }
                else if (document.location.pathname.includes("articles")) {
                    let article = document.querySelector(".article-title");
                    if (article) {
                        presenceData.details = `Help Center - Viewing article:`;
                        presenceData.state = article.textContent.trim();
                    }
                }
                else if (document.location.pathname.includes("search")) {
                    let article = document.querySelector("#query");
                    presenceData.details = `Help Center - Searching:`;
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
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILElBQUksWUFBWSxHQUFpQjtJQUMvQixhQUFhLEVBQUUsTUFBTTtDQUN0QixDQUFDO0FBQ0YsSUFBSSxjQUFzQixDQUFDO0FBRTNCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssYUFBYSxFQUFFO1FBQ2hELE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUM3RCxJQUFJLEtBQUssRUFBRTtZQUNULElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1lBQ3RDLElBQUksSUFBSSxLQUFLLE1BQU0sRUFBRTtnQkFDbkIsY0FBYyxHQUFHLElBQUksQ0FBQztnQkFDdEIsT0FBTyxZQUFZLENBQUMsY0FBYyxDQUFDO2dCQUNuQyxZQUFZLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQzthQUNyQztpQkFBTTtnQkFDTCxJQUFJLENBQUMsY0FBYztvQkFBRSxjQUFjLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNqRCxJQUFJLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3RCxZQUFZLENBQUMsT0FBTyxHQUFHLHdCQUF3QixJQUFJLEVBQUUsQ0FBQztnQkFDdEQsWUFBWSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7YUFDOUM7U0FDRjthQUFNO1lBQ0wsWUFBWSxDQUFD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