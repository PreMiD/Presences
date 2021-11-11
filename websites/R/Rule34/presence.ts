const presence = new Presence({
  clientId: "619967690056007699"
});

presence.on("UpdateData", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  if (document.location.href.includes("rule34.xxx")) {
    if (document.location.pathname === "/") {
      presence.setActivity({
        details: "Viewing the homepage...",
        largeImageKey: "lg-r34"
      });
    } else if (
      urlParams.get("page") &&
      urlParams.get("s") &&
      urlParams.get("page") === "post"
    ) {
      if (urlParams.get("s") === "list") {
        if (urlParams.get("tags")) {
          presence.setActivity({
            details: "Searching...",
            state: urlParams.get("tags").replace(" ", ", "),
            largeImageKey: "lg-r34"
          });
        } else {
          presence.setActivity({
            details: "Viewing Posts List...",
            largeImageKey: "lg-r34"
          });
        }
      } else if (urlParams.get("s") === "view" && urlParams.get("id")) {
        presence.setActivity({
          details: "Viewing a Post...",
          state: `Post ${urlParams.get("id")}`,
          largeImageKey: "lg-r34"
        });
      } else {
        presence.setActivity({
          largeImageKey: "lg-r34"
        });
      }
    } else {
      presence.setActivity({
        largeImageKey: "lg-r34"
      });
    }
  } else if (document.location.href.includes("rule34.paheal.net")) {
    const path = document.location.pathname.split("/");
    if (document.location.pathname === "/") {
      presence.setActivity({
        details: "Viewing the homepage...",
        largeImageKey: "lg-r34"
      });
    } else if (path[1] === "post") {
      if (path[2] === "list" && path.length === 3) {
        presence.setActivity({
          details: "Viewing Posts List...",
          largeImageKey: "lg-r34"
        });
      } else if (path[2] === "list" && path.length > 3) {
        presence.setActivity({
          details: "Searching...",
          state: path[3].replace("%20", ", ").replace("%21", "!"),
          largeImageKey: "lg-r34"
        });
      } else if (path[2] === "view") {
        presence.setActivity({
          details: "Viewing a post...",
          state: `Post ${path[3]}`,
          largeImageKey: "lg-r34"
        });
      } else {
        presence.setActivity({
          largeImageKey: "lg-r34"
        });
      }
    } else {
      presence.setActivity({
        largeImageKey: "lg-r34"
      });
    }
  }
});
