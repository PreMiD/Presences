const presence = new Presence({ clientId: "739908991274057870" }),
  browsingStamp = Math.floor(Date.now() / 1000);

function pathIncludes(string: string): boolean {
  return document.location.pathname.toLowerCase().includes(string);
}
const host = document.location.hostname;

interface LangStrings {
  reading: string;
  leaderboard: string;
  viewMainPage: string;
  serverdash: string;
  serverdashname: string;
  donate: string;
  servers: string;
  commands: string;
  stats: string;
  usercard: string;
  terms: string;
  privacy: string;
  cookies: string;
}

async function getStrings(): Promise<LangStrings> {
  return presence.getStrings(
    {
      reading: "general.readingAbout",
      leaderboard: "juniperbot.leaderboard",
      viewMainPage: "juniperbot.mainpage",
      serverdash: "juniperbot.serverdash",
      serverdashname: "juniperbot.serverdashname",
      donate: "juniperbot.donate",
      servers: "juniperbot.servers",
      commands: "juniperbot.commands",
      stats: "juniperbot.stats",
      usercard: "juniperbot.usercard",
      terms: "general.terms",
      privacy: "general.privacy",
      cookies: "juniperbot.cookies"
    },
    await presence.getSetting("lang")
  );
}

let strings: Promise<LangStrings> = getStrings(),
  oldLang: string = null;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = { largeImageKey: "logo" },
    newLang = await presence.getSetting("lang");

  if (!oldLang) {
    oldLang = newLang;
  } else if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  if (host == "juniper.bot") {
    presenceData.startTimestamp = browsingStamp;

    switch (true) {
      case pathIncludes("/ranking/"):
        presenceData.details = (await strings).leaderboard;
        presenceData.state = document.querySelector(
          ".guild--info h1.font-weight-thin.display-2"
        ).innerHTML;
        presenceData.smallImageKey = "list";
        break;
      case pathIncludes("/dashboard/"):
        presenceData.details = (await strings).serverdash;
        presenceData.state = (await strings).serverdashname.replace(
          "{0}",
          document.querySelector(".guild--info h1.font-weight-thin.display-2")
            .innerHTML
        );
        break;

      case pathIncludes("/donate"):
        presenceData.details = (await strings).donate;
        presenceData.smallImageKey = "donate";
        break;

      case pathIncludes("/servers"):
        presenceData.details = (await strings).servers;
        presenceData.smallImageKey = "list";
        break;

      case pathIncludes("/commands"):
        presenceData.details = (await strings).commands;
        presenceData.smallImageKey = "list";
        break;

      case pathIncludes("/status"):
        presenceData.details = (await strings).stats;
        presenceData.smallImageKey = "stats";
        break;

      case pathIncludes("/user/card"):
        presenceData.details = (await strings).usercard;
        break;

      case pathIncludes("/terms"):
        presenceData.details =
          (await strings).reading + " " + (await strings).terms;
        presenceData.smallImageKey = "list";
        break;

      case pathIncludes("/cookie"):
        presenceData.details =
          (await strings).reading + " " + (await strings).cookies;
        presenceData.smallImageKey = "list";
        break;

      case pathIncludes("/privacy"):
        presenceData.details =
          (await strings).reading + " " + (await strings).privacy;
        presenceData.smallImageKey = "list";
        break;

      default:
        presenceData.details = "Main page";
        break;
    }
  }
  if (host == "docs.juniper.bot") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = document.title;
    presenceData.state = "docs.juniper.bot";
    presenceData.smallImageKey = "list";
  }
  if (host == "feedback.juniper.bot") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.state = "feedback.juniper.bot";
    switch (true) {
      case pathIncludes("/posts/"):
        presenceData.details =
          (await strings).reading +
          " " +
          document.querySelector(".post-header h1").innerHTML;
        break;
      default:
        presenceData.details = (await strings).viewMainPage;
        break;
    }
  }
  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
