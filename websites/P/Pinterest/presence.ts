const presence = new Presence({
    clientId: "629428243061145640"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
let user: Element | HTMLElement | string,
  search: Element | HTMLElement | string,
  title: Element | HTMLElement | string;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "pinterest"
  };
  presenceData.startTimestamp = browsingStamp;
  if (document.location.hostname === "help.pinterest.com") {
    presenceData.details = "Viewing Help Center";
    delete presenceData.state;

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/search/")) {
    search = document.querySelector(
      "#HeaderContent > div > div > div > div > div > div > div > div > div > div > input"
    );
    presenceData.details = "Searching for:";
    presenceData.state = (search as HTMLInputElement).value;

    presenceData.smallImageKey = "search";

    presence.setActivity(presenceData);
  } else if (
    document.querySelector(
      "#__PWS_ROOT__ > div.App.AppBase > div.appContent > div > div > div > div:nth-child(2) > div > div > div > div > div > div > div > div > div > h5"
    ) !== null ||
    document.querySelector(
      "body > div > div.App.AppBase > div.appContent > div > div > div > div:nth-child(2) > div > div > div > div > div > div > div > div > div > h5"
    ) !== null
  ) {
    user = document.querySelector(
      "#__PWS_ROOT__ > div.App.AppBase > div.appContent > div > div > div > div:nth-child(2) > div > div > div > div > div > div > div > div > div > h5"
    );
    user ??= document.querySelector(
      "body > div > div.App.AppBase > div.appContent > div > div > div > div:nth-child(2) > div > div > div > div > div > div > div > div > div > h5"
    );
    presenceData.details = "Viewing user:";
    presenceData.state = (user as HTMLElement).innerText;

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else if (
    document.querySelector(
      "#__PWS_ROOT__ > div.App.AppBase > div.appContent > div > div > div > div > div.BrioProfileHeaderWrapper > div:nth-child(1) > div > div > div > div > div > div > div > div:nth-child(1) > h4"
    ) !== null ||
    document.querySelector(
      "body > div > div.App.AppBase > div.appContent > div > div > div > div > div.BrioProfileHeaderWrapper > div:nth-child(1) > div > div > div > div > div > div > div > div:nth-child(1) > h4"
    )
  ) {
    user = document.querySelector(
      "#__PWS_ROOT__ > div.App.AppBase > div.appContent > div > div > div > div > div.BrioProfileHeaderWrapper > div:nth-child(1) > div > div > div > div > div > div > div > div:nth-child(1) > h4"
    );
    if (user === null) {
      user = document.querySelector(
        "body > div > div.App.AppBase > div.appContent > div > div > div > div > div.BrioProfileHeaderWrapper > div:nth-child(1) > div > div > div > div > div > div > div > div:nth-child(1) > h4"
      );
    }
    presenceData.details = "Viewing user:";
    presenceData.state = (user as HTMLElement).innerText;

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else if (
    document.querySelector(
      "body > div > div.App.AppBase > div.appContent > div > div > div > div > div > div > div > div > div > div.boardHeaderWrapper > div > div > div > div:nth-child(1) > h4"
    ) !== null ||
    document.querySelector(
      "#__PWS_ROOT__ > div.App.AppBase > div.appContent > div > div > div > div > div > div > div > div > div > div.boardHeaderWrapper > div > div > div > div:nth-child(1) > h4"
    ) !== null
  ) {
    title = document.querySelector(
      "body > div > div.App.AppBase > div.appContent > div > div > div > div > div > div > div > div > div > div.boardHeaderWrapper > div > div > div > div:nth-child(1) > h4"
    );
    if (title === null) {
      title = document.querySelector(
        "#__PWS_ROOT__ > div.App.AppBase > div.appContent > div > div > div > div > div > div > div > div > div > div.boardHeaderWrapper > div > div > div > div:nth-child(1) > h4"
      );
    }
    presenceData.details = "Viewing board:";
    presenceData.state = (title as HTMLElement).innerText;

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/following")) {
    presenceData.details = "Viewing their following";
    delete presenceData.state;

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/pin/")) {
    presenceData.details = "Viewing a pin";
    delete presenceData.state;

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/edit")) {
    presenceData.details = "Editting their homepage";
    delete presenceData.state;

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/settings")) {
    presenceData.details = "Viewing their settings";
    delete presenceData.state;

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else if (
    document.querySelector("#__PWS_ROOT__ > div.App.AppBase") !== null &&
    document.querySelector("#__PWS_ROOT__ > div.App.AppBase").className ===
      "App AppBase"
  ) {
    presenceData.details = "Viewing the home page";
    delete presenceData.state;

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else {
    title = document.querySelector("head > title");
    presenceData.details = "Viewing:";
    presenceData.state = (title as HTMLElement).innerText;

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  }
});
