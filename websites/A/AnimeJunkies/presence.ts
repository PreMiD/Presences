const presence = new Presence({ clientId: "842745567930089482" });

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: Date.now()
  };
  if (window.location.pathname == "/") {
    presenceData.details = "Erkundet Startseite";
  } else if (window.location.pathname.startsWith("/community/")) {
    const path_name = window.location.pathname;
    if (path_name == "/community/") {
      presenceData.details = "Erkundet alle Foren";
    } else if (path_name.startsWith("/community/forum/")) {
      const titles = document.getElementsByClassName("main-title-forum");
      if (titles.length != 0) {
        const title = titles[0].textContent;
        presenceData.details = "Erkundet Forum";
        presenceData.state = "» " + title;
      }
    }
  } else if (window.location.pathname.startsWith("/animeliste/")) {
    presenceData.details = "Durchstöbert";
    presenceData.state = "» Anime Liste";
  } else {
    const x = document.getElementsByClassName("entry-title");

    if (
      x.length != 0 &&
      document.getElementsByClassName("author-box-header").length != 0
    ) {
      const b = x[0];
      presenceData.details = "Schaut einen Beitrag an";
      presenceData.state = b.textContent;
    } else {
      presenceData.details = "Erkundet AnimeJunkies";
      delete presenceData.state;
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle(); 
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
