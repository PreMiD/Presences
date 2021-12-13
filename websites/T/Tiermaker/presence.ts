let episode: string,
    creator: string,
    c_title: string,
    c_category: string,
    c_stateNum: number,
    c_currentState: string;

const presence = new Presence({
    clientId: "919901175640358983"
  }),

  startStamp = Math.floor(Date.now() / 1000),
  urlpath = document.location.pathname.split("/"),

  getElement = (query: string): string | undefined => {
    return document.querySelector(query)?.textContent;
  },

  getInformation = (query: string): string | undefined => {
    episode = document.querySelector(query)?.textContent;
    return episode
  };

  
function c_GetDetails(): string | undefined {
  c_title = (<HTMLInputElement>document.getElementById('title')).value
  c_category = (<HTMLInputElement>document.getElementById('select')).value
  return
}

setInterval(c_GetDetails, 15000)

presence.on("UpdateData", async() => {

  const presenceData: PresenceData = {
    largeImageKey: "tm-icon",
    details: "tiermaker.com",
    startTimestamp: startStamp
  },

  path = document.location.pathname.toLowerCase();

  if (path === "/") {
      presenceData.details = "Viewing Homepage"
      presenceData.smallImageKey = "tm-view"
      presenceData.smallImageText = "Viewing"
      presenceData.startTimestamp = startStamp
  } else if (path.startsWith("/create/")) {
      if (!!urlpath[2]) {
        presenceData.details = "Creating a Tierlist"
        presenceData.state = getInformation("h1")
        presenceData.smallImageKey = "tm-star"
        presenceData.smallImageText = "Creating"
        presenceData.buttons = [
            {
              label: "✒️ Use this Template",
              url: `https://tiermaker.com/create/${urlpath[2]}`
            }
          ];
      } else {
        presenceData.details = "Creating a Tierlist Template"
        presenceData.smallImageKey = "tm-create"
        presenceData.smallImageText = "Creating"
        presenceData.startTimestamp = startStamp
      }
  } else if (path === "/categories/create/") {
      presenceData.details = "Creating a Tierlist Template"
      presenceData.smallImageKey = "tm-create"
      presenceData.smallImageText = "Creating"
      presenceData.state = "Creating: " + c_title
      presenceData.startTimestamp = startStamp
  } else if (path.startsWith("/categories/")) {
      if (!!urlpath[2]) {
        presenceData.details = "Viewing Category"
        presenceData.state = "Category: " + getInformation("h1")
        presenceData.smallImageKey = "tm-view"
        presenceData.smallImageText = "Viewing"
      } else {
        presenceData.details = "Browsing Categories"
        presenceData.smallImageKey = "tm-view"
        presenceData.smallImageText = "Viewing"
      }
   } else if (path === "/community-rankings/") {
      presenceData.details = "Browsing Community Rankings"
      presenceData.smallImageKey = "tm-view"
      presenceData.smallImageText = "Viewing"
      presenceData.startTimestamp = startStamp
   }

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});