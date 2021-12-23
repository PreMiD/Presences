const presence = new Presence({
    clientId: "748098665033498735"
  }),
  matrixBrowsing = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: matrixBrowsing
    },
    matrixPage = window.location.pathname;

  if (matrixPage === "/") {
    presenceData.details = "Browsing";
    presenceData.smallImageKey = "browsing";
    presenceData.smallImageText = "Browsing Bots";
  } else if (matrixPage.includes("/bots")) {
    presenceData.buttons = [
      {
        label: "View Bot",
        url: document.URL
      }
    ];
    presenceData.details = "Watching Bot:";
    presenceData.state = document.evaluate(
      "/html/body/div[4]/h2/text()",
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue.textContent;
    presenceData.smallImageText = "Browsing Bot";
    presenceData.smallImageKey = "browsing";
  } else if (matrixPage === "/me") {
    presenceData.details = "Watching Profile:";
    presenceData.state = document.getElementsByTagName("h1")[0].textContent;
  } else if (matrixPage === "/add") {
    presenceData.details = "Adding Bot";
    presenceData.smallImageKey = "writing";
    presenceData.smallImageText = "Writing Text";
  } else if (matrixPage === "/staff") {
    presenceData.details = "Viewing:";
    presenceData.state = "Staff Page";
  } else if (matrixPage === "/admin") {
    presenceData.details = "Viewing:";
    presenceData.state = "Admin Page";
  } else if (matrixPage.includes("/api")) {
    presenceData.details = "Viewing:";
    presenceData.state = "API";
  }

  if (!presenceData.details) presence.setActivity();
  else presence.setActivity(presenceData);
});
