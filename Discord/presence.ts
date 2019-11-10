var presence = new Presence({
  clientId: "616940877042155531", // CLIENT ID FOR YOUR PRESENCE
  mediaKeys: false
})

var user : any, group : any, typing : any, teamfinish : any, freeornah : any, freeornah2 : any, card : any, personal : any, personal2 : any, profile : any, connected : any, apptitle : any;
 
var browsingStamp = Math.floor(Date.now()/1000);

presence.on("UpdateData", async () => {

  let presenceData: presenceData = {
    largeImageKey: "discordwhite"
  };

  presenceData.startTimestamp = browsingStamp;

  connected = document.querySelector("#app-mount > div > div > div > div > div > div > div > div > div > div > div > div > div > a > div");
  apptitle = document.querySelector('.appDetails-28RJ80.medium-zmzTW-.size16-1__VVI.height20-13xN5Z.primary-jw0I4K.weightMedium-3xlxJi');

  if(document.location.hostname == "discordapp.com" && connected !== null) {

    if (connected.innerText.includes("@")) {
      presenceData.details = "Voice connected with";
      presenceData.state = connected.innerText;
    } else {
      presenceData.details = "Voice connected to";
      presenceData.state = connected.innerText.replace(" / " + connected.innerText.split(" / ").pop(), "") + " (Server: " + connected.innerText.split(" / ").pop() + ")";
    }
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData);
  } else if(document.location.hostname == "discordapp.com" && document.location.pathname.includes("/channels/@me/")) {
    user = document.querySelector("#app-mount > div > div > div > div > div > div > div > div > div > div > h3");
    group = document.querySelector("#app-mount > div > div > div > div > div > div > div > div > div > div > div > div > div > div");
    typing = document.querySelector("#app-mount > div > div > div > div > div > div > div > div > div > div > form > div > div > div > textarea");

    if (user !== null) {
        if (typing.value !== null && typing.value !== ""){
            presenceData.details = "Typing in DMs to:";
            presenceData.state = user.innerText;
      
            delete presenceData.smallImageKey;
      
            presence.setActivity(presenceData);
        } else {
            presenceData.details = "Reading DMs with:";
            presenceData.state = user.innerText;
      
            presenceData.smallImageKey = "reading";
      
            presence.setActivity(presenceData); 
        }
    } else if (group !== null) {
        if (typing.value !== null && typing.value !== ""){
            presenceData.details = "Typing in group DM: ";
            presenceData.state = group.innerText;
      
            delete presenceData.smallImageKey;
      
            presence.setActivity(presenceData);
        } else {
            presenceData.details = "Reading groups DMs of:";
            presenceData.state = group.innerText;
      
            presenceData.smallImageKey = "reading";
      
            presence.setActivity(presenceData); 
        }
    } else {

        presence.setActivity();
        presence.setTrayTitle(); 
      
    }
  } else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/channels/@me")) {

    presenceData.details = "Browsing through friends";
    delete presenceData.state;
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/store")) {

    presenceData.details = "Browsing through the store";
    delete presenceData.state;
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/channels/")) {
    // group = document.querySelector("#app-mount > div > div > div > div > div > div > div > div > div > div > div > header > span");
    group = document.querySelector("#app-mount > div > div > div > div > div > div > div > div > div > div > header > h1");
    typing = document.querySelector("#app-mount > div > div > div > div > div > div > div > div > div > div > form > div > div > div > textarea");
    card = document.querySelector("#app-mount > div > div > div > div > div > div > div > div > div > div > h3");
    if (typing.value !== null && typing.value !== ""){
      presenceData.details = "Typing in channel: ";
      presenceData.state = "#" + card.innerText + " (Server: " + group.innerText + ")";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else {
      presenceData.details = "Reading messages in channel:";
      presenceData.state = "#" + card.innerText + " (Server: " + group.innerText + ")";

      presenceData.smallImageKey = "reading";

      presence.setActivity(presenceData); 
    } 
  } else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/developers/applications/") && document.location.pathname.includes("/information")) {
    

    presenceData.details = "Developer Portal";
    presenceData.state = "Editing app: " + apptitle.innerText;
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/developers/applications/") && document.location.pathname.includes("/oauth")) {
    

    presenceData.details = "Developer Portal";
    presenceData.state = "Editing app: " + apptitle.innerText;
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/developers/applications/") && document.location.pathname.includes("/bots")) {
    

    presenceData.details = "Developer Portal";
    presenceData.state = "Editing app: " + apptitle.innerText;
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/developers/applications/") && document.location.pathname.includes("/whitelist")) {
    

    presenceData.details = "Developer Portal";
    presenceData.state = "Editing app: " + apptitle.innerText;
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/developers/applications/") && document.location.pathname.includes("/rich-presence")) {
    

    presenceData.details = "Developer Portal";
    presenceData.state = "Editing app: " + apptitle.innerText;
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/developers/applications/") && document.location.pathname.includes("/developer-license")) {
    

    presenceData.details = "Developer Portal";
    presenceData.state = "Editing app: " + apptitle.innerText;
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/developers/applications")) {
    presenceData.details = "Developer Portal";
    presenceData.state = "Browsing through apps";
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/developers/teams")) {
    group = document.querySelector("div.label-1RJQNH.small.weightMedium-3xlxJi");
    if (group !== null) {
      presenceData.details = "Developer Portal";
      presenceData.state = "Editing team: " + group.innerText;
      
      delete presenceData.smallImageKey;
      
      presence.setActivity(presenceData); 
    } else {
      presenceData.details = "Developer Portal";
      presenceData.state = "Browsing through teams";
      
      delete presenceData.smallImageKey;
      
      presence.setActivity(presenceData); 
    }
  } else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/developers/docs/")) {
    presenceData.details = "Developer Portal";
    presenceData.state = "Reading documentation";
      
    presenceData.smallImageKey = "reading";
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/activity")) {

    presenceData.details = "Browsing through activity";
    delete presenceData.state;
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/library")) {

    presenceData.details = "Browsing through their library";
    delete presenceData.state;
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/nitro")) {

    presenceData.details = "Browsing through";
    presenceData.state = "Discord Nitro";
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/jobs")) {

    presenceData.details = "Browsing through";
    presenceData.state = "Discords Jobs page";
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/sell-your-game")) {

    presenceData.details = "Browsing through";
    presenceData.state = "sell-your-game page";
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/rich-presence")) {

    presenceData.details = "Browsing through";
    presenceData.state = "rich-presence page";
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/verification")) {

    presenceData.details = "Browsing through";
    presenceData.state = "verification page";
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/open-source")) {

    presenceData.details = "Browsing through";
    presenceData.state = "open-source page";
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/partners")) {

    presenceData.details = "Browsing through";
    presenceData.state = "partners page";
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/hypesquad")) {

    presenceData.details = "Browsing through";
    presenceData.state = "hypesquad page";
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/guidelines")) {

    presenceData.details = "Browsing through";
    presenceData.state = "Discords guidelines";
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/security")) {

    presenceData.details = "Browsing through";
    presenceData.state = "security page";
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/download")) {

    presenceData.details = "Browsing through";
    presenceData.state = "download page";
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/branding")) {

    presenceData.details = "Browsing through";
    presenceData.state = "branding page";
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/terms")) {

    presenceData.details = "Browsing through";
    presenceData.state = "Terms Of Service page";
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/company")) {

    presenceData.details = "Browsing through";
    presenceData.state = "about page";
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "discordapp.com" && document.location.pathname.includes("/invite")) {

    presenceData.details = "Viewing invite:";
    apptitle = document.URL.split("/")[4]
    if (apptitle.includes("?")) {
      presenceData.state = apptitle.split("?")[0];
    } else {
      presenceData.state = document.URL.split("/")[4];
    }

    presenceData.state = "COMING SOON."; // Change this when presence settings is a thing.
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "status.discordapp.com") {

    presenceData.details = "Discord Status";
    presenceData.state = "Reading Discords status";
      
    presenceData.smallImageKey = "reading";
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "support.discordapp.com" && document.location.pathname.includes("/topics/")) {
    group = document.querySelector("body > main > div.container > header > h1");

    presenceData.details = "Discord Support";
    presenceData.state = "Browsing Topic: " + group.innerText;
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "support.discordapp.com" && document.location.pathname.includes("/topics")) {
    presenceData.details = "Discord Support";
    presenceData.state = "Browsing through topics";
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "support.discordapp.com" && document.location.pathname.includes("/search")) {
    group = document.querySelector("body > main > div.container > header > p");
    user= group.innerText.split(" ", 5)

    presenceData.details = "Discord Support";
    presenceData.state = "Searching for: " + user[3];
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "support.discordapp.com" && document.location.pathname.includes("/articles")) {
    group = document.querySelector("#article-container > article > header > h1");

    presenceData.details = "Discord Support";
    presenceData.state = "Reading article: " + group.innerText;
      
    presenceData.smallImageKey = "reading";
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "blog.discordapp.com" && document.location.pathname.includes("/@")) {
    group = document.location.pathname.split("@", 2);

    presenceData.details = "Discord Blog";
    presenceData.state = "Viewing profile: " + group[1];
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "blog.discordapp.com" && document.location.pathname.includes("/tagged")) {
    group = document.location.pathname.split("/", 8);

    presenceData.details = "Discord Blog";
    presenceData.state = "Browsing tag: " + group[2];
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "blog.discordapp.com" && document.location.pathname.includes("/archive")) {
    group = document.location.pathname.split("/", 8);

    presenceData.details = "Discord Blog";
    presenceData.state = "Browsing the archive";
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "blog.discordapp.com" && document.location.pathname.includes("/")) {
    group = document.querySelector("#root > div > article > div > section > div > div > div > h1");

    if (group !== null) {
        presenceData.details = "Discord Blog";
        presenceData.state = "Reading: " + group.innerText;
          
        presenceData.smallImageKey = "reading";
          
        presence.setActivity(presenceData);  
    } else { 
        presenceData.details = "Discord Blog";
        delete presenceData.state;
      
        delete presenceData.smallImageKey;
        
        presence.setActivity(presenceData);
      
    } 
  } else if (document.location.hostname == "merch.discordapp.com") {

    presenceData.details = "Discord Merch";
    presenceData.state = "Looking at merch";
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "discordapp.com") {

    presenceData.details = "Home page";
    delete presenceData.state;
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "discord.gg") {

    presenceData.details = "Viewing an invite";
    delete presenceData.state;
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else { 

    presence.setActivity();
    presence.setTrayTitle(); 
  
  }

});