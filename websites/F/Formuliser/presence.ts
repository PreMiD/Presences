var presence = new Presence({
  clientId: "729279760596729858"
});

let formula: any, formulaName: any;
let startStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (document.location.hostname == "formuliser.oojmed.com") {
    formula = document.getElementById('formula');

    formulaName = document.querySelector('span#elements-body > details > summary');

    presenceData.details = formula.value;
    presenceData.state = formulaName.innerText;

    presenceData.startTimestamp = startStamp;
  } else {
    presenceData.details = "Can't read page";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
