const presence = new Presence({
    clientId: "975452100819554385"
}), browsingTimestamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "logo",
        startTimestamp: browsingTimestamp
    };
    if (document.location.pathname === "/")
        presenceData.details = "Viewing home page";
    else if (document.location.pathname === "/shop/")
        presenceData.details = "Viewing shop page";
    else if (document.location.pathname === "/blog/")
        presenceData.details = "Viewing blog page";
    else if (document.location.pathname === "/serversoftware/")
        presenceData.details = "Viewing how to change serversoftware page";
    else if (document.location.pathname === "/deej-mixer/")
        presenceData.details = "Viewing blog page";
    else if (document.location.pathname === "/impressum/")
        presenceData.details = "Viewing impressum";
    else if (document.location.pathname === "/wp-admin/")
        presenceData.details = "Viewing admin Panel";
    else if (document.location.pathname === "/login/")
        presenceData.details = "Viewing login page";
    else if (document.location.pathname === "/programming/")
        presenceData.details = "Viewing programming page";
    else if (document.location.pathname === "/mein-konto/")
        presenceData.details = "Viewing account page";
    else if (document.location.pathname === "/datenschutzerklaerungen/")
        presenceData.details = "Viewing privacy policy";
    else if (document.location.pathname === "/warenkorb/")
        presenceData.details = "Viewing ckeckout page";
    else if (document.location.pathname === "/kasse/")
        presenceData.details = "Viewing ckeckout page";
    else if (document.location.pathname === "/minecraft-servernetwork/")
        presenceData.details = "Viewing minecraft network page";
    else if (document.location.pathname === "/contact/")
        presenceData.details = "Viewing contact page";
    else if (document.location.pathname === "/wp-content/")
        presenceData.details = "Viewing an video/image";
    else if (document.location.pathname === "/about/")
        presenceData.details = "Viewing about page";
    if (presenceData.details)
        presence.setActivity(presenceData);
    else
        presence.setActivity();
});
