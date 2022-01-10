const presence = new Presence({
    clientId: "929149225592307752"
}), browsingTimestamp = Math.floor(Date.now() / 1000);
let percentage, assignment;
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "deltamath"
    };
    if (document.location.pathname.includes("/solve")) {
        percentage = document.querySelector("body > app-root > student > div.main.container > problem > problem-toolbar > div.col-md-10.col-lg-9.student-progress.paper-shadow > span.complete-area > span");
        delete presenceData.startTimestamp;
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
        assignment = document
            .querySelector("#question_page > div > div > div.problem-header > div:nth-child(1)")
            ?.innerHTML?.split(/<br.*>/g)[1];
        presenceData.details = assignment;
        presenceData.state = percentage.textContent;
    }
    else {
        presenceData.details = "Browsing site";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    }
    if (presenceData.details)
        presence.setActivity(presenceData);
    else
        presence.setActivity();
});
