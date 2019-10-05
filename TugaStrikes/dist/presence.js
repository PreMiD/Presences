var presence = new Presence({
    clientId: "630098355145539595",
    mediaKeys: false
});
var browsingStamp = Math.floor(Date.now()/1000);

presence.on("UpdateData", () => {
  
    var presenceData = {
        largeImageKey: "lg"
    }
     

    let domain = "https://tugastrikes.com/";
    let url = window.location.href.replace(domain, "");
    let parts = url.split("/");
    let section = parts[1];
    let page = parts[0];
    if (section == "skins") {
        state = "Skins";
    } else if (section == "myskins") {
        state = "My Skins";
    } else if (section == "buyskins") {
        state = "Buy Skins";
    } else if (section == "sellskins") {
        state = "Sell Skins";
    } else {
        state = "Home Page";
    }
    if (page == "market") {
        presenceData.details = "Market";
    }

    presenceData.state = state;


    presenceData.startTimestamp = browsingStamp;
    delete presenceData.smallImageKey;

    presence.setActivity(presenceData, true);
  
  });
  