const presence = new Presence({
    clientId: "1011560036058800198",
});
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "logo",
    };
    if (window.location.pathname.toLowerCase() === "/") {
        presenceData.details = "CortexDuo'da takılıyor...";
        presenceData.state = "cortexduo.com";
    }
    if (presenceData.details)
        presence.setActivity(presenceData);
    else
        presence.setActivity();
});
