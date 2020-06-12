const presence = new Presence({
    clientId: "640235175007223814"
});

let presenceData = {
    largeImageKey: "logo",
    startTimestamp: new Date().getTime()
};
presence.on("UpdateData", () => {

    let path = document.location.pathname

    if(path === '/') {
        presenceData.details = "Home page";
    } else if(path === '/dashboard') {
        presenceData.details = "Dashboard page";
    } else if(path === '/contact') {
        presenceData.details = "Contact page";
    } else if(path === '/shortener') {
        presenceData.details = "URL Shortener page";
    } else {
        presenceData.details = "Visit our page";
    }

    presence.setActivity(presenceData)
})
