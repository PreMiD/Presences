const presence = new Presence({
    clientId: "440182142694064129"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

async function getStrings() {
  return presence.getStrings(
    {
      buttonViewPage: "general.buttonViewPage",
      listeningMusic: "general.listeningMusic",
      readingPost: "general.readingPost",
      viewPage: "general.viewPage",
      viewUser: "general.viewUser",
      watchingVid: "general.watchingVid"
    },
    await presence.getSetting("lang").catch(() => "en")
  );
}

let strings = getStrings(),
  oldLang: string = null;

presence.on("UpdateData", async () => {
  const newLang: string = await presence.getSetting("lang").catch(() => "en"),
    showTimestamps = await presence.getSetting("timestamp"),
    showSubdomain = await presence.getSetting("subdomain"),
    bigicon = await presence.getSetting("bigicon"),
    buttons = await presence.getSetting("buttons"),
    { hostname, pathname, search, hash } = document.location,
    etrnl = "eternalnetworktm.com",
    ttl = document.title,
    logoArr = [
      "eternalnetworktm_logo",
      "eternalnetworktm_logo_2",
      "eternalnetworktm_logo_3"
    ];

  oldLang ??= newLang;
  if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  const presenceData: PresenceData = {
    details: (await strings).viewPage,
    largeImageKey: logoArr[bigicon] || "eternalnetworktm_logo",
    smallImageText: hostname + pathname,
    startTimestamp: browsingStamp,
    buttons: [
      {
        label: (await strings).buttonViewPage,
        url: window.location.href
      }
    ]
  };

  if (!showTimestamps) delete presenceData.startTimestamp;

  if (hostname === etrnl || hostname === `www.${etrnl}`) {
    presenceData.smallImageKey = "eternalnetworktm_logo";

    if (pathname.startsWith("/")) presenceData.state = ttl;

    if (pathname.includes("/wp-admin")) {
      presenceData.state = "Using administrating power over the website !";
      presenceData.smallImageText = "Admin Panel";
      delete presenceData.buttons;
    }
  } else if (
    hostname === `forum.${etrnl}` ||
    hostname === `www.forum.${etrnl}`
  ) {
    presenceData.smallImageKey = "eternalnetworktm_logo_v2";

    if (pathname.startsWith("/")) presenceData.state = ttl;

    if (pathname.includes("/memberlist.php"))
      presenceData.state = "Sneaking into member list !";

    if (search.includes("?mode=team"))
      presenceData.state = "Checking out team list !";

    if (pathname.includes("/partner"))
      presenceData.state = "Cheking our partners !";

    if (pathname.includes("/donation"))
      presenceData.state = "Trying to make donation for the forum !";

    if (pathname.includes("/imageupload"))
      presenceData.state = "Uploading images!";

    if (pathname.includes("/video"))
      presenceData.state = "Checking video gallery";

    if (search.includes("?mode=view&id=")) {
      const videoTitle = document.querySelector("h3.first > a").textContent,
        checkVideoBtn = document
          .querySelector("div.postbody > div > a > span")
          .getAttribute("title");
      presenceData.details = `${(await strings).watchingVid}:`;
      presenceData.state = videoTitle;
      presenceData.buttons = [
        {
          label: (await strings).buttonViewPage,
          url: window.location.href
        },
        {
          label: checkVideoBtn,
          url: document.querySelector("#video_title").getAttribute("value")
        }
      ];
    }

    if (pathname.includes("/viewtopic.php")) {
      presenceData.details = (await strings).readingPost;
      presenceData.state = ttl;
    }

    if (pathname.includes("/posting.php")) {
      presenceData.details = "Making a new post";
      presenceData.state = ttl;
    }

    if (pathname.includes("/adm/")) {
      presenceData.state = "Using administrating power over the forum !";
      presenceData.smallImageText = "Admin Panel";
      delete presenceData.buttons;
    }
  } else if (
    hostname === `radio.${etrnl}` ||
    hostname === `www.radio.${etrnl}`
  ) {
    presenceData.smallImageKey = "eternalradio_logo";
    presenceData.details = (await strings).listeningMusic;

    if (pathname.startsWith("/")) presenceData.state = ttl;

    if (hash.includes("page_ABOUT")) presenceData.state = "About info page !";

    if (hash.includes("page_PROGRAMS"))
      presenceData.state = "Checking radio program !";

    if (hash.includes("page_REQUEST"))
      presenceData.state = "Requesting a song !";

    if (hash.includes("page_CONTACTS"))
      presenceData.state = "Contact us page !";
  } else if (
    hostname === `status.${etrnl}` ||
    hostname === `www.status.${etrnl}`
  ) {
    presenceData.smallImageKey = "eternalnetworktm_status";

    if (pathname.startsWith("/")) presenceData.state = ttl;

    if (pathname.includes("/admin")) {
      presenceData.state = "Adding new incident 😥 !";
      presenceData.smallImageText = "Admin Panel";
      delete presenceData.buttons;
    }

    if (search.includes("?do=settings"))
      presenceData.state = "Adding new service !";
    delete presenceData.buttons;
  }

  if (!buttons) delete presenceData.buttons;

  if (!showSubdomain) {
    delete presenceData.smallImageKey;
    delete presenceData.smallImageText;
  }
  presence.setActivity(presenceData);
});
