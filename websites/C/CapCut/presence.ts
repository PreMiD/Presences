const presence = new Presence({
    clientId: "1060591187024695477",
}),
browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
const presenceData: PresenceData = {
    largeImageKey: "capcut",
    startTimestamp: browsingTimestamp,
};

if (document.location.pathname === "/")
    presenceData.details = "In the Homepage";

else if (document.location.pathname.startsWith("/resource/")) {
        presenceData.details = "Viewing resource";
            
} else if (document.location.pathname.startsWith("/tools/")) {
    presenceData.details = "Viewing tools";

} else if (document.location.pathname.startsWith("/login")) {
    presenceData.details = "Logging in";

} else if (document.location.pathname.startsWith("/signup")){
    presenceData.details = "Signing up";

} else if (document.location.pathname.startsWith("/my-cloud")){
    presenceData.details = "Browsing cloud space";

} else if (document.location.pathname.startsWith("/my-edit")){
    presenceData.details = "Browsing the projects";

}  else if (document.location.pathname.startsWith("/editor/")) {
    presenceData.details = "Editing project :"
    const name = document.querySelector(".arco-layout-header.top-nav .draft-input").defaultValue;
    presenceData.state = `${name}`
}
else presenceData.details = "Browsing...";

if (presenceData.details) presence.setActivity(presenceData);
else presence.setActivity();
});