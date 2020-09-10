var presence = new Presence({
    clientId: "751816190653104168"
});

var item: any,
  user: any,
  item2: any,
  item3: any,
  advert: any,
  attendance: any,
  output: any;

var browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
    const presenceData: PresenceData = {
        largeImageKey: "largelogo"
    };

    presenceData.startTimestamp = browsingStamp;

    if (document.location.hostname == "asphalt.events") {
        if (document.location.pathname == "/") {
            presenceData.details = "Browsing";
            presenceData.state ="Upcoming Convoys & Events";
      
            delete presenceData.smallImageKey;
      
            presence.setActivity(presenceData);
        } else if (document.location.pathname.includes("/about")) {
            presenceData.details = "Viewing";
            presenceData.state ="About Us";
      
            delete presenceData.smallImageKey;
      
            presence.setActivity(presenceData);
        } else if (document.location.pathname.includes("/event/create")) {
            presenceData.details = "Creating";
            presenceData.state ="Convoy or Event";
      
            delete presenceData.smallImageKey;
      
            presence.setActivity(presenceData);
        } else if (document.location.pathname.includes("/event/")) {
            item = document.querySelector(
              "body > div > main > div.container > div > div.col-md-8 > div > div > h1 > strong"
            );

            item2 = document.querySelector(
                "body > div > main > div.container > div > div.col-md-8 > div.card > div > h3"
            );

            var type = item2.innerText;
            var firstWord = type.replace(/ .*/,'');

            if(item == "xClose" || item == null){
                item = document.querySelector(
                    "body > div > main > div.container > div > div.col-md-8 > div.card-header > h3"
                  );
            }

            presenceData.details = "Viewing "+firstWord+':';
            presenceData.state = item.innerText;
      
            delete presenceData.smallImageKey;
      
            presence.setActivity(presenceData);
        } else if (document.location.pathname.includes("/event")) {
            presenceData.details = "Viewing";
            presenceData.state ="All Convoys & Events";
      
            presence.setActivity(presenceData);
        } else if (document.location.pathname.includes("/profile")) {
            presenceData.details = "Viewing";
            presenceData.state ="Their Profile";
      
            delete presenceData.smallImageKey;
      
            presence.setActivity(presenceData);
        } else if (document.location.pathname.includes("/user/")) {
            item = document.querySelector(
                "body > div > main > div.container > div > div.row > div.col-md-9 > div > div > div > div > h1"
              );

            presenceData.details = "Viewing ";
            presenceData.state = item.innerText+"'s Profile";
      
            delete presenceData.smallImageKey;
      
            presence.setActivity(presenceData);
        } else if (document.location.pathname.includes("/knowledge-base")) {
            presenceData.details = "Browsing";
            presenceData.state ="The Knowledge Base";

            delete presenceData.smallImageKey;
      
            presence.setActivity(presenceData);
        } else if (document.location.pathname.includes("/languages")) {
            presenceData.details = "Translating the site into";
            delete presenceData.state;

            item = document.querySelector(
                "body > div > form > div > div > div > div:nth-child(2) > select > option:checked"
              );


              if(item != null){
                presenceData.state = item.innerText;
              }
              console.log(item);
      
            delete presenceData.smallImageKey;
      
            presence.setActivity(presenceData);
        } else if (document.location.pathname.includes("/team")) {
            presenceData.details = "Viewing";
            presenceData.state = "The Team Page";
      
            delete presenceData.smallImageKey;
      
            presence.setActivity(presenceData);
        } else if (document.location.pathname.includes("/staff/") || document.location.pathname.includes("/log-viewer")) {
            presenceData.details = "Staff Area";
            delete presenceData.state;
      
            delete presenceData.smallImageKey;
      
            presence.setActivity(presenceData);
        } else {
            presence.setActivity();
            presence.setTrayTitle();
        }
    }
});