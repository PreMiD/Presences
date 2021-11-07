const presence = new Presence({
    clientId: "905603438203789363"
  }),
 basicPages: {
  [name: string]: PresenceData;
} = {
  "/": { details: "Browsing Homepage" },
  "/following": { details: "Browsing Following Topics" },
  "/top": { details: "Browsing Top Topics" },
  "/unread": { details: "Browsing Unread Topics" },
  "/latest": { details: "Browsing Latest Topics" },
  "/new": { details: "Browsing New Topics" },
  "/about": { details: "Browsing About" },
  "/faq": { details: "Browsing FAQ" },
  "/categories": { details: "Browsing Categories" }
};

let prevURL = document.location.pathname.substring(0,10),
 browsingTimestamp = Math.floor(Date.now() / 1000),
 prevTopic: string,
 currentTopicName: string;

presence.on("UpdateData", async () => {
  const buttons = await presence.getSetting("buttons"),
   presenceData: PresenceData = {
      largeImageKey: "largelogo",
      startTimestamp: browsingTimestamp
    },
    { pathname, hostname } = document.location;

  if (hostname === "devforum.roblox.com") {
    if (document.location.pathname.substring(0,10) !== prevURL) {
      prevURL = document.location.pathname.substring(0,10);
      browsingTimestamp = Math.floor(Date.now() / 1000);
    }

    if (pathname.includes("/t/")) {
      presenceData.details = "Reading...";
      presenceData.state = currentTopicName || "[Loading...]";
      presenceData.smallImageKey = "post";
      presenceData.smallImageText = "Reading";

      if (buttons) {
        presenceData.buttons = [
          {
            label: "View Topic",
            url: document.URL
          }
        ];
      }

      if (prevTopic !== pathname.split("/")[3]) {
        prevTopic = pathname.split("/")[3];

        const req = await (await fetch(`${document.URL}.json`, { method: "GET" })).json();
        currentTopicName = req.title;

        presenceData.state = currentTopicName;
      }
    } else if (
      pathname.includes("/tag/") ||
      (pathname.includes("/c/") && !pathname.includes("/categories/"))
    ) {
      presenceData.details = `Browsing ${
        document.title.split("- DevForum | Roblox")[0]
      }`;
      presenceData.smallImageKey = "filter";
      presenceData.smallImageText = "Browsing";
    } else if (pathname.includes("/search")) {
      presenceData.details = `Searching "${
        document.title.match(/'([^']+)'/)[1]
      }"`;
      presenceData.smallImageKey = "search";
      presenceData.smallImageText = "Searching";
    } else if (pathname.includes("/badges") && !pathname.includes("/u")) {
      presenceData.details = "Browsing Badges";
      presenceData.smallImageKey = "badge";
      presenceData.smallImageText = "Browsing";

      if (document.querySelector(".container.show-badge")) {
        presenceData.details = `Browsing ${
          document
            .querySelector(".container.show-badge")
            .getElementsByTagName("h1")[0]
            .innerText.split("/")[1]
        } Badge`;
      }
    } else if (pathname.includes("/g/")) {
      presenceData.details = "Browsing Groups";
      presenceData.smallImageKey = "group";
      presenceData.smallImageText = "Browsing";

      if (document.querySelector(".group-info-name")) {
        presenceData.details = `Browsing ${
          document.querySelector(".group-info-name").innerHTML
        } Group`;
      }
    } else if (pathname.includes("/u/")) {
      presenceData.details = `Browsing ${
        document.querySelector(".username").innerHTML
      }'s Profile`;
      presenceData.smallImageKey = "user";
      presenceData.smallImageText = "Browsing";

      if (buttons) {
        presenceData.buttons = [
          {
            label: "View Profile",
            url: document.URL
          }
        ];
      }

      if (pathname.includes("/summary")) 
        presenceData.state = "Looking at Summary";
       else if (pathname.includes("/activity")) 
        presenceData.state = "Looking at Activity";
       else if (pathname.includes("/badges")) {
        presenceData.state = "Looking at Badges";
        presenceData.smallImageKey = "badge";
        presenceData.smallImageText = "Badges";
      } else if (pathname.includes("/preferences")) {
        presenceData.details = "Editing Account Preferences";
        presenceData.smallImageKey = "settings";
        presenceData.smallImageText = "Editing";
        delete presenceData.buttons;
      } else if (pathname.includes("/messages")) {
        presenceData.details = "Browsing Messages";
        presenceData.smallImageKey = "read";
        presenceData.smallImageText = "Browsing";
        delete presenceData.buttons;
      } else if (pathname.includes("/follow")) {
        presenceData.details = "Browsing Network";
        presenceData.smallImageKey = "group";
        presenceData.smallImageText = "Browsing";
        delete presenceData.buttons;

        if (pathname.includes("/followers")) 
          presenceData.state = "Looking at Followers";
         else if (pathname.includes("/following")) 
          presenceData.state = "Looking at Following";
        
      } else if (pathname.includes("/notifications")) {
        presenceData.details = "Browsing Notifications";
        presenceData.smallImageKey = "notifications";
        presenceData.smallImageText = "Browsing";
        delete presenceData.buttons;
      } 
    } else {
      for (const [i, v] of Object.entries(basicPages)) {
        if (pathname === i) {
          presenceData.details = v.details;
          presenceData.smallImageKey = "read";
          presenceData.smallImageText = "Browsing";
          browsingTimestamp = Math.floor(Date.now() / 1000);
        }
      }
    }

    if (document.querySelector(".composer-action-createTopic")) {
      presenceData.details = "Creating a New Topic";
      presenceData.smallImageKey = "write";
      presenceData.smallImageText = "Creating";
      delete presenceData.state;
    } else if (document.querySelector(".composer-action-privateMessage")) {
      presenceData.details = "Writing a Private Message";
      presenceData.smallImageKey = "write";
      presenceData.smallImageText = "Writing";
      delete presenceData.state;
    } else if (document.querySelector(".composer-action-reply")) {
      presenceData.details = `Replying To ${
        document
          .querySelector(".composer-action-reply")
          .querySelector(".user-link").innerHTML
      }`;
      presenceData.smallImageKey = "send";
      presenceData.smallImageText = "Replying";
      delete presenceData.state;
    } else if (document.querySelector(".keyboard-shortcuts-modal")) {
      presenceData.details = "Browsing Keyboard Shortcuts";
      presenceData.smallImageKey = "read";
      presenceData.smallImageText = "Browsing";
      delete presenceData.state;
    } else if (document.querySelector(".flag-modal.in")) {
      presenceData.details = "Flagging a Post";
      presenceData.smallImageKey = "report";
      presenceData.smallImageText = "Flagging";
      delete presenceData.state;
      delete presenceData.buttons;
    } else if (document.querySelector(".composer-action-edit")) {
      presenceData.details = "Editing a Post";
      presenceData.smallImageKey = "edit";
      presenceData.smallImageText = "Editing";
      delete presenceData.state;
      delete presenceData.buttons;
    }
  }

  presence.setActivity(presenceData);
});
