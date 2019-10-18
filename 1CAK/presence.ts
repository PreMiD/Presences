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
    if (document.location.pathname === "/") {
        presenceData.details = "Home Page";
    } else if (document.location.pathname === "/trending") {
        presenceData.details = "Trending Page";
    } else if (document.location.pathname === "/recent") {
        presenceData.details = "Recent Page";
    } else if (document.location.pathname === "/legendary") {
        presenceData.details = "Legendary Page";
    } else if (document.location.pathname === "/friends") {
        presenceData.details = "Friends Page";
    } else if (document.location.pathname === "/rules") {
        presenceData.details = "Reading the rules";
    } else if (document.location.pathname.slice(1).startsWith("of")) {
        presenceData.details = document.querySelector("#content > h3").textContent.trim();
    } else if (!isNaN(parseInt(document.location.pathname.slice(1)))) {
        const author = document.querySelector("#content > div > table > tbody > tr > td > div > .blur a > b").textContent.trim();
        presenceData.details = `Viewing ${author}'s post`;
    } else {
        presenceData = {
            largeImageKey: "logo"
        };
    };
    presence.setActivity(presenceData);
});