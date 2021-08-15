/*
  Currently no further information like time left and pause status, as the iframes get added after the page is loaded, which doesn't work with the iframe.ts at the moment.
*/

var presence = new Presence({
  clientId: "614903529240395782"
});

presence.on("UpdateData", async () => {
  if (document.location.pathname == "/translator") {
    const presenceData: PresenceData = {
      details:
        document.getElementsByClassName("translate_from")[0].parentNode
          .textContent,
      state:
        document.getElementsByClassName("translate_to")[0].parentNode
          .textContent,
      largeImageKey: "lg-deepl"
    };
    presence.setActivity(presenceData);
  } else {
    const presenceData: PresenceData = {
      largeImageKey: "lg-deepl"
    };
    presence.setActivity(presenceData);
  }
});
