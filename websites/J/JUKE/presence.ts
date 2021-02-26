const presence = new Presence({
  clientId: "811305223783448627"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "juke-crown",
    buttons: [{ label: "Radio luisteren", url: document.location.href }]
  };

  if (document.querySelector("span[class*=eC-title]")) {
    presenceData.details = document
      .querySelector("span[class*=eC-title]")
      .innerHTML.replace("De ", "de ")
      .replace("Het ", "het ")
      .replace("&amp;", "&");
    if (document.querySelector("span[class*=eC-subtitle]")) {
      presenceData.state = document
        .querySelector("span[class*=eC-subtitle]")
        .innerHTML.replace("De ", "de ")
        .replace("Het ", "het ")
        .replace("&amp;", "&");
    }
  }

  if (!presenceData.details) {
    presenceData.details = "Bladert op JUKE.nl";
    presenceData.state = `Pagina '${document.title
      .replace(" |", "|")
      .split("|")[0]
      .replace(
        "JUKE - Luister nu jouw favoriete radiozenders, non-stop muziek en podcasts!",
        "Home"
      )}'`;
  }

  if (document.querySelector("rect")) {
    presenceData.smallImageKey = "playing";
    presenceData.smallImageText = "Wordt afgespeeld";
    presenceData.buttons = [
      { label: "Ook radio luisteren", url: document.location.href }
    ];
  } else if (document.querySelector("[class*=spinner]")) {
    presenceData.smallImageKey = "waiting";
    presenceData.smallImageText = "Wordt geladen";
  } else if (document.querySelector("polygon")) {
    presenceData.smallImageKey = "paused";
    presenceData.smallImageText = "Gepauzeerd";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
