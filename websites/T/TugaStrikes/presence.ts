const presence = new Presence({
  clientId: "630098355145539595"
});

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: presenceData = {
    largeImageKey: "lg"
  };

  const domain = "https://tugastrikes.com/";
  const url = window.location.href.replace(domain, "");
  const parts = url.split("/");
  const section = parts[1];
  const page = parts[0];
  let state;
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
