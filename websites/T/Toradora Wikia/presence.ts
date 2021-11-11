/*
  There is currently a bug, where sometimes the presence flickers (at least for the german wiki, not occured with the english one yet)
  This is probably caused by the two presences. If anyone has an idea how to fix, be happy to do a pull request or tell me on Discord CRUGG#0001
*/

const englishPresence = new Presence({
    clientId: "613417749489778689"
  }),
  germanPresence = new Presence({
    clientId: "613418400042975329"
  });

englishPresence.on("UpdateData", async () => {
  if (document.location.href.includes("tora-dora.fandom.com")) {
    // English Wiki
    if (document.location.pathname.startsWith("/wiki/")) {
      // Making 100% sure it's the english wiki
      let page = "N/A";
      try {
        page =
          document.getElementsByClassName("page-header__title")[0].textContent;
      } catch (err) {
        englishPresence.info(
          `An error occured in the PreMiD Presence, please send this to CRUGG#0001   :::   ${"TWIKI_WIKIEN_GETPAGETITLE"}   :::   ${err}`
        );
      }
      englishPresence.setActivity({
        details: "Viewing a page...",
        state: page,
        largeImageKey: "lg-twiki"
      });
    }
  }
  germanPresence.on("UpdateData", async () => {
    if (document.location.href.includes("toradora.fandom.com")) {
      // German Wiki
      if (document.location.pathname.startsWith("/de/wiki/")) {
        // Making 100% sure it's the german wiki

        try {
          page =
            document.getElementsByClassName("page-header__title")[0]
              .textContent;
        } catch (err) {
          germanPresence.info(
            `An error occured in the PreMiD Presence, please send this to CRUGG#0001   :::   ${"TWIKI_WIKIDE_GETPAGETITLE"}   :::   ${err}`
          );
        }
        germanPresence.setActivity({
          details: "Schaut eine Seite an...",
          state: "N/A",
          largeImageKey: "lg-twiki"
        });
      }
    }
  });
});
