const presence = new Presence({
    clientId: "648589472887341058"
});

let presenceData = {
    largeImageKey: "logo",
    startTimestamp: new Date().getTime()
};
presence.on("UpdateData", () => {

    let path = document.location.pathname

    if(path === '/') {
        presenceData.details = "Home Page";
        presence.setActivity(presenceData)
    } else
    
    if(path === '/documentation') {
        presenceData.details = "Documentation Page";
        presence.setActivity(presenceData)
    } else
    
    if(path === '/about') {
        presenceData.details = "About Page";
        presence.setActivity(presenceData)
    }
})
