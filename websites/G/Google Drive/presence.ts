const presence = new Presence({
  clientId: "630494559956107285"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "drivenewlogo",
      details: "Viewing page:"
    },
    path = document.location.pathname
      .toLowerCase()
      .replace(/(\/u\/([0-9])+)/g, "");

  if (path.startsWith("/drive/folders")) {
    presenceData.details = "Viewing folder:";
    presenceData.state = document.title.replace("- Google Drive", "");
  } else if (path.startsWith("/drive/computer"))
    presenceData.state = "Linked computers";
  else if (path.startsWith("/drive/shared-with-me"))
    presenceData.state = "Shared files";
  else if (path.startsWith("/drive/recent"))
    presenceData.state = "Recently updated files";
  else if (path.startsWith("/drive/starred"))
    presenceData.state = "Starred files";
  else if (path.startsWith("/drive/trash"))
    presenceData.state = "Deleted files";
  else if (path.startsWith("/drive/backups")) presenceData.state = "Backups";
  else if (path.startsWith("/drive/quota"))
    presenceData.state = "Storage quota";
  else if (path.startsWith("/file/")) {
    const main = document.title.split("."),
      fileName =
        main.length == 2 ? main[0] : main.slice(0, -1).join("").toString(),
      fileExtension = main.slice(-1).toString().replace("- Google Drive", "");

    presenceData.details = `Viewing a file:`;
    presenceData.state = (await presence.getSetting("filename"))
      ? `${fileName}.${fileExtension.toUpperCase()}`
      : `unknown.${fileExtension.toUpperCase()} (File name hidden)`;
  } else presenceData.details = "Browsing...";

  presence.setActivity(presenceData);
});
