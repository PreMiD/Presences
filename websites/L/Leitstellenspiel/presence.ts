const presence = new Presence({
  clientId: "888061073150865469"
}),
let presenceData: PresenceData = {
  largeImageKey: "logo",
  startTimestamp: Date.now()
};

presence.on("UpdateData", async () => {
if (
  document.location.pathname === "/" ||
  document.location.pathname === ""
) 
  presenceData.details = "Manages Emergencies";
 else if (document.location.pathname.startsWith("/einsaetze")) 
  presenceData.details = "Viewing all possible scenarios";
 else if (document.location.pathname.startsWith("/toplist")) 
  presenceData.details = "Viewing the Toplist";
 else {
  presenceData = {
    largeImageKey: "logo",
    details: "Homepage"
  };
}
presence.setActivity(presenceData);
});
