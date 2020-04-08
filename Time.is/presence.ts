var presence = new Presence({
  clientId: "642714892201230336"
});

presence.on("UpdateData", async () => {
  const presenceData: presenceData = {
    largeImageKey: "time"
  };

  var clock =
    document.querySelector("#clock0_bg") ||
    document.querySelector("#time_section > div:nth-child(2) > div");

  if (document.location.hostname == "time.is") {
    if (document.location.pathname == "/") {
      presenceData.details = "My time is:";
      presenceData.state = clock.textContent;
    } else if (clock !== null) {
      presenceData.details = document.querySelector("#msgdiv > h1").textContent;
      presenceData.state = clock.textContent;
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
