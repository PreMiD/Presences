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
        presenceData.details = "Browsing for the featured apps";
        break;
      case "Categories":
        presenceData.details = "Browsing in the categories";
        break;
      case "Top":
        presenceData.details = "Browsing for the TOP apps";
        break;
      default:
        presenceData.details = "Browsing for the featured apps";
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

    if (logo) presenceData.largeImageKey = await getShortURL(logo);

    presenceData.details = `Viewing ${name ? name : "app"}`;
    presenceData.buttons = [
      {
        label: "View app",
        url: await getShortURL(document.location.href)
      }
    ];
  } else if (paths[0] === "search" && paths[1])
    presenceData.details = `Searching for ${decodeURIComponent(paths[1])}`;

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});

const shortenedURLs: Record<string, string> = {};
async function getShortURL(url: string) {
  if (!url || url.length < 256) return url;
  if (shortenedURLs[url]) return shortenedURLs[url];
  try {
    const pdURL = await (
      await fetch(`https://pd.premid.app/create/${url}`)
    ).text();
    shortenedURLs[url] = pdURL;
    return pdURL;
  } catch (err) {
    presence.error(err);
    return url;
  }
}
