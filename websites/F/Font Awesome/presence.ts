const pPresence = new Presence({
    clientId: "820023496934817804"
  }),
  pBrowsing = Math.floor(Date.now() / 1000);

pPresence.on("UpdateData", async () => {
  const pData: PresenceData = {
      largeImageKey: "icon2",
      startTimestamp: pBrowsing
    },
    pPage = window.location.pathname;

  if (pPage == "/") {
    pData.details = "Browsing Page:";
    pData.state = "Main";
  } else if (pPage.includes("/icons")) {
    const urlParams: URLSearchParams = new URLSearchParams(
        window.location.search
      ),
      myParam: string = urlParams.get("q");

    if (myParam === null) {
      const icon: HTMLElement = document.querySelector(
        "#page-top > div.view.flex.flex-column.min-vh-100.db-pr > div.flex-grow-1.flex-shrink-0.flex-basis-auto > div > div.ph6-l > div > section > header > div.flex.flex-column.flex-row-xl.items-center-xl.justify-between-xl.mb2.mb4-l > h1 > span"
      );
      if (icon === null) {
        pData.details = "Browsing Page:";
        pData.state = "Icons";
      } else {
        pData.details = "Viewing Icon:";
        pData.state = icon.textContent;
        pData.buttons = [
          {
            label: "View Icon",
            url: document.URL
          }
        ];
      }
    } else {
      pData.details = "Searching:";
      pData.state = myParam;
    }
  } else if (pPage == "/start") {
    pData.details = "Browsing Page:";
    pData.state = "Start";
  } else if (pPage == "/support") {
    pData.details = "Browsing Page:";
    pData.state = "Support";
  } else if (pPage == "/plans") {
    pData.details = "Browsing Page:";
    pData.state = "Plans";
  } else if (pPage == "/plans/standard") {
    pData.details = "Browsing Page:";
    pData.state = "Plan Standard";
  } else if (pPage == "/sessions/sign-in") {
    pData.details = "Browsing Page:";
    pData.state = "Sign In";
  }

  if (pData.details == null) {
    pPresence.setTrayTitle();
    pPresence.setActivity();
  } else {
    pPresence.setActivity(pData);
  }
});
