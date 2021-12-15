let Title: string, Category: string, CurrentState: string;

const presence = new Presence({
    clientId: "919901175640358983"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000),
  urlpath = document.location.pathname.split("/"),
  getElement = (query: string) => document.querySelector(query)?.textContent;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "tm-icon",
      details: "tiermaker.com",
      startTimestamp: browsingTimestamp
    },
    path = document.location.pathname.toLowerCase();

  if (path === "/") {
    presenceData.details = "Viewing Homepage";
    presenceData.smallImageKey = "tm-view";
    presenceData.smallImageText = "Viewing";
  } else if (path.startsWith("/create/")) {
    if (urlpath[2]) {
      presenceData.details = "Creating a Tierlist";
      presenceData.state = getElement("h1");
      presenceData.smallImageKey = "tm-star";
      presenceData.smallImageText = "Creating";
      presenceData.buttons = [
        {
          label: "✒️ Use this Template",
          url: `https://tiermaker.com/create/${urlpath[2]}`
        }
      ];
    } else {
      presenceData.details = "Creating a Tierlist Template";
      presenceData.smallImageKey = "tm-create";
      presenceData.smallImageText = "Creating";
    }
  } else if (path === "/categories/create/") {
    presenceData.details = "Creating a Tierlist Template";
    presenceData.smallImageKey = "tm-create";
    presenceData.smallImageText = "Creating";
    presenceData.state = `Creating: ${Title}`;
  } else if (path.startsWith("/categories/")) {
    if (urlpath[2]) {
      presenceData.details = "Viewing Category";
      presenceData.state = `Category: ${getElement("h1")}`;
      presenceData.smallImageKey = "tm-view";
      presenceData.smallImageText = "Viewing";
    } else {
      presenceData.details = "Browsing Categories";
      presenceData.smallImageKey = "tm-view";
      presenceData.smallImageText = "Viewing";
    }
  } else if (path === "/community-rankings/") {
    presenceData.details = "Browsing Community Rankings";
    presenceData.smallImageKey = "tm-view";
    presenceData.smallImageText = "Viewing";
  }

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
