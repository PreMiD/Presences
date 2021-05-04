const presence = new Presence({
    clientId: "837754527217877003"
  }),
  timestamp = Math.floor(Date.now() / 1000);

let articleTitle: string,
  articleDate: string,
  gameTitle: string,
  profileTitle: string,
  profileStatus: string;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: timestamp
    },
    showButtons: boolean = await presence.getSetting("buttons"),
    showTimestamps: boolean = await presence.getSetting("timestamps");

  switch (window.location.pathname) {
    case "/":
      presenceData.details = "Home";
      break;
    case "/games":
      presenceData.details = "Games";
      presenceData.buttons = [
        { label: "View Games", url: "https://www.dice.se/games" }
      ];
      break;
    case "/life-at-dice":
      presenceData.details = "Life At Dice";
      presenceData.buttons = [
        { label: "Life At Dice", url: "https://www.dice.se/life-at-dice" }
      ];
      break;
    case "/our-values":
      presenceData.details = "Our Values";
      presenceData.buttons = [
        { label: "Our Values", url: "https://www.dice.se/our-values" }
      ];
      break;
    case "/how-we-work-how-we-play":
      presenceData.details = "How We Work";
      presenceData.state = "How We Play";

      presenceData.buttons = [
        {
          label: "How We Work",
          url: "https://www.dice.se/how-we-work-how-we-play"
        },
        {
          label: "How We Play",
          url: "https://www.dice.se/how-we-work-how-we-play#how-we-play"
        }
      ];
      break;
    case "/our-crafts":
      presenceData.details = "Our Crafts";
      presenceData.buttons = [
        { label: "Our Crafts", url: "https://www.dice.se/our-crafts" }
      ];
      break;
    case "/careers":
      presenceData.details = "Careers";
      presenceData.buttons = [
        { label: "View Careers", url: "https://www.dice.se/careers" }
      ];
      break;
    case "/perks-benefits":
      presenceData.details = "Perks & Benefits";
      presenceData.buttons = [
        {
          label: "View Perks & Benefits",
          url: "https://www.dice.se/perks-benefits"
        }
      ];
      break;
    case "/living-in-sweden":
      presenceData.details = "Living In Sweden";
      presenceData.buttons = [
        {
          label: "Living In Sweden",
          url: "https://www.dice.se/living-in-sweden"
        }
      ];
      break;
    case "/latest":
      presenceData.details = "Latest News";
      presenceData.buttons = [
        {
          label: "Latest News",
          url: "https://www.dice.se/latest"
        }
      ];
      break;
    case "/news-article":
      presenceData.details = "News";
      presenceData.buttons = [
        {
          label: "News",
          url: "https://www.dice.se/news-articles"
        }
      ];
      break;
    case "/contact":
      presenceData.details = "Contacts";
      presenceData.buttons = [
        {
          label: "View Contacts",
          url: "https://www.dice.se/contact"
        }
      ];
      break;
    case "/students":
      presenceData.details = "Students";
      presenceData.buttons = [
        {
          label: "Students",
          url: "https://www.dice.se/students"
        }
      ];
      break;
  }

  if (window.location.pathname.includes("/news-articles/")) {
    articleTitle = document.querySelector(".BlogItem-title").textContent.trim();
    articleDate = document
      .querySelector(".BlogItem-meta > time")
      .textContent.trim();

    presenceData.details = articleTitle;
    presenceData.state = articleDate;

    delete presenceData.buttons;
    presenceData.buttons = [
      { label: "View Article", url: window.location.href }
    ];
  } else if (window.location.pathname.includes("/game/")) {
    gameTitle = document.querySelector(".BlogItem-title").textContent.trim();

    presenceData.details = gameTitle;

    presenceData.buttons = [
      { label: "View " + gameTitle, url: window.location.href }
    ];
  } else if (window.location.pathname.includes("/people/")) {
    profileTitle = document
      .querySelector(".BlogItem-title")
      ?.textContent.trim();
    profileStatus =
      document
        .querySelector(".sqs-row > div > div:nth-child(3) > div > p")
        .textContent.trim() ??
      document
        .querySelector(".sqs-row > div > div:nth-child(2) > div > p")
        .textContent.trim();

    presenceData.details = profileTitle;
    presenceData.state = profileStatus;

    delete presenceData.buttons;
    presenceData.buttons = [
      { label: "View " + profileTitle, url: window.location.href }
    ];
  }

  if (!showButtons && presenceData.buttons) {
    delete presenceData.buttons;
  }

  if (!showTimestamps) {
    delete presenceData.startTimestamp;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
