const presence = new Presence({
    clientId: "808621217648738325"
});
function getLastPath(path) {
    const vals = path.split("/");
    return vals[vals.length - 2];
}
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "logo",
        smallImageKey: "logo-outline",
        smallImageText: "CoinMarketCap",
        details: "Monitoring",
        state: "Crytocurrencies"
    };
    if (window.location.pathname.includes("/currencies")) {
        presenceData.details = "Monitoring";
        presenceData.state = getLastPath(window.location.pathname).toUpperCase();
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
