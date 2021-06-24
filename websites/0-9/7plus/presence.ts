const presence = new Presence({
  clientId: "843060416208306196"
});

let showName: HTMLElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (document.location.pathname == "/home/") {
    presenceData.details = "Viewing 7plus Home";
  } else if (document.location.pathname == "/home") {
    presenceData.details = "Viewing 7plus Home";
  } else if (document.location.pathname == "/") {
    presenceData.details = "Viewing 7plus Home";
  } else if (document.location.pathname == "/shows-a-z") {
    presenceData.details = "Viewing 7plus Shows";
  } else if (document.location.pathname == "/sport") {
    presenceData.details = "Viewing 7plus Sports";
  } else if (document.location.pathname == "/search") {
    presenceData.details = "Searching 7plus";
  } else if (document.location.pathname == "/live-tv") {
    showName = document.querySelector(
      "h2.h3§3Lep4.fw700§1YAxq.truncate2§d57BK.truncateMobile§1Yywu"
    );
    presenceData.details = "Tuned Into 7plus Live!";
    presenceData.state = "Watching: " + showName.innerText;
  } else if (document.location.pathname == "/watch-live-tv") {
    showName = document.querySelector(
      "h2.h3§3Lep4.fw700§1YAxq.truncate2§d57BK.truncateMobile§1Yywu"
    );
    presenceData.details = "Tuned Into 7plus Live!";
    presenceData.state = "Watching: " + showName.innerText;
  } else if (document.location.pathname == "/query") {
    presenceData.details = "Searching 7plus!";
  } else {
    presenceData.details = `Viewing "${document.title.split(" | 7plus")[0]}"`;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
