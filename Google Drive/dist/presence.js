var presence = new Presence({
    clientId: "630494559956107285",
    mediaKeys: false
});
let oo;
let songt;
let songa;

presence.on("UpdateData", () => {
    let presenceData = {
        largeImageKey: "drivelogo"
    };
    if(window.location.pathname.toLowerCase().startsWith("/drive/my-drive")) {
        presenceData.state = "Browsing..."
    }

    if(window.location.pathname.toLowerCase().startsWith("/drive/folders")) {
        presenceData.details = "Inside folder:"
        presenceData.state = document.title.replace("- Google Drive", "")
    }
    if(window.location.pathname.toLowerCase().startsWith("/drive/computer")) {
        presenceData.state = "Viewing linked computers"
    }
    if(window.location.pathname.toLowerCase().startsWith("/drive/shared-with-me")) {
        presenceData.state = "Viewing shared files"
    }
    if(window.location.pathname.toLowerCase().startsWith("/drive/recent")) {
        presenceData.state = "Looking through recently updated files"
    }
    if(window.location.pathname.toLowerCase().startsWith("/drive/starred")) {
        presenceData.state = "Looking through starred files"
    }
    if(window.location.pathname.toLowerCase().startsWith("/drive/trash")) {
        presenceData.state = "Viewing previously deleted files"
    }
    if(window.location.pathname.toLowerCase().startsWith("/drive/backups")) {
        presenceData.state = "Going through backups"
    }
    if(window.location.pathname.toLowerCase().startsWith("/drive/quota")) {
        presenceData.state = "Viewing storage quota"
    }



    presence.setActivity(presenceData)

});
