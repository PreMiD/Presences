const presence = new Presence({
    clientId: "809093093600133165"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

async function getStrings() {
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
    await presence.getSetting("lang").catch(() => "en")
  );
}

let strings = getStrings(),
  oldLang: string = null;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "tiktok",
      startTimestamp: browsingStamp
    },
    newLang = await presence.getSetting("lang").catch(() => "en"),
    [, page, pageType] = location.pathname.split("/");

  oldLang ??= newLang;
  if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  if (!page || page === "foryou") {
    const [detail, state] = (await strings).forYou.split("{0}");

    presenceData.details = detail;
    presenceData.state = state;
  } else if (page.startsWith("@")) {
    //User

    if (pageType === "video") {
      //Video

      const author = document.querySelector(".user-username")?.textContent,
        otherAuthor = document.querySelector(".author-uniqueId")?.textContent,
        caption = document.querySelector(".video-meta-title:nth-child(1)")
          ?.firstElementChild?.textContent,
        otherCaption = document.querySelector(".tt-video-meta-caption")
          ?.firstElementChild?.textContent,
        video = document.querySelector(".video-player") as HTMLVideoElement,
        [, endTimestamp] = await presence.getTimestampsfromMedia(video);

      delete presenceData.startTimestamp;
      presenceData.details = caption ?? otherCaption;
      presenceData.state = `@${author ?? otherAuthor}`;
      presenceData.smallImageKey = video.paused ? "pause" : "play";
      presenceData.endTimestamp = !video.paused ? endTimestamp : 0;
      presenceData.buttons = [
        {
          label: (await strings).buttonViewTikTok,
          url: `https://www.tiktok.com${document.URL.split("#")[1]}/`
        },
        {
          label: (await strings).buttonViewProfile,
          url: document.URL.split("?")[0]
        }
      ];
    } else if (pageType === "live") {
      //Live

      const author = document.querySelector(".user-uniqueId")?.textContent,
        caption = document.querySelector(".live-title")?.textContent;

      delete presenceData.startTimestamp;
      presenceData.details = caption;
      presenceData.state = `@${author}`;
      presenceData.smallImageKey = "live";

      presenceData.buttons = [
        {
          label: (await strings).buttonViewTikTok,
          url: `https://www.tiktok.com${document.URL.split("#")[1]}/`
        },
        {
          label: (await strings).buttonViewProfile,
          url: document.URL.split("?")[0]
        }
      ];
    } else {
      const author = document
          .querySelector(".share-sub-title")
          ?.textContent.trim(),
        username = document.querySelector(".share-title")?.textContent.trim();

      presenceData.details = (await strings).viewProfile;
      presenceData.state = `${author} (@${username})`;
      presenceData.buttons = [
        {
          label: (await strings).buttonViewProfile,
          url: document.URL.split("?")[0]
        }
      ];
    }
  } else if (page === "following") {
    const [detail, state] = (await strings).following.split("{0}");

    presenceData.details = detail;
    presenceData.state = state;
    presenceData.smallImageText = (await strings).browse;
    presenceData.smallImageKey = "reading";
  }

  const buttons = await presence.getSetting("buttons");
  if (!buttons) delete presenceData.buttons;

  presence.setActivity(presenceData);
});
