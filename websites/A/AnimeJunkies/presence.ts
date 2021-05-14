const presence = new Presence({ clientId: "842745567930089482" });

let last_path = "",
  time_stamp: number = Date.now();

presence.on("UpdateData", async () => {
  const presence_data = {
    details: "",
    state: "",
    smallImageKey: "",
    smallImageText: ""
  };
  if (last_path != window.location.pathname) {
    last_path = window.location.pathname;
    time_stamp = Date.now();
  }
  if (window.location.pathname == "/") {
    presence_data.details = "Erkundet Startseite";
  } else if (window.location.pathname.startsWith("/community/")) {
    const path_name = window.location.pathname;
    if (path_name == "/community/") {
      presence_data.details = "Erkundet alle Foren";
    } else if (path_name.startsWith("/community/forum/")) {
      const titles = document.getElementsByClassName("main-title-forum");
      if (titles.length != 0) {
        const title = titles[0].textContent;
        presence_data.details = "Erkundet Forum";
        presence_data.state = "» " + title;
      }
    }
  } else if (window.location.pathname.startsWith("/animeliste/")) {
    presence_data.details = "Durchstöbert";
    presence_data.state = "» Anime Liste";
  } else {
    const x = document.getElementsByClassName("entry-title");

    if (
      x.length != 0 &&
      document.getElementsByClassName("author-box-header").length != 0
    ) {
      const b = x[0];
      presence_data.details = "Schaut einen Beitrag an";
      presence_data.state = b.textContent;
    } else {
      presence_data.details = "Erkundet AnimeJunkies";
      presence_data.state = "";
    }
  }

  const presenceData: PresenceData = {
    largeImageKey: "logo",
    smallImageKey: presence_data.smallImageKey,
    smallImageText: presence_data.smallImageText,
    details: presence_data.details,
    state: presence_data.state,
    startTimestamp: time_stamp
  };

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
