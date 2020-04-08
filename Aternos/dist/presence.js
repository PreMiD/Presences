const presence = new Presence({
    clientId: "631166262881550359"
});
const presenceData = {
    largeImageKey: "logo"
};
let startTimestamp;
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
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
                    const category = document.querySelector(".page-header h1");
                    if (category) {
                        presenceData.details = `Help Center - Viewing category:`;
                        presenceData.state = category.textContent;
                    }
                }
                else if (document.location.pathname.includes("sections")) {
                    const section = document.querySelector(".page-header h1");
                    if (section) {
                        presenceData.details = `Help Center - Viewing section:`;
                        presenceData.state = section.textContent.trim();
                    }
                }
                else if (document.location.pathname.includes("articles")) {
                    const article = document.querySelector(".article-title");
                    if (article) {
                        presenceData.details = `Help Center - Viewing article:`;
                        presenceData.state = article.textContent.trim();
                    }
                }
                else if (document.location.pathname.includes("search")) {
                    const article = document.querySelector("#query");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILE1BQU0sWUFBWSxHQUFpQjtJQUNqQyxhQUFhLEVBQUUsTUFBTTtDQUN0QixDQUFDO0FBQ0YsSUFBSSxjQUFzQixDQUFDO0FBRTNCLFNBQVMsV0FBVyxDQUFDLEdBQVc7SUFDOUIsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxVQUFVLEdBQUc7UUFDeEMsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkUsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsS0FBSyxhQUFhLEVBQUU7UUFDaEQsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQzdELElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7WUFDdEMsSUFBSSxJQUFJLEtBQUssTUFBTSxFQUFFO2dCQUNuQixjQUFjLEdBQUcsSUFBSSxDQUFDO2dCQUN0QixPQUFPLFlBQVksQ0FBQyxjQUFjLENBQUM7Z0JBQ25DLFlBQVksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDO2FBQ3JDO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxjQUFjO29CQUFFLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7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