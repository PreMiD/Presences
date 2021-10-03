/// @todo maybe support all the languages soon
const presence = new Presence({
  clientId: "638565041154555913"
});

presence.on("UpdateData", async () => {
  if (document.location.pathname.startsWith("/wiki/")) {
    const page =
        document.getElementsByClassName("page-header__title") !== null
          ? document.getElementsByClassName("page-header__title")[0].textContent
          : "N/A",
      presenceData: PresenceData = {
        details: "Viewing a page...",
        state: page,
        largeImageKey: "logo"
      };
    presence.setActivity(presenceData);
  }
});
