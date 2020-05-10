const presence = new Presence({
    clientId: "682781181863133220"
});
const browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "upbeat"
    };
    const paused = document
        .querySelector("#radioPlayer > span > i")
        .className.includes("fa-play");
    const newsreporterapply = document.querySelector("#modalmediaAppButton") !== null;
    const partner = document.querySelector("#modalpartnerEnquiryButton") !== null;
    const request = document.querySelector("#modalrequestFormModal") !== null;
    const enquiry = document.querySelector("#modalcontactUsButton") !== null;
    const djapply = document.querySelector("#modaldjAppButton") !== null;
    const feedback = document.querySelector("#modalundefined") !== null;
    const editingbio = document.querySelector("#accountBio") !== null;
    const format1 = await presence.getSetting("sFormatNoDj1");
    const format2 = await presence.getSetting("sFormatNoDj2");
    const elapsed = await presence.getSetting("tElapsed");
    const format = await presence.getSetting("sFormat");
    const info = await presence.getSetting("sInfo");
    const dj = await presence.getSetting("sDJ");
    let djType;
    if (elapsed)
        presenceData.startTimestamp = browsingStamp;
    if (info) {
        if (document.location.pathname.includes("/UpBeat.Home")) {
            if (paused) {
                presenceData.details = "Viewing the main page...";
                presenceData.smallImageKey = "pause";
                presenceData.smallImageText = format
                    .replace("%song%", document.querySelector(".stats-song").textContent)
                    .replace("%artist%", document.querySelector(".stats-artist").textContent);
            }
            else {
                if (document.querySelector(".stats-djName").textContent == "UpBeat") {
                    djType = "AutoDJ - ";
                }
                else {
                    djType = "DJ: ";
                }
                presenceData.smallImageKey = "play";
                if (dj) {
                    presenceData.details = format
                        .replace("%song%", document.querySelector(".stats-song").textContent)
                        .replace("%artist%", document.querySelector(".stats-artist").textContent);
                    presenceData.state =
                        djType + document.querySelector(".stats-djName").textContent;
                }
                else {
                    presenceData.details = format1
                        .replace("%song%", document.querySelector(".stats-song").textContent)
                        .replace("%artist%", document.querySelector(".stats-artist").textContent);
                    presenceData.state = format2
                        .replace("%song%", document.querySelector(".stats-song").textContent)
                        .replace("%artist%", document.querySelector(".stats-artist").textContent);
                }
            }
        }
        else if (document.location.pathname.includes("/News.Article")) {
            presenceData.details =
                "Reading article: " +
                    document.querySelector(".title").textContent.trim();
            presenceData.state =
                "Written by: " + document.querySelector(".info > a").textContent.trim();
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/Account.Profile")) {
            presenceData.details = "Viewing profile of:";
            presenceData.state = document.querySelector(".profileName > span").textContent;
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/Account.Settings")) {
            presenceData.details = "Changing their settings...";
            presenceData.smallImageKey = "writing";
        }
        else if (document.location.pathname.includes("/Radio.RecentlyPlayed")) {
            presenceData.details = "Viewing the";
            presenceData.state = "recently played songs";
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/UpBeat.AboutUs")) {
            presenceData.details = "Reading about UpBeat";
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/UpBeat.OurAffiliates")) {
            presenceData.details = "Viewing the";
            presenceData.state = "UpBeat affiliates";
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/Community.Members")) {
            let type = document
                .querySelector("#mainContent > div.m-b-md.m-t-sm > ul > .active > a")
                .textContent.toLowerCase();
            if (type == "vip's")
                type = "VIP";
            presenceData.details = "Viewing the";
            presenceData.state = type + " members";
            presenceData.smallImageKey = "reading";
        }
        else if (document.querySelector(".bigTitle") !== null) {
            let type = document.querySelector(".bigTitle").textContent.toLowerCase();
            if (type == "faq's")
                type = "FAQ's";
            presenceData.details = "Viewing the";
            presenceData.state = type;
            presenceData.smallImageKey = "reading";
        }
        if (request) {
            presenceData.details = "Sending in a request...";
            presenceData.smallImageKey = "writing";
        }
        else if (feedback) {
            presenceData.details = "Sending in feedback...";
            presenceData.smallImageKey = "writing";
        }
        else if (djapply) {
            presenceData.details = "Applying for:";
            presenceData.state = "Radio Presenter";
            presenceData.smallImageKey = "writing";
        }
        else if (newsreporterapply) {
            presenceData.details = "Applying for:";
            presenceData.state = "News Reporter";
            presenceData.smallImageKey = "writing";
        }
        else if (editingbio) {
            presenceData.details = "Editing their bio";
            presenceData.smallImageKey = "writing";
        }
        else if (enquiry) {
            presenceData.details = "Sending in a";
            presenceData.state = "general enquiry";
            presenceData.smallImageKey = "writing";
        }
        else if (partner) {
            presenceData.details = "Sending in a";
            presenceData.state = "partner enquiry";
            presenceData.smallImageKey = "writing";
        }
    }
    else {
        if (document.querySelector(".stats-djName").textContent == "UpBeat") {
            djType = "AutoDJ - ";
        }
        else {
            djType = "DJ: ";
        }
        if (dj) {
            presenceData.details = format
                .replace("%song%", document.querySelector(".stats-song").textContent)
                .replace("%artist%", document.querySelector(".stats-artist").textContent);
            presenceData.state =
                djType + document.querySelector(".stats-djName").textContent;
        }
        else {
            presenceData.details = format1
                .replace("%song%", document.querySelector(".stats-song").textContent)
                .replace("%artist%", document.querySelector(".stats-artist").textContent);
            presenceData.state = format2
                .replace("%song%", document.querySelector(".stats-song").textContent)
                .replace("%artist%", document.querySelector(".stats-artist").textContent);
        }
        presenceData.smallImageKey = "play";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRXBELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsUUFBUTtLQUN4QixDQUFDO0lBRUYsTUFBTSxNQUFNLEdBQUcsUUFBUTtTQUNwQixhQUFhLENBQUMseUJBQXlCLENBQUM7U0FDeEMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNqQyxNQUFNLGlCQUFpQixHQUNyQixRQUFRLENBQUMsYUFBYSxDQUFDLHNCQUFzQixDQUFDLEtBQUssSUFBSSxDQUFDO0lBQzFELE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsNEJBQTRCLENBQUMsS0FBSyxJQUFJLENBQUM7SUFDOUUsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLElBQUksQ0FBQztJQUMxRSxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDLEtBQUssSUFBSSxDQUFDO0lBQ3pFLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsS0FBSyxJQUFJLENBQUM7SUFDckUsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLElBQUksQ0FBQztJQUNwRSxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFB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