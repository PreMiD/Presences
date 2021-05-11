const presence: Presence = new Presence({
  clientId: "841583979354259486"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  },
 site: string = window.location.pathname,
 stamp: number = Math.floor(Date.now() / 1000)
 
 presenceData.startTimestamp = stamp
  if(site.endsWith("/")) {
    presenceData.details = "Viewing the main page";
  } else if(site.endsWith("/download")) {
    presenceData.details = "Downloading TypeScript"
  } else if(site.endsWith("/docs/")) {
    presenceData.details = "Viewing the documentation"
  } else if(site.endsWith("/docs/handbook/intro.html")) {
    presenceData.details = "Viewing the handbook"
  } else if(site.endsWith("/community")) {
    presenceData.details = "Viewing the community page"
  } else if(site.endsWith("/play")) {
    presenceData.details = "Playing around with TypeScript"
    presenceData.state = "He has fun with TypeScript"
    presenceData.buttons = [
      {
        label: "Try",
        url: "https://www.typescriptlang.org/play"
      }
    ]
  } else if(site.endsWith("/tools")) {
    presenceData.details = "Viewing the tools"
  } else if(site.endsWith("/tsconfig")) {
    presenceData.details = "Reading how to make a TSConfig"
    presenceData.state = "I hope he knows now how to"
  } else if(site.endsWith("/dt/search")) {
    presenceData.details = "Using the TypeScipt search page"
  }

if(presenceData.details == null) {
  presence.setTrayTitle()
  presence.setActivity()
} else {
  presence.setActivity(presenceData)
}

})