const presence = new Presence({
    clientId: "923973759428354108"
});
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "basic",
        smallImageText: "Created by oxmc#7769",
        details: "Uploading a meme"
    };
    if (document.location.href.includes("upload"))
        presenceData.details = "Uploading a meme";
    else
        presenceData.details = "Viewing memefileserver.ml";
    console.log(presenceData.details);
    if (presenceData.details)
        presence.setActivity(presenceData);
    else
        presence.setActivity();
});
