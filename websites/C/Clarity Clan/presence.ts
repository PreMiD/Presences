const presence = new Presence({
  clientId: "732636451933782047"
});

function getPointsString(): string {
  const x = document.getElementsByClassName("elementor-shortcode");
  return x[0].textContent;
}

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "clarity",
    smallImageKey: "mcc",
    smallImageText: "mc-central.net",
    details: getPointsString(),
    state: "clarityclan.team"
  };

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
