const presence = new Presence({
  clientId: "928404633209143336"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  let { hash } = document.location;
  if (hash.includes("?")) hash = hash.substring(0, hash.lastIndexOf("?") - 1);

  const paths: string[] = hash
    ? hash.replace("#", "").split("/")
    : document.location.pathname.split("/");
  if (!paths[0]) paths.shift();

  if (paths.length === 1) {
    switch (paths[0]) {
      case "Featured":
        presenceData.details = "Browsing the featured apps";
        break;
      case "Categories":
        presenceData.details = "Browsing through the categories";
        break;
      case "Top":
        presenceData.details = "Browsing the TOP apps";
        break;
      default:
        presenceData.details = "Browsing the featured apps";
        break;
    }
  } else if (paths[0] === "app" && paths[1]) {
    const container = document.querySelector<HTMLDivElement>(
        "body > div.page > div.box > div.appDetailsContainer > div.componentContainer > div > div.detailheadcard"
      ),
      logo = container?.querySelector<HTMLImageElement>("img.left_logo")?.src,
      name = container?.querySelector<HTMLDivElement>(
        "div.center_info > div.title"
      )?.textContent;

    if (logo) presenceData.largeImageKey = logo;

    presenceData.details = `Viewing ${name ? name : "app"}`;
    presenceData.buttons = [
      {
        label: "View app",
        url: document.location.href
      }
    ];
  } else if (paths[0] === "search" && paths[1])
    presenceData.details = `Searching for ${decodeURIComponent(paths[1])}`;

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
