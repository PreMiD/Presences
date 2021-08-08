const presence = new Presence({
  clientId: "547436289960574977"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (document.location.pathname === "/")
    presenceData.details = "Viewing the homepage";
  else if (document.location.pathname.startsWith("/stories")) {
    const [, , pathName] = document.location.pathname.split("/");
    presenceData.details = "Viewing a story";
    presenceData.state = pathName;
  } else if (document.location.pathname.startsWith("/accounts")) {
    presenceData.details = "Settings";
    presenceData.state = "Changing their Settings";
  } else if (document.location.pathname.startsWith("/p"))
    presenceData.details = "Viewing a post";
  else if (document.location.pathname.startsWith("/explore"))
    presenceData.details = "Exploring...";
  else if (document.location.pathname.startsWith("/nametag"))
    presenceData.details = "Viewing nametag";
  else if (
    document.location.pathname.startsWith("/direct/inbox") ||
    document.location.pathname.startsWith("/direct/t")
  )
    presenceData.details = "Direct Messages";
  else {
    // TODO: Check if the page is really a profile
    const [, pathName] = document.location.pathname.split("/");
    presenceData.details = "Viewing a profile";
    presenceData.state = pathName;
  }
  presence.setActivity(presenceData);
});
