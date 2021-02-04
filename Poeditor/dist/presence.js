const presence = new Presence({
    clientId: "685491676155871281",
    appMode: true
});
const presenceData = {
    details: "Loading Poeditor",
    state: "Poeditor",
    largeImageKey: "poeditor",
    smallImageKey: "premid",
    smallImageText: "Using poeditor...",
};
presence.on("UpdateData", () => {
    const presenceData = {}, Path = document.location.pathname;
    if (Path == "/projects/") {
        presenceData.details = `Viewing projects tab `;
    }
    if (Path.startsWith("/projects/")) {
        const projectname = document.querySelector("html > body.bg-blue > div.container-highlight.no-padding > div.stripenavbar > div.container > div.row div.col-lg-12 > div.stripenavbar-wrapper > div.stripe-main.stripe-language > h2.no-margin > span.title-item.light > span.title-text.cut-item.ellipsis").textContent;
        presenceData.details = `Translating ${projectname}`;
    }
    else {
        presenceData.details = `Browsing the site `;
    }
    presence.setActivity(presenceData);
});
