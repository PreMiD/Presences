const presence = new Presence({
    clientId: "889524311566725161"
  }),
  browsingTimestamp = new Date().getTime();

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: browsingTimestamp
    },
    pathnames = location.pathname.split("/");

  if (pathnames[1] === "dashboard") {
    //Dashboard
    let type, count;

    switch (pathnames[2]) {
      case "drive":
        presenceData.details = "Viewing";
        presenceData.state = "Padlet Drive";
        break;
      case null:
        type = document
          .querySelector(
            'body > div > div > div > div > nav > a[data-selected="true"]'
          )
          .textContent.replace("edit", "");
        count = document.querySelector(".padlet-cards-list")?.children.length;

        presenceData.details = `Viewing ${type}`;
        presenceData.state = `Padlets - ${count ?? "0"}`;
        break;

      default:
        presenceData.details = "Viewing their";
        presenceData.state = "Dashboard";
        break;
    }

    if (document.querySelector('.universal-search[data-status="expanded"]')) {
      const searchTerm = (
          document.querySelector(".universal-search-input") as HTMLInputElement
        ).value,
        searchCount =
          document.querySelector(".padlet-cards-list").children.length;

      presenceData.details = `Searching: ${searchTerm}`;
      presenceData.state = `${searchCount} Results`;
    }
  } else if (pathnames[1] === "create") {
    //Creating a Padlet

    presenceData.details = "Creating a Padlet";
    presenceData.state = "Choosing a template";

    presenceData.smallImageKey = "writing";
    presenceData.smallImageText = "Creating";
  } else if (document.querySelector("#wall-container")) {
    //Padlet
    const padletData = JSON.parse(
      document.querySelector('head > script[type="application/ld+json"]')
        .textContent
    );

    presenceData.details = padletData.name;
    presenceData.state = `By: ${padletData.author.name}`;
    presenceData.smallImageKey = "reading";
    presenceData.smallImageText = "Reading";

    presenceData.buttons = [
      { label: "View Padlet", url: padletData.url },
      { label: "View Author", url: padletData.author.url }
    ];
  } else if (document.querySelector(".header-user-info")) {
    //Author
    const padletData = JSON.parse(
        document.querySelector('head > script[type="application/ld+json"]')
          .textContent
      ),
      bio = document.querySelector(".header-user-bio").textContent;

    presenceData.details = `Viewing ${padletData.name}`;

    presenceData.state = bio;

    presenceData.buttons = [
      { label: "View Author", url: `https://padlet.com/${padletData.url}` }
    ];
  }

  const showButtons = await presence.getSetting("buttons");

  if (!showButtons) delete presenceData.buttons;

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
