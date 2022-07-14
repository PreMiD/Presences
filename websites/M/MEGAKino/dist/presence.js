const presence = new Presence({
    clientId: "996940670667333742",
}), browsingTimestamp = Math.floor(Date.now() / 1000);
let user, title, search, image;
presence.on("UpdateData", async () => {
    const presenceData = {};
    if (document.location.hostname === "megakino.co") {
        presenceData.startTimestamp = browsingTimestamp;
        presenceData.largeImageKey = "https://i.ibb.co/mCtbnS1/Opera-Momentaufnahme-2022-07-14-021950-megakino-co.png";
        if (document.location.pathname === "/")
            presenceData.details = "Browsing...";
    }
    else if (document.location.pathname.includes("/films/")) {
        user = document.querySelector(".page__subcol-main > h1");
        image = document.querySelector(".pmovie__poster > img");
        presenceData.details = "Schaut Film:";
        presenceData.state = user.textContent;
        presenceData.largeImageKey = "https://megakino.co" + image.getAttribute("src");
    }
    if (presenceData.details)
        presence.setActivity(presenceData);
    else
        presence.setActivity();
});
