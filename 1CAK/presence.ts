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
    } else if (!isNaN(parseInt(document.location.pathname.slice(1)))) {
        const author = document.querySelector("#content > div > table > tbody > tr > td > div > .blur a > b").textContent.trim();
        presenceData.details = `Viewing a post from:`;
        presenceData.state = author;
    } else {
        presenceData = {
            largeImageKey: "logo"
        };
    };
    presence.setActivity(presenceData);
});