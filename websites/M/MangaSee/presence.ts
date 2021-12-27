const presence = new Presence({
    clientId: "836662139926216724"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const entries = await presence.getSetting<boolean>("entries"),
    buttons = await presence.getSetting<boolean>("buttons"),
    presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: browsingTimestamp
    },
    { pathname } = document.location;
  if (pathname === "/") presenceData.details = "Viewing the Homepage";
  else if (
    pathname === "/search/" &&
    window.location.search.substr(0, 1) === "?"
  ) {
    presenceData.details = "Searching: ";
    presenceData.state = new URLSearchParams(document.location.search).get(
      "name"
    );
    presenceData.smallImageKey = "search";
  } else if (pathname === "/directory/" || pathname === "/search/")
    presenceData.details = "Browsing all manga";
  else if (pathname === "/discussion/")
    presenceData.details = "Viewing discussion page";
  else if (pathname.endsWith("post.php")) {
    presenceData.details = `Discussion: ${
      document.querySelector(".BoxBody > h1").textContent
    }`;
    presenceData.state = `by ${
      document.querySelector(".Description > span").textContent
    }`;
    presenceData.buttons = [
      { label: "View discussion", url: window.location.href }
    ];
  } else if (pathname.endsWith("/subscription.php")) {
    presenceData.details = "Viewing subscriptions";
    if (entries) {
      presenceData.state = `${document
        .querySelector(".BoxHeader > span")
        .textContent.replace("(", "")
        .replace(")", "")} entries`;
    }
  } else if (pathname.endsWith("/bookmark.php")) {
    presenceData.details = "Viewing bookmark";
    if (entries) {
      presenceData.state = `${document
        .querySelector(".BoxHeader > span")
        .textContent.replace("(", "")
        .replace(")", "")} entries`;
    }
  } else if (pathname.endsWith("/settings.php"))
    presenceData.details = "Viewing settings";
  else if (pathname.startsWith("/manga/")) {
    presenceData.details = "Viewing manga:";
    presenceData.state = document.querySelector(
      ".list-group-item > h1"
    ).textContent;
    presenceData.smallImageKey = "view";
    if (buttons) {
      presenceData.buttons = [
        { label: "View manga", url: window.location.href }
      ];
    }
  } else if (pathname.startsWith("/read-online/")) {
    presenceData.details = document
      .querySelector(".col-lg-4 > a")
      .textContent.replace(new RegExp("\\\t", "g"), "")
      .replace(new RegExp("\\\n", "g"), "");
    presenceData.state = `📖 Ch. ${
      document
        .querySelector('button[data-target="#ChapterModal"]')
        .textContent.replace(new RegExp("\\\t", "g"), "")
        .replace(new RegExp("\\\n", "g"), "")
        .split(" ")[1]
    } 📄 ${
      document
        .querySelector('button[data-target="#PageModal"]')
        .textContent.replace(new RegExp("\\\t", "g"), "")
        .replace(new RegExp("\\\n", "g"), "")
        .split(" ")[1]
    }`;
    presenceData.smallImageKey = "read";
    if (buttons) {
      presenceData.buttons = [
        { label: "View manga", url: window.location.href }
      ];
    }
  }
  presence.setActivity(presenceData);
});
