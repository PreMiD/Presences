const presence = new Presence({
  clientId: "619967690056007699"
});

presence.on("UpdateData", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  if (document.location.href.includes("rule34.xxx")) {
    if (document.location.pathname === "/") {
      const pdata: PresenceData = {
        details: "Viewing the homepage...",
        largeImageKey: "lg-r34"
      };
      presence.setActivity(pdata);
    } else if (
      urlParams.get("page") &&
      urlParams.get("s") &&
      urlParams.get("page") === "post"
    ) {
      if (urlParams.get("s") === "list") {
        if (urlParams.get("tags")) {
          const pdata: PresenceData = {
            details: "Searching...",
            state: urlParams.get("tags").replace(" ", ", "),
            largeImageKey: "lg-r34"
          };
          presence.setActivity(pdata);
        } else {
          const pdata: PresenceData = {
            details: "Viewing Posts List...",
            largeImageKey: "lg-r34"
          };
          presence.setActivity(pdata);
        }
      } else if (urlParams.get("s") === "view" && urlParams.get("id")) {
        const pdata: PresenceData = {
          details: "Viewing a Post...",
          state: `Post ${urlParams.get("id")}`,
          largeImageKey: "lg-r34"
        };
        presence.setActivity(pdata);
      } else {
        const pdata: PresenceData = {
          largeImageKey: "lg-r34"
        };
        presence.setActivity(pdata);
      }
    } else {
      const pdata: PresenceData = {
        largeImageKey: "lg-r34"
      };
      presence.setActivity(pdata);
    }
  } else if (document.location.href.includes("rule34.paheal.net")) {
    const path = document.location.pathname.split("/");
    if (document.location.pathname === "/") {
      const pdata: PresenceData = {
        details: "Viewing the homepage...",
        largeImageKey: "lg-r34"
      };
      presence.setActivity(pdata);
    } else if (path[1] === "post") {
      if (path[2] === "list" && path.length === 3) {
        const pdata: PresenceData = {
          details: "Viewing Posts List...",
          largeImageKey: "lg-r34"
        };
        presence.setActivity(pdata);
      } else if (path[2] === "list" && path.length > 3) {
        const pdata: PresenceData = {
          details: "Searching...",
          state: path[3].replace("%20", ", ").replace("%21", "!"),
          largeImageKey: "lg-r34"
        };
        presence.setActivity(pdata);
      } else if (path[2] === "view") {
        const pdata: PresenceData = {
          details: "Viewing a post...",
          state: `Post ${path[3]}`,
          largeImageKey: "lg-r34"
        };
        presence.setActivity(pdata);
      } else {
        const pdata: PresenceData = {
          largeImageKey: "lg-r34"
        };
        presence.setActivity(pdata);
      }
    } else {
      const pdata: PresenceData = {
        largeImageKey: "lg-r34"
      };
      presence.setActivity(pdata);
    }
  }
});
