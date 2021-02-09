const presence = new Presence({
    clientId: "808621217648738325"
  });
  
  presence.on("UpdateData", () => {
    const presenceData: PresenceData = {
      largeImageKey: "logo",
      smallImageKey: "logo-outline",
      smallImageText: "CoinMarketCap",
      details: "Montering",
      state: "Cryptocurrencies"
    }; /*Optionally you can set a largeImageKey here and change the rest as variable subproperties, for example presenceSata.type = "blahblah"; type examples: details, state, etc.*/

    if (presenceData.details == null) {
      //This will fire if you do not set presence details
      presence.setTrayTitle(); //Clears the tray title for mac users
      presence.setActivity(); /*Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name*/
    } else {
      //This will fire if you set presence details
      presence.setActivity(presenceData); //Update the presence with all the values from the presenceData object
    }

});