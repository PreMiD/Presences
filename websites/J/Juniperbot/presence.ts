var presence = new Presence({
  clientId: "739908991274057870"
});

var browsingStamp = Math.floor(Date.now() / 1000);
var title: any;
var search: any;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };
  const juniper: boolean = await presence.getSetting("juniper");
  const docs: boolean = await presence.getSetting("docs");
  const fback: boolean = await presence.getSetting("fback");

  if (document.location.hostname == "juniper.bot") {
    if(juniper){
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname.includes("/ranking")) {
      presenceData.details = "Looks at the server's leaderboard:";
      presenceData.state = document.querySelector(".guild--info h1.font-weight-thin.display-2").innerHTML;
      presenceData.smallImageKey = "list";
    } else if (document.location.pathname.includes("/dashboard/")) {
      presenceData.details = "In dashboard";
      presenceData.state = `Guild: ${document.querySelector(".guild--info h1.font-weight-thin.display-2").innerHTML}`;
    } else if (document.location.pathname.includes("/donate")) {
      presenceData.details = "Reads information about the donation";
      presenceData.smallImageKey = "donate";
    } else if (document.location.pathname == "/") {
      presenceData.details = "Main page";
    } else if (document.location.pathname == "/servers"){
      presenceData.details = "Selects the server";        
      presenceData.smallImageKey = "list";
    } else if (document.location.pathname == "/commands"){
      presenceData.details = "Looks at the list of commands"; 
      presenceData.smallImageKey = "list";
    } else if (document.location.pathname == "/status"){
      presenceData.details = "Looks at the bot's statistics";
      presenceData.smallImageKey = "stats";
    } else if (document.location.pathname == "/user/card"){
      presenceData.details = "Changes the rank card";
    }
    }
    }
    else if(docs){
    if (document.location.hostname == "docs.juniper.bot") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = document.title;
    presenceData.state = "docs.juniper.bot";
    presenceData.smallImageKey = "list"; 
    }
    }
    else if(fback){
    if (document.location.hostname == "feedback.juniper.bot"){
    presenceData.startTimestamp = browsingStamp;
    presenceData.state = "feedback.juniper.bot";  
    if (document.location.pathname == "/") {
    presenceData.details = "Main page.";
    } else if (document.location.pathname.includes("/posts")) {
      presenceData.details = `Читает: ${document.querySelector(".post-header h1").innerHTML}`;
    }
}}
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
