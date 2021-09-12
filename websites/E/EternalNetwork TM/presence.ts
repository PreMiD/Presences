const presence = new Presence({
    clientId: "440182142694064129"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

interface LangStrings {
  listeningMusic: string;
  readingPost: string;
  viewPage: string;
}

async function getStrings(): Promise<LangStrings> {
  return presence.getStrings(
    {
      listeningMusic: "general.listeningMusic",
      readingPost: "general.readingPost",
      viewPage: "general.viewPage",
    },
    await presence.getSetting("lang")
  );
}

let strings: Promise<LangStrings> = getStrings(),
  oldLang: string = null,
  host: string;

presence.on("UpdateData", async () => {
    const
      newLang = await presence.getSetting("lang"),
      showTimestamps = await presence.getSetting("timestamp"),
      showSubdomain = await presence.getSetting("subdomain"),
      bigicon = await presence.getSetting("bigicon"),
      hostname = document.location.hostname,
      pathname = document.location.pathname,
      etrnl = "eternalnetworktm.com",
      ttl = document.title,
      logoArr = ["eternalnetworktm_logo", "eternalnetworktm_logo_2", "eternalnetworktm_logo_3"];

    if (!oldLang) {
      oldLang = newLang;
    } else if (oldLang !== newLang) {
      oldLang = newLang;
      strings = getStrings();
    }

    const presenceData: PresenceData = {
      details: (await strings).viewPage,
      state: undefined,
      largeImageKey: logoArr[bigicon] || "eternalnetworktm_logo",
      smallImageText: hostname + pathname,
      startTimestamp: browsingStamp,
      endTimestamp: undefined
    };

    if (!showTimestamps) {
      presenceData.startTimestamp = undefined;
    }

    if (hostname === etrnl || hostname === "www." + etrnl) {

      presenceData.smallImageKey = "eternalnetworktm_logo";

      if (pathname.startsWith("/")) {
        presenceData.state = ttl;
      }

      if (pathname.includes("/wp-admin")) {
        presenceData.state = "Using administrating power over the website !";
        presenceData.smallImageText = "Admin Panel";
      }

    }
    if (hostname === "forum." + etrnl || hostname === "www.forum." + etrnl) {

      presenceData.smallImageKey = "eternalnetworktm_logo_v2";

      if (pathname.startsWith("/")) {
        presenceData.state = ttl;
      }

      if (pathname.includes("/memberlist.php")) {
        presenceData.state = "Sneaking into member list !";
      }

      if (pathname.includes("/viewtopic.php")) {
        presenceData.details = (await strings).readingPost
        presenceData.state = ttl;
      }

      if (pathname.includes("/adm/")) {
        presenceData.state = "Using administrating power over the forum !";
        presenceData.smallImageText = "Admin Panel";
      }

    }
    if (hostname === "radio." + etrnl || hostname === "www.radio." + etrnl) {

      presenceData.smallImageKey = "eternalradio_logo";
      presenceData.details = (await strings).listeningMusic

      if (pathname.startsWith("/")) {
        presenceData.state = ttl;
      }

      if (pathname.includes("page_ABOUT")) {
        presenceData.state = "About info page !";
      }

      if (pathname.includes("page_PROGRAMS")) {
        presenceData.state = "Checking radio program !";
      }

      if (pathname.includes("page_REQUEST")) {
        presenceData.state = "Requesting a song !";
      }

      if (pathname.includes("page_CONTACTS")) {
        presenceData.state = "Contact us page !";
      }
    }
    if (hostname === "status." + etrnl || hostname === "www.status." + etrnl) {

      presenceData.smallImageKey = "eternalnetworktm_status";

      if (pathname.startsWith("/")) {
        presenceData.state = ttl;
      }

      if (pathname.includes("/admin")) {
        presenceData.state = "Adding new incident 😥 !";
        presenceData.smallImageText = "Admin Panel";
      }

      if (pathname.includes("/?do=settings")) {
        presenceData.state = "Adding new service !";
      }
    }

    if (!showSubdomain) {
      presenceData.smallImageKey = undefined;
      presenceData.smallImageText = undefined;
    }

    if (presenceData.details == null) {
      presence.setTrayTitle();
      presence.setActivity();
    } else {
      presence.setActivity(presenceData);
    }
  }
);
