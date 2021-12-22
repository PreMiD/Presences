const presence = new Presence({
  clientId: "783325015860838452"
});

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "vector"
  };

  // Support - support.something.host
  if (window.location.hostname === "support.something.host") {
    data.details = "Helpdesk";

    if (window.location.pathname.includes("/article")) {
      data.state = `Article: ${
        document.querySelector("html > body > nav > div > div >div > div > h1")
          .textContent
      }`;
    } else if (window.location.pathname.includes("/category")) {
      data.state = `Category: ${
        document.querySelector(
          "body > nav > div > div > div > div > span.csh-navigation-title-list-subject > span.csh-category-badge.csh-font-sans-semibold"
        ).textContent
      }`;
    } else data.state = "Browsing";
  }

  // Landing Site - something.host
  if (window.location.hostname === "something.host") {
    data.details = "Landing Site";

    if (
      document.querySelector("head > title").textContent ===
      "Home || SomethingHost"
    )
      data.state = "Home";
    else {
      data.state = document
        .querySelector("head > title")
        .textContent.replace("SomethingHost", "")
        .replace("|", "");
    }
  }

  // CDN - content.something.host
  if (window.location.hostname === "content.something.host")
    data.details = "Content";

  // Files - files.something.host
  if (window.location.hostname === "files.something.host")
    data.details = "File Manager";

  // Control Panel - cp.something.host
  if (window.location.hostname === "cp.something.host") {
    data.details = "Control Panel";

    if (window.location.pathname.startsWith("/profile")) data.state = "Profile";
    else {
      data.state = document
        .querySelector("head > title")
        .textContent.replace("SomethingCP - ", "");
    }
  }
  presence.setActivity(data);
});
