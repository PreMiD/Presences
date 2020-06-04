const presence = new Presence({
    clientId: "717563140300210196"
  }),
  strings = presence.getStrings({
    search: "presence.activity.searching"
  });

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };
  try {
    if (new URLSearchParams(window.location.search).has("s")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Searching for:";
      presenceData.state = document.title.split(' -').shift();
      presenceData.smallImageKey = "search";
    } else if (document.location.pathname == "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = 'Browsing Homepage';
    } else if (document.location.pathname.includes("/category/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing a category:";
      presenceData.state = (<HTMLAnchorElement>document.querySelector("#top-menu > div.top-menu-breadcrumb > ol > li:nth-child(2) > a")).text;
    } else if (document.location.href.includes("/#")) {
      const comicName = (<HTMLMetaElement>document.querySelector("head > meta:nth-child(17)")).content
      const issueName = document.location.pathname.split('/')[2].replace(/_/g, " ");
      const issueNumber = document.querySelector("#left-menu > ol > li:nth-child(3) > div > span").textContent.trim();
      if (document.location.pathname.split('/')[2].includes('')) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = comicName + " - " + issueName;
        presenceData.state = issueNumber;
      }
      else {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = comicName;
        presenceData.state = issueNumber;
      }
    }
  
    if (presenceData.details == null) {
      presence.setTrayTitle();
      presence.setActivity();
    } else {
      presence.setActivity(presenceData);
    }
  }
catch(err) {
  console.error(err)
}
});
