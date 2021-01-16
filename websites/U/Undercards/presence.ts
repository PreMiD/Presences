const undercards = new Presence({
    clientId: "799885664538853417"
}), browsingStamp = Math.floor(Date.now() / 1000);
let URLMap: {[index: string]:any} = {};
URLMap["SignUp"] = ['"Registering an account"', '""'];
URLMap["AccountValidation"] = ['"Activating account"', '""'];
URLMap["SignIn"] = ['"Signing in"', '""'];
URLMap["Tutorial"] = ['"Playing tutorial"', '""'];
URLMap["gameUpdates.jsp"] = ['"Reading the patch note"', '""'];
URLMap["Disconnect"] = ['"Disconnected"', '""'];
URLMap["Profile"] = ['"Viewing profile"', 'getText(".mainContent > h2:nth-child(2)") + "(" + getText(".mainContent > p:nth-child(3) > span:nth-child(1)") + ")"'];
URLMap["History"] = ['"Viewing history"', '""'];
URLMap["Avatars"] = ['"Customizing avatar"', '""'];
URLMap["CardSkins"] = ['"Customizing card skins"', '""'];
URLMap["ProfileSkins"] = ['"Customizing profile skin"', '""'];
URLMap["FrameSkins"] = ['"Customizing frame skin"', '""'];
URLMap["Settings"] = ['"Viewing settings"', '""'];
URLMap["Staff"] = ['"Viewing staff"', '""'];
URLMap["Quests"] = ['"Viewing quests"', '""'];
URLMap["Bundle"] = ['"Viewing bundle"', '""'];
URLMap["CardSkinsShop"] = ['"Browsing card skins shop"', '""'];
URLMap["CosmeticsShop"] = ['"Browsing cosmetics shop"', '""'];
URLMap["Artifacts"] = ['"Browsing artifacts shop"', '""'];
URLMap["Packs"] = ['"Browsing packs shop"', '""'];
URLMap["Shop"] = ['"Browsing UCP shop"', '""'];
URLMap["Decks"] = ['"Building decks"', '""'];
URLMap["Crafting"] = ['"Crafting cards"', '""'];
URLMap["Hub"] = ['"Viewing hub"', '""'];
URLMap["Friendship"] = ['"Viewing friendship"', '""'];
URLMap["GamesList"] = ['"Viewing games list"', '""'];
URLMap["Play"] = ['"Finding a game..."'];
URLMap["Game"] = ['"Playing a game"', '"vs "+ getText("#enemyUsername")'];
URLMap["Spectate"] = ['"Spectating a game"', '(getText("#yourUsername") || "Loading...") + " vs " + (getText("#enemyUsername") || "Loading...")'];

function getText(selector:string){
    return document.querySelector(selector).textContent;
}

undercards.on("UpdateData", async () => {
    const presenceData: PresenceData = {
      largeImageKey: "logo"
    };
    if (document.location.pathname=="/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing homepage";
    } else {
      const path = document.location.pathname.match(/^\/([a-zA-Z\.]+)/)[1];
      if (URLMap.hasOwnProperty(path)) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = eval(URLMap[path][0]);
        presenceData.state = eval(URLMap[path][1]);
      } else if (path.endsWith('.jsp')) {
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