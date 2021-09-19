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
    if (botPage === "/") 

      botData.details = "Browsing home";

     else if (botPage === "/search") {

      const search: string = document
        .querySelector("[name='q']")
        .getAttribute("value");
      botData.details = "Searching bot:";
      botData.state = search;
      botData.buttons = [
        {
          label: "View Search",
          url: document.URL
        }
      ];

    } else if (botPage === "/login_err/") 

      botData.details = "Login page";

     else if (botPage.includes("/users/")) {

      const username: string = document.querySelector("#username").textContent;
      botData.details = "Viewing profile:";
      botData.state = username;
      botData.buttons = [
        {
          label: "View Profile",
          url: document.URL
        }
      ];

    } else if (botPage.includes("/submit")) 

      botData.details = "Submitting a new bot";

     else if (botPage.includes("/vote")) {

      const voteBotName: string = document
        .querySelector("#NAME")
        .textContent.replace("Vote for ", "");
      botData.details = "Voting for:";
      botData.state = voteBotName;
      botData.buttons = [
        {
          label: `Vote for ${voteBotName}`,
          url: document.URL
        }
      ];

    } else if (botPage.includes("/edit")) {

      const editBotName: string = document
        .querySelector("#name").textContent;
      botData.details = "Editing a bot";
      botData.state = editBotName;

    } else if (botPage.includes("/all")) {

      botData.details = "Viewing all bots";
      botData.buttons = [
        {
          label: "Viewing bots",
          url: document.URL
        }
      ];

    } else if (botPage.includes("/bots/")) {

      const botName: string = document.getElementById("name").textContent;
      botData.details = "Viewing bot:";
      botData.state = botName;
      botData.buttons = [
        {
          label: "View Bot",
          url: document.URL
        }
      ];

    } else if (botPage === "/manage/me") {

      const page: string = document
        .querySelector("#content-manage > strong").textContent;
      
        if (page.includes("Manage your Bots")) 
        botData.details = "Managing bots";
       else if (page.includes("Inventory")) 
        botData.details = "Viewing Inventory";
       else if (page.includes("Resubmit a bot")) 
        botData.details = "Watching resubmittable bots";
       else if (page.includes("Your reports")) 
        botData.details = "Watching made reports";
       else if (page.includes("Queue")) 
        botData.details = "[Staff] Viewing the queue";
       else if (page.includes("Pending Reports")) 
        botData.details = "[Staff] Watching pending reports";
       else 
        botData.details = "Editing profile";
      

    } else if (botPage === "/info/certify/") 
      botData.details = "Viewing certification Page";
     else if (botPage === "/certify/") 
      botData.details = "Applying for certification";
     else if (botPage === "/partner") 
      botData.details = "Viewing partner page";
     else if (botPage === "/terms/") 
      botData.details = "Viewing ToS";
     else if (botPage === "/privacy/") 
      botData.details = "Viewing privacy policy";
     else if (botPage === "/imprint/") 
      botData.details = "Viewing imprint";
    
  } else if (botHost == "docs.discord-botlist.eu") {
    const page = document.querySelector(
      "#__GITBOOK__ROOT__CLIENT__ > div.reset-3c756112--body-68cac36c > div.reset-3c756112--bodyContent-2f98451b > div > div.reset-3c756112--wholeContentBody-554be184 > div.reset-3c756112--wholeContentPage-6c3f1fc5 > div > div.reset-3c756112--pageContainer-544d6e9c > div.reset-3c756112 > div.reset-3c756112--pageHeader-15724735 > div > div > div.reset-3c756112--horizontalFlex-5a0077e0 > div.reset-3c756112--pageHeaderIntro-0c1463da > h1 > span"
    ).textContent;
    botData.details = "Viewing docs";
    botData.state = `Page: ${page}`;
  }

  if (!sSubmit && botData.details === "Submitting a new bot") delete botData.details;

  if (!buttons) delete botData.buttons;

  if (botData.details == null) {
    botPresence.setTrayTitle();
    botPresence.setActivity();
  } else 
    botPresence.setActivity(botData);
  
});
