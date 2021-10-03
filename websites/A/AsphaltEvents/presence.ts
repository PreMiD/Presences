const presence = new Presence({
    clientId: "751816190653104168"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let item, item2;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "largelogo"
  };

  presenceData.startTimestamp = browsingStamp;

  if (document.location.hostname === "asphalt.events") {
    if (document.location.pathname === "/") {
      presenceData.details = "Browsing";
      presenceData.state = "Upcoming Convoys & Events";
      presenceData.smallImageKey = "search";

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/about")) {
      presenceData.details = "Viewing";
      presenceData.state = "About Us";
      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/event/create")) {
      presenceData.details = "Creating";
      presenceData.state = "Convoy or Event";
      presenceData.smallImageKey = "writing";

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/event/")) {
      item = document.querySelector(
        "body > div > main > div.container > div > div.col-md-8 > div > div > h1 > strong"
      ) as HTMLElement;

      item2 = document.querySelector(
        "body > div > main > div.container > div > div.col-md-8 > div.card > div > h3"
      ) as HTMLElement;

      const type = item2.innerText,
        firstWord = type.replace(/ .*/, "");

      if (item === null || item.innerText === "xClose") {
        item = document.querySelector(
          "body > div > main > div.container > div > div.col-md-8 > div.card-header > h3"
        ) as HTMLElement;
      }

      presenceData.details = `Viewing ${firstWord}:`;
      presenceData.state = item.innerText;
      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/event")) {
      presenceData.details = "Viewing";
      presenceData.state = "All Convoys & Events";
      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/profile")) {
      presenceData.details = "Viewing";
      presenceData.state = "Their Profile";
      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/user/")) {
      item = document.querySelector(
        "body > div > main > div.container > div > div.row > div.col-md-9 > div > div > div > div > h1"
      ) as HTMLElement;

      presenceData.details = "Viewing ";
      presenceData.state = `${item.innerText}'s Profile`;
      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/knowledge-base")) {
      presenceData.details = "Browsing";
      presenceData.state = "The Knowledge Base";
      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/languages")) {
      presenceData.details = "Translating The Website";

      item = document.querySelector(
        "body > div > form > div > div > div > div:nth-child(2) > select > option:checked"
      ) as HTMLElement;

      if (item !== null) presenceData.state = item.innerText;
      else presenceData.state = "Translation Center";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/team")) {
      presenceData.details = "Viewing";
      presenceData.state = "The Team Page";
      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/branding")) {
      presenceData.details = "Viewing";
      presenceData.state = "Branding Page";
      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/privacy")) {
      presenceData.details = "Viewing";
      presenceData.state = "Privacy Policies";
      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/terms")) {
      presenceData.details = "Viewing";
      presenceData.state = "Terms of Service";
      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/cookies")) {
      presenceData.details = "Viewing";
      presenceData.state = "Cookie Policies";
      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/advertising")) {
      presenceData.details = "Viewing";
      presenceData.state = "Advertising Policies";
      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  }
});
