const presence = new Presence({
    clientId: "634332519398899724",
    mediaKeys: false
});
let presenceData: presenceData = {
    largeImageKey: "logo"
};

presence.on("UpdateData", async () => {
    let startTimestamp: number = Date.now();
    presenceData.startTimestamp = startTimestamp;
    switch (document.location.pathname) {
        case "/":
            presenceData.details = "Home Page";
            break;
        case "/trending":
            presenceData.details = "Trending Page";
            break;
        case "/recent":
            presenceData.details = "Recent Page";
            break;
        case "/legendary":
            presenceData.details = "Legendary Page";
            break;
        case "/friends":
            presenceData.details = "Friends Page";
            break;
        case "rules":
            presenceData.details = "Reading the rules";
            break;
        case "/notifications":
            presenceData.details = "Notifications Page";
            break;
        case "/weeklytop":
            presenceData.details = "Top Users";
            break;
        case "/alltimetop":
            presenceData.details = "Top Users";
            break;
        case "/preferences":
            presenceData.details = "Settings";
            break;
        case "/privacy_setting":
            presenceData.details = "Settings";
            break;
    };

    if (document.location.pathname.slice(1).startsWith("of")) {
        presenceData.details = document.querySelector("#content > h3").textContent.trim();
    } else if (document.location.pathname.slice(1).startsWith("saved")) {
        if (!document.querySelector("#content > p")) {
            presenceData.details = "Saved Posts";
        };
    } else if (document.location.pathname.slice(1).startsWith("voteof")) {
        if (!document.querySelector("#content > p")) {
            presenceData.details = "Voted Posts";
        };
    } else if (!isNaN(parseInt(document.location.pathname.slice(1)))) {
        const author = document.querySelector("#content > div > table > tbody > tr > td > div > .blur a > b").textContent.trim();
        presenceData.details = `Viewing ${author}'s post`;
    };
    presence.setActivity(presenceData);
});