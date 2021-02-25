const KEEP_ALIVE = 10000,
  iframe = new iFrame();

let currentMonster: string | null = null;
function updateCombat(iframe: iFrame) {
  const name = document.getElementById("monname");

  if (name) {
    const monster = name.innerText;
    if (monster !== currentMonster) {
      currentMonster = monster;
      iframe.send({ type: 'MONSTER', payload: monster });
    }
  }
}

let currentChoiceId = -1;
function updateChoice(iframe: iFrame) {
  const choice = document.querySelector<HTMLInputElement>("input[name=whichchoice]");

  if (choice) {
    const choiceId = Number(choice.value);
    if (choiceId !== currentChoiceId) {
      currentChoiceId = choiceId;
      iframe.send({ type: 'CHOICE', payload: choiceId });
    }
  }
}

let lastPing = 0, currentAdventures = -1;
function updateCharpane(iframe: iFrame) {
  const nonCompactContainer = document.querySelector<HTMLElement>("img[alt=\"Adventures Remaining\"] ~ span"),
    compactContainer = document.getElementById("lastadvmenu"),
    chitContainer = document.querySelector<HTMLElement>("img[src$=\"slimhourglass.gif\"]");

  let adventures = -1;

  if (nonCompactContainer) {
    adventures = Number(nonCompactContainer.innerText);
  } else if (compactContainer) {
    adventures = Number((compactContainer.parentElement.parentElement.nextSibling as HTMLElement).innerText);
  } else if (chitContainer) {
    adventures = Number((chitContainer.previousSibling as HTMLElement).innerText);
  }

  if (adventures !== -1)
  {
    if (adventures != currentAdventures || ((Date.now() - lastPing) > KEEP_ALIVE)) {
      currentAdventures = adventures;
      lastPing = Date.now();
      iframe.send({ type: 'ADVENTURES', payload: adventures });
    }
  }
}

iframe.on("UpdateData", async () => {
  switch (window.name) {
    case "mainpane":
      switch (location.pathname) {
        case "/fight.php":
          return updateCombat(iframe);
        case "/mall.php":
        case "/mallstore.php":
          return iframe.send({ type: 'MALL' });
        case "/messages.php":
          return iframe.send({ type: 'KMAIL' });
        case "/choice.php":
          return updateChoice(iframe);
        case "/inventory.php":
          return iframe.send({ type: 'INVENTORY' });
        case "/skillz.php":
          return iframe.send({ type: 'SKILLS' });
        case "/familiar.php":
          return iframe.send({ type: 'FAMILIAR' });
        case "/sendmessage.php":
          return iframe.send({ type: 'SENDMESSAGE' });
        default:
          return iframe.send({ type: 'UNHANDLED' });
      }
    case "charpane":
      return updateCharpane(iframe);
  }
});