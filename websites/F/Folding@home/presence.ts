var presence = new Presence({
  clientId: "704385469856612523"
});


presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };
  setTimeout(() => {
  if (document.location.hostname == "client.foldingathome.org") {
      


    presenceData.details = document.querySelector("#box-points-team > a").textContent;
    presenceData.state = document.querySelector("#slot-0 > div.pu > div.pu-bar.ui-progressbar.ui-widget.ui-widget-content.ui-corner-all > div").textContent;
  }
}, 20000);
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
