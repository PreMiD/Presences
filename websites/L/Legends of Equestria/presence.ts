const presence = new Presence({
  clientId: "651406405093425152"
});
let presenceData: PresenceData = {
  largeImageKey: "logo"
};

presence.on("UpdateData", async () => {
  if (
    document.location.pathname === "/" ||
    document.location.pathname === "/home"
  )
    presenceData.details = "Viewing the homepage";
  else if (document.location.pathname.startsWith("/team"))
    presenceData.details = "Looking at the team";
  else if (document.location.pathname.startsWith("/faq"))
    presenceData.details = "Reading the FAQ";
  else if (document.location.pathname.startsWith("/rules"))
    presenceData.details = "Reading their rules";
  else if (document.location.pathname.startsWith("/contact"))
    presenceData.details = "Reading the contact informations";
  else if (document.location.pathname.startsWith("/downloads"))
    presenceData.details = "Looking at the download page";
  else {
    presenceData = {
      largeImageKey: "logo"
    };
  }
  presence.setActivity(presenceData);
});
