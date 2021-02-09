const presence = new Presence({
    clientId: "808621217648738325"
});
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "logo",
        smallImageKey: "logo-outline",
        smallImageText: "CoinMarketCap",
        details: "Montering",
        state: "Cryptocurrencies"
    };
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
