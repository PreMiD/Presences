const presence = new Presence({
  clientId: "729279760596729858"
});

let formula: HTMLInputElement, formulaName: HTMLElement;
const startStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  formula = document.getElementById("formula") as HTMLInputElement;

  formulaName =
    document.querySelector("span#elements-body > details > summary") ??
    document.querySelector("span#elements-body");

  presenceData.details = formula.value;
  presenceData.state = formulaName.innerText;

  presenceData.startTimestamp = startStamp;

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
