const presence = new Presence({
  clientId: "630494559956107285"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "drivelogo"
    },
    path = document.location.pathname.toLowerCase();

  if (path.startsWith("/drive/folders")) {
    presenceData.details = "Viewing folder:";
    presenceData.state = document.title.replace("- Google Drive", "");
  } else if (path.startsWith("/drive/computer"))
    presenceData.state = "Viewing linked computers";
  else if (path.startsWith("/drive/shared-with-me"))
    presenceData.state = "Viewing shared files";
  else if (path.startsWith("/drive/recent"))
    presenceData.state = "Looking through recently updated files";
  else if (path.startsWith("/drive/starred"))
    presenceData.state = "Looking through starred files";
  else if (path.startsWith("/drive/trash"))
    presenceData.state = "Viewing previously deleted files";
  else if (path.startsWith("/drive/backups"))
    presenceData.state = "Going through backups";
  else if (path.startsWith("/drive/quota"))
    presenceData.state = "Viewing storage quota";
  else if (path.startsWith("/file/")) {
    const main = document.title.split("."),
      fileName =
        main.length == 2 ? main[0] : main.slice(0, -1).join("").toString(),
      fileExtension = main.slice(-1).toString().replace("- Google Drive", "");

    presenceData.details = `Viewing a file of type ${fileExtension.toUpperCase()} :`;
    presenceData.state = (await presence.getSetting("filename"))
      ? fileName
      : "Filename Hidden";
  } else presenceData.state = "Browsing...";

  presence.setActivity(presenceData);
});
