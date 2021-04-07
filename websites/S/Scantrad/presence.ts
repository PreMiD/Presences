const presence = new Presence({
    clientId: "817856303719907389"
}),
    browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
    const presenceData: PresenceData = { 
        largeImageKey: "logo",
        startTimestamp: browsingStamp
    };
    if (document.location.pathname.includes("/")) {
        presenceData.details = "Viewing Page:";
        presenceData.state = "Home page";
        presenceData.startTimestamp = browsingStamp;
        };
    if (document.location.pathname.includes("/mangas")) {

        let chapter = document.getElementById("selectCh") as HTMLSelectElement,
            page = document.getElementById("selectPg") as HTMLSelectElement;

        presenceData.details = "Reading " + 
            document.querySelector(".tl-titre").textContent + ":";
        presenceData.state = chapter.options[chapter.selectedIndex].text.replace('Chapitre', 'Chapter') + " | " + page.options[page.selectedIndex].text;
        presenceData.smallImageKey = "reading";
        presenceData.smallImageText = "Reading a scan";
        presenceData.startTimestamp = browsingStamp;
        };
    if (document.location.pathname.includes("/connexion") || document.location.pathname.includes("/inscription")) {
        presenceData.details = "Viewing Page:";
        presenceData.state = "Login page";
        presenceData.startTimestamp = browsingStamp;
        };
    if (document.location.pathname.includes("/planning")) {
        presenceData.details = "Viewing Page:";
        presenceData.state = "Planning page";
        presenceData.startTimestamp = browsingStamp;
        };
    if (document.location.pathname.includes("/rejoindre")) {
        presenceData.details = "Viewing Page:";
        presenceData.state = "Jobs page";
        presenceData.startTimestamp = browsingStamp;
        };
    if (document.location.pathname.includes("/dons")) {
        presenceData.details = "Viewing Page:";
        presenceData.state = "Donation page";
        presenceData.startTimestamp = browsingStamp;
        };

    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else {
        presence.setActivity(presenceData);
  };
});