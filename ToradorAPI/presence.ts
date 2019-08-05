var presence = new Presence({
  clientId: "518193753433833499",
  mediaKeys: false
});

presence.on("UpdateData", async () => {
  let urlParams = new URLSearchParams(window.location.search);
  let typeParam = urlParams.get('type');
  let charParam = urlParams.get('char');
  if(typeParam == "original") {
    if(charParam.toLowerCase() == "taiga") {
      let presenceData: presenceData = {
        details: "Looking at screenshots",
        state: "Taiga Aisaka",
        largeImageKey: "lg-tapi"
      };
      presence.setActivity(presenceData);
    } else {
      let presenceData: presenceData = {
        details: "Looking at screenshots",
        largeImageKey: "lg-tapi"
      };
      presence.setActivity(presenceData);
    }
  } else if(typeParam == "fanart") {
    if(charParam.toLowerCase() == "taiga") {
      let presenceData: presenceData = {
        details: "Looking at fanart",
        state: "Taiga Aisaka",
        largeImageKey: "lg-tapi"
      };
      presence.setActivity(presenceData);
    } else {
      let presenceData: presenceData = {
        details: "Looking at fanart",
        largeImageKey: "lg-tapi"
      };
      presence.setActivity(presenceData);
    }
  } else {
    let presenceData: presenceData = {
      largeImageKey: "lg-tapi"
    };
    presence.setActivity(presenceData);
  }
});
