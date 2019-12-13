const presence = new Presence({
    clientId: "653220659887079434"
});

presence.on("UpdateData", () => async () => {
    /* THIS IS EASY AND EFFICIENT! */

    const details = document.querySelector("[property~=premid-details][content]") as HTMLMetaElement ? (document.querySelector("[property~=premid-details][content]") as HTMLMetaElement).content : null,
        state = document.querySelector("[property~=premid-state][content]") ? (document.querySelector("[property~=premid-state][content]") as HTMLMetaElement).content : null,
        smallImage = document.querySelector("[property~=premid-smallImage][content]") ? (document.querySelector("[property~=premid-smallImage][content]") as HTMLMetaElement).content : null;

    if (state && details) presence.setActivity({
        largeImageKey: "ec-logo",
        details: details,
        state: state,
        smallImageKey: smallImage ? smallImage : "SOMETHING-SKETCHY",
        startTimestamp: Math.floor(Date.now() / 1000)
    })
    else presence.setActivity({
        largeImageKey: "ec-logo",
        details: "Viewing a page:",
        state: "Homepage",
        startTimestamp: Math.floor(Date.now() / 1000)
    });
});