const presence = new Presence({
  clientId: "651145049811451924"
});
presence.on("UpdateData", async () => {
  if (document.location.pathname.startsWith("/wiki/")) {
    const [page] = document.getElementsByClassName("page-header__title");
    let pageText;
    if (page === null) pageText = "Unknown Page";
    else pageText = page.textContent;

    const presenceData: PresenceData = {
      details: "Viewing a page...",
      state: pageText,
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  }
});
