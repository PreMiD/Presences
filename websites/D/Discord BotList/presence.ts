const botPresence = new Presence({
  clientId: "819122551435296818"
}),
  botBrowsing = Math.floor(Date.now() / 1000);

botPresence.on("UpdateData", async() => {
  const botData: PresenceData = {
    largeImageKey: "logo",
  },
    botPage = document.location.pathname;

  botData.startTimestamp = botBrowsing;

  if (botPage == "/") {
    botData.details = "Browsing";
  } else if(botPage == "/search") {
    const search: any = document.querySelector("[name='search']").getAttribute("value");
    botData.details = "Searching Bot:";
    botData.state = search;
    botData.buttons = [
      {
        "label": "View Search",
        "url": document.URL,
      }
    ];
  } else if(botPage == "/bots/tag") {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('tag');
    botData.details = "Searching Tag:";
    botData.state = myParam;
    botData.buttons = [
      {
        "label": "View Tag",
        "url": document.URL,
      }
    ];
  } else if (botPage == "/login_err/") {
    botData.details = "Login In Page";
  } else if (botPage.includes("/users/")) {
    const username: any = document.querySelector("#Username").textContent;
    botData.details = "Viewing Profile:";
    botData.state = username;
    botData.buttons = [
      {
        "label": "View Profile",
        "url": document.URL,
      }
    ];
  } else if (botPage.includes("/bots/")) {
    if (botPage.includes("/vote")) {
      const voteBotName: any = document.querySelector("#vote1 > h1").textContent.replace("Vote for ", "")
      botData.details = "Voting for:";
      botData.state = voteBotName;
      botData.buttons = [
        {
          "label": "Vote for " + voteBotName,
          "url": document.URL,
        }
      ];
    } else if (botPage.includes("/edit")) {
      botData.details = "Editing a Bot";
    } else if (botPage.includes("/all")) {
      botData.details = "Viewing all Bots";
      botData.buttons = [
        {
          "label": "View Bots",
          "url": document.URL,
        }
      ];
    } else {
      const botName: any = document.getElementById("botname").textContent;
      botData.details = "Viewing Bot:";
      botData.state = botName;
      botData.buttons = [
        {
          "label": "View Bot",
          "url": document.URL,
        }
      ];
    }
  } else if (botPage == "/apply/certification/") {
    botData.details = "Viewing Certification Page";
  } else if (botPage == "/apply/certification/application") {
    botData.details = "Applying for Certification";
  } else if (botPage == "/tos/") {
    botData.details = "Viewing ToS";
    botData.buttons = [
      {
        "label": "View ToS",
        "url": document.URL,
      }
    ];
  } else if (botPage == "/privacypolicy/") {
    botData.details = "Viewing Privacy Policy";
  } else if (botPage == "/Imprint/") {
    botData.details = "Viewing Impressum";
  }

  if (botData.details == null) {
    botPresence.setTrayTitle();
    botPresence.setActivity();
  } else {
    botPresence.setActivity(botData);
  }
});