interface LangStrings {
  browse: string;
  names: string;
  skinsFeatured: string;
  skinsTop: string;
  skinsNew: string;
  skinsRandom: string;
  skinsTagged: string;
  skinsTag: string;
  capes: string;
  viewCape: string;
  servers: string;
  viewServer: string;
  claim: string;
  profileEdit: string;
  viewFriends: string;
  viewSkins: string;
  viewEmoji: string;
  viewProfile: string;
  viewing: string;
  privacy: string;
  search: string;
  buttonViewServer: string;
  buttonViewProfile: string;
  viewSkin: string;
}

const presence = new Presence({
    clientId: "809067572061405246"
  }),
  browsingStamp = Math.floor(Date.now() / 1000),
  getStrings = async (): Promise<LangStrings> => {
    return presence.getStrings(
      {
        browse: "general.browsing",
        names: "namemc.upcomingNames",
        skinsFeatured: "namemc.skinsTrending",
        skinsTop: "namemc.skinsTop",
        skinsNew: "namemc.skinsNew",
        skinsRandom: "namemc.skinsRandom",
        skinsTagged: "namemc.skinsTagged",
        skinsTag: "namemc.skinsTag",
        capes: "namemc.capes",
        viewCape: "namemc.viewCape",
        servers: "namemc.servers",
        viewServer: "namemc.viewServer",
        claim: "namemc.claim",
        profileEdit: "namemc.profileEdit",
        viewFriends: "namemc.viewFriends",
        viewSkins: "namemc.viewSkins",
        viewEmoji: "namemc.viewEmojis",
        viewProfile: "general.viewProfile",
        viewing: "general.viewing",
        privacy: "general.privacy",
        search: "general.searchFor",
        buttonViewServer: "namemc.buttonViewServer",
        buttonViewProfile: "general.buttonViewProfile",
        viewSkin: "namemc.viewSkin"
      },
      await presence.getSetting("lang")
    );
  };

let strings: Promise<LangStrings> = getStrings(),
  oldLang: string = null;

presence.on("UpdateData", async () => {
  const newLang = await presence.getSetting("lang"),
    buttons = await presence.getSetting("buttons");
  if (!oldLang) {
    oldLang = newLang;
  } else if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  let presenceData: PresenceData = {
    largeImageKey: "namemc",
    startTimestamp: browsingStamp
  };

  const path = location.href
      .replace(/\/?$/, "/")
      .replace("https://" + location.hostname, "")
      .replace("?", "/"),
    statics: {
      [name: string]: PresenceData;
    } = {
      "/": {
        details: (await strings).browse
      },
      "/minecraft-names/": {
        details: (await strings).names
      },
      "/minecraft-skins/": {
        details: (await strings).skinsFeatured
      },
      "/minecraft-skins/top/": {
        details: (await strings).skinsTop
      },
      "/minecraft-skins/new/": {
        details: (await strings).skinsNew
      },
      "/minecraft-skins/random/": {
        details: (await strings).skinsRandom
      },
      "/minecraft-skins/tag/": {
        details: (await strings).skinsTagged
      },
      "/minecraft-skins/tag/(\\w*)/": {
        details: (await strings).skinsTag.replace(
          "{0}",
          document
            .querySelector("body > main > h1")
            ?.textContent.replace(
              document.querySelector("body > main > h1 > small")?.textContent,
              ""
            )
            .trim()
        )
      },
      "/capes/": {
        details: (await strings).capes
      },
      "/cape/": {
        details: (await strings).viewCape,
        state:
          document
            .querySelector(".default-skin main.container h1")
            ?.textContent.split("\n")[1] + " Cape"
      },
      "/minecraft-servers/": {
        details: (await strings).servers
      },
      "/server/": {
        details: (await strings).viewServer,
        state: document.querySelector(
          "body > main > div.row.no-gutters.align-items-center > div.col > h1"
        )?.textContent,
        buttons: [
          {
            label: (await strings).buttonViewServer,
            url: document.URL
          }
        ]
      },
      "/claim-your-profile/": {
        details: (await strings).claim
      },
      "/my-profile/": {
        details: (await strings).profileEdit.split("{0}")[0],
        state: (await strings).profileEdit.split("{0}")[1]
      },
      "/my-profile/friends/": {
        details: (await strings).viewFriends
      },
      "/my-profile/skins/": {
        details: (await strings).viewSkins
      },
      "/my-profile/emoji/": {
        details: (await strings).viewEmoji
      },
      "/profile/": {
        details: (await strings).viewProfile,
        state: document.querySelector("body > main > h1")?.textContent,
        buttons: [
          {
            label: (await strings).buttonViewProfile,
            url: document.URL
          }
        ]
      },
      "/privacy/": {
        details: (await strings).viewing,
        state: (await strings).privacy
      },
      "/search/": {
        details: (await strings).search,
        state: document.querySelector(
          "#status-bar > div > div > div.col-lg-7 > h1 > samp"
        )?.textContent,
        smallImageKey: "search"
      },
      "/skin/": {
        details: (await strings).viewSkin
      }
    };

  for (const [k, v] of Object.entries(statics)) {
    if (path.match(k)) {
      presenceData.smallImageKey = "reading";
      presenceData.smallImageText = (await strings).browse;
      presenceData = { ...presenceData, ...v };
    }
  }

  if (!buttons) delete presenceData.buttons;

  presence.setActivity(presenceData);
});
