const presence = new Presence({
  clientId: "812176837748457483"
});

var browsingStamp = Math.floor(Date.now() / 1000);

var user: any;
var title: any;
var replace: any;
var search: any;
var post: any;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo" 
  }; 

 if (document.location.pathname == "/") {
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = "Viewing home page";
 } 
 else if (document.location.pathname == "/forum.php") {
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = "Viewing the forum's menu";
  presenceData.smallImageKey = "search";
} else if (document.location.pathname == "index.php"){ 
   presenceData.startTimestamp=browsingStamp;
   presenceData.details= "Viewing home page";
 } else if (document.location.pathname.includes("topic.php?topic")) {
  presenceData.startTimestamp = browsingStamp;
  post = document.querySelector(
    "#container > div.page > div.main-wrap > div > section > header > h1"
  );
  presenceData.details= "Viewing forum post:"
  presenceData.state = post.innerText;
 } else if (document.location.pathname.includes("profil.php?")) {    // not spelling mistake, the document location name is profil not profile. 
  presenceData.startTimestamp = browsingStamp;
  user = document.querySelector(
    "#container > div.page > div.main-wrap > div > section > header > h1"
  );
  presenceData.details= "Viewing :"
  presenceData.state = user.innerText;
  presenceData.smallImageKey = "search";
 } else if (document.location.pathname.includes("category.php?")) {
 presenceData.startTimestamp = browsingStamp;
 title = document.querySelector(
   "#container > div.page > div.main-wrap > div > section > header > h1" 
 );
 presenceData.details = "Viewing :"
 presenceData.state =title.innerText;
 presenceData.smallImageKey = "search";
 } else if (document.location.pathname =="/mariokart.php") {
   presenceData.startTimestamp = browsingStamp;
   presenceData.details = "playing the core game"
 } 

 if (presenceData.details == null) {
  presence.setTrayTitle();
  presence.setActivity();
} else {
  presence.setActivity(presenceData);
}
});

