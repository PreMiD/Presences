var presence = new Presence({
  clientId: "518193753433833499"
});

presence.on("UpdateData", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const typeParam = urlParams.get("type");
  const charParam = urlParams.get("char");
  if (typeParam == "original") {
    if (charParam.toLowerCase() == "taiga") {
      const presenceData: presenceData = {
        details: "Looking at screenshots",
        state: "Taiga Aisaka",
        largeImageKey: "lg-tapi"
      };
      presence.setActivity(presenceData);
    } else {
      const presenceData: presenceData = {
        details: "Looking at screenshots",
        largeImageKey: "lg-tapi"
      };
      presence.setActivity(presenceData);
    }
  } else if (typeParam == "fanart") {
    if (charParam.toLowerCase() == "taiga") {
      const presenceData: presenceData = {
        details: "Looking at fanart",
        state: "Taiga Aisaka",
        largeImageKey: "lg-tapi"
      };
      presence.setActivity(presenceData);
    } else {
      const presenceData: presenceData = {
        details: "Looking at fanart",
        largeImageKey: "lg-tapi"
      };
      presence.setActivity(presenceData);
    }
  } else {
    const presenceData: presenceData = {
      largeImageKey: "lg-tapi"
    };
    presence.setActivity(presenceData);
  }
});
