/* Global variables */
const presence = new Presence({
    clientId: "650569876993343529"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
let profile: HTMLElement, title: HTMLElement;

/* Main eventHandler */
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo-512"
  };
  presenceData.startTimestamp = browsingStamp;
  if (document.location.hostname.includes("v3rmillion.net")) {
    /* Home Page */
    if (
      document.location.pathname.includes("index.php") ||
      document.location.pathname === "/"
    ) {
      profile = document.querySelector("#panel strong");
      presenceData.details = "Viewing Homepage";
      presenceData.state = `Logged in as ${profile.innerText}`;
      presenceData.smallImageKey = "twemoji-house-1024x";
    } else if (document.location.pathname.includes("showthread.php")) {
      /* Viewing Thread*/
      title = document.querySelector(".thread_title");
      presenceData.details = "Browsing Thread:";
      presenceData.state = title.innerText;
      presenceData.smallImageKey = "twemoji-paper-1024x";

      /* User is replying to thread using quick-reply box. */
      const textarea = document.querySelector("form #message");
      if (textarea !== null && textarea === document.activeElement) {
        presenceData.details = "Replying to Thread:";
        presenceData.state = title.innerText;
        presenceData.smallImageKey = "twemoji-memo-1024x";
      }
    } else if (document.location.pathname.includes("forumdisplay.php")) {
      /* Viewing subforum */
      title = document.querySelector(".navigation .active");
      presenceData.details = "Viewing Forum:";
      presenceData.state = title.innerText;
      presenceData.smallImageKey = "twemoji-paper-1024x";
    } else if (document.location.pathname.includes("newreply.php")) {
      /* User is replying to thread */
      // awful dom selection and text manipulation incoming
      title = document.querySelector("form .smalltext > strong");
      presenceData.details = "Replying to Thread:";
      presenceData.state = title.innerText.substring(
        title.innerText.indexOf("thread: ") + 8
      ); // Removes "Reply to thread"
      presenceData.smallImageKey = "twemoji-pencil-1024x";
    } else if (document.location.pathname.includes("member.php")) {
      /* User is viewing profile */
      profile = document.querySelector(".profile_header strong span");
      presenceData.details = "Viewing Profile:";
      presenceData.state = profile.innerText;
      presenceData.smallImageKey = "twemoji-spy-1024x";
    } else if (document.location.pathname === "/siterules.php") {
      /* Viewing rules page */
      presenceData.details = "Viewing Rules";
      delete presenceData.state;
      presenceData.smallImageKey = "twemoji-paper-1024x";
    } else if (document.location.pathname === "/usercp.php") {
      /* Editing settings */
      profile = document.querySelector("#panel strong");
      presenceData.details = "User Control Panel";
      presenceData.state = `Logged in as ${profile.innerText}`;
      presenceData.smallImageKey = "twemoji-cog-1024x";
    } else if (document.location.pathname.includes("search.php")) {
      /* Searching */
      profile = document.querySelector("#panel strong");
      presenceData.details = "Searching site";
      presenceData.state = `Logged in as ${profile.innerText}`;
    } else if (document.location.pathname.includes("pages.php")) {
      /* Other page fallback */
      const page = document.URL.substring(document.URL.indexOf(".php") + 10);
      presenceData.details = "Reading page:";
      presenceData.state = page.charAt(0).toUpperCase() + page.substring(1);
      presenceData.smallImageKey = "twemoji-paper-1024x";
    }
  }
  /* Unknown site location */
  if (!presenceData.details) {
    presence.error("Unable to determine location.");
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
