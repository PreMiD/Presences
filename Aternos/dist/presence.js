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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM3QixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUNILElBQUksWUFBWSxHQUFpQjtJQUNoQyxhQUFhLEVBQUUsTUFBTTtDQUNyQixDQUFDO0FBQ0YsSUFBSSxjQUFzQixDQUFDO0FBRTNCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssYUFBYSxFQUFFO1FBQ2pELE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUM3RCxJQUFJLEtBQUssRUFBRTtZQUNWLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1lBQ3RDLElBQUksSUFBSSxLQUFLLE1BQU0sRUFBRTtnQkFDcEIsY0FBYyxHQUFHLElBQUksQ0FBQztnQkFDdEIsT0FBTyxZQUFZLENBQUMsY0FBYyxDQUFDO2dCQUNuQyxZQUFZLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQzthQUNwQztpQkFBTTtnQkFDTixJQUFJLENBQUMsY0FBYztvQkFBRSxjQUFjLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNqRCxJQUFJLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3RCxZQUFZLENBQUMsT0FBTyxHQUFHLHdCQUF3QixJQUFJLEVBQUUsQ0FBQztnQkFDdEQsWUFBWSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7YUFDN0M7U0FDRDthQUFNO1lBQ04sWUFBWSxDQUFD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