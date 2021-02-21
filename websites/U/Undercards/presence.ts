const undercards = new Presence({
    clientId: "799885664538853417"
  }),
  browsingStamp = Math.floor(Date.now() / 1000),
  URLMap: { [index: string]: Array<string> } = {
    SignUp: ['"Registering an account"', '""'],
    AccountValidation: ['"Activating account"', '""'],
    SignIn: ['"Signing in"', '""'],
    Tutorial: ['"Playing tutorial"', '""'],
    "gameUpdates.jsp:": ['"Reading the patch note"', '""'],
    Disconnect: ['"Disconnected"', '""'],
    Profile: [
      '"Viewing profile"',
      'getText(".mainContent > h2:nth-child(2)") + "(" + getText(".mainContent > p:nth-child(3) > span:nth-child(1)") + ")"'
    ],
    History: ['"Viewing history"', '""'],
    Avatars: ['"Customizing avatar"', '""'],
    CardSkins: ['"Customizing card skins"', '""'],
    ProfileSkins: ['"Customizing profile skin"', '""'],
    FrameSkins: ['"Customizing frame skin"', '""'],
    Settings: ['"Viewing settings"', '""'],
    Staff: ['"Viewing staff"', '""'],
    Quests: ['"Viewing quests"', '""'],
    Bundle: ['"Viewing bundle"', '""'],
    CardSkinsShop: ['"Browsing card skins shop"', '""'],
    CosmeticsShop: ['"Browsing cosmetics shop"', '""'],
    Artifacts: ['"Browsing artifacts shop"', '""'],
    Packs: ['"Browsing packs shop"', '""'],
    Shop: ['"Browsing UCP shop"', '""'],
    Decks: ['"Building decks"', '""'],
    Crafting: ['"Crafting cards"', '""'],
    Hub: ['"Viewing hub"', '""'],
    Friendship: ['"Viewing friendship"', '""'],
    GamesList: ['"Viewing games list"', '""'],
    Play: ['"Finding a game..."'],
    Game: ['"Playing a game"', '"vs "+ getText("#enemyUsername")'],
    Spectate: [
      '"Spectating a game"',
      '(getText("#yourUsername") || "Loading...") + " vs " + (getText("#enemyUsername") || "Loading...")'
    ]
  };
function getText(selector: string) {
  return document.querySelector(selector).textContent;
}

undercards.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };
  if (document.location.pathname == "/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing homepage";
  } else {
    const re = new RegExp("^/([a-zA-Z.]+)"),
      path = document.location.pathname.match(re)[1];
    if (Object.prototype.hasOwnProperty.call(URLMap, path)) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = eval(URLMap[path][0]);
      presenceData.state = eval(URLMap[path][1]);
    } else if (path.endsWith(".jsp")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing page";
      presenceData.state = getText(".mainContent > h2:nth-child(2)");
    } else {
      presenceData.details = "Browsing...";
    }
  }
  if (presenceData.details == null) {
    undercards.setTrayTitle();
    undercards.setActivity();
  } else {
    undercards.setActivity(presenceData);
  }
});
