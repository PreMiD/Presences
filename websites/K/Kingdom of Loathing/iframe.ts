const KEEP_ALIVE = 10000,
  koliFrame = new iFrame();

let currentMonster: string | null = null;
function updateCombat(i: iFrame) {
  const name = document.getElementById("monname");

  if (name) {
    const monster = name.innerText;
    if (monster !== currentMonster) {
      currentMonster = monster;
      return i.send({ type: "MONSTER", payload: monster });
    }
  }
}

let currentChoiceId = -1;
function updateChoice(i: iFrame) {
  const choice = document.querySelector<HTMLInputElement>(
    "input[name=whichchoice]"
  );

  if (choice) {
    const choiceId = Number(choice.value);
    if (choiceId !== currentChoiceId) {
      currentChoiceId = choiceId;
      return i.send({ type: "CHOICE", payload: choiceId });
    }
  }
}

let lastPing = 0,
  currentAdventures = -1;
function updateCharpane(i: iFrame) {
  const nonCompactContainer = document.querySelector<HTMLElement>(
      'img[alt="Adventures Remaining"] ~ span'
    ),
    compactContainer = document.getElementById("lastadvmenu"),
    chitContainer = document.querySelector<HTMLElement>(
      'img[src$="slimhourglass.gif"]'
    );

  let adventures = -1;

  if (nonCompactContainer) {
    adventures = Number(nonCompactContainer.innerText);
  } else if (compactContainer) {
    adventures = Number(
      (compactContainer.parentElement.parentElement.nextSibling as HTMLElement)
        .innerText
    );
  } else if (chitContainer) {
    adventures = Number(
      (chitContainer.previousSibling as HTMLElement).innerText
    );
  }

  if (adventures !== -1) {
    if (
      adventures !== currentAdventures ||
      Date.now() - lastPing > KEEP_ALIVE
    ) {
      currentAdventures = adventures;
      lastPing = Date.now();
      return i.send({ type: "ADVENTURES", payload: adventures });
    }
  }
}

koliFrame.on("UpdateData", async () => {
  switch (window.name) {
    case "mainpane":
      switch (location.pathname) {
        case "/fight.php":
          return updateCombat(koliFrame);
        case "/mall.php":
        case "/mallstore.php":
          return koliFrame.send({ type: "MALL" });
        case "/messages.php":
          return koliFrame.send({ type: "KMAIL" });
        case "/choice.php":
          return updateChoice(koliFrame);
        case "/inventory.php":
          return koliFrame.send({ type: "INVENTORY" });
        case "/skillz.php":
          return koliFrame.send({ type: "SKILLS" });
        case "/familiar.php":
          return koliFrame.send({ type: "FAMILIAR" });
        case "/sendmessage.php":
          return koliFrame.send({ type: "SENDMESSAGE" });
        default:
          return koliFrame.send({ type: "UNHANDLED" });
      }
    case "charpane":
      return updateCharpane(koliFrame);
    default:
      return;
  }
});
