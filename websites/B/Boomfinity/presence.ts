const boomfinity = new Presence({
    clientId: "538815234559705090"
}),
bStrings = boomfinity.getStrings({
    edit: "presence.editing"
})


boomfinity.on("UpdateData", async() => {
    const boomfinityPresenceData : PresenceData  = {
        largeImageKey: "boomfinity",
        smallImageKey: "hammer-and-wrench",
        smallImageText: "https://boomfinity.xyz",
        details: "BOOMFINITY.XYZ",
        state: "Edytuje ustawienia serwera"
    }

    if(boomfinityPresenceData.details == null){
        boomfinity.setTrayTitle();
        boomfinity.setActivity()
    }else{
        boomfinity.setActivity(boomfinityPresenceData)
    }
})