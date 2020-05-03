var presence = new Presence({
  clientId: "651145049811451924"
});
presence.on("UpdateData", async () => {
  if (document.location.pathname.startsWith("/wiki/")) {
    let page = document.getElementsByClassName("page-header__title")[0];
    if (page == null) {
      page = "Unknown Page";
    } else {
      page = page.textContent;
    }
    let presenceData = {
      details: "Viewing a page...",
      state: page,
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  }
});
