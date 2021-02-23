interface LangStrings {
  browse: string;
  forYou: string;
  following: string;
  buttonViewProfile: string;
  viewProfile: string;
  viewTikTok: string;
  buttonViewTikTok: string;
}

const presence = new Presence({
    clientId: "809093093600133165"
  }),
  getStrings = async (): Promise<LangStrings> => {
    return presence.getStrings(
      {
        browse: "general.browsing",
        forYou: "tiktok.forYou",
        following: "tiktok.following",
        buttonViewProfile: "general.buttonViewProfile",
        viewProfile: "general.viewProfile",
        viewTikTok: "tiktok.viewing",
        buttonViewTikTok: "tiktok.buttonViewTikTok"
      },
      await presence.getSetting("lang")
    );
  };

let browsingStamp = Math.floor(Date.now() / 1000),
  prevUrl = document.URL,
  strings: Promise<LangStrings> = getStrings(),
  oldLang: string = null;

presence.on("UpdateData", async () => {
  const newLang = await presence.getSetting("lang"),
    buttons = await presence.getSetting("buttons");

  if (document.URL !== prevUrl) {
    prevUrl = document.location.href;
    browsingStamp = Math.floor(Date.now() / 1000);
  }

  if (!oldLang) {
    oldLang = newLang;
  } else if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  let presenceData: PresenceData = {
    largeImageKey: "tiktok",
    startTimestamp: browsingStamp
  };

  const path = location.href
      .replace(/\/?$/, "/")
      .replace("https://" + location.hostname, "")
      .replace("?", "/")
      .replace("@", "@/")
      .replace("#", ""),
    statics: {
      [name: string]: PresenceData;
    } = {
      "/": {
        details: (await strings).forYou.split("{0}")[0],
        state: (await strings).forYou.split("{0}")[1],
        smallImageText: (await strings).browse,
        smallImageKey: "reading"
      },
      "/following/": {
        details: (await strings).following.split("{0}")[0],
        state: (await strings).following.split("{0}")[1],
        smallImageText: (await strings).browse,
        smallImageKey: "reading"
      },
      "/@/": {
        details: (await strings).viewProfile,
        state: `${document
          .querySelector(".share-sub-title")
          ?.textContent.trim()} (@${document
          .querySelector(".share-title")
          ?.textContent.trim()})`,
        buttons: [
          {
            label: (await strings).buttonViewProfile,
            url: document.URL.split("?")[0]
          }
        ]
      },
      "/@/(.*)/video/": {
        details: (await strings).viewTikTok,
        state: `${document
          .querySelector(".user-nickname")
          ?.textContent.split("·")[0]
          .trim()} (@${document
          .querySelector(".user-username")
          ?.textContent.trim()})`,
        smallImageKey:
          document.querySelector(".play-button") === null ? "play" : "pause",
        buttons: [
          {
            label: (await strings).buttonViewTikTok,
            url: document.URL.split("?")[0]
          }
        ]
      },
      "v2/@/(.*)/video/": {
        details: (await strings).viewTikTok,
        state:
          (document.querySelectorAll(
            `a[href="${document.URL.split("#")[1]?.split("/video")[0]}?${
              document.URL.split("?")[1]?.split("&")[0]
            }"]`
          )[0] as HTMLLinkElement)?.title.replace(" Official | TikTok", "") ||
          (document.querySelectorAll(
            `a[href="${document.URL.split("#")[1]?.split("/video")[0]}/live/?${
              document.URL.split("?")[1]?.split("&")[0]
            }"]`
          )[0] as HTMLLinkElement)?.title.replace(" Official | TikTok", "") ||
          (document.querySelectorAll(
            `a[href="${document.URL.split("#")[1]?.split("/video")[0]}?${
              document.URL.split("?")[1]?.split("&")[0]
            }"]`
          )[1] as HTMLLinkElement)?.title.replace(" Official | TikTok", "") ||
          (document.querySelectorAll(
            `a[href="${document.URL.split("#")[1]?.split("/video")[0]}/live/?${
              document.URL.split("?")[1]?.split("&")[0]
            }"]`
          )[1] as HTMLLinkElement)?.title.replace(" Official | TikTok", ""),
        smallImageKey: document.querySelectorAll("video")[
          document.querySelectorAll("video")?.length - 1
        ]?.paused
          ? "pause"
          : "play",
        buttons: [
          {
            label: (await strings).buttonViewTikTok,
            url: `https://www.tiktok.com${document.URL.split("#")[1]}/`
          }
        ]
      }
    };

  for (const [k, v] of Object.entries(statics)) {
    if (path.match(k)) {
      presenceData = { ...presenceData, ...v };
    }
  }

  if (!buttons) delete presenceData.buttons;

  presence.setActivity(presenceData);
});
