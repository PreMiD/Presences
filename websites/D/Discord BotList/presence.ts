const botPresence = new Presence({
    clientId: "819122551435296818"
  }),
  botBrowsing = Math.floor(Date.now() / 1000);

botPresence.on("UpdateData", async () => {
  const botData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: botBrowsing
    },
    botPage = document.location.pathname,
    botHost = document.location.hostname,
    buttons = await botPresence.getSetting("buttons"),
    sSubmit = await botPresence.getSetting("submitP");

  if (botHost == "discord-botlist.eu") {
    if (botPage == "/") {
      botData.details = "Browsing";
    } else if (botPage == "/search") {
      const search: string = document
        .querySelector("[name='search']")
        .getAttribute("value");
      botData.details = "Searching Bot:";
      botData.state = search;
      botData.buttons = [
        {
          label: "View Search",
          url: document.URL
        }
      ];
    } else if (botPage == "/bots/tag") {
      const urlParams: URLSearchParams = new URLSearchParams(
          window.location.search
        ),
        myParam: string = urlParams.get("tag");
      botData.details = "Searching Tag:";
      botData.state = myParam;
      botData.buttons = [
        {
          label: "View Tag",
          url: document.URL
        }
      ];
    } else if (botPage == "/login_err/") {
      botData.details = "Login In Page";
    } else if (botPage.includes("/users/")) {
      const username: string = document.querySelector("#Username").textContent;
      botData.details = "Viewing Profile:";
      botData.state = username;
      botData.buttons = [
        {
          label: "View Profile",
          url: document.URL
        }
      ];
    } else if (botPage.includes("/bots/")) {
      if (botPage.includes("/new")) {
        botData.details = "Adding a Bot";
      } else if (botPage.includes("/vote")) {
        const voteBotName: string = document
          .querySelector("#vote1 > h1")
          .textContent.replace("Vote for ", "");
        botData.details = "Voting for:";
        botData.state = voteBotName;
        botData.buttons = [
          {
            label: "Vote for " + voteBotName,
            url: document.URL
          }
        ];
      } else if (botPage.includes("/edit")) {
        botData.details = "Editing a Bot";
      } else if (botPage.includes("/all")) {
        botData.details = "Viewing all Bots";
        botData.buttons = [
          {
            label: "View Bots",
            url: document.URL
          }
        ];
      } else {
        const botName: string = document.getElementById("botname").textContent;
        botData.details = "Viewing Bot:";
        botData.state = botName;
        botData.buttons = [
          {
            label: "View Bot",
            url: document.URL
          }
        ];
      }
    } else if (botPage == "/apply/certification/") {
      botData.details = "Viewing Certification Page";
    } else if (botPage == "/apply/certification/application") {
      botData.details = "Applying for Certification";
    } else if (botPage == "/tos/") {
      botData.details = "Viewing ToS";
    } else if (botPage == "/privacypolicy/") {
      botData.details = "Viewing Privacy Policy";
    } else if (botPage == "/Imprint/") {
      botData.details = "Viewing Imprint";
    }
  } else if (botHost == "docs.discord-botlist.eu") {
    const page = document.querySelector(
      "#__GITBOOK__ROOT__CLIENT__ > div.reset-3c756112--body-68cac36c > div.reset-3c756112--bodyContent-2f98451b > div > div.reset-3c756112--wholeContentBody-554be184 > div.reset-3c756112--wholeContentPage-6c3f1fc5 > div > div.reset-3c756112--pageContainer-544d6e9c > div.reset-3c756112 > div.reset-3c756112--pageHeader-15724735 > div > div > div.reset-3c756112--horizontalFlex-5a0077e0 > div.reset-3c756112--pageHeaderIntro-0c1463da > h1 > span"
    ).textContent;
    botData.details = "Viewing Docs";
    botData.state = "Page: " + page;
  }

  if (!sSubmit && botData.details === "Adding a Bot") delete botData.details;

  if (!buttons) delete botData.buttons;

  if (botData.details == null) {
    botPresence.setTrayTitle();
    botPresence.setActivity();
  } else {
    botPresence.setActivity(botData);
  }
});
