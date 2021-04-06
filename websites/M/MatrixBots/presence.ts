const matrixPresence = new Presence({
    clientId: "748098665033498735"
  }),
  matrixBrowsing = Math.floor(Date.now() / 1000);

matrixPresence.on("UpdateData", async () => {
  const matrixPData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: matrixBrowsing
    },
    matrixPage = window.location.pathname;

  if (matrixPage == "/") {
    matrixPData.details = "Browsing";
    matrixPData.smallImageKey = "browsing";
    matrixPData.smallImageText = "Browsing Bots";
  } else if (matrixPage.includes("/bots")) {
    const bot: string = document.evaluate(
      "/html/body/div[4]/h2/text()",
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue.textContent;
    matrixPData.buttons = [
      {
        label: "View Bot",
        url: document.URL
      }
    ];
    matrixPData.details = "Watching Bot:";
    matrixPData.state = bot;
    matrixPData.smallImageText = "Browsing Bot";
    matrixPData.smallImageKey = "browsing";
  } else if (matrixPage == "/me") {
    const username: string = document.getElementsByTagName("h1")[0].innerHTML;
    matrixPData.details = "Watching Profile:";
    matrixPData.state = username;
  } else if (matrixPage == "/add") {
    matrixPData.details = "Adding Bot";
    matrixPData.smallImageKey = "writing";
    matrixPData.smallImageText = "Writing Text";
  } else if (matrixPage == "/staff") {
    matrixPData.details = "Viewing:";
    matrixPData.state = "Staff Page";
  } else if (matrixPage == "/admin") {
    matrixPData.details = "Viewing:";
    matrixPData.state = "Admin Page";
  } else if (matrixPage.includes("/api")) {
    matrixPData.details = "Viewing:";
    matrixPData.state = "API";
  }

  if (matrixPData.details == null) {
    matrixPresence.setTrayTitle();
    matrixPresence.setActivity();
  } else {
    matrixPresence.setActivity(matrixPData);
  }
});
